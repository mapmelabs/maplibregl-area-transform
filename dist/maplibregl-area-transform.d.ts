import { IControl, Map } from 'maplibre-gl';

type MaplibreAreaTransformOptions = {
    showAddImageButton?: boolean;
};
type Corners = [[number, number], [number, number], [number, number], [number, number]];
declare class MaplibreAreaTransform implements IControl {
    private options;
    private _map;
    private _container;
    private _eventEmitter;
    private _maxImageId;
    private _selectedImageId;
    private _isScaling;
    private _isRotating;
    private _startPoint;
    private _startPointCoordinates;
    constructor(options?: MaplibreAreaTransformOptions);
    /** @inheritdoc */
    onAdd(map: Map): HTMLElement;
    /** @inheritdoc */
    onRemove(): void;
    addImage(imageUrl: string, coordinates: Corners): string;
    on(event: string, listener: (...args: any[]) => void): void;
    off(event: string, listener: (...args: any[]) => void): void;
    private onFileSelected;
    private getOpositePoint;
    private getCenter;
    private initMapListener;
    private buildGeoJSON;
    private getRotateHandlePoint;
    private onMouseMoveForCursor;
    private onMouseDown;
    private onMouseMove;
    private onMouseUp;
}

export { MaplibreAreaTransform };
export type { Corners, MaplibreAreaTransformOptions };
