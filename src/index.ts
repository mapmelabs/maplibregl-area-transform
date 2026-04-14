import EventEmitter from "eventemitter3";
import { transformScale } from "@turf/transform-scale";
import { transformRotate } from "@turf/transform-rotate";
import { distance } from "@turf/distance";
import { bearing } from "@turf/bearing";
import { destination } from "@turf/destination";
import { centroid } from "@turf/centroid";

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
    private _isScaling: boolean = false;
    private _isRotating: boolean = false;
    private _isAddingPolygon: boolean = false;
    private _isResizing: boolean = false;
    private _polygonPoints: GeoJSON.Position[] = [];
    private _startPoint: GeoJSON.Position | null = null;
    private _startPointCoordinates: GeoJSON.Position[] | undefined = undefined;

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

        // Create an internal span or div to hold the icon
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
                "type": "FeatureCollection",
                "features": []
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
            ],
        });
        this._map?.addLayer({
            id: HANDLE_LAYER + '-circle',
            type: 'circle',
            source: GEOJSON_SOURCE,
            paint: {
                'circle-color': 'orange',
                'circle-radius': 3,
                'circle-stroke-color': 'white',
                'circle-stroke-width': 2,
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
        const geojsonSource = this._map?.getSource<GeoJSONSource>(GEOJSON_SOURCE)!
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

        const topLeft = this._map!.unproject([startX, startY]);
        const topRight = this._map!.unproject([startX + width, startY]);
        const bottomRight = this._map!.unproject([startX + width, startY + height]);
        const bottomLeft = this._map!.unproject([startX, startY + height]);

        this.addPolygon([
            [topLeft.lng, topLeft.lat],
            [topRight.lng, topRight.lat],
            [bottomRight.lng, bottomRight.lat],
            [bottomLeft.lng, bottomLeft.lat]
        ], true);
    }

    public startAddPolygonSequence() {
        this._isAddingPolygon = true;
        this._polygonPoints = [];
        this._map?.on('click', this.onClickAddRectanglePoint);
    }

    private onClickAddRectanglePoint = async (e: MapMouseEvent) => {
        if (!this._isAddingPolygon) return;
        const coordinates = [e.lngLat.lng, e.lngLat.lat] as GeoJSON.Position;
        const source = this._map?.getSource<GeoJSONSource>(GEOJSON_SOURCE)!;
        this._polygonPoints?.push(coordinates);
        if (this._polygonPoints?.length === 4) {
            await source.updateData({
                remove: ["temp-point-1", "temp-point-2", "temp-point-3"]
            }, true);
            const corners = this.sortCorners([
                this._polygonPoints[0]!,
                this._polygonPoints[1]!,
                this._polygonPoints[2]!,
                this._polygonPoints[3]!
            ]);

            this.addPolygon(corners, false);
            this._isAddingPolygon = false;
            this._polygonPoints = [];
            this._map?.off('click', this.onClickAddRectanglePoint);
        } else {
            await source.updateData({
                add: [{
                    type: "Feature",
                    geometry: {
                        type: "Point",
                        coordinates: coordinates
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
        const center = this.getCenter(corners);
        corners.sort((a, b) => bearing(center, a) - bearing(center, b));

        // Find the top-left point (minimum longitude - latitude) to make it first
        let topLeftIndex = 0;
        let minVal = Infinity;
        corners.forEach((c, i) => {
            const val = c[0]! - c[1]!;
            if (val < minVal) {
                minVal = val;
                topLeftIndex = i;
            }
        });
        return [...corners.slice(topLeftIndex), ...corners.slice(0, topLeftIndex)];
    }

    public async addPolygon(coordinates: GeoJSON.Position[], resizable: boolean) {
        const polygonId = `${resizable ? RESIZEABLE_POLYGON_FEATURE_ID : ID_PREFIX}${maxFeatureId++}`;
        const geojsonSource = this._map?.getSource<GeoJSONSource>(GEOJSON_SOURCE)!
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
            // Define a base size (e.g., 1/4 of canvas width)
            const baseWidth = canvas.width / 4;
            const calculatedHeight = baseWidth / aspect;

            // Calculate screen coordinates (centering the image)
            const startX = canvas.width / 4;
            const startY = canvas.height / 4;

            const topLeft = this._map!.unproject([startX, startY]);
            const topRight = this._map!.unproject([startX + baseWidth, startY]);
            const bottomRight = this._map!.unproject([startX + baseWidth, startY + calculatedHeight]);
            const bottomLeft = this._map!.unproject([startX, startY + calculatedHeight]);

            this.addImage(imageUrl, [
                [topLeft.lng, topLeft.lat],
                [topRight.lng, topRight.lat],
                [bottomRight.lng, bottomRight.lat],
                [bottomLeft.lng, bottomLeft.lat]
            ]);

            this._eventEmitter.emit('fileSelected', { file, imageUrl });
        };

        img.src = imageUrl;
        target.value = '';
    };

    private getOpositePoint(coordinates: GeoJSON.Position[], point: GeoJSON.Position): GeoJSON.Position {
        let maxDistance = -Infinity;
        let oppositePoint: GeoJSON.Position = coordinates[0]!;

        for (const coordinate of coordinates) {
            // Skip the point itself
            if (
                Math.abs(coordinate[0]! - point[0]!) < 1e-4 &&
                Math.abs(coordinate[1]! - point[1]!) < 1e-4
            ) {
                continue;
            }

            const dist = distance(point, coordinate);
            if (dist > maxDistance) {
                maxDistance = dist;
                oppositePoint = coordinate;
            }
        }

        return oppositePoint;
    }

    private getCenter(coordinates: GeoJSON.Position[]): GeoJSON.Position {
        const center = centroid({ type: 'Polygon', coordinates: [[...coordinates, coordinates[0]!]] });
        return center.geometry.coordinates;
    }

    private initMapListeners() {
        this._map?.on('mousemove', this.onMouseMoveForCursor);
        this._map?.on('mousedown', this.onMouseDown);
        this._map?.on('mousemove', this.onMouseMove);
        this._map?.on('mouseup', this.onMouseUp);
        this._map?.on('click', this.onClick);
    }

    private buildPolygonGeoJSONFeatures(buildOptions: BuildPolygonOptions): GeoJSON.Feature[] {
        const { coordinates, featureId, isSelected } = buildOptions;
        let features: GeoJSON.Feature[] = [];
        features.push({
            type: 'Feature' as const,
            geometry: {
                type: 'Polygon' as const,
                coordinates: [[...coordinates, coordinates[0]!]] // close the polygon
            },
            properties: {
                id: "rect-" + featureId,
                featureId,
            }
        });
        for (let i = 0; i < coordinates.length; i++) {
            const coordinate = coordinates[i]!;
            features.push({
                type: 'Feature' as const,
                geometry: {
                    type: 'Point' as const,
                    coordinates: coordinate
                },
                properties: {
                    id: "scale-" + i + "-" + featureId,
                    featureId,
                    type: 'scale-handle',
                    icon: 'scale',
                    isSelected: isSelected,
                    heading: this.getScaleHandleHeading(coordinates, coordinate)
                }
            });
        }
        return features;
    }

    private getRotateHandlePoint(coordinates: GeoJSON.Position[], featureId: string): GeoJSON.Feature {
        const point1 = coordinates[0]!;
        const point2 = coordinates[1]!;

        const mid = this.getMidPoint(point1, point2);
        const pointsBearing = bearing(point1, point2);
        const perpendicularBearing = (pointsBearing - 90 + 360) % 360;

        const pointsDistance = distance(point1, point2, { units: 'kilometers' });
        const offsetPoint = destination(mid, pointsDistance * 0.075, perpendicularBearing, { units: 'kilometers' });
        offsetPoint.properties = {
            id: "rotate-" + featureId,
            type: 'rotate-handle',
            icon: 'rotate',
            isSelected: true
        }
        return offsetPoint;
    }

    private getResizeHandlePoints(coordinates: GeoJSON.Position[], featureId: string): GeoJSON.Feature[] {
        const points: GeoJSON.Feature[] = [];
        for (let i = 0; i < coordinates.length; i++) {
            const nextIndex = (i + 1) % coordinates.length;
            const coordinate = this.getMidPoint(coordinates[i]!, coordinates[nextIndex]!);
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

    private getScaleHandleHeading(coordinates: GeoJSON.Position[], currentPoint: GeoJSON.Position): number {
        const center = this.getCenter(coordinates);
        return bearing(center, currentPoint);
    }

    private onMouseMoveForCursor = (e: MapMouseEvent) => {
        if (this._selectedFeatureId == null || this._startPoint != null) {
            this._map!.getCanvas().style.cursor = '';
            return;
        }
        const features = this._map?.queryRenderedFeatures(e.point);
        const rotate = features?.find((feature) => feature.layer.id.startsWith(HANDLE_LAYER) && feature.properties["type"] === 'rotate-handle');
        const scale = features?.find((feature) => feature.layer.id.startsWith(HANDLE_LAYER) && feature.properties["type"] === 'scale-handle');
        const resize = features?.find((feature) => feature.layer.id.startsWith(HANDLE_LAYER) && feature.properties["type"] === 'resize-handle');
        const drag = features?.find((feature) => feature.layer.id.startsWith(AREA_LAYER));
        if (rotate) {
            this._map!.getCanvas().style.cursor = 'crosshair';
        } else if (scale) {
            const headingNormalized = (scale.properties["heading"] + 180) % 180;
            this._map!.getCanvas().style.cursor = headingNormalized <= 90 ? "nesw-resize" : "nwse-resize";
        } else if (resize) {
            const headingNormalized = ((resize.properties["heading"] + 225) % 180);
            this._map!.getCanvas().style.cursor = headingNormalized <= 90 ? "ns-resize" : "ew-resize";
        } else if (drag) {
            this._map!.getCanvas().style.cursor = 'move';
        } else this._map!.getCanvas().style.cursor = '';
    }

    private onMouseDown = (e: MapMouseEvent) => {
        if (this._selectedFeatureId == null) {
            return;
        }
        let features = this._map?.queryRenderedFeatures(e.point);
        features = features?.filter((feature) => feature.source === GEOJSON_SOURCE) ?? [];
        if (features.length <= 0) {
            return;
        }
        e.preventDefault();
        const currentPoint = [e.lngLat.lng, e.lngLat.lat] as [number, number];
        this.setStateFromMouseDown(currentPoint, features);
    }

    private async setStateFromMouseDown(currentPoint: [number, number], queriedFeatures: MapGeoJSONFeature[]) {
        const data = await this._map?.getSource<GeoJSONSource>(GEOJSON_SOURCE)?.getData() as GeoJSON.FeatureCollection;

        const featurePoints = data.features.filter(f => f.geometry.type === "Point" && f.properties?.["featureId"] === this._selectedFeatureId) as GeoJSON.Feature<GeoJSON.Point>[];

        this._startPointCoordinates = featurePoints
            .filter(f => f.properties?.["type"] === "scale-handle")
            .map(f => (f.geometry as GeoJSON.Point).coordinates);

        if (!queriedFeatures.some(f => f.layer.id.startsWith(HANDLE_LAYER))) {
            this._startPoint = currentPoint;
            return;
        }
        if (queriedFeatures.some(f => f.properties["type"] === "rotate-handle")) {
            this._isRotating = true;
            this._startPoint = currentPoint;
            return;
        }
        let closestFeature: GeoJSON.Feature<GeoJSON.Point> = featurePoints[0]!;
        for (let feature of featurePoints) {
            if (distance(feature.geometry.coordinates, currentPoint) < distance(closestFeature.geometry.coordinates, currentPoint)) {
                closestFeature = feature;
            }
        }

        this._startPoint = closestFeature.geometry.coordinates;
        if (closestFeature.properties?.["type"] === "scale-handle") {
            this._isScaling = true;
        } else {
            this._isResizing = true;
        }
    }

    private onMouseMove = (e: MapMouseEvent) => {
        if (!this._selectedFeatureId) return;
        if (this._startPoint == null) return;
        let newCoordinates: GeoJSON.Position[];
        if (this._isRotating) {
            newCoordinates = this.rotatePolygon([e.lngLat.lng, e.lngLat.lat]);
        } else if (this._isScaling) {
            newCoordinates = this.scalePolygon([e.lngLat.lng, e.lngLat.lat]);
        } else if (this._isResizing) {
            newCoordinates = this.resizeRectangleSide([e.lngLat.lng, e.lngLat.lat]);
        } else {
            const diff = [e.lngLat.lng - this._startPoint![0]!, e.lngLat.lat - this._startPoint![1]!];
            newCoordinates = this._startPointCoordinates!.map((coordinate) => [
                coordinate[0]! + diff[0]!,
                coordinate[1]! + diff[1]!
            ]);
        }

        this._map?.getSource<ImageSource>(`${IMAGE_SOURCE_PREFIX}${this._selectedFeatureId}`)?.setCoordinates(newCoordinates as Coordinates);
        this.updateCoordinates(this._selectedFeatureId, newCoordinates);
    }

    private onMouseUp = () => {
        this._startPoint = null;
        this._startPointCoordinates = undefined;
        this._isScaling = false;
        this._isRotating = false;
        this._isResizing = false;
    }

    private onClick = (e: MapMouseEvent) => {
        if (this._isAddingPolygon) {
            return;
        }
        const features = this._map?.queryRenderedFeatures(e.point);
        const polygonFeature = features?.find((feature) => feature.layer.id.startsWith(AREA_LAYER));
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
        for (let feature of data.features) {
            delete feature?.properties?.["isSelected"];
        }
        data.features = data.features.filter(f => f.properties?.["type"] !== "rotate-handle" && f.properties?.["type"] !== "resize-handle");
        await source.setData(data, true);
    }

    private async setSelection(featureId: string) {
        this._selectedFeatureId = featureId;
        const source = this._map?.getSource<GeoJSONSource>(GEOJSON_SOURCE)!;
        const data = await source.getData() as GeoJSON.FeatureCollection;
        const corners: GeoJSON.Feature<GeoJSON.Point>[] = []
        for (let feature of data.features) {
            if (feature.geometry.type === "Point" &&
                feature.properties?.["featureId"] === featureId &&
                feature.properties?.["type"] === "scale-handle") {
                feature.properties!["isSelected"] = true;
                corners.push(feature as GeoJSON.Feature<GeoJSON.Point>);
            }
        }
        corners.sort((f1, f2) => f2.properties?.["id"] < f1.properties?.["id"] ? 1 : -1);
        data.features.push(this.getRotateHandlePoint(corners.map(f => (f.geometry.coordinates)), featureId))
        if (featureId.startsWith(RESIZEABLE_POLYGON_FEATURE_ID)) {
            data.features.push(...this.getResizeHandlePoints(corners.map(f => (f.geometry.coordinates)), featureId));
        }
        await source.setData(data, true);
    }

    private async updateCoordinates(featureId: string, newCoordinates: GeoJSON.Position[]) {
        const source = this._map?.getSource<GeoJSONSource>(GEOJSON_SOURCE)!;
        const data = await source.getData() as GeoJSON.FeatureCollection;
        data.features = data.features.filter(f => f.properties?.["featureId"] !== featureId);
        data.features.push(...this.buildPolygonGeoJSONFeatures({ coordinates: newCoordinates, featureId, isSelected: true }));
        data.features = data.features.filter(f => f.properties?.["type"] !== "rotate-handle" && f.properties?.["type"] !== "resize-handle");
        data.features.push(this.getRotateHandlePoint(newCoordinates, featureId));
        if (featureId.startsWith(RESIZEABLE_POLYGON_FEATURE_ID)) {
            data.features.push(...this.getResizeHandlePoints(newCoordinates, featureId));
        }
        await source.setData(data, true);
    }

    private rotatePolygon(currentPoint: GeoJSON.Position): GeoJSON.Position[] {
        const center = this.getCenter(this._startPointCoordinates!);
        const angle1 = bearing(this._startPoint!, center);
        const angle2 = bearing(currentPoint, center);
        let transformedFature = transformRotate(
            {
                type: "Feature",
                geometry: {
                    type: "Polygon",
                    coordinates: [this._startPointCoordinates!]
                },
                properties: {}
            },
            angle2 - angle1,
            {
                mutate: false,
                pivot: center
            }
        );
        return transformedFature.geometry.coordinates[0]!;
    }

    private scalePolygon(currentPoint: GeoJSON.Position): GeoJSON.Position[] {
        const oppositePoint = this.getOpositePoint(this._startPointCoordinates!, this._startPoint!)
        const distanceStartOpposite = distance(this._startPoint!, oppositePoint);
        const distanceCurrentOpposite = distance(currentPoint, oppositePoint);
        const scale = distanceCurrentOpposite / distanceStartOpposite;
        let transformedFature = transformScale({
            type: "Feature",
            geometry: {
                type: "Polygon",
                coordinates: [this._startPointCoordinates!]
            },
            properties: {}
        },
            scale,
            {
                mutate: false,
                origin: oppositePoint
            });
        return transformedFature.geometry.coordinates[0]!;
    }

    private resizeRectangleSide(
        currentPoint: GeoJSON.Position
    ): GeoJSON.Position[] {
        const startCoord = this._startPoint as [number, number];

        const edgeIndex = this.getClosestEdgeIndex(this._startPointCoordinates!, startCoord);
        const i0 = edgeIndex;
        const i1 = (edgeIndex + 1) % 4;

        const edgeBearing = bearing(this._startPointCoordinates![i0]!, this._startPointCoordinates![i1]!);
        const normalBearing = edgeBearing - 90;

        const dragDistance = distance(startCoord, currentPoint, { units: 'kilometers' });
        const dragBearing = bearing(startCoord, currentPoint);

        const angleDiff = ((dragBearing - normalBearing + 360) % 360);
        let projectedDistance = dragDistance * Math.cos((angleDiff * Math.PI) / 180);

        // Find the opposite edge midpoint and measure how far the dragged edge
        // currently is from it — this is the maximum we can move before flipping
        const oppositeEdgeIndex = (edgeIndex + 2) % 4;
        const i2 = oppositeEdgeIndex;
        const i3 = (oppositeEdgeIndex + 1) % 4;

        const draggedEdgeMid = this.getMidPoint(
            this._startPointCoordinates![i0]!,
            this._startPointCoordinates![i1]!
        );
        const oppositeEdgeMid = this.getMidPoint(
            this._startPointCoordinates![i2]!,
            this._startPointCoordinates![i3]!
        );

        const maxDistance = distance(draggedEdgeMid, oppositeEdgeMid, { units: 'kilometers' });

        projectedDistance = Math.max(projectedDistance, -(maxDistance * 0.9));

        const newP0 = destination(
            this._startPointCoordinates![i0]!,
            projectedDistance,
            normalBearing,
            { units: 'kilometers' }
        ).geometry.coordinates;

        const newP1 = destination(
            this._startPointCoordinates![i1]!,
            projectedDistance,
            normalBearing,
            { units: 'kilometers' }
        ).geometry.coordinates;

        const newCoordinates = [...this._startPointCoordinates!];
        newCoordinates[i0] = newP0;
        newCoordinates[i1] = newP1;

        return newCoordinates;
    }

    private getClosestEdgeIndex(coordinates: GeoJSON.Position[], point: GeoJSON.Position): number {
        let closestIndex = 0;
        let minDistance = Infinity;

        for (let i = 0; i < coordinates.length; i++) {
            const p0 = coordinates[i] as [number, number];
            const p1 = coordinates[(i + 1) % coordinates.length] as [number, number];

            // Midpoint of this edge
            const midPoint = this.getMidPoint(p0, p1);
            const dist = distance(point, midPoint);

            if (dist < minDistance) {
                minDistance = dist;
                closestIndex = i;
            }
        }

        return closestIndex;
    }

    private getMidPoint(p1: GeoJSON.Position, p2: GeoJSON.Position): GeoJSON.Position {
        return [
            (p1![0]! + p2![0]!) / 2,
            (p1![1]! + p2![1]!) / 2
        ];
    }
}