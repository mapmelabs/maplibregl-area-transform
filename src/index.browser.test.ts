import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import * as maplibregl from 'maplibre-gl';
import { MaplibreAreaTransform } from './index';
import rotateUrl from '../assets/rotate.png';

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
