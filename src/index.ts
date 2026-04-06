import EventEmitter from "eventemitter3";
import { transformScale } from "@turf/transform-scale";
import { transformRotate } from "@turf/transform-rotate";
import { distance } from "@turf/distance";
import { bearing } from "@turf/bearing";
import { destination } from "@turf/destination";

import rotate from '../assets/rotate.png';
import scaleNESW from '../assets/nesw-resize.png';
import scaleNWSE from '../assets/nwse-resize.png';

import type { Map, IControl, ImageSource, GeoJSONSource, MapMouseEvent } from "maplibre-gl";

export type MaplibreAreaTransformOptions = {
    showAddImageButton?: boolean;
}

export type Corners = [[number, number], [number, number], [number, number], [number, number]];

const defaultOptions: MaplibreAreaTransformOptions = {
    showAddImageButton: true,
}

const HANDLE_PREFIX = 'layer-polygon-handle-';
const AREA_PREFIX = 'layer-polygon-area-';
const ID_PREFIX = 'georeferenced-image-';
const IMAGE_SOURCE_PREFIX = 'raster-';
const GEOJSON_SOURCE_PREFIX = 'geojson-';

export class MaplibreAreaTransform implements IControl {
    private _map: Map | null = null;
    private _container: HTMLElement | null = null;
    private _eventEmitter: EventEmitter = new EventEmitter();
    private _maxImageId: number = 0;
    private _selectedImageId: string | null = null;
    private _isScaling: boolean = false;
    private _isRotating: boolean = false;
    private _startPoint: [number, number] | null = null;
    private _startPointCoordinates: Corners | undefined = undefined;

    constructor(private options: MaplibreAreaTransformOptions = defaultOptions) {
        this.options = { ...defaultOptions, ...options };
    }

    /** @inheritdoc */
    public onAdd(map: Map): HTMLElement {
        this._map = map;
        this._container = document.createElement('div');
        this._container.className = 'maplibregl-ctrl maplibregl-ctrl-georeferenced-image';
        this.initMapListener();
        this.initImages();
        if (this.options.showAddImageButton) {
            // add file input picker with a button
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

            this._container.appendChild(fileInput);
            this._container.appendChild(button);
        }
        this._eventEmitter.emit('init');
        return this._container;
    }

    /** @inheritdoc */
    public onRemove(): void {
        this._container?.remove();
        this._map?.off('mousemove', this.onMouseMoveForCursor);
        this._map?.off('mousedown', this.onMouseDown);
        this._map?.off('mousemove', this.onMouseMove);
        this._map?.off('mouseup', this.onMouseUp);
        this._map = null;
    }

