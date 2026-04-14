import EventEmitter from "eventemitter3";
import { pxCentroid, pxDistance, pxMidpoint, pxResizeSide, pxRotatePolygon, pxScalePolygon, type PxPoint } from "./pixel-utils";
import rotate from '../assets/rotate.png';
import scale from '../assets/scale.png';

import type { Map, IControl, ImageSource, GeoJSONSource, MapMouseEvent, MapGeoJSONFeature, Coordinates } from "maplibre-gl";

/**
 * Options for the maplibre area transform control
 */
export type MaplibreAreaTransformOptions = {
    /**
     * Show the add image button
     * @default true
     */
    showAddImageButton?: boolean;
    /**
     * Show the polygon button
     * @default true
     */
    showPolygonButton?: boolean;
    /**
     * Show the add rectangle button
     * @default true
     */
    showAddRectangleButton?: boolean;
}

type MaplibreAreaTransformState = "rotating" | "scaling" | "resizeing" | "adding-points" | "moving" | "";

type BuildPolygonOptions = {
    coordinates: GeoJSON.Position[];
    featureId: string;
    isSelected: boolean;
}

const defaultOptions: MaplibreAreaTransformOptions = {
    showAddImageButton: true,
    showAddRectangleButton: true,
    showPolygonButton: true
}

const HANDLE_LAYER = 'area-transform-layer-polygon-handle';
const AREA_LAYER = 'area-transform-layer-polygon-area-';
const ID_PREFIX = 'area-transform-feature-';
const RESIZEABLE_POLYGON_FEATURE_ID = `${ID_PREFIX}resizable-`;
const IMAGE_SOURCE_PREFIX = 'raster-';
const GEOJSON_SOURCE = 'area-transform-geojson-source';

let maxFeatureId = 0;

/**
 * Maplibre area transform control
 * 
 * @example
 * ```typescript
 * const map = new Map({
 *   container: 'map',
 *   style: 'https://demotiles.maplibre.org/style.json',
 * });
 * const areaTransform = new MaplibreAreaTransform();
 * map.addControl(areaTransform);
 * ```
 */
export class MaplibreAreaTransform implements IControl {
    private _map: Map | null = null;
    private _container: HTMLElement | null = null;
    private _eventEmitter: EventEmitter = new EventEmitter();
    private _selectedFeatureId: string | null = null;
    private _state: MaplibreAreaTransformState = "";
    private _polygonPoints: GeoJSON.Position[] = [];
    private _startPx: PxPoint | null = null;
    private _startCornersPx: PxPoint[] | undefined = undefined; // corners at drag start

    constructor(private options: MaplibreAreaTransformOptions = defaultOptions) {
        this.options = { ...defaultOptions, ...options };
    }

    /** @inheritdoc */
    public onAdd(map: Map): HTMLElement {
        this._map = map;
        this._container = document.createElement('div');
        this._container.className = 'maplibregl-ctrl maplibregl-ctrl-area-transform';
        this.initMapListeners();
        this.initImages();
        this.initGeojsonSourceAndLayers();
        if (this.options.showAddImageButton) {
            this.initFileButton();
        }
        if (this.options.showAddRectangleButton) {
            this.initRectangleButton();
        }
        if (this.options.showPolygonButton) {
            this.initPolygonButton();
        }
        this._eventEmitter.emit('init');
        return this._container;
    }

    /**
     * Initialize the file button
     */
    private initFileButton() {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        fileInput.style.display = 'none';

        fileInput.onchange = this.onFileSelected;

        const button = document.createElement('button');
        button.type = 'button';
        button.setAttribute('aria-label', 'Add Image');
        const icon = document.createElement('span');
        icon.className = 'maplibregl-ctrl-icon-add-image';
        button.appendChild(icon);
        button.onclick = () => fileInput.click();
        this._container!.appendChild(fileInput);
        this._container!.appendChild(button);
    }

    /**
     * Initialize the polygon button
     */
    private initPolygonButton() {
        const button = document.createElement('button');
        button.type = 'button';
        button.setAttribute('aria-label', 'Add Polygon');
        const icon = document.createElement('span');
        icon.className = 'maplibregl-ctrl-icon-add-polygon';
        button.appendChild(icon);
        button.onclick = () => this.startAddPolygonSequence();
        this._container!.appendChild(button);
    }

