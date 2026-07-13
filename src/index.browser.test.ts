import { describe, it, expect, beforeAll, afterAll, beforeEach, afterEach } from 'vitest';
import * as maplibregl from 'maplibre-gl';
import { MaplibreAreaTransform, type MaplibreAreaTransformOptions } from './index';
import { pxCentroid, pxRotatePoint, type PxPoint } from './pixel-utils';
import rotateUrl from '../assets/rotate.png';

type SetupResponse = {
    container: HTMLElement;
    map: maplibregl.Map;
    control: MaplibreAreaTransform
}

const AREA_LAYER = 'area-transform-layer-polygon-area';
const GEOJSON_SOURCE = 'area-transform-geojson-source';
const IMAGE_SOURCE_PREFIX = 'area-transform-raster-';
const IMAGE_LAYER_PREFIX = 'area-transform-raster-layer-';
const BUTTON_IDS = {
    image: 'area-transfrom-image',
    rectangle: 'area-transfrom-rectangle',
    polygon: 'area-transfrom-polygon',
    delete: 'area-transfrom-delete',
} as const;

function loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
    });
}

/** Fires a synthetic map click at a geographic point. */
function clickAt(map: maplibregl.Map, lngLat: maplibregl.LngLat) {
    const point = map.project(lngLat);
    map.fire('click', { point, lngLat } as unknown as maplibregl.MapMouseEvent);
}

/** Projects a [lng, lat] coordinate to a pixel point. */
function projectPx(map: maplibregl.Map, coord: number[]): PxPoint {
    const p = map.project([coord[0]!, coord[1]!]);
    return [p.x, p.y];
}

/** Fires a synthetic map pointer event (mousedown/mousemove/mouseup) at a pixel point. */
function fireMouse(map: maplibregl.Map, type: 'mousedown' | 'mousemove' | 'mouseup', px: PxPoint) {
    map.fire(type, {
        point: { x: px[0], y: px[1] },
        lngLat: map.unproject([px[0], px[1]]),
        preventDefault() { /* no-op */ },
        originalEvent: {},
    } as unknown as maplibregl.MapMouseEvent);
}

/** Polls until the predicate holds (a render has produced queryable features) or times out. */
async function waitUntil(fn: () => boolean, timeoutMs = 3000) {
    const start = performance.now();
    while (performance.now() - start < timeoutMs) {
        if (fn()) return;
        await new Promise((r) => setTimeout(r, 50));
    }
    throw new Error('waitUntil timed out');
}

/** Creates a sized map with the control added, ready to drive. Caller must tear it down. */
async function setup(options?: MaplibreAreaTransformOptions): Promise<SetupResponse> {
    const container = document.createElement('div');
    container.style.width = '400px';
    container.style.height = '400px';
    document.body.appendChild(container);

    const map = new maplibregl.Map({
        container,
        style: { version: 8, sources: {}, layers: [] },
        center: [0, 0],
        zoom: 1,
    });
    await map.once('load');

    const control = new MaplibreAreaTransform(options);
    map.addControl(control);
    // Let the control's GeoJSON source initialize in the worker before driving it.
    await map.once('idle');

    return { container, map, control };
}

