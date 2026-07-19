//#region \0rolldown/runtime.js
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJSMin = (cb, mod) => () => (mod || (cb((mod = { exports: {} }).exports, mod), cb = null), mod.exports);
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));
var eventemitter3_default = (/* @__PURE__ */ __toESM((/* @__PURE__ */ __commonJSMin(((exports, module) => {
	var has = Object.prototype.hasOwnProperty, prefix = "~";
	/**
	* Constructor to create a storage for our `EE` objects.
	* An `Events` instance is a plain object whose properties are event names.
	*
	* @constructor
	* @private
	*/
	function Events() {}
	if (Object.create) {
		Events.prototype = Object.create(null);
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
		if (typeof fn !== "function") throw new TypeError("The listener must be a function");
		var listener = new EE(fn, context || emitter, once), evt = prefix ? prefix + event : event;
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
		var names = [], events, name;
		if (this._eventsCount === 0) return names;
		for (name in events = this._events) if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
		if (Object.getOwnPropertySymbols) return names.concat(Object.getOwnPropertySymbols(events));
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
		var evt = prefix ? prefix + event : event, handlers = this._events[evt];
		if (!handlers) return [];
		if (handlers.fn) return [handlers.fn];
		for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) ee[i] = handlers[i].fn;
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
		var evt = prefix ? prefix + event : event, listeners = this._events[evt];
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
		var listeners = this._events[evt], len = arguments.length, args, i;
		if (listeners.fn) {
			if (listeners.once) this.removeListener(event, listeners.fn, void 0, true);
			switch (len) {
				case 1: return listeners.fn.call(listeners.context), true;
				case 2: return listeners.fn.call(listeners.context, a1), true;
				case 3: return listeners.fn.call(listeners.context, a1, a2), true;
				case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
				case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
				case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
			}
			for (i = 1, args = new Array(len - 1); i < len; i++) args[i - 1] = arguments[i];
			listeners.fn.apply(listeners.context, args);
		} else {
			var length = listeners.length, j;
			for (i = 0; i < length; i++) {
				if (listeners[i].once) this.removeListener(event, listeners[i].fn, void 0, true);
				switch (len) {
					case 1:
						listeners[i].fn.call(listeners[i].context);
						break;
					case 2:
						listeners[i].fn.call(listeners[i].context, a1);
						break;
					case 3:
						listeners[i].fn.call(listeners[i].context, a1, a2);
						break;
					case 4:
						listeners[i].fn.call(listeners[i].context, a1, a2, a3);
						break;
					default:
						if (!args) for (j = 1, args = new Array(len - 1); j < len; j++) args[j - 1] = arguments[j];
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
			if (listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context)) clearEvent(this, evt);
		} else {
			for (var i = 0, events = [], length = listeners.length; i < length; i++) if (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) events.push(listeners[i]);
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
	EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
	EventEmitter.prototype.addListener = EventEmitter.prototype.on;
	EventEmitter.prefixed = prefix;
	EventEmitter.EventEmitter = EventEmitter;
	if ("undefined" !== typeof module) module.exports = EventEmitter;
})))(), 1)).default;
//#endregion
//#region src/pixel-utils.ts
function pxCentroid(pts) {
	return [pts.reduce((s, p) => s + p[0], 0) / pts.length, pts.reduce((s, p) => s + p[1], 0) / pts.length];
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
	return [pivot[0] + dx * cos - dy * sin, pivot[1] + dx * sin + dy * cos];
}
/** Rotate all corners around their centroid */
function pxRotatePolygon(cornersPx, startPx, currentPx) {
	const center = pxCentroid(cornersPx);
	const angle = pxAngle(center, currentPx) - pxAngle(center, startPx);
	return cornersPx.map((pt) => pxRotatePoint(pt, center, angle));
}
/** Scale corners from opposite anchor point */
function pxScalePolygon(cornersPx, handlePx, currentPx) {
	const oppositePx = pxGetOppositePoint(cornersPx, handlePx);
	const distStart = pxDistance(handlePx, oppositePx);
	const distCurrent = pxDistance(currentPx, oppositePx);
	if (distStart === 0) return cornersPx;
	const scale = distCurrent / distStart;
	return cornersPx.map((pt) => [oppositePx[0] + (pt[0] - oppositePx[0]) * scale, oppositePx[1] + (pt[1] - oppositePx[1]) * scale]);
}
function pxResizePolygon(cornersPx, handlePx, currentPx) {
	const handleIdx = pxGetClosestPointIndex(cornersPx, handlePx);
	const oppositeIdx = (handleIdx + 2) % 4;
	const adj1Idx = (handleIdx + 1) % 4;
	const adj2Idx = (handleIdx + 3) % 4;
	const opposite = cornersPx[oppositeIdx];
	const edge1 = [cornersPx[adj1Idx][0] - opposite[0], cornersPx[adj1Idx][1] - opposite[1]];
	const edge2 = [cornersPx[adj2Idx][0] - opposite[0], cornersPx[adj2Idx][1] - opposite[1]];
	const delta = [currentPx[0] - opposite[0], currentPx[1] - opposite[1]];
	const s = Math.max(.1, (delta[0] * edge1[0] + delta[1] * edge1[1]) / (edge1[0] ** 2 + edge1[1] ** 2));
	const t = Math.max(.1, (delta[0] * edge2[0] + delta[1] * edge2[1]) / (edge2[0] ** 2 + edge2[1] ** 2));
	const newCorners = [...cornersPx];
	newCorners[adj1Idx] = [opposite[0] + s * edge1[0], opposite[1] + s * edge1[1]];
	newCorners[adj2Idx] = [opposite[0] + t * edge2[0], opposite[1] + t * edge2[1]];
	newCorners[handleIdx] = [newCorners[adj1Idx][0] + newCorners[adj2Idx][0] - opposite[0], newCorners[adj1Idx][1] + newCorners[adj2Idx][1] - opposite[1]];
	return newCorners;
}
/**
* Returns the corner opposite the handle by walking half-way around the shape's
* perimeter measured by arc length.
*
* Corners are assumed to be ordered around the perimeter (see {@link sortPoints}).
* The total perimeter is computed first, then the perimeter is walked from the
* handle corner; the corner whose accumulated edge length is closest to half the
* perimeter is returned. This stays correct when points are unevenly spaced
* (e.g. several points clustered on one side and none on the other).
*/
function pxGetOppositePoint(cornersPx, handlePx) {
	const n = cornersPx.length;
	const handleIdx = pxGetClosestPointIndex(cornersPx, handlePx);
	let perimeter = 0;
	for (let i = 0; i < n; i++) perimeter += pxDistance(cornersPx[i], cornersPx[(i + 1) % n]);
	const half = perimeter / 2;
	let walked = 0;
	let opposite = cornersPx[handleIdx];
	let bestDelta = Infinity;
	for (let step = 1; step < n; step++) {
		const prevIdx = (handleIdx + step - 1) % n;
		const idx = (handleIdx + step) % n;
		walked += pxDistance(cornersPx[prevIdx], cornersPx[idx]);
		const delta = Math.abs(walked - half);
		if (delta < bestDelta) {
			bestDelta = delta;
			opposite = cornersPx[idx];
		}
	}
	return opposite;
}
function pxMidpoint(a, b) {
	return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
}
function pxGetClosestPointIndex(cornersPx, pointPx) {
	let closest = 0;
	let minDist = Infinity;
	for (let i = 0; i < cornersPx.length; i++) {
		const d = pxDistance(pointPx, cornersPx[i]);
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
	return cornersPx.map((p) => [p[0] + dx, p[1] + dy]);
}
/**
* Sort points in clockwise order starting from the top-left corner.
* @param corners The corners of the rectangle.
* @returns The sorted corners of the rectangle.
*/
function sortPoints(points) {
	const centerPx = pxCentroid(points);
	const indexed = points.map((px, i) => ({
		px,
		i,
		angle: Math.atan2(px[1] - centerPx[1], px[0] - centerPx[0])
	}));
	indexed.sort((a, b) => a.angle - b.angle);
	let topLeftIndex = 0;
	let minVal = Infinity;
	indexed.forEach((item, i) => {
		const val = item.px[0] - item.px[1];
		if (val < minVal) {
			minVal = val;
			topLeftIndex = i;
		}
	});
	return [...indexed.slice(topLeftIndex), ...indexed.slice(0, topLeftIndex)].map((item) => points[item.i]);
}
//#endregion
//#region src/image-recolor.ts
async function getImageData(source) {
	const canvas = document.createElement("canvas");
	if (source instanceof HTMLImageElement) {
		canvas.width = source.naturalWidth;
		canvas.height = source.naturalHeight;
	} else {
		canvas.width = source.width;
		canvas.height = source.height;
	}
	const ctx = canvas.getContext("2d");
	ctx.drawImage(source, 0, 0);
	return ctx.getImageData(0, 0, canvas.width, canvas.height);
}
/**
* Recolor an image to a target color
* This assumes the original images as part of this project has a white halo and internal orange.
* @param source The image to recolor
* @param targetColor The target color
* @returns The recolored image data
*/
async function recolor(source, targetColor) {
	return applyRecolor(await getImageData(source), targetColor);
}
function parseColor(color) {
	const canvas = document.createElement("canvas");
	canvas.width = canvas.height = 1;
	const ctx = canvas.getContext("2d");
	ctx.fillStyle = color;
	ctx.fillRect(0, 0, 1, 1);
	const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
	if (a === 0 && color.trim().toLowerCase() !== "transparent") return null;
	return [
		r,
		g,
		b
	];
}
function applyRecolor(originalImageData, targetColor) {
	const rgb = parseColor(targetColor.trim());
	if (!rgb) return null;
	const src = originalImageData.data;
	const out = new Uint8ClampedArray(src.length);
	const [tr, tg, tb] = rgb;
	for (let i = 0; i < src.length; i += 4) {
		const r = src[i];
		const g = src[i + 1];
		const b = src[i + 2];
		const a = src[i + 3];
		if (r > g * .9 && r > b * 1.05) {
			const intensity = (255 - Math.min(r, g, b)) / 255;
			out[i] = Math.round((1 - intensity) * 255 + intensity * tr);
			out[i + 1] = Math.round((1 - intensity) * 255 + intensity * tg);
			out[i + 2] = Math.round((1 - intensity) * 255 + intensity * tb);
		} else {
			out[i] = r;
			out[i + 1] = g;
			out[i + 2] = b;
		}
		out[i + 3] = a;
	}
	return new ImageData(out, originalImageData.width, originalImageData.height);
}
//#endregion
//#region assets/rotate.png
var rotate_default = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA1pJREFUeNrElk9IVFEUxs+89yYoDAumxUgkoYIDZfaXCqfA3GSBi8poEYWzjVrUJiqiJFoJZUEQEYYRBAaFpIsgq5F0UThYZJSLdKEtgpRSQd/M6zvXe8c743vznhs78GOGmXfPd+49551zQ47j0BKtGqyV31Pg95JWs6APO8AdMOC42wToBAlg+fkLaTuMgFMgDpLgLbgKDucEOPmdnLm/4rtRXEEULtL/HgLPwBWvDSpBFhsE0UVPwHl65CWlR7uF2CKDoBndR0ZpPRmRrerXbnAWDHsJNoPLmfF3cN5NVqyJQog+PfyU7K8PhWgQY0Fr+yUKrRJxz4Bd4LOb4Buwfy55hjK/BsgsP07OxDfxPfsgnBgl2EkENRNePX+84pkUcaD6jq2qc2RuqFeiVfpOXQVzIoKQiR1LB+6FNz1O9mBrjjDvVK7pA3uzp1DoiPhYV9S26dE+BkdBreQC6OWgwrtvChFl9uBtlfM9MmX+gsa6bWQjj3LhSvBIVmGPpEVWNQvPcGBZUeSdRaUdCCTIRZNG0aTHskcV93i0RRaIEOUaYOP0aLusFkftV3miWNZUkNZZvIyr8STosCqbyJkapxAKiNMi85jSO02z429jIBKgMz1xWZtQ/+sPsmjS5eEfoD2gmOI8eA7adLH81rYsZtAy238V3CSnhCM/6wL6WA86wYRcm09S+s6Zh+Vg2qVg6gIUSFeACv+iZqV6Dxu4k6RHu8j+eINMvEdWLMG/Xwf9wGtcbAQHuZfOvj7tOlXC8bs8RWKyafQYegfJjCXnOwy6i9Yh7hc4zmLVxgKPMPkplMzyxoW5239ROTkB3nvklLtHH3cTMR0qm1Rn8RXkLjvEA1T1QXFMGFfaTl/JwLjzX5O0gxIRLE8Ue8r9VqCZyqEt7yEd1mbcDGb/EOeTF7OoWdZIFgcSLqrBMzX5TrhJa+OocG/O6zRcKQ9EBJ9axbTIv0KEFu4tRNM/5ycCTiNnYJcdE+vZeJ7KY+aFKbfWlhUVkaNqdYeFjNPBk4KvGSpYmaLs1PfqpUdkrmJCGFcHruAMXxH1Y4Njvioa0TiZpYfyr4y67QQfCgmy8ep7clpHA3adXnALjGjDOqnE/AT1C3KDdLBFTW5pk/LVYKcvdMde9k+AAQDas8HyPpQD4AAAAABJRU5ErkJggg==";
//#endregion
//#region assets/scale.png
var scale_default = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAActJREFUeNpi/P//PwMJwAWIbYH4MBDvIUUjA8giIvGy/6igmQS9RFnEA7fk1+f/v6/NQbZsGbUsAllyDGbJz73x/3+ss/r/61A2mE+KZUwEQnY6EFv+/3ib4de+BAYQDQL/3pxn+HU4h4Hh9xcQNxKIiwlFESGLQBHP8PtEJcP/b89R4xZo6e+zrSjq8AEWAvKg1CXPJOcJNPgOAyO3JMPfOysZmCTtIK4UMUBWR1Gqc0GOeVBCAMURWoIAARNK4wiUV1yBuAlZkJGVB8YsAWJTID5DrXzkAkt5f1+fI8knpOQjbBn2GimWgDAjiUWQIBAbQCP/DykaSbWIbMDEQCdAjkUGtLYoGYiPAfF5KK1Di2oiGZbc/n24BWM+A2IRYlMdMT4ygZVlf4BlG6hw/ff8EIgrSUwZR2zQgSw5DcTxYN9DC9Z/H27D5NdBg5Fii+pBBKggBWE4+POV4c/1ubBqw5KYaoJQPvoAxPw/t7jD6h5UVwJLcVaLdhBzIxAHUOIjcPHPZjuFgQFRkEJcyK/KwKKZRLVqQgZWlYNS24/NbuBqAlSlI1Xlx6hVqKJY9ut4BcntBVJKb7hl5LSAyCm9i5EakL2kaAQIMAAP/aLE8VYEBwAAAABJRU5ErkJggg==";
//#endregion
//#region src/index.ts
const TRANSFORMING_STATES = new Set([
	"moving",
	"resizing",
	"rotating",
	"scaling"
]);
const createTransformState = () => ({
	features: {
		type: "FeatureCollection",
		features: []
	},
	managedImages: new globalThis.Map(),
	selectedFeatureId: null,
	nextFeatureId: 0
});
const defaultOptions = {
	showAddImageButton: true,
	showAddRectangleButton: true,
	showAddPolygonButton: true,
	showDeleteButton: true,
	rectangleSizeFactor: .5,
	areaBackgroundColor: "orange",
	areaOpacity: .1,
	borderWidth: 2
};
const HANDLE_LAYER = "area-transform-layer-polygon-handle";
const AREA_LAYER = "area-transform-layer-polygon-area";
const AREA_BORDER_LAYER = "area-transform-layer-polygon-border";
const HANDLE_CIRCLE_LAYER = "area-transform-layer-polygon-handle-circle";
const ID_PREFIX = "area-transform-feature-";
const RESIZEABLE_POLYGON_FEATURE_ID = `${ID_PREFIX}resizable-`;
const IMAGE_SOURCE_PREFIX = "area-transform-raster-";
const IMAGE_LAYER_PREFIX = "area-transform-raster-layer-";
const GEOJSON_SOURCE = "area-transform-geojson-source";
const IMAGE_BUTTON_ID = "area-transfrom-image";
const RECTANGLE_BUTTON_ID = "area-transfrom-rectangle";
const POLYGON_BUTTON_ID = "area-transfrom-polygon";
const DELETE_BUTTON_ID = "area-transfrom-delete";
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
var MaplibreAreaTransform = class {
	options;
	_map = null;
	_container = null;
	_eventEmitter = new eventemitter3_default();
	_state = "";
	_polygonPoints = [];
	_startPx = null;
	_startCornersPx = void 0;
	_baseHandleImagesPromise = null;
	_coloredImageCache = new globalThis.Map();
	_coloredImagePromises = new globalThis.Map();
	_addedImageIds = /* @__PURE__ */ new Set();
	_addedLayerIds = /* @__PURE__ */ new Set();
	_addedSourceIds = /* @__PURE__ */ new Set();
	_imageQueue = new globalThis.Map();
	transformState = createTransformState();
	_styleRestorePromise = Promise.resolve();
	_resolveStyleLoad = null;
	_rejectStyleLoad = null;
	_loadingStyle = null;
	_styleGeneration = 0;
	/**
	* @param options - control options; any omitted option falls back to its default
	*/
	constructor(options = defaultOptions) {
		this.options = options;
		this.options = {
			...defaultOptions,
			...options
		};
	}
	/** @inheritdoc */
	onAdd(map) {
		this._map = map;
		this._container = document.createElement("div");
		this._container.className = "maplibregl-ctrl maplibregl-ctrl-area-transform";
		this.addMapListeners(map);
		this.addColoredImages(this.options.areaBackgroundColor).catch(() => {});
		this.initGeojsonSourceAndLayers();
		if (this.options.showAddImageButton) this.initFileButton();
		if (this.options.showAddRectangleButton) this.initRectangleButton();
		if (this.options.showAddPolygonButton) this.initPolygonButton();
		if (this.options.showDeleteButton) this.initDeleteButton();
		this._eventEmitter.emit("init");
		return this._container;
	}
	/**
	* Initialize the file button
	*/
	initFileButton() {
		const fileInput = document.createElement("input");
		fileInput.type = "file";
		fileInput.accept = "image/*";
		fileInput.style.display = "none";
		fileInput.onchange = this.onFileSelected;
		const button = this.createControlButton({
			id: IMAGE_BUTTON_ID,
			label: "Add Image",
			iconClass: "icon-add-image",
			onClick: () => fileInput.click()
		});
		this._container.appendChild(fileInput);
		this._container.appendChild(button);
	}
	/**
	* Initialize the polygon button
	*/
	initPolygonButton() {
		this._container.appendChild(this.createControlButton({
			id: POLYGON_BUTTON_ID,
			label: "Add Polygon",
			iconClass: "icon-add-polygon",
			onClick: () => this.startAddPolygonSequence()
		}));
	}
	/**
	* Initialize the rectangle button
	*/
	initRectangleButton() {
		this._container.appendChild(this.createControlButton({
			id: RECTANGLE_BUTTON_ID,
			label: "Add Rectangle",
			iconClass: "icon-add-rectangle",
			onClick: () => {
				this.addRectangle();
			}
		}));
	}
	initDeleteButton() {
		this._container.appendChild(this.createControlButton({
			id: DELETE_BUTTON_ID,
			label: "Delete",
			iconClass: "icon-delete",
			onClick: () => this.onDeleteButtonClick()
		}));
	}
	createControlButton(options) {
		const button = document.createElement("button");
		button.type = "button";
		button.id = options.id;
		button.setAttribute("aria-label", options.label);
		const icon = document.createElement("span");
		icon.className = options.iconClass;
		button.appendChild(icon);
		button.onclick = options.onClick;
		return button;
	}
	initGeojsonSourceAndLayers() {
		if (!this._map?.getSource(GEOJSON_SOURCE)) this._map?.addSource(GEOJSON_SOURCE, {
			type: "geojson",
			promoteId: "id",
			data: {
				type: "FeatureCollection",
				features: this.transformState.features.features
			}
		});
		this._addedSourceIds.add(GEOJSON_SOURCE);
		this.addTrackedLayer({
			id: AREA_LAYER,
			type: "fill",
			source: GEOJSON_SOURCE,
			paint: {
				"fill-color": ["get", "color"],
				"fill-opacity": this.options.areaOpacity
			},
			filter: [
				"==",
				"$type",
				"Polygon"
			]
		});
		this.addTrackedLayer({
			id: AREA_BORDER_LAYER,
			type: "line",
			source: GEOJSON_SOURCE,
			paint: {
				"line-color": ["get", "color"],
				"line-width": this.options.borderWidth
			},
			filter: [
				"==",
				"$type",
				"Polygon"
			]
		});
		this.addTrackedLayer({
			id: HANDLE_CIRCLE_LAYER,
			type: "circle",
			source: GEOJSON_SOURCE,
			paint: {
				"circle-color": ["get", "color"],
				"circle-radius": 3,
				"circle-stroke-color": "white",
				"circle-stroke-width": 2
			},
			filter: [
				"==",
				"$type",
				"Point"
			]
		});
		this.addTrackedLayer({
			id: HANDLE_LAYER,
			type: "symbol",
			source: GEOJSON_SOURCE,
			layout: {
				"icon-image": ["get", "icon"],
				"icon-allow-overlap": true,
				"icon-ignore-placement": true,
				"icon-rotate": ["get", "heading"]
			},
			filter: [
				"all",
				[
					"==",
					"$type",
					"Point"
				],
				[
					"==",
					"isSelected",
					true
				]
			]
		});
	}
	/** @inheritdoc */
	onRemove() {
		this._container?.remove();
		if (this._map) this.removeMapListeners(this._map);
		this._styleGeneration++;
		this._resolveStyleLoad?.();
		this.clearPendingStyleLoad();
		this.removeTrackedResources();
		this._container = null;
		this._state = "";
		this._polygonPoints = [];
		this._startPx = null;
		this._startCornersPx = void 0;
		this._baseHandleImagesPromise = null;
		this._coloredImageCache.clear();
		this._coloredImagePromises.clear();
		this._imageQueue.clear();
		this.transformState = createTransformState();
		this._styleRestorePromise = Promise.resolve();
		this._map = null;
	}
	/**
	* Create the coordinates for an image in mercator projection (centered on the map)
	* @param img The image.
	* @returns The coordinates of the image in GeoJSON format.
	*/
	createCoordinatesForLoadedImage(img) {
		const imageAspect = img.naturalWidth / img.naturalHeight;
		const canvas = this._map.getCanvas();
		const width = canvas.clientWidth;
		const height = canvas.clientHeight;
		const canvasAspect = width / height;
		let baseWidth;
		let baseHeight;
		if (imageAspect >= canvasAspect) {
			baseWidth = width / 2;
			baseHeight = baseWidth / imageAspect;
		} else {
			baseHeight = height / 2;
			baseWidth = baseHeight * imageAspect;
		}
		const startX = (width - baseWidth) / 2;
		const startY = (height - baseHeight) / 2;
		const coordinates = [
			[startX, startY],
			[startX + baseWidth, startY],
			[startX + baseWidth, startY + baseHeight],
			[startX, startY + baseHeight]
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
	addImage(options) {
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
	addImageToQueue(key, options) {
		const promise = ([...this._imageQueue.values()].pop() ?? Promise.resolve()).catch(() => {}).then(() => this.addImageInternal(options)).finally(() => this._imageQueue.delete(key));
		this._imageQueue.set(key, promise);
		return promise;
	}
	/** The key an image request is queued under: same URL at the same place means the same request. */
	getImageRequestKey(imageUrl, coordinates) {
		return JSON.stringify([imageUrl, coordinates]);
	}
	async addImageInternal(options) {
		await this.waitForStyleReady();
		const map = this.getAttachedMap();
		if (this._state === "adding-polygon") return Promise.reject("Cannot add image while adding polygon");
		const imageId = `${ID_PREFIX}${this.transformState.nextFeatureId++}`;
		const managedImage = {
			id: imageId,
			imageUrl: options.imageUrl,
			coordinates: options.coordinates,
			opacity: options.opacity ?? .9
		};
		try {
			this.addImageResources(managedImage);
			this.transformState.managedImages.set(imageId, managedImage);
			await this.addFeatureState(imageId, options.coordinates, map);
			this.setState("");
			this._eventEmitter.emit("create", {
				id: imageId,
				coordinates: options.coordinates
			});
			return imageId;
		} catch (error) {
			this.transformState.managedImages.delete(imageId);
			this.transformState.features.features = this.transformState.features.features.filter((f) => f.properties?.["featureId"] !== imageId);
			if (this._map === map) {
				this.removeImageResources(imageId);
				await this.renderFeatures();
			}
			throw error;
		}
	}
	async setImageOpacity(imageId, opacity) {
		const image = this.transformState.managedImages.get(imageId);
		if (image) image.opacity = opacity;
		const { layerId } = this.getImageResourceIds(imageId);
		if (this._map?.getLayer(layerId)) this._map.setPaintProperty(layerId, "raster-opacity", opacity);
	}
	/**
	* This adds a rectangle to the middle of the screen
	* @returns a pomise that resolves to the newly added rectangle ID
	*/
	addRectangle() {
		if (this._state === "adding-polygon") return Promise.reject("Cannot add rectangle while adding polygon");
		const canvas = this._map.getCanvas();
		const dpr = window.devicePixelRatio || 1;
		const logicalWidth = canvas.width / dpr;
		const logicalHeight = canvas.height / dpr;
		const startX = logicalWidth * (1 - this.options.rectangleSizeFactor) / 2;
		const startY = logicalHeight * (1 - this.options.rectangleSizeFactor) / 2;
		const width = logicalWidth * this.options.rectangleSizeFactor;
		const height = logicalHeight * this.options.rectangleSizeFactor;
		const corners = [
			[startX, startY],
			[startX + width, startY],
			[startX + width, startY + height],
			[startX, startY + height]
		];
		return this.addPolygon(this.unprojectAll(corners), true);
	}
	/**
	* Initiates the state of adding points in order to create a polygon on the screen
	*/
	startAddPolygonSequence() {
		this.removeSelection();
		this.cancelPolygonDraft();
		this.setState("adding-polygon");
	}
	cancelPolygonDraft() {
		this._polygonPoints = [];
		if (this._state === "adding-polygon") this.setState("");
	}
	onDeleteButtonClick() {
		if (this._state === "adding-polygon") return;
		this.removeSelection();
		if (this._state === "deleting") this.setState("");
		else this.setState("deleting");
	}
	/**
	* Adds a polygon to the map
	* @param coordinates - the polygon coordinates
	* @param resizable - only relevant for rectangles
	* @returns a promise with the polygon ID
	*/
	async addPolygon(coordinates, resizable) {
		await this.waitForStyleReady();
		const map = this.getAttachedMap();
		const polygonId = `${resizable ? RESIZEABLE_POLYGON_FEATURE_ID : ID_PREFIX}${this.transformState.nextFeatureId++}`;
		await this.addFeatureState(polygonId, coordinates, map);
		this.setState("");
		this._eventEmitter.emit("create", {
			id: polygonId,
			coordinates
		});
		return polygonId;
	}
	/**
	* Deletes a feature
	* @param featureId - the feature ID to delete
	*/
	async deleteFeature(featureId) {
		await this.removeSelection();
		this.transformState.features.features = this.transformState.features.features.filter((f) => f.properties?.["featureId"] !== featureId);
		await this.renderFeatures();
		this.removeImageResources(featureId);
		this.transformState.managedImages.delete(featureId);
		this._eventEmitter.emit("delete", featureId);
	}
	/**
	* Sets the background and border color used for newly drawn and selected areas.
	* @param color - any CSS color string
	*/
	async setAreaColor(color) {
		this.options.areaBackgroundColor = color;
		await this.addColoredImages(color);
	}
	/**
	* Subscribes to a control event.
	* @param event - the event name, see {@link MaplibreAreaTransformEventMap}
	* @param listener - callback invoked with the event's payload
	*/
	on(event, listener) {
		this._eventEmitter.on(event, listener);
	}
	/**
	* Unsubscribes a previously registered event listener.
	* @param event - the event name, see {@link MaplibreAreaTransformEventMap}
	* @param listener - the same callback reference that was passed to {@link MaplibreAreaTransform.on | on}
	*/
	off(event, listener) {
		this._eventEmitter.off(event, listener);
	}
	onFileSelected = async (e) => {
		const target = e.target;
		const file = target.files?.[0];
		if (!file) return;
		const imageUrl = URL.createObjectURL(file);
		const img = new Image();
		img.onload = async () => {
			const coordinates = this.createCoordinatesForLoadedImage(img);
			await this.addImage({
				imageUrl,
				coordinates
			});
			target.value = "";
		};
		img.src = imageUrl;
	};
	addMapListeners(map) {
		for (const [event, listener] of this.getMapListeners()) map.on(event, listener);
	}
	removeMapListeners(map) {
		for (const [event, listener] of this.getMapListeners()) map.off(event, listener);
	}
	getMapListeners() {
		return [
			["touchstart", this.onMouseDown],
			["touchmove", this.onMouseMove],
			["touchend", this.onMouseUp],
			["touchcancel", this.onMouseUp],
			["mousedown", this.onMouseDown],
			["mousemove", this.onMouseMoveForCursor],
			["mousemove", this.onMouseMove],
			["mouseup", this.onMouseUp],
			["click", this.onClick],
			["styleimagemissing", this.onStyleImageMissing],
			["styledataloading", this.onStyleDataLoading],
			["style.load", this.onStyleLoad]
		];
	}
	onStyleDataLoading = () => {
		this.cancelPolygonDraft();
		this._loadingStyle?.off("error", this.onStyleError);
		this._resolveStyleLoad?.();
		this._styleGeneration++;
		const styleLoad = new Promise((resolve, reject) => {
			this._resolveStyleLoad = resolve;
			this._rejectStyleLoad = reject;
		});
		styleLoad.catch(() => {});
		this._styleRestorePromise = styleLoad;
		this._loadingStyle = this._map?.style ?? null;
		this._loadingStyle?.on("error", this.onStyleError);
	};
	onStyleLoad = () => {
		const generation = this._styleGeneration;
		const map = this._map;
		const resolveStyleLoad = this._resolveStyleLoad;
		this.clearPendingStyleLoad();
		const restoration = this.restoreAfterStyleLoad(map, generation);
		this._styleRestorePromise = restoration;
		resolveStyleLoad?.();
	};
	onStyleError = (event) => {
		const rejectStyleLoad = this._rejectStyleLoad;
		if (!rejectStyleLoad) return;
		const error = event.error instanceof Error ? event.error : new Error(event.error.message);
		this.clearPendingStyleLoad();
		rejectStyleLoad(error);
	};
	clearPendingStyleLoad() {
		this._loadingStyle?.off("error", this.onStyleError);
		this._loadingStyle = null;
		this._resolveStyleLoad = null;
		this._rejectStyleLoad = null;
	}
	async waitForStyleReady() {
		let restoration;
		do {
			restoration = this._styleRestorePromise;
			await restoration;
		} while (restoration !== this._styleRestorePromise);
	}
	async restoreAfterStyleLoad(map, generation) {
		if (!map || this._map !== map) return;
		const isObsolete = () => this._map !== map || generation !== this._styleGeneration;
		await Promise.all(this.getRetainedColors().map((color) => this.addColoredImages(color)));
		if (isObsolete()) return;
		this.initGeojsonSourceAndLayers();
		await this.renderFeatures();
		if (isObsolete()) return;
		for (const image of this.transformState.managedImages.values()) {
			if (isObsolete()) return;
			this.addImageResources(image);
		}
	}
	getRetainedColors() {
		const colors = new Set([this.options.areaBackgroundColor]);
		for (const feature of this.transformState.features.features) {
			const color = feature.properties?.["color"];
			if (typeof color === "string") colors.add(color);
			const icon = feature.properties?.["icon"];
			if (typeof icon === "string" && icon.startsWith("scale-")) colors.add(icon.slice(6));
			if (typeof icon === "string" && icon.startsWith("rotate-")) colors.add(icon.slice(7));
		}
		return [...colors];
	}
	getAttachedMap() {
		if (!this._map) throw new Error("Control is not attached to a map");
		return this._map;
	}
	assertAttachedTo(map) {
		if (this._map !== map) throw new Error("Control is no longer attached to the map");
	}
	async addFeatureState(featureId, coordinates, map) {
		await this.addColoredImages(this.options.areaBackgroundColor);
		this.assertAttachedTo(map);
		this.transformState.features.features.push(...this.buildPolygonGeoJSONFeatures({
			coordinates,
			featureId,
			isSelected: true,
			color: this.options.areaBackgroundColor
		}));
		await this.renderFeatures();
		this.assertAttachedTo(map);
		await this.removeSelection();
		this.assertAttachedTo(map);
		await this.setSelection(featureId);
		this.assertAttachedTo(map);
	}
	addImageResources(image) {
		const map = this._map;
		if (!map) return;
		const { sourceId, layerId } = this.getImageResourceIds(image.id);
		if (!map.getSource(sourceId)) map.addSource(sourceId, {
			type: "image",
			url: image.imageUrl,
			coordinates: image.coordinates
		});
		this._addedSourceIds.add(sourceId);
		if (!map.getLayer(layerId)) map.addLayer({
			id: layerId,
			type: "raster",
			source: sourceId,
			paint: {
				"raster-opacity": image.opacity,
				"raster-fade-duration": 0
			}
		}, map.getLayer(HANDLE_LAYER) ? HANDLE_LAYER : void 0);
		this._addedLayerIds.add(layerId);
	}
	getImageResourceIds(imageId) {
		return {
			sourceId: `${IMAGE_SOURCE_PREFIX}${imageId}`,
			layerId: `${IMAGE_LAYER_PREFIX}${imageId}`
		};
	}
	removeImageResources(imageId) {
		const { sourceId, layerId } = this.getImageResourceIds(imageId);
		this.removeLayer(layerId);
		this.removeSource(sourceId);
	}
	async renderFeatures() {
		const source = this._map?.getSource(GEOJSON_SOURCE);
		if (source) await source.setData(this.transformState.features, true);
	}
	addTrackedLayer(layer, beforeId) {
		if (!this._map?.getLayer(layer.id)) this._map?.addLayer(layer, beforeId);
		this._addedLayerIds.add(layer.id);
	}
	buildPolygonGeoJSONFeatures(buildOptions) {
		const { coordinates, featureId, isSelected, color } = buildOptions;
		const features = [{
			type: "Feature",
			geometry: {
				type: "Polygon",
				coordinates: [[...coordinates, coordinates[0]]]
			},
			properties: {
				id: "rect-" + featureId,
				featureId,
				color
			}
		}];
		for (let i = 0; i < coordinates.length; i++) features.push({
			type: "Feature",
			geometry: {
				type: "Point",
				coordinates: coordinates[i]
			},
			properties: {
				id: "scale-" + i + "-" + featureId,
				featureId,
				type: "scale-handle",
				icon: this.getHandleImageIds(color).scale,
				color,
				isSelected,
				heading: this.getScaleHandleHeadingSnapped(coordinates, i)
			}
		});
		return features;
	}
	getRotateHandlePoint(coordinates, featureId, color) {
		const pxCorners = this.projectAll(coordinates);
		const p0 = pxCorners[0];
		const p1 = pxCorners[1];
		const midPx = pxMidpoint(p0, p1);
		const edgeVec = [p0[0] - p1[0], p0[1] - p1[1]];
		const edgeLen = Math.sqrt(edgeVec[0] ** 2 + edgeVec[1] ** 2);
		const normalPx = [-edgeVec[1] / edgeLen, edgeVec[0] / edgeLen];
		const offsetDist = edgeLen * .075;
		const handlePx = [midPx[0] + normalPx[0] * offsetDist, midPx[1] + normalPx[1] * offsetDist];
		return {
			type: "Feature",
			geometry: {
				type: "Point",
				coordinates: this.unproject(handlePx)
			},
			properties: {
				id: "rotate-" + featureId,
				featureId,
				type: "rotate-handle",
				icon: this.getHandleImageIds(color).rotate,
				color,
				isSelected: true,
				heading: 0
			}
		};
	}
	/** Heading in degrees for scale handle icon rotation */
	getScaleHandleHeadingSnapped(coordinates, currentPointIndex) {
		const px = this.projectAll(coordinates);
		const centerPx = pxCentroid(px);
		const centerToFirstPointAngle = pxAngle(centerPx, px[0]);
		const direction = ((pxAngle(centerPx, px[1]) + centerToFirstPointAngle) / 2 * (180 / Math.PI) + 180) % 180;
		if (direction > 157) return currentPointIndex % 2 === 0 ? 45 : 135;
		if (direction > 112) return currentPointIndex % 2 === 0 ? 0 : 90;
		if (direction > 67) return currentPointIndex % 2 === 0 ? 135 : 45;
		if (direction > 22) return currentPointIndex % 2 === 0 ? 90 : 0;
		return currentPointIndex % 2 === 0 ? 45 : 135;
	}
	onMouseMoveForCursor = (e) => {
		if (this.transformState.selectedFeatureId == null || this._startPx != null) {
			this._map.getCanvas().style.cursor = "";
			return;
		}
		if (!this.transformState.selectedFeatureId) return;
		const features = this._map?.queryRenderedFeatures(e.point).filter((f) => f.properties?.["featureId"] === this.transformState.selectedFeatureId);
		const rotate = features?.find((f) => f.layer.id.startsWith(HANDLE_LAYER) && f.properties["type"] === "rotate-handle");
		const scaleOrResize = features?.find((f) => f.layer.id.startsWith(HANDLE_LAYER) && f.properties["type"] === "scale-handle");
		const drag = features?.find((f) => f.layer.id.startsWith(AREA_LAYER));
		if (rotate) this._map.getCanvas().style.cursor = "crosshair";
		else if (scaleOrResize) switch (scaleOrResize.properties["heading"]) {
			case 0:
				this._map.getCanvas().style.cursor = "ns-resize";
				break;
			case 45:
				this._map.getCanvas().style.cursor = "nesw-resize";
				break;
			case 90:
				this._map.getCanvas().style.cursor = "ew-resize";
				break;
			case 135:
				this._map.getCanvas().style.cursor = "nwse-resize";
				break;
			case 180:
				this._map.getCanvas().style.cursor = "ns-resize";
				break;
		}
		else if (drag) this._map.getCanvas().style.cursor = "move";
		else this._map.getCanvas().style.cursor = "";
	};
	onMouseDown = (e) => {
		if (this.transformState.selectedFeatureId == null) return;
		let features = this._map?.queryRenderedFeatures(e.point);
		features = features?.filter((f) => f.source === GEOJSON_SOURCE && f.properties?.["featureId"] === this.transformState.selectedFeatureId) ?? [];
		if (features.length <= 0) return;
		e.preventDefault();
		const currentPx = [e.point.x, e.point.y];
		this.setStateFromMouseDown(currentPx, features);
	};
	async setStateFromMouseDown(currentPx, queriedFeatures) {
		const featurePoints = (await this._map?.getSource(GEOJSON_SOURCE)?.getData()).features.filter((f) => f.geometry.type === "Point" && f.properties?.["featureId"] === this.transformState.selectedFeatureId);
		this._startCornersPx = featurePoints.filter((f) => f.properties?.["type"] === "scale-handle").map((f) => this.project(f.geometry.coordinates));
		if (!queriedFeatures.some((f) => f.layer.id.startsWith(HANDLE_LAYER))) {
			this.setState("moving");
			this._startPx = currentPx;
			return;
		}
		if (queriedFeatures.some((f) => f.properties["type"] === "rotate-handle")) {
			this.setState("rotating");
			this._startPx = currentPx;
			return;
		}
		let closestFeature = featurePoints[0];
		for (const feature of featurePoints) {
			const fPx = this.project(feature.geometry.coordinates);
			const bestPx = this.project(closestFeature.geometry.coordinates);
			if (pxDistance(fPx, currentPx) < pxDistance(bestPx, currentPx)) closestFeature = feature;
		}
		this._startPx = this.project(closestFeature.geometry.coordinates);
		if (closestFeature.properties?.["type"] === "scale-handle" && this.transformState.selectedFeatureId?.startsWith(RESIZEABLE_POLYGON_FEATURE_ID)) this.setState("resizing");
		else this.setState("scaling");
	}
	onMouseMove = (e) => {
		if (!this.transformState.selectedFeatureId || this._startPx == null) return;
		const currentPx = [e.point.x, e.point.y];
		let newCornersPx;
		switch (this._state) {
			case "rotating":
				newCornersPx = pxRotatePolygon(this._startCornersPx, this._startPx, currentPx);
				break;
			case "scaling":
				newCornersPx = pxScalePolygon(this._startCornersPx, this._startPx, currentPx);
				break;
			case "resizing":
				newCornersPx = pxResizePolygon(this._startCornersPx, this._startPx, currentPx);
				break;
			default:
			case "moving":
				newCornersPx = pxMovePoints(this._startCornersPx, this._startPx, currentPx);
				break;
		}
		const newCoordinates = this.unprojectAll(newCornersPx);
		const { sourceId } = this.getImageResourceIds(this.transformState.selectedFeatureId);
		this._map?.getSource(sourceId)?.setCoordinates(newCoordinates);
		this.updateCoordinates(this.transformState.selectedFeatureId, newCoordinates);
	};
	onMouseUp = () => {
		this._startPx = null;
		this._startCornersPx = void 0;
		if (TRANSFORMING_STATES.has(this._state)) this.setState("");
	};
	onClick = (e) => {
		if (this._state === "adding-polygon") {
			this.onClickWhenInPolygonMode(e);
			return;
		}
		const polygonFeature = (this._map?.queryRenderedFeatures(e.point))?.find((f) => f.layer.id.startsWith(AREA_LAYER));
		if (polygonFeature && this._state === "deleting") {
			this.deleteFeature(polygonFeature.properties["featureId"]);
			return;
		}
		const targetId = polygonFeature ? polygonFeature.properties["featureId"] : null;
		if (targetId === this.transformState.selectedFeatureId) return;
		this.removeSelection();
		if (targetId) this.setSelection(targetId);
	};
	async onClickWhenInPolygonMode(e) {
		const coordinates = [e.lngLat.lng, e.lngLat.lat];
		const source = this._map?.getSource(GEOJSON_SOURCE);
		const pixelThreshold = 10;
		if (this._polygonPoints.length > 0 && Math.abs(this._polygonPoints[0][0] - e.point.x) < pixelThreshold && Math.abs(this._polygonPoints[0][1] - e.point.y) < pixelThreshold) {
			const ids = this._polygonPoints.map((_, i) => "temp-point-" + (i + 1));
			await source.updateData({ remove: [...ids, "temp-area"] }, true);
			const points = sortPoints(this._polygonPoints);
			this.addPolygon(this.unprojectAll(points), false);
			this.cancelPolygonDraft();
			return;
		}
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
			await source.updateData({ add: [point] }, true);
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
			await source.updateData({ add: [point, area] }, true);
			return;
		}
		await source.updateData({
			add: [point],
			update: [{
				id: "temp-area",
				newGeometry: areaGeometry
			}]
		}, true);
	}
	onStyleImageMissing = (event) => {
		const image = this._coloredImageCache.get(event.id);
		if (image && this._map && !this._map.hasImage(event.id)) {
			this._map.addImage(event.id, image);
			this._addedImageIds.add(event.id);
		}
	};
	async addColoredImages(color) {
		const map = this._map;
		if (!map) return;
		const imageIds = this.getHandleImageIds(color);
		if (!this._coloredImageCache.has(imageIds.rotate) || !this._coloredImageCache.has(imageIds.scale)) await (this._coloredImagePromises.get(color) ?? this.prepareColoredImages(color, map));
		if (map !== this._map) return;
		for (const imageId of Object.values(imageIds)) {
			const image = this._coloredImageCache.get(imageId);
			if (image && !map.hasImage(imageId)) {
				map.addImage(imageId, image);
				this._addedImageIds.add(imageId);
			}
		}
	}
	prepareColoredImages(color, map) {
		const imageIds = this.getHandleImageIds(color);
		const promise = this.getBaseHandleImages(map).then((images) => Promise.all([recolor(images.rotate, color), recolor(images.scale, color)])).then(([rotateImage, scaleImage]) => {
			if (map !== this._map) return;
			if (rotateImage) this._coloredImageCache.set(imageIds.rotate, rotateImage);
			if (scaleImage) this._coloredImageCache.set(imageIds.scale, scaleImage);
		});
		this._coloredImagePromises.set(color, promise);
		promise.catch(() => {
			if (this._coloredImagePromises.get(color) === promise) this._coloredImagePromises.delete(color);
		});
		return promise;
	}
	getBaseHandleImages(map) {
		if (this._baseHandleImagesPromise) return this._baseHandleImagesPromise;
		const promise = Promise.all([map.loadImage(rotate_default), map.loadImage(scale_default)]).then(([rotateImage, scaleImage]) => ({
			rotate: rotateImage.data,
			scale: scaleImage.data
		}));
		this._baseHandleImagesPromise = promise;
		promise.catch(() => {
			if (this._baseHandleImagesPromise === promise) this._baseHandleImagesPromise = null;
		});
		return promise;
	}
	getHandleImageIds(color) {
		return {
			rotate: `rotate-${color}`,
			scale: `scale-${color}`
		};
	}
	removeTrackedResources() {
		for (const layerId of [...this._addedLayerIds].reverse()) this.removeLayer(layerId);
		for (const sourceId of [...this._addedSourceIds].reverse()) this.removeSource(sourceId);
		for (const imageId of [...this._addedImageIds].reverse()) this.removeImage(imageId);
	}
	removeLayer(layerId) {
		if (this._map?.getLayer(layerId)) this._map.removeLayer(layerId);
		this._addedLayerIds.delete(layerId);
	}
	removeSource(sourceId) {
		if (this._map?.getSource(sourceId)) this._map.removeSource(sourceId);
		this._addedSourceIds.delete(sourceId);
	}
	removeImage(imageId) {
		if (this._map?.hasImage(imageId)) this._map.removeImage(imageId);
		this._addedImageIds.delete(imageId);
	}
	/** Updates the current selection, emitting `selected` only when it actually changes. */
	setSelectedFeatureId(featureId) {
		if (this.transformState.selectedFeatureId === featureId) return;
		this.transformState.selectedFeatureId = featureId;
		this._eventEmitter.emit("selected", featureId);
	}
	async removeSelection() {
		this.setSelectedFeatureId(null);
		for (const feature of this.transformState.features.features) delete feature?.properties?.["isSelected"];
		this.transformState.features.features = this.transformState.features.features.filter((f) => f.properties?.["type"] !== "rotate-handle");
		await this.renderFeatures();
	}
	async setSelection(featureId) {
		this.setSelectedFeatureId(featureId);
		const data = this.transformState.features;
		const corners = [];
		for (const feature of data.features) if (feature.geometry.type === "Point" && feature.properties?.["featureId"] === featureId && feature.properties?.["type"] === "scale-handle") {
			feature.properties["isSelected"] = true;
			corners.push(feature);
		}
		corners.sort((a, b) => a.properties?.["id"] < b.properties?.["id"] ? -1 : 1);
		const color = data.features.find((f) => f.properties?.["featureId"] === featureId && f.geometry?.type === "Polygon")?.properties?.["color"];
		const coords = corners.map((f) => f.geometry.coordinates);
		data.features.push(this.getRotateHandlePoint(coords, featureId, color));
		await this.renderFeatures();
	}
	async updateCoordinates(featureId, newCoordinates) {
		const data = this.transformState.features;
		const color = data.features.find((f) => f.properties?.["featureId"] === featureId && f.geometry?.type === "Polygon")?.properties?.["color"];
		data.features = data.features.filter((f) => f.properties?.["featureId"] !== featureId);
		data.features.push(...this.buildPolygonGeoJSONFeatures({
			coordinates: newCoordinates,
			featureId,
			isSelected: true,
			color
		}));
		data.features = data.features.filter((f) => f.properties?.["type"] !== "rotate-handle");
		data.features.push(this.getRotateHandlePoint(newCoordinates, featureId, color));
		const image = this.transformState.managedImages.get(featureId);
		if (image) image.coordinates = newCoordinates;
		await this.renderFeatures();
		this._eventEmitter.emit("change", {
			id: featureId,
			coordinates: newCoordinates
		});
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
		return coords.map((c) => this.project(c));
	}
	/** Unproject pixel points back to lat/lng positions */
	unprojectAll(pxPoints) {
		return pxPoints.map((p) => this.unproject(p));
	}
	setState(state) {
		this._state = state;
		document.getElementById(POLYGON_BUTTON_ID)?.classList.toggle("active", this._state === "adding-polygon");
		document.getElementById(DELETE_BUTTON_ID)?.classList.toggle("active", this._state === "deleting");
	}
};
//#endregion
export { MaplibreAreaTransform };

//# sourceMappingURL=maplibregl-area-transform.mjs.map