    /**
     * Initialize the rectangle button
     */
    private initRectangleButton() {
        const button = document.createElement('button');
        button.type = 'button';
        button.setAttribute('aria-label', 'Add Rectangle');
        const icon = document.createElement('span');
        icon.className = 'maplibregl-ctrl-icon-add-rectangle';
        button.appendChild(icon);
        button.onclick = () => this.onClickAddRectangle();
        this._container!.appendChild(button);
    }

    private initGeojsonSourceAndLayers() {
        this._map?.addSource(GEOJSON_SOURCE, {
            type: 'geojson',
            promoteId: 'id',
            data: {
                type: "FeatureCollection",
                features: []
            }
        });
        this._map?.addLayer({
            id: HANDLE_LAYER,
            type: 'symbol',
            source: GEOJSON_SOURCE,
            layout: {
                'icon-image': ['get', 'icon'],
                'icon-allow-overlap': true,
                'icon-ignore-placement': true,
                'icon-rotate': ['get', 'heading']
            },
            filter: [
                'all',
                ['==', '$type', 'Point'],
                ['==', 'isSelected', true]
            ]
        });
        this._map?.addLayer({
            id: HANDLE_LAYER + '-circle',
            type: 'circle',
            source: GEOJSON_SOURCE,
            paint: {
                'circle-color': 'orange',
                'circle-radius': 3,
                'circle-stroke-color': 'white',
                'circle-stroke-width': 2
            },
            filter: ["==", "$type", "Point"]
        });

        this._map?.addLayer({
            id: AREA_LAYER,
            type: 'fill',
            source: GEOJSON_SOURCE,
            paint: {
                'fill-color': 'orange',
                'fill-opacity': 0.1
            },
            filter: ["==", "$type", "Polygon"]
        });
    }

    /** @inheritdoc */
    public onRemove(): void {
        this._container?.remove();
        this._map?.off('mousemove', this.onMouseMoveForCursor);
        this._map?.off('mousedown', this.onMouseDown);
        this._map?.off('mousemove', this.onMouseMove);
        this._map?.off('mouseup', this.onMouseUp);
        this._map?.off('click', this.onClick);
        this._map = null;
    }

    public async addImage(imageUrl: string, coordinates: GeoJSON.Position[]): Promise<string> {
        const imageId = `${ID_PREFIX}${maxFeatureId++}`;
        const imageSourceId = `${IMAGE_SOURCE_PREFIX}${imageId}`;
        this._map?.addSource(imageSourceId, {
            type: 'image',
            url: imageUrl,
            coordinates: coordinates as [[number, number], [number, number], [number, number], [number, number]]
        });
        this._map?.addLayer({
            id: 'layer-' + imageId,
            type: 'raster',
            source: imageSourceId,
            paint: {
                'raster-opacity': 0.9,
                'raster-fade-duration': 0
            }
        }, HANDLE_LAYER);
        const geojsonSource = this._map?.getSource<GeoJSONSource>(GEOJSON_SOURCE)!;
        await geojsonSource.updateData({
            add: this.buildPolygonGeoJSONFeatures({ coordinates, featureId: imageId, isSelected: true })
        }, true);
        await this.removeSelection();
        await this.setSelection(imageId);
        return imageId;
    }

    public onClickAddRectangle = () => {
        const canvas = this._map!.getCanvas();
        const startX = canvas.width / 3;
        const startY = canvas.height / 3;
        const width = canvas.width / 3;
        const height = canvas.height / 3;
        const corners: PxPoint[] = [[startX, startY], [startX + width, startY], [startX + width, startY + height], [startX, startY + height]];
        this.addPolygon(this.unprojectAll(corners), true);
    }

    public startAddPolygonSequence() {
        this.removeSelection();
        this._state = "adding-points";
        this._polygonPoints = [];
        this._map?.on('click', this.onClickAddRectanglePoint);
    }