describe('MaplibreAreaTransform', () => {
    let container: HTMLDivElement;
    let map: maplibregl.Map;
    let control: MaplibreAreaTransform;

    beforeAll(async () => {
        container = document.createElement('div');
        container.style.width = '400px';
        container.style.height = '400px';
        document.body.appendChild(container);

        map = new maplibregl.Map({
            container,
            style: { version: 8, sources: {}, layers: [] },
            center: [0, 0],
            zoom: 1,
        });
        await map.once('load');

        control = new MaplibreAreaTransform();
        map.addControl(control);

        await map.once('idle');
    });

    afterAll(() => {
        map.remove();
        container.remove();
    });

    it('selects on open, deselects on outside click, reselects on image click', async () => {
        const selected: (string | null)[] = [];
        control.on('selected', (id) => selected.push(id));

        const img = await loadImage(rotateUrl);
        const coordinates = control.createCoordinatesForLoadedImage(img);

        // The image is placed in the center of the map.
        const cx = coordinates.reduce((s, c) => s + c[0]!, 0) / coordinates.length;
        const cy = coordinates.reduce((s, c) => s + c[1]!, 0) / coordinates.length;
        expect(cx).toBeCloseTo(map.getCenter().lng, 4);
        expect(cy).toBeCloseTo(map.getCenter().lat, 4);

        const imageId = await control.addImage(rotateUrl, coordinates);

        // Opening selects the new image.
        expect(selected).toEqual([imageId]);

        // Wait until the area polygon is actually rendered and queryable.
        const center = map.getCenter();
        const outside = map.unproject([5, 5]); // a corner, outside the centered image
        await waitUntil(() => map.queryRenderedFeatures(map.project(center))
            .some((f: maplibregl.MapGeoJSONFeature) => f.layer.id.startsWith('area-transform-layer-polygon-area')));

        clickAt(map, outside);
        expect(selected).toEqual([imageId, null]);

        clickAt(map, center);
        expect(selected).toEqual([imageId, null, imageId]);

        // 4. Clicking the already-selected image fires nothing more.
        clickAt(map, center);
        // ...and clicking empty space twice fires only one deselect.
        clickAt(map, outside);
        clickAt(map, outside);
        expect(selected).toEqual([imageId, null, imageId, null]);
    });
});

describe('MaplibreAreaTransform rectangle + delete button', () => {
    let ctx: Awaited<ReturnType<typeof setup>>;

    beforeEach(async () => { ctx = await setup(); });
    afterEach(() => { ctx.map.remove(); ctx.container.remove(); });

    it('adds a rectangle in the middle and deletes it via the delete button', async () => {
        const { map, control } = ctx;
        const deleted: string[] = [];
        let rectId = "";
        control.on('delete', (id) => deleted.push(id));
        control.on('create', (e) => rectId = e.id);

        document.getElementById(BUTTON_IDS.rectangle)!.click();
        const center = map.getCenter();

        const hasArea = () => map.queryRenderedFeatures(map.project(center))
            .some((f: maplibregl.MapGeoJSONFeature) => f.layer.id.startsWith(AREA_LAYER));
        await waitUntil(hasArea);

        // Enter delete mode via the delete button...
        document.getElementById(BUTTON_IDS.delete)!.click();
        await map.once('idle'); // let the button's removeSelection settle before clicking

        // ...then click the rectangle to delete it.
        clickAt(map, center);

        await waitUntil(() => deleted.length > 0);
        expect(deleted).toEqual([rectId]);

        await waitUntil(() => !hasArea());
        expect(hasArea()).toBe(false);
    });
});

describe('MaplibreAreaTransform button visibility', () => {
    it('renders no buttons when all are disabled', async () => {
        const { map, container } = await setup({
            showAddImageButton: false,
            showAddRectangleButton: false,
            showAddPolygonButton: false,
            showDeleteButton: false,
        });
        try {
            const root = container.querySelector('.maplibregl-ctrl-area-transform')!;
            expect(root.querySelectorAll('button').length).toBe(0);
            for (const id of Object.values(BUTTON_IDS)) {
                expect(document.getElementById(id)).toBeNull();
            }
        } finally {
            map.remove();
            container.remove();
        }
    });
});

