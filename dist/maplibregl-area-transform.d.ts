import { IControl, Map } from 'maplibre-gl';

type MaplibreAreaTransformOptions = {
    showAddImageButton?: boolean;
    showAddRectangleButton?: boolean;
};
type Corners = [[number, number], [number, number], [number, number], [number, number]];
declare class MaplibreAreaTransform implements IControl {
    private options;
    private _map;
    private _container;
    private _eventEmitter;
    private _selectedFeatureId;
    private _isScaling;
    private _isRotating;
    private _isAddingRectangle;
    private _rectanglePoints;
    private _startPoint;
    private _startPointCoordinates;
    constructor(options?: MaplibreAreaTransformOptions);
    /** @inheritdoc */
    onAdd(map: Map): HTMLElement;
    private initFileButton;
    private initRectangleButton;
    private initGeojsonSourceAndLayers;
    /** @inheritdoc */
    onRemove(): void;
    addImage(imageUrl: string, coordinates: Corners): Promise<string>;
    startAddRectangleSequence(): void;
    private onClickAddRectanglePoint;
    /**
     * Sort corners of a rectangle in clockwise order starting from the top-left corner.
     * @param corners The corners of the rectangle.
     * @returns The sorted corners of the rectangle.
     */
    private sortCorners;
    addRectangle(coordinates: Corners): Promise<void>;
    on(event: string, listener: (...args: any[]) => void): void;
    off(event: string, listener: (...args: any[]) => void): void;
    private onFileSelected;
    private getOpositePoint;
    private getCenter;
    private initMapListeners;
    private buildPolygonGeoJSONFeatures;
    private getRotateHandlePoint;
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
}

export { MaplibreAreaTransform };
export type { Corners, MaplibreAreaTransformOptions };
