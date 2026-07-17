import EventEmitter from "eventemitter3";
import { pxCentroid, pxDistance, pxMidpoint, pxRotatePolygon, pxScalePolygon, pxMovePoints, sortPoints, type PxPoint, pxResizePolygon, pxAngle } from "./pixel-utils";
import { recolor } from "./image-recolor";
import rotate from '../assets/rotate.png';
import scale from '../assets/scale.png';

import type { Map, IControl, ImageSource, GeoJSONSource, LayerSpecification, MapMouseEvent, MapGeoJSONFeature, Coordinates } from "maplibre-gl";

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
     * Show the add polygon button
     * @default true
     */
    showAddPolygonButton?: boolean;
    /**
     * Show the add rectangle button
     * @default true
     */
    showAddRectangleButton?: boolean;
    /**
     * Show the delete button
     * @default true
     */
    showDeleteButton?: boolean;
    /**
     * The ratio of the rectangle width to height
     * @default 0.5
     */
    rectangleSizeFactor?: number;
    /**
     * The background color of the area
     * @default 'orange'
     */
    areaBackgroundColor?: string;
    /**
     * The border width of the area
     * @default 2
     */
    borderWidth?: number;
    /**
     * The opacity of the area
     * @default 0.1
     */
    areaOpacity?: number;
}

export type AddImageOptions = {
    /**
     * The URL of the image to add
     */
    imageUrl: string;
    /**
     * The coordinates of the image
     */
    coordinates: GeoJSON.Position[];
    /**
     * The opacity of the image, should be between 0 and 1
     * @default 0.9
     */
    opacity?: number;
}

/**
 * The payload passed to listeners of the
 * {@link MaplibreAreaTransformEventMap.create | create} and
 * {@link MaplibreAreaTransformEventMap.change | change} events.
 */
export type MaplibreAreaTransformFeatureEvent = {
    /** The ID of the feature this event refers to. */
    id: string;
    /** The feature's corner coordinates in `[lng, lat]` format. */
    coordinates: GeoJSON.Position[];
};

/**
 * The events emitted by {@link MaplibreAreaTransform}, mapped to the arguments
 * passed to their listeners. Use these names with
 * {@link MaplibreAreaTransform.on | on} and {@link MaplibreAreaTransform.off | off}.
 */
export type MaplibreAreaTransformEventMap = {
    /** Fired once the control has been added to the map and fully initialized. */
    init: [];
    /** Fired when a new area is created (via an image, rectangle or polygon). */
    create: [event: MaplibreAreaTransformFeatureEvent];
    /** Fired whenever a feature's coordinates change (move, scale, resize or rotate). */
    change: [event: MaplibreAreaTransformFeatureEvent];
    /** Fired when a feature is deleted. The listener receives the deleted feature's ID. */
    delete: [featureId: string];
    /**
     * Fired when the selected feature changes — the listener receives the newly
     * selected feature's ID, or `null` when the selection is cleared. Only fires
     * on an actual change, never redundantly for the same selection.
     */
    selected: [featureId: string | null];
};

type MaplibreAreaTransformState = "rotating" | "scaling" | "resizeing" | "adding-ploygon" | "moving" | "deleting" | "";

type BuildPolygonOptions = {
    coordinates: GeoJSON.Position[];
    featureId: string;
    isSelected: boolean;
    color: string;
}

type ManagedImage = {
    id: string;
    imageUrl: string;
    coordinates: GeoJSON.Position[];
    opacity: number;
}

const defaultOptions: MaplibreAreaTransformOptions = {
    showAddImageButton: true,
    showAddRectangleButton: true,
    showAddPolygonButton: true,
    showDeleteButton: true,
    rectangleSizeFactor: 0.5,
    areaBackgroundColor: 'orange',
    areaOpacity: 0.1,
    borderWidth: 2
}

const HANDLE_LAYER = 'area-transform-layer-polygon-handle';
const AREA_LAYER = 'area-transform-layer-polygon-area';
const AREA_BORDER_LAYER = 'area-transform-layer-polygon-border';
const HANDLE_CIRCLE_LAYER = HANDLE_LAYER + '-circle';
const ID_PREFIX = 'area-transform-feature-';
const RESIZEABLE_POLYGON_FEATURE_ID = `${ID_PREFIX}resizable-`;
const IMAGE_SOURCE_PREFIX = 'area-transform-raster-';
const IMAGE_LAYER_PREFIX = 'area-transform-raster-layer-';
const GEOJSON_SOURCE = 'area-transform-geojson-source';
const IMAGE_BUTTON_ID = 'area-transfrom-image';
const RECTANGLE_BUTTON_ID = 'area-transfrom-rectangle';
const POLYGON_BUTTON_ID = 'area-transfrom-polygon'
const DELETE_BUTTON_ID = 'area-transfrom-delete';

