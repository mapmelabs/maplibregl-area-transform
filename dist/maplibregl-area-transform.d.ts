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
     * Show the polygon button
     * @default true
     */
    showPolygonButton?: boolean;
    /**
     * Show the add rectangle button
     * @default true
     */
    showAddRectangleButton?: boolean;
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
    private _isScaling;
    private _isRotating;
    private _isAddingPolygon;
    private _isResizing;
    private _polygonPoints;
    private _startPoint;
    private _startPointCoordinates;
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
    private initGeojsonSourceAndLayers;
    /** @inheritdoc */
    onRemove(): void;
    addImage(imageUrl: string, coordinates: GeoJSON.Position[]): Promise<string>;
    onClickAddRectangle: () => void;
    startAddPolygonSequence(): void;
    private onClickAddRectanglePoint;
    /**
     * Sort corners of a rectangle in clockwise order starting from the top-left corner.
     * @param corners The corners of the rectangle.
     * @returns The sorted corners of the rectangle.
     */
    private sortCorners;
    addPolygon(coordinates: GeoJSON.Position[], resizable: boolean): Promise<void>;
    on(event: string, listener: (...args: any[]) => void): void;
    off(event: string, listener: (...args: any[]) => void): void;
    private onFileSelected;
    private getOpositePoint;
    private getCenter;
    private initMapListeners;
    private buildPolygonGeoJSONFeatures;
    private getRotateHandlePoint;
    private getResizeHandlePoints;
    private getScaleHandleHeading;
    private onMouseMoveForCursor;
    private onMouseDown;
    private setStateFromMouseDown;
    private onMouseMove;
    private onMouseUp;
    private onClick;
    private initImages;
    private removeSelection;
    private setSelection;
    private updateCoordinates;
    private rotatePolygon;
    private scalePolygon;
    private resizeRectangleSide;
    private getClosestEdgeIndex;
    private getMidPoint;
}

export { MaplibreAreaTransform };
export type { MaplibreAreaTransformOptions };