    public addImage(imageUrl: string, coordinates: Corners): string {
        const imageId = `${ID_PREFIX}${this._maxImageId++}`;
        const imageSourceId = `${IMAGE_SOURCE_PREFIX}${imageId}`;
        this._map?.addSource(imageSourceId, {
            type: 'image',
            url: imageUrl,
            coordinates: coordinates
        });

        this._map?.addLayer({
            id: 'layer-' + imageId,
            type: 'raster',
            source: imageSourceId,
            paint: {
                'raster-opacity': 0.9,
                'raster-fade-duration': 0
            }
        });

        const geojsonSourceId = `${GEOJSON_SOURCE_PREFIX}${imageId}`;
        this._map?.addSource(geojsonSourceId, {
            type: 'geojson',
            data: this.buildGeoJSON(coordinates, imageId)
        });
        this._map?.addLayer({
            id: HANDLE_PREFIX + imageId,
            type: 'symbol',
            source: geojsonSourceId,
            layout: {
                'icon-image': ['get', 'icon'],
                'icon-allow-overlap': true,
                'icon-ignore-placement': true,
            },
            filter: ["==", "$type", "Point"]
        });
        this._map?.addLayer({
            id: HANDLE_PREFIX + 'circle-' + imageId,
            type: 'circle',
            source: geojsonSourceId,
            paint: {
                'circle-color': 'orange',
                'circle-radius': 3,
                'circle-stroke-color': 'white',
                'circle-stroke-width': 2,
            },
            filter: ["==", "$type", "Point"]
        });

        this._map?.addLayer({
            id: AREA_PREFIX + imageId,
            type: 'fill',
            source: geojsonSourceId,
            paint: {
                'fill-color': 'orange',
                'fill-opacity': 0.1
            },
            filter: ["==", "$type", "Polygon"]
        });

        return imageId;
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

    private getOpositePoint(coordinates: Corners, point: [number, number]): [number, number] {
        let pointIndex = 0;
        for (let coordinate of coordinates) {
            if (Math.abs(coordinate[0] - point[0]) < 1e-4 && Math.abs(coordinate[1] - point[1]) < 1e-4) {
                break;
            }
            pointIndex++;
        }
        pointIndex = (pointIndex + 2) % 4;
        return coordinates[pointIndex]!;
    }

    private getCenter(coordinates: Corners): [number, number] {
        const x = (coordinates[0][0] + coordinates[1][0] + coordinates[2][0] + coordinates[3][0]) / 4;
        const y = (coordinates[0][1] + coordinates[1][1] + coordinates[2][1] + coordinates[3][1]) / 4;
        return [x, y];
    }

    private initMapListener() {
        this._map?.on('mousemove', this.onMouseMoveForCursor);
        this._map?.on('mousedown', this.onMouseDown);
        this._map?.on('mousemove', this.onMouseMove);
        this._map?.on('mouseup', this.onMouseUp);
    }

    private buildGeoJSON(coordinates: Corners, imageId: string): GeoJSON.FeatureCollection {
        return {
            type: 'FeatureCollection',
            features: [
                {
                    type: 'Feature' as const,
                    geometry: {
                        type: 'Polygon' as const,
                        coordinates: [[...coordinates, coordinates[0]]] // close the polygon
                    },
                    properties: {
                        id: imageId
                    }
                },
                ...coordinates.map((coordinate, index) => {
                    return {
                        type: 'Feature' as const,
                        geometry: {
                            type: 'Point' as const,
                            coordinates: coordinate
                        },
                        properties: {
                            id: imageId,
                            type: 'scale',
                            icon: index % 2 === 0 ? 'nwse-resize' : 'nesw-resize'
                        }
                    };
                }),
                this.getRotateHandlePoint(coordinates, imageId)
            ]
        }
    }

    private getRotateHandlePoint(coordinates: Corners, imageId: string): GeoJSON.Feature {
        const point1 = coordinates[0];
        const point2 = coordinates[1];

        const mid = [(point2[0] + point1[0]) / 2, (point2[1] + point1[1]) / 2];
        const pointsBearing = bearing(point1, point2);
        const perpendicularBearing = (pointsBearing - 90 + 360) % 360;

        const pointsDistance = distance(point1, point2, { units: 'kilometers' });
        const offsetPoint = destination(mid, pointsDistance * 0.05, perpendicularBearing, { units: 'kilometers' });
        offsetPoint.properties = {
            id: imageId,
            type: 'rotate-handle',
            icon: 'rotate'
        }
        return offsetPoint;
    }

    private onMouseMoveForCursor = (e: MapMouseEvent) => {
        if (this._startPoint != null) return;
        const features = this._map?.queryRenderedFeatures(e.point);
        const rotate = features?.find((feature) => feature.layer.id.startsWith(HANDLE_PREFIX) && feature.properties["type"] === 'rotate-handle');
        const scale = features?.find((feature) => feature.layer.id.startsWith(HANDLE_PREFIX));
        const drag = features?.find((feature) => feature.layer.id.startsWith(AREA_PREFIX));
        if (rotate) this._map!.getCanvas().style.cursor = 'crosshair';
        else if (scale) this._map!.getCanvas().style.cursor = scale.properties["icon"];
        else if (drag) this._map!.getCanvas().style.cursor = 'move';
        else this._map!.getCanvas().style.cursor = '';
    }

    private onMouseDown = (e: MapMouseEvent) => {
        let features = this._map?.queryRenderedFeatures(e.point);
        features = features?.filter((feature) => feature.source.startsWith(`${GEOJSON_SOURCE_PREFIX}${ID_PREFIX}`)) ?? [];
        if (features.length <= 0) {
            return;
        }
        e.preventDefault();
        this._selectedImageId = features[0]!.properties["id"];
        this._startPointCoordinates = this._map?.getSource<ImageSource>(`${IMAGE_SOURCE_PREFIX}${this._selectedImageId!}`)?.coordinates;
        const currentPoint = [e.lngLat.lng, e.lngLat.lat] as [number, number];
        if (!features.some(f => f.layer.id.startsWith(HANDLE_PREFIX))) {
            this._startPoint = currentPoint;
            return;
        }
        if (features.some(f => f.properties["type"] === "rotate-handle")) {
            this._isRotating = true;
            this._startPoint = currentPoint;
            return;
        }
        this._isScaling = true;
        this._startPoint = this._startPointCoordinates![0];
        for (let coordinate of this._startPointCoordinates!) {
            if (distance(coordinate, currentPoint) < distance(this._startPoint, currentPoint)) {
                this._startPoint = coordinate;
            }
        }
    }

    private onMouseMove = (e: MapMouseEvent) => {
        if (!this._selectedImageId) {
            return;
        }
        const diff = [e.lngLat.lng - this._startPoint![0], e.lngLat.lat - this._startPoint![1]];
        let newCoordinates: Corners;
        if (this._isRotating) {
            const center = this.getCenter(this._startPointCoordinates!);
            const angle1 = bearing(this._startPoint!, center);
            const angle2 = bearing([e.lngLat.lng, e.lngLat.lat], center);
            let transformedFature = transformRotate({
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
                });
            newCoordinates = transformedFature.geometry.coordinates[0] as Corners;
        } else if (this._isScaling) {
            const oppositePoint = this.getOpositePoint(this._startPointCoordinates!, this._startPoint!)
            const distanceStartOpposite = distance(this._startPoint!, oppositePoint);
            const distanceCurrentOpposite = distance([e.lngLat.lng, e.lngLat.lat], oppositePoint);
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
            newCoordinates = transformedFature.geometry.coordinates[0] as Corners;
        } else {
            newCoordinates = this._startPointCoordinates!.map((coordinate) => [
                coordinate[0] + diff[0]!,
                coordinate[1] + diff[1]!
            ]) as Corners;
        }

        this._map?.getSource<ImageSource>(`${IMAGE_SOURCE_PREFIX}${this._selectedImageId}`)?.setCoordinates(newCoordinates);
        this._map?.getSource<GeoJSONSource>(`${GEOJSON_SOURCE_PREFIX}${this._selectedImageId}`)?.setData(this.buildGeoJSON(newCoordinates, this._selectedImageId));
    }

    private onMouseUp = () => {
        this._selectedImageId = null;
        this._startPoint = null;
        this._startPointCoordinates = undefined;
        this._isScaling = false;
        this._isRotating = false;
    }

    private async initImages() {
        const rotateImage = await this._map?.loadImage(rotate);
        this._map?.addImage('rotate', rotateImage?.data!);
        const resizeNESWImage = await this._map?.loadImage(scaleNESW);
        this._map?.addImage('nesw-resize', resizeNESWImage?.data!);
        const resizeNWSEImage = await this._map?.loadImage(scaleNWSE);
        this._map?.addImage('nwse-resize', resizeNWSEImage?.data!);
    }
}