describe('MaplibreAreaTransform image opacity and reuse', () => {
    let ctx: Awaited<ReturnType<typeof setup>>;

    beforeEach(async () => { ctx = await setup(); });
    afterEach(() => { ctx.map.remove(); ctx.container.remove(); });

    it('applies initial opacity when adding an image', async () => {
        const { map, control } = ctx;
        const coordinates: GeoJSON.Position[] = [[-1, 1], [1, 1], [1, -1], [-1, -1]];

        const imageId = await control.addImage(rotateUrl, coordinates, { opacity: 0.35 });

        expect(control.currentImageId).toBe(imageId);
        expect(map.getPaintProperty(`${IMAGE_LAYER_PREFIX}${imageId}`, 'raster-opacity')).toBe(0.35);
    });

    it('updates the current image opacity via setImageOpacity', async () => {
        const { map, control } = ctx;
        const coordinates: GeoJSON.Position[] = [[-1, 1], [1, 1], [1, -1], [-1, -1]];

        const imageId = await control.addImage(rotateUrl, coordinates, { opacity: 0.35 });
        control.setImageOpacity(0.7);

        expect(map.getPaintProperty(`${IMAGE_LAYER_PREFIX}${imageId}`, 'raster-opacity')).toBe(0.7);
    });

    it('reuses the current image for matching imageUrl and coordinates', async () => {
        const { map, control } = ctx;
        const coordinates: GeoJSON.Position[] = [[-1, 1], [1, 1], [1, -1], [-1, -1]];
        const created: string[] = [];
        control.on('create', (event) => created.push(event.id));

        const firstImageId = await control.addImage(rotateUrl, coordinates);
        const secondImageId = await control.addImage(rotateUrl, coordinates.map(c => [...c]));

        expect(secondImageId).toBe(firstImageId);
        expect(created).toEqual([firstImageId]);
        expect(map.getLayer(`${IMAGE_LAYER_PREFIX}${firstImageId}`)).toBeDefined();
        expect(map.getSource(`${IMAGE_SOURCE_PREFIX}${firstImageId}`)).toBeDefined();
    });

    it('returns the in-flight promise for matching imageUrl and coordinates', () => {
        const { control } = ctx;
        const coordinates: GeoJSON.Position[] = [[-1, 1], [1, 1], [1, -1], [-1, -1]];

        const firstPromise = control.addImage(rotateUrl, coordinates);
        const secondPromise = control.addImage(rotateUrl, coordinates.map(c => [...c]));

        expect(secondPromise).toBe(firstPromise);
        return firstPromise;
    });

    it('cleans up a stale in-flight image when a newer request supersedes it', async () => {
        const { map, control } = ctx;
        const geojsonSource = map.getSource(GEOJSON_SOURCE) as maplibregl.GeoJSONSource;
        const originalUpdateData = geojsonSource.updateData.bind(geojsonSource);
        let releaseFirstUpdate!: () => void;
        let updateCallCount = 0;

        geojsonSource.updateData = ((diff: Parameters<typeof geojsonSource.updateData>[0], overwrite?: boolean) => {
            updateCallCount++;
            if (updateCallCount === 1) {
                return new Promise<void>((resolve, reject) => {
                    releaseFirstUpdate = () => {
                        originalUpdateData(diff, overwrite).then(resolve, reject);
                    };
                });
            }
            return originalUpdateData(diff, overwrite);
        }) as typeof geojsonSource.updateData;

        const firstCoordinates: GeoJSON.Position[] = [[-2, 2], [0, 2], [0, 0], [-2, 0]];
        const secondCoordinates: GeoJSON.Position[] = [[1, 1], [2, 1], [2, 0], [1, 0]];
        const firstPromise = control.addImage(rotateUrl, firstCoordinates);
        await waitUntil(() => updateCallCount === 1);
        const firstLayerId = Array.from(map.getStyle().layers)
            .map(layer => layer.id)
            .find(id => id.startsWith(IMAGE_LAYER_PREFIX))!;
        const firstSourceId = firstLayerId.replace(IMAGE_LAYER_PREFIX, IMAGE_SOURCE_PREFIX);

        const secondImageId = await control.addImage(`${rotateUrl}?next`, secondCoordinates);
        releaseFirstUpdate();

        await expect(firstPromise).rejects.toThrow('Stale addImage request superseded');
        await waitUntil(() => !map.getLayer(firstLayerId));

        expect(control.currentImageId).toBe(secondImageId);
        expect(map.getLayer(`${IMAGE_LAYER_PREFIX}${secondImageId}`)).toBeDefined();
        expect(map.getSource(firstSourceId)).toBeUndefined();
    });
});