    private onClickAddRectanglePoint = async (e: MapMouseEvent) => {
        if (this._state !== "adding-points") {
            return;
        }
        const coordinates = [e.lngLat.lng, e.lngLat.lat] as GeoJSON.Position;
        const source = this._map?.getSource<GeoJSONSource>(GEOJSON_SOURCE)!;
        this._polygonPoints.push(coordinates);
        if (this._polygonPoints.length === 4) {
            await source.updateData({ remove: ["temp-point-1", "temp-point-2", "temp-point-3"] }, true);
            const corners = this.sortCorners([
                this._polygonPoints[0]!, this._polygonPoints[1]!,
                this._polygonPoints[2]!, this._polygonPoints[3]!
            ]);
            this.addPolygon(corners, false);
            this._state = "";
            this._polygonPoints = [];
            this._map?.off('click', this.onClickAddRectanglePoint);
        } else {
            await source.updateData({
                add: [{
                    type: "Feature",
                    geometry: {
                        type: "Point",
                        coordinates
                    },
                    properties: {
                        id: "temp-point-" + this._polygonPoints.length,
                        temp: true,
                        isSelected: false
                    }
                }]
            }, true);
        }
    }

    /**
     * Sort corners of a rectangle in clockwise order starting from the top-left corner.
     * @param corners The corners of the rectangle.
     * @returns The sorted corners of the rectangle.
     */
    private sortCorners(corners: GeoJSON.Position[]): GeoJSON.Position[] {
        // Sort in pixel space (flat, unambiguous)
        const cornersPx = this.projectAll(corners);
        const centerPx = pxCentroid(cornersPx);
        const indexed = cornersPx.map((px, i) => ({
            px, i,
            angle: Math.atan2(px[1] - centerPx[1], px[0] - centerPx[0])
        }));
        indexed.sort((a, b) => a.angle - b.angle);

        // Find top-left (min x - y in pixel space)
        let topLeftIndex = 0;
        let minVal = Infinity;
        indexed.forEach((item, i) => {
            const val = item.px[0] - item.px[1];
            if (val < minVal) {
                minVal = val;
                topLeftIndex = i;
            }
        });

        const sorted = [...indexed.slice(topLeftIndex), ...indexed.slice(0, topLeftIndex)];
        return sorted.map(item => corners[item.i]!);
    }

    public async addPolygon(coordinates: GeoJSON.Position[], resizable: boolean) {
        const polygonId = `${resizable ? RESIZEABLE_POLYGON_FEATURE_ID : ID_PREFIX}${maxFeatureId++}`;
        const geojsonSource = this._map?.getSource<GeoJSONSource>(GEOJSON_SOURCE)!;
        await geojsonSource.updateData({
            add: this.buildPolygonGeoJSONFeatures({ coordinates, featureId: polygonId, isSelected: true })
        }, true);
        await this.removeSelection();
        await this.setSelection(polygonId);
    }

    public on(event: string, listener: (...args: any[]) => void): void {
        this._eventEmitter.on(event, listener);
    }

    public off(event: string, listener: (...args: any[]) => void): void {
        this._eventEmitter.off(event, listener);
    }

    private onFileSelected = (e: Event) => {
        const target = e.target as HTMLInputElement;
        const file = target.files?.[0];
        if (!file) return;

        const imageUrl = URL.createObjectURL(file);
        const img = new Image();

        img.onload = () => {
            const aspect = img.naturalWidth / img.naturalHeight;

            const canvas = this._map!.getCanvas();

            const baseWidth = canvas.width / 4;
            const baseHeight = baseWidth / aspect;
            const startX = canvas.width / 4;
            const startY = canvas.height / 4;
            const corners: PxPoint[] = [
                [startX, startY], [startX + baseWidth, startY],
                [startX + baseWidth, startY + baseHeight], [startX, startY + baseHeight]
            ];
            this.addImage(imageUrl, this.unprojectAll(corners));
            this._eventEmitter.emit('fileSelected', { file, imageUrl });
        };
        img.src = imageUrl;
        target.value = '';
    };

    private initMapListeners() {
        this._map?.on('mousemove', this.onMouseMoveForCursor);
        this._map?.on('mousedown', this.onMouseDown);
        this._map?.on('mousemove', this.onMouseMove);
        this._map?.on('mouseup', this.onMouseUp);
        this._map?.on('click', this.onClick);
    }

