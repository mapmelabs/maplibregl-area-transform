import { describe, it, expect, beforeAll, afterAll, beforeEach, afterEach } from 'vitest';
import * as maplibregl from 'maplibre-gl';
import { MaplibreAreaTransform, type MaplibreAreaTransformOptions } from './index';
import { pxCentroid, pxRotatePoint, type PxPoint } from './pixel-utils';
import rotateUrl from '../assets/rotate.png';
import scaleUrl from '../assets/scale.png';

type SetupResponse = {
    container: HTMLElement;
    map: maplibregl.Map;
    control: MaplibreAreaTransform
}

const AREA_LAYER = 'area-transform-layer-polygon-area';
const AREA_BORDER_LAYER = 'area-transform-layer-polygon-border';
const HANDLE_LAYER = 'area-transform-layer-polygon-handle';
const HANDLE_CIRCLE_LAYER = HANDLE_LAYER + '-circle';
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

/** The raster layers currently on the map, one per added image. */
function rasterLayers(map: maplibregl.Map) {
    return map.getStyle().layers.filter((l) => l.id.startsWith(IMAGE_LAYER_PREFIX));
}

const imageOpacity = (map: maplibregl.Map, imageId: string) =>
    map.getPaintProperty(IMAGE_LAYER_PREFIX + imageId, 'raster-opacity');

/** Shifts coordinates east, so the same image can be requested for a different place. */
function shifted(coordinates: GeoJSON.Position[]) {
    return coordinates.map((c) => [c[0]! + 1, c[1]!] as GeoJSON.Position);
}

/**
 * Draws a quadrilateral in polygon mode: four corner clicks, then a fifth back on the first corner to
 * close it. Each click is awaited, since the control writes to its source between them.
 * Resolves once the polygon has been created, which also leaves polygon mode.
 */
