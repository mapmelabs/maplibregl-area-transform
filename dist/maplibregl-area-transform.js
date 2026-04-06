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

	// index.ts
	function clone(geojson) {
	  if (!geojson) {
	    throw new Error("geojson is required");
	  }
	  switch (geojson.type) {
	    case "Feature":
	      return cloneFeature(geojson);
	    case "FeatureCollection":
	      return cloneFeatureCollection(geojson);
	    case "Point":
	    case "LineString":
	    case "Polygon":
	    case "MultiPoint":
	    case "MultiLineString":
	    case "MultiPolygon":
	    case "GeometryCollection":
	      return cloneGeometry(geojson);
	    default:
	      throw new Error("unknown GeoJSON type");
	  }
	}
	function cloneFeature(geojson) {
	  const cloned = { type: "Feature" };
	  Object.keys(geojson).forEach((key) => {
	    switch (key) {
	      case "type":
	      case "properties":
	      case "geometry":
	        return;
	      default:
	        cloned[key] = geojson[key];
	    }
	  });
	  cloned.properties = cloneProperties(geojson.properties);
	  if (geojson.geometry == null) {
	    cloned.geometry = null;
	  } else {
	    cloned.geometry = cloneGeometry(geojson.geometry);
	  }
	  return cloned;
	}
	function cloneProperties(properties) {
	  const cloned = {};
	  if (!properties) {
	    return cloned;
	  }
	  Object.keys(properties).forEach((key) => {
	    const value = properties[key];
	    if (typeof value === "object") {
	      if (value === null) {
	        cloned[key] = null;
	      } else if (Array.isArray(value)) {
	        cloned[key] = value.map((item) => {
	          return item;
	        });
	      } else {
	        cloned[key] = cloneProperties(value);
	      }
	    } else {
	      cloned[key] = value;
	    }
	  });
	  return cloned;
	}
	function cloneFeatureCollection(geojson) {
	  const cloned = { type: "FeatureCollection" };
	  Object.keys(geojson).forEach((key) => {
	    switch (key) {
	      case "type":
	      case "features":
	        return;
	      default:
	        cloned[key] = geojson[key];
	    }
	  });
	  cloned.features = geojson.features.map((feature) => {
	    return cloneFeature(feature);
	  });
	  return cloned;
	}
	function cloneGeometry(geometry) {
	  const geom = { type: geometry.type };
	  if (geometry.bbox) {
	    geom.bbox = geometry.bbox;
	  }
	  if (geometry.type === "GeometryCollection") {
	    geom.geometries = geometry.geometries.map((g) => {
	      return cloneGeometry(g);
	    });
	    return geom;
	  }
	  geom.coordinates = deepSlice(geometry.coordinates);
	  return geom;
	}
	function deepSlice(coords) {
	  const cloned = coords;
	  if (typeof cloned[0] !== "object") {
	    return cloned.slice();
	  }
	  return cloned.map((coord) => {
	    return deepSlice(coord);
	  });
	}

	// index.ts
	var earthRadius = 63710088e-1;
	var factors = {
	  centimeters: earthRadius * 100,
	  centimetres: earthRadius * 100,
	  degrees: 360 / (2 * Math.PI),
	  feet: earthRadius * 3.28084,
	  inches: earthRadius * 39.37,
	  kilometers: earthRadius / 1e3,
	  kilometres: earthRadius / 1e3,
	  meters: earthRadius,
	  metres: earthRadius,
	  miles: earthRadius / 1609.344,
	  millimeters: earthRadius * 1e3,
	  millimetres: earthRadius * 1e3,
	  nauticalmiles: earthRadius / 1852,
	  radians: 1,
	  yards: earthRadius * 1.0936
	};
	function feature(geom, properties, options = {}) {
	  const feat = { type: "Feature" };
	  if (options.id === 0 || options.id) {
	    feat.id = options.id;
	  }
	  if (options.bbox) {
	    feat.bbox = options.bbox;
	  }
	  feat.properties = properties || {};
	  feat.geometry = geom;
	  return feat;
	}
	function point(coordinates, properties, options = {}) {
	  if (!coordinates) {
	    throw new Error("coordinates is required");
	  }
	  if (!Array.isArray(coordinates)) {
	    throw new Error("coordinates must be an Array");
	  }
	  if (coordinates.length < 2) {
	    throw new Error("coordinates must be at least 2 numbers long");
	  }
	  if (!isNumber(coordinates[0]) || !isNumber(coordinates[1])) {
	    throw new Error("coordinates must contain numbers");
	  }
	  const geom = {
	    type: "Point",
	    coordinates
	  };
	  return feature(geom, properties, options);
	}
	function radiansToLength(radians, units = "kilometers") {
	  const factor = factors[units];
	  if (!factor) {
	    throw new Error(units + " units is invalid");
	  }
	  return radians * factor;
	}
	function lengthToRadians(distance, units = "kilometers") {
	  const factor = factors[units];
	  if (!factor) {
	    throw new Error(units + " units is invalid");
	  }
	  return distance / factor;
	}
	function radiansToDegrees(radians) {
	  const normalisedRadians = radians % (2 * Math.PI);
	  return normalisedRadians * 180 / Math.PI;
	}
	function degreesToRadians(degrees) {
	  const normalisedDegrees = degrees % 360;
	  return normalisedDegrees * Math.PI / 180;
	}
	function convertLength(length, originalUnit = "kilometers", finalUnit = "kilometers") {
	  if (!(length >= 0)) {
	    throw new Error("length must be a positive number");
	  }
	  return radiansToLength(lengthToRadians(length, originalUnit), finalUnit);
	}
	function isNumber(num) {
	  return !isNaN(num) && num !== null && !Array.isArray(num);
	}
	function isObject(input) {
	  return input !== null && typeof input === "object" && !Array.isArray(input);
	}

	// index.ts
	function coordEach(geojson, callback, excludeWrapCoord) {
	  if (geojson === null) return;
	  var j, k, l, geometry, stopG, coords, geometryMaybeCollection, wrapShrink = 0, coordIndex = 0, isGeometryCollection, type = geojson.type, isFeatureCollection = type === "FeatureCollection", isFeature = type === "Feature", stop = isFeatureCollection ? geojson.features.length : 1;
	  for (var featureIndex = 0; featureIndex < stop; featureIndex++) {
	    geometryMaybeCollection = isFeatureCollection ? (
	      // @ts-expect-error: Known type conflict
	      geojson.features[featureIndex].geometry
	    ) : isFeature ? (
	      // @ts-expect-error: Known type conflict
	      geojson.geometry
	    ) : geojson;
	    isGeometryCollection = geometryMaybeCollection ? geometryMaybeCollection.type === "GeometryCollection" : false;
	    stopG = isGeometryCollection ? geometryMaybeCollection.geometries.length : 1;
	    for (var geomIndex = 0; geomIndex < stopG; geomIndex++) {
	      var multiFeatureIndex = 0;
	      var geometryIndex = 0;
	      geometry = isGeometryCollection ? geometryMaybeCollection.geometries[geomIndex] : geometryMaybeCollection;
	      if (geometry === null) continue;
	      coords = geometry.coordinates;
	      var geomType = geometry.type;
	      wrapShrink = excludeWrapCoord && (geomType === "Polygon" || geomType === "MultiPolygon") ? 1 : 0;
	      switch (geomType) {
	        case null:
	          break;
	        case "Point":
	          if (
	            // @ts-expect-error: Known type conflict
	            callback(
	              coords,
	              coordIndex,
	              featureIndex,
	              multiFeatureIndex,
	              geometryIndex
	            ) === false
	          )
	            return false;
	          coordIndex++;
	          multiFeatureIndex++;
	          break;
	        case "LineString":
	        case "MultiPoint":
	          for (j = 0; j < coords.length; j++) {
	            if (
	              // @ts-expect-error: Known type conflict
	              callback(
	                coords[j],
	                coordIndex,
	                featureIndex,
	                multiFeatureIndex,
	                geometryIndex
	              ) === false
	            )
	              return false;
	            coordIndex++;
	            if (geomType === "MultiPoint") multiFeatureIndex++;
	          }
	          if (geomType === "LineString") multiFeatureIndex++;
	          break;
	        case "Polygon":
	        case "MultiLineString":
	          for (j = 0; j < coords.length; j++) {
	            for (k = 0; k < coords[j].length - wrapShrink; k++) {
	              if (
	                // @ts-expect-error: Known type conflict
	                callback(
	                  coords[j][k],
	                  coordIndex,
	                  featureIndex,
	                  multiFeatureIndex,
	                  geometryIndex
	                ) === false
	              )
	                return false;
	              coordIndex++;
	            }
	            if (geomType === "MultiLineString") multiFeatureIndex++;
	            if (geomType === "Polygon") geometryIndex++;
	          }
	          if (geomType === "Polygon") multiFeatureIndex++;
	          break;
	        case "MultiPolygon":
	          for (j = 0; j < coords.length; j++) {
	            geometryIndex = 0;
	            for (k = 0; k < coords[j].length; k++) {
	              for (l = 0; l < coords[j][k].length - wrapShrink; l++) {
	                if (
	                  // @ts-expect-error: Known type conflict
	                  callback(
	                    coords[j][k][l],
	                    coordIndex,
	                    featureIndex,
	                    multiFeatureIndex,
	                    geometryIndex
	                  ) === false
	                )
	                  return false;
	                coordIndex++;
	              }
	              geometryIndex++;
	            }
	            multiFeatureIndex++;
	          }
	          break;
	        case "GeometryCollection":
	          for (j = 0; j < geometry.geometries.length; j++)
	            if (
	              // @ts-expect-error: Known type conflict
	              coordEach(geometry.geometries[j], callback, excludeWrapCoord) === false
	            )
	              return false;
	          break;
	        default:
	          throw new Error("Unknown Geometry Type");
	      }
	    }
	  }
	}
	function featureEach(geojson, callback) {
	  if (geojson.type === "Feature") {
	    callback(geojson, 0);
	  } else if (geojson.type === "FeatureCollection") {
	    for (var i = 0; i < geojson.features.length; i++) {
	      if (callback(geojson.features[i], i) === false) break;
	    }
	  }
	}

	// index.ts
	function bbox(geojson, options = {}) {
	  if (geojson.bbox != null && true !== options.recompute) {
	    return geojson.bbox;
	  }
	  const result = [Infinity, Infinity, -Infinity, -Infinity];
	  coordEach(geojson, (coord) => {
	    if (result[0] > coord[0]) {
	      result[0] = coord[0];
	    }
	    if (result[1] > coord[1]) {
	      result[1] = coord[1];
	    }
	    if (result[2] < coord[0]) {
	      result[2] = coord[0];
	    }
	    if (result[3] < coord[1]) {
	      result[3] = coord[1];
	    }
	  });
	  return result;
	}

	// index.ts
	function center(geojson, options = {}) {
	  const ext = bbox(geojson);
	  const x = (ext[0] + ext[2]) / 2;
	  const y = (ext[1] + ext[3]) / 2;
	  return point([x, y], options.properties, options);
	}

	// index.ts
	function centroid(geojson, options = {}) {
	  let xSum = 0;
	  let ySum = 0;
	  let len = 0;
	  coordEach(
	    geojson,
	    function(coord) {
	      xSum += coord[0];
	      ySum += coord[1];
	      len++;
	    },
	    true
	  );
	  return point([xSum / len, ySum / len], options.properties);
	}

	// index.ts
	function getCoord(coord) {
	  if (!coord) {
	    throw new Error("coord is required");
	  }
	  if (!Array.isArray(coord)) {
	    if (coord.type === "Feature" && coord.geometry !== null && coord.geometry.type === "Point") {
	      return [...coord.geometry.coordinates];
	    }
	    if (coord.type === "Point") {
	      return [...coord.coordinates];
	    }
	  }
	  if (Array.isArray(coord) && coord.length >= 2 && !Array.isArray(coord[0]) && !Array.isArray(coord[1])) {
	    return [...coord];
	  }
	  throw new Error("coord must be GeoJSON Point or an Array of numbers");
	}
	function getCoords(coords) {
	  if (Array.isArray(coords)) {
	    return coords;
	  }
	  if (coords.type === "Feature") {
	    if (coords.geometry !== null) {
	      return coords.geometry.coordinates;
	    }
	  } else {
	    if (coords.coordinates) {
	      return coords.coordinates;
	    }
	  }
	  throw new Error(
	    "coords must be GeoJSON Feature, Geometry Object or an Array"
	  );
	}
	function getType(geojson, _name) {
	  if (geojson.type === "FeatureCollection") {
	    return "FeatureCollection";
	  }
	  if (geojson.type === "GeometryCollection") {
	    return "GeometryCollection";
	  }
	  if (geojson.type === "Feature" && geojson.geometry !== null) {
	    return geojson.geometry.type;
	  }
	  return geojson.type;
	}

	// index.ts
	function rhumbBearing(start, end, options = {}) {
	  let bear360;
	  if (options.final) {
	    bear360 = calculateRhumbBearing(getCoord(end), getCoord(start));
	  } else {
	    bear360 = calculateRhumbBearing(getCoord(start), getCoord(end));
	  }
	  const bear180 = bear360 > 180 ? -(360 - bear360) : bear360;
	  return bear180;
	}
	function calculateRhumbBearing(from, to) {
	  const phi1 = degreesToRadians(from[1]);
	  const phi2 = degreesToRadians(to[1]);
	  let deltaLambda = degreesToRadians(to[0] - from[0]);
	  if (deltaLambda > Math.PI) {
	    deltaLambda -= 2 * Math.PI;
	  }
	  if (deltaLambda < -Math.PI) {
	    deltaLambda += 2 * Math.PI;
	  }
	  const deltaPsi = Math.log(
	    Math.tan(phi2 / 2 + Math.PI / 4) / Math.tan(phi1 / 2 + Math.PI / 4)
	  );
	  const theta = Math.atan2(deltaLambda, deltaPsi);
	  return (radiansToDegrees(theta) + 360) % 360;
	}

	// index.ts
	function rhumbDistance(from, to, options = {}) {
	  const origin = getCoord(from);
	  const destination = getCoord(to);
	  destination[0] += destination[0] - origin[0] > 180 ? -360 : origin[0] - destination[0] > 180 ? 360 : 0;
	  const distanceInMeters = calculateRhumbDistance(origin, destination);
	  const distance = convertLength(distanceInMeters, "meters", options.units);
	  return distance;
	}
	function calculateRhumbDistance(origin, destination, radius) {
	  radius = radius === void 0 ? earthRadius : Number(radius);
	  const R = radius;
	  const phi1 = origin[1] * Math.PI / 180;
	  const phi2 = destination[1] * Math.PI / 180;
	  const DeltaPhi = phi2 - phi1;
	  let DeltaLambda = Math.abs(destination[0] - origin[0]) * Math.PI / 180;
	  if (DeltaLambda > Math.PI) {
	    DeltaLambda -= 2 * Math.PI;
	  }
	  const DeltaPsi = Math.log(
	    Math.tan(phi2 / 2 + Math.PI / 4) / Math.tan(phi1 / 2 + Math.PI / 4)
	  );
	  const q = Math.abs(DeltaPsi) > 1e-11 ? DeltaPhi / DeltaPsi : Math.cos(phi1);
	  const delta = Math.sqrt(
	    DeltaPhi * DeltaPhi + q * q * DeltaLambda * DeltaLambda
	  );
	  const dist = delta * R;
	  return dist;
	}

	// index.ts
	function rhumbDestination(origin, distance, bearing, options = {}) {
	  const wasNegativeDistance = distance < 0;
	  let distanceInMeters = convertLength(
	    Math.abs(distance),
	    options.units,
	    "meters"
	  );
	  if (wasNegativeDistance) distanceInMeters = -Math.abs(distanceInMeters);
	  const coords = getCoord(origin);
	  const destination = calculateRhumbDestination(
	    coords,
	    distanceInMeters,
	    bearing
	  );
	  destination[0] += destination[0] - coords[0] > 180 ? -360 : coords[0] - destination[0] > 180 ? 360 : 0;
	  return point(destination, options.properties);
	}
	function calculateRhumbDestination(origin, distance, bearing, radius) {
	  radius = radius === void 0 ? earthRadius : Number(radius);
	  const delta = distance / radius;
	  const lambda1 = origin[0] * Math.PI / 180;
	  const phi1 = degreesToRadians(origin[1]);
	  const theta = degreesToRadians(bearing);
	  const DeltaPhi = delta * Math.cos(theta);
	  let phi2 = phi1 + DeltaPhi;
	  if (Math.abs(phi2) > Math.PI / 2) {
	    phi2 = phi2 > 0 ? Math.PI - phi2 : -Math.PI - phi2;
	  }
	  const DeltaPsi = Math.log(
	    Math.tan(phi2 / 2 + Math.PI / 4) / Math.tan(phi1 / 2 + Math.PI / 4)
	  );
	  const q = Math.abs(DeltaPsi) > 1e-11 ? DeltaPhi / DeltaPsi : Math.cos(phi1);
	  const DeltaLambda = delta * Math.sin(theta) / q;
	  const lambda2 = lambda1 + DeltaLambda;
	  return [
	    (lambda2 * 180 / Math.PI + 540) % 360 - 180,
	    phi2 * 180 / Math.PI
	  ];
	}

	// index.ts
	function transformScale(geojson, factor, options) {
	  options = options || {};
	  if (!isObject(options)) throw new Error("options is invalid");
	  const origin = options.origin || "centroid";
	  const mutate = options.mutate || false;
	  if (!geojson) throw new Error("geojson required");
	  if (typeof factor !== "number" || factor <= 0)
	    throw new Error("invalid factor");
	  const originIsPoint = Array.isArray(origin) || typeof origin === "object";
	  if (mutate !== true) geojson = clone(geojson);
	  if (geojson.type === "FeatureCollection" && !originIsPoint) {
	    featureEach(geojson, function(feature, index) {
	      geojson.features[index] = scale(
	        feature,
	        factor,
	        origin
	      );
	    });
	    return geojson;
	  }
	  return scale(geojson, factor, origin);
	}
	function scale(feature, factor, origin) {
	  const isPoint = getType(feature) === "Point";
	  const originCoord = defineOrigin(feature, origin);
	  if (factor === 1 || isPoint) return feature;
	  coordEach(feature, function(coord) {
	    const originalDistance = rhumbDistance(originCoord, coord);
	    const bearing = rhumbBearing(originCoord, coord);
	    const newDistance = originalDistance * factor;
	    const newCoord = getCoords(
	      rhumbDestination(originCoord, newDistance, bearing)
	    );
	    coord[0] = newCoord[0];
	    coord[1] = newCoord[1];
	    if (coord.length === 3) coord[2] *= factor;
	  });
	  delete feature.bbox;
	  return feature;
	}
	function defineOrigin(geojson, origin) {
	  if (origin === void 0 || origin === null) origin = "centroid";
	  if (Array.isArray(origin) || typeof origin === "object")
	    return getCoord(origin);
	  const bbox$1 = geojson.bbox ? geojson.bbox : bbox(geojson, { recompute: true });
	  const west = bbox$1[0];
	  const south = bbox$1[1];
	  const east = bbox$1[2];
	  const north = bbox$1[3];
	  switch (origin) {
	    case "sw":
	    // @ts-expect-error undocumented, to be removed for v8 #techdebt
	    case "southwest":
	    // @ts-expect-error undocumented, to be removed for v8 #techdebt
	    case "westsouth":
	    // @ts-expect-error undocumented, to be removed for v8 #techdebt
	    case "bottomleft":
	      return point([west, south]);
	    case "se":
	    // @ts-expect-error undocumented, to be removed for v8 #techdebt
	    case "southeast":
	    // @ts-expect-error undocumented, to be removed for v8 #techdebt
	    case "eastsouth":
	    // @ts-expect-error undocumented, to be removed for v8 #techdebt
	    case "bottomright":
	      return point([east, south]);
	    case "nw":
	    // @ts-expect-error undocumented, to be removed for v8 #techdebt
	    case "northwest":
	    // @ts-expect-error undocumented, to be removed for v8 #techdebt
	    case "westnorth":
	    // @ts-expect-error undocumented, to be removed for v8 #techdebt
	    case "topleft":
	      return point([west, north]);
	    case "ne":
	    // @ts-expect-error undocumented, to be removed for v8 #techdebt
	    case "northeast":
	    // @ts-expect-error undocumented, to be removed for v8 #techdebt
	    case "eastnorth":
	    // @ts-expect-error undocumented, to be removed for v8 #techdebt
	    case "topright":
	      return point([east, north]);
	    case "center":
	      return center(geojson);
	    case void 0:
	    case null:
	    case "centroid":
	      return centroid(geojson);
	    default:
	      throw new Error("invalid origin");
	  }
	}

	// index.ts
	function transformRotate(geojson, angle, options) {
	  options = options || {};
	  if (!isObject(options)) throw new Error("options is invalid");
	  const pivot = options.pivot;
	  const mutate = options.mutate;
	  if (!geojson) throw new Error("geojson is required");
	  if (angle === void 0 || angle === null || isNaN(angle))
	    throw new Error("angle is required");
	  if (angle === 0) return geojson;
	  const pivotCoord = pivot != null ? pivot : centroid(geojson);
	  if (mutate === false || mutate === void 0) geojson = clone(geojson);
	  coordEach(geojson, function(pointCoords) {
	    const initialAngle = rhumbBearing(pivotCoord, pointCoords);
	    const finalAngle = initialAngle + angle;
	    const distance = rhumbDistance(pivotCoord, pointCoords);
	    const newCoords = getCoords(
	      rhumbDestination(pivotCoord, distance, finalAngle)
	    );
	    pointCoords[0] = newCoords[0];
	    pointCoords[1] = newCoords[1];
	  });
	  return geojson;
	}

	// index.ts
	function distance(from, to, options = {}) {
	  var coordinates1 = getCoord(from);
	  var coordinates2 = getCoord(to);
	  var dLat = degreesToRadians(coordinates2[1] - coordinates1[1]);
	  var dLon = degreesToRadians(coordinates2[0] - coordinates1[0]);
	  var lat1 = degreesToRadians(coordinates1[1]);
	  var lat2 = degreesToRadians(coordinates2[1]);
	  var a = Math.pow(Math.sin(dLat / 2), 2) + Math.pow(Math.sin(dLon / 2), 2) * Math.cos(lat1) * Math.cos(lat2);
	  return radiansToLength(
	    2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)),
	    options.units
	  );
	}

	// index.ts
	function bearing(start, end, options = {}) {
	  if (options.final === true) {
	    return calculateFinalBearing(start, end);
	  }
	  const coordinates1 = getCoord(start);
	  const coordinates2 = getCoord(end);
	  const lon1 = degreesToRadians(coordinates1[0]);
	  const lon2 = degreesToRadians(coordinates2[0]);
	  const lat1 = degreesToRadians(coordinates1[1]);
	  const lat2 = degreesToRadians(coordinates2[1]);
	  const a = Math.sin(lon2 - lon1) * Math.cos(lat2);
	  const b = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1);
	  return radiansToDegrees(Math.atan2(a, b));
	}
	function calculateFinalBearing(start, end) {
	  let bear = bearing(end, start);
	  bear = (bear + 180) % 360;
	  return bear;
	}

	// index.ts
	function destination(origin, distance, bearing, options = {}) {
	  const coordinates1 = getCoord(origin);
	  const longitude1 = degreesToRadians(coordinates1[0]);
	  const latitude1 = degreesToRadians(coordinates1[1]);
	  const bearingRad = degreesToRadians(bearing);
	  const radians = lengthToRadians(distance, options.units);
	  const latitude2 = Math.asin(
	    Math.sin(latitude1) * Math.cos(radians) + Math.cos(latitude1) * Math.sin(radians) * Math.cos(bearingRad)
	  );
	  const longitude2 = longitude1 + Math.atan2(
	    Math.sin(bearingRad) * Math.sin(radians) * Math.cos(latitude1),
	    Math.cos(radians) - Math.sin(latitude1) * Math.sin(latitude2)
	  );
	  const lng = radiansToDegrees(longitude2);
	  const lat = radiansToDegrees(latitude2);
	  if (coordinates1[2] !== void 0) {
	    return point([lng, lat, coordinates1[2]], options.properties);
	  }
	  return point([lng, lat], options.properties);
	}

	var img$1 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA1pJREFUeNrElk9IVFEUxs+89yYoDAumxUgkoYIDZfaXCqfA3GSBi8poEYWzjVrUJiqiJFoJZUEQEYYRBAaFpIsgq5F0UThYZJSLdKEtgpRSQd/M6zvXe8c743vznhs78GOGmXfPd+49551zQ47j0BKtGqyV31Pg95JWs6APO8AdMOC42wToBAlg+fkLaTuMgFMgDpLgLbgKDucEOPmdnLm/4rtRXEEULtL/HgLPwBWvDSpBFhsE0UVPwHl65CWlR7uF2CKDoBndR0ZpPRmRrerXbnAWDHsJNoPLmfF3cN5NVqyJQog+PfyU7K8PhWgQY0Fr+yUKrRJxz4Bd4LOb4Buwfy55hjK/BsgsP07OxDfxPfsgnBgl2EkENRNePX+84pkUcaD6jq2qc2RuqFeiVfpOXQVzIoKQiR1LB+6FNz1O9mBrjjDvVK7pA3uzp1DoiPhYV9S26dE+BkdBreQC6OWgwrtvChFl9uBtlfM9MmX+gsa6bWQjj3LhSvBIVmGPpEVWNQvPcGBZUeSdRaUdCCTIRZNG0aTHskcV93i0RRaIEOUaYOP0aLusFkftV3miWNZUkNZZvIyr8STosCqbyJkapxAKiNMi85jSO02z429jIBKgMz1xWZtQ/+sPsmjS5eEfoD2gmOI8eA7adLH81rYsZtAy238V3CSnhCM/6wL6WA86wYRcm09S+s6Zh+Vg2qVg6gIUSFeACv+iZqV6Dxu4k6RHu8j+eINMvEdWLMG/Xwf9wGtcbAQHuZfOvj7tOlXC8bs8RWKyafQYegfJjCXnOwy6i9Yh7hc4zmLVxgKPMPkplMzyxoW5239ROTkB3nvklLtHH3cTMR0qm1Rn8RXkLjvEA1T1QXFMGFfaTl/JwLjzX5O0gxIRLE8Ue8r9VqCZyqEt7yEd1mbcDGb/EOeTF7OoWdZIFgcSLqrBMzX5TrhJa+OocG/O6zRcKQ9EBJ9axbTIv0KEFu4tRNM/5ycCTiNnYJcdE+vZeJ7KY+aFKbfWlhUVkaNqdYeFjNPBk4KvGSpYmaLs1PfqpUdkrmJCGFcHruAMXxH1Y4Njvioa0TiZpYfyr4y67QQfCgmy8ep7clpHA3adXnALjGjDOqnE/AT1C3KDdLBFTW5pk/LVYKcvdMde9k+AAQDas8HyPpQD4AAAAABJRU5ErkJggg==";

	var img = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAActJREFUeNpi/P//PwMJwAWIbYH4MBDvIUUjA8giIvGy/6igmQS9RFnEA7fk1+f/v6/NQbZsGbUsAllyDGbJz73x/3+ss/r/61A2mE+KZUwEQnY6EFv+/3ib4de+BAYQDQL/3pxn+HU4h4Hh9xcQNxKIiwlFESGLQBHP8PtEJcP/b89R4xZo6e+zrSjq8AEWAvKg1CXPJOcJNPgOAyO3JMPfOysZmCTtIK4UMUBWR1Gqc0GOeVBCAMURWoIAARNK4wiUV1yBuAlZkJGVB8YsAWJTID5DrXzkAkt5f1+fI8knpOQjbBn2GimWgDAjiUWQIBAbQCP/DykaSbWIbMDEQCdAjkUGtLYoGYiPAfF5KK1Di2oiGZbc/n24BWM+A2IRYlMdMT4ygZVlf4BlG6hw/ff8EIgrSUwZR2zQgSw5DcTxYN9DC9Z/H27D5NdBg5Fii+pBBKggBWE4+POV4c/1ubBqw5KYaoJQPvoAxPw/t7jD6h5UVwJLcVaLdhBzIxAHUOIjcPHPZjuFgQFRkEJcyK/KwKKZRLVqQgZWlYNS24/NbuBqAlSlI1Xlx6hVqKJY9ut4BcntBVJKb7hl5LSAyCm9i5EakL2kaAQIMAAP/aLE8VYEBwAAAABJRU5ErkJggg==";

	const defaultOptions = {
	    showAddImageButton: true,
	};
	const HANDLE_PREFIX = 'layer-polygon-handle-';
	const AREA_PREFIX = 'layer-polygon-area-';
	const ID_PREFIX = 'georeferenced-image-';
	const IMAGE_SOURCE_PREFIX = 'raster-';
	const GEOJSON_SOURCE_PREFIX = 'geojson-';
	class MaplibreAreaTransform {
	    options;
	    _map = null;
	    _container = null;
	    _eventEmitter = new EventEmitter();
	    _maxImageId = 0;
	    _selectedImageId = null;
	    _isScaling = false;
	    _isRotating = false;
	    _startPoint = null;
	    _startPointCoordinates = undefined;
	    constructor(options = defaultOptions) {
	        this.options = options;
	        this.options = { ...defaultOptions, ...options };
	    }
	    /** @inheritdoc */
	    onAdd(map) {
	        this._map = map;
	        this._container = document.createElement('div');
	        this._container.className = 'maplibregl-ctrl maplibregl-ctrl-georeferenced-image';
	        this.initMapListeners();
	        this.initImages();
	        if (this.options.showAddImageButton) {
	            // add file input picker with a button
	            this.initFileButton();
	        }
	        this._eventEmitter.emit('init');
	        return this._container;
	    }
	    initFileButton() {
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
	    /** @inheritdoc */
	    onRemove() {
	        this._container?.remove();
	        this._map?.off('mousemove', this.onMouseMoveForCursor);
	        this._map?.off('mousedown', this.onMouseDown);
	        this._map?.off('mousemove', this.onMouseMove);
	        this._map?.off('mouseup', this.onMouseUp);
	        this._map = null;
	    }
	    addImage(imageUrl, coordinates) {
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
	                'icon-rotate': ['get', 'heading']
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
	            // Define a base size (e.g., 1/4 of canvas width)
	            const baseWidth = canvas.width / 4;
	            const calculatedHeight = baseWidth / aspect;
	            // Calculate screen coordinates (centering the image)
	            const startX = canvas.width / 4;
	            const startY = canvas.height / 4;
	            const topLeft = this._map.unproject([startX, startY]);
	            const topRight = this._map.unproject([startX + baseWidth, startY]);
	            const bottomRight = this._map.unproject([startX + baseWidth, startY + calculatedHeight]);
	            const bottomLeft = this._map.unproject([startX, startY + calculatedHeight]);
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
	    getOpositePoint(coordinates, point) {
	        let pointIndex = 0;
	        for (let coordinate of coordinates) {
	            if (Math.abs(coordinate[0] - point[0]) < 1e-4 && Math.abs(coordinate[1] - point[1]) < 1e-4) {
	                break;
	            }
	            pointIndex++;
	        }
	        pointIndex = (pointIndex + 2) % 4;
	        return coordinates[pointIndex];
	    }
	    getCenter(coordinates) {
	        const x = (coordinates[0][0] + coordinates[1][0] + coordinates[2][0] + coordinates[3][0]) / 4;
	        const y = (coordinates[0][1] + coordinates[1][1] + coordinates[2][1] + coordinates[3][1]) / 4;
	        return [x, y];
	    }
	    initMapListeners() {
	        this._map?.on('mousemove', this.onMouseMoveForCursor);
	        this._map?.on('mousedown', this.onMouseDown);
	        this._map?.on('mousemove', this.onMouseMove);
	        this._map?.on('mouseup', this.onMouseUp);
	    }
	    buildGeoJSON(coordinates, imageId) {
	        return {
	            type: 'FeatureCollection',
	            features: [
	                {
	                    type: 'Feature',
	                    geometry: {
	                        type: 'Polygon',
	                        coordinates: [[...coordinates, coordinates[0]]] // close the polygon
	                    },
	                    properties: {
	                        id: imageId
	                    }
	                },
	                ...coordinates.map((coordinate) => {
	                    return {
	                        type: 'Feature',
	                        geometry: {
	                            type: 'Point',
	                            coordinates: coordinate
	                        },
	                        properties: {
	                            id: imageId,
	                            type: 'scale-handle',
	                            icon: 'scale',
	                            heading: this.getScaleHandleHeading(coordinates, coordinate)
	                        }
	                    };
	                }),
	                this.getRotateHandlePoint(coordinates, imageId)
	            ]
	        };
	    }
	    getRotateHandlePoint(coordinates, imageId) {
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
	        };
	        return offsetPoint;
	    }
	    getScaleHandleHeading(coordinates, currentPoint) {
	        const center = this.getCenter(coordinates);
	        return bearing(center, currentPoint);
	    }
	    onMouseMoveForCursor = (e) => {
	        if (this._startPoint != null)
	            return;
	        const features = this._map?.queryRenderedFeatures(e.point);
	        const rotate = features?.find((feature) => feature.layer.id.startsWith(HANDLE_PREFIX) && feature.properties["type"] === 'rotate-handle');
	        const scale = features?.find((feature) => feature.layer.id.startsWith(HANDLE_PREFIX));
	        const drag = features?.find((feature) => feature.layer.id.startsWith(AREA_PREFIX));
	        if (rotate)
	            this._map.getCanvas().style.cursor = 'crosshair';
	        else if (scale) {
	            const headingNormalized = (scale.properties["heading"] + 180) % 180;
	            this._map.getCanvas().style.cursor = headingNormalized <= 90 ? "nesw-resize" : "nwse-resize";
	        }
	        else if (drag)
	            this._map.getCanvas().style.cursor = 'move';
	        else
	            this._map.getCanvas().style.cursor = '';
	    };
	    onMouseDown = (e) => {
	        let features = this._map?.queryRenderedFeatures(e.point);
	        features = features?.filter((feature) => feature.source.startsWith(`${GEOJSON_SOURCE_PREFIX}${ID_PREFIX}`)) ?? [];
	        if (features.length <= 0) {
	            return;
	        }
	        e.preventDefault();
	        this._selectedImageId = features[0].properties["id"];
	        this._startPointCoordinates = this._map?.getSource(`${IMAGE_SOURCE_PREFIX}${this._selectedImageId}`)?.coordinates;
	        const currentPoint = [e.lngLat.lng, e.lngLat.lat];
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
	        this._startPoint = this._startPointCoordinates[0];
	        for (let coordinate of this._startPointCoordinates) {
	            if (distance(coordinate, currentPoint) < distance(this._startPoint, currentPoint)) {
	                this._startPoint = coordinate;
	            }
	        }
	    };
	    onMouseMove = (e) => {
	        if (!this._selectedImageId) {
	            return;
	        }
	        const diff = [e.lngLat.lng - this._startPoint[0], e.lngLat.lat - this._startPoint[1]];
	        let newCoordinates;
	        if (this._isRotating) {
	            const center = this.getCenter(this._startPointCoordinates);
	            const angle1 = bearing(this._startPoint, center);
	            const angle2 = bearing([e.lngLat.lng, e.lngLat.lat], center);
	            let transformedFature = transformRotate({
	                type: "Feature",
	                geometry: {
	                    type: "Polygon",
	                    coordinates: [this._startPointCoordinates]
	                },
	                properties: {}
	            }, angle2 - angle1, {
	                mutate: false,
	                pivot: center
	            });
	            newCoordinates = transformedFature.geometry.coordinates[0];
	        }
	        else if (this._isScaling) {
	            const oppositePoint = this.getOpositePoint(this._startPointCoordinates, this._startPoint);
	            const distanceStartOpposite = distance(this._startPoint, oppositePoint);
	            const distanceCurrentOpposite = distance([e.lngLat.lng, e.lngLat.lat], oppositePoint);
	            const scale = distanceCurrentOpposite / distanceStartOpposite;
	            let transformedFature = transformScale({
	                type: "Feature",
	                geometry: {
	                    type: "Polygon",
	                    coordinates: [this._startPointCoordinates]
	                },
	                properties: {}
	            }, scale, {
	                mutate: false,
	                origin: oppositePoint
	            });
	            newCoordinates = transformedFature.geometry.coordinates[0];
	        }
	        else {
	            newCoordinates = this._startPointCoordinates.map((coordinate) => [
	                coordinate[0] + diff[0],
	                coordinate[1] + diff[1]
	            ]);
	        }
	        this._map?.getSource(`${IMAGE_SOURCE_PREFIX}${this._selectedImageId}`)?.setCoordinates(newCoordinates);
	        this._map?.getSource(`${GEOJSON_SOURCE_PREFIX}${this._selectedImageId}`)?.setData(this.buildGeoJSON(newCoordinates, this._selectedImageId));
	    };
	    onMouseUp = () => {
	        this._selectedImageId = null;
	        this._startPoint = null;
	        this._startPointCoordinates = undefined;
	        this._isScaling = false;
	        this._isRotating = false;
	    };
	    async initImages() {
	        const rotateImage = await this._map?.loadImage(img$1);
	        this._map?.addImage('rotate', rotateImage?.data);
	        const scaleImage = await this._map?.loadImage(img);
	        this._map?.addImage('scale', scaleImage?.data);
	    }
	}

	exports.MaplibreAreaTransform = MaplibreAreaTransform;

}));
//# sourceMappingURL=maplibregl-area-transform.js.map
