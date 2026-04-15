(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.MaplibreAreaTransform = {}));
})(this, (function (exports) { 'use strict';

	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	var eventemitter3 = {exports: {}};

	var hasRequiredEventemitter3;

	function requireEventemitter3 () {
		if (hasRequiredEventemitter3) return eventemitter3.exports;
		hasRequiredEventemitter3 = 1;
		(function (module) {

			var has = Object.prototype.hasOwnProperty
			  , prefix = '~';

			/**
			 * Constructor to create a storage for our `EE` objects.
			 * An `Events` instance is a plain object whose properties are event names.
			 *
			 * @constructor
			 * @private
			 */
			function Events() {}

			//
			// We try to not inherit from `Object.prototype`. In some engines creating an
			// instance in this way is faster than calling `Object.create(null)` directly.
			// If `Object.create(null)` is not supported we prefix the event names with a
			// character to make sure that the built-in object properties are not
			// overridden or used as an attack vector.
			//
			if (Object.create) {
			  Events.prototype = Object.create(null);

			  //
			  // This hack is needed because the `__proto__` property is still inherited in
			  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
			  //
			  if (!new Events().__proto__) prefix = false;
			}

			/**
			 * Representation of a single event listener.
			 *
			 * @param {Function} fn The listener function.
			 * @param {*} context The context to invoke the listener with.
			 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
			 * @constructor
			 * @private
			 */
			function EE(fn, context, once) {
			  this.fn = fn;
			  this.context = context;
			  this.once = once || false;
			}

			/**
			 * Add a listener for a given event.
			 *
			 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
			 * @param {(String|Symbol)} event The event name.
			 * @param {Function} fn The listener function.
			 * @param {*} context The context to invoke the listener with.
			 * @param {Boolean} once Specify if the listener is a one-time listener.
			 * @returns {EventEmitter}
			 * @private
			 */
			function addListener(emitter, event, fn, context, once) {
			  if (typeof fn !== 'function') {
			    throw new TypeError('The listener must be a function');
			  }

			  var listener = new EE(fn, context || emitter, once)
			    , evt = prefix ? prefix + event : event;

			  if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
			  else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
			  else emitter._events[evt] = [emitter._events[evt], listener];

			  return emitter;
			}

			/**
			 * Clear event by name.
			 *
			 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
			 * @param {(String|Symbol)} evt The Event name.
			 * @private
			 */
			function clearEvent(emitter, evt) {
			  if (--emitter._eventsCount === 0) emitter._events = new Events();
			  else delete emitter._events[evt];
			}

			/**
			 * Minimal `EventEmitter` interface that is molded against the Node.js
			 * `EventEmitter` interface.
			 *
			 * @constructor
			 * @public
			 */
			function EventEmitter() {
			  this._events = new Events();
			  this._eventsCount = 0;
			}

			/**
			 * Return an array listing the events for which the emitter has registered
			 * listeners.
			 *
			 * @returns {Array}
			 * @public
			 */
			EventEmitter.prototype.eventNames = function eventNames() {
			  var names = []
			    , events
			    , name;

			  if (this._eventsCount === 0) return names;

			  for (name in (events = this._events)) {
			    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
			  }

			  if (Object.getOwnPropertySymbols) {
			    return names.concat(Object.getOwnPropertySymbols(events));
			  }

			  return names;
			};

			/**
			 * Return the listeners registered for a given event.
			 *
			 * @param {(String|Symbol)} event The event name.
			 * @returns {Array} The registered listeners.
			 * @public
			 */
			EventEmitter.prototype.listeners = function listeners(event) {
			  var evt = prefix ? prefix + event : event
			    , handlers = this._events[evt];

			  if (!handlers) return [];
			  if (handlers.fn) return [handlers.fn];

			  for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
			    ee[i] = handlers[i].fn;
			  }

			  return ee;
			};

			/**
			 * Return the number of listeners listening to a given event.
			 *
			 * @param {(String|Symbol)} event The event name.
			 * @returns {Number} The number of listeners.
			 * @public
			 */
			EventEmitter.prototype.listenerCount = function listenerCount(event) {
			  var evt = prefix ? prefix + event : event
			    , listeners = this._events[evt];

			  if (!listeners) return 0;
			  if (listeners.fn) return 1;
			  return listeners.length;
			};

			/**
			 * Calls each of the listeners registered for a given event.
			 *
			 * @param {(String|Symbol)} event The event name.
			 * @returns {Boolean} `true` if the event had listeners, else `false`.
			 * @public
			 */
			EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
			  var evt = prefix ? prefix + event : event;

			  if (!this._events[evt]) return false;

			  var listeners = this._events[evt]
			    , len = arguments.length
			    , args
			    , i;

			  if (listeners.fn) {
			    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

			    switch (len) {
			      case 1: return listeners.fn.call(listeners.context), true;
			      case 2: return listeners.fn.call(listeners.context, a1), true;
			      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
			      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
			      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
			      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
			    }

			    for (i = 1, args = new Array(len -1); i < len; i++) {
			      args[i - 1] = arguments[i];
			    }

			    listeners.fn.apply(listeners.context, args);
			  } else {
			    var length = listeners.length
			      , j;

			    for (i = 0; i < length; i++) {
			      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

			      switch (len) {
			        case 1: listeners[i].fn.call(listeners[i].context); break;
			        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
			        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
			        case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;
			        default:
			          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
			            args[j - 1] = arguments[j];
			          }

			          listeners[i].fn.apply(listeners[i].context, args);
			      }
			    }
			  }

			  return true;
			};

			/**
			 * Add a listener for a given event.
			 *
			 * @param {(String|Symbol)} event The event name.
			 * @param {Function} fn The listener function.
			 * @param {*} [context=this] The context to invoke the listener with.
			 * @returns {EventEmitter} `this`.
			 * @public
			 */
			EventEmitter.prototype.on = function on(event, fn, context) {
			  return addListener(this, event, fn, context, false);
			};

			/**
			 * Add a one-time listener for a given event.
			 *
			 * @param {(String|Symbol)} event The event name.
			 * @param {Function} fn The listener function.
			 * @param {*} [context=this] The context to invoke the listener with.
			 * @returns {EventEmitter} `this`.
			 * @public
			 */
			EventEmitter.prototype.once = function once(event, fn, context) {
			  return addListener(this, event, fn, context, true);
			};

			/**
			 * Remove the listeners of a given event.
			 *
			 * @param {(String|Symbol)} event The event name.
			 * @param {Function} fn Only remove the listeners that match this function.
			 * @param {*} context Only remove the listeners that have this context.
			 * @param {Boolean} once Only remove one-time listeners.
			 * @returns {EventEmitter} `this`.
			 * @public
			 */
			EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
			  var evt = prefix ? prefix + event : event;

			  if (!this._events[evt]) return this;
			  if (!fn) {
			    clearEvent(this, evt);
			    return this;
			  }

			  var listeners = this._events[evt];

			  if (listeners.fn) {
			    if (
			      listeners.fn === fn &&
			      (!once || listeners.once) &&
			      (!context || listeners.context === context)
			    ) {
			      clearEvent(this, evt);
			    }
			  } else {
			    for (var i = 0, events = [], length = listeners.length; i < length; i++) {
			      if (
			        listeners[i].fn !== fn ||
			        (once && !listeners[i].once) ||
			        (context && listeners[i].context !== context)
			      ) {
			        events.push(listeners[i]);
			      }
			    }

			    //
			    // Reset the array, or remove it completely if we have no more listeners.
			    //
			    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
			    else clearEvent(this, evt);
			  }

			  return this;
			};

			/**
			 * Remove all listeners, or those of the specified event.
			 *
			 * @param {(String|Symbol)} [event] The event name.
			 * @returns {EventEmitter} `this`.
			 * @public
			 */
			EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
			  var evt;

			  if (event) {
			    evt = prefix ? prefix + event : event;
			    if (this._events[evt]) clearEvent(this, evt);
			  } else {
			    this._events = new Events();
			    this._eventsCount = 0;
			  }

			  return this;
			};

			//
			// Alias methods names because people roll like that.
			//
			EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
			EventEmitter.prototype.addListener = EventEmitter.prototype.on;

			//
			// Expose the prefix.
			//
			EventEmitter.prefixed = prefix;

			//
			// Allow `EventEmitter` to be imported as module namespace.
			//
			EventEmitter.EventEmitter = EventEmitter;

			//
			// Expose the module.
			//
			{
			  module.exports = EventEmitter;
			} 
		} (eventemitter3));
		return eventemitter3.exports;
	}

	var eventemitter3Exports = requireEventemitter3();
	var EventEmitter = /*@__PURE__*/getDefaultExportFromCjs(eventemitter3Exports);

	function pxCentroid(pts) {
	    const x = pts.reduce((s, p) => s + p[0], 0) / pts.length;
	    const y = pts.reduce((s, p) => s + p[1], 0) / pts.length;
	    return [x, y];
	}
	function pxDistance(a, b) {
	    return Math.sqrt((b[0] - a[0]) ** 2 + (b[1] - a[1]) ** 2);
	}
	/** Angle in radians from a to b */
	function pxAngle(from, to) {
	    return Math.atan2(to[1] - from[1], to[0] - from[0]);
	}
	/** Rotate a single point around a pivot by `angle` radians */
	function pxRotatePoint(pt, pivot, angle) {
	    const cos = Math.cos(angle);
	    const sin = Math.sin(angle);
	    const dx = pt[0] - pivot[0];
	    const dy = pt[1] - pivot[1];
	    return [
	        pivot[0] + dx * cos - dy * sin,
	        pivot[1] + dx * sin + dy * cos
	    ];
	}
	/** Rotate all corners around their centroid */
	function pxRotatePolygon(cornersPx, startPx, currentPx) {
	    const center = pxCentroid(cornersPx);
	    const angle = pxAngle(center, currentPx) - pxAngle(center, startPx);
	    return cornersPx.map(pt => pxRotatePoint(pt, center, angle));
	}
	/** Scale corners from opposite anchor point */
	function pxScalePolygon(cornersPx, handlePx, currentPx) {
	    const oppositePx = pxGetOppositePoint(cornersPx, handlePx);
	    const distStart = pxDistance(handlePx, oppositePx);
	    const distCurrent = pxDistance(currentPx, oppositePx);
	    if (distStart === 0)
	        return cornersPx;
	    const scale = distCurrent / distStart;
	    return cornersPx.map(pt => [
	        oppositePx[0] + (pt[0] - oppositePx[0]) * scale,
	        oppositePx[1] + (pt[1] - oppositePx[1]) * scale
	    ]);
	}
	function pxGetOppositePoint(cornersPx, handlePx) {
	    let maxDist = -Infinity;
	    let opposite = cornersPx[0];
	    for (const pt of cornersPx) {
	        if (Math.abs(pt[0] - handlePx[0]) < 0.1 && Math.abs(pt[1] - handlePx[1]) < 0.1)
	            continue;
	        const d = pxDistance(pt, handlePx);
	        if (d > maxDist) {
	            maxDist = d;
	            opposite = pt;
	        }
	    }
	    return opposite;
	}
	function pxMidpoint(a, b) {
	    return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
	}
	/** Project a point onto the normal of an edge, return signed pixel distance */
	function pxProjectOntoNormal(edgePx0, edgePx1, fromPx, toPx) {
	    const edgeVec = [edgePx1[0] - edgePx0[0], edgePx1[1] - edgePx0[1]];
	    const edgeLen = Math.sqrt(edgeVec[0] ** 2 + edgeVec[1] ** 2);
	    if (edgeLen === 0)
	        return 0;
	    // Normal perpendicular to edge (pointing inward/outward)
	    const normal = [-edgeVec[1] / edgeLen, edgeVec[0] / edgeLen];
	    const drag = [toPx[0] - fromPx[0], toPx[1] - fromPx[1]];
	    return drag[0] * normal[0] + drag[1] * normal[1];
	}
	function pxResizeSide(cornersPx, startPx, currentPx) {
	    const edgeIndex = pxGetClosestEdgeIndex(cornersPx, startPx);
	    const i0 = edgeIndex;
	    const i1 = (edgeIndex + 1) % 4;
	    const displacement = pxProjectOntoNormal(cornersPx[i0], cornersPx[i1], currentPx, startPx);
	    // Clamp: can't push past 90% toward the opposite edge
	    const oppI0 = (edgeIndex + 2) % 4;
	    const oppI1 = (edgeIndex + 3) % 4;
	    const oppMid = pxMidpoint(cornersPx[oppI0], cornersPx[oppI1]);
	    const maxDisp = pxProjectOntoNormal(cornersPx[oppI0], cornersPx[oppI1], oppMid, startPx);
	    const edgeVec = [cornersPx[i1][0] - cornersPx[i0][0], cornersPx[i1][1] - cornersPx[i0][1]];
	    const edgeLen = Math.sqrt(edgeVec[0] ** 2 + edgeVec[1] ** 2);
	    const normal = [-edgeVec[1] / edgeLen, edgeVec[0] / edgeLen];
	    const clampedDisp = Math.max(displacement, -(maxDisp * 0.9));
	    const newCorners = [...cornersPx];
	    newCorners[i0] = [
	        cornersPx[i0][0] - normal[0] * clampedDisp,
	        cornersPx[i0][1] - normal[1] * clampedDisp
	    ];
	    newCorners[i1] = [
	        cornersPx[i1][0] - normal[0] * clampedDisp,
	        cornersPx[i1][1] - normal[1] * clampedDisp
	    ];
	    return newCorners;
	}
	function pxGetClosestEdgeIndex(cornersPx, pointPx) {
	    let closest = 0;
	    let minDist = Infinity;
	    for (let i = 0; i < cornersPx.length; i++) {
	        const mid = pxMidpoint(cornersPx[i], cornersPx[(i + 1) % cornersPx.length]);
	        const d = pxDistance(pointPx, mid);
	        if (d < minDist) {
	            minDist = d;
	            closest = i;
	        }
	    }
	    return closest;
	}
	function pxMovePoints(cornersPx, startPx, currentPx) {
	    const dx = currentPx[0] - startPx[0];
	    const dy = currentPx[1] - startPx[1];
	    return cornersPx.map(p => [p[0] + dx, p[1] + dy]);
	}
	/**
	 * Sort points in clockwise order starting from the top-left corner.
	 * @param corners The corners of the rectangle.
	 * @returns The sorted corners of the rectangle.
	 */
	function sortPoints(points) {
	    const centerPx = pxCentroid(points);
	    const indexed = points.map((px, i) => ({
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
	    return sorted.map(item => points[item.i]);
	}

	var img$1 = "data:image/png;base64,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";

	var img = "data:image/png;base64,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ZURhdGUAMjAxOS0wNC0yMFQwNzo1MDozNCswODowMJMv63oAAAAsdEVYdHhtcDpDcmVhdG9yVG9vbABBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpKBmP8QAAACp0RVh0eG1wOk1ldGFkYXRhRGF0ZQAyMDE5LTA0LTIwVDA5OjE1OjE5KzA4OjAwlJFWNgAAACh0RVh0eG1wOk1vZGlmeURhdGUAMjAxOS0wNC0yMFQwOToxNToxOSswODowMKg1BYgAAAAYdEVYdHhtcDpQaXhlbFhEaW1lbnNpb24AMjAwMEY4r7oAAAAYdEVYdHhtcDpQaXhlbFlEaW1lbnNpb24AMjAwMP/DdFIAAAA+dEVYdHhtcE1NOkRlcml2ZWRGcm9tAHhtcC5kaWQ6ZDA3MGQyYTYtOTQ2Mi02ZjQ1LTk2ZGQtODY0NzkwMDIxODJhtJUlXwAAAD10RVh0eG1wTU06RG9jdW1lbnRJRAB4bXAuZGlkOmQwNzBkMmE2LTk0NjItNmY0NS05NmRkLTg2NDc5MDAyMTgyYY712Y8AAAA9dEVYdHhtcE1NOkluc3RhbmNlSUQAeG1wLmlpZDplNzQ4MGY4Ny03Mzg0LWYxNDgtYjU0NC0zOWMyOWJkYmRjMjEQmyaQAAAARXRFWHR4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQAeG1wLmRpZDpkMDcwZDJhNi05NDYyLTZmNDUtOTZkZC04NjQ3OTAwMjE4MmGCKLd8AAAAAElFTkSuQmCC";

	const defaultOptions = {
	    showAddImageButton: true,
	    showAddRectangleButton: true,
	    showAddPolygonButton: true,
	    showDeleteButton: true,
	    rectangleSizeFactor: 0.5,
	    areaBackgroundColor: 'orange',
	    areaOpacity: 0.1
	};
	const HANDLE_LAYER = 'area-transform-layer-polygon-handle';
	const AREA_LAYER = 'area-transform-layer-polygon-area-';
	const ID_PREFIX = 'area-transform-feature-';
	const RESIZEABLE_POLYGON_FEATURE_ID = `${ID_PREFIX}resizable-`;
	const IMAGE_SOURCE_PREFIX = 'area-transform-raster-';
	const IMAGE_LAYER_PREFIX = 'area-transform-raster-layer-';
	const GEOJSON_SOURCE = 'area-transform-geojson-source';
	const POLYGON_BUTTON_ID = 'area-transfrom-polygon';
	const DELETE_BUTTON_ID = 'area-transfrom-delete';
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
	class MaplibreAreaTransform {
	    options;
	    _map = null;
	    _container = null;
	    _eventEmitter = new EventEmitter();
	    _selectedFeatureId = null;
	    _state = "";
	    _polygonPoints = [];
	    _startPx = null;
	    _startCornersPx = undefined; // corners at drag start
	    constructor(options = defaultOptions) {
	        this.options = options;
	        this.options = { ...defaultOptions, ...options };
	    }
	    /** @inheritdoc */
	    onAdd(map) {
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
	    initFileButton() {
	        const fileInput = document.createElement('input');
	        fileInput.type = 'file';
	        fileInput.accept = 'image/*';
	        fileInput.style.display = 'none';
	        fileInput.onchange = this.onFileSelected;
	        const button = document.createElement('button');
	        button.type = 'button';
	        button.setAttribute('aria-label', 'Add Image');
	        const icon = document.createElement('span');
	        icon.className = 'icon-add-image';
	        button.appendChild(icon);
	        button.onclick = () => fileInput.click();
	        this._container.appendChild(fileInput);
	        this._container.appendChild(button);
	    }
	    /**
	     * Initialize the polygon button
	     */
	    initPolygonButton() {
	        const button = document.createElement('button');
	        button.type = 'button';
	        button.id = POLYGON_BUTTON_ID;
	        button.setAttribute('aria-label', 'Add Polygon');
	        const icon = document.createElement('span');
	        icon.className = 'icon-add-polygon';
	        button.appendChild(icon);
	        button.onclick = () => this.startAddPolygonSequence();
	        this._container.appendChild(button);
	    }
	    /**
	     * Initialize the rectangle button
	     */
	    initRectangleButton() {
	        const button = document.createElement('button');
	        button.type = 'button';
	        button.setAttribute('aria-label', 'Add Rectangle');
	        const icon = document.createElement('span');
	        icon.className = 'icon-add-rectangle';
	        button.appendChild(icon);
	        button.onclick = () => this.addRectangle();
	        this._container.appendChild(button);
	    }
	    initDeleteButton() {
	        const button = document.createElement('button');
	        button.type = 'button';
	        button.id = DELETE_BUTTON_ID;
	        button.setAttribute('aria-label', 'Delete');
	        const icon = document.createElement('span');
	        icon.className = 'icon-delete';
	        button.appendChild(icon);
	        button.onclick = () => this.onDeleteButtonClick();
	        this._container.appendChild(button);
	    }
	    initGeojsonSourceAndLayers() {
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
	                'icon-rotate': ['get', 'heading'],
	                'icon-size': 0.4
	            },
	            paint: {
	                'icon-color': this.options.areaBackgroundColor
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
	                'circle-color': this.options.areaBackgroundColor,
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
	                'fill-color': ['get', 'color'],
	                'fill-opacity': this.options.areaOpacity
	            },
	            filter: ["==", "$type", "Polygon"]
	        });
	    }
	    /** @inheritdoc */
	    onRemove() {
	        this._container?.remove();
	        this._map?.off('mousemove', this.onMouseMoveForCursor);
	        this._map?.off('mousedown', this.onMouseDown);
	        this._map?.off('mousemove', this.onMouseMove);
	        this._map?.off('mouseup', this.onMouseUp);
	        this._map?.off('click', this.onClick);
	        this._map = null;
	    }
	    async addImage(imageUrl, coordinates) {
	        if (this._state === "adding-ploygon") {
	            return Promise.reject("Cannot add image while adding polygon");
	        }
	        const imageId = `${ID_PREFIX}${maxFeatureId++}`;
	        const imageSourceId = `${IMAGE_SOURCE_PREFIX}${imageId}`;
	        this._map?.addSource(imageSourceId, {
	            type: 'image',
	            url: imageUrl,
	            coordinates: coordinates
	        });
	        this._map?.addLayer({
	            id: IMAGE_LAYER_PREFIX + imageId,
	            type: 'raster',
	            source: imageSourceId,
	            paint: {
	                'raster-opacity': 0.9,
	                'raster-fade-duration': 0
	            }
	        }, HANDLE_LAYER);
	        const geojsonSource = this._map?.getSource(GEOJSON_SOURCE);
	        await geojsonSource.updateData({
	            add: this.buildPolygonGeoJSONFeatures({ coordinates, featureId: imageId, isSelected: true, color: "transparent" })
	        }, true);
	        await this.removeSelection();
	        await this.setSelection(imageId);
	        this.setState("");
	        return imageId;
	    }
	    /**
	     * This adds a rectangle to the middle of the screen
	     * @returns a pomise that resolves to the newly added rectangle ID
	     */
	    addRectangle() {
	        if (this._state === "adding-ploygon") {
	            return Promise.reject("Cannot add rectangle while adding polygon");
	        }
	        const canvas = this._map.getCanvas();
	        const startX = canvas.width * (1 - this.options.rectangleSizeFactor) / 2;
	        const startY = canvas.height * (1 - this.options.rectangleSizeFactor) / 2;
	        const width = canvas.width * this.options.rectangleSizeFactor;
	        const height = canvas.height * this.options.rectangleSizeFactor;
	        console.log(startX, startY, width, height);
	        const corners = [[startX, startY], [startX + width, startY], [startX + width, startY + height], [startX, startY + height]];
	        return this.addPolygon(this.unprojectAll(corners), true);
	    }
	    /**
	     * Initiates the state of adding points in order to create a polygon on the screen
	     */
	    startAddPolygonSequence() {
	        this.removeSelection();
	        this.setState("adding-ploygon");
	        this._polygonPoints = [];
	    }
	    onDeleteButtonClick() {
	        if (this._state === "adding-ploygon") {
	            return;
	        }
	        this.removeSelection();
	        if (this._state === "deleting") {
	            this.setState("");
	        }
	        else {
	            this.setState("deleting");
	        }
	    }
	    /**
	     * Adds a polygon to the map
	     * @param coordinates - the polygon coordinates
	     * @param resizable - only relevant for rectangles
	     * @returns a promise with the polygon ID
	     */
	    async addPolygon(coordinates, resizable) {
	        const polygonId = `${resizable ? RESIZEABLE_POLYGON_FEATURE_ID : ID_PREFIX}${maxFeatureId++}`;
	        const geojsonSource = this._map?.getSource(GEOJSON_SOURCE);
	        await geojsonSource.updateData({
	            add: this.buildPolygonGeoJSONFeatures({ coordinates, featureId: polygonId, isSelected: true, color: this.options.areaBackgroundColor })
	        }, true);
	        await this.removeSelection();
	        await this.setSelection(polygonId);
	        this.setState("");
	        return polygonId;
	    }
	    async deleteFeature(featureId) {
	        this.removeSelection();
	        const geojsonSource = this._map?.getSource(GEOJSON_SOURCE);
	        let data = await geojsonSource.getData();
	        data.features = data.features.filter(f => f.properties?.["featureId"] !== featureId);
	        geojsonSource.setData(data);
	        const imageSource = this._map?.getSource(IMAGE_SOURCE_PREFIX + featureId);
	        if (imageSource) {
	            this._map?.removeLayer(IMAGE_LAYER_PREFIX + featureId);
	            this._map?.removeSource(IMAGE_SOURCE_PREFIX + featureId);
	        }
	    }
	    on(event, listener) {
	        this._eventEmitter.on(event, listener);
	    }
	    off(event, listener) {
	        this._eventEmitter.off(event, listener);
	    }
	    onFileSelected = (e) => {
	        const target = e.target;
	        const file = target.files?.[0];
	        if (!file)
	            return;
	        const imageUrl = URL.createObjectURL(file);
	        const img = new Image();
	        img.onload = () => {
	            const aspect = img.naturalWidth / img.naturalHeight;
	            const canvas = this._map.getCanvas();
	            const baseWidth = canvas.width / 4;
	            const baseHeight = baseWidth / aspect;
	            const startX = canvas.width / 4;
	            const startY = canvas.height / 4;
	            const corners = [
	                [startX, startY], [startX + baseWidth, startY],
	                [startX + baseWidth, startY + baseHeight], [startX, startY + baseHeight]
	            ];
	            this.addImage(imageUrl, this.unprojectAll(corners));
	            this._eventEmitter.emit('fileSelected', { file, imageUrl });
	        };
	        img.src = imageUrl;
	        target.value = '';
	    };
	    initMapListeners() {
	        this._map?.on('mousemove', this.onMouseMoveForCursor);
	        this._map?.on('mousedown', this.onMouseDown);
	        this._map?.on('mousemove', this.onMouseMove);
	        this._map?.on('mouseup', this.onMouseUp);
	        this._map?.on('click', this.onClick);
	    }
	    buildPolygonGeoJSONFeatures(buildOptions) {
	        const { coordinates, featureId, isSelected, color } = buildOptions;
	        const features = [{
	                type: 'Feature',
	                geometry: {
	                    type: 'Polygon',
	                    coordinates: [[...coordinates, coordinates[0]]]
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
	                    coordinates: coordinates[i]
	                },
	                properties: {
	                    id: "scale-" + i + "-" + featureId,
	                    featureId,
	                    type: 'scale-handle',
	                    icon: 'scale',
	                    isSelected,
	                    heading: this.getScaleHandleHeading(coordinates, coordinates[i])
	                }
	            });
	        }
	        return features;
	    }
	    getRotateHandlePoint(coordinates, featureId) {
	        const pxCorners = this.projectAll(coordinates);
	        const p0 = pxCorners[0];
	        const p1 = pxCorners[1];
	        const midPx = pxMidpoint(p0, p1);
	        // Offset perpendicular to the first edge
	        const edgeVec = [p0[0] - p1[0], p0[1] - p1[1]];
	        const edgeLen = Math.sqrt(edgeVec[0] ** 2 + edgeVec[1] ** 2);
	        const normalPx = [-edgeVec[1] / edgeLen, edgeVec[0] / edgeLen];
	        const offsetDist = edgeLen * 0.075;
	        const handlePx = [midPx[0] + normalPx[0] * offsetDist, midPx[1] + normalPx[1] * offsetDist];
	        const handleCoord = this.unproject(handlePx);
	        return {
	            type: 'Feature',
	            geometry: { type: 'Point', coordinates: handleCoord },
	            properties: {
	                id: "rotate-" + featureId,
	                featureId,
	                type: 'rotate-handle',
	                icon: 'rotate',
	                isSelected: true,
	                heading: 0
	            }
	        };
	    }
	    getResizeHandlePoints(coordinates, featureId) {
	        const points = [];
	        const pxCorners = this.projectAll(coordinates);
	        for (let i = 0; i < pxCorners.length; i++) {
	            const nextPx = pxCorners[(i + 1) % pxCorners.length];
	            const midPx = pxMidpoint(pxCorners[i], nextPx);
	            const coordinate = this.unproject(midPx);
	            points.push({
	                type: 'Feature',
	                geometry: {
	                    type: 'Point',
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
	    getScaleHandleHeading(coordinates, currentPoint) {
	        // bearing() here is fine — it's only used for icon heading display, not geometry
	        const px = this.projectAll(coordinates);
	        const centerPx = pxCentroid(px);
	        const currentPx = this.project(currentPoint);
	        const angleDeg = Math.atan2(currentPx[1] - centerPx[1], currentPx[0] - centerPx[0]) * (180 / Math.PI);
	        // Convert from canvas angle (east=0, clockwise) to map bearing (north=0, clockwise)
	        return (angleDeg + 90 + 360) % 360;
	    }
	    onMouseMoveForCursor = (e) => {
	        if (this._selectedFeatureId == null || this._startPx != null) {
	            this._map.getCanvas().style.cursor = '';
	            return;
	        }
	        if (!this._selectedFeatureId) {
	            return;
	        }
	        const features = this._map?.queryRenderedFeatures(e.point).filter(f => f.properties?.["featureId"] === this._selectedFeatureId);
	        const rotate = features?.find(f => f.layer.id.startsWith(HANDLE_LAYER) && f.properties["type"] === 'rotate-handle');
	        const scaleOrResize = features?.find(f => f.layer.id.startsWith(HANDLE_LAYER) && (f.properties["type"] === 'scale-handle' || f.properties["type"] === 'resize-handle'));
	        const drag = features?.find(f => f.layer.id.startsWith(AREA_LAYER));
	        if (rotate) {
	            this._map.getCanvas().style.cursor = 'crosshair';
	        }
	        else if (scaleOrResize) {
	            const headingNormalized = (scaleOrResize.properties["heading"] + 180) % 180;
	            let cursor = "ns-resize";
	            if (headingNormalized > 157) {
	                cursor = "ns-resize";
	            }
	            else if (headingNormalized > 112) {
	                cursor = "nwse-resize";
	            }
	            else if (headingNormalized > 67) {
	                cursor = "ew-resize";
	            }
	            else if (headingNormalized > 22) {
	                cursor = "nesw-resize";
	            }
	            this._map.getCanvas().style.cursor = cursor;
	        }
	        else if (drag) {
	            this._map.getCanvas().style.cursor = 'move';
	        }
	        else {
	            this._map.getCanvas().style.cursor = '';
	        }
	    };
	    onMouseDown = (e) => {
	        if (this._selectedFeatureId == null) {
	            return;
	        }
	        let features = this._map?.queryRenderedFeatures(e.point);
	        features = features?.filter(f => f.source === GEOJSON_SOURCE && f.properties?.["featureId"] === this._selectedFeatureId) ?? [];
	        if (features.length <= 0) {
	            return;
	        }
	        e.preventDefault();
	        const currentPx = [e.point.x, e.point.y];
	        this.setStateFromMouseDown(currentPx, features);
	    };
	    async setStateFromMouseDown(currentPx, queriedFeatures) {
	        const data = await this._map?.getSource(GEOJSON_SOURCE)?.getData();
	        const featurePoints = data.features.filter(f => f.geometry.type === "Point" && f.properties?.["featureId"] === this._selectedFeatureId);
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
	        let closestFeature = featurePoints[0];
	        for (const feature of featurePoints) {
	            const fPx = this.project(feature.geometry.coordinates);
	            const bestPx = this.project(closestFeature.geometry.coordinates);
	            if (pxDistance(fPx, currentPx) < pxDistance(bestPx, currentPx)) {
	                closestFeature = feature;
	            }
	        }
	        this._startPx = this.project(closestFeature.geometry.coordinates);
	        if (closestFeature.properties?.["type"] === "scale-handle") {
	            this.setState("scaling");
	        }
	        else {
	            this.setState("resizeing");
	        }
	    }
	    onMouseMove = (e) => {
	        if (!this._selectedFeatureId || this._startPx == null)
	            return;
	        const currentPx = [e.point.x, e.point.y];
	        let newCornersPx;
	        switch (this._state) {
	            case "rotating":
	                newCornersPx = pxRotatePolygon(this._startCornersPx, this._startPx, currentPx);
	                break;
	            case "scaling":
	                newCornersPx = pxScalePolygon(this._startCornersPx, this._startPx, currentPx);
	                break;
	            case "resizeing":
	                newCornersPx = pxResizeSide(this._startCornersPx, this._startPx, currentPx);
	                break;
	            default:
	            case "moving": {
	                newCornersPx = pxMovePoints(this._startCornersPx, this._startPx, currentPx);
	                break;
	            }
	        }
	        const newCoordinates = this.unprojectAll(newCornersPx);
	        this._map?.getSource(`${IMAGE_SOURCE_PREFIX}${this._selectedFeatureId}`)?.setCoordinates(newCoordinates);
	        this.updateCoordinates(this._selectedFeatureId, newCoordinates);
	    };
	    onMouseUp = () => {
	        this._startPx = null;
	        this._startCornersPx = undefined;
	        if (this._state === "moving" ||
	            this._state === "resizeing" ||
	            this._state === "rotating" ||
	            this._state === "scaling") {
	            this.setState("");
	        }
	    };
	    onClick = (e) => {
	        if (this._state === "adding-ploygon") {
	            this.onClickWhenInPolygonMode(e);
	            return;
	        }
	        const features = this._map?.queryRenderedFeatures(e.point);
	        const polygonFeature = features?.find(f => f.layer.id.startsWith(AREA_LAYER));
	        this.removeSelection();
	        if (polygonFeature) {
	            if (this._state === "deleting") {
	                this.deleteFeature(polygonFeature.properties["featureId"]);
	                return;
	            }
	            this.setSelection(polygonFeature.properties["featureId"]);
	        }
	    };
	    async onClickWhenInPolygonMode(e) {
	        const coordinates = [e.lngLat.lng, e.lngLat.lat];
	        const source = this._map?.getSource(GEOJSON_SOURCE);
	        const pixelThreshold = 10;
	        if (this._polygonPoints.length > 0 &&
	            Math.abs(this._polygonPoints[0][0] - e.point.x) < pixelThreshold &&
	            Math.abs(this._polygonPoints[0][1] - e.point.y) < pixelThreshold) {
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
	        const point = {
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
	        const areaGeometry = {
	            type: "Polygon",
	            coordinates: [[...this.unprojectAll(this._polygonPoints), this.unproject(this._polygonPoints[0])]]
	        };
	        if (this._polygonPoints.length === 3) {
	            const area = {
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
	    async initImages() {
	        const rotateImage = await this._map?.loadImage(img$1);
	        this._map?.addImage('rotate', rotateImage?.data, { sdf: true });
	        const scaleImage = await this._map?.loadImage(img);
	        this._map?.addImage('scale', scaleImage?.data, { sdf: true });
	    }
	    async removeSelection() {
	        this._selectedFeatureId = null;
	        const source = this._map?.getSource(GEOJSON_SOURCE);
	        const data = await source.getData();
	        for (const feature of data.features) {
	            delete feature?.properties?.["isSelected"];
	        }
	        data.features = data.features.filter(f => f.properties?.["type"] !== "rotate-handle" && f.properties?.["type"] !== "resize-handle");
	        await source.setData(data, true);
	    }
	    async setSelection(featureId) {
	        this._selectedFeatureId = featureId;
	        const source = this._map?.getSource(GEOJSON_SOURCE);
	        const data = await source.getData();
	        const corners = [];
	        for (const feature of data.features) {
	            if (feature.geometry.type === "Point" &&
	                feature.properties?.["featureId"] === featureId &&
	                feature.properties?.["type"] === "scale-handle") {
	                feature.properties["isSelected"] = true;
	                corners.push(feature);
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
	    async updateCoordinates(featureId, newCoordinates) {
	        const source = this._map?.getSource(GEOJSON_SOURCE);
	        const data = await source.getData();
	        const color = data.features.find(f => f.properties?.["featureId"] === featureId && f.geometry?.type === "Polygon")?.properties?.["color"];
	        data.features = data.features.filter(f => f.properties?.["featureId"] !== featureId);
	        data.features.push(...this.buildPolygonGeoJSONFeatures({ coordinates: newCoordinates, featureId, isSelected: true, color }));
	        data.features = data.features.filter(f => f.properties?.["type"] !== "rotate-handle" && f.properties?.["type"] !== "resize-handle");
	        data.features.push(this.getRotateHandlePoint(newCoordinates, featureId));
	        if (featureId.startsWith(RESIZEABLE_POLYGON_FEATURE_ID)) {
	            data.features.push(...this.getResizeHandlePoints(newCoordinates, featureId));
	        }
	        await source.setData(data, true);
	    }
	    /** Project a lat/lng GeoJSON position to map pixel point */
	    project(pos) {
	        const pt = this._map.project([pos[0], pos[1]]);
	        return [pt.x, pt.y];
	    }
	    /** Unproject a pixel point back to [lng, lat] */
	    unproject(px) {
	        const ll = this._map.unproject(px);
	        return [ll.lng, ll.lat];
	    }
	    /** Project an array of lat/lng positions to pixel points */
	    projectAll(coords) {
	        return coords.map(c => this.project(c));
	    }
	    /** Unproject pixel points back to lat/lng positions */
	    unprojectAll(pxPoints) {
	        return pxPoints.map(p => this.unproject(p));
	    }
	    setState(state) {
	        this._state = state;
	        document.getElementById(POLYGON_BUTTON_ID)?.classList.toggle('active', this._state === "adding-ploygon");
	        document.getElementById(DELETE_BUTTON_ID)?.classList.toggle('active', this._state === "deleting");
	    }
	}

	exports.MaplibreAreaTransform = MaplibreAreaTransform;

}));
//# sourceMappingURL=maplibregl-area-transform.js.map