let maxFeatureId = 0;

/**
 * Maplibre area transform control
 *
 * A MapLibre GL JS {@link IControl} that lets users add images, rectangles and
 * polygons to the map and then move, scale, resize and rotate them, capturing the
 * resulting corner coordinates.
 *
 * @example
 * ```typescript
 * const map = new Map({
 *   container: 'map',
 *   style: 'https://demotiles.maplibre.org/style.json',
 * });
 * const areaTransform = new MaplibreAreaTransform();
 * map.addControl(areaTransform);
 *
 * areaTransform.on('change', ({ id, coordinates }) => {
 *   console.log(id, coordinates);
 * });
 * ```
 */
export class MaplibreAreaTransform implements IControl {
    private _map: Map | null = null;
    private _container: HTMLElement | null = null;
    private _eventEmitter: EventEmitter<MaplibreAreaTransformEventMap> = new EventEmitter<MaplibreAreaTransformEventMap>();
    private _selectedFeatureId: string | null = null;
    private _state: MaplibreAreaTransformState = "";
    private _polygonPoints: PxPoint[] = [];
    private _startPx: PxPoint | null = null;
    private _startCornersPx: PxPoint[] | undefined = undefined; // corners at drag start
    private _colorCache: Set<string> = new Set<string>();
    private _addedImageIds: Set<string> = new Set<string>();
    private _addedLayerIds: Set<string> = new Set<string>();
    private _addedSourceIds: Set<string> = new Set<string>();
    private _imageQueue = new globalThis.Map<string, Promise<string>>();
    private _features: GeoJSON.FeatureCollection = { type: "FeatureCollection", features: [] };
    private _managedImages = new globalThis.Map<string, ManagedImage>();
    private _styleRestorePromise: Promise<void> = Promise.resolve();
    private _resolveStyleLoad: (() => void) | null = null;
    private _styleGeneration = 0;

    /**
     * @param options - control options; any omitted option falls back to its default
     */
    constructor(private options: MaplibreAreaTransformOptions = defaultOptions) {
        this.options = { ...defaultOptions, ...options };
    }