    private buildPolygonGeoJSONFeatures(buildOptions: BuildPolygonOptions): GeoJSON.Feature[] {
        const { coordinates, featureId, isSelected } = buildOptions;
        const features: GeoJSON.Feature[] = [{
            type: 'Feature',
            geometry: { type: 'Polygon', coordinates: [[...coordinates, coordinates[0]!]] },
            properties: { id: "rect-" + featureId, featureId }
        }];
        for (let i = 0; i < coordinates.length; i++) {
            features.push({
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: coordinates[i]!
                },
                properties: {
                    id: "scale-" + i + "-" + featureId,
                    featureId,
                    type: 'scale-handle',
                    icon: 'scale',
                    isSelected,
                    heading: this.getScaleHandleHeading(coordinates, coordinates[i]!)
                }
            });
        }
        return features;
    }

    private getRotateHandlePoint(coordinates: GeoJSON.Position[], featureId: string): GeoJSON.Feature {
        const pxCorners = this.projectAll(coordinates);
        const p0 = pxCorners[0]!;
        const p1 = pxCorners[1]!;
        const midPx = pxMidpoint(p0, p1);

        // Offset perpendicular to the first edge
        const edgeVec: PxPoint = [p0[0] - p1[0], p0[1] - p1[1]];
        const edgeLen = Math.sqrt(edgeVec[0] ** 2 + edgeVec[1] ** 2);
        const normalPx: PxPoint = [-edgeVec[1] / edgeLen, edgeVec[0] / edgeLen];
        const offsetDist = edgeLen * 0.075;
        const handlePx: PxPoint = [midPx[0] + normalPx[0] * offsetDist, midPx[1] + normalPx[1] * offsetDist];
        const handleCoord = this.unproject(handlePx);

        return {
            type: 'Feature',
            geometry: { type: 'Point', coordinates: handleCoord },
            properties: {
                id: "rotate-" + featureId,
                type: 'rotate-handle',
                icon: 'rotate',
                isSelected: true
            }
        };
    }

    private getResizeHandlePoints(coordinates: GeoJSON.Position[], featureId: string): GeoJSON.Feature[] {
        const points: GeoJSON.Feature[] = [];
        const pxCorners = this.projectAll(coordinates);
        for (let i = 0; i < pxCorners.length; i++) {
            const nextPx = pxCorners[(i + 1) % pxCorners.length]!;
            const midPx = pxMidpoint(pxCorners[i]!, nextPx);
            const coordinate = this.unproject(midPx);
            points.push({
                type: 'Feature' as const,
                geometry: {
                    type: 'Point' as const,
                    coordinates: coordinate
                },
                properties: {
                    id: "resize-" + i + "-" + featureId,
                    featureId,
                    type: 'resize-handle',
                    icon: 'scale',
                    isSelected: true,
                    heading: this.getScaleHandleHeading(coordinates, coordinate)
                }
            });
        }
        return points;
    }

    /** Heading in degrees for scale handle icon rotation — kept in geo-bearing for icon display */
    private getScaleHandleHeading(coordinates: GeoJSON.Position[], currentPoint: GeoJSON.Position): number {
        // bearing() here is fine — it's only used for icon heading display, not geometry
        const px = this.projectAll(coordinates);
        const centerPx = pxCentroid(px);
        const currentPx = this.project(currentPoint);
        const angleDeg = Math.atan2(currentPx[1] - centerPx[1], currentPx[0] - centerPx[0]) * (180 / Math.PI);
        // Convert from canvas angle (east=0, clockwise) to map bearing (north=0, clockwise)
        return (angleDeg + 90 + 360) % 360;
    }

    private onMouseMoveForCursor = (e: MapMouseEvent) => {
        if (this._selectedFeatureId == null || this._startPx != null) {
            this._map!.getCanvas().style.cursor = '';
            return;
        }
        const features = this._map?.queryRenderedFeatures(e.point);
        const rotate = features?.find(f => f.layer.id.startsWith(HANDLE_LAYER) && f.properties["type"] === 'rotate-handle');
        const scale = features?.find(f => f.layer.id.startsWith(HANDLE_LAYER) && f.properties["type"] === 'scale-handle');
        const resize = features?.find(f => f.layer.id.startsWith(HANDLE_LAYER) && f.properties["type"] === 'resize-handle');
        const drag = features?.find(f => f.layer.id.startsWith(AREA_LAYER));

        if (rotate) {
            this._map!.getCanvas().style.cursor = 'crosshair';
        } else if (scale) {
            const headingNormalized = (scale.properties["heading"] + 180) % 180;
            this._map!.getCanvas().style.cursor = headingNormalized <= 90 ? "nesw-resize" : "nwse-resize";
        } else if (resize) {
            const headingNormalized = (resize.properties["heading"] + 225) % 180;
            this._map!.getCanvas().style.cursor = headingNormalized <= 90 ? "ns-resize" : "ew-resize";
        } else if (drag) {
            this._map!.getCanvas().style.cursor = 'move';
        } else {
            this._map!.getCanvas().style.cursor = '';
        }
    }

    private onMouseDown = (e: MapMouseEvent) => {
        if (this._selectedFeatureId == null) {
            return;
        }
        let features = this._map?.queryRenderedFeatures(e.point);
        features = features?.filter(f => f.source === GEOJSON_SOURCE) ?? [];
        if (features.length <= 0) {
            return;
        }
        e.preventDefault();
        const currentPx: PxPoint = [e.point.x, e.point.y];
        this.setStateFromMouseDown(currentPx, features);
    }

    private async setStateFromMouseDown(currentPx: PxPoint, queriedFeatures: MapGeoJSONFeature[]) {
        const data = await this._map?.getSource<GeoJSONSource>(GEOJSON_SOURCE)?.getData() as GeoJSON.FeatureCollection;

        const featurePoints = data.features.filter(f => f.geometry.type === "Point" && f.properties?.["featureId"] === this._selectedFeatureId) as GeoJSON.Feature<GeoJSON.Point>[];

        this._startCornersPx = featurePoints
            .filter(f => f.properties?.["type"] === "scale-handle")
            .map(f => this.project(f.geometry.coordinates));

        if (!queriedFeatures.some(f => f.layer.id.startsWith(HANDLE_LAYER))) {
            this._state = "moving";
            this._startPx = currentPx;
            return;
        }
        if (queriedFeatures.some(f => f.properties["type"] === "rotate-handle")) {
            this._state = "rotating";
            this._startPx = currentPx;
            return;
        }

        let closestFeature = featurePoints[0]!;
        for (const feature of featurePoints) {
            const fPx = this.project((feature.geometry as GeoJSON.Point).coordinates);
            const bestPx = this.project((closestFeature.geometry as GeoJSON.Point).coordinates);
            if (pxDistance(fPx, currentPx) < pxDistance(bestPx, currentPx)) {
                closestFeature = feature;
            }
        }

        this._startPx = this.project((closestFeature.geometry as GeoJSON.Point).coordinates);
        if (closestFeature.properties?.["type"] === "scale-handle") {
            this._state = "scaling";
        } else {
            this._state = "resizeing";
        }
    }

    private onMouseMove = (e: MapMouseEvent) => {
        if (!this._selectedFeatureId || this._startPx == null) return;
        const currentPx: PxPoint = [e.point.x, e.point.y];

        let newCornersPx: PxPoint[];
        switch (this._state) {
            case "rotating":
                newCornersPx = pxRotatePolygon(this._startCornersPx!, this._startPx, currentPx);
                break;
            case "scaling":
                newCornersPx = pxScalePolygon(this._startCornersPx!, this._startPx, currentPx);
                break;
            case "resizeing":
                newCornersPx = pxResizeSide(this._startCornersPx!, this._startPx, currentPx);
                break;
            default:
            case "moving": {
                const dx = currentPx[0] - this._startPx[0];
                const dy = currentPx[1] - this._startPx[1];
                newCornersPx = this._startCornersPx!.map(p => [p[0] + dx, p[1] + dy] as PxPoint);
                break;
            }
        }
        const newCoordinates = this.unprojectAll(newCornersPx);

        this._map?.getSource<ImageSource>(`${IMAGE_SOURCE_PREFIX}${this._selectedFeatureId}`)?.setCoordinates(newCoordinates as Coordinates);
        this.updateCoordinates(this._selectedFeatureId, newCoordinates);
    }

    private onMouseUp = () => {
        this._startPx = null;
        this._startCornersPx = undefined;
        if (this._state !== "adding-points") {
            this._state = "";
        }
    }

    private onClick = (e: MapMouseEvent) => {
        if (this._state === "adding-points") {
            return;
        }
        const features = this._map?.queryRenderedFeatures(e.point);
        const polygonFeature = features?.find(f => f.layer.id.startsWith(AREA_LAYER));
        this.removeSelection();
        if (polygonFeature) {
            this.setSelection(polygonFeature.properties["featureId"]);
        }
    }

    private async initImages() {
        const rotateImage = await this._map?.loadImage(rotate);
        this._map?.addImage('rotate', rotateImage?.data!);
        const scaleImage = await this._map?.loadImage(scale);
        this._map?.addImage('scale', scaleImage?.data!);
    }

    private async removeSelection() {
        this._selectedFeatureId = null;
        const source = this._map?.getSource<GeoJSONSource>(GEOJSON_SOURCE)!;
        const data = await source.getData() as GeoJSON.FeatureCollection;
        for (const feature of data.features) {
            delete feature?.properties?.["isSelected"];
        }
        data.features = data.features.filter(f => f.properties?.["type"] !== "rotate-handle" && f.properties?.["type"] !== "resize-handle");
        await source.setData(data, true);
    }

    private async setSelection(featureId: string) {
        this._selectedFeatureId = featureId;
        const source = this._map?.getSource<GeoJSONSource>(GEOJSON_SOURCE)!;
        const data = await source.getData() as GeoJSON.FeatureCollection;
        const corners: GeoJSON.Feature<GeoJSON.Point>[] = [];
        for (const feature of data.features) {
            if (feature.geometry.type === "Point" &&
                feature.properties?.["featureId"] === featureId &&
                feature.properties?.["type"] === "scale-handle") {
                feature.properties!["isSelected"] = true;
                corners.push(feature as GeoJSON.Feature<GeoJSON.Point>);
            }
        }
        corners.sort((a, b) => a.properties?.["id"] < b.properties?.["id"] ? -1 : 1);
        const coords = corners.map(f => f.geometry.coordinates);
        data.features.push(this.getRotateHandlePoint(coords, featureId));
        if (featureId.startsWith(RESIZEABLE_POLYGON_FEATURE_ID)) {
            data.features.push(...this.getResizeHandlePoints(coords, featureId));
        }
        await source.setData(data, true);
    }

    private async updateCoordinates(featureId: string, newCoordinates: GeoJSON.Position[]) {
        const source = this._map?.getSource<GeoJSONSource>(GEOJSON_SOURCE)!;
        const data = await source.getData() as GeoJSON.FeatureCollection;
        data.features = data.features.filter(f => f.properties?.["featureId"] !== featureId);
        data.features.push(...this.buildPolygonGeoJSONFeatures({ coordinates: newCoordinates, featureId, isSelected: true }));
        data.features = data.features.filter(
            f => f.properties?.["type"] !== "rotate-handle" && f.properties?.["type"] !== "resize-handle"
        );
        data.features.push(this.getRotateHandlePoint(newCoordinates, featureId));
        if (featureId.startsWith(RESIZEABLE_POLYGON_FEATURE_ID)) {
            data.features.push(...this.getResizeHandlePoints(newCoordinates, featureId));
        }
        await source.setData(data, true);
    }
    /** Project a lat/lng GeoJSON position to map pixel point */
    private project(pos: GeoJSON.Position): PxPoint {
        const pt = this._map!.project([pos[0]!, pos[1]!]);
        return [pt.x, pt.y];
    }

    /** Unproject a pixel point back to [lng, lat] */
    private unproject(px: PxPoint): GeoJSON.Position {
        const ll = this._map!.unproject(px as [number, number]);
        return [ll.lng, ll.lat];
    }

    /** Project an array of lat/lng positions to pixel points */
    private projectAll(coords: GeoJSON.Position[]): PxPoint[] {
        return coords.map(c => this.project(c));
    }

    /** Unproject pixel points back to lat/lng positions */
    private unprojectAll(pxPoints: PxPoint[]): GeoJSON.Position[] {
        return pxPoints.map(p => this.unproject(p));
    }
}