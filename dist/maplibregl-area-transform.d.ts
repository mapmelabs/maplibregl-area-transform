import { IControl, Map } from 'maplibre-gl';

/**
 * Options for the maplibre area transform control
 */
type MaplibreAreaTransformOptions = {
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
};
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
declare class MaplibreAreaTransform implements IControl {
    private options;
    private _map;
    private _container;
    private _eventEmitter;
    private _selectedFeatureId;
    private _state;
    private _polygonPoints;
    private _startPx;
    private _startCornersPx;
    constructor(options?: MaplibreAreaTransformOptions);
    /** @inheritdoc */
    onAdd(map: Map): HTMLElement;
    /**
     * Initialize the file button
     */
    private initFileButton;
    /**
     * Initialize the polygon button
     */
    private initPolygonButton;
    /**
     * Initialize the rectangle button
     */
    private initRectangleButton;
    private initDeleteButton;
    private initGeojsonSourceAndLayers;
    /** @inheritdoc */
    onRemove(): void;
    addImage(imageUrl: string, coordinates: GeoJSON.Position[]): Promise<string>;
    /**
     * This adds a rectangle to the middle of the screen
     * @returns a pomise that resolves to the newly added rectangle ID
     */
    addRectangle(): Promise<string>;
    /**
     * Initiates the state of adding points in order to create a polygon on the screen
     */
    startAddPolygonSequence(): void;
    private onDeleteButtonClick;
    /**
     * Adds a polygon to the map
     * @param coordinates - the polygon coordinates
     * @param resizable - only relevant for rectangles
     * @returns a promise with the polygon ID
     */
    addPolygon(coordinates: GeoJSON.Position[], resizable: boolean): Promise<string>;
    deleteFeature(featureId: string): Promise<void>;
    on(event: string, listener: (...args: any[]) => void): void;
    off(event: string, listener: (...args: any[]) => void): void;
    private onFileSelected;
    private initMapListeners;
    private buildPolygonGeoJSONFeatures;
    private getRotateHandlePoint;
    private getResizeHandlePoints;
    /** Heading in degrees for scale handle icon rotation — kept in geo-bearing for icon display */
    private getScaleHandleHeading;
    private onMouseMoveForCursor;
    private onMouseDown;
    private setStateFromMouseDown;
    private onMouseMove;
    private onMouseUp;
    private onClick;
    private onClickWhenInPolygonMode;
    private initImages;
    private removeSelection;
    private setSelection;
    private updateCoordinates;
    /** Project a lat/lng GeoJSON position to map pixel point */
    private project;
    /** Unproject a pixel point back to [lng, lat] */
    private unproject;
    /** Project an array of lat/lng positions to pixel points */
    private projectAll;
    /** Unproject pixel points back to lat/lng positions */
    private unprojectAll;
    private setState;
}

export { MaplibreAreaTransform };
export type { MaplibreAreaTransformOptions };