    /** @inheritdoc */
    public onAdd(map: Map): HTMLElement {
        this._map = map;
        this._container = document.createElement('div');
        this._container.className = 'maplibregl-ctrl maplibregl-ctrl-area-transform';
        this.initMapListeners();
        map.on('styledataloading', this.onStyleDataLoading);
        map.on('style.load', this.onStyleLoad);
        this.addColoredImages(this.options.areaBackgroundColor!);
        this.initGeojsonSourceAndLayers();
        if (this.options.showAddImageButton) {
            this.initFileButton();
        }
        if (this.options.showAddRectangleButton) {
            this.initRectangleButton();
        }
        if (this.options.showAddPolygonButton) {
            this.initPolygonButton();
        }
        if (this.options.showDeleteButton) {
            this.initDeleteButton();
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
        button.id = IMAGE_BUTTON_ID;
        button.setAttribute('aria-label', 'Add Image');
        const icon = document.createElement('span');
        icon.className = 'icon-add-image';
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
        button.id = POLYGON_BUTTON_ID;
        button.setAttribute('aria-label', 'Add Polygon');
        const icon = document.createElement('span');
        icon.className = 'icon-add-polygon';
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
        button.id = RECTANGLE_BUTTON_ID;
        button.setAttribute('aria-label', 'Add Rectangle');
        const icon = document.createElement('span');
        icon.className = 'icon-add-rectangle';
        button.appendChild(icon);
        button.onclick = () => this.addRectangle();
        this._container!.appendChild(button);
    }

    private initDeleteButton() {
        const button = document.createElement('button');
        button.type = 'button';
        button.id = DELETE_BUTTON_ID;
        button.setAttribute('aria-label', 'Delete');
        const icon = document.createElement('span');
        icon.className = 'icon-delete';
        button.appendChild(icon);
        button.onclick = () => this.onDeleteButtonClick();
        this._container!.appendChild(button);
    }

    private initGeojsonSourceAndLayers() {
        if (!this._map?.getSource(GEOJSON_SOURCE)) this._map?.addSource(GEOJSON_SOURCE, {
            type: 'geojson',
            promoteId: 'id',
            data: {
                type: "FeatureCollection",
                features: this._features.features
            }
        });
        this._addedSourceIds.add(GEOJSON_SOURCE);

        this.addTrackedLayer({
            id: AREA_LAYER,
            type: 'fill',
            source: GEOJSON_SOURCE,
            paint: {
                'fill-color': ['get', 'color'],
                'fill-opacity': this.options.areaOpacity!,
            },
            filter: ["==", "$type", "Polygon"]
        });

        this.addTrackedLayer({
            id: AREA_BORDER_LAYER,
            type: 'line',
            source: GEOJSON_SOURCE,
            paint: {
                'line-color': ['get', 'color'],
                'line-width': this.options.borderWidth!,
            },
            filter: ["==", "$type", "Polygon"]
        });

        this.addTrackedLayer({
            id: HANDLE_CIRCLE_LAYER,
            type: 'circle',
            source: GEOJSON_SOURCE,
            paint: {
                'circle-color': ['get', 'color'],
                'circle-radius': 3,
                'circle-stroke-color': 'white',
                'circle-stroke-width': 2
            },
            filter: ["==", "$type", "Point"]
        });

        this.addTrackedLayer({
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
    }

    /** @inheritdoc */
    public onRemove(): void {
        this._container?.remove();
        this._map?.off('touchstart', this.onMouseDown);
        this._map?.off('touchmove', this.onMouseMove);
        this._map?.off('touchend', this.onMouseUp);
        this._map?.off('touchcancel', this.onMouseUp);
        this._map?.off('mousedown', this.onMouseDown);
        this._map?.off('mousemove', this.onMouseMoveForCursor);
        this._map?.off('mousemove', this.onMouseMove);
        this._map?.off('mouseup', this.onMouseUp);
        this._map?.off('click', this.onClick);
        this._map?.off('styledataloading', this.onStyleDataLoading);
        this._map?.off('style.load', this.onStyleLoad);
        this._styleGeneration++;
        this._resolveStyleLoad?.();
        this._resolveStyleLoad = null;
        for (const layerId of [...this._addedLayerIds].reverse()) {
            this.removeLayer(layerId);
        }
        for (const sourceId of [...this._addedSourceIds].reverse()) {
            this.removeSource(sourceId);
        }
        for (const imageId of [...this._addedImageIds].reverse()) {
            this.removeImage(imageId);
        }
        this._container = null;
        this._selectedFeatureId = null;
        this._state = '';
        this._polygonPoints = [];
        this._startPx = null;
        this._startCornersPx = undefined;
        this._colorCache.clear();
        this._addedImageIds.clear();
        this._addedLayerIds.clear();
        this._addedSourceIds.clear();
        this._imageQueue.clear();
        this._features = { type: "FeatureCollection", features: [] };
        this._managedImages.clear();
        this._styleRestorePromise = Promise.resolve();
        this._map = null;
    }

    /**
     * Create the coordinates for an image in mercator projection (centered on the map)
     * @param img The image.
     * @returns The coordinates of the image in GeoJSON format.
     */
    public createCoordinatesForLoadedImage(img: HTMLImageElement): GeoJSON.Position[] {

        const imageAspect = img.naturalWidth / img.naturalHeight;

        const canvas = this._map!.getCanvas();
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const canvasAspect = width / height;

        let baseWidth: number;
        let baseHeight: number;

        if (imageAspect >= canvasAspect) {
            // Landscape or square: constrain by width
            baseWidth = width / 2;
            baseHeight = baseWidth / imageAspect;
        } else {
            // Portrait: constrain by height
            baseHeight = height / 2;
            baseWidth = baseHeight * imageAspect;
        }
        const startX = (width - baseWidth) / 2;
        const startY = (height - baseHeight) / 2;

        const coordinates: PxPoint[] = [
            [startX, startY],
            [(startX + baseWidth), startY],
            [(startX + baseWidth), (startY + baseHeight)],
            [startX, (startY + baseHeight)]
        ];
        return this.unprojectAll(coordinates);
    }

    /**
     * Adds an image to the map.
     *
     * Requests are keyed by URL and coordinates: a call made while an earlier call with the same URL and
     * coordinates is still in flight does not add the image a second time - it shares the earlier call's
     * promise, and so resolves to the same ID. The key is released once that promise settles, so adding
     * the same image at the same place again afterwards creates a new one.
     *
     * Requests that are not duplicates are queued and run one after another, since adding two images at
     * once leaves the selection and the GeoJSON source in an inconsistent state.
     * @param options - The options for adding the image.
     * @returns The ID of the added image.
     */
    public addImage(options: AddImageOptions): Promise<string> {
        const key = this.getImageRequestKey(options.imageUrl, options.coordinates);
        return this._imageQueue.get(key) ?? this.addImageToQueue(key, options);
    }

    /**
     * Queues an image addition behind the requests already in the queue, and keeps it there until it
     * settles, so that a duplicate request made meanwhile can be answered with the same promise.
     * @param key The request's key, see {@link getImageRequestKey}.
     * @param options The options for adding the image.
     * @returns The ID of the added image.
     */
    private addImageToQueue(key: string, options: AddImageOptions): Promise<string> {
        const previous = [...this._imageQueue.values()].pop() ?? Promise.resolve();
        const promise = previous
            .catch(() => { /* ignored on purpose */ })
            .then(() => this.addImageInternal(options))
            .finally(() => this._imageQueue.delete(key));
        this._imageQueue.set(key, promise);
        return promise;
    }

    /** The key an image request is queued under: same URL at the same place means the same request. */
    private getImageRequestKey(imageUrl: string, coordinates: GeoJSON.Position[]): string {
        return JSON.stringify([imageUrl, coordinates]);
    }

    private async addImageInternal(options: AddImageOptions): Promise<string> {
        await this.waitForStyleReady();
        const map = this.getAttachedMap();
        if (this._state === "adding-ploygon") {
            return Promise.reject("Cannot add image while adding polygon");
        }
        const imageId = `${ID_PREFIX}${maxFeatureId++}`;
        const managedImage = { id: imageId, imageUrl: options.imageUrl, coordinates: options.coordinates, opacity: options.opacity ?? 0.9 };
        try {
            this.addImageResources(managedImage);
            this._managedImages.set(imageId, managedImage);
            await this.addFeatureState(imageId, options.coordinates, map);
            this.setState("");
            this._eventEmitter.emit("create", { id: imageId, coordinates: options.coordinates });
            return imageId;
        } catch (error) {
            this._managedImages.delete(imageId);
            this._features.features = this._features.features.filter(f => f.properties?.["featureId"] !== imageId);
            if (this._map === map) {
                this.removeLayer(IMAGE_LAYER_PREFIX + imageId);
                this.removeSource(IMAGE_SOURCE_PREFIX + imageId);
                await this.renderFeatures();
            }
            throw error;
        }
    }

    public async setImageOpacity(imageId: string, opacity: number): Promise<void> {
        const image = this._managedImages.get(imageId);
        if (image) image.opacity = opacity;
        const layerId = `${IMAGE_LAYER_PREFIX}${imageId}`;
        if (this._map?.getLayer(layerId)) this._map.setPaintProperty(layerId, 'raster-opacity', opacity);
    }

    /**
     * This adds a rectangle to the middle of the screen
     * @returns a pomise that resolves to the newly added rectangle ID
     */
    public addRectangle(): Promise<string> {
        if (this._state === "adding-ploygon") {
            return Promise.reject("Cannot add rectangle while adding polygon");
        }
        const canvas = this._map!.getCanvas();
        const dpr = window.devicePixelRatio || 1;

        const logicalWidth = canvas.width / dpr;
        const logicalHeight = canvas.height / dpr;
        const startX = logicalWidth * (1 - this.options.rectangleSizeFactor!) / 2;
        const startY = logicalHeight * (1 - this.options.rectangleSizeFactor!) / 2;
        const width = logicalWidth * this.options.rectangleSizeFactor!;
        const height = logicalHeight * this.options.rectangleSizeFactor!;
        const corners: PxPoint[] = [[startX, startY], [startX + width, startY], [startX + width, startY + height], [startX, startY + height]];
        return this.addPolygon(this.unprojectAll(corners), true);
    }

    /**
     * Initiates the state of adding points in order to create a polygon on the screen
     */
    public startAddPolygonSequence() {
        this.removeSelection();
        this.setState("adding-ploygon");
        this._polygonPoints = [];
    }

    private onDeleteButtonClick() {
        if (this._state === "adding-ploygon") {
            return;
        }
        this.removeSelection();
        if (this._state === "deleting") {
            this.setState("");
        } else {
            this.setState("deleting");
        }
    }

    /**
     * Adds a polygon to the map
     * @param coordinates - the polygon coordinates
     * @param resizable - only relevant for rectangles
     * @returns a promise with the polygon ID
     */
    public async addPolygon(coordinates: GeoJSON.Position[], resizable: boolean) {
        await this.waitForStyleReady();
        const map = this.getAttachedMap();
        const polygonId = `${resizable ? RESIZEABLE_POLYGON_FEATURE_ID : ID_PREFIX}${maxFeatureId++}`;
        await this.addFeatureState(polygonId, coordinates, map);
        this.setState("");
        this._eventEmitter.emit('create', { id: polygonId, coordinates })
        return polygonId;
    }

    /**
     * Deletes a feature
     * @param featureId - the feature ID to delete
     */
    public async deleteFeature(featureId: string) {
        await this.removeSelection();
        this._features.features = this._features.features.filter(f => f.properties?.["featureId"] !== featureId);
        await this.renderFeatures();
        const imageSource = this._map?.getSource<ImageSource>(IMAGE_SOURCE_PREFIX + featureId);
        if (imageSource) {
            this.removeLayer(IMAGE_LAYER_PREFIX + featureId);
            this.removeSource(IMAGE_SOURCE_PREFIX + featureId);
        }
        this._managedImages.delete(featureId);
        this._eventEmitter.emit("delete", featureId);
    }

    /**
     * Sets the background and border color used for newly drawn and selected areas.
     * @param color - any CSS color string
     */
    public async setAreaColor(color: string) {
        this.options.areaBackgroundColor = color;
        await this.addColoredImages(color);
    }

    /**
     * Subscribes to a control event.
     * @param event - the event name, see {@link MaplibreAreaTransformEventMap}
     * @param listener - callback invoked with the event's payload
     */
    public on<K extends keyof MaplibreAreaTransformEventMap>(
        event: K,
        listener: (...args: MaplibreAreaTransformEventMap[K]) => void
    ): void {
        this._eventEmitter.on(event, listener);
    }

    /**
     * Unsubscribes a previously registered event listener.
     * @param event - the event name, see {@link MaplibreAreaTransformEventMap}
     * @param listener - the same callback reference that was passed to {@link MaplibreAreaTransform.on | on}
     */
    public off<K extends keyof MaplibreAreaTransformEventMap>(
        event: K,
        listener: (...args: MaplibreAreaTransformEventMap[K]) => void
    ): void {
        this._eventEmitter.off(event, listener);
    }

    private onFileSelected = async (e: Event) => {
        const target = e.target as HTMLInputElement;
        const file = target.files?.[0];
        if (!file) return;

        const imageUrl = URL.createObjectURL(file);
        const img = new Image();
        img.onload = async () => {
            const coordinates = this.createCoordinatesForLoadedImage(img);
            await this.addImage({ imageUrl, coordinates });
            target.value = '';
        }
        img.src = imageUrl;
    };

    private initMapListeners() {
        this._map?.on('touchstart', this.onMouseDown);
        this._map?.on('touchmove', this.onMouseMove);
        this._map?.on('touchend', this.onMouseUp);
        this._map?.on('touchcancel', this.onMouseUp);
        this._map?.on('mousedown', this.onMouseDown);
        this._map?.on('mousemove', this.onMouseMoveForCursor);
        this._map?.on('mousemove', this.onMouseMove);
        this._map?.on('mouseup', this.onMouseUp);
        this._map?.on('click', this.onClick);
    }

    private onStyleDataLoading = () => {
        this._resolveStyleLoad?.();
        this._styleGeneration++;
        this._styleRestorePromise = new Promise<void>((resolve) => {
            this._resolveStyleLoad = resolve;
        });
    };

    private onStyleLoad = () => {
        const generation = this._styleGeneration;
        const map = this._map;
        const resolveStyleLoad = this._resolveStyleLoad;
        const restoration = this.restoreAfterStyleLoad(map, generation);
        this._styleRestorePromise = restoration;
        resolveStyleLoad?.();
        this._resolveStyleLoad = null;
    };

    private async waitForStyleReady(): Promise<void> {
        let restoration: Promise<void>;
        do {
            restoration = this._styleRestorePromise;
            await restoration;
        } while (restoration !== this._styleRestorePromise);
    }

    private async restoreAfterStyleLoad(map: Map | null, generation: number): Promise<void> {
        if (!map || this._map !== map) return;
        const isObsolete = () => this._map !== map || generation !== this._styleGeneration;
        await Promise.all(this.getRetainedColors().map(color => this.addColoredImages(color)));
        if (isObsolete()) return;
        this.initGeojsonSourceAndLayers();
        await this.renderFeatures();
        if (isObsolete()) return;
        for (const image of this._managedImages.values()) {
            if (isObsolete()) return;
            this.addImageResources(image);
        }
    }

    private getRetainedColors(): string[] {
        const colors = new Set<string>([this.options.areaBackgroundColor!]);
        for (const feature of this._features.features) {
            const color = feature.properties?.["color"];
            if (typeof color === "string") colors.add(color);
            const icon = feature.properties?.["icon"];
            if (typeof icon === "string" && icon.startsWith("scale-")) colors.add(icon.slice("scale-".length));
            if (typeof icon === "string" && icon.startsWith("rotate-")) colors.add(icon.slice("rotate-".length));
        }
        return [...colors];
    }

    private getAttachedMap(): Map {
        if (!this._map) throw new Error("Control is not attached to a map");
        return this._map;
    }

    private assertAttachedTo(map: Map): void {
        if (this._map !== map) throw new Error("Control is no longer attached to the map");
    }

    private async addFeatureState(featureId: string, coordinates: GeoJSON.Position[], map: Map): Promise<void> {
        this._features.features.push(...this.buildPolygonGeoJSONFeatures({
            coordinates,
            featureId,
            isSelected: true,
            color: this.options.areaBackgroundColor!
        }));
        await this.renderFeatures();
        this.assertAttachedTo(map);
        await this.removeSelection();
        this.assertAttachedTo(map);
        await this.setSelection(featureId);
        this.assertAttachedTo(map);
    }

    private addImageResources(image: ManagedImage): void {
        const map = this._map;
        if (!map) return;
        const sourceId = `${IMAGE_SOURCE_PREFIX}${image.id}`;
        if (!map.getSource(sourceId)) {
            map.addSource(sourceId, {
                type: 'image',
                url: image.imageUrl,
                coordinates: image.coordinates as [[number, number], [number, number], [number, number], [number, number]]
            });
        }
        this._addedSourceIds.add(sourceId);
        const layerId = `${IMAGE_LAYER_PREFIX}${image.id}`;
        if (!map.getLayer(layerId)) {
            map.addLayer({
                id: layerId,
                type: 'raster',
                source: sourceId,
                paint: { 'raster-opacity': image.opacity, 'raster-fade-duration': 0 }
            }, map.getLayer(HANDLE_LAYER) ? HANDLE_LAYER : undefined);
        }
        this._addedLayerIds.add(layerId);
    }

    private async renderFeatures(): Promise<void> {
        const source = this._map?.getSource<GeoJSONSource>(GEOJSON_SOURCE);
        if (source) await source.setData(this._features, true);
    }

    private addTrackedLayer(layer: LayerSpecification, beforeId?: string): void {
        if (!this._map?.getLayer(layer.id)) this._map?.addLayer(layer, beforeId);
        this._addedLayerIds.add(layer.id);
    }

    private buildPolygonGeoJSONFeatures(buildOptions: BuildPolygonOptions): GeoJSON.Feature[] {
        const { coordinates, featureId, isSelected, color } = buildOptions;
        const features: GeoJSON.Feature[] = [{
            type: 'Feature',
            geometry: {
                type: 'Polygon',
                coordinates: [[...coordinates, coordinates[0]!]]
            },
            properties: {
                id: "rect-" + featureId,
                featureId,
                color

            }
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
                    icon: 'scale-' + this.options.areaBackgroundColor!,
                    color,
                    isSelected,
                    heading: this.getScaleHandleHeadingSnapped(coordinates, i)
                }
            });
        }
        return features;
    }

    private getRotateHandlePoint(coordinates: GeoJSON.Position[], featureId: string, color: string): GeoJSON.Feature {
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
                featureId,
                type: 'rotate-handle',
                icon: 'rotate-' + color,
                color,
                isSelected: true,
                heading: 0
            }
        };
    }

    /** Heading in degrees for scale handle icon rotation */
    private getScaleHandleHeadingSnapped(coordinates: GeoJSON.Position[], currentPointIndex: number): number {
        const px = this.projectAll(coordinates);
        const centerPx = pxCentroid(px);
        const centerToFirstPointAngle = pxAngle(centerPx, px[0]!);
        const centerToFirstSecondAngle = pxAngle(centerPx, px[1]!);
        const direction = ((((centerToFirstSecondAngle + centerToFirstPointAngle) / 2) * (180 / Math.PI) + 180) % 180);

        if (direction > 157) {
            return currentPointIndex % 2 === 0 ? 45 : 135;
        }
        if (direction > 112) {
            return currentPointIndex % 2 === 0 ? 0 : 90;
        }
        if (direction > 67) {
            return currentPointIndex % 2 === 0 ? 135 : 45;
        }
        if (direction > 22) {
            return currentPointIndex % 2 === 0 ? 90 : 0;
        }
        return currentPointIndex % 2 === 0 ? 45 : 135;
    }

    private onMouseMoveForCursor = (e: MapMouseEvent) => {
        if (this._selectedFeatureId == null || this._startPx != null) {
            this._map!.getCanvas().style.cursor = '';
            return;
        }
        if (!this._selectedFeatureId) {
            return;
        }
        const features = this._map?.queryRenderedFeatures(e.point).filter(f => f.properties?.["featureId"] === this._selectedFeatureId);
        const rotate = features?.find(f => f.layer.id.startsWith(HANDLE_LAYER) && f.properties["type"] === 'rotate-handle');
        const scaleOrResize = features?.find(f => f.layer.id.startsWith(HANDLE_LAYER) && (f.properties["type"] === 'scale-handle'));
        const drag = features?.find(f => f.layer.id.startsWith(AREA_LAYER));

        if (rotate) {
            this._map!.getCanvas().style.cursor = 'crosshair';
        } else if (scaleOrResize) {
            switch (scaleOrResize.properties["heading"]) {
                case 0:
                    this._map!.getCanvas().style.cursor = "ns-resize";
                    break;
                case 45:
                    this._map!.getCanvas().style.cursor = "nesw-resize";
                    break;
                case 90:
                    this._map!.getCanvas().style.cursor = "ew-resize";
                    break;
                case 135:
                    this._map!.getCanvas().style.cursor = "nwse-resize";
                    break;
                case 180:
                    this._map!.getCanvas().style.cursor = "ns-resize";
                    break;
            }
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
        features = features?.filter(f => f.source === GEOJSON_SOURCE && f.properties?.["featureId"] === this._selectedFeatureId) ?? [];
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
            this.setState("moving");
            this._startPx = currentPx;
            return;
        }
        if (queriedFeatures.some(f => f.properties["type"] === "rotate-handle")) {
            this.setState("rotating");
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
        if (closestFeature.properties?.["type"] === "scale-handle" && this._selectedFeatureId?.startsWith(RESIZEABLE_POLYGON_FEATURE_ID)) {
            this.setState("resizeing");
        } else {
            this.setState("scaling");
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
                newCornersPx = pxResizePolygon(this._startCornersPx!, this._startPx, currentPx);
                break;
            default:
            case "moving": {
                newCornersPx = pxMovePoints(this._startCornersPx!, this._startPx, currentPx);
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
        if (this._state === "moving" ||
            this._state === "resizeing" ||
            this._state === "rotating" ||
            this._state === "scaling") {
            this.setState("");
        }
    }

    private onClick = (e: MapMouseEvent) => {
        if (this._state === "adding-ploygon") {
            this.onClickWhenInPolygonMode(e);
            return;
        }
        const features = this._map?.queryRenderedFeatures(e.point);
        const polygonFeature = features?.find(f => f.layer.id.startsWith(AREA_LAYER));
        if (polygonFeature && this._state === "deleting") {
            this.deleteFeature(polygonFeature.properties["featureId"]);
            return;
        }
        const targetId: string | null = polygonFeature ? polygonFeature.properties["featureId"] : null;
        if (targetId === this._selectedFeatureId) {
            // Clicked the current selection, or empty space while nothing is selected:
            // nothing changed, so don't rebuild state or emit a `selected` event.
            return;
        }
        this.removeSelection();
        if (targetId) {
            this.setSelection(targetId);
        }
    }

    private async onClickWhenInPolygonMode(e: MapMouseEvent) {
        const coordinates = [e.lngLat.lng, e.lngLat.lat] as GeoJSON.Position;
        const source = this._map?.getSource<GeoJSONSource>(GEOJSON_SOURCE)!;
        const pixelThreshold = 10;
        if (this._polygonPoints.length > 0 &&
            Math.abs(this._polygonPoints[0]![0] - e.point.x) < pixelThreshold &&
            Math.abs(this._polygonPoints[0]![1] - e.point.y) < pixelThreshold) {
            // last point is near the first one
            const ids = this._polygonPoints.map((_, i) => "temp-point-" + (i + 1));
            await source.updateData({ remove: [...ids, 'temp-area'] }, true);
            const points = sortPoints(this._polygonPoints);
            this.addPolygon(this.unprojectAll(points), false);
            this._polygonPoints = [];
            return;
        }

        // Adding the point
        this._polygonPoints.push([e.point.x, e.point.y]);
        const point: GeoJSON.Feature = {
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
        };
        if (this._polygonPoints.length < 3) {
            await source.updateData({
                add: [point]
            }, true);
            return;
        }
        const areaGeometry: GeoJSON.Polygon = {
            type: "Polygon",
            coordinates: [[...this.unprojectAll(this._polygonPoints), this.unproject(this._polygonPoints[0]!)]]
        };
        if (this._polygonPoints.length === 3) {
            const area: GeoJSON.Feature = {
                type: "Feature",
                geometry: areaGeometry,
                properties: {
                    id: "temp-area",
                    temp: true,
                    isSelected: false
                }
            };
            await source.updateData({
                add: [point, area]
            }, true);
            return;
        }
        await source.updateData({
            add: [point],
            update: [{ id: "temp-area", newGeometry: areaGeometry }]
        }, true);
    }

    private async addColoredImages(color: string) {
        const map = this._map;
        if (!map) {
            return;
        }
        const rotateImageId = 'rotate-' + color;
        const scaleImageId = 'scale-' + color;
        if (this._colorCache.has(color) && map.hasImage(rotateImageId) && map.hasImage(scaleImageId)) return;
        return Promise.all([
            map.loadImage(rotate).then(rotateImage =>
                recolor(rotateImage?.data!, color).then(recoloredRotateImage => {
                    if (map !== this._map) return;
                    if (!map.hasImage(rotateImageId)) {
                        map.addImage(rotateImageId, recoloredRotateImage!);
                        this._addedImageIds.add(rotateImageId);
                    }
                }),
            ),
            map.loadImage(scale).then(scaleImage =>
                recolor(scaleImage?.data!, color).then(recoloredScaleImage => {
                    if (map !== this._map) return;
                    if (!map.hasImage(scaleImageId)) {
                        map.addImage(scaleImageId, recoloredScaleImage!);
                        this._addedImageIds.add(scaleImageId);
                    }
                }),
            ),
        ]).then(() => this._colorCache.add(color));
    }

    private removeLayer(layerId: string): void {
        if (this._map?.getLayer(layerId)) this._map.removeLayer(layerId);
        this._addedLayerIds.delete(layerId);
    }

    private removeSource(sourceId: string): void {
        if (this._map?.getSource(sourceId)) this._map.removeSource(sourceId);
        this._addedSourceIds.delete(sourceId);
    }

    private removeImage(imageId: string): void {
        if (this._map?.hasImage(imageId)) this._map.removeImage(imageId);
        this._addedImageIds.delete(imageId);
    }

    /** Updates the current selection, emitting `selected` only when it actually changes. */
    private setSelectedFeatureId(featureId: string | null) {
        if (this._selectedFeatureId === featureId) {
            return;
        }
        this._selectedFeatureId = featureId;
        this._eventEmitter.emit("selected", featureId);
    }

    private async removeSelection() {
        this.setSelectedFeatureId(null);
        for (const feature of this._features.features) {
            delete feature?.properties?.["isSelected"];
        }
        this._features.features = this._features.features.filter(f => f.properties?.["type"] !== "rotate-handle");
        await this.renderFeatures();
    }

    private async setSelection(featureId: string) {
        this.setSelectedFeatureId(featureId);
        const data = this._features;
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
        const color = data.features.find(f => f.properties?.["featureId"] === featureId && f.geometry?.type === "Polygon")?.properties?.["color"];
        const coords = corners.map(f => f.geometry.coordinates);
        data.features.push(this.getRotateHandlePoint(coords, featureId, color));
        await this.renderFeatures();
    }

    private async updateCoordinates(featureId: string, newCoordinates: GeoJSON.Position[]) {
        const data = this._features;
        const color = data.features.find(f => f.properties?.["featureId"] === featureId && f.geometry?.type === "Polygon")?.properties?.["color"];
        data.features = data.features.filter(f => f.properties?.["featureId"] !== featureId);
        data.features.push(...this.buildPolygonGeoJSONFeatures({ coordinates: newCoordinates, featureId, isSelected: true, color }));
        data.features = data.features.filter(f => f.properties?.["type"] !== "rotate-handle");
        data.features.push(this.getRotateHandlePoint(newCoordinates, featureId, color));
        const image = this._managedImages.get(featureId);
        if (image) image.coordinates = newCoordinates;
        await this.renderFeatures();
        this._eventEmitter.emit("change", { id: featureId, coordinates: newCoordinates });
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

    private setState(state: MaplibreAreaTransformState) {
        this._state = state;
        document.getElementById(POLYGON_BUTTON_ID)?.classList.toggle('active', this._state === "adding-ploygon");
        document.getElementById(DELETE_BUTTON_ID)?.classList.toggle('active', this._state === "deleting");
    }
}