async function drawPolygon(map: maplibregl.Map, control: MaplibreAreaTransform): Promise<string> {
    const corners: PxPoint[] = [[120, 120], [280, 120], [280, 280], [120, 280]];
    const created = new Promise<string>((resolve) => control.on('create', (e) => resolve(e.id)));
    control.startAddPolygonSequence();
    for (const px of [...corners, corners[0]!]) {
        clickAt(map, map.unproject(px));
        await map.once('idle');
    }
    return created;
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

        const imageId = await control.addImage({ imageUrl: rotateUrl, coordinates });

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

describe('MaplibreAreaTransform image URL queue', () => {
    let ctx: SetupResponse;

    beforeEach(async () => { ctx = await setup(); });
    afterEach(() => { ctx.map.remove(); ctx.container.remove(); });

    it('shares one promise between concurrent calls with the same URL and coordinates', async () => {
        const { map, control } = ctx;
        const created: string[] = [];
        control.on('create', (e) => created.push(e.id));

        const img = await loadImage(rotateUrl);
        const coordinates = control.createCoordinatesForLoadedImage(img);

        const firstPromise = control.addImage({ imageUrl: rotateUrl, coordinates });
        const secondPromise = control.addImage({ imageUrl: rotateUrl, coordinates });
        const [first, second] = await Promise.all([
            firstPromise,
            secondPromise,
        ]);

        expect(firstPromise).toBe(secondPromise);
        expect(second).toBe(first);
        expect(created).toEqual([first]);
        expect(rasterLayers(map).length).toBe(1);
    });

    it('does not dedupe the same URL requested at different coordinates', async () => {
        const { map, control } = ctx;
        const img = await loadImage(rotateUrl);
        const coordinates = control.createCoordinatesForLoadedImage(img);

        const [here, there] = await Promise.all([
            control.addImage({ imageUrl: rotateUrl, coordinates }),
            control.addImage({ imageUrl: rotateUrl, coordinates: shifted(coordinates) }),
        ]);

        expect(there).not.toBe(here);
        expect(rasterLayers(map).length).toBe(2);
    });

    it('adds a second copy when the same request is repeated after the first settles', async () => {
        const { map, control } = ctx;
        const img = await loadImage(rotateUrl);
        const coordinates = control.createCoordinatesForLoadedImage(img);

        const first = await control.addImage({ imageUrl: rotateUrl, coordinates });
        const second = await control.addImage({ imageUrl: rotateUrl, coordinates });

        expect(second).not.toBe(first);
        expect(rasterLayers(map).length).toBe(2);
    });

    it('queues concurrent requests for different URLs instead of interleaving them', async () => {
        const { map, control } = ctx;
        const img = await loadImage(rotateUrl);
        const coordinates = control.createCoordinatesForLoadedImage(img);
        const selected: (string | null)[] = [];
        control.on('selected', (id) => selected.push(id));

        const [rotateId, scaleId] = await Promise.all([
            control.addImage({ imageUrl: rotateUrl, coordinates }),
            control.addImage({ imageUrl: scaleUrl, coordinates: shifted(coordinates) }),
        ]);

        expect(scaleId).not.toBe(rotateId);
        expect(rasterLayers(map).length).toBe(2);
        expect(selected).toEqual([rotateId, null, scaleId]);
    });

    it('releases the key after a failed request, so it can be retried', async () => {
        const { control } = ctx;
        const img = await loadImage(rotateUrl);
        const coordinates = control.createCoordinatesForLoadedImage(img);

        control.startAddPolygonSequence();
        const first = control.addImage({ imageUrl: rotateUrl, coordinates });
        await expect(first).rejects.toBeTruthy();

        const retry = control.addImage({ imageUrl: rotateUrl, coordinates });
        expect(retry).not.toBe(first);
        await expect(retry).rejects.toBeTruthy();
    });

    it('does not let a failed request block the queue', async () => {
        const { map, control } = ctx;
        const img = await loadImage(rotateUrl);
        const coordinates = control.createCoordinatesForLoadedImage(img);

        control.startAddPolygonSequence();
        await expect(control.addImage({ imageUrl: rotateUrl, coordinates })).rejects.toBeTruthy();
        await drawPolygon(map, control);
        await expect(control.addImage({ imageUrl: rotateUrl, coordinates })).resolves.toBeTruthy();
        expect(rasterLayers(map).length).toBe(1);
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

        await control.addRectangle();

        expect(kept.length).toBe(1);
        expect(removed).toEqual([]);
    });
});

describe('MaplibreAreaTransform image opacity', () => {
    let ctx: SetupResponse;

    beforeEach(async () => { ctx = await setup(); });
    afterEach(() => { ctx.map.remove(); ctx.container.remove(); });

    it('uses the default opacity when none is given', async () => {
        const { map, control } = ctx;
        const img = await loadImage(rotateUrl);
        const imageId = await control.addImage({ imageUrl: rotateUrl, coordinates: control.createCoordinatesForLoadedImage(img) });

        expect(imageOpacity(map, imageId)).toBe(0.9);
    });

    it('applies the opacity given to addImage', async () => {
        const { map, control } = ctx;
        const img = await loadImage(rotateUrl);
        const imageId = await control.addImage({ imageUrl: rotateUrl, coordinates: control.createCoordinatesForLoadedImage(img), opacity: 0.25 });

        expect(imageOpacity(map, imageId)).toBe(0.25);
    });

    it('updates the opacity of an existing image via setImageOpacity', async () => {
        const { map, control } = ctx;
        const img = await loadImage(rotateUrl);
        const imageId = await control.addImage({ imageUrl: rotateUrl, coordinates: control.createCoordinatesForLoadedImage(img) });

        await control.setImageOpacity(imageId, 0.5);
        expect(imageOpacity(map, imageId)).toBe(0.5);

        // A fully transparent image is still a valid value, not a removal.
        await control.setImageOpacity(imageId, 0);
        expect(imageOpacity(map, imageId)).toBe(0);
        expect(map.getLayer(IMAGE_LAYER_PREFIX + imageId)).toBeDefined();
    });
});

describe('MaplibreAreaTransform style replacement', () => {
    let ctx: SetupResponse;

    beforeEach(async () => { ctx = await setup(); });
    afterEach(() => { ctx.map.remove(); ctx.container.remove(); });

    it('silently restores images, editable features, selection, and opacity with the same ID', async () => {
        const { map, control } = ctx;
        const img = await loadImage(rotateUrl);
        const coordinates = control.createCoordinatesForLoadedImage(img);
        const imageId = await control.addImage({ imageUrl: rotateUrl, coordinates, opacity: 0.35 });
        const events: string[] = [];
        control.on('create', () => events.push('create'));
        control.on('change', () => events.push('change'));
        control.on('selected', () => events.push('selected'));

        const loaded = map.once('style.load');
        map.setStyle({ version: 8, sources: {}, layers: [] }, { diff: false });
        await loaded;
        await waitUntil(() => Boolean(
            map.getSource(IMAGE_SOURCE_PREFIX + imageId) &&
            map.getLayer(IMAGE_LAYER_PREFIX + imageId) &&
            map.getLayer(HANDLE_LAYER)
        ));
        await map.once('idle');

        expect(events).toEqual([]);
        expect(map.getSource(GEOJSON_SOURCE)).toBeDefined();
        for (const layerId of [AREA_LAYER, AREA_BORDER_LAYER, HANDLE_CIRCLE_LAYER, HANDLE_LAYER]) {
            expect(map.getLayer(layerId)).toBeDefined();
        }
        expect(imageOpacity(map, imageId)).toBe(0.35);

        const source = map.getSource(GEOJSON_SOURCE) as maplibregl.GeoJSONSource;
        const data = await source.getData() as GeoJSON.FeatureCollection;
        const restoredPolygon = data.features.find(
            (f) => f.geometry.type === 'Polygon' && f.properties?.['featureId'] === imageId,
        ) as GeoJSON.Feature<GeoJSON.Polygon>;
        expect(restoredPolygon.geometry.coordinates[0]!.slice(0, -1)).toEqual(coordinates);
        expect(data.features.filter((f) => f.properties?.['featureId'] === imageId && f.properties?.['isSelected']).length).toBe(5);
        expect(data.features.some((f) => f.properties?.['featureId'] === imageId && f.properties?.['type'] === 'rotate-handle')).toBe(true);
    });

    it('keeps the latest opacity set while style resources are absent', async () => {
        const { map, control } = ctx;
        const img = await loadImage(rotateUrl);
        const coordinates = control.createCoordinatesForLoadedImage(img);
        const imageId = await control.addImage({ imageUrl: rotateUrl, coordinates });

        const loaded = map.once('style.load');
        map.setStyle({ version: 8, sources: {}, layers: [] }, { diff: false });
        await control.setImageOpacity(imageId, 0.12);
        await loaded;
        await waitUntil(() => Boolean(map.getLayer(IMAGE_LAYER_PREFIX + imageId)));

        expect(imageOpacity(map, imageId)).toBe(0.12);
    });

    it('queues an image requested while the replacement style is loading', async () => {
        const { map, control } = ctx;
        const img = await loadImage(rotateUrl);
        const coordinates = control.createCoordinatesForLoadedImage(img);

        const loaded = map.once('style.load');
        map.setStyle({ version: 8, sources: {}, layers: [] }, { diff: false });
        const imagePromise = control.addImage({ imageUrl: rotateUrl, coordinates });
        const [, imageId] = await Promise.all([loaded, imagePromise]);

        expect(map.getSource(IMAGE_SOURCE_PREFIX + imageId)).toBeDefined();
        expect(map.getLayer(IMAGE_LAYER_PREFIX + imageId)).toBeDefined();
        const data = await (map.getSource(GEOJSON_SOURCE) as maplibregl.GeoJSONSource).getData() as GeoJSON.FeatureCollection;
        expect(data.features.some((f) => f.properties?.['featureId'] === imageId)).toBe(true);
    });

    it('keeps queued image work behind rapid consecutive style replacements', async () => {
        const { map, control } = ctx;
        const img = await loadImage(rotateUrl);
        const coordinates = control.createCoordinatesForLoadedImage(img);

        map.setStyle({ version: 8, sources: {}, layers: [] }, { diff: false });
        const imagePromise = control.addImage({ imageUrl: rotateUrl, coordinates });
        const finalLoaded = map.once('style.load');
        map.setStyle({ version: 8, sources: {}, layers: [{ id: 'background', type: 'background' }] }, { diff: false });
        const imageId = await imagePromise;
        await finalLoaded;

        expect(map.getLayer('background')).toBeDefined();
        expect(map.getSource(IMAGE_SOURCE_PREFIX + imageId)).toBeDefined();
        expect(map.getLayer(IMAGE_LAYER_PREFIX + imageId)).toBeDefined();
    });

    it('restores icons for retained features created with an earlier color', async () => {
        const { map, control } = ctx;
        await control.addRectangle();
        await control.setAreaColor('blue');

        const loaded = map.once('style.load');
        map.setStyle({ version: 8, sources: {}, layers: [] }, { diff: false });
        await loaded;
        await waitUntil(() =>
            map.hasImage('rotate-orange') &&
            map.hasImage('scale-orange') &&
            map.hasImage('rotate-blue') &&
            map.hasImage('scale-blue')
        );
        expect(map.hasImage('rotate-blue')).toBe(true);
        expect(map.hasImage('scale-blue')).toBe(true);
    });

    it('synchronously restores a cached handle icon when MapLibre reports it missing', async () => {
        const { map, control } = ctx;
        await control.addRectangle();
        map.removeImage('scale-orange');
        expect(map.hasImage('scale-orange')).toBe(false);

        map.fire('styleimagemissing', { id: 'scale-orange' });

        expect(map.hasImage('scale-orange')).toBe(true);
    });

    it('rejects a queued image cleanly if the control is removed during style loading', async () => {
        const { map, control } = ctx;
        const img = await loadImage(rotateUrl);
        const coordinates = control.createCoordinatesForLoadedImage(img);

        const loaded = map.once('style.load');
        map.setStyle({ version: 8, sources: {}, layers: [] }, { diff: false });
        const imagePromise = control.addImage({ imageUrl: rotateUrl, coordinates });
        map.removeControl(control);

        await expect(imagePromise).rejects.toThrow('not attached');
        await loaded;
        expect(rasterLayers(map)).toEqual([]);
    });

    it('cleanly cancels an unfinished polygon draft during style replacement', async () => {
        const { map, control } = ctx;
        control.startAddPolygonSequence();
        clickAt(map, map.unproject([120, 120]));
        await map.once('idle');
        clickAt(map, map.unproject([280, 120]));
        await map.once('idle');
        expect(document.getElementById(BUTTON_IDS.polygon)!.classList.contains('active')).toBe(true);

        const events: string[] = [];
        control.on('create', () => events.push('create'));
        control.on('change', () => events.push('change'));
        control.on('selected', () => events.push('selected'));

        const loaded = map.once('style.load');
        map.setStyle({ version: 8, sources: {}, layers: [] }, { diff: false });
        await loaded;
        await waitUntil(() => Boolean(map.getSource(GEOJSON_SOURCE) && map.getLayer(HANDLE_LAYER)));

        expect(document.getElementById(BUTTON_IDS.polygon)!.classList.contains('active')).toBe(false);
        const data = await (map.getSource(GEOJSON_SOURCE) as maplibregl.GeoJSONSource).getData() as GeoJSON.FeatureCollection;
        expect(data.features.some((f) => f.properties?.['temp'])).toBe(false);
        expect(events).toEqual([]);
    });

    it('rejects queued operations after a failed style load and recovers on the next style', async () => {
        const { map, control } = ctx;
        const img = await loadImage(rotateUrl);
        const coordinates = control.createCoordinatesForLoadedImage(img);

        const styleError = map.once('error');
        map.setStyle({ version: 7, sources: {}, layers: [] } as never, { diff: false });
        const imagePromise = control.addImage({ imageUrl: rotateUrl, coordinates });
        const polygonPromise = control.addPolygon(coordinates, false);
        const imageRejection = expect(imagePromise).rejects.toThrow();
        const polygonRejection = expect(polygonPromise).rejects.toThrow();

        await styleError;
        await Promise.all([imageRejection, polygonRejection]);

        const loaded = map.once('style.load');
        map.setStyle({ version: 8, sources: {}, layers: [] }, { diff: false });
        await loaded;
        await waitUntil(() => Boolean(map.getSource(GEOJSON_SOURCE) && map.getLayer(HANDLE_LAYER)));

        const data = await (map.getSource(GEOJSON_SOURCE) as maplibregl.GeoJSONSource).getData() as GeoJSON.FeatureCollection;
        expect(data.features).toEqual([]);
        await expect(control.addPolygon(coordinates, false)).resolves.toBeTruthy();
    });
});

describe('MaplibreAreaTransform rotation', () => {
    let ctx: SetupResponse;

    beforeEach(async () => { ctx = await setup(); });
    afterEach(() => { ctx.map.remove(); ctx.container.remove(); });

    it('rotates the feature when dragging the rotate handle', async () => {
        const { map, control } = ctx;
        const rectId = await control.addRectangle();

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
