import { describe, it, expect, beforeAll, afterAll, beforeEach, afterEach } from 'vitest';
import * as maplibregl from 'maplibre-gl';
import { MaplibreAreaTransform, type MaplibreAreaTransformOptions } from './index';
import rotateUrl from '../assets/rotate.png';

const AREA_LAYER = 'area-transform-layer-polygon-area';
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
async function setup(options?: MaplibreAreaTransformOptions) {
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