describe('MaplibreAreaTransform event unsubscription', () => {
    let ctx: Awaited<ReturnType<typeof setup>>;

    beforeEach(async () => { ctx = await setup(); });
    afterEach(() => { ctx.map.remove(); ctx.container.remove(); });

    it('stops receiving an event after off()', async () => {
        const { control } = ctx;
        const removed: (string | null)[] = [];
        const kept: (string | null)[] = [];
        const listener = (id: string | null) => removed.push(id);

        control.on('selected', listener);
        control.on('selected', (id) => kept.push(id));
        control.off('selected', listener);

        // Adding a rectangle selects it, which emits a `selected` event.
        await control.addRectangle();

        expect(kept.length).toBe(1);  // the event really fired...
        expect(removed).toEqual([]);  // ...but the unsubscribed listener got nothing
    });
});

describe('MaplibreAreaTransform rotation', () => {
    let ctx: SetupResponse;

    beforeEach(async () => { ctx = await setup(); });
    afterEach(() => { ctx.map.remove(); ctx.container.remove(); });

    it('rotates the feature when dragging the rotate handle', async () => {
        const { map, control } = ctx;
        const rectId = await control.addRectangle();

        // Read the rectangle's corners and rotate handle from the source.
        const source = map.getSource(GEOJSON_SOURCE) as maplibregl.GeoJSONSource;
        const data = await source.getData() as GeoJSON.FeatureCollection;
        const points = data.features.filter(
            (f) => f.geometry.type === 'Point' && f.properties?.['featureId'] === rectId,
        ) as GeoJSON.Feature<GeoJSON.Point>[];
        const cornerCoords = points
            .filter((f) => f.properties?.['type'] === 'scale-handle')
            .map((f) => f.geometry.coordinates);
        const rotateCoord = points.find((f) => f.properties?.['type'] === 'rotate-handle')!.geometry.coordinates;

        expect(cornerCoords.length).toBe(4);

        const origCornersPx = cornerCoords.map((c) => projectPx(map, c));
        const centroidPx = pxCentroid(origCornersPx);
        const startPx = projectPx(map, rotateCoord);
        const angle = Math.PI / 2; // rotate a quarter turn
        const currentPx = pxRotatePoint(startPx, centroidPx, angle);

        // Wait until the rotate handle is actually rendered and queryable.
        await waitUntil(() => map.queryRenderedFeatures([startPx[0], startPx[1]])
            .some((f) => f.properties?.['type'] === 'rotate-handle' && f.properties?.['featureId'] === rectId));

        let lastChange: { id: string; coordinates: number[][] } | null = null;
        control.on('change', (e) => { lastChange = e as typeof lastChange; });

        // Grab the rotate handle, then drag it a quarter-turn around the centroid.
        fireMouse(map, 'mousedown', startPx);
        // setStateFromMouseDown is async; keep nudging until the rotation engages.
        await waitUntil(() => {
            fireMouse(map, 'mousemove', currentPx);
            return lastChange !== null;
        });
        fireMouse(map, 'mouseup', currentPx);

        expect(lastChange).not.toBeNull();
        const rotated = lastChange!.coordinates;
        expect(rotated.length).toBe(4);

        // Each corner is the original rotated ~90° about the centroid (compared in pixels).
        rotated.forEach((c, i) => {
            const actual = projectPx(map, c);
            const expected = pxRotatePoint(origCornersPx[i]!, centroidPx, angle);
            expect(Math.abs(actual[0] - expected[0])).toBeLessThan(1.5);
            expect(Math.abs(actual[1] - expected[1])).toBeLessThan(1.5);
        });

        // Sanity: the rotation actually moved the corners.
        const movedPx = projectPx(map, rotated[0]!);
        expect(Math.hypot(movedPx[0] - origCornersPx[0]![0], movedPx[1] - origCornersPx[0]![1])).toBeGreaterThan(5);
    });
});
