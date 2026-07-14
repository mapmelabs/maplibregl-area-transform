import { mat2, mat4, vec3, vec4 } from "gl-matrix";

//#region node_modules/@maplibre/maplibre-gl-style-spec/dist/index.d.ts
type ColorSpecification = string;
type ProjectionDefinitionT = [string, string, number];
type ProjectionDefinitionSpecification = string | ProjectionDefinitionT | PropertyValueSpecification<ProjectionDefinitionT>;
type PaddingSpecification = number | number[];
type NumberArraySpecification = number | number[];
type ColorArraySpecification = string | string[];
type VariableAnchorOffsetCollectionSpecification = Array<string | [number, number]>;
type SpriteSpecification = string | {
  id: string;
  url: string;
}[];
type FormattedSpecification = string;
type ResolvedImageSpecification = string;
type PromoteIdSpecification = {
  [_: string]: string;
} | string;
type ExpressionInputType = string | number | boolean;
type VariableExpressionSpecification = ["var", string];
type CollatorExpressionSpecification = ["collator", {
  "case-sensitive"?: boolean | ExpressionSpecification;
  "diacritic-sensitive"?: boolean | ExpressionSpecification;
  locale?: string | ExpressionSpecification;
}];
type InterpolationSpecification = ["linear"] | ["exponential", number] | ["cubic-bezier", number, number, number, number];
type ExpressionSpecification = ["array", ExpressionSpecification] | ["array", "string" | "number" | "boolean", ExpressionSpecification] | ["array", "string" | "number" | "boolean", number, ExpressionSpecification] | ["boolean", unknown | ExpressionSpecification, ...(unknown | ExpressionSpecification)[]] | CollatorExpressionSpecification | ["format", ...(string | ["image", ExpressionSpecification] | ExpressionSpecification | {
  "font-scale"?: number | ExpressionSpecification;
  "text-font"?: ExpressionSpecification;
  "text-color"?: ColorSpecification | ExpressionSpecification;
  "vertical-align"?: "bottom" | "center" | "top";
})[]] | ["image", string | ExpressionSpecification] | ["literal", unknown] | ["number", unknown | ExpressionSpecification, ...(unknown | ExpressionSpecification)[]] | ["number-format", number | ExpressionSpecification, {
  "locale"?: string | ExpressionSpecification;
  "currency"?: string | ExpressionSpecification;
  "min-fraction-digits"?: number | ExpressionSpecification;
  "max-fraction-digits"?: number | ExpressionSpecification;
}] | ["number-format", number | ExpressionSpecification, {
  "locale"?: string | ExpressionSpecification;
  "unit"?: string | ExpressionSpecification;
  "min-fraction-digits"?: number | ExpressionSpecification;
  "max-fraction-digits"?: number | ExpressionSpecification;
}] | ["object", unknown | ExpressionSpecification, ...(unknown | ExpressionSpecification)[]] | ["string", unknown | ExpressionSpecification, ...(unknown | ExpressionSpecification)[]] | ["to-boolean", unknown | ExpressionSpecification] | ["to-color", unknown | ExpressionSpecification, ...(unknown | ExpressionSpecification)[]] | ["to-number", unknown | ExpressionSpecification, ...(unknown | ExpressionSpecification)[]] | ["to-string", unknown | ExpressionSpecification] | ["typeof", unknown | ExpressionSpecification] | ["accumulated"] | ["feature-state", string | ExpressionSpecification] | ["geometry-type"] | ["id"] | ["line-progress"] | ["properties"] | ["at", number | ExpressionSpecification, ExpressionSpecification] | ["get", string | ExpressionSpecification, ExpressionSpecification?] | ["global-state", string] | ["has", string | ExpressionSpecification, ExpressionSpecification?] | ["in", null | ExpressionInputType | ExpressionSpecification, string | ExpressionSpecification] | ["index-of", null | ExpressionInputType | ExpressionSpecification, string | ExpressionSpecification, (number | ExpressionSpecification)?] | ["length", string | ExpressionSpecification] | ["slice", string | ExpressionSpecification, number | ExpressionSpecification, (number | ExpressionSpecification)?] | ["!", boolean | ExpressionSpecification] | ["!=", null | ExpressionInputType | ExpressionSpecification, null | ExpressionInputType | ExpressionSpecification, (CollatorExpressionSpecification | VariableExpressionSpecification)?] | ["<", string | number | ExpressionSpecification, string | number | ExpressionSpecification, (CollatorExpressionSpecification | VariableExpressionSpecification)?] | ["<=", string | number | ExpressionSpecification, string | number | ExpressionSpecification, (CollatorExpressionSpecification | VariableExpressionSpecification)?] | ["==", null | ExpressionInputType | ExpressionSpecification, null | ExpressionInputType | ExpressionSpecification, (CollatorExpressionSpecification | VariableExpressionSpecification)?] | [">", string | number | ExpressionSpecification, string | number | ExpressionSpecification, (CollatorExpressionSpecification | VariableExpressionSpecification)?] | [">=", string | number | ExpressionSpecification, string | number | ExpressionSpecification, (CollatorExpressionSpecification | VariableExpressionSpecification)?] | ["all", ...(boolean | ExpressionSpecification)[]] | ["any", ...(boolean | ExpressionSpecification)[]] | ["case", boolean | ExpressionSpecification, null | ExpressionInputType | ExpressionSpecification, ...(boolean | null | ExpressionInputType | ExpressionSpecification)[], null | ExpressionInputType | ExpressionSpecification] | ["coalesce", ...(ExpressionInputType | ExpressionSpecification)[]] | ["match", string | number | ExpressionSpecification, string | number | string[] | number[], null | ExpressionInputType | ExpressionSpecification, ...(string | number | string[] | number[] | null | ExpressionInputType | ExpressionSpecification)[], // repeated as above
null | ExpressionInputType | ExpressionSpecification] | ["within", GeoJSON.GeoJSON] | ["interpolate", InterpolationSpecification, number | ExpressionSpecification, ...(number | ColorSpecification | ExpressionSpecification | ProjectionDefinitionSpecification)[]] | ["interpolate-hcl", InterpolationSpecification, number | ExpressionSpecification, ...(number | ColorSpecification | ExpressionSpecification)[]] | ["interpolate-lab", InterpolationSpecification, number | ExpressionSpecification, ...(number | ColorSpecification | ExpressionSpecification)[]] | ["step", number | ExpressionSpecification, ExpressionInputType | ExpressionSpecification, ...(number | ExpressionInputType | ExpressionSpecification)[]] | ["let", string, ExpressionInputType | ExpressionSpecification, ...(string | ExpressionInputType | ExpressionSpecification)[]] | VariableExpressionSpecification | ["concat", ...(ExpressionInputType | ExpressionSpecification)[]] | ["downcase", string | ExpressionSpecification] | ["is-supported-script", string | ExpressionSpecification] | ["join", string[] | ExpressionSpecification, string | ExpressionSpecification] | ["resolved-locale", CollatorExpressionSpecification] | ["split", string | ExpressionSpecification, string | ExpressionSpecification] | ["upcase", string | ExpressionSpecification] | ["rgb", number | ExpressionSpecification, number | ExpressionSpecification, number | ExpressionSpecification] | ["rgba", number | ExpressionSpecification, number | ExpressionSpecification, number | ExpressionSpecification, number | ExpressionSpecification] | ["to-rgba", ColorSpecification | ExpressionSpecification] | ["-", number | ExpressionSpecification, (number | ExpressionSpecification)?] | ["*", number | ExpressionSpecification, number | ExpressionSpecification, ...(number | ExpressionSpecification)[]] | ["/", number | ExpressionSpecification, number | ExpressionSpecification] | ["%", number | ExpressionSpecification, number | ExpressionSpecification] | ["^", number | ExpressionSpecification, number | ExpressionSpecification] | ["+", ...(number | ExpressionSpecification)[]] | ["abs", number | ExpressionSpecification] | ["acos", number | ExpressionSpecification] | ["asin", number | ExpressionSpecification] | ["atan", number | ExpressionSpecification] | ["ceil", number | ExpressionSpecification] | ["cos", number | ExpressionSpecification] | ["distance", GeoJSON.GeoJSON] | ["e"] | ["floor", number | ExpressionSpecification] | ["ln", number | ExpressionSpecification] | ["ln2"] | ["log10", number | ExpressionSpecification] | ["log2", number | ExpressionSpecification] | ["max", number | ExpressionSpecification, ...(number | ExpressionSpecification)[]] | ["min", number | ExpressionSpecification, ...(number | ExpressionSpecification)[]] | ["pi"] | ["round", number | ExpressionSpecification] | ["sin", number | ExpressionSpecification] | ["sqrt", number | ExpressionSpecification] | ["tan", number | ExpressionSpecification] | ["zoom"] | ["heatmap-density"] | ["elevation"] | ["global-state", string];
type ExpressionFilterSpecification = boolean | ExpressionSpecification;
type LegacyFilterSpecification = ["has", string] | ["!has", string] | ["==", string, string | number | boolean] | ["!=", string, string | number | boolean] | [">", string, string | number | boolean] | [">=", string, string | number | boolean] | ["<", string, string | number | boolean] | ["<=", string, string | number | boolean] | ["in", string, ...(string | number | boolean)[]] | ["!in", string, ...(string | number | boolean)[]] | ["all", ...LegacyFilterSpecification[]] | ["any", ...LegacyFilterSpecification[]] | ["none", ...LegacyFilterSpecification[]];
type FilterSpecification = ExpressionFilterSpecification | LegacyFilterSpecification;
type VisibilitySpecification = "visible" | "none" | ExpressionSpecification;
type TransitionSpecification = {
  duration?: number;
  delay?: number;
};
type CameraFunctionSpecification<T> = {
  type: "exponential";
  stops: Array<[number, T]>;
} | {
  type: "interval";
  stops: Array<[number, T]>;
};
type SourceFunctionSpecification<T> = {
  type: "exponential";
  stops: Array<[number, T]>;
  property: string;
  default?: T;
} | {
  type: "interval";
  stops: Array<[number, T]>;
  property: string;
  default?: T;
} | {
  type: "categorical";
  stops: Array<[string | number | boolean, T]>;
  property: string;
  default?: T;
} | {
  type: "identity";
  property: string;
  default?: T;
};
type CompositeFunctionSpecification<T> = {
  type: "exponential";
  stops: Array<[{
    zoom: number;
    value: number;
  }, T]>;
  property: string;
  default?: T;
} | {
  type: "interval";
  stops: Array<[{
    zoom: number;
    value: number;
  }, T]>;
  property: string;
  default?: T;
} | {
  type: "categorical";
  stops: Array<[{
    zoom: number;
    value: string | number | boolean;
  }, T]>;
  property: string;
  default?: T;
};
type PropertyValueSpecification<T> = T | CameraFunctionSpecification<T> | ExpressionSpecification;
type DataDrivenPropertyValueSpecification<T> = T | CameraFunctionSpecification<T> | SourceFunctionSpecification<T> | CompositeFunctionSpecification<T> | ExpressionSpecification;
type SchemaSpecification = {
  default?: unknown;
};
type StateSpecification = Record<string, SchemaSpecification>;
type MLFontFace = string | {
  url: string;
  "unicode-range"?: string[];
};
type FontFacesSpecification = Record<string, MLFontFace>;
type StyleSpecification = {
  /**
   * Style specification version number. Must be 8.
   *
   * @example
   * ```json
   * 8
   * ```
   */
  "version": 8;
  /**
   * A human-readable name for the style.
   *
   * @example
   * ```json
   * "Bright"
   * ```
   */
  "name"?: string;
  /**
   * Arbitrary properties useful to track with the stylesheet, but do not influence rendering. Properties should be prefixed to avoid collisions, like 'maplibre:'.
   *
   * @example
   * ```json
   * {
   *     "styleeditor:slimmode": true,
   *     "styleeditor:comment": "Style generated 1677776383",
   *     "styleeditor:version": "3.14.159265",
   *     "example:object": {
   *         "String": "one",
   *         "Number": 2,
   *         "Boolean": false
   *     }
   * }
   * ```
   */
  "metadata"?: unknown;
  /**
   * Default map center in longitude and latitude.  The style center will be used only if the map has not been positioned by other means (e.g. map options or user interaction).
   *
   * @example
   * ```json
   * [-73.9749, 40.7736]
   * ```
   */
  "center"?: [number, number];
  /**
   * Default map center altitude in meters above sea level. The style center altitude defines the altitude where the camera is looking at and will be used only if the map has not been positioned by other means (e.g. map options or user interaction).
   *
   * @example
   * ```json
   * 123.4
   * ```
   */
  "centerAltitude"?: number;
  /**
   * Default zoom level.  The style zoom will be used only if the map has not been positioned by other means (e.g. map options or user interaction).
   *
   * @example
   * ```json
   * 12.5
   * ```
   */
  "zoom"?: number;
  /**
   * Default bearing, in degrees. The bearing is the compass direction that is "up"; for example, a bearing of 90° orients the map so that east is up. This value will be used only if the map has not been positioned by other means (e.g. map options or user interaction).
   *
   * @example
   * ```json
   * 29
   * ```
   */
  "bearing"?: number;
  /**
   * Default pitch, in degrees. Zero is perpendicular to the surface, for a look straight down at the map, while a greater value like 60 looks ahead towards the horizon. The style pitch will be used only if the map has not been positioned by other means (e.g. map options or user interaction).
   *
   * @example
   * ```json
   * 50
   * ```
   */
  "pitch"?: number;
  /**
   * Default roll, in degrees. The roll angle is measured counterclockwise about the camera boresight. The style roll will be used only if the map has not been positioned by other means (e.g. map options or user interaction).
   *
   * @example
   * ```json
   * 45
   * ```
   */
  "roll"?: number;
  /**
   * An object used to define default values when using the [`global-state`](https://maplibre.org/maplibre-style-spec/expressions/#global-state) expression.
   *
   * @default
   * ```json
   * {}
   * ```
   *
   * @example
   * ```json
   * {
   *     "chargerType": {"default": ["CCS", "CHAdeMO", "Type2"]},
   *     "minPreferredChargingSpeed": {"default": 50}
   * }
   * ```
   */
  "state"?: StateSpecification;
  /**
   * The global light source.
   *
   * @example
   * ```json
   * {"anchor": "viewport", "color": "white", "intensity": 0.4}
   * ```
   */
  "light"?: LightSpecification;
  /**
   * The map's sky configuration. **Note:** this definition is still experimental and is under development in maplibre-gl-js.
   *
   * @example
   * ```json
   * {
   *     "sky-color": "#199EF3",
   *     "sky-horizon-blend": 0.5,
   *     "horizon-color": "#ffffff",
   *     "horizon-fog-blend": 0.5,
   *     "fog-color": "#0000ff",
   *     "fog-ground-blend": 0.5,
   *     "atmosphere-blend": [
   *         "interpolate",
   *         ["linear"],
   *         ["zoom"],
   *         0,
   *         1,
   *         10,
   *         1,
   *         12,
   *         0
   *     ]
   * }
   * ```
   */
  "sky"?: SkySpecification;
  /**
   * The projection configuration
   *
   * @example
   * ```json
   * {
   *     "type": [
   *         "interpolate",
   *         ["linear"],
   *         ["zoom"],
   *         10,
   *         "vertical-perspective",
   *         12,
   *         "mercator"
   *     ]
   * }
   * ```
   */
  "projection"?: ProjectionSpecification;
  /**
   * The terrain configuration.
   *
   * @example
   * ```json
   * {"source": "raster-dem-source", "exaggeration": 0.5}
   * ```
   */
  "terrain"?: TerrainSpecification;
  /**
   * Sources state which data the map should display. Specify the type of source with the `type` property. Adding a source isn't enough to make data appear on the map because sources don't contain styling details like color or width. Layers refer to a source and give it a visual representation. This makes it possible to style the same source in different ways, like differentiating between types of roads in a highways layer.
   *
   * Tiled sources (vector and raster) must specify their details according to the [TileJSON specification](https://github.com/mapbox/tilejson-spec).
   *
   * @example
   * ```json
   * {
   *     "maplibre-demotiles": {
   *         "type": "vector",
   *         "url": "https://demotiles.maplibre.org/tiles/tiles.json"
   *     },
   *     "maplibre-tilejson": {
   *         "type": "vector",
   *         "url": "http://api.example.com/tilejson.json"
   *     },
   *     "maplibre-streets": {
   *         "type": "vector",
   *         "tiles": [
   *             "http://a.example.com/tiles/{z}/{x}/{y}.pbf",
   *             "http://b.example.com/tiles/{z}/{x}/{y}.pbf"
   *         ],
   *         "maxzoom": 14
   *     },
   *     "wms-imagery": {
   *         "type": "raster",
   *         "tiles": [
   *             "http://a.example.com/wms?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&width=256&height=256&layers=example"
   *         ],
   *         "tileSize": 256
   *     }
   * }
   * ```
   */
  "sources": {
    [_: string]: SourceSpecification;
  };
  /**
   * An array of `{id: 'my-sprite', url: 'https://example.com/sprite'}` objects. Each object should represent a unique URL to load a sprite from and and a unique ID to use as a prefix when referencing images from that sprite (i.e. 'my-sprite:image'). All the URLs are internally extended to load both .json and .png files. If the `id` field is equal to 'default', the prefix is omitted (just 'image' instead of 'default:image'). All the IDs and URLs must be unique. For backwards compatibility, instead of an array, one can also provide a single string that represent a URL to load the sprite from. The images in this case won't be prefixed.
   *
   * @example
   * ```json
   * "https://demotiles.maplibre.org/styles/osm-bright-gl-style/sprite"
   * ```
   */
  "sprite"?: SpriteSpecification;
  /**
   * A URL template for loading signed-distance-field glyph sets in PBF format.
   *
   * If this property is set, any text in the `text-field` layout property is displayed in the font stack named by the `text-font` layout property based on glyphs located at the URL specified by this property. Otherwise, font faces will be determined by the `text-font` property based on the local environment.
   *
   * The URL must include:
   *
   *  - `{fontstack}` - When requesting glyphs, this token is replaced with a comma separated list of fonts from a font stack specified in the `text-font` property of a symbol layer.
   *
   *  - `{range}` - When requesting glyphs, this token is replaced with a range of 256 Unicode code points. For example, to load glyphs for the Unicode Basic Latin and Basic Latin-1 Supplement blocks, the range would be 0-255. The actual ranges that are loaded are determined at runtime based on what text needs to be displayed.
   *
   * The URL must be absolute, containing the [scheme, authority and path components](https://en.wikipedia.org/wiki/URL#Syntax).
   *
   * @example
   * ```json
   * "https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf"
   * ```
   */
  "glyphs"?: string;
  /**
   * The `font-faces` property can be used to specify what font files to use for rendering text. Font faces contain information needed to render complex texts such as [Devanagari](https://en.wikipedia.org/wiki/Devanagari), [Khmer](https://en.wikipedia.org/wiki/Khmer_script) among many others.<h2>Unicode range</h2>The optional `unicode-range` property can be used to only use a particular font file for characters within the specified unicode range(s). Its value should be an array of strings, each indicating a start and end of a unicode range, similar to the [CSS descriptor with the same name](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/unicode-range). This allows specifying multiple non-consecutive unicode ranges. When not specified, the default value is `U+0-10FFFF`, meaning the font file will be used for all unicode characters.
   *
   * Refer to the [Unicode Character Code Charts](https://www.unicode.org/charts/) to see ranges for scripts supported by Unicode. To see what unicode code-points are available in a font, use a tool like [FontDrop](https://fontdrop.info/).
   *
   * <h2>Font Resolution</h2>For every name in a symbol layer’s [`text-font`](./layers.md/#text-font) array, characters are matched if they are covered one of the by the font files in the corresponding entry of the `font-faces` map. Any still-unmatched characters then fall back to the [`glyphs`](./glyphs.md) URL if provided.
   *
   * <h2>Supported Fonts</h2>What type of fonts are supported is implementation-defined. Unsupported fonts are ignored.
   *
   * @example
   * ```json
   * {
   *     "Noto Sans Regular": [
   *         {
   *             "url": "https://cdn.jsdelivr.net/gh/notofonts/notofonts.github.io/fonts/NotoSansKhmer/hinted/ttf/NotoSansKhmer-Regular.ttf",
   *             "unicode-range": ["U+1780-17FF"]
   *         },
   *         {
   *             "url": "https://cdn.jsdelivr.net/gh/notofonts/notofonts.github.io/fonts/NotoSansDevanagari/hinted/ttf/NotoSansDevanagari-Regular.ttf",
   *             "unicode-range": ["U+0900-097F"]
   *         },
   *         {
   *             "url": "https://cdn.jsdelivr.net/gh/notofonts/notofonts.github.io/fonts/NotoSansMyanmar/hinted/ttf/NotoSansMyanmar-Regular.ttf",
   *             "unicode-range": ["U+1000-109F"]
   *         },
   *         {
   *             "url": "https://cdn.jsdelivr.net/gh/notofonts/notofonts.github.io/fonts/NotoSansEthiopic/hinted/ttf/NotoSansEthiopic-Regular.ttf",
   *             "unicode-range": ["U+1200-137F"]
   *         }
   *     ],
   *     "Unifont": "https://ftp.gnu.org/gnu/unifont/unifont-15.0.01/unifont-15.0.01.ttf"
   * }
   * ```
   */
  "font-faces"?: FontFacesSpecification;
  /**
   * A global transition definition to use as a default across properties, to be used for timing transitions between one value and the next when no property-specific transition is set. Collision-based symbol fading is controlled independently of the style's `transition` property.
   *
   * In addition to this global definition via `transition`, if any individual paint or layout property are marked as `Transitionable`, a corresponding `*-transition` property is avaliable to fine-tune the property’s animation between old and new values based on similar `duration` and `delay` values.
   *
   * For example, [`fill-color`](layers/#fill-color) is marked as `Transitionable`, so it can transition either independently via `fill-color-transition` or globally via the style's `transition` property:
   *
   * @example
   * ```json
   * {"duration": 300, "delay": 0}
   * ```
   */
  "transition"?: TransitionSpecification;
  /**
   * A style's `layers` property lists all the layers available in that style. The type of layer is specified by the `type` property, and must be one of `background`, `fill`, `line`, `symbol`, `raster`, `circle`, `fill-extrusion`, `heatmap`, `hillshade`, `color-relief`.
   *
   * Except for layers of the `background` type, each layer needs to refer to a source. Layers take the data that they get from a source, optionally filter features, and then define how those features are styled.
   *
   * @example
   * ```json
   * [
   *     {
   *         "id": "coastline",
   *         "source": "maplibre",
   *         "source-layer": "countries",
   *         "type": "line",
   *         "paint": {"line-color": "#198EC8"}
   *     }
   * ]
   * ```
   */
  "layers": Array<LayerSpecification>;
};
type LightSpecification = {
  /**
   * Whether extruded geometries are lit relative to the map or viewport.
   *
   * @default
   * ```json
   * "viewport"
   * ```
   *
   * @example
   * ```json
   * "map"
   * ```
   */
  "anchor"?: PropertyValueSpecification<"map" | "viewport">;
  /**
   * Position of the light source relative to lit (extruded) geometries, in [r radial coordinate, a azimuthal angle, p polar angle] where r indicates the distance from the center of the base of an object to its light, a indicates the position of the light relative to 0° (0° when `light.anchor` is set to `viewport` corresponds to the top of the viewport, or 0° when `light.anchor` is set to `map` corresponds to due north, and degrees proceed clockwise), and p indicates the height of the light (from 0°, directly above, to 180°, directly below).
   *
   * @default
   * ```json
   * [1.15, 210, 30]
   * ```
   *
   * @example
   * ```json
   * [1.5, 90, 80]
   * ```
   */
  "position"?: PropertyValueSpecification<[number, number, number]>;
  "position-transition"?: TransitionSpecification;
  /**
   * Color tint for lighting extruded geometries.
   *
   * @default
   * ```json
   * "#ffffff"
   * ```
   */
  "color"?: PropertyValueSpecification<ColorSpecification>;
  "color-transition"?: TransitionSpecification;
  /**
   * Intensity of lighting (on a scale from 0 to 1). Higher numbers will present as more extreme contrast.
   *
   * @default
   * ```json
   * 0.5
   * ```
   */
  "intensity"?: PropertyValueSpecification<number>;
  "intensity-transition"?: TransitionSpecification;
};
type SkySpecification = {
  /**
   * The base color for the sky.
   *
   * @default
   * ```json
   * "#88C6FC"
   * ```
   */
  "sky-color"?: PropertyValueSpecification<ColorSpecification>;
  "sky-color-transition"?: TransitionSpecification;
  /**
   * The base color at the horizon.
   *
   * @default
   * ```json
   * "#ffffff"
   * ```
   */
  "horizon-color"?: PropertyValueSpecification<ColorSpecification>;
  "horizon-color-transition"?: TransitionSpecification;
  /**
   * The base color for the fog. Requires 3D terrain.
   *
   * @default
   * ```json
   * "#ffffff"
   * ```
   */
  "fog-color"?: PropertyValueSpecification<ColorSpecification>;
  "fog-color-transition"?: TransitionSpecification;
  /**
   * How to blend the fog over the 3D terrain. Where 0 is the map center and 1 is the horizon.
   *
   * @default
   * ```json
   * 0.5
   * ```
   */
  "fog-ground-blend"?: PropertyValueSpecification<number>;
  "fog-ground-blend-transition"?: TransitionSpecification;
  /**
   * How to blend the fog color and the horizon color. Where 0 is using the horizon color only and 1 is using the fog color only.
   *
   * @default
   * ```json
   * 0.8
   * ```
   */
  "horizon-fog-blend"?: PropertyValueSpecification<number>;
  "horizon-fog-blend-transition"?: TransitionSpecification;
  /**
   * How to blend the sky color and the horizon color. Where 1 is blending the color at the middle of the sky and 0 is not blending at all and using the sky color only.
   *
   * @default
   * ```json
   * 0.8
   * ```
   */
  "sky-horizon-blend"?: PropertyValueSpecification<number>;
  "sky-horizon-blend-transition"?: TransitionSpecification;
  /**
   * How to blend the atmosphere. Where 1 is visible atmosphere and 0 is hidden. It is best to interpolate this expression when using globe projection.
   *
   * @default
   * ```json
   * 0.8
   * ```
   */
  "atmosphere-blend"?: PropertyValueSpecification<number>;
  "atmosphere-blend-transition"?: TransitionSpecification;
};
type ProjectionSpecification = {
  /**
   * The projection definition type. Can be specified as a string, a transition state, or an expression.
   *
   * @default
   * ```json
   * "mercator"
   * ```
   */
  "type"?: PropertyValueSpecification<ProjectionDefinitionSpecification>;
};
type TerrainSpecification = {
  /**
   * The source for the terrain data.
   */
  "source": string;
  /**
   * The exaggeration of the terrain - how high it will look.
   *
   * @default
   * ```json
   * 1
   * ```
   */
  "exaggeration"?: number;
};
type VectorSourceSpecification = {
  /**
   * The type of the source.
   */
  "type": "vector";
  /**
   * A URL to a TileJSON resource. Supported protocols are `http:` and `https:`.
   */
  "url"?: string;
  /**
   * An array of one or more tile source URLs, as in the TileJSON spec.
   */
  "tiles"?: Array<string>;
  /**
   * An array containing the longitude and latitude of the southwest and northeast corners of the source's bounding box in the following order: `[sw.lng, sw.lat, ne.lng, ne.lat]`. When this property is included in a source, no tiles outside of the given bounds are requested by MapLibre.
   *
   * @default
   * ```json
   * [-180, -85.051129, 180, 85.051129]
   * ```
   */
  "bounds"?: [number, number, number, number];
  /**
   * Influences the y direction of the tile coordinates. The global-mercator (aka Spherical Mercator) profile is assumed.
   *
   * @default
   * ```json
   * "xyz"
   * ```
   */
  "scheme"?: "xyz" | "tms";
  /**
   * Minimum zoom level for which tiles are available, as in the TileJSON spec.
   */
  "minzoom"?: number;
  /**
   * Maximum zoom level for which tiles are available, as in the TileJSON spec. Data from tiles at the maxzoom are used when displaying the map at higher zoom levels.
   *
   * @default
   * ```json
   * 22
   * ```
   */
  "maxzoom"?: number;
  /**
   * Contains an attribution to be displayed when the map is shown to a user.
   */
  "attribution"?: string;
  /**
   * A property to use as a feature id (for feature state). Either a property name, or an object of the form `{<sourceLayer>: <propertyName>}`. If specified as a string for a vector tile source, the same property is used across all its source layers.
   */
  "promoteId"?: PromoteIdSpecification;
  /**
   * A setting to determine whether a source's tiles are cached locally.
   */
  "volatile"?: boolean;
  /**
   * The encoding used by this source. Mapbox Vector Tiles encoding is used by default.
   *
   * @default
   * ```json
   * "mvt"
   * ```
   */
  "encoding"?: "mvt" | "mlt";
};
type RasterSourceSpecification = {
  /**
   * The type of the source.
   */
  "type": "raster";
  /**
   * A URL to a TileJSON resource. Supported protocols are `http:` and `https:`.
   */
  "url"?: string;
  /**
   * An array of one or more tile source URLs, as in the TileJSON spec.
   */
  "tiles"?: Array<string>;
  /**
   * An array containing the longitude and latitude of the southwest and northeast corners of the source's bounding box in the following order: `[sw.lng, sw.lat, ne.lng, ne.lat]`. When this property is included in a source, no tiles outside of the given bounds are requested by MapLibre.
   *
   * @default
   * ```json
   * [-180, -85.051129, 180, 85.051129]
   * ```
   */
  "bounds"?: [number, number, number, number];
  /**
   * Minimum zoom level for which tiles are available, as in the TileJSON spec.
   */
  "minzoom"?: number;
  /**
   * Maximum zoom level for which tiles are available, as in the TileJSON spec. Data from tiles at the maxzoom are used when displaying the map at higher zoom levels.
   *
   * @default
   * ```json
   * 22
   * ```
   */
  "maxzoom"?: number;
  /**
   * The minimum visual size to display tiles for this layer. Only configurable for raster layers.
   *
   * @default
   * ```json
   * 512
   * ```
   */
  "tileSize"?: number;
  /**
   * Influences the y direction of the tile coordinates. The global-mercator (aka Spherical Mercator) profile is assumed.
   *
   * @default
   * ```json
   * "xyz"
   * ```
   */
  "scheme"?: "xyz" | "tms";
  /**
   * Contains an attribution to be displayed when the map is shown to a user.
   */
  "attribution"?: string;
  /**
   * A setting to determine whether a source's tiles are cached locally.
   */
  "volatile"?: boolean;
};
type RasterDEMSourceSpecification = {
  /**
   * The type of the source.
   */
  "type": "raster-dem";
  /**
   * A URL to a TileJSON resource. Supported protocols are `http:` and `https:`.
   */
  "url"?: string;
  /**
   * An array of one or more tile source URLs, as in the TileJSON spec.
   */
  "tiles"?: Array<string>;
  /**
   * An array containing the longitude and latitude of the southwest and northeast corners of the source's bounding box in the following order: `[sw.lng, sw.lat, ne.lng, ne.lat]`. When this property is included in a source, no tiles outside of the given bounds are requested by MapLibre.
   *
   * @default
   * ```json
   * [-180, -85.051129, 180, 85.051129]
   * ```
   */
  "bounds"?: [number, number, number, number];
  /**
   * Minimum zoom level for which tiles are available, as in the TileJSON spec.
   */
  "minzoom"?: number;
  /**
   * Maximum zoom level for which tiles are available, as in the TileJSON spec. Data from tiles at the maxzoom are used when displaying the map at higher zoom levels.
   *
   * @default
   * ```json
   * 22
   * ```
   */
  "maxzoom"?: number;
  /**
   * The minimum visual size to display tiles for this layer. Only configurable for raster layers.
   *
   * @default
   * ```json
   * 512
   * ```
   */
  "tileSize"?: number;
  /**
   * Contains an attribution to be displayed when the map is shown to a user.
   */
  "attribution"?: string;
  /**
   * The encoding used by this source. Mapbox Terrain RGB is used by default.
   *
   * @default
   * ```json
   * "mapbox"
   * ```
   */
  "encoding"?: "terrarium" | "mapbox" | "custom";
  /**
   * Value that will be multiplied by the red channel value when decoding. Only used on custom encodings.
   *
   * @default
   * ```json
   * 1
   * ```
   */
  "redFactor"?: number;
  /**
   * Value that will be multiplied by the blue channel value when decoding. Only used on custom encodings.
   *
   * @default
   * ```json
   * 1
   * ```
   */
  "blueFactor"?: number;
  /**
   * Value that will be multiplied by the green channel value when decoding. Only used on custom encodings.
   *
   * @default
   * ```json
   * 1
   * ```
   */
  "greenFactor"?: number;
  /**
   * Value that will be added to the encoding mix when decoding. Only used on custom encodings.
   */
  "baseShift"?: number;
  /**
   * A setting to determine whether a source's tiles are cached locally.
   */
  "volatile"?: boolean;
};
type GeoJSONSourceSpecification = {
  /**
   * The data type of the GeoJSON source.
   */
  "type": "geojson";
  /**
   * A URL to a GeoJSON file, or inline GeoJSON.
   */
  "data": GeoJSON.GeoJSON | string;
  /**
   * Maximum zoom level at which to create vector tiles (higher means greater detail at high zoom levels).
   *
   * @default
   * ```json
   * 18
   * ```
   */
  "maxzoom"?: number;
  /**
   * Contains an attribution to be displayed when the map is shown to a user.
   */
  "attribution"?: string;
  /**
   * Size of the tile buffer on each side. A value of 0 produces no buffer. A value of 512 produces a buffer as wide as the tile itself. Larger values produce fewer rendering artifacts near tile edges and slower performance.
   *
   * @default
   * ```json
   * 128
   * ```
   */
  "buffer"?: number;
  /**
   * An expression for filtering features prior to processing them for rendering.
   */
  "filter"?: FilterSpecification;
  /**
   * Douglas-Peucker simplification tolerance (higher means simpler geometries and faster performance).
   *
   * @default
   * ```json
   * 0.375
   * ```
   */
  "tolerance"?: number;
  /**
   * If the data is a collection of point features, setting this to true clusters the points by radius into groups. Cluster groups become new `Point` features in the source with additional properties:
   *
   *  * `cluster` Is `true` if the point is a cluster
   *
   *  * `cluster_id` A unique id for the cluster to be used in conjunction with the [cluster inspection methods](https://maplibre.org/maplibre-gl-js/docs/API/classes/GeoJSONSource/#getclusterexpansionzoom)
   *
   *  * `point_count` Number of original points grouped into this cluster
   *
   *  * `point_count_abbreviated` An abbreviated point count
   */
  "cluster"?: boolean;
  /**
   * Radius of each cluster if clustering is enabled. A value of 512 indicates a radius equal to the width of a tile.
   *
   * @default
   * ```json
   * 50
   * ```
   */
  "clusterRadius"?: number;
  /**
   * Max zoom on which to cluster points if clustering is enabled. Defaults to one zoom less than maxzoom (so that last zoom features are not clustered). Clusters are re-evaluated at integer zoom levels so setting clusterMaxZoom to 14 means the clusters will be displayed until z15.
   */
  "clusterMaxZoom"?: number;
  /**
   * Minimum number of points necessary to form a cluster if clustering is enabled. Defaults to `2`.
   */
  "clusterMinPoints"?: number;
  /**
   * An object defining custom properties on the generated clusters if clustering is enabled, aggregating values from clustered points. Has the form `{"property_name": [operator, map_expression]}`. `operator` is any expression function that accepts at least 2 operands (e.g. `"+"` or `"max"`) — it accumulates the property value from clusters/points the cluster contains; `map_expression` produces the value of a single point.
   *
   * Example: `{"sum": ["+", ["get", "scalerank"]]}`.
   *
   * For more advanced use cases, in place of `operator`, you can use a custom reduce expression that references a special `["accumulated"]` value, e.g.:
   *
   * `{"sum": [["+", ["accumulated"], ["get", "sum"]], ["get", "scalerank"]]}`
   */
  "clusterProperties"?: unknown;
  /**
   * Whether to calculate line distance metrics. This is required for line layers that specify `line-gradient` values.
   */
  "lineMetrics"?: boolean;
  /**
   * Whether to generate ids for the geojson features. When enabled, the `feature.id` property will be auto assigned based on its index in the `features` array, over-writing any previous values.
   */
  "generateId"?: boolean;
  /**
   * A property to use as a feature id (for feature state). Either a property name, or an object of the form `{<sourceLayer>: <propertyName>}`.
   */
  "promoteId"?: PromoteIdSpecification;
};
type VideoSourceSpecification = {
  /**
   * The data type of the video source.
   */
  "type": "video";
  /**
   * URLs to video content in order of preferred format.
   */
  "urls": Array<string>;
  /**
   * Corners of video specified in longitude, latitude pairs.
   */
  "coordinates": [[number, number], [number, number], [number, number], [number, number]];
};
type ImageSourceSpecification = {
  /**
   * The data type of the image source.
   */
  "type": "image";
  /**
   * URL that points to an image.
   */
  "url": string;
  /**
   * Corners of image specified in longitude, latitude pairs.
   */
  "coordinates": [[number, number], [number, number], [number, number], [number, number]];
};
type SourceSpecification = VectorSourceSpecification | RasterSourceSpecification | RasterDEMSourceSpecification | GeoJSONSourceSpecification | VideoSourceSpecification | ImageSourceSpecification;
type FillLayerSpecification = {
  /**
   * Unique layer name.
   */
  "id": string;
  "type": "fill";
  /**
   * Arbitrary properties useful to track with the layer, but do not influence rendering. Properties should be prefixed to avoid collisions, like 'maplibre:'.
   *
   * @example
   * ```json
   * {"source:comment": "Hydrology FCCODE 460 - Narrow wash"}
   * ```
   */
  "metadata"?: unknown;
  /**
   * Name of a source description to be used for this layer. Required for all layer types except `background`.
   */
  "source": string;
  /**
   * Layer to use from a vector tile source. Required for vector tile sources; prohibited for all other source types, including GeoJSON sources.
   */
  "source-layer"?: string;
  /**
   * The minimum zoom level for the layer. At zoom levels less than the minzoom, the layer will be hidden.
   */
  "minzoom"?: number;
  /**
   * The maximum zoom level for the layer. At zoom levels equal to or greater than the maxzoom, the layer will be hidden.
   */
  "maxzoom"?: number;
  /**
   * A expression specifying conditions on source features. Only features that match the filter are displayed. Zoom expressions in filters are only evaluated at integer zoom levels. The `feature-state` expression is not supported in filter expressions.
   */
  "filter"?: FilterSpecification;
  /**
   * Layout properties for the layer.
   */
  "layout"?: {
    /**
     * Sorts features in ascending order based on this value. Features with a higher sort key will appear above features with a lower sort key.
     */
    "fill-sort-key"?: DataDrivenPropertyValueSpecification<number>;
    /**
     * Whether this layer is displayed.
     *
     * @default
     * ```json
     * "visible"
     * ```
     */
    "visibility"?: VisibilitySpecification;
  };
  /**
   * Default paint properties for this layer.
   */
  "paint"?: {
    /**
     * Whether or not the fill should be antialiased.
     *
     * @default
     * ```json
     * true
     * ```
     */
    "fill-antialias"?: PropertyValueSpecification<boolean>;
    /**
     * The opacity of the entire fill layer. In contrast to the `fill-color`, this value will also affect the 1px stroke around the fill, if the stroke is used.
     *
     * @default
     * ```json
     * 1
     * ```
     */
    "fill-opacity"?: DataDrivenPropertyValueSpecification<number>;
    "fill-opacity-transition"?: TransitionSpecification;
    /**
     * The color of the filled part of this layer. This color can be specified as `rgba` with an alpha component and the color's opacity will not affect the opacity of the 1px stroke, if it is used.
     *
     * @default
     * ```json
     * "#000000"
     * ```
     */
    "fill-color"?: DataDrivenPropertyValueSpecification<ColorSpecification>;
    "fill-color-transition"?: TransitionSpecification;
    /**
     * The outline color of the fill. Matches the value of `fill-color` if unspecified.
     */
    "fill-outline-color"?: DataDrivenPropertyValueSpecification<ColorSpecification>;
    "fill-outline-color-transition"?: TransitionSpecification;
    /**
     * The geometry's offset. Values are [x, y] where negatives indicate left and up, respectively.
     *
     * @default
     * ```json
     * [0, 0]
     * ```
     */
    "fill-translate"?: PropertyValueSpecification<[number, number]>;
    "fill-translate-transition"?: TransitionSpecification;
    /**
     * Controls the frame of reference for `fill-translate`.
     *
     * @default
     * ```json
     * "map"
     * ```
     */
    "fill-translate-anchor"?: PropertyValueSpecification<"map" | "viewport">;
    /**
     * Name of image in sprite to use for drawing image fills. For seamless patterns, image width and height must be a factor of two (2, 4, 8, ..., 512). Note that zoom-dependent expressions will be evaluated only at integer zoom levels.
     */
    "fill-pattern"?: DataDrivenPropertyValueSpecification<ResolvedImageSpecification>;
    "fill-pattern-transition"?: TransitionSpecification;
  };
};
type LineLayerSpecification = {
  /**
   * Unique layer name.
   */
  "id": string;
  "type": "line";
  /**
   * Arbitrary properties useful to track with the layer, but do not influence rendering. Properties should be prefixed to avoid collisions, like 'maplibre:'.
   *
   * @example
   * ```json
   * {"source:comment": "Hydrology FCCODE 460 - Narrow wash"}
   * ```
   */
  "metadata"?: unknown;
  /**
   * Name of a source description to be used for this layer. Required for all layer types except `background`.
   */
  "source": string;
  /**
   * Layer to use from a vector tile source. Required for vector tile sources; prohibited for all other source types, including GeoJSON sources.
   */
  "source-layer"?: string;
  /**
   * The minimum zoom level for the layer. At zoom levels less than the minzoom, the layer will be hidden.
   */
  "minzoom"?: number;
  /**
   * The maximum zoom level for the layer. At zoom levels equal to or greater than the maxzoom, the layer will be hidden.
   */
  "maxzoom"?: number;
  /**
   * A expression specifying conditions on source features. Only features that match the filter are displayed. Zoom expressions in filters are only evaluated at integer zoom levels. The `feature-state` expression is not supported in filter expressions.
   */
  "filter"?: FilterSpecification;
  /**
   * Layout properties for the layer.
   */
  "layout"?: {
    /**
     * The display of line endings.
     *
     * @default
     * ```json
     * "butt"
     * ```
     */
    "line-cap"?: DataDrivenPropertyValueSpecification<"butt" | "round" | "square">;
    /**
     * The display of lines when joining.
     *
     * @default
     * ```json
     * "miter"
     * ```
     */
    "line-join"?: DataDrivenPropertyValueSpecification<"bevel" | "round" | "miter">;
    /**
     * Used to automatically convert miter joins to bevel joins for sharp angles.
     *
     * @default
     * ```json
     * 2
     * ```
     */
    "line-miter-limit"?: DataDrivenPropertyValueSpecification<number>;
    /**
     * Used to automatically convert round joins to miter joins for shallow angles.
     *
     * @default
     * ```json
     * 1.05
     * ```
     */
    "line-round-limit"?: DataDrivenPropertyValueSpecification<number>;
    /**
     * Sorts features in ascending order based on this value. Features with a higher sort key will appear above features with a lower sort key.
     */
    "line-sort-key"?: DataDrivenPropertyValueSpecification<number>;
    /**
     * Whether this layer is displayed.
     *
     * @default
     * ```json
     * "visible"
     * ```
     */
    "visibility"?: VisibilitySpecification;
  };
  /**
   * Default paint properties for this layer.
   */
  "paint"?: {
    /**
     * The opacity at which the line will be drawn.
     *
     * @default
     * ```json
     * 1
     * ```
     */
    "line-opacity"?: DataDrivenPropertyValueSpecification<number>;
    "line-opacity-transition"?: TransitionSpecification;
    /**
     * The color with which the line will be drawn.
     *
     * @default
     * ```json
     * "#000000"
     * ```
     */
    "line-color"?: DataDrivenPropertyValueSpecification<ColorSpecification>;
    "line-color-transition"?: TransitionSpecification;
    /**
     * The geometry's offset. Values are [x, y] where negatives indicate left and up, respectively.
     *
     * @default
     * ```json
     * [0, 0]
     * ```
     */
    "line-translate"?: PropertyValueSpecification<[number, number]>;
    "line-translate-transition"?: TransitionSpecification;
    /**
     * Controls the frame of reference for `line-translate`.
     *
     * @default
     * ```json
     * "map"
     * ```
     */
    "line-translate-anchor"?: PropertyValueSpecification<"map" | "viewport">;
    /**
     * Stroke thickness.
     *
     * @default
     * ```json
     * 1
     * ```
     */
    "line-width"?: DataDrivenPropertyValueSpecification<number>;
    "line-width-transition"?: TransitionSpecification;
    /**
     * Draws a line casing outside of a line's actual path. Value indicates the width of the inner gap.
     */
    "line-gap-width"?: DataDrivenPropertyValueSpecification<number>;
    "line-gap-width-transition"?: TransitionSpecification;
    /**
     * The line's offset. For linear features, a positive value offsets the line to the right, relative to the direction of the line, and a negative value to the left. For polygon features, a positive value results in an inset, and a negative value results in an outset.
     */
    "line-offset"?: DataDrivenPropertyValueSpecification<number>;
    "line-offset-transition"?: TransitionSpecification;
    /**
     * Blur applied to the line, in pixels.
     */
    "line-blur"?: DataDrivenPropertyValueSpecification<number>;
    "line-blur-transition"?: TransitionSpecification;
    /**
     * Specifies the lengths of the alternating dashes and gaps that form the dash pattern. The lengths are later scaled by the line width. To convert a dash length to pixels, multiply the length by the current line width. GeoJSON sources with `lineMetrics: true` specified won't render dashed lines to the expected scale. Zoom-dependent expressions will be evaluated only at integer zoom levels. The only way to create an array value is using `["literal", [...]]`; arrays cannot be read from or derived from feature properties.
     */
    "line-dasharray"?: DataDrivenPropertyValueSpecification<Array<number>>;
    "line-dasharray-transition"?: TransitionSpecification;
    /**
     * Name of image in sprite to use for drawing image lines. For seamless patterns, image width must be a factor of two (2, 4, 8, ..., 512). Note that zoom-dependent expressions will be evaluated only at integer zoom levels.
     */
    "line-pattern"?: DataDrivenPropertyValueSpecification<ResolvedImageSpecification>;
    "line-pattern-transition"?: TransitionSpecification;
    /**
     * Defines a gradient with which to color a line feature. Can only be used with GeoJSON sources that specify `"lineMetrics": true`.
     */
    "line-gradient"?: ExpressionSpecification;
  };
};
type SymbolLayerSpecification = {
  /**
   * Unique layer name.
   */
  "id": string;
  "type": "symbol";
  /**
   * Arbitrary properties useful to track with the layer, but do not influence rendering. Properties should be prefixed to avoid collisions, like 'maplibre:'.
   *
   * @example
   * ```json
   * {"source:comment": "Hydrology FCCODE 460 - Narrow wash"}
   * ```
   */
  "metadata"?: unknown;
  /**
   * Name of a source description to be used for this layer. Required for all layer types except `background`.
   */
  "source": string;
  /**
   * Layer to use from a vector tile source. Required for vector tile sources; prohibited for all other source types, including GeoJSON sources.
   */
  "source-layer"?: string;
  /**
   * The minimum zoom level for the layer. At zoom levels less than the minzoom, the layer will be hidden.
   */
  "minzoom"?: number;
  /**
   * The maximum zoom level for the layer. At zoom levels equal to or greater than the maxzoom, the layer will be hidden.
   */
  "maxzoom"?: number;
  /**
   * A expression specifying conditions on source features. Only features that match the filter are displayed. Zoom expressions in filters are only evaluated at integer zoom levels. The `feature-state` expression is not supported in filter expressions.
   */
  "filter"?: FilterSpecification;
  /**
   * Layout properties for the layer.
   */
  "layout"?: {
    /**
     * Label placement relative to its geometry.
     *
     * @default
     * ```json
     * "point"
     * ```
     */
    "symbol-placement"?: PropertyValueSpecification<"point" | "line" | "line-center">;
    /**
     * Distance between two symbol anchors.
     *
     * @default
     * ```json
     * 250
     * ```
     */
    "symbol-spacing"?: PropertyValueSpecification<number>;
    /**
     * If true, the symbols will not cross tile edges to avoid mutual collisions. Recommended in layers that don't have enough padding in the vector tile to prevent collisions, or if it is a point symbol layer placed after a line symbol layer. When using a client that supports global collision detection, like MapLibre GL JS version 0.42.0 or greater, enabling this property is not needed to prevent clipped labels at tile boundaries.
     */
    "symbol-avoid-edges"?: PropertyValueSpecification<boolean>;
    /**
     * Sorts features in ascending order based on this value. Features with lower sort keys are drawn and placed first.  When `icon-allow-overlap` or `text-allow-overlap` is `false`, features with a lower sort key will have priority during placement. When `icon-allow-overlap` or `text-allow-overlap` is set to `true`, features with a higher sort key will overlap over features with a lower sort key.
     */
    "symbol-sort-key"?: DataDrivenPropertyValueSpecification<number>;
    /**
     * Determines whether overlapping symbols in the same layer are rendered in the order that they appear in the data source or by their y-position relative to the viewport. To control the order and prioritization of symbols otherwise, use `symbol-sort-key`.
     *
     * @default
     * ```json
     * "auto"
     * ```
     */
    "symbol-z-order"?: PropertyValueSpecification<"auto" | "viewport-y" | "source">;
    /**
     * If true, the icon will be visible even if it collides with other previously drawn symbols.
     */
    "icon-allow-overlap"?: PropertyValueSpecification<boolean>;
    /**
     * Allows for control over whether to show an icon when it overlaps other symbols on the map. If `icon-overlap` is not set, `icon-allow-overlap` is used instead.
     */
    "icon-overlap"?: PropertyValueSpecification<"never" | "always" | "cooperative">;
    /**
     * If true, other symbols can be visible even if they collide with the icon.
     */
    "icon-ignore-placement"?: PropertyValueSpecification<boolean>;
    /**
     * If true, text will display without their corresponding icons when the icon collides with other symbols and the text does not.
     */
    "icon-optional"?: PropertyValueSpecification<boolean>;
    /**
     * In combination with `symbol-placement`, determines the rotation behavior of icons.
     *
     * @default
     * ```json
     * "auto"
     * ```
     */
    "icon-rotation-alignment"?: PropertyValueSpecification<"map" | "viewport" | "auto">;
    /**
     * Scales the original size of the icon by the provided factor. The new pixel size of the image will be the original pixel size multiplied by `icon-size`. 1 is the original size; 3 triples the size of the image.
     *
     * @default
     * ```json
     * 1
     * ```
     */
    "icon-size"?: DataDrivenPropertyValueSpecification<number>;
    /**
     * Scales the icon to fit around the associated text.
     *
     * @default
     * ```json
     * "none"
     * ```
     */
    "icon-text-fit"?: PropertyValueSpecification<"none" | "width" | "height" | "both">;
    /**
     * Size of the additional area added to dimensions determined by `icon-text-fit`, in clockwise order: top, right, bottom, left.
     *
     * @default
     * ```json
     * [0, 0, 0, 0]
     * ```
     */
    "icon-text-fit-padding"?: PropertyValueSpecification<[number, number, number, number]>;
    /**
     * Name of image in sprite to use for drawing an image background.
     */
    "icon-image"?: DataDrivenPropertyValueSpecification<ResolvedImageSpecification>;
    /**
     * Rotates the icon clockwise.
     */
    "icon-rotate"?: DataDrivenPropertyValueSpecification<number>;
    /**
     * Size of additional area round the icon bounding box used for detecting symbol collisions.
     *
     * @default
     * ```json
     * [2]
     * ```
     */
    "icon-padding"?: DataDrivenPropertyValueSpecification<PaddingSpecification>;
    /**
     * If true, the icon may be flipped to prevent it from being rendered upside-down.
     */
    "icon-keep-upright"?: PropertyValueSpecification<boolean>;
    /**
     * Offset distance of icon from its anchor. Positive values indicate right and down, while negative values indicate left and up. Each component is multiplied by the value of `icon-size` to obtain the final offset in pixels. When combined with `icon-rotate` the offset will be as if the rotated direction was up.
     *
     * @default
     * ```json
     * [0, 0]
     * ```
     */
    "icon-offset"?: DataDrivenPropertyValueSpecification<[number, number]>;
    /**
     * Part of the icon placed closest to the anchor.
     *
     * @default
     * ```json
     * "center"
     * ```
     */
    "icon-anchor"?: DataDrivenPropertyValueSpecification<"center" | "left" | "right" | "top" | "bottom" | "top-left" | "top-right" | "bottom-left" | "bottom-right">;
    /**
     * Orientation of icon when map is pitched.
     *
     * @default
     * ```json
     * "auto"
     * ```
     */
    "icon-pitch-alignment"?: PropertyValueSpecification<"map" | "viewport" | "auto">;
    /**
     * Orientation of text when map is pitched.
     *
     * @default
     * ```json
     * "auto"
     * ```
     */
    "text-pitch-alignment"?: PropertyValueSpecification<"map" | "viewport" | "auto">;
    /**
     * In combination with `symbol-placement`, determines the rotation behavior of the individual glyphs forming the text.
     *
     * @default
     * ```json
     * "auto"
     * ```
     */
    "text-rotation-alignment"?: PropertyValueSpecification<"map" | "viewport" | "viewport-glyph" | "auto">;
    /**
     * Value to use for a text label. If a plain `string` is provided, it will be treated as a `formatted` with default/inherited formatting options.
     */
    "text-field"?: DataDrivenPropertyValueSpecification<FormattedSpecification>;
    /**
     * Fonts to use for displaying text. If the `glyphs` root property is specified, this array is joined together and interpreted as a font stack name. Otherwise, it is interpreted as a cascading fallback list of local font names.
     *
     * @default
     * ```json
     * ["Open Sans Regular", "Arial Unicode MS Regular"]
     * ```
     */
    "text-font"?: DataDrivenPropertyValueSpecification<Array<string>>;
    /**
     * Font size.
     *
     * @default
     * ```json
     * 16
     * ```
     */
    "text-size"?: DataDrivenPropertyValueSpecification<number>;
    /**
     * The maximum line width for text wrapping.
     *
     * @default
     * ```json
     * 10
     * ```
     */
    "text-max-width"?: DataDrivenPropertyValueSpecification<number>;
    /**
     * Text leading value for multi-line text.
     *
     * @default
     * ```json
     * 1.2
     * ```
     */
    "text-line-height"?: PropertyValueSpecification<number>;
    /**
     * Text tracking amount.
     */
    "text-letter-spacing"?: DataDrivenPropertyValueSpecification<number>;
    /**
     * Text justification options.
     *
     * @default
     * ```json
     * "center"
     * ```
     */
    "text-justify"?: DataDrivenPropertyValueSpecification<"auto" | "left" | "center" | "right">;
    /**
     * Radial offset of text, in the direction of the symbol's anchor. Useful in combination with `text-variable-anchor`, which defaults to using the two-dimensional `text-offset` if present.
     */
    "text-radial-offset"?: DataDrivenPropertyValueSpecification<number>;
    /**
     * To increase the chance of placing high-priority labels on the map, you can provide an array of `text-anchor` locations: the renderer will attempt to place the label at each location, in order, before moving onto the next label. Use `text-justify: auto` to choose justification based on anchor position. To apply an offset, use the `text-radial-offset` or the two-dimensional `text-offset`.
     *
     * @example
     * ```json
     * ["center", "left", "right"]
     * ```
     */
    "text-variable-anchor"?: PropertyValueSpecification<Array<"center" | "left" | "right" | "top" | "bottom" | "top-left" | "top-right" | "bottom-left" | "bottom-right">>;
    /**
     * To increase the chance of placing high-priority labels on the map, you can provide an array of `text-anchor` locations, each paired with an offset value. The renderer will attempt to place the label at each location, in order, before moving on to the next location+offset. Use `text-justify: auto` to choose justification based on anchor position.
     *
     *  The length of the array must be even, and must alternate between enum and point entries. i.e., each anchor location must be accompanied by a point, and that point defines the offset when the corresponding anchor location is used. Positive offset values indicate right and down, while negative values indicate left and up. Anchor locations may repeat, allowing the renderer to try multiple offsets to try and place a label using the same anchor.
     *
     *  When present, this property takes precedence over `text-anchor`, `text-variable-anchor`, `text-offset`, and `text-radial-offset`.
     *
     *  ```json
     *
     *  { "text-variable-anchor-offset": ["top", [0, 4], "left", [3,0], "bottom", [1, 1]] }
     *
     *  ```
     *
     *  When the renderer chooses the `top` anchor, `[0, 4]` will be used for `text-offset`; the text will be shifted down by 4 ems.
     *
     *  When the renderer chooses the `left` anchor, `[3, 0]` will be used for `text-offset`; the text will be shifted right by 3 ems.
     *
     * @example
     * ```json
     * ["top", [0, 4], "left", [3, 0], "bottom", [1, 1]]
     * ```
     */
    "text-variable-anchor-offset"?: DataDrivenPropertyValueSpecification<VariableAnchorOffsetCollectionSpecification>;
    /**
     * Part of the text placed closest to the anchor.
     *
     * @default
     * ```json
     * "center"
     * ```
     */
    "text-anchor"?: DataDrivenPropertyValueSpecification<"center" | "left" | "right" | "top" | "bottom" | "top-left" | "top-right" | "bottom-left" | "bottom-right">;
    /**
     * Maximum angle change between adjacent characters.
     *
     * @default
     * ```json
     * 45
     * ```
     */
    "text-max-angle"?: PropertyValueSpecification<number>;
    /**
     * The property allows control over a symbol's orientation. Note that the property values act as a hint, so that a symbol whose language doesn’t support the provided orientation will be laid out in its natural orientation. Example: English point symbol will be rendered horizontally even if array value contains single 'vertical' enum value. The order of elements in an array define priority order for the placement of an orientation variant.
     */
    "text-writing-mode"?: PropertyValueSpecification<Array<"horizontal" | "vertical">>;
    /**
     * Rotates the text clockwise.
     */
    "text-rotate"?: DataDrivenPropertyValueSpecification<number>;
    /**
     * Size of the additional area around the text bounding box used for detecting symbol collisions.
     *
     * @default
     * ```json
     * 2
     * ```
     */
    "text-padding"?: PropertyValueSpecification<number>;
    /**
     * If true, the text may be flipped vertically to prevent it from being rendered upside-down.
     *
     * @default
     * ```json
     * true
     * ```
     */
    "text-keep-upright"?: PropertyValueSpecification<boolean>;
    /**
     * Specifies how to capitalize text, similar to the CSS `text-transform` property.
     *
     * @default
     * ```json
     * "none"
     * ```
     */
    "text-transform"?: DataDrivenPropertyValueSpecification<"none" | "uppercase" | "lowercase">;
    /**
     * Offset distance of text from its anchor. Positive values indicate right and down, while negative values indicate left and up. If used with text-variable-anchor, input values will be taken as absolute values. Offsets along the x- and y-axis will be applied automatically based on the anchor position.
     *
     * @default
     * ```json
     * [0, 0]
     * ```
     */
    "text-offset"?: DataDrivenPropertyValueSpecification<[number, number]>;
    /**
     * If true, the text will be visible even if it collides with other previously drawn symbols.
     */
    "text-allow-overlap"?: PropertyValueSpecification<boolean>;
    /**
     * Allows for control over whether to show symbol text when it overlaps other symbols on the map. If `text-overlap` is not set, `text-allow-overlap` is used instead
     */
    "text-overlap"?: PropertyValueSpecification<"never" | "always" | "cooperative">;
    /**
     * If true, other symbols can be visible even if they collide with the text.
     */
    "text-ignore-placement"?: PropertyValueSpecification<boolean>;
    /**
     * If true, icons will display without their corresponding text when the text collides with other symbols and the icon does not.
     */
    "text-optional"?: PropertyValueSpecification<boolean>;
    /**
     * Whether this layer is displayed.
     *
     * @default
     * ```json
     * "visible"
     * ```
     */
    "visibility"?: VisibilitySpecification;
  };
  /**
   * Default paint properties for this layer.
   */
  "paint"?: {
    /**
     * The opacity at which the icon will be drawn.
     *
     * @default
     * ```json
     * 1
     * ```
     */
    "icon-opacity"?: DataDrivenPropertyValueSpecification<number>;
    "icon-opacity-transition"?: TransitionSpecification;
    /**
     * The color of the icon. This can only be used with SDF icons.
     *
     * @default
     * ```json
     * "#000000"
     * ```
     */
    "icon-color"?: DataDrivenPropertyValueSpecification<ColorSpecification>;
    "icon-color-transition"?: TransitionSpecification;
    /**
     * The color of the icon's halo. Icon halos can only be used with SDF icons.
     *
     * @default
     * ```json
     * "rgba(0, 0, 0, 0)"
     * ```
     */
    "icon-halo-color"?: DataDrivenPropertyValueSpecification<ColorSpecification>;
    "icon-halo-color-transition"?: TransitionSpecification;
    /**
     * Distance of halo to the icon outline.
     *
     * The unit is in pixels only for SDF sprites that were created with a blur radius of 8, multiplied by the display density. I.e., the radius needs to be 16 for `@2x` sprites, etc.
     */
    "icon-halo-width"?: DataDrivenPropertyValueSpecification<number>;
    "icon-halo-width-transition"?: TransitionSpecification;
    /**
     * Fade out the halo towards the outside.
     */
    "icon-halo-blur"?: DataDrivenPropertyValueSpecification<number>;
    "icon-halo-blur-transition"?: TransitionSpecification;
    /**
     * Distance that the icon's anchor is moved from its original placement. Positive values indicate right and down, while negative values indicate left and up.
     *
     * @default
     * ```json
     * [0, 0]
     * ```
     */
    "icon-translate"?: PropertyValueSpecification<[number, number]>;
    "icon-translate-transition"?: TransitionSpecification;
    /**
     * Controls the frame of reference for `icon-translate`.
     *
     * @default
     * ```json
     * "map"
     * ```
     */
    "icon-translate-anchor"?: PropertyValueSpecification<"map" | "viewport">;
    /**
     * The opacity at which the text will be drawn.
     *
     * @default
     * ```json
     * 1
     * ```
     */
    "text-opacity"?: DataDrivenPropertyValueSpecification<number>;
    "text-opacity-transition"?: TransitionSpecification;
    /**
     * The color with which the text will be drawn.
     *
     * @default
     * ```json
     * "#000000"
     * ```
     */
    "text-color"?: DataDrivenPropertyValueSpecification<ColorSpecification>;
    "text-color-transition"?: TransitionSpecification;
    /**
     * The color of the text's halo, which helps it stand out from backgrounds.
     *
     * @default
     * ```json
     * "rgba(0, 0, 0, 0)"
     * ```
     */
    "text-halo-color"?: DataDrivenPropertyValueSpecification<ColorSpecification>;
    "text-halo-color-transition"?: TransitionSpecification;
    /**
     * Distance of halo to the font outline. Max text halo width is 1/4 of the font-size.
     */
    "text-halo-width"?: DataDrivenPropertyValueSpecification<number>;
    "text-halo-width-transition"?: TransitionSpecification;
    /**
     * The halo's fadeout distance towards the outside.
     */
    "text-halo-blur"?: DataDrivenPropertyValueSpecification<number>;
    "text-halo-blur-transition"?: TransitionSpecification;
    /**
     * Distance that the text's anchor is moved from its original placement. Positive values indicate right and down, while negative values indicate left and up.
     *
     * @default
     * ```json
     * [0, 0]
     * ```
     */
    "text-translate"?: PropertyValueSpecification<[number, number]>;
    "text-translate-transition"?: TransitionSpecification;
    /**
     * Controls the frame of reference for `text-translate`.
     *
     * @default
     * ```json
     * "map"
     * ```
     */
    "text-translate-anchor"?: PropertyValueSpecification<"map" | "viewport">;
  };
};
type CircleLayerSpecification = {
  /**
   * Unique layer name.
   */
  "id": string;
  "type": "circle";
  /**
   * Arbitrary properties useful to track with the layer, but do not influence rendering. Properties should be prefixed to avoid collisions, like 'maplibre:'.
   *
   * @example
   * ```json
   * {"source:comment": "Hydrology FCCODE 460 - Narrow wash"}
   * ```
   */
  "metadata"?: unknown;
  /**
   * Name of a source description to be used for this layer. Required for all layer types except `background`.
   */
  "source": string;
  /**
   * Layer to use from a vector tile source. Required for vector tile sources; prohibited for all other source types, including GeoJSON sources.
   */
  "source-layer"?: string;
  /**
   * The minimum zoom level for the layer. At zoom levels less than the minzoom, the layer will be hidden.
   */
  "minzoom"?: number;
  /**
   * The maximum zoom level for the layer. At zoom levels equal to or greater than the maxzoom, the layer will be hidden.
   */
  "maxzoom"?: number;
  /**
   * A expression specifying conditions on source features. Only features that match the filter are displayed. Zoom expressions in filters are only evaluated at integer zoom levels. The `feature-state` expression is not supported in filter expressions.
   */
  "filter"?: FilterSpecification;
  /**
   * Layout properties for the layer.
   */
  "layout"?: {
    /**
     * Sorts features in ascending order based on this value. Features with a higher sort key will appear above features with a lower sort key.
     */
    "circle-sort-key"?: DataDrivenPropertyValueSpecification<number>;
    /**
     * Whether this layer is displayed.
     *
     * @default
     * ```json
     * "visible"
     * ```
     */
    "visibility"?: VisibilitySpecification;
  };
  /**
   * Default paint properties for this layer.
   */
  "paint"?: {
    /**
     * Circle radius.
     *
     * @default
     * ```json
     * 5
     * ```
     */
    "circle-radius"?: DataDrivenPropertyValueSpecification<number>;
    "circle-radius-transition"?: TransitionSpecification;
    /**
     * The fill color of the circle.
     *
     * @default
     * ```json
     * "#000000"
     * ```
     */
    "circle-color"?: DataDrivenPropertyValueSpecification<ColorSpecification>;
    "circle-color-transition"?: TransitionSpecification;
    /**
     * Amount to blur the circle. 1 blurs the circle such that only the centerpoint is full opacity.
     */
    "circle-blur"?: DataDrivenPropertyValueSpecification<number>;
    "circle-blur-transition"?: TransitionSpecification;
    /**
     * The opacity at which the circle will be drawn.
     *
     * @default
     * ```json
     * 1
     * ```
     */
    "circle-opacity"?: DataDrivenPropertyValueSpecification<number>;
    "circle-opacity-transition"?: TransitionSpecification;
    /**
     * The geometry's offset. Values are [x, y] where negatives indicate left and up, respectively.
     *
     * @default
     * ```json
     * [0, 0]
     * ```
     */
    "circle-translate"?: PropertyValueSpecification<[number, number]>;
    "circle-translate-transition"?: TransitionSpecification;
    /**
     * Controls the frame of reference for `circle-translate`.
     *
     * @default
     * ```json
     * "map"
     * ```
     */
    "circle-translate-anchor"?: PropertyValueSpecification<"map" | "viewport">;
    /**
     * Controls the scaling behavior of the circle when the map is pitched.
     *
     * @default
     * ```json
     * "map"
     * ```
     */
    "circle-pitch-scale"?: PropertyValueSpecification<"map" | "viewport">;
    /**
     * Orientation of circle when map is pitched.
     *
     * @default
     * ```json
     * "viewport"
     * ```
     */
    "circle-pitch-alignment"?: PropertyValueSpecification<"map" | "viewport">;
    /**
     * The width of the circle's stroke. Strokes are placed outside of the `circle-radius`.
     */
    "circle-stroke-width"?: DataDrivenPropertyValueSpecification<number>;
    "circle-stroke-width-transition"?: TransitionSpecification;
    /**
     * The stroke color of the circle.
     *
     * @default
     * ```json
     * "#000000"
     * ```
     */
    "circle-stroke-color"?: DataDrivenPropertyValueSpecification<ColorSpecification>;
    "circle-stroke-color-transition"?: TransitionSpecification;
    /**
     * The opacity of the circle's stroke.
     *
     * @default
     * ```json
     * 1
     * ```
     */
    "circle-stroke-opacity"?: DataDrivenPropertyValueSpecification<number>;
    "circle-stroke-opacity-transition"?: TransitionSpecification;
  };
};
type HeatmapLayerSpecification = {
  /**
   * Unique layer name.
   */
  "id": string;
  "type": "heatmap";
  /**
   * Arbitrary properties useful to track with the layer, but do not influence rendering. Properties should be prefixed to avoid collisions, like 'maplibre:'.
   *
   * @example
   * ```json
   * {"source:comment": "Hydrology FCCODE 460 - Narrow wash"}
   * ```
   */
  "metadata"?: unknown;
  /**
   * Name of a source description to be used for this layer. Required for all layer types except `background`.
   */
  "source": string;
  /**
   * Layer to use from a vector tile source. Required for vector tile sources; prohibited for all other source types, including GeoJSON sources.
   */
  "source-layer"?: string;
  /**
   * The minimum zoom level for the layer. At zoom levels less than the minzoom, the layer will be hidden.
   */
  "minzoom"?: number;
  /**
   * The maximum zoom level for the layer. At zoom levels equal to or greater than the maxzoom, the layer will be hidden.
   */
  "maxzoom"?: number;
  /**
   * A expression specifying conditions on source features. Only features that match the filter are displayed. Zoom expressions in filters are only evaluated at integer zoom levels. The `feature-state` expression is not supported in filter expressions.
   */
  "filter"?: FilterSpecification;
  /**
   * Layout properties for the layer.
   */
  "layout"?: {
    /**
     * Whether this layer is displayed.
     *
     * @default
     * ```json
     * "visible"
     * ```
     */
    "visibility"?: VisibilitySpecification;
  };
  /**
   * Default paint properties for this layer.
   */
  "paint"?: {
    /**
     * Radius of influence of one heatmap point in pixels. Increasing the value makes the heatmap smoother, but less detailed.
     *
     * @default
     * ```json
     * 30
     * ```
     */
    "heatmap-radius"?: DataDrivenPropertyValueSpecification<number>;
    "heatmap-radius-transition"?: TransitionSpecification;
    /**
     * A measure of how much an individual point contributes to the heatmap. A value of 10 would be equivalent to having 10 points of weight 1 in the same spot. Especially useful when combined with clustering.
     *
     * @default
     * ```json
     * 1
     * ```
     */
    "heatmap-weight"?: DataDrivenPropertyValueSpecification<number>;
    /**
     * Similar to `heatmap-weight` but controls the intensity of the heatmap globally. Primarily used for adjusting the heatmap based on zoom level.
     *
     * @default
     * ```json
     * 1
     * ```
     */
    "heatmap-intensity"?: PropertyValueSpecification<number>;
    "heatmap-intensity-transition"?: TransitionSpecification;
    /**
     * Defines the color of each pixel based on its density value in a heatmap.  Should be an expression that uses `["heatmap-density"]` as input.
     *
     * @default
     * ```json
     * [
     *     "interpolate",
     *     ["linear"],
     *     ["heatmap-density"],
     *     0,
     *     "rgba(0, 0, 255, 0)",
     *     0.1,
     *     "royalblue",
     *     0.3,
     *     "cyan",
     *     0.5,
     *     "lime",
     *     0.7,
     *     "yellow",
     *     1,
     *     "red"
     * ]
     * ```
     */
    "heatmap-color"?: ExpressionSpecification;
    /**
     * The global opacity at which the heatmap layer will be drawn.
     *
     * @default
     * ```json
     * 1
     * ```
     */
    "heatmap-opacity"?: PropertyValueSpecification<number>;
    "heatmap-opacity-transition"?: TransitionSpecification;
  };
};
type FillExtrusionLayerSpecification = {
  /**
   * Unique layer name.
   */
  "id": string;
  "type": "fill-extrusion";
  /**
   * Arbitrary properties useful to track with the layer, but do not influence rendering. Properties should be prefixed to avoid collisions, like 'maplibre:'.
   *
   * @example
   * ```json
   * {"source:comment": "Hydrology FCCODE 460 - Narrow wash"}
   * ```
   */
  "metadata"?: unknown;
  /**
   * Name of a source description to be used for this layer. Required for all layer types except `background`.
   */
  "source": string;
  /**
   * Layer to use from a vector tile source. Required for vector tile sources; prohibited for all other source types, including GeoJSON sources.
   */
  "source-layer"?: string;
  /**
   * The minimum zoom level for the layer. At zoom levels less than the minzoom, the layer will be hidden.
   */
  "minzoom"?: number;
  /**
   * The maximum zoom level for the layer. At zoom levels equal to or greater than the maxzoom, the layer will be hidden.
   */
  "maxzoom"?: number;
  /**
   * A expression specifying conditions on source features. Only features that match the filter are displayed. Zoom expressions in filters are only evaluated at integer zoom levels. The `feature-state` expression is not supported in filter expressions.
   */
  "filter"?: FilterSpecification;
  /**
   * Layout properties for the layer.
   */
  "layout"?: {
    /**
     * Whether this layer is displayed.
     *
     * @default
     * ```json
     * "visible"
     * ```
     */
    "visibility"?: VisibilitySpecification;
  };
  /**
   * Default paint properties for this layer.
   */
  "paint"?: {
    /**
     * The opacity of the entire fill extrusion layer. This is rendered on a per-layer, not per-feature, basis, and data-driven styling is not available.
     *
     * @default
     * ```json
     * 1
     * ```
     */
    "fill-extrusion-opacity"?: PropertyValueSpecification<number>;
    "fill-extrusion-opacity-transition"?: TransitionSpecification;
    /**
     * The base color of the extruded fill. The extrusion's surfaces will be shaded differently based on this color in combination with the root `light` settings. If this color is specified as `rgba` with an alpha component, the alpha component will be ignored; use `fill-extrusion-opacity` to set layer opacity.
     *
     * @default
     * ```json
     * "#000000"
     * ```
     */
    "fill-extrusion-color"?: DataDrivenPropertyValueSpecification<ColorSpecification>;
    "fill-extrusion-color-transition"?: TransitionSpecification;
    /**
     * The geometry's offset. Values are [x, y] where negatives indicate left and up (on the flat plane), respectively.
     *
     * @default
     * ```json
     * [0, 0]
     * ```
     */
    "fill-extrusion-translate"?: PropertyValueSpecification<[number, number]>;
    "fill-extrusion-translate-transition"?: TransitionSpecification;
    /**
     * Controls the frame of reference for `fill-extrusion-translate`.
     *
     * @default
     * ```json
     * "map"
     * ```
     */
    "fill-extrusion-translate-anchor"?: PropertyValueSpecification<"map" | "viewport">;
    /**
     * Name of image in sprite to use for drawing images on extruded fills. For seamless patterns, image width and height must be a factor of two (2, 4, 8, ..., 512). Note that zoom-dependent expressions will be evaluated only at integer zoom levels.
     */
    "fill-extrusion-pattern"?: DataDrivenPropertyValueSpecification<ResolvedImageSpecification>;
    "fill-extrusion-pattern-transition"?: TransitionSpecification;
    /**
     * The height with which to extrude this layer.
     */
    "fill-extrusion-height"?: DataDrivenPropertyValueSpecification<number>;
    "fill-extrusion-height-transition"?: TransitionSpecification;
    /**
     * The height with which to extrude the base of this layer. Must be less than or equal to `fill-extrusion-height`.
     */
    "fill-extrusion-base"?: DataDrivenPropertyValueSpecification<number>;
    "fill-extrusion-base-transition"?: TransitionSpecification;
    /**
     * Whether to apply a vertical gradient to the sides of a fill-extrusion layer. If true, sides will be shaded slightly darker farther down.
     *
     * @default
     * ```json
     * true
     * ```
     */
    "fill-extrusion-vertical-gradient"?: PropertyValueSpecification<boolean>;
  };
};
type RasterLayerSpecification = {
  /**
   * Unique layer name.
   */
  "id": string;
  "type": "raster";
  /**
   * Arbitrary properties useful to track with the layer, but do not influence rendering. Properties should be prefixed to avoid collisions, like 'maplibre:'.
   *
   * @example
   * ```json
   * {"source:comment": "Hydrology FCCODE 460 - Narrow wash"}
   * ```
   */
  "metadata"?: unknown;
  /**
   * Name of a source description to be used for this layer. Required for all layer types except `background`.
   */
  "source": string;
  /**
   * Layer to use from a vector tile source. Required for vector tile sources; prohibited for all other source types, including GeoJSON sources.
   */
  "source-layer"?: string;
  /**
   * The minimum zoom level for the layer. At zoom levels less than the minzoom, the layer will be hidden.
   */
  "minzoom"?: number;
  /**
   * The maximum zoom level for the layer. At zoom levels equal to or greater than the maxzoom, the layer will be hidden.
   */
  "maxzoom"?: number;
  /**
   * A expression specifying conditions on source features. Only features that match the filter are displayed. Zoom expressions in filters are only evaluated at integer zoom levels. The `feature-state` expression is not supported in filter expressions.
   */
  "filter"?: FilterSpecification;
  /**
   * Layout properties for the layer.
   */
  "layout"?: {
    /**
     * Whether this layer is displayed.
     *
     * @default
     * ```json
     * "visible"
     * ```
     */
    "visibility"?: VisibilitySpecification;
  };
  /**
   * Default paint properties for this layer.
   */
  "paint"?: {
    /**
     * The opacity at which the image will be drawn.
     *
     * @default
     * ```json
     * 1
     * ```
     */
    "raster-opacity"?: PropertyValueSpecification<number>;
    "raster-opacity-transition"?: TransitionSpecification;
    /**
     * Rotates hues around the color wheel.
     */
    "raster-hue-rotate"?: PropertyValueSpecification<number>;
    "raster-hue-rotate-transition"?: TransitionSpecification;
    /**
     * Increase or reduce the brightness of the image. The value is the minimum brightness.
     */
    "raster-brightness-min"?: PropertyValueSpecification<number>;
    "raster-brightness-min-transition"?: TransitionSpecification;
    /**
     * Increase or reduce the brightness of the image. The value is the maximum brightness.
     *
     * @default
     * ```json
     * 1
     * ```
     */
    "raster-brightness-max"?: PropertyValueSpecification<number>;
    "raster-brightness-max-transition"?: TransitionSpecification;
    /**
     * Increase or reduce the saturation of the image.
     */
    "raster-saturation"?: PropertyValueSpecification<number>;
    "raster-saturation-transition"?: TransitionSpecification;
    /**
     * Increase or reduce the contrast of the image.
     */
    "raster-contrast"?: PropertyValueSpecification<number>;
    "raster-contrast-transition"?: TransitionSpecification;
    /**
     * The resampling/interpolation method to use for overscaling, also known as texture magnification filter.
     * ![Visual comparison of linear resampling versus nearest resampling](assets/resampling.png)
     *
     * @default
     * ```json
     * "linear"
     * ```
     */
    "resampling"?: PropertyValueSpecification<"linear" | "nearest">;
    /**
     * The resampling/interpolation method to use for overscaling, also known as texture magnification filter. It is advised to use the generic `resampling` paint property instead.
     *
     * @default
     * ```json
     * "linear"
     * ```
     */
    "raster-resampling"?: PropertyValueSpecification<"linear" | "nearest">;
    /**
     * Fade duration when a new tile is added, or when a video is started or its coordinates are updated.
     *
     * @default
     * ```json
     * 300
     * ```
     */
    "raster-fade-duration"?: PropertyValueSpecification<number>;
  };
};
type HillshadeLayerSpecification = {
  /**
   * Unique layer name.
   */
  "id": string;
  "type": "hillshade";
  /**
   * Arbitrary properties useful to track with the layer, but do not influence rendering. Properties should be prefixed to avoid collisions, like 'maplibre:'.
   *
   * @example
   * ```json
   * {"source:comment": "Hydrology FCCODE 460 - Narrow wash"}
   * ```
   */
  "metadata"?: unknown;
  /**
   * Name of a source description to be used for this layer. Required for all layer types except `background`.
   */
  "source": string;
  /**
   * Layer to use from a vector tile source. Required for vector tile sources; prohibited for all other source types, including GeoJSON sources.
   */
  "source-layer"?: string;
  /**
   * The minimum zoom level for the layer. At zoom levels less than the minzoom, the layer will be hidden.
   */
  "minzoom"?: number;
  /**
   * The maximum zoom level for the layer. At zoom levels equal to or greater than the maxzoom, the layer will be hidden.
   */
  "maxzoom"?: number;
  /**
   * A expression specifying conditions on source features. Only features that match the filter are displayed. Zoom expressions in filters are only evaluated at integer zoom levels. The `feature-state` expression is not supported in filter expressions.
   */
  "filter"?: FilterSpecification;
  /**
   * Layout properties for the layer.
   */
  "layout"?: {
    /**
     * Whether this layer is displayed.
     *
     * @default
     * ```json
     * "visible"
     * ```
     */
    "visibility"?: VisibilitySpecification;
  };
  /**
   * Default paint properties for this layer.
   */
  "paint"?: {
    /**
     * The direction of the light source(s) used to generate the hillshading with 0 as the top of the viewport if `hillshade-illumination-anchor` is set to `viewport` and due north if `hillshade-illumination-anchor` is set to `map`. Only when `hillshade-method` is set to `multidirectional` can you specify multiple light sources.
     *
     * @default
     * ```json
     * 335
     * ```
     */
    "hillshade-illumination-direction"?: PropertyValueSpecification<NumberArraySpecification>;
    /**
     * The altitude of the light source(s) used to generate the hillshading with 0 as sunset and 90 as noon. Only when `hillshade-method` is set to `multidirectional` can you specify multiple light sources.
     *
     * @default
     * ```json
     * 45
     * ```
     */
    "hillshade-illumination-altitude"?: PropertyValueSpecification<NumberArraySpecification>;
    /**
     * Direction of light source when map is rotated.
     *
     * @default
     * ```json
     * "viewport"
     * ```
     */
    "hillshade-illumination-anchor"?: PropertyValueSpecification<"map" | "viewport">;
    /**
     * Intensity of the hillshade
     *
     * @default
     * ```json
     * 0.5
     * ```
     */
    "hillshade-exaggeration"?: PropertyValueSpecification<number>;
    "hillshade-exaggeration-transition"?: TransitionSpecification;
    /**
     * The shading color of areas that face away from the light source(s). Only when `hillshade-method` is set to `multidirectional` can you specify multiple light sources.
     *
     * @default
     * ```json
     * "#000000"
     * ```
     */
    "hillshade-shadow-color"?: PropertyValueSpecification<ColorArraySpecification>;
    "hillshade-shadow-color-transition"?: TransitionSpecification;
    /**
     * The shading color of areas that faces towards the light source(s). Only when `hillshade-method` is set to `multidirectional` can you specify multiple light sources.
     *
     * @default
     * ```json
     * "#FFFFFF"
     * ```
     */
    "hillshade-highlight-color"?: PropertyValueSpecification<ColorArraySpecification>;
    "hillshade-highlight-color-transition"?: TransitionSpecification;
    /**
     * The shading color used to accentuate rugged terrain like sharp cliffs and gorges.
     *
     * @default
     * ```json
     * "#000000"
     * ```
     */
    "hillshade-accent-color"?: PropertyValueSpecification<ColorSpecification>;
    "hillshade-accent-color-transition"?: TransitionSpecification;
    /**
     * The hillshade algorithm to use, one of `standard`, `basic`, `combined`, `igor`, or `multidirectional`.
     * ![Visual comparison of standard, basic, igor, combined, and multidirectional hillshade-method](assets/hillshade_methods.png)
     *
     * @default
     * ```json
     * "standard"
     * ```
     */
    "hillshade-method"?: PropertyValueSpecification<"standard" | "basic" | "combined" | "igor" | "multidirectional">;
    /**
     * The resampling/interpolation method to use for overscaling, also known as texture magnification filter.
     * ![Visual comparison of linear resampling versus nearest resampling](assets/resampling.png)
     *
     * @default
     * ```json
     * "linear"
     * ```
     */
    "resampling"?: PropertyValueSpecification<"linear" | "nearest">;
  };
};
type ColorReliefLayerSpecification = {
  /**
   * Unique layer name.
   */
  "id": string;
  "type": "color-relief";
  /**
   * Arbitrary properties useful to track with the layer, but do not influence rendering. Properties should be prefixed to avoid collisions, like 'maplibre:'.
   *
   * @example
   * ```json
   * {"source:comment": "Hydrology FCCODE 460 - Narrow wash"}
   * ```
   */
  "metadata"?: unknown;
  /**
   * Name of a source description to be used for this layer. Required for all layer types except `background`.
   */
  "source": string;
  /**
   * Layer to use from a vector tile source. Required for vector tile sources; prohibited for all other source types, including GeoJSON sources.
   */
  "source-layer"?: string;
  /**
   * The minimum zoom level for the layer. At zoom levels less than the minzoom, the layer will be hidden.
   */
  "minzoom"?: number;
  /**
   * The maximum zoom level for the layer. At zoom levels equal to or greater than the maxzoom, the layer will be hidden.
   */
  "maxzoom"?: number;
  /**
   * A expression specifying conditions on source features. Only features that match the filter are displayed. Zoom expressions in filters are only evaluated at integer zoom levels. The `feature-state` expression is not supported in filter expressions.
   */
  "filter"?: FilterSpecification;
  /**
   * Layout properties for the layer.
   */
  "layout"?: {
    /**
     * Whether this layer is displayed.
     *
     * @default
     * ```json
     * "visible"
     * ```
     */
    "visibility"?: VisibilitySpecification;
  };
  /**
   * Default paint properties for this layer.
   */
  "paint"?: {
    /**
     * The opacity at which the color-relief will be drawn.
     *
     * @default
     * ```json
     * 1
     * ```
     */
    "color-relief-opacity"?: PropertyValueSpecification<number>;
    "color-relief-opacity-transition"?: TransitionSpecification;
    /**
     * Defines the color of each pixel based on its elevation. Should be an expression that uses `["elevation"]` as input.
     *
     * @example
     * ```json
     * [
     *     "interpolate",
     *     ["linear"],
     *     ["elevation"],
     *     0,
     *     "black",
     *     8849,
     *     "white"
     * ]
     * ```
     */
    "color-relief-color"?: ExpressionSpecification;
    /**
     * The resampling/interpolation method to use for overscaling, also known as texture magnification filter.
     * ![Visual comparison of linear resampling versus nearest resampling](assets/resampling.png)
     *
     * @default
     * ```json
     * "linear"
     * ```
     */
    "resampling"?: PropertyValueSpecification<"linear" | "nearest">;
  };
};
type BackgroundLayerSpecification = {
  /**
   * Unique layer name.
   */
  "id": string;
  "type": "background";
  /**
   * Arbitrary properties useful to track with the layer, but do not influence rendering. Properties should be prefixed to avoid collisions, like 'maplibre:'.
   *
   * @example
   * ```json
   * {"source:comment": "Hydrology FCCODE 460 - Narrow wash"}
   * ```
   */
  "metadata"?: unknown;
  /**
   * The minimum zoom level for the layer. At zoom levels less than the minzoom, the layer will be hidden.
   */
  "minzoom"?: number;
  /**
   * The maximum zoom level for the layer. At zoom levels equal to or greater than the maxzoom, the layer will be hidden.
   */
  "maxzoom"?: number;
  /**
   * Layout properties for the layer.
   */
  "layout"?: {
    /**
     * Whether this layer is displayed.
     *
     * @default
     * ```json
     * "visible"
     * ```
     */
    "visibility"?: VisibilitySpecification;
  };
  /**
   * Default paint properties for this layer.
   */
  "paint"?: {
    /**
     * The color with which the background will be drawn.
     *
     * @default
     * ```json
     * "#000000"
     * ```
     */
    "background-color"?: PropertyValueSpecification<ColorSpecification>;
    "background-color-transition"?: TransitionSpecification;
    /**
     * Name of image in sprite to use for drawing an image background. For seamless patterns, image width and height must be a factor of two (2, 4, 8, ..., 512). Note that zoom-dependent expressions will be evaluated only at integer zoom levels.
     */
    "background-pattern"?: PropertyValueSpecification<ResolvedImageSpecification>;
    "background-pattern-transition"?: TransitionSpecification;
    /**
     * The opacity at which the background will be drawn.
     *
     * @default
     * ```json
     * 1
     * ```
     */
    "background-opacity"?: PropertyValueSpecification<number>;
    "background-opacity-transition"?: TransitionSpecification;
  };
};
type LayerSpecification = FillLayerSpecification | LineLayerSpecification | SymbolLayerSpecification | CircleLayerSpecification | HeatmapLayerSpecification | FillExtrusionLayerSpecification | RasterLayerSpecification | HillshadeLayerSpecification | ColorReliefLayerSpecification | BackgroundLayerSpecification;
/**
 * Operations that can be performed by the diff.
 * Below are the operations and their arguments, the arguments should be aligned with the style methods in maplibre-gl-js.
 */
type DiffOperationsMap = {
  setStyle: [StyleSpecification];
  addLayer: [LayerSpecification, string | null];
  removeLayer: [string];
  setPaintProperty: [string, string, unknown, string | null];
  setLayoutProperty: [string, string, unknown, string | null];
  setFilter: [string, unknown];
  addSource: [string, SourceSpecification];
  removeSource: [string];
  setGeoJSONSourceData: [string, unknown];
  setLayerZoomRange: [string, number, number];
  setLayerProperty: [string, string, unknown];
  setCenter: [number[]];
  setCenterAltitude: [number];
  setZoom: [number];
  setBearing: [number];
  setPitch: [number];
  setRoll: [number];
  setSprite: [SpriteSpecification];
  setGlyphs: [string];
  setTransition: [TransitionSpecification];
  setLight: [LightSpecification];
  setTerrain: [TerrainSpecification];
  setSky: [SkySpecification];
  setProjection: [ProjectionSpecification];
  setGlobalState: [StateSpecification];
};
type DiffOperations = keyof DiffOperationsMap;
type DiffCommand<T extends DiffOperations> = {
  command: T;
  args: DiffOperationsMap[T];
};
/**
 * @param r Red component 0..1
 * @param g Green component 0..1
 * @param b Blue component 0..1
 * @param alpha Alpha component 0..1
 */
type RGBColor = [r: number, g: number, b: number, alpha: number];
/**
 * @param h Hue as degrees 0..360
 * @param c Chroma 0..~230
 * @param l Lightness as percentage 0..100
 * @param alpha Alpha component 0..1
 */
type HCLColor = [h: number, c: number, l: number, alpha: number];
/**
 * @param l Lightness as percentage 0..100
 * @param a A axis value -125..125
 * @param b B axis value -125..125
 * @param alpha Alpha component 0..1
 */
type LABColor = [l: number, a: number, b: number, alpha: number];
type InterpolationColorSpace = "rgb" | "hcl" | "lab";
/**
 * Color representation used by WebGL.
 * Defined in sRGB color space and pre-blended with alpha.
 * @private
 */
declare class Color {
  readonly r: number;
  readonly g: number;
  readonly b: number;
  readonly a: number;
  /**
   * @param r Red component premultiplied by `alpha` 0..1
   * @param g Green component premultiplied by `alpha` 0..1
   * @param b Blue component premultiplied by `alpha` 0..1
   * @param [alpha=1] Alpha component 0..1
   * @param [premultiplied=true] Whether the `r`, `g` and `b` values have already
   * been multiplied by alpha. If `true` nothing happens if `false` then they will
   * be multiplied automatically.
   */
  constructor(r: number, g: number, b: number, alpha?: number, premultiplied?: boolean);
  static black: Color;
  static white: Color;
  static transparent: Color;
  static red: Color;
  /**
   * Parses CSS color strings and converts colors to sRGB color space if needed.
   * Officially supported color formats:
   * - keyword, e.g. 'aquamarine' or 'steelblue'
   * - hex (with 3, 4, 6 or 8 digits), e.g. '#f0f' or '#e9bebea9'
   * - rgb and rgba, e.g. 'rgb(0,240,120)' or 'rgba(0%,94%,47%,0.1)' or 'rgb(0 240 120 / .3)'
   * - hsl and hsla, e.g. 'hsl(0,0%,83%)' or 'hsla(0,0%,83%,.5)' or 'hsl(0 0% 83% / 20%)'
   *
   * @param input CSS color string to parse.
   * @returns A `Color` instance, or `undefined` if the input is not a valid color string.
   */
  static parse(input: Color | string | undefined | null): Color | undefined;
  /**
   * Used in color interpolation and by 'to-rgba' expression.
   *
   * @returns Gien color, with reversed alpha blending, in sRGB color space.
   */
  get rgb(): RGBColor;
  /**
   * Used in color interpolation.
   *
   * @returns Gien color, with reversed alpha blending, in HCL color space.
   */
  get hcl(): HCLColor;
  /**
   * Used in color interpolation.
   *
   * @returns Gien color, with reversed alpha blending, in LAB color space.
   */
  get lab(): LABColor;
  /**
   * Lazy getter pattern. When getter is called for the first time lazy value
   * is calculated and then overwrites getter function in given object instance.
   *
   * @example:
   * const redColor = Color.parse('red');
   * let x = redColor.hcl; // this will invoke `get hcl()`, which will calculate
   * // the value of red in HCL space and invoke this `overwriteGetter` function
   * // which in turn will set a field with a key 'hcl' in the `redColor` object.
   * // In other words it will override `get hcl()` from its `Color` prototype
   * // with its own property: hcl = [calculated red value in hcl].
   * let y = redColor.hcl; // next call will no longer invoke getter but simply
   * // return the previously calculated value
   * x === y; // true - `x` is exactly the same object as `y`
   *
   * @param getterKey Getter key
   * @param lazyValue Lazily calculated value to be memoized by current instance
   * @private
   */
  private overwriteGetter;
  /**
   * Used by 'to-string' expression.
   *
   * @returns Serialized color in format `rgba(r,g,b,a)`
   * where r,g,b are numbers within 0..255 and alpha is number within 1..0
   *
   * @example
   * var purple = new Color.parse('purple');
   * purple.toString; // = "rgba(128,0,128,1)"
   * var translucentGreen = new Color.parse('rgba(26, 207, 26, .73)');
   * translucentGreen.toString(); // = "rgba(26,207,26,0.73)"
   */
  toString(): string;
  static interpolate(from: Color, to: Color, t: number, spaceKey?: InterpolationColorSpace): Color;
}
type ResolvedImageOptions = {
  name: string;
  available: boolean;
};
declare class ResolvedImage {
  name: string;
  available: boolean;
  constructor(options: ResolvedImageOptions);
  toString(): string;
  static fromString(name: string): ResolvedImage | null;
}
declare const VERTICAL_ALIGN_OPTIONS: readonly ["bottom", "center", "top"];
type VerticalAlign = (typeof VERTICAL_ALIGN_OPTIONS)[number];
declare class FormattedSection {
  text: string;
  image: ResolvedImage | null;
  scale: number | null;
  fontStack: string | null;
  textColor: Color | null;
  verticalAlign: VerticalAlign | null;
  constructor(text: string, image: ResolvedImage | null, scale: number | null, fontStack: string | null, textColor: Color | null, verticalAlign: VerticalAlign | null);
}
declare class Formatted {
  sections: Array<FormattedSection>;
  constructor(sections: Array<FormattedSection>);
  static fromString(unformatted: string): Formatted;
  isEmpty(): boolean;
  static factory(text: Formatted | string): Formatted;
  toString(): string;
}
interface Point2D$1 {
  x: number;
  y: number;
}
interface ICanonicalTileID {
  z: number;
  x: number;
  y: number;
  key: string;
  equals(id: ICanonicalTileID): boolean;
  url(urls: Array<string>, pixelRatio: number, scheme: string | null): string;
  isChildOf(parent: ICanonicalTileID): boolean;
  getTilePoint(coord: IMercatorCoordinate): Point2D$1;
  toString(): string;
}
interface IMercatorCoordinate {
  x: number;
  y: number;
  z: number;
  toLngLat(): ILngLat;
  toAltitude(): number;
  meterInMercatorCoordinateUnits(): number;
}
interface ILngLat {
  lng: number;
  lat: number;
  wrap(): ILngLat;
  toArray(): [number, number];
  distanceTo(lngLat: ILngLat): number;
  toString(): string;
}
declare class Collator {
  locale: string | null;
  sensitivity: "base" | "accent" | "case" | "variant";
  collator: Intl.Collator;
  constructor(caseSensitive: boolean, diacriticSensitive: boolean, locale: string | null);
  compare(lhs: string, rhs: string): number;
  resolvedLocale(): string;
}
/**
 * A set of four numbers representing padding around a box. Create instances from
 * bare arrays or numeric values using the static method `Padding.parse`.
 * @private
 */
declare class Padding {
  /** Padding values are in CSS order: top, right, bottom, left */
  values: [number, number, number, number];
  constructor(values: [number, number, number, number]);
  /**
   * Numeric padding values
   * @param input A padding value
   * @returns A `Padding` instance, or `undefined` if the input is not a valid padding value.
   */
  static parse(input?: number | number[] | Padding | null): Padding | undefined;
  toString(): string;
  static interpolate(from: Padding, to: Padding, t: number): Padding;
}
/**
 * An array of numbers. Create instances from
 * bare arrays or numeric values using the static method `NumberArray.parse`.
 * @private
 */
declare class NumberArray {
  values: number[];
  constructor(values: number[]);
  /**
   * Numeric NumberArray values
   * @param input A NumberArray value
   * @returns A `NumberArray` instance, or `undefined` if the input is not a valid NumberArray value.
   */
  static parse(input?: number | number[] | NumberArray | null): NumberArray | undefined;
  toString(): string;
  static interpolate(from: NumberArray, to: NumberArray, t: number): NumberArray;
}
/**
 * An array of colors. Create instances from
 * bare arrays or strings using the static method `ColorArray.parse`.
 * @private
 */
declare class ColorArray {
  values: Color[];
  constructor(values: Color[]);
  /**
   * ColorArray values
   * @param input A ColorArray value
   * @returns A `ColorArray` instance, or `undefined` if the input is not a valid ColorArray value.
   */
  static parse(input?: string | string[] | ColorArray | null): ColorArray | undefined;
  toString(): string;
  static interpolate(from: ColorArray, to: ColorArray, t: number, spaceKey?: InterpolationColorSpace): ColorArray;
}
/**
 * Utility class to assist managing values for text-variable-anchor-offset property. Create instances from
 * bare arrays using the static method `VariableAnchorOffsetCollection.parse`.
 * @private
 */
declare class VariableAnchorOffsetCollection {
  /** Series of paired of anchor (string) and offset (point) values */
  values: VariableAnchorOffsetCollectionSpecification;
  constructor(values: VariableAnchorOffsetCollectionSpecification);
  static parse(input?: VariableAnchorOffsetCollectionSpecification | VariableAnchorOffsetCollection): VariableAnchorOffsetCollection | undefined;
  toString(): string;
  static interpolate(from: VariableAnchorOffsetCollection, to: VariableAnchorOffsetCollection, t: number): VariableAnchorOffsetCollection;
}
declare class ProjectionDefinition {
  readonly from: string;
  readonly to: string;
  readonly transition: number;
  constructor(from: string, to: string, transition: number);
  static interpolate(from: string, to: string, t: number): ProjectionDefinition;
  static parse(input?: any): ProjectionDefinition;
}
type Value = null | string | boolean | number | Color | ProjectionDefinition | Collator | Formatted | Padding | NumberArray | ColorArray | ResolvedImage | VariableAnchorOffsetCollection | ReadonlyArray<Value> | {
  readonly [x: string]: Value;
};
type InterpolationType = {
  name: "linear";
} | {
  name: "exponential";
  base: number;
} | {
  name: "cubic-bezier";
  controlPoints: [number, number, number, number];
};
type Feature = {
  readonly type: 0 | 1 | 2 | 3 | "Unknown" | "Point" | "MultiPoint" | "LineString" | "MultiLineString" | "Polygon" | "MultiPolygon";
  readonly id?: any;
  readonly properties: {
    [_: string]: any;
  };
  readonly patterns?: {
    [_: string]: {
      min: string;
      mid: string;
      max: string;
    };
  };
  readonly dashes?: {
    [_: string]: {
      min: string;
      mid: string;
      max: string;
    };
  };
  readonly geometry?: Array<Array<Point2D$1>>;
};
type FeatureState = {
  [_: string]: any;
};
type GlobalProperties = Readonly<{
  zoom: number;
  heatmapDensity?: number;
  elevation?: number;
  lineProgress?: number;
  isSupportedScript?: (_: string) => boolean;
  accumulated?: Value;
  globalState?: Record<string, any>;
}>;
type ConstantExpression = {
  kind: "constant";
  globalStateRefs: Set<string>;
  readonly _globalState: Record<string, any>;
  readonly evaluate: (globals: GlobalProperties, feature?: Feature, featureState?: FeatureState, canonical?: ICanonicalTileID, availableImages?: Array<string>) => any;
};
type SourceExpression = {
  kind: "source";
  isStateDependent: boolean;
  globalStateRefs: Set<string>;
  readonly _globalState: Record<string, any>;
  readonly evaluate: (globals: GlobalProperties, feature?: Feature, featureState?: FeatureState, canonical?: ICanonicalTileID, availableImages?: Array<string>, formattedSection?: FormattedSection) => any;
};
type CameraExpression = {
  kind: "camera";
  globalStateRefs: Set<string>;
  readonly _globalState: Record<string, any>;
  readonly evaluate: (globals: GlobalProperties, feature?: Feature, featureState?: FeatureState, canonical?: ICanonicalTileID, availableImages?: Array<string>) => any;
  readonly interpolationFactor: (input: number, lower: number, upper: number) => number;
  zoomStops: Array<number>;
  interpolationType: InterpolationType;
};
type CompositeExpression = {
  kind: "composite";
  isStateDependent: boolean;
  globalStateRefs: Set<string>;
  readonly _globalState: Record<string, any>;
  readonly evaluate: (globals: GlobalProperties, feature?: Feature, featureState?: FeatureState, canonical?: ICanonicalTileID, availableImages?: Array<string>, formattedSection?: FormattedSection) => any;
  readonly interpolationFactor: (input: number, lower: number, upper: number) => number;
  zoomStops: Array<number>;
  interpolationType: InterpolationType;
};
type StylePropertyExpression = ConstantExpression | SourceExpression | CameraExpression | CompositeExpression;
type FilterExpression = (globalProperties: GlobalProperties, feature: Feature, canonical?: ICanonicalTileID) => boolean;
type FeatureFilter = {
  filter: FilterExpression;
  needGeometry: boolean;
  getGlobalStateRefs: () => Set<string>;
};
interface VisibilityExpression {
  /**
   * Evaluates the visibility expression and returns either 'visible' or 'none'.
   */
  evaluate: () => "visible" | "none";
  /**
   * Updates the visibility specification.
   */
  setValue: (visibility: VisibilitySpecification) => void;
  /**
   * Returns the set of global state properties referenced by the expression.
   */
  getGlobalStateRefs: () => Set<string>;
}
type ExpressionType = "data-driven" | "cross-faded" | "cross-faded-data-driven" | "color-ramp" | "data-constant" | "constant";
type ExpressionParameters = Array<"zoom" | "feature" | "feature-state" | "heatmap-density" | "elevation" | "line-progress" | "global-state">;
type ExpressionSpecificationDefinition = {
  interpolated: boolean;
  parameters: ExpressionParameters;
};
type StylePropertySpecification = {
  type: "number";
  "property-type": ExpressionType;
  expression?: ExpressionSpecificationDefinition;
  transition: boolean;
  default?: number;
} | {
  type: "string";
  "property-type": ExpressionType;
  expression?: ExpressionSpecificationDefinition;
  transition: boolean;
  default?: string;
  tokens?: boolean;
} | {
  type: "boolean";
  "property-type": ExpressionType;
  expression?: ExpressionSpecificationDefinition;
  transition: boolean;
  default?: boolean;
} | {
  type: "enum";
  "property-type": ExpressionType;
  expression?: ExpressionSpecificationDefinition;
  values: {
    [_: string]: {};
  };
  transition: boolean;
  default?: string;
} | {
  type: "color";
  "property-type": ExpressionType;
  expression?: ExpressionSpecificationDefinition;
  transition: boolean;
  default?: ColorSpecification;
  overridable: boolean;
} | {
  type: "array";
  value: "number";
  "property-type": ExpressionType;
  expression?: ExpressionSpecificationDefinition;
  length?: number;
  transition: boolean;
  default?: Array<number>;
} | {
  type: "array";
  value: "string";
  "property-type": ExpressionType;
  expression?: ExpressionSpecificationDefinition;
  length?: number;
  transition: boolean;
  default?: Array<string>;
} | {
  type: "padding";
  "property-type": ExpressionType;
  expression?: ExpressionSpecificationDefinition;
  transition: boolean;
  default?: PaddingSpecification;
} | {
  type: "numberArray";
  "property-type": ExpressionType;
  expression?: ExpressionSpecificationDefinition;
  transition: boolean;
  default?: NumberArraySpecification;
} | {
  type: "colorArray";
  "property-type": ExpressionType;
  expression?: ExpressionSpecificationDefinition;
  transition: boolean;
  default?: ColorArraySpecification;
} | {
  type: "variableAnchorOffsetCollection";
  "property-type": ExpressionType;
  expression?: ExpressionSpecificationDefinition;
  transition: boolean;
  default?: VariableAnchorOffsetCollectionSpecification;
} | {
  type: "projectionDefinition";
  "property-type": ExpressionType;
  expression?: ExpressionSpecificationDefinition;
  transition: boolean;
  default?: ProjectionDefinitionSpecification;
};
//#endregion
//#region node_modules/@mapbox/point-geometry/index.d.ts
/**
 * A standalone point geometry with useful accessor, comparison, and
 * modification methods.
 *
 * @class
 * @param {number} x the x-coordinate. This could be longitude or screen pixels, or any other sort of unit.
 * @param {number} y the y-coordinate. This could be latitude or screen pixels, or any other sort of unit.
 *
 * @example
 * const point = new Point(-77, 38);
 */
declare function Point(x: number, y: number): void;
declare class Point {
  /**
   * A standalone point geometry with useful accessor, comparison, and
   * modification methods.
   *
   * @class
   * @param {number} x the x-coordinate. This could be longitude or screen pixels, or any other sort of unit.
   * @param {number} y the y-coordinate. This could be latitude or screen pixels, or any other sort of unit.
   *
   * @example
   * const point = new Point(-77, 38);
   */
  constructor(x: number, y: number);
  x: number;
  y: number;
  /**
   * Clone this point, returning a new point that can be modified
   * without affecting the old one.
   * @return {Point} the clone
   */
  clone(): Point;
  /**
   * Add this point's x & y coordinates to another point,
   * yielding a new point.
   * @param {Point} p the other point
   * @return {Point} output point
   */
  add(p: Point): Point;
  /**
   * Subtract this point's x & y coordinates to from point,
   * yielding a new point.
   * @param {Point} p the other point
   * @return {Point} output point
   */
  sub(p: Point): Point;
  /**
   * Multiply this point's x & y coordinates by point,
   * yielding a new point.
   * @param {Point} p the other point
   * @return {Point} output point
   */
  multByPoint(p: Point): Point;
  /**
   * Divide this point's x & y coordinates by point,
   * yielding a new point.
   * @param {Point} p the other point
   * @return {Point} output point
   */
  divByPoint(p: Point): Point;
  /**
   * Multiply this point's x & y coordinates by a factor,
   * yielding a new point.
   * @param {number} k factor
   * @return {Point} output point
   */
  mult(k: number): Point;
  /**
   * Divide this point's x & y coordinates by a factor,
   * yielding a new point.
   * @param {number} k factor
   * @return {Point} output point
   */
  div(k: number): Point;
  /**
   * Rotate this point around the 0, 0 origin by an angle a,
   * given in radians
   * @param {number} a angle to rotate around, in radians
   * @return {Point} output point
   */
  rotate(a: number): Point;
  /**
   * Rotate this point around p point by an angle a,
   * given in radians
   * @param {number} a angle to rotate around, in radians
   * @param {Point} p Point to rotate around
   * @return {Point} output point
   */
  rotateAround(a: number, p: Point): Point;
  /**
   * Multiply this point by a 4x1 transformation matrix
   * @param {[number, number, number, number]} m transformation matrix
   * @return {Point} output point
   */
  matMult(m: [number, number, number, number]): Point;
  /**
   * Calculate this point but as a unit vector from 0, 0, meaning
   * that the distance from the resulting point to the 0, 0
   * coordinate will be equal to 1 and the angle from the resulting
   * point to the 0, 0 coordinate will be the same as before.
   * @return {Point} unit vector point
   */
  unit(): Point;
  /**
   * Compute a perpendicular point, where the new y coordinate
   * is the old x coordinate and the new x coordinate is the old y
   * coordinate multiplied by -1
   * @return {Point} perpendicular point
   */
  perp(): Point;
  /**
   * Return a version of this point with the x & y coordinates
   * rounded to integers.
   * @return {Point} rounded point
   */
  round(): Point;
  /**
   * Return the magnitude of this point: this is the Euclidean
   * distance from the 0, 0 coordinate to this point's x and y
   * coordinates.
   * @return {number} magnitude
   */
  mag(): number;
  /**
   * Judge whether this point is equal to another point, returning
   * true or false.
   * @param {Point} other the other point
   * @return {boolean} whether the points are equal
   */
  equals(other: Point): boolean;
  /**
   * Calculate the distance from this point to another point
   * @param {Point} p the other point
   * @return {number} distance
   */
  dist(p: Point): number;
  /**
   * Calculate the distance from this point to another point,
   * without the square root step. Useful if you're comparing
   * relative distances.
   * @param {Point} p the other point
   * @return {number} distance
   */
  distSqr(p: Point): number;
  /**
   * Get the angle from the 0, 0 coordinate to this point, in radians
   * coordinates.
   * @return {number} angle
   */
  angle(): number;
  /**
   * Get the angle from this point to another point, in radians
   * @param {Point} b the other point
   * @return {number} angle
   */
  angleTo(b: Point): number;
  /**
   * Get the angle between this point and another point, in radians
   * @param {Point} b the other point
   * @return {number} angle
   */
  angleWith(b: Point): number;
  /**
   * Find the angle of the two vectors, solving the formula for
   * the cross product a x b = |a||b|sin(θ) for θ.
   * @param {number} x the x-coordinate
   * @param {number} y the y-coordinate
   * @return {number} the angle in radians
   */
  angleWithSep(x: number, y: number): number;
  /** @param {[number, number, number, number]} m */
  _matMult(m: [number, number, number, number]): this;
  /** @param {Point} p */
  _add(p: Point): this;
  /** @param {Point} p */
  _sub(p: Point): this;
  /** @param {number} k */
  _mult(k: number): this;
  /** @param {number} k */
  _div(k: number): this;
  /** @param {Point} p */
  _multByPoint(p: Point): this;
  /** @param {Point} p */
  _divByPoint(p: Point): this;
  _unit(): this;
  _perp(): this;
  /** @param {number} angle */
  _rotate(angle: number): this;
  /**
   * @param {number} angle
   * @param {Point} p
   */
  _rotateAround(angle: number, p: Point): this;
  _round(): this;
}
declare namespace Point {
  /**
   * Construct a point from an array if necessary, otherwise if the input
   * is already a Point, return it unchanged.
   * @param {Point | [number, number] | {x: number, y: number}} p input value
   * @return {Point} constructed point.
   * @example
   * // this
   * var point = Point.convert([0, 1]);
   * // is equivalent to
   * var point = new Point(0, 1);
   */
  function convert(p: Point | [number, number] | {
    x: number;
    y: number;
  }): Point;
}
//#endregion
//#region node_modules/@mapbox/tiny-sdf/index.d.ts
declare type TinySDFOptions = {
  fontSize?: number;
  buffer?: number;
  radius?: number;
  cutoff?: number;
  fontFamily?: string;
  fontWeight?: string;
  fontStyle?: string;
  lang?: string;
};
declare class TinySDF {
  constructor(options: TinySDFOptions);
  draw(char: string): {
    data: Uint8ClampedArray;
    width: number;
    height: number;
    glyphWidth: number;
    glyphHeight: number;
    glyphTop: number;
    glyphLeft: number;
    glyphAdvance: number;
  };
}
//#endregion
//#region node_modules/@maplibre/geojson-vt/dist/definitions.d.ts
type GeoJSONVTOptions = {
  /**
   * Max zoom to preserve detail on
   * @default 14
   */
  maxZoom?: number;
  /**
   * Max zoom in the tile index
   * @default 5
   */
  indexMaxZoom?: number;
  /**
   * Max number of points per tile in the tile index
   * @default 100000
   */
  indexMaxPoints?: number;
  /**
   * Simplification tolerance (higher means simpler)
   * @default 3
   */
  tolerance?: number;
  /**
   * Tile extent
   * @default 4096
   */
  extent?: number;
  /**
   * Tile buffer on each side
   * @default 64
   */
  buffer?: number;
  /**
   * Whether to calculate line metrics
   * @default false
   */
  lineMetrics?: boolean;
  /**
   * Name of a feature property to be promoted to feature.id
   */
  promoteId?: string | null;
  /**
   * Whether to generate feature ids. Cannot be used with promoteId
   * @default false
   */
  generateId?: boolean;
  /**
   * Whether geojson can be updated (with caveat of a stored simplified copy)
   * @default false
   */
  updateable?: boolean;
  /**
   * Logging level (0, 1 or 2)
   * @default 0
   */
  debug?: number;
  /**
   * Enable Supercluster for point features.
   * @default false
   */
  cluster?: boolean;
  /**
   * Options for the Supercluster point clustering algorithm.
   * @see {@link SuperclusterOptions}
   */
  clusterOptions?: SuperclusterOptions;
};
type SuperclusterOptions = {
  /**
   * Min zoom to generate clusters on
   * @default 0
   */
  minZoom?: number;
  /**
   * Max zoom level to cluster the points on
   * @default 16
   */
  maxZoom?: number;
  /**
   * Minimum points to form a cluster
   * @default 2
   */
  minPoints?: number;
  /**
   * Cluster radius in pixels
   * @default 40
   */
  radius?: number;
  /**
   * Tile extent (radius is calculated relative to it)
   * @default 512
   */
  extent?: number;
  /**
   * Size of the KD-tree leaf node, affects performance
   * @default 64
   */
  nodeSize?: number;
  /**
   * Whether to log timing info
   * @default false
   */
  log?: boolean;
  /**
   * Whether to generate numeric ids for input features (in vector tiles)
   * @default false
   */
  generateId?: boolean;
  /**
   * A reduce function for calculating custom cluster properties
   * @default null
   */
  reduce?: ((accumulated: Record<string, unknown>, props: Record<string, unknown>) => void) | null;
  /**
   * Properties to use for individual points when running the reducer
   * @default props => props
   */
  map?: (props: GeoJSON.GeoJsonProperties) => Record<string, unknown>;
};
//#endregion
//#region node_modules/kdbush/index.d.ts
declare class KDBush {
  /**
   * Creates an index from raw `ArrayBuffer` data.
   * @param {ArrayBuffer} data
   */
  static from(data: ArrayBuffer): KDBush;
  /**
   * Creates an index that will hold a given number of items.
   * @param {number} numItems
   * @param {number} [nodeSize=64] Size of the KD-tree node (64 by default).
   * @param {TypedArrayConstructor} [ArrayType=Float64Array] The array type used for coordinates storage (`Float64Array` by default).
   * @param {ArrayBuffer} [data] (For internal use only)
   */
  constructor(numItems: number, nodeSize?: number | undefined, ArrayType?: TypedArrayConstructor | undefined, data?: ArrayBuffer | undefined);
  numItems: number;
  nodeSize: number;
  ArrayType: TypedArrayConstructor;
  IndexArrayType: Uint16ArrayConstructor | Uint32ArrayConstructor;
  data: ArrayBuffer;
  ids: Uint16Array | Uint32Array;
  coords: Int8Array | Uint8Array | Uint8ClampedArray | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array;
  _pos: number;
  _finished: boolean;
  /**
   * Add a point to the index.
   * @param {number} x
   * @param {number} y
   * @returns {number} An incremental index associated with the added item (starting from `0`).
   */
  add(x: number, y: number): number;
  /**
   * Perform indexing of the added points.
   */
  finish(): KDBush;
  /**
   * Search the index for items within a given bounding box.
   * @param {number} minX
   * @param {number} minY
   * @param {number} maxX
   * @param {number} maxY
   * @returns {number[]} An array of indices correponding to the found items.
   */
  range(minX: number, minY: number, maxX: number, maxY: number): number[];
  /**
   * Search the index for items within a given radius.
   * @param {number} qx
   * @param {number} qy
   * @param {number} r Query radius.
   * @returns {number[]} An array of indices correponding to the found items.
   */
  within(qx: number, qy: number, r: number): number[];
}
type TypedArrayConstructor = Int8ArrayConstructor | Uint8ArrayConstructor | Uint8ClampedArrayConstructor | Int16ArrayConstructor | Uint16ArrayConstructor | Int32ArrayConstructor | Uint32ArrayConstructor | Float32ArrayConstructor | Float64ArrayConstructor;
//#endregion
//#region node_modules/@maplibre/vt-pbf/dist/lib/types.d.ts
interface VectorTileFeatureLike {
  type: 0 | 1 | 2 | 3;
  properties: Record<string, number | string | boolean>;
  id: number | undefined;
  extent: number;
  loadGeometry(): Point[][];
}
interface VectorTileLayerLike {
  version: number;
  name: string;
  extent: number;
  length: number;
  feature(i: number): VectorTileFeatureLike;
}
//#endregion
//#region node_modules/potpack/index.d.ts
type PotpackBox = {
  /**
   * Box width.
   */
  w: number;
  /**
   * Box height.
   */
  h: number;
  /**
   * X coordinate in the resulting container.
   */
  x?: number | undefined;
  /**
   * Y coordinate in the resulting container.
   */
  y?: number | undefined;
};
//#endregion
//#region node_modules/maplibre-gl/dist/maplibre-gl.d.ts
/**
 * A type used to store the tile's expiration date and cache control definition
 */
type ExpiryData = {
  cacheControl?: string | null;
  expires?: Date | string | null;
  etag?: string;
};
/**
 * A `RequestParameters` object to be returned from Map.options.transformRequest callbacks.
 * @example
 * ```ts
 * // use transformRequest to modify requests that begin with `http://myHost`
 * transformRequest: function(url, resourceType) {
 *  if (resourceType === 'Source' && url.indexOf('http://myHost') > -1) {
 *    return {
 *      url: url.replace('http', 'https'),
 *      headers: { 'my-custom-header': true },
 *      credentials: 'include'  // Include cookies for cross-origin requests
 *    }
 *   }
 * }
 * ```
 */
type RequestParameters = {
  /**
   * The URL to be requested.
   */
  url: string;
  /**
   * The headers to be sent with the request.
   */
  headers?: any;
  /**
   * Request method `'GET' | 'POST' | 'PUT'`.
   */
  method?: "GET" | "POST" | "PUT";
  /**
   * Request body.
   */
  body?: string;
  /**
   * Response body type to be returned.
   */
  type?: "string" | "json" | "arrayBuffer" | "image";
  /**
   * `'same-origin'|'include'` Use 'include' to send cookies with cross-origin requests.
   */
  credentials?: "same-origin" | "include";
  /**
   * If `true`, Resource Timing API information will be collected for these transformed requests and returned in a resourceTiming property of relevant data events.
   */
  collectResourceTiming?: boolean;
  /**
   * Parameters supported only by browser fetch API. Property of the Request interface contains the cache mode of the request. It controls how the request will interact with the browser's HTTP cache. (https://developer.mozilla.org/en-US/docs/Web/API/Request/cache)
   */
  cache?: RequestCache;
  /**
   * The referrer policy to use for the request. Controls how much referrer information is sent. (https://developer.mozilla.org/en-US/docs/Web/API/Request/referrerPolicy)
   */
  referrerPolicy?: ReferrerPolicy;
};
/**
 * The response object returned from a successful AJAx request
 */
type GetResourceResponse<T> = ExpiryData & {
  data: T;
};
type SerializedObject<S extends Serialized = any> = {
  [_: string]: S;
};
type Serialized = null | void | boolean | number | string | Boolean | Number | String | Date | RegExp | ArrayBuffer | ArrayBufferView | ImageData | ImageBitmap | Blob | Array<Serialized> | SerializedObject;
declare class ThrottledInvoker {
  _channel: MessageChannel | undefined;
  _triggered: boolean;
  _methodToThrottle: Function;
  constructor(methodToThrottle: Function);
  trigger(): void;
  remove(): void;
}
declare const viewTypes: {
  Int8: Int8ArrayConstructor;
  Uint8: Uint8ArrayConstructor;
  Int16: Int16ArrayConstructor;
  Uint16: Uint16ArrayConstructor;
  Int32: Int32ArrayConstructor;
  Uint32: Uint32ArrayConstructor;
  Float32: Float32ArrayConstructor;
};
type ViewType = keyof typeof viewTypes;
declare class Struct {
  _pos1: number;
  _pos2: number;
  _pos4: number;
  _pos8: number;
  readonly _structArray: StructArray;
  size: number;
  /**
   * @param structArray - The StructArray the struct is stored in
   * @param index - The index of the struct in the StructArray.
   */
  constructor(structArray: StructArray, index: number);
}
type StructArrayMember = {
  name: string;
  type: ViewType;
  components: number;
  offset: number;
};
type SerializedStructArray = {
  length: number;
  arrayBuffer: ArrayBuffer;
};
declare abstract class StructArray {
  capacity: number;
  length: number;
  isTransferred: boolean;
  arrayBuffer: ArrayBuffer;
  uint8: Uint8Array;
  members: Array<StructArrayMember>;
  bytesPerElement: number;
  abstract emplaceBack(...v: number[]): any;
  abstract emplace(i: number, ...v: number[]): any;
  constructor();
  /**
   * Serialize a StructArray instance.  Serializes both the raw data and the
   * metadata needed to reconstruct the StructArray base class during
   * deserialization.
   */
  static serialize(array: StructArray, transferables?: Array<Transferable>): SerializedStructArray;
  static deserialize(input: SerializedStructArray): any;
  /**
   * Resize the array to discard unused capacity.
   */
  _trim(): void;
  /**
   * Resets the length of the array to 0 without de-allocating capacity.
   */
  clear(): void;
  /**
   * Resize the array.
   * If `n` is greater than the current length then additional elements with undefined values are added.
   * If `n` is less than the current length then the array will be reduced to the first `n` elements.
   * @param n - The new size of the array.
   */
  resize(n: number): void;
  /**
   * Indicate a planned increase in size, so that any necessary allocation may
   * be done once, ahead of time.
   * @param n - The expected size of the array.
   */
  reserve(n: number): void;
  /**
   * Create TypedArray views for the current ArrayBuffer.
   */
  _refreshViews(): void;
  /**
   * Replace the buffer with an empty one so typed views release the original ArrayBuffer for GC.
   */
  freeBufferAfterUpload(): void;
}
declare class StructArrayLayout2i4 extends StructArray {
  uint8: Uint8Array;
  int16: Int16Array;
  _refreshViews(): void;
  emplaceBack(v0: number, v1: number): number;
  emplace(i: number, v0: number, v1: number): number;
}
declare class StructArrayLayout3i6 extends StructArray {
  uint8: Uint8Array;
  int16: Int16Array;
  _refreshViews(): void;
  emplaceBack(v0: number, v1: number, v2: number): number;
  emplace(i: number, v0: number, v1: number, v2: number): number;
}
declare class StructArrayLayout2i4i12 extends StructArray {
  uint8: Uint8Array;
  int16: Int16Array;
  _refreshViews(): void;
  emplaceBack(v0: number, v1: number, v2: number, v3: number, v4: number, v5: number): number;
  emplace(i: number, v0: number, v1: number, v2: number, v3: number, v4: number, v5: number): number;
}
declare class StructArrayLayout2i4ub8 extends StructArray {
  uint8: Uint8Array;
  int16: Int16Array;
  _refreshViews(): void;
  emplaceBack(v0: number, v1: number, v2: number, v3: number, v4: number, v5: number): number;
  emplace(i: number, v0: number, v1: number, v2: number, v3: number, v4: number, v5: number): number;
}
declare class StructArrayLayout2f8 extends StructArray {
  uint8: Uint8Array;
  float32: Float32Array;
  _refreshViews(): void;
  emplaceBack(v0: number, v1: number): number;
  emplace(i: number, v0: number, v1: number): number;
}
declare class StructArrayLayout4i4ui4i24 extends StructArray {
  uint8: Uint8Array;
  int16: Int16Array;
  uint16: Uint16Array;
  _refreshViews(): void;
  emplaceBack(v0: number, v1: number, v2: number, v3: number, v4: number, v5: number, v6: number, v7: number, v8: number, v9: number, v10: number, v11: number): number;
  emplace(i: number, v0: number, v1: number, v2: number, v3: number, v4: number, v5: number, v6: number, v7: number, v8: number, v9: number, v10: number, v11: number): number;
}
declare class StructArrayLayout3f12 extends StructArray {
  uint8: Uint8Array;
  float32: Float32Array;
  _refreshViews(): void;
  emplaceBack(v0: number, v1: number, v2: number): number;
  emplace(i: number, v0: number, v1: number, v2: number): number;
}
declare class StructArrayLayout1ul4 extends StructArray {
  uint8: Uint8Array;
  uint32: Uint32Array;
  _refreshViews(): void;
  emplaceBack(v0: number): number;
  emplace(i: number, v0: number): number;
}
declare class StructArrayLayout6i1ul2ui20 extends StructArray {
  uint8: Uint8Array;
  int16: Int16Array;
  uint32: Uint32Array;
  uint16: Uint16Array;
  _refreshViews(): void;
  emplaceBack(v0: number, v1: number, v2: number, v3: number, v4: number, v5: number, v6: number, v7: number, v8: number): number;
  emplace(i: number, v0: number, v1: number, v2: number, v3: number, v4: number, v5: number, v6: number, v7: number, v8: number): number;
}
declare class StructArrayLayout2ub2f2i16 extends StructArray {
  uint8: Uint8Array;
  float32: Float32Array;
  int16: Int16Array;
  _refreshViews(): void;
  emplaceBack(v0: number, v1: number, v2: number, v3: number, v4: number, v5: number): number;
  emplace(i: number, v0: number, v1: number, v2: number, v3: number, v4: number, v5: number): number;
}
declare class StructArrayLayout3ui6 extends StructArray {
  uint8: Uint8Array;
  uint16: Uint16Array;
  _refreshViews(): void;
  emplaceBack(v0: number, v1: number, v2: number): number;
  emplace(i: number, v0: number, v1: number, v2: number): number;
}
declare class StructArrayLayout2i2ui3ul3ui2f3ub1ul1i48 extends StructArray {
  uint8: Uint8Array;
  int16: Int16Array;
  uint16: Uint16Array;
  uint32: Uint32Array;
  float32: Float32Array;
  _refreshViews(): void;
  emplaceBack(v0: number, v1: number, v2: number, v3: number, v4: number, v5: number, v6: number, v7: number, v8: number, v9: number, v10: number, v11: number, v12: number, v13: number, v14: number, v15: number, v16: number): number;
  emplace(i: number, v0: number, v1: number, v2: number, v3: number, v4: number, v5: number, v6: number, v7: number, v8: number, v9: number, v10: number, v11: number, v12: number, v13: number, v14: number, v15: number, v16: number): number;
}
declare class StructArrayLayout8i15ui1ul2f2ui64 extends StructArray {
  uint8: Uint8Array;
  int16: Int16Array;
  uint16: Uint16Array;
  uint32: Uint32Array;
  float32: Float32Array;
  _refreshViews(): void;
  emplaceBack(v0: number, v1: number, v2: number, v3: number, v4: number, v5: number, v6: number, v7: number, v8: number, v9: number, v10: number, v11: number, v12: number, v13: number, v14: number, v15: number, v16: number, v17: number, v18: number, v19: number, v20: number, v21: number, v22: number, v23: number, v24: number, v25: number, v26: number, v27: number): number;
  emplace(i: number, v0: number, v1: number, v2: number, v3: number, v4: number, v5: number, v6: number, v7: number, v8: number, v9: number, v10: number, v11: number, v12: number, v13: number, v14: number, v15: number, v16: number, v17: number, v18: number, v19: number, v20: number, v21: number, v22: number, v23: number, v24: number, v25: number, v26: number, v27: number): number;
}
declare class StructArrayLayout1f4 extends StructArray {
  uint8: Uint8Array;
  float32: Float32Array;
  _refreshViews(): void;
  emplaceBack(v0: number): number;
  emplace(i: number, v0: number): number;
}
declare class StructArrayLayout1ui2f12 extends StructArray {
  uint8: Uint8Array;
  uint16: Uint16Array;
  float32: Float32Array;
  _refreshViews(): void;
  emplaceBack(v0: number, v1: number, v2: number): number;
  emplace(i: number, v0: number, v1: number, v2: number): number;
}
declare class StructArrayLayout1ul2ui8 extends StructArray {
  uint8: Uint8Array;
  uint32: Uint32Array;
  uint16: Uint16Array;
  _refreshViews(): void;
  emplaceBack(v0: number, v1: number, v2: number): number;
  emplace(i: number, v0: number, v1: number, v2: number): number;
}
declare class StructArrayLayout2ui4 extends StructArray {
  uint8: Uint8Array;
  uint16: Uint16Array;
  _refreshViews(): void;
  emplaceBack(v0: number, v1: number): number;
  emplace(i: number, v0: number, v1: number): number;
}
declare class StructArrayLayout1ui2 extends StructArray {
  uint8: Uint8Array;
  uint16: Uint16Array;
  _refreshViews(): void;
  emplaceBack(v0: number): number;
  emplace(i: number, v0: number): number;
}
declare class CollisionBoxStruct extends Struct {
  _structArray: CollisionBoxArray;
  get anchorPointX(): number;
  get anchorPointY(): number;
  get x1(): number;
  get y1(): number;
  get x2(): number;
  get y2(): number;
  get featureIndex(): number;
  get sourceLayerIndex(): number;
  get bucketIndex(): number;
  get anchorPoint(): Point;
}
/** @internal */
declare class CollisionBoxArray extends StructArrayLayout6i1ul2ui20 {
  /**
   * Return the CollisionBoxStruct at the given location in the array.
   * @param index - The index of the element.
   */
  get(index: number): CollisionBoxStruct;
}
declare class PlacedSymbolStruct extends Struct {
  _structArray: PlacedSymbolArray;
  get anchorX(): number;
  get anchorY(): number;
  get glyphStartIndex(): number;
  get numGlyphs(): number;
  get vertexStartIndex(): number;
  get lineStartIndex(): number;
  get lineLength(): number;
  get segment(): number;
  get lowerSize(): number;
  get upperSize(): number;
  get lineOffsetX(): number;
  get lineOffsetY(): number;
  get writingMode(): number;
  get placedOrientation(): number;
  set placedOrientation(x: number);
  get hidden(): number;
  set hidden(x: number);
  get crossTileID(): number;
  set crossTileID(x: number);
  get associatedIconIndex(): number;
}
type PlacedSymbol = PlacedSymbolStruct;
declare class PlacedSymbolArray extends StructArrayLayout2i2ui3ul3ui2f3ub1ul1i48 {
  /**
   * Return the PlacedSymbolStruct at the given location in the array.
   * @param index - The index of the element.
   */
  get(index: number): PlacedSymbolStruct;
}
declare class SymbolInstanceStruct extends Struct {
  _structArray: SymbolInstanceArray;
  get anchorX(): number;
  get anchorY(): number;
  get rightJustifiedTextSymbolIndex(): number;
  get centerJustifiedTextSymbolIndex(): number;
  get leftJustifiedTextSymbolIndex(): number;
  get verticalPlacedTextSymbolIndex(): number;
  get placedIconSymbolIndex(): number;
  get verticalPlacedIconSymbolIndex(): number;
  get key(): number;
  get textBoxStartIndex(): number;
  get textBoxEndIndex(): number;
  get verticalTextBoxStartIndex(): number;
  get verticalTextBoxEndIndex(): number;
  get iconBoxStartIndex(): number;
  get iconBoxEndIndex(): number;
  get verticalIconBoxStartIndex(): number;
  get verticalIconBoxEndIndex(): number;
  get featureIndex(): number;
  get numHorizontalGlyphVertices(): number;
  get numVerticalGlyphVertices(): number;
  get numIconVertices(): number;
  get numVerticalIconVertices(): number;
  get useRuntimeCollisionCircles(): number;
  get crossTileID(): number;
  set crossTileID(x: number);
  get textBoxScale(): number;
  get collisionCircleDiameter(): number;
  get textAnchorOffsetStartIndex(): number;
  get textAnchorOffsetEndIndex(): number;
}
type SymbolInstance = SymbolInstanceStruct;
declare class SymbolInstanceArray extends StructArrayLayout8i15ui1ul2f2ui64 {
  /**
   * Return the SymbolInstanceStruct at the given location in the array.
   * @param index - The index of the element.
   */
  get(index: number): SymbolInstanceStruct;
}
declare class GlyphOffsetArray extends StructArrayLayout1f4 {
  getoffsetX(index: number): number;
}
declare class SymbolLineVertexArray extends StructArrayLayout3i6 {
  getx(index: number): number;
  gety(index: number): number;
  gettileUnitDistanceFromAnchor(index: number): number;
}
declare class TextAnchorOffsetStruct extends Struct {
  _structArray: TextAnchorOffsetArray;
  get textAnchor(): number;
  get textOffset0(): number;
  get textOffset1(): number;
}
type TextAnchorOffset = TextAnchorOffsetStruct;
declare class TextAnchorOffsetArray extends StructArrayLayout1ui2f12 {
  /**
   * Return the TextAnchorOffsetStruct at the given location in the array.
   * @param index - The index of the element.
   */
  get(index: number): TextAnchorOffsetStruct;
}
declare class FeatureIndexStruct extends Struct {
  _structArray: FeatureIndexArray;
  get featureIndex(): number;
  get sourceLayerIndex(): number;
  get bucketIndex(): number;
}
declare class FeatureIndexArray extends StructArrayLayout1ul2ui8 {
  /**
   * Return the FeatureIndexStruct at the given location in the array.
   * @param index - The index of the element.
   */
  get(index: number): FeatureIndexStruct;
}
declare class PosArray extends StructArrayLayout2i4 {}
declare class CircleLayoutArray extends StructArrayLayout2i4 {}
declare class FillLayoutArray extends StructArrayLayout2i4 {}
declare class FillExtrusionLayoutArray extends StructArrayLayout2i4i12 {}
declare class LineLayoutArray extends StructArrayLayout2i4ub8 {}
declare class LineExtLayoutArray extends StructArrayLayout2f8 {}
declare class SymbolLayoutArray extends StructArrayLayout4i4ui4i24 {}
declare class SymbolDynamicLayoutArray extends StructArrayLayout3f12 {}
declare class SymbolOpacityArray extends StructArrayLayout1ul4 {}
declare class CollisionVertexArray extends StructArrayLayout2ub2f2i16 {}
declare class TriangleIndexArray extends StructArrayLayout3ui6 {}
declare class LineIndexArray extends StructArrayLayout2ui4 {}
declare class LineStripIndexArray extends StructArrayLayout1ui2 {}
/**
 * A {@link LngLat} object, an array of two numbers representing longitude and latitude,
 * or an object with `lng` and `lat` or `lon` and `lat` properties.
 *
 * @group Geography and Geometry
 *
 * @example
 * ```ts
 * let v1 = new LngLat(-122.420679, 37.772537);
 * let v2 = [-122.420679, 37.772537];
 * let v3 = {lon: -122.420679, lat: 37.772537};
 * ```
 */
type LngLatLike = LngLat | {
  lng: number;
  lat: number;
} | {
  lon: number;
  lat: number;
} | [number, number];
/**
 * A `LngLat` object represents a given longitude and latitude coordinate, measured in degrees.
 * These coordinates are based on the [WGS84 (EPSG:4326) standard](https://en.wikipedia.org/wiki/World_Geodetic_System#WGS84).
 *
 * MapLibre GL JS uses longitude, latitude coordinate order (as opposed to latitude, longitude) to match the
 * [GeoJSON specification](https://tools.ietf.org/html/rfc7946).
 *
 * Note that any MapLibre GL JS method that accepts a `LngLat` object as an argument or option
 * can also accept an `Array` of two numbers and will perform an implicit conversion.
 * This flexible type is documented as {@link LngLatLike}.
 *
 * @group Geography and Geometry
 *
 * @example
 * ```ts
 * let ll = new LngLat(-123.9749, 40.7736);
 * ll.lng; // = -123.9749
 * ```
 * @see [Get coordinates of the mouse pointer](https://maplibre.org/maplibre-gl-js/docs/examples/mouse-position/)
 * @see [Display a popup](https://maplibre.org/maplibre-gl-js/docs/examples/popup/)
 * @see [Create a timeline animation](https://maplibre.org/maplibre-gl-js/docs/examples/timeline-animation/)
 */
declare class LngLat {
  /**
   * Longitude, measured in degrees.
   */
  lng: number;
  /**
   * Latitude, measured in degrees.
   */
  lat: number;
  /**
   * @param lng - Longitude, measured in degrees.
   * @param lat - Latitude, measured in degrees.
   */
  constructor(lng: number, lat: number);
  /**
   * Returns a new `LngLat` object whose longitude is wrapped to the range (-180, 180).
   *
   * @returns The wrapped `LngLat` object.
   * @example
   * ```ts
   * let ll = new LngLat(286.0251, 40.7736);
   * let wrapped = ll.wrap();
   * wrapped.lng; // = -73.9749
   * ```
   */
  wrap(): LngLat;
  /**
   * Returns the coordinates represented as an array of two numbers.
   *
   * @returns The coordinates represented as an array of longitude and latitude.
   * @example
   * ```ts
   * let ll = new LngLat(-73.9749, 40.7736);
   * ll.toArray(); // = [-73.9749, 40.7736]
   * ```
   */
  toArray(): [number, number];
  /**
   * Returns the coordinates represent as a string.
   *
   * @returns The coordinates represented as a string of the format `'LngLat(lng, lat)'`.
   * @example
   * ```ts
   * let ll = new LngLat(-73.9749, 40.7736);
   * ll.toString(); // = "LngLat(-73.9749, 40.7736)"
   * ```
   */
  toString(): string;
  /**
   * Returns the approximate distance between a pair of coordinates in meters
   * Uses the Haversine Formula (from R.W. Sinnott, "Virtues of the Haversine", Sky and Telescope, vol. 68, no. 2, 1984, p. 159)
   *
   * @param lngLat - coordinates to compute the distance to
   * @returns Distance in meters between the two coordinates.
   * @example
   * ```ts
   * let new_york = new LngLat(-74.0060, 40.7128);
   * let los_angeles = new LngLat(-118.2437, 34.0522);
   * new_york.distanceTo(los_angeles); // = 3935751.690893987, "true distance" using a non-spherical approximation is ~3966km
   * ```
   */
  distanceTo(lngLat: LngLat): number;
  /**
   * Converts an array of two numbers or an object with `lng` and `lat` or `lon` and `lat` properties
   * to a `LngLat` object.
   *
   * If a `LngLat` object is passed in, the function returns it unchanged.
   *
   * @param input - An array of two numbers or object to convert, or a `LngLat` object to return.
   * @returns A new `LngLat` object, if a conversion occurred, or the original `LngLat` object.
   * @example
   * ```ts
   * let arr = [-73.9749, 40.7736];
   * let ll = LngLat.convert(arr);
   * ll;   // = LngLat {lng: -73.9749, lat: 40.7736}
   * ```
   */
  static convert(input: LngLatLike): LngLat;
}
/**
 * A `MercatorCoordinate` object represents a projected three dimensional position.
 *
 * `MercatorCoordinate` uses the web mercator projection ([EPSG:3857](https://epsg.io/3857)) with slightly different units:
 *
 * - the size of 1 unit is the width of the projected world instead of the "mercator meter"
 * - the origin of the coordinate space is at the north-west corner instead of the middle
 *
 * For example, `MercatorCoordinate(0, 0, 0)` is the north-west corner of the mercator world and
 * `MercatorCoordinate(1, 1, 0)` is the south-east corner. If you are familiar with
 * [vector tiles](https://github.com/mapbox/vector-tile-spec) it may be helpful to think
 * of the coordinate space as the `0/0/0` tile with an extent of `1`.
 *
 * The `z` dimension of `MercatorCoordinate` is conformal. A cube in the mercator coordinate space would be rendered as a cube.
 *
 * @group Geography and Geometry
 *
 * @example
 * ```ts
 * let nullIsland = new MercatorCoordinate(0.5, 0.5, 0);
 * ```
 * @see [Add a custom style layer](https://maplibre.org/maplibre-gl-js/docs/examples/custom-style-layer/)
 */
declare class MercatorCoordinate implements IMercatorCoordinate {
  x: number;
  y: number;
  z: number;
  /**
   * @param x - The x component of the position.
   * @param y - The y component of the position.
   * @param z - The z component of the position.
   */
  constructor(x: number, y: number, z?: number);
  /**
   * Project a `LngLat` to a `MercatorCoordinate`.
   *
   * @param lngLatLike - The location to project.
   * @param altitude - The altitude in meters of the position.
   * @returns The projected mercator coordinate.
   * @example
   * ```ts
   * let coord = MercatorCoordinate.fromLngLat({ lng: 0, lat: 0}, 0);
   * coord; // MercatorCoordinate(0.5, 0.5, 0)
   * ```
   */
  static fromLngLat(lngLatLike: LngLatLike, altitude?: number): MercatorCoordinate;
  /**
   * Returns the `LngLat` for the coordinate.
   *
   * @returns The `LngLat` object.
   * @example
   * ```ts
   * let coord = new MercatorCoordinate(0.5, 0.5, 0);
   * let lngLat = coord.toLngLat(); // LngLat(0, 0)
   * ```
   */
  toLngLat(): LngLat;
  /**
   * Returns the altitude in meters of the coordinate.
   *
   * @returns The altitude in meters.
   * @example
   * ```ts
   * let coord = new MercatorCoordinate(0, 0, 0.02);
   * coord.toAltitude(); // 6914.281956295339
   * ```
   */
  toAltitude(): number;
  /**
   * Returns the distance of 1 meter in `MercatorCoordinate` units at this latitude.
   *
   * For coordinates in real world units using meters, this naturally provides the scale
   * to transform into `MercatorCoordinate`s.
   *
   * @returns Distance of 1 meter in `MercatorCoordinate` units.
   */
  meterInMercatorCoordinateUnits(): number;
}
declare class CanonicalTileID implements ICanonicalTileID {
  z: number;
  x: number;
  y: number;
  key: string;
  constructor(z: number, x: number, y: number);
  equals(id: ICanonicalTileID): boolean;
  /**
   * given a list of urls, choose a url template and return a tile URL
   */
  url(urls: Array<string>, pixelRatio: number, scheme?: string | null): string;
  isChildOf(parent: ICanonicalTileID): boolean;
  getTilePoint(coord: IMercatorCoordinate): Point;
  toString(): string;
}
declare class UnwrappedTileID {
  wrap: number;
  canonical: CanonicalTileID;
  key: string;
  constructor(wrap: number, canonical: CanonicalTileID);
}
/**
 * An overscaled tile identifier
 */
declare class OverscaledTileID {
  overscaledZ: number;
  wrap: number;
  canonical: CanonicalTileID;
  key: string;
  /**
   * This matrix is used during terrain's render-to-texture stage only.
   * If the render-to-texture stage is active, this matrix will be present
   * and should be used, otherwise this matrix will be null.
   * The matrix should be float32 in order to avoid slow WebGL calls in Chrome.
   */
  terrainRttPosMatrix32f: mat4 | null;
  constructor(overscaledZ: number, wrap: number, z: number, x: number, y: number);
  clone(): OverscaledTileID;
  equals(id: OverscaledTileID): boolean;
  /**
   * Returns a new `OverscaledTileID` representing the tile at the target zoom level.
   * When targetZ is greater than the current canonical z, the canonical coordinates are unchanged.
   * When targetZ is less than the current canonical z, the canonical coordinates are updated.
   * @param targetZ - the zoom level to scale to. Must be less than or equal to this.overscaledZ
   * @returns a new OverscaledTileID representing the tile at the target zoom level
   * @throws if targetZ is greater than this.overscaledZ
   */
  scaledTo(targetZ: number): OverscaledTileID;
  isOverscaled(): boolean;
  calculateScaledKey(targetZ: number, withWrap: boolean): string;
  isChildOf(parent: OverscaledTileID): boolean;
  children(sourceMaxZoom: number): OverscaledTileID[];
  isLessThan(rhs: OverscaledTileID): boolean;
  wrapped(): OverscaledTileID;
  unwrapTo(wrap: number): OverscaledTileID;
  overscaleFactor(): number;
  toUnwrapped(): UnwrappedTileID;
  toString(): string;
  getTilePoint(coord: MercatorCoordinate): Point;
  /**
   * Maps tile-local coordinates that may fall outside the `[0, extent)` range
   * to the correct neighbor tile and the corresponding in-tile position.
   *
   * Coordinates can exceed tile bounds when geometry (e.g. symbol labels along
   * lines) extends across tile edges. This method resolves such coordinates to
   * the appropriate adjacent tile, wrapping horizontally across world boundaries
   * and returning `null` when the target falls beyond the polar tile-grid limits.
   *
   * When the coordinates are already in bounds, the original tile ID is returned.
   *
   * @param x - x coordinate relative to this tile, may be outside `[0, extent)`
   * @param y - y coordinate relative to this tile, may be outside `[0, extent)`
   * @param extent - tile coordinate extent, default {@link EXTENT}
   * @returns the resolved tile ID and in-tile coordinates, or `null` if the
   *          target is beyond the tile grid (e.g. past the poles)
   */
  normalizeCoordinates(x: number, y: number, extent?: number): {
    tileID: OverscaledTileID;
    x: number;
    y: number;
  } | null;
}
/**
 * A listener method used as a callback to events
 */
type Listener = (a: any) => any;
type Listeners = {
  [_: string]: Array<Listener>;
};
/**
 * The event class
 */
declare class Event$1 {
  readonly type: string;
  constructor(type: string, data?: any);
}
/**
 * Methods mixed in to other classes for event capabilities.
 *
 * @group Event Related
 */
declare class Evented {
  _listeners: Listeners;
  _oneTimeListeners: Listeners;
  _eventedParent: Evented;
  _eventedParentData: any | (() => any);
  /**
   * Adds a listener to a specified event type.
   *
   * @param type - The event type to add a listen for.
   * @param listener - The function to be called when the event is fired.
   * The listener function is called with the data object passed to `fire`,
   * extended with `target` and `type` properties.
   */
  on(type: string, listener: Listener): Subscription;
  /**
   * Removes a previously registered event listener.
   *
   * @param type - The event type to remove listeners for.
   * @param listener - The listener function to remove.
   */
  off(type: string, listener: Listener): this;
  /**
   * Adds a listener that will be called only once to a specified event type.
   *
   * The listener will be called first time the event fires after the listener is registered.
   *
   * @param type - The event type to listen for.
   * @param listener - The function to be called when the event is fired the first time.
   * @returns `this` or a promise if a listener is not provided
   */
  once(type: string, listener?: Listener): this | Promise<any>;
  fire(event: Event$1 | string, properties?: any): this;
  /**
   * Returns a true if this instance of Evented or any forwardeed instances of Evented have a listener for the specified type.
   *
   * @param type - The event type
   * @returns `true` if there is at least one registered listener for specified event type, `false` otherwise
   */
  listens(type: string): boolean;
  /**
   * Bubble all events fired by this instance of Evented to this parent instance of Evented.
   */
  setEventedParent(parent?: Evented | null, data?: any | (() => any)): this;
}
declare class ZoomHistory {
  lastZoom: number;
  lastFloorZoom: number;
  lastIntegerZoom: number;
  lastIntegerZoomTime: number;
  first: boolean;
  constructor();
  update(z: number, now: number): boolean;
}
type CrossfadeParameters = {
  fromScale: number;
  toScale: number;
  t: number;
};
declare class EvaluationParameters implements GlobalProperties {
  zoom: number;
  now: number;
  fadeDuration: number;
  zoomHistory: ZoomHistory;
  transition: TransitionSpecification;
  isSupportedScript: (_: string) => boolean;
  constructor(zoom: number, options?: any);
  crossFadingFactor(): number;
  getCrossfadeParameters(): CrossfadeParameters;
}
type TimePoint = number;
type CrossFaded<T> = {
  to: T;
  from: T;
};
interface Property<T, R> {
  specification: StylePropertySpecification;
  possiblyEvaluate(value: PropertyValue<T, R>, parameters: EvaluationParameters, canonical?: CanonicalTileID, availableImages?: Array<string>): R;
  interpolate(a: R, b: R, t: number): R;
}
declare class PropertyValue<T, R> {
  property: Property<T, R>;
  value: PropertyValueSpecification<T> | void;
  expression: StylePropertyExpression;
  constructor(property: Property<T, R>, value: PropertyValueSpecification<T> | void, globalState: Record<string, any>);
  isDataDriven(): boolean;
  getGlobalStateRefs(): Set<string>;
  possiblyEvaluate(parameters: EvaluationParameters, canonical?: CanonicalTileID, availableImages?: Array<string>): R;
}
type TransitionParameters = {
  now: TimePoint;
  transition: TransitionSpecification;
};
declare class TransitionablePropertyValue<T, R> {
  property: Property<T, R>;
  value: PropertyValue<T, R>;
  transition: TransitionSpecification | void;
  constructor(property: Property<T, R>, globalState: Record<string, any>);
  transitioned(parameters: TransitionParameters, prior: TransitioningPropertyValue<T, R>): TransitioningPropertyValue<T, R>;
  untransitioned(): TransitioningPropertyValue<T, R>;
}
declare class Transitionable<Props> {
  _properties: Properties<Props>;
  _values: { [K in keyof Props]: TransitionablePropertyValue<any, unknown> };
  private _globalState;
  constructor(properties: Properties<Props>, globalState: Record<string, any>);
  hasProperty(name: string): boolean;
  getValue<S extends keyof Props, T>(name: S): PropertyValueSpecification<T> | void;
  setValue<S extends keyof Props, T>(name: S, value: PropertyValueSpecification<T> | void): void;
  getTransition<S extends keyof Props>(name: S): TransitionSpecification | void;
  setTransition<S extends keyof Props>(name: S, value: TransitionSpecification | void): void;
  serialize(): any;
  transitioned(parameters: TransitionParameters, prior: Transitioning<Props>): Transitioning<Props>;
  untransitioned(): Transitioning<Props>;
}
declare class TransitioningPropertyValue<T, R> {
  property: Property<T, R>;
  value: PropertyValue<T, R>;
  prior: TransitioningPropertyValue<T, R>;
  begin: TimePoint;
  end: TimePoint;
  constructor(property: Property<T, R>, value: PropertyValue<T, R>, prior: TransitioningPropertyValue<T, R>, transition: TransitionSpecification, now: TimePoint);
  possiblyEvaluate(parameters: EvaluationParameters, canonical: CanonicalTileID, availableImages: Array<string>): R;
}
declare class Transitioning<Props> {
  _properties: Properties<Props>;
  _values: { [K in keyof Props]: PossiblyEvaluatedPropertyValue<unknown> };
  constructor(properties: Properties<Props>);
  possiblyEvaluate(parameters: EvaluationParameters, canonical?: CanonicalTileID, availableImages?: Array<string>): PossiblyEvaluated<Props, any>;
  hasTransition(): boolean;
}
declare class Layout<Props> {
  _properties: Properties<Props>;
  _values: { [K in keyof Props]: PropertyValue<any, PossiblyEvaluatedPropertyValue<any>> };
  private _globalState;
  constructor(properties: Properties<Props>, globalState: Record<string, any>);
  hasValue<S extends keyof Props>(name: S): boolean;
  hasProperty(name: string): boolean;
  getValue<S extends keyof Props>(name: S): any;
  setValue<S extends keyof Props>(name: S, value: any): void;
  serialize(): any;
  possiblyEvaluate(parameters: EvaluationParameters, canonical?: CanonicalTileID, availableImages?: Array<string>): PossiblyEvaluated<Props, any>;
}
type PossiblyEvaluatedValue<T> = {
  kind: "constant";
  value: T;
} | SourceExpression | CompositeExpression;
declare class PossiblyEvaluatedPropertyValue<T> {
  property: DataDrivenProperty<T>;
  value: PossiblyEvaluatedValue<T>;
  parameters: EvaluationParameters;
  constructor(property: DataDrivenProperty<T>, value: PossiblyEvaluatedValue<T>, parameters: EvaluationParameters);
  isConstant(): boolean;
  constantOr(value: T): T;
  evaluate(feature: Feature, featureState: FeatureState, canonical?: CanonicalTileID, availableImages?: Array<string>): T;
}
declare class PossiblyEvaluated<Props, PossibleEvaluatedProps> {
  _properties: Properties<Props>;
  _values: PossibleEvaluatedProps;
  constructor(properties: Properties<Props>);
  get<S extends keyof PossibleEvaluatedProps>(name: S): PossibleEvaluatedProps[S];
}
declare class DataConstantProperty<T> implements Property<T, T> {
  specification: StylePropertySpecification;
  constructor(specification: StylePropertySpecification);
  possiblyEvaluate(value: PropertyValue<T, T>, parameters: EvaluationParameters): T;
  interpolate(a: T, b: T, t: number): T;
}
declare class DataDrivenProperty<T> implements Property<T, PossiblyEvaluatedPropertyValue<T>> {
  specification: StylePropertySpecification;
  overrides: any;
  constructor(specification: StylePropertySpecification, overrides?: any);
  possiblyEvaluate(value: PropertyValue<T, PossiblyEvaluatedPropertyValue<T>>, parameters: EvaluationParameters, canonical?: CanonicalTileID, availableImages?: Array<string>): PossiblyEvaluatedPropertyValue<T>;
  interpolate(a: PossiblyEvaluatedPropertyValue<T>, b: PossiblyEvaluatedPropertyValue<T>, t: number): PossiblyEvaluatedPropertyValue<T>;
  evaluate(value: PossiblyEvaluatedValue<T>, parameters: EvaluationParameters, feature: Feature, featureState: FeatureState, canonical?: CanonicalTileID, availableImages?: Array<string>): T;
}
declare class CrossFadedDataDrivenProperty<T> extends DataDrivenProperty<CrossFaded<T>> {
  possiblyEvaluate(value: PropertyValue<CrossFaded<T>, PossiblyEvaluatedPropertyValue<CrossFaded<T>>>, parameters: EvaluationParameters, canonical?: CanonicalTileID, availableImages?: Array<string>): PossiblyEvaluatedPropertyValue<CrossFaded<T>>;
  evaluate(value: PossiblyEvaluatedValue<CrossFaded<T>>, globals: EvaluationParameters, feature: Feature, featureState: FeatureState, canonical?: CanonicalTileID, availableImages?: Array<string>): CrossFaded<T>;
  _calculate(min: T, mid: T, max: T, parameters: EvaluationParameters): CrossFaded<T>;
  interpolate(a: PossiblyEvaluatedPropertyValue<CrossFaded<T>>): PossiblyEvaluatedPropertyValue<CrossFaded<T>>;
}
declare class ColorRampProperty implements Property<Color, boolean> {
  specification: StylePropertySpecification;
  constructor(specification: StylePropertySpecification);
  possiblyEvaluate(value: PropertyValue<Color, boolean>, parameters: EvaluationParameters, canonical?: CanonicalTileID, availableImages?: Array<string>): boolean;
  interpolate(): boolean;
}
declare class Properties<Props> {
  properties: Props;
  defaultPropertyValues: { [K in keyof Props]: PropertyValue<unknown, any> };
  defaultTransitionablePropertyValues: { [K in keyof Props]: TransitionablePropertyValue<unknown, unknown> };
  defaultTransitioningPropertyValues: { [K in keyof Props]: TransitioningPropertyValue<unknown, unknown> };
  defaultPossiblyEvaluatedValues: { [K in keyof Props]: PossiblyEvaluatedPropertyValue<unknown> };
  overridableProperties: Array<string>;
  constructor(properties: Props);
}
type Size = {
  width: number;
  height: number;
};
type Point2D = {
  x: number;
  y: number;
};
/**
 * An image with alpha color value
 */
declare class AlphaImage {
  width: number;
  height: number;
  data: Uint8Array;
  constructor(size: Size, data?: Uint8Array | Uint8ClampedArray);
  resize(size: Size): void;
  clone(): AlphaImage;
  static copy(srcImg: AlphaImage, dstImg: AlphaImage, srcPt: Point2D, dstPt: Point2D, size: Size): void;
}
declare class RGBAImage {
  width: number;
  height: number;
  /**
   * data must be a Uint8Array instead of Uint8ClampedArray because texImage2D does not support Uint8ClampedArray in all browsers.
   */
  data: Uint8Array;
  constructor(size: Size, data?: Uint8Array | Uint8ClampedArray);
  resize(size: Size): void;
  replace(data: Uint8Array | Uint8ClampedArray, copy?: boolean): void;
  clone(): RGBAImage;
  static copy(srcImg: RGBAImage | ImageData, dstImg: RGBAImage, srcPt: Point2D, dstPt: Point2D, size: Size): void;
  setPixel(row: number, col: number, value: Color): void;
}
type SpriteOnDemandStyleImage = {
  width: number;
  height: number;
  x: number;
  y: number;
  context: CanvasRenderingContext2D;
};
/**
 * The style's image metadata
 */
type StyleImageData = {
  data: RGBAImage;
  version?: number;
  hasRenderCallback?: boolean;
  userImage?: StyleImageInterface;
  spriteData?: SpriteOnDemandStyleImage;
};
/**
 * Enumeration of possible values for StyleImageMetadata.textFitWidth and textFitHeight.
 */
declare const enum TextFit {
  /**
   * The image will be resized on the specified axis to tightly fit the content rectangle to target text.
   * This is the same as not being defined.
   */
  stretchOrShrink = "stretchOrShrink",
  /**
   * The image will be resized on the specified axis to fit the content rectangle to the target text, but will not
   * fall below the aspect ratio of the original content rectangle if the other axis is set to proportional.
   */
  stretchOnly = "stretchOnly",
  /**
   * The image will be resized on the specified axis to fit the content rectangle to the target text and
   * will resize the other axis to maintain the aspect ratio of the content rectangle.
   */
  proportional = "proportional"
}
/**
 * The style's image metadata
 */
type StyleImageMetadata = {
  /**
   * The ratio of pixels in the image to physical pixels on the screen
   */
  pixelRatio: number;
  /**
   * Whether the image should be interpreted as an SDF image
   */
  sdf: boolean;
  /**
   * If `icon-text-fit` is used in a layer with this image, this option defines the part(s) of the image that can be stretched horizontally.
   */
  stretchX?: Array<[number, number]>;
  /**
   * If `icon-text-fit` is used in a layer with this image, this option defines the part(s) of the image that can be stretched vertically.
   */
  stretchY?: Array<[number, number]>;
  /**
   * If `icon-text-fit` is used in a layer with this image, this option defines the part of the image that can be covered by the content in `text-field`.
   */
  content?: [number, number, number, number];
  /**
   * If `icon-text-fit` is used in a layer with this image, this option defines constraints on the horizontal scaling of the image.
   */
  textFitWidth?: TextFit;
  /**
   * If `icon-text-fit` is used in a layer with this image, this option defines constraints on the vertical scaling of the image.
   */
  textFitHeight?: TextFit;
};
/**
 * the style's image, including data and metedata
 */
type StyleImage = StyleImageData & StyleImageMetadata;
/**
 * Interface for dynamically generated style images. This is a specification for
 * implementers to model: it is not an exported method or class.
 *
 * Images implementing this interface can be redrawn for every frame. They can be used to animate
 * icons and patterns or make them respond to user input. Style images can implement a
 * {@link StyleImageInterface.render} method. The method is called every frame and
 * can be used to update the image.
 *
 * @see [Add an animated icon to the map.](https://maplibre.org/maplibre-gl-js/docs/examples/add-image-animated/)
 *
 * @example
 * ```ts
 * let flashingSquare = {
 *     width: 64,
 *     height: 64,
 *     data: new Uint8Array(64 * 64 * 4),
 *
 *     onAdd: function(map) {
 *         this.map = map;
 *     },
 *
 *     render: function() {
 *         // keep repainting while the icon is on the map
 *         this.map.triggerRepaint();
 *
 *         // alternate between black and white based on the time
 *         let value = Math.round(Date.now() / 1000) % 2 === 0  ? 255 : 0;
 *
 *         // check if image needs to be changed
 *         if (value !== this.previousValue) {
 *             this.previousValue = value;
 *
 *             let bytesPerPixel = 4;
 *             for (let x = 0; x < this.width; x++) {
 *                 for (let y = 0; y < this.height; y++) {
 *                     let offset = (y * this.width + x) * bytesPerPixel;
 *                     this.data[offset + 0] = value;
 *                     this.data[offset + 1] = value;
 *                     this.data[offset + 2] = value;
 *                     this.data[offset + 3] = 255;
 *                 }
 *             }
 *
 *             // return true to indicate that the image changed
 *             return true;
 *         }
 *     }
 *  }
 *
 *  map.addImage('flashing_square', flashingSquare);
 * ```
 */
interface StyleImageInterface {
  width: number;
  height: number;
  data: Uint8Array | Uint8ClampedArray;
  /**
   * This method is called once before every frame where the icon will be used.
   * The method can optionally update the image's `data` member with a new image.
   *
   * If the method updates the image it must return `true` to commit the change.
   * If the method returns `false` or nothing the image is assumed to not have changed.
   *
   * If updates are infrequent it maybe easier to use {@link Map.updateImage} to update
   * the image instead of implementing this method.
   *
   * @returns `true` if this method updated the image. `false` if the image was not changed.
   */
  render?: () => boolean;
  /**
   * Optional method called when the layer has been added to the Map with {@link Map.addImage}.
   *
   * @param map - The Map this custom layer was just added to.
   */
  onAdd?: (map: Map$1, id: string) => void;
  /**
   * Optional method called when the icon is removed from the map with {@link Map.removeImage}.
   * This gives the image a chance to clean up resources and event listeners.
   */
  onRemove?: () => void;
}
declare class IndexBuffer {
  context: Context;
  buffer: WebGLBuffer;
  dynamicDraw: boolean;
  constructor(context: Context, array: TriangleIndexArray | LineIndexArray | LineStripIndexArray, dynamicDraw?: boolean);
  bind(): void;
  updateData(array: StructArray): void;
  destroy(): void;
}
type PreparedShader = {
  fragmentSource: string;
  vertexSource: string;
  staticAttributes: Array<string>;
  staticUniforms: Array<string>;
};
type SerializedFeaturePositionMap = {
  ids: Float64Array;
  positions: Uint32Array;
};
type FeaturePosition = {
  index: number;
  start: number;
  end: number;
};
declare class FeaturePositionMap {
  ids: Array<number>;
  positions: Array<number>;
  indexed: boolean;
  constructor();
  add(id: unknown, index: number, start: number, end: number): void;
  getPositions(id: unknown): Array<FeaturePosition>;
  static serialize(map: FeaturePositionMap, transferables: Array<ArrayBuffer>): SerializedFeaturePositionMap;
  static deserialize(obj: SerializedFeaturePositionMap): FeaturePositionMap;
}
type $ObjMap<T extends {}, F extends (v: any) => any> = { [K in keyof T]: F extends ((v: T[K]) => infer R) ? R : never };
type UniformValues<Us extends {}> = $ObjMap<Us, <V>(u: Uniform<V>) => V>;
type UniformLocations = {
  [_: string]: WebGLUniformLocation;
};
declare abstract class Uniform<T> {
  gl: WebGLRenderingContext | WebGL2RenderingContext;
  location: WebGLUniformLocation;
  current: T;
  constructor(context: Context, location: WebGLUniformLocation);
  abstract set(v: T): void;
}
declare class Uniform1i extends Uniform<number> {
  constructor(context: Context, location: WebGLUniformLocation);
  set(v: number): void;
}
declare class Uniform1f extends Uniform<number> {
  constructor(context: Context, location: WebGLUniformLocation);
  set(v: number): void;
}
declare class Uniform4f extends Uniform<vec4> {
  constructor(context: Context, location: WebGLUniformLocation);
  set(v: vec4): void;
}
declare class UniformMatrix4f extends Uniform<mat4> {
  constructor(context: Context, location: WebGLUniformLocation);
  set(v: mat4): void;
}
type UniformBindings = {
  [_: string]: Uniform<any>;
};
declare class VertexArrayObject {
  context: Context;
  boundProgram: Program<any>;
  boundLayoutVertexBuffer: VertexBuffer;
  boundPaintVertexBuffers: Array<VertexBuffer>;
  boundIndexBuffer: IndexBuffer;
  boundVertexOffset: number;
  boundDynamicVertexBuffer: VertexBuffer;
  boundDynamicVertexBuffer2: VertexBuffer;
  boundDynamicVertexBuffer3: VertexBuffer;
  vao: any;
  constructor();
  bind(context: Context, program: Program<any>, layoutVertexBuffer: VertexBuffer, paintVertexBuffers: Array<VertexBuffer>, indexBuffer?: IndexBuffer | null, vertexOffset?: number | null, dynamicVertexBuffer?: VertexBuffer | null, dynamicVertexBuffer2?: VertexBuffer | null, dynamicVertexBuffer3?: VertexBuffer | null): void;
  freshBind(program: Program<any>, layoutVertexBuffer: VertexBuffer, paintVertexBuffers: Array<VertexBuffer>, indexBuffer?: IndexBuffer | null, vertexOffset?: number | null, dynamicVertexBuffer?: VertexBuffer | null, dynamicVertexBuffer2?: VertexBuffer | null, dynamicVertexBuffer3?: VertexBuffer | null): void;
  destroy(): void;
}
type Segment = {
  sortKey?: number;
  vertexOffset: number;
  primitiveOffset: number;
  vertexLength: number;
  primitiveLength: number;
  vaos: {
    [_: string]: VertexArrayObject;
  };
};
declare class SegmentVector {
  static MAX_VERTEX_ARRAY_LENGTH: number;
  segments: Array<Segment>;
  private _forceNewSegmentOnNextPrepare;
  constructor(segments?: Array<Segment>);
  /**
   * Returns the last segment if `numVertices` fits into it.
   * If there are no segments yet or `numVertices` doesn't fit into the last one, creates a new empty segment and returns it.
   */
  prepareSegment(numVertices: number, layoutVertexArray: StructArray, indexArray: StructArray, sortKey?: number): Segment;
  /**
   * Creates a new empty segment and returns it.
   */
  createNewSegment(layoutVertexArray: StructArray, indexArray: StructArray, sortKey?: number): Segment;
  /**
   * Returns the last segment, or creates a new segments if there are no segments yet.
   */
  getOrCreateLatestSegment(layoutVertexArray: StructArray, indexArray: StructArray, sortKey?: number): Segment;
  /**
   * Causes the next call to {@link prepareSegment} to always return a new segment,
   * not reusing the current segment even if the new geometry would fit it.
   */
  forceNewSegmentOnNextPrepare(): void;
  get(): Segment[];
  destroy(): void;
  static simpleSegment(vertexOffset: number, primitiveOffset: number, vertexLength: number, primitiveLength: number): SegmentVector;
}
declare class HeatmapBucket extends CircleBucket<HeatmapStyleLayer> {
  layers: Array<HeatmapStyleLayer>;
}
type HeatmapPaintProps = {
  "heatmap-radius": DataDrivenProperty<number>;
  "heatmap-weight": DataDrivenProperty<number>;
  "heatmap-intensity": DataConstantProperty<number>;
  "heatmap-color": ColorRampProperty;
  "heatmap-opacity": DataConstantProperty<number>;
};
type HeatmapPaintPropsPossiblyEvaluated = {
  "heatmap-radius": PossiblyEvaluatedPropertyValue<number>;
  "heatmap-weight": PossiblyEvaluatedPropertyValue<number>;
  "heatmap-intensity": number;
  "heatmap-color": ColorRampProperty;
  "heatmap-opacity": number;
};
type BlendFuncConstant = WebGLRenderingContextBase["ZERO"] | WebGLRenderingContextBase["ONE"] | WebGLRenderingContextBase["SRC_COLOR"] | WebGLRenderingContextBase["ONE_MINUS_SRC_COLOR"] | WebGLRenderingContextBase["DST_COLOR"] | WebGLRenderingContextBase["ONE_MINUS_DST_COLOR"] | WebGLRenderingContextBase["SRC_ALPHA"] | WebGLRenderingContextBase["ONE_MINUS_SRC_ALPHA"] | WebGLRenderingContextBase["DST_ALPHA"] | WebGLRenderingContextBase["ONE_MINUS_DST_ALPHA"] | WebGLRenderingContextBase["CONSTANT_COLOR"] | WebGLRenderingContextBase["ONE_MINUS_CONSTANT_COLOR"] | WebGLRenderingContextBase["CONSTANT_ALPHA"] | WebGLRenderingContextBase["ONE_MINUS_CONSTANT_ALPHA"] | WebGLRenderingContextBase["BLEND_COLOR"];
type BlendFuncType = [BlendFuncConstant, BlendFuncConstant];
type BlendEquationType = WebGLRenderingContextBase["FUNC_ADD"] | WebGLRenderingContextBase["FUNC_SUBTRACT"] | WebGLRenderingContextBase["FUNC_REVERSE_SUBTRACT"];
type ColorMaskType = [boolean, boolean, boolean, boolean];
type CompareFuncType = WebGLRenderingContextBase["NEVER"] | WebGLRenderingContextBase["LESS"] | WebGLRenderingContextBase["EQUAL"] | WebGLRenderingContextBase["LEQUAL"] | WebGLRenderingContextBase["GREATER"] | WebGLRenderingContextBase["NOTEQUAL"] | WebGLRenderingContextBase["GEQUAL"] | WebGLRenderingContextBase["ALWAYS"];
type DepthMaskType = boolean;
type DepthRangeType = [number, number];
type DepthFuncType = CompareFuncType;
type StencilFuncType = {
  func: CompareFuncType;
  ref: number;
  mask: number;
};
type StencilOpConstant = WebGLRenderingContextBase["KEEP"] | WebGLRenderingContextBase["ZERO"] | WebGLRenderingContextBase["REPLACE"] | WebGLRenderingContextBase["INCR"] | WebGLRenderingContextBase["INCR_WRAP"] | WebGLRenderingContextBase["DECR"] | WebGLRenderingContextBase["DECR_WRAP"] | WebGLRenderingContextBase["INVERT"];
type StencilOpType = [StencilOpConstant, StencilOpConstant, StencilOpConstant];
type TextureUnitType = number;
type ViewportType = [number, number, number, number];
type StencilTestGL = {
  func: WebGLRenderingContextBase["NEVER"];
  mask: 0;
} | {
  func: WebGLRenderingContextBase["LESS"];
  mask: number;
} | {
  func: WebGLRenderingContextBase["EQUAL"];
  mask: number;
} | {
  func: WebGLRenderingContextBase["LEQUAL"];
  mask: number;
} | {
  func: WebGLRenderingContextBase["GREATER"];
  mask: number;
} | {
  func: WebGLRenderingContextBase["NOTEQUAL"];
  mask: number;
} | {
  func: WebGLRenderingContextBase["GEQUAL"];
  mask: number;
} | {
  func: WebGLRenderingContextBase["ALWAYS"];
  mask: 0;
};
type CullFaceModeType = WebGLRenderingContextBase["FRONT"] | WebGLRenderingContextBase["BACK"] | WebGLRenderingContextBase["FRONT_AND_BACK"];
type FrontFaceType = WebGLRenderingContextBase["CW"] | WebGLRenderingContextBase["CCW"];
interface IValue<T> {
  current: T;
  default: T;
  dirty: boolean;
  get(): T;
  setDefault(): void;
  set(value: T): void;
}
declare class BaseValue<T> implements IValue<T> {
  gl: WebGLRenderingContext | WebGL2RenderingContext;
  current: T;
  default: T;
  dirty: boolean;
  constructor(context: Context);
  get(): T;
  set(value: T): void;
  getDefault(): T;
  setDefault(): void;
}
declare class ClearColor extends BaseValue<Color> {
  getDefault(): Color;
  set(v: Color): void;
}
declare class ClearDepth extends BaseValue<number> {
  getDefault(): number;
  set(v: number): void;
}
declare class ClearStencil extends BaseValue<number> {
  getDefault(): number;
  set(v: number): void;
}
declare class ColorMask extends BaseValue<ColorMaskType> {
  getDefault(): ColorMaskType;
  set(v: ColorMaskType): void;
}
declare class DepthMask extends BaseValue<DepthMaskType> {
  getDefault(): DepthMaskType;
  set(v: DepthMaskType): void;
}
declare class StencilMask extends BaseValue<number> {
  getDefault(): number;
  set(v: number): void;
}
declare class StencilFunc extends BaseValue<StencilFuncType> {
  getDefault(): StencilFuncType;
  set(v: StencilFuncType): void;
}
declare class StencilOp extends BaseValue<StencilOpType> {
  getDefault(): StencilOpType;
  set(v: StencilOpType): void;
}
declare class StencilTest extends BaseValue<boolean> {
  getDefault(): boolean;
  set(v: boolean): void;
}
declare class DepthRange extends BaseValue<DepthRangeType> {
  getDefault(): DepthRangeType;
  set(v: DepthRangeType): void;
}
declare class DepthTest extends BaseValue<boolean> {
  getDefault(): boolean;
  set(v: boolean): void;
}
declare class DepthFunc extends BaseValue<DepthFuncType> {
  getDefault(): DepthFuncType;
  set(v: DepthFuncType): void;
}
declare class Blend extends BaseValue<boolean> {
  getDefault(): boolean;
  set(v: boolean): void;
}
declare class BlendFunc extends BaseValue<BlendFuncType> {
  getDefault(): BlendFuncType;
  set(v: BlendFuncType): void;
}
declare class BlendColor extends BaseValue<Color> {
  getDefault(): Color;
  set(v: Color): void;
}
declare class BlendEquation extends BaseValue<BlendEquationType> {
  getDefault(): BlendEquationType;
  set(v: BlendEquationType): void;
}
declare class CullFace extends BaseValue<boolean> {
  getDefault(): boolean;
  set(v: boolean): void;
}
declare class CullFaceSide extends BaseValue<CullFaceModeType> {
  getDefault(): CullFaceModeType;
  set(v: CullFaceModeType): void;
}
declare class FrontFace extends BaseValue<FrontFaceType> {
  getDefault(): FrontFaceType;
  set(v: FrontFaceType): void;
}
declare class ProgramValue extends BaseValue<WebGLProgram> {
  getDefault(): WebGLProgram;
  set(v?: WebGLProgram | null): void;
}
declare class ActiveTextureUnit extends BaseValue<TextureUnitType> {
  getDefault(): TextureUnitType;
  set(v: TextureUnitType): void;
}
declare class Viewport extends BaseValue<ViewportType> {
  getDefault(): ViewportType;
  set(v: ViewportType): void;
}
declare class BindFramebuffer extends BaseValue<WebGLFramebuffer> {
  getDefault(): WebGLFramebuffer;
  set(v?: WebGLFramebuffer | null): void;
}
declare class BindRenderbuffer extends BaseValue<WebGLRenderbuffer> {
  getDefault(): WebGLRenderbuffer;
  set(v?: WebGLRenderbuffer | null): void;
}
declare class BindTexture extends BaseValue<WebGLTexture> {
  getDefault(): WebGLTexture;
  set(v?: WebGLTexture | null): void;
}
declare class BindVertexBuffer extends BaseValue<WebGLBuffer> {
  getDefault(): WebGLBuffer;
  set(v?: WebGLBuffer | null): void;
}
declare class BindElementBuffer extends BaseValue<WebGLBuffer> {
  getDefault(): WebGLBuffer;
  set(v?: WebGLBuffer | null): void;
}
declare class BindVertexArray extends BaseValue<WebGLVertexArrayObject | null> {
  getDefault(): WebGLVertexArrayObject | null;
  set(v: WebGLVertexArrayObject | null): void;
}
declare class PixelStoreUnpack extends BaseValue<number> {
  getDefault(): number;
  set(v: number): void;
}
declare class PixelStoreUnpackPremultiplyAlpha extends BaseValue<boolean> {
  getDefault(): boolean;
  set(v: boolean): void;
}
declare class PixelStoreUnpackFlipY extends BaseValue<boolean> {
  getDefault(): boolean;
  set(v: boolean): void;
}
declare class FramebufferAttachment<T> extends BaseValue<T> {
  parent: WebGLFramebuffer;
  context: Context;
  constructor(context: Context, parent: WebGLFramebuffer);
  getDefault(): any;
}
declare class ColorAttachment extends FramebufferAttachment<WebGLTexture> {
  setDirty(): void;
  set(v?: WebGLTexture | null): void;
}
declare class DepthAttachment extends FramebufferAttachment<WebGLRenderbuffer> {
  set(v?: WebGLRenderbuffer | null): void;
}
declare class Framebuffer {
  context: Context;
  width: number;
  height: number;
  framebuffer: WebGLFramebuffer;
  colorAttachment: ColorAttachment;
  depthAttachment: DepthAttachment;
  constructor(context: Context, width: number, height: number, hasDepth: boolean, hasStencil: boolean);
  destroy(): void;
}
declare class HeatmapStyleLayer extends StyleLayer {
  heatmapFbos: Map<string, Framebuffer>;
  colorRamp: RGBAImage;
  colorRampTexture: Texture;
  _transitionablePaint: Transitionable<HeatmapPaintProps>;
  _transitioningPaint: Transitioning<HeatmapPaintProps>;
  paint: PossiblyEvaluated<HeatmapPaintProps, HeatmapPaintPropsPossiblyEvaluated>;
  createBucket(options: any): HeatmapBucket;
  constructor(layer: LayerSpecification, globalState: Record<string, any>);
  _handleSpecialPaintPropertyUpdate(name: string): void;
  _updateColorRamp(): void;
  resize(): void;
  queryRadius(bucket: Bucket): number;
  queryIntersectsFeature({
    queryGeometry,
    feature,
    featureState,
    geometry,
    transform,
    pixelsToTileUnits,
    unwrappedTileID,
    getElevation
  }: QueryIntersectsFeatureParams): boolean;
  hasOffscreenPass(): boolean;
}
type SerializedGrid = {
  buffer: ArrayBuffer;
};
declare class TransferableGridIndex {
  cells: number[][];
  arrayBuffer: ArrayBuffer;
  d: number;
  keys: number[];
  bboxes: number[];
  n: number;
  extent: number;
  padding: number;
  scale: any;
  uid: number;
  min: number;
  max: number;
  constructor(extent: number | ArrayBuffer, n?: number, padding?: number);
  insert(key: number, x1: number, y1: number, x2: number, y2: number): void;
  _insertReadonly(): void;
  _insertCell(x1: number, y1: number, x2: number, y2: number, cellIndex: number, uid: number): void;
  query(x1: number, y1: number, x2: number, y2: number, intersectionTest?: Function): number[];
  _queryCell(x1: number, y1: number, x2: number, y2: number, cellIndex: number, result: any, seenUids: any, intersectionTest: Function): void;
  _forEachCell(x1: number, y1: number, x2: number, y2: number, fn: Function, arg1: any, arg2: any, intersectionTest: any): void;
  _convertFromCellCoord(x: any): number;
  _convertToCellCoord(x: any): number;
  toArrayBuffer(): ArrayBuffer;
  static serialize(grid: TransferableGridIndex, transferables?: Array<Transferable>): SerializedGrid;
  static deserialize(serialized: SerializedGrid): TransferableGridIndex;
}
declare class DictionaryCoder {
  _stringToNumber: {
    [_: string]: number;
  };
  _numberToString: Array<string>;
  constructor(strings: Array<string>);
  encode(string: string): number;
  decode(n: number): string;
}
/**
 * A helper for type to omit a property from a type
 */
type DistributiveKeys<T> = T extends T ? keyof T : never;
/**
 * A helper for type to omit a property from a type
 */
type DistributiveOmit<T, K extends DistributiveKeys<T>> = T extends unknown ? Omit<T, K> : never;
/**
 * An extended geojson feature used by the events to return data to the listener
 */
type MapGeoJSONFeature = GeoJSONFeature & {
  layer: DistributiveOmit<LayerSpecification, "source"> & {
    source: string;
  };
  source: string;
  sourceLayer?: string;
  state: {
    [key: string]: any;
  };
};
/**
 * A geojson feature
 */
declare class GeoJSONFeature {
  type: "Feature";
  _geometry: GeoJSON.Geometry;
  properties: {
    [name: string]: any;
  };
  id: number | string | undefined;
  _x: number;
  _y: number;
  _z: number;
  _vectorTileFeature: VectorTileFeatureLike;
  constructor(vectorTileFeature: VectorTileFeatureLike, z: number, x: number, y: number, id: string | number | undefined);
  private projectPoint;
  private projectLine;
  get geometry(): GeoJSON.Geometry;
  set geometry(g: GeoJSON.Geometry);
  toJSON(): any;
}
/**
 * A {@link LngLatBounds} object, an array of {@link LngLatLike} objects in [sw, ne] order,
 * or an array of numbers in [west, south, east, north] order.
 *
 * @group Geography and Geometry
 *
 * @example
 * ```ts
 * let v1 = new LngLatBounds(
 *   new LngLat(-73.9876, 40.7661),
 *   new LngLat(-73.9397, 40.8002)
 * );
 * let v2 = new LngLatBounds([-73.9876, 40.7661], [-73.9397, 40.8002])
 * let v3 = [[-73.9876, 40.7661], [-73.9397, 40.8002]];
 * ```
 */
type LngLatBoundsLike = LngLatBounds | [LngLatLike, LngLatLike] | [number, number, number, number];
/**
 * A `LngLatBounds` object represents a geographical bounding box,
 * defined by its southwest and northeast points in longitude and latitude.
 *
 * If no arguments are provided to the constructor, a `null` bounding box is created.
 *
 * Note that any Mapbox GL method that accepts a `LngLatBounds` object as an argument or option
 * can also accept an `Array` of two {@link LngLatLike} constructs and will perform an implicit conversion.
 * This flexible type is documented as {@link LngLatBoundsLike}.
 *
 * @group Geography and Geometry
 *
 * @example
 * ```ts
 * let sw = new LngLat(-73.9876, 40.7661);
 * let ne = new LngLat(-73.9397, 40.8002);
 * let llb = new LngLatBounds(sw, ne);
 * ```
 */
declare class LngLatBounds {
  _ne: LngLat;
  _sw: LngLat;
  /**
   * @param sw - The southwest corner of the bounding box.
   * OR array of 4 numbers in the order of  west, south, east, north
   * OR array of 2 LngLatLike: [sw,ne]
   * @param ne - The northeast corner of the bounding box.
   * @example
   * ```ts
   * let sw = new LngLat(-73.9876, 40.7661);
   * let ne = new LngLat(-73.9397, 40.8002);
   * let llb = new LngLatBounds(sw, ne);
   * ```
   * OR
   * ```ts
   * let llb = new LngLatBounds([-73.9876, 40.7661, -73.9397, 40.8002]);
   * ```
   * OR
   * ```ts
   * let llb = new LngLatBounds([sw, ne]);
   * ```
   */
  constructor(sw?: LngLatLike | [number, number, number, number] | [LngLatLike, LngLatLike], ne?: LngLatLike);
  /**
   * Set the northeast corner of the bounding box
   *
   * @param ne - a {@link LngLatLike} object describing the northeast corner of the bounding box.
   */
  setNorthEast(ne: LngLatLike): this;
  /**
   * Set the southwest corner of the bounding box
   *
   * @param sw - a {@link LngLatLike} object describing the southwest corner of the bounding box.
   */
  setSouthWest(sw: LngLatLike): this;
  /**
   * Extend the bounds to include a given LngLatLike or LngLatBoundsLike.
   *
   * @param obj - object to extend to
   */
  extend(obj: LngLatLike | LngLatBoundsLike): this;
  /**
   * Returns the geographical coordinate equidistant from the bounding box's corners.
   *
   * @returns The bounding box's center.
   * @example
   * ```ts
   * let llb = new LngLatBounds([-73.9876, 40.7661], [-73.9397, 40.8002]);
   * llb.getCenter(); // = LngLat {lng: -73.96365, lat: 40.78315}
   * ```
   */
  getCenter(): LngLat;
  /**
   * Returns the southwest corner of the bounding box.
   *
   * @returns The southwest corner of the bounding box.
   */
  getSouthWest(): LngLat;
  /**
   * Returns the northeast corner of the bounding box.
   *
   * @returns The northeast corner of the bounding box.
   */
  getNorthEast(): LngLat;
  /**
   * Returns the northwest corner of the bounding box.
   *
   * @returns The northwest corner of the bounding box.
   */
  getNorthWest(): LngLat;
  /**
   * Returns the southeast corner of the bounding box.
   *
   * @returns The southeast corner of the bounding box.
   */
  getSouthEast(): LngLat;
  /**
   * Returns the west edge of the bounding box.
   *
   * @returns The west edge of the bounding box.
   */
  getWest(): number;
  /**
   * Returns the south edge of the bounding box.
   *
   * @returns The south edge of the bounding box.
   */
  getSouth(): number;
  /**
   * Returns the east edge of the bounding box.
   *
   * @returns The east edge of the bounding box.
   */
  getEast(): number;
  /**
   * Returns the north edge of the bounding box.
   *
   * @returns The north edge of the bounding box.
   */
  getNorth(): number;
  /**
   * Returns the bounding box represented as an array.
   *
   * @returns The bounding box represented as an array, consisting of the
   * southwest and northeast coordinates of the bounding represented as arrays of numbers.
   * @example
   * ```ts
   * let llb = new LngLatBounds([-73.9876, 40.7661], [-73.9397, 40.8002]);
   * llb.toArray(); // = [[-73.9876, 40.7661], [-73.9397, 40.8002]]
   * ```
   */
  toArray(): [[number, number], [number, number]];
  /**
   * Return the bounding box represented as a string.
   *
   * @returns The bounding box represents as a string of the format
   * `'LngLatBounds(LngLat(lng, lat), LngLat(lng, lat))'`.
   * @example
   * ```ts
   * let llb = new LngLatBounds([-73.9876, 40.7661], [-73.9397, 40.8002]);
   * llb.toString(); // = "LngLatBounds(LngLat(-73.9876, 40.7661), LngLat(-73.9397, 40.8002))"
   * ```
   */
  toString(): string;
  /**
   * Check if the bounding box is an empty/`null`-type box.
   *
   * @returns True if bounds have been defined, otherwise false.
   */
  isEmpty(): boolean;
  /**
   * Check if the point is within the bounding box.
   *
   * @param lnglat - geographic point to check against.
   * @returns `true` if the point is within the bounding box.
   * @example
   * ```ts
   * let llb = new LngLatBounds(
   *   new LngLat(-73.9876, 40.7661),
   *   new LngLat(-73.9397, 40.8002)
   * );
   *
   * let ll = new LngLat(-73.9567, 40.7789);
   *
   * console.log(llb.contains(ll)); // = true
   * ```
   */
  contains(lnglat: LngLatLike): boolean;
  /**
   * Checks if this bounding box intersects with another bounding box.
   *
   * Returns true if the bounding boxes share any area, including cases where
   * they only touch along an edge or at a corner.
   *
   * This method properly handles cases where either or both bounding boxes cross
   * the antimeridian (date line).
   */
  intersects(other: LngLatBoundsLike): boolean;
  /**
   * Converts an array to a `LngLatBounds` object.
   *
   * If a `LngLatBounds` object is passed in, the function returns it unchanged.
   *
   * Internally, the function calls {@link LngLat.convert} to convert arrays to `LngLat` values.
   *
   * @param input - An array of two coordinates to convert, or a `LngLatBounds` object to return.
   * @returns A new `LngLatBounds` object, if a conversion occurred, or the original `LngLatBounds` object.
   * @example
   * ```ts
   * let arr = [[-73.9876, 40.7661], [-73.9397, 40.8002]];
   * let llb = LngLatBounds.convert(arr); // = LngLatBounds {_sw: LngLat {lng: -73.9876, lat: 40.7661}, _ne: LngLat {lng: -73.9397, lat: 40.8002}}
   * ```
   */
  static convert(input: LngLatBoundsLike | null): LngLatBounds;
  /**
   * Returns a `LngLatBounds` from the coordinates extended by a given `radius`. The returned `LngLatBounds` completely contains the `radius`.
   *
   * @param center - center coordinates of the new bounds.
   * @param radius - Distance in meters from the coordinates to extend the bounds.
   * @returns A new `LngLatBounds` object representing the coordinates extended by the `radius`.
   * @example
   * ```ts
   * let center = new LngLat(-73.9749, 40.7736);
   * LngLatBounds.fromLngLat(100).toArray(); // = [[-73.97501862141328, 40.77351016847229], [-73.97478137858673, 40.77368983152771]]
   * ```
   */
  static fromLngLat(center: LngLat, radius?: number): LngLatBounds;
  /**
   * Adjusts the given bounds to handle the case where the bounds cross the 180th meridian (antimeridian).
   *
   * @returns The adjusted LngLatBounds
   * @example
   * ```ts
   * let bounds = new LngLatBounds([175.813127, -20.157768], [-178. 340903, -15.449124]);
   * let adjustedBounds = bounds.adjustAntiMeridian();
   * // adjustedBounds will be: [[175.813127, -20.157768], [181.659097, -15.449124]]
   * ```
   */
  adjustAntiMeridian(): LngLatBounds;
}
/**
 * Options for setting padding on calls to methods such as {@link Map.fitBounds}, {@link Map.fitScreenCoordinates}, and {@link Map.setPadding}. Adjust these options to set the amount of padding in pixels added to the edges of the canvas. Set a uniform padding on all edges or individual values for each edge. All properties of this object must be
 * non-negative integers.
 *
 * @group Geography and Geometry
 *
 * @example
 * ```ts
 * let bbox = [[-79, 43], [-73, 45]];
 * map.fitBounds(bbox, {
 *   padding: {top: 10, bottom:25, left: 15, right: 5}
 * });
 * ```
 *
 * @example
 * ```ts
 * let bbox = [[-79, 43], [-73, 45]];
 * map.fitBounds(bbox, {
 *   padding: 20
 * });
 * ```
 * @see [Fit to the bounds of a LineString](https://maplibre.org/maplibre-gl-js/docs/examples/zoomto-linestring/)
 * @see [Fit a map to a bounding box](https://maplibre.org/maplibre-gl-js/docs/examples/fitbounds/)
 */
type PaddingOptions = RequireAtLeastOne<{
  /**
   * Padding in pixels from the top of the map canvas.
   */
  top: number;
  /**
   * Padding in pixels from the bottom of the map canvas.
   */
  bottom: number;
  /**
   * Padding in pixels from the left of the map canvas.
   */
  right: number;
  /**
   * Padding in pixels from the right of the map canvas.
   */
  left: number;
}>;
declare class TileCache {
  max: number;
  data: {
    [key: string]: Array<{
      value: Tile;
      timeout: ReturnType<typeof setTimeout>;
    }>;
  };
  order: Array<string>;
  onRemove: (element: Tile) => void;
  /**
   * @param max - number of permitted values
   * @param onRemove - callback called with items when they expire
   */
  constructor(max: number, onRemove: (element: Tile) => void);
  /**
   * Clear the cache
   *
   * @returns this cache
   */
  reset(): this;
  /**
   * Add a key, value combination to the cache, trimming its size if this pushes
   * it over max length.
   *
   * @param tileID - lookup key for the item
   * @param data - tile data
   *
   * @returns this cache
   */
  add(tileID: OverscaledTileID, data: Tile, expiryTimeout: number | void): this;
  /**
   * Determine whether the value attached to `key` is present
   *
   * @param tileID - the key to be looked-up
   * @returns whether the cache has this value
   */
  has(tileID: OverscaledTileID): boolean;
  /**
   * Get the value attached to a specific key and remove data from cache.
   * If the key is not found, returns `null`
   *
   * @param tileID - the key to look up
   * @returns the tile data, or null if it isn't found
   */
  getAndRemove(tileID: OverscaledTileID): Tile;
  _getAndRemoveByKey(key: string): Tile;
  getByKey(key: string): Tile;
  /**
   * Get the value attached to a specific key without removing data
   * from the cache. If the key is not found, returns `null`
   *
   * @param tileID - the key to look up
   * @returns the tile data, or null if it isn't found
   */
  get(tileID: OverscaledTileID): Tile;
  /**
   * Remove a key/value combination from the cache.
   *
   * @param tileID - the key for the pair to delete
   * @param value - If a value is provided, remove that exact version of the value.
   * @returns this cache
   */
  remove(tileID: OverscaledTileID, value?: {
    value: Tile;
    timeout: ReturnType<typeof setTimeout>;
  }): this;
  /**
   * Change the max size of the cache.
   *
   * @param max - the max size of the cache
   * @returns this cache
   */
  setMaxSize(max: number): TileCache;
  /**
   * Remove entries that do not pass a filter function. Used for removing
   * stale tiles from the cache.
   *
   * @param filterFn - Determines whether the tile is filtered. If the supplied function returns false, the tile will be filtered out.
   */
  filter(filterFn: (tile: Tile) => boolean): void;
}
declare class InViewTiles {
  private _tiles;
  handleWrapJump(wrapDelta: number): void;
  setFeatureState(featuresChanged: LayerFeatureStates, painter: any): void;
  getAllTiles(): Tile[];
  getAllIds(sorted?: boolean): string[];
  getTileById(key: string): Tile | undefined;
  setTile(key: string, tile: Tile): void;
  deleteTileById(key: string): void;
  /**
   * Get a currently loaded tile.
   * - a cached tile is not a loaded tile
   * @returns the tile if it's in view and had data, null otherwise.
   */
  getLoadedTile(tileID: OverscaledTileID): Tile | null;
  isIdRenderable(id: string, symbolLayer?: boolean): boolean;
  getRenderableIds(bearingInRadians?: number, symbolLayer?: boolean): Array<string>;
}
declare class WorkerPool {
  static workerCount: number;
  active: { [_ in number | string]: boolean };
  workers: Array<ActorTarget>;
  constructor();
  acquire(mapId: number | string): Array<ActorTarget>;
  release(mapId: number | string): void;
  isPreloaded(): boolean;
  numActive(): number;
}
/**
 * Responsible for sending messages from a {@link Source} to an associated worker source (usually with the same name).
 */
declare class Dispatcher {
  workerPool: WorkerPool;
  actors: Array<Actor>;
  currentActor: number;
  id: string | number;
  constructor(workerPool: WorkerPool, mapId: string | number);
  /**
   * Broadcast a message to all Workers.
   */
  broadcast<T extends MessageType>(type: T, data: RequestResponseMessageMap[T][0]): Promise<RequestResponseMessageMap[T][1][]>;
  /**
   * Acquires an actor to dispatch messages to. The actors are distributed in round-robin fashion.
   * @returns An actor object backed by a web worker for processing messages.
   */
  getActor(): Actor;
  remove(mapRemoved?: boolean): void;
  registerMessageHandler<T extends MessageType>(type: T, handler: MessageHandler<T>): void;
  unregisterMessageHandler<T extends MessageType>(type: T): void;
}
/**
 * A way to identify a feature, either by string or by number
 */
type GeoJSONFeatureId = number | string;
/**
 * The geojson source diff object - processed in the following order: remove, add, update. Provides an efficient
 * way to update GeoJSON data in a map source without having to replace the entire dataset.
 */
type GeoJSONSourceDiff = {
  /**
   * When set to `true` it will remove all features
   */
  removeAll?: boolean;
  /**
   * An array of features IDs to remove
   */
  remove?: Array<GeoJSONFeatureId>;
  /**
   * An array of features to add
   */
  add?: Array<GeoJSON.Feature>;
  /**
   * An array of update objects
   */
  update?: Array<GeoJSONFeatureDiff>;
};
/**
 * A geojson feature diff object - processed in the following order: new geometry, remove properties, add/update properties.
 * Provides an efficient way to update GeoJSON features in a map source without replacing the entire feature.
 */
type GeoJSONFeatureDiff = {
  /**
   * The feature ID
   */
  id: GeoJSONFeatureId;
  /**
   * If it's a new geometry, place it here
   */
  newGeometry?: GeoJSON.Geometry;
  /**
   * Setting to `true` will remove all preperties
   */
  removeAllProperties?: boolean;
  /**
   * The properties keys to remove
   */
  removeProperties?: Array<string>;
  /**
   * The properties to add or update along side their values
   */
  addOrUpdateProperties?: Array<{
    key: string;
    value: any;
  }>;
};
type GeoJSONSourceShouldReloadTileOptions = {
  /**
   * Refresh all tiles that WILL contain these bounds.
   */
  affectedBounds: LngLatBounds[];
};
/**
 * The cluster options to set
 */
type LoadTileResult = {
  /**
   * Indicates that the tile requested was not modified.
   */
  unmodified?: boolean;
};
type CanonicalTileRange = {
  minTileY: number;
  maxTileY: number;
  /**
   * Image can exceed the boundary of a single "world" (tile 0/0/0),
   * so we need to know the tile range for wrapping.
   */
  minTileXWrapped: number;
  maxTileXWrapped: number;
  minWrap: number;
  maxWrap: number;
};
/**
 * Options to add a canvas source type to the map.
 */
type CanvasSourceSpecification = {
  /**
   * Source type. Must be `"canvas"`.
   */
  type: "canvas";
  /**
   * Four geographical coordinates denoting where to place the corners of the canvas, specified in `[longitude, latitude]` pairs.
   */
  coordinates: [[number, number], [number, number], [number, number], [number, number]];
  /**
   * Whether the canvas source is animated. If the canvas is static (i.e. pixels do not need to be re-read on every frame), `animate` should be set to `false` to improve performance.
   * @defaultValue true
   */
  animate?: boolean;
  /**
   * Canvas source from which to read pixels. Can be a string representing the ID of the canvas element, or the `HTMLCanvasElement` itself.
   */
  canvas?: string | HTMLCanvasElement;
};
declare const enum IntersectionResult {
  None = 0,
  Partial = 1,
  Full = 2
}
interface IBoundingVolume {
  /**
   * Performs an intersection test with a frustum.
   */
  intersectsFrustum(frustum: Frustum): IntersectionResult;
  /**
   * Performs an intersection test with a half-space defined by a plane equation.
   * The half-space is assumed to lie on the positive side of the plane.
   */
  intersectsPlane(plane: vec4): IntersectionResult;
}
declare class Aabb implements IBoundingVolume {
  min: vec3;
  max: vec3;
  center: vec3;
  constructor(min_: vec3, max_: vec3);
  quadrant(index: number): Aabb;
  distanceX(point: Array<number>): number;
  distanceY(point: Array<number>): number;
  /**
   * Performs a frustum-aabb intersection test.
   */
  intersectsFrustum(frustum: Frustum): IntersectionResult;
  /**
   * Performs a halfspace-aabb intersection test.
   */
  intersectsPlane(plane: vec4): IntersectionResult;
}
declare class Frustum {
  points: vec4[];
  planes: vec4[];
  aabb: Aabb;
  constructor(points: vec4[], planes: vec4[], aabb: Aabb);
  static fromInvProjectionMatrix(invProj: mat4, worldSize?: number, zoom?: number, horizonPlane?: vec4, flippedNearFar?: boolean): Frustum;
}
type CoveringTilesOptions = {
  /**
   * Smallest allowed tile zoom.
   */
  minzoom?: number;
  /**
   * Largest allowed tile zoom.
   */
  maxzoom?: number;
  /**
   * Whether to round or floor the target zoom level. If true, the value will be rounded to the closest integer. Otherwise the value will be floored.
   */
  roundZoom?: boolean;
  /**
   * Tile size, expressed in screen pixels.
   */
  tileSize: number;
};
type CoveringTilesOptionsInternal = CoveringTilesOptions & {
  /**
   * `true` if tiles should be sent back to the worker for each overzoomed zoom level, `false` if not.
   * Fill this option when computing covering tiles for a source.
   * When true, any tile at `maxzoom` level that should be overscaled to a greater zoom will have
   * its zoom set to the overscaled greater zoom. When false, such tiles will have zoom set to `maxzoom`.
   */
  reparseOverscaled?: boolean;
  /**
   * When terrain is present, tile visibility will be computed in regards to the min and max elevations for each tile.
   */
  terrain?: Terrain;
  /**
   * Optional function to redefine how tiles are loaded at high pitch angles.
   */
  calculateTileZoom?: CalculateTileZoomFunction;
};
/**
 * Function to define how tiles are loaded at high pitch angles
 * @param requestedCenterZoom - the requested zoom level, valid at the center point.
 * @param distanceToTile2D - 2D distance from the camera to the candidate tile, in mercator units.
 * @param distanceToTileZ - vertical distance from the camera to the candidate tile, in mercator units.
 * @param distanceToCenter3D - distance from camera to center point, in mercator units
 * @param cameraVerticalFOV - camera vertical field of view, in degrees
 * @return the desired zoom level for this tile. May not be an integer.
 */
type CalculateTileZoomFunction = (requestedCenterZoom: number, distanceToTile2D: number, distanceToTileZ: number, distanceToCenter3D: number, cameraVerticalFOV: number) => number;
/**
 * The `Source` interface must be implemented by each source type, including "core" types (`vector`, `raster`,
 * `video`, etc.) and all custom, third-party types.
 *
 * **Event** `data` - Fired with `{dataType: 'source', sourceDataType: 'metadata'}` to indicate that any necessary metadata
 * has been loaded so that it's okay to call `loadTile`; and with `{dataType: 'source', sourceDataType: 'content'}`
 * to indicate that the source data has changed, so that any current caches should be flushed.
 *
 * @group Sources
 */
interface Source {
  readonly type: string;
  /**
   * The id for the source. Must not be used by any existing source.
   */
  id: string;
  /**
   * The minimum zoom level for the source.
   */
  minzoom: number;
  /**
   * The maximum zoom level for the source.
   */
  maxzoom: number;
  /**
   * The tile size for the source.
   */
  tileSize: number;
  /**
   * The attribution for the source.
   */
  attribution?: string;
  /**
   * `true` if zoom levels are rounded to the nearest integer in the source data, `false` if they are floor-ed to the nearest integer.
   */
  roundZoom?: boolean;
  /**
   * `false` if tiles can be drawn outside their boundaries, `true` if they cannot.
   */
  isTileClipped?: boolean;
  tileID?: CanonicalTileID;
  /**
   * `true` if tiles should be sent back to the worker for each overzoomed zoom level, `false` if not.
   */
  reparseOverscaled?: boolean;
  vectorLayerIds?: Array<string>;
  /**
   * True if the source has transition, false otherwise.
   */
  hasTransition(): boolean;
  /**
   * True if the source is loaded, false otherwise.
   */
  loaded(): boolean;
  /**
   * An ability to fire an event to all the listeners, see {@link Evented}
   * @param event - The event to fire
   */
  fire(event: Event$1): unknown;
  /**
   * This method is called when the source is added to the map.
   * @param map - The map instance
   */
  onAdd?(map: Map$1): void;
  /**
   * This method is called when the source is removed from the map.
   * @param map - The map instance
   */
  onRemove?(map: Map$1): void;
  /**
   * This method does the heavy lifting of loading a tile.
   * In most cases it will defer the work to the relevant worker source.
   * @param tile - The tile to load
   */
  loadTile(tile: Tile): Promise<LoadTileResult | void>;
  /**
   * True is the tile is part of the source, false otherwise.
   * @param tileID - The tile ID
   */
  hasTile?(tileID: OverscaledTileID): boolean;
  /**
   * Allows to abort a tile loading.
   * @param tile - The tile to abort
   */
  abortTile?(tile: Tile): Promise<void>;
  /**
   * Allows to unload a tile.
   * @param tile - The tile to unload
   */
  unloadTile?(tile: Tile): Promise<void>;
  /**
   * @returns A plain (stringifiable) JS object representing the current state of the source.
   * Creating a source using the returned object as the `options` should result in a Source that is
   * equivalent to this one.
   */
  serialize(): any;
  /**
   * Allows to execute a prepare step before the source is used.
   */
  prepare?(): void;
  /**
   * Optional function to redefine how tiles are loaded at high pitch angles.
   */
  calculateTileZoom?: CalculateTileZoomFunction;
  /**
   * Optional function to determine whether a tile should be reloaded, given a
   * set of options associated with a `MapSourceDataChangedEvent`.
   * @internal
   */
  shouldReloadTile?(tile: Tile, options: GeoJSONSourceShouldReloadTileOptions): boolean;
}
type TileResult = {
  tile: Tile;
  tileID: OverscaledTileID;
  queryGeometry: Array<Point>;
  cameraQueryGeometry: Array<Point>;
  scale: number;
};
declare class TileManager extends Evented {
  id: string;
  dispatcher: Dispatcher;
  map: Map$1;
  style: Style;
  _source: Source;
  /**
   * @internal
   * signifies that the TileJSON is loaded if applicable.
   * if the source type does not come with a TileJSON, the flag signifies the
   * source data has loaded (i.e geojson has been tiled on the worker and is ready)
   */
  _sourceLoaded: boolean;
  _sourceErrored: boolean;
  _inViewTiles: InViewTiles;
  _prevLng: number;
  _outOfViewCache: TileCache;
  _timers: Record<string, ReturnType<typeof setTimeout>>;
  _maxTileCacheSize: number;
  _maxTileCacheZoomLevels: number;
  _paused: boolean;
  _shouldReloadOnResume: boolean;
  transform: ITransform;
  terrain: Terrain;
  used: boolean;
  usedForTerrain: boolean;
  tileSize: number;
  _state: SourceFeatureState;
  _didEmitContent: boolean;
  _updated: boolean;
  _rasterFadeDuration: number;
  _maxFadingAncestorLevels: number;
  static maxUnderzooming: number;
  static maxOverzooming: number;
  constructor(id: string, options: SourceSpecification | CanvasSourceSpecification, dispatcher: Dispatcher);
  onAdd(map: Map$1): void;
  onRemove(map: Map$1): void;
  /**
   * Return true if no tile data is pending, tiles will not change unless
   * an additional API call is received.
   */
  loaded(): boolean;
  getSource(): Source;
  getState(): SourceFeatureState;
  pause(): void;
  resume(): void;
  _loadTile(tile: Tile, id: string, state: TileState): Promise<void>;
  _unloadTile(tile: Tile): void;
  _abortTile(tile: Tile): void;
  serialize(): any;
  prepare(context: Context): void;
  /**
   * Return all tile ids ordered with z-order, and cast to numbers
   */
  getIds(): Array<string>;
  getRenderableIds(symbolLayer?: boolean): Array<string>;
  hasRenderableParent(tileID: OverscaledTileID): boolean;
  /**
   * Reload tiles based on the current state of the source.
   * @param sourceDataChanged - If `true`, reload all tiles using a state of 'expired', otherwise reload only non-errored tiles using state of 'reloading'.
   * @param shouldReloadTileOptions - Set of options associated with a `MapSourceDataChangedEvent` that can be passed back to the associated `Source` determine whether a tile should be reloaded.
   */
  reload(sourceDataChanged?: boolean, shouldReloadTileOptions?: any): void;
  _reloadTile(id: string, state: TileState): Promise<void>;
  _tileLoaded(tile: Tile, id: string, previousState: TileState, result: LoadTileResult): void;
  /**
   * Get a specific tile by TileID
   */
  getTile(tileID: OverscaledTileID): Tile;
  /**
   * Get a specific tile by id
   */
  getTileByID(id: string): Tile | undefined;
  /**
   * Retain the uppermost loaded children of each provided target tile, within a variable covering zoom range.
   *
   * On pitched maps, different parts of the screen show different zoom levels simultaneously.
   * Ideal tiles are generated using coveringTiles() above, which returns the ideal tile set for
   * the current pitched plane, which can carry tiles of varying zooms (overscaledZ).
   * See: https://maplibre.org/maplibre-gl-js/docs/examples/level-of-detail-control/
   *
   * A fixed `maxCoveringZoom` on a pitched map would incorrectly intersect with some
   * ideal tiles and cause distant high-pitch tiles to skip their uppermost children.
   *
   * To solve this, we calculate the max covering zoom for each ideal tile separately using its
   * `overscaledZ`. This effectively makes the "max covering zoom plane" parallel to the
   * "ideal tile plane," ensuring that we correctly capture the uppermost children
   * of each ideal tile across the pitched view.
   *
   * Analogy: imagine two sheets of paper in 3D space:
   *   - one sheet = ideal tiles at varying overscaledZ
   *   - the second sheet = maxCoveringZoom
   *
   * @param retainTileMap - this parameters will be updated with the child tiles to keep
   * @param idealTilesWithoutData - which of the ideal tiles currently does not have loaded data
   * @return a set of tiles that need to be loaded
   */
  _retainLoadedChildren(retainTileMap: Record<string, OverscaledTileID>, idealTilesWithoutData: Set<OverscaledTileID>): Set<OverscaledTileID>;
  /**
   * Return dictionary of qualified loaded descendents for each provided target tile id
   */
  _getLoadedDescendents(targetTileIDs: Set<OverscaledTileID>): Record<string, Tile[]>;
  /**
   * Determine if tile ids fully cover the current generation.
   * - 1st generation: need 4 children or 1 overscaled child
   * - 2nd generation: need 16 children or 1 overscaled child
   */
  _areDescendentsComplete(generationIDs: OverscaledTileID[], generationZ: number, ancestorZ: number): boolean;
  /**
   * Get a currently loaded tile.
   * - a cached tile is not a loaded tile
   * @returns the tile if it's in view and had data, null otherwise.
   */
  getLoadedTile(tileID: OverscaledTileID): Tile | null;
  /**
   * Resizes the tile cache based on the current viewport's size
   * or the maxTileCacheSize option passed during map creation
   *
   * Larger viewports use more tiles and need larger caches. Larger viewports
   * are more likely to be found on devices with more memory and on pages where
   * the map is more important.
   */
  updateCacheSize(transform: IReadonlyTransform): void;
  handleWrapJump(lng: number): void;
  /**
   * Removes tiles that are outside the viewport and adds new tiles that
   * are inside the viewport.
   */
  update(transform: ITransform, terrain?: Terrain): void;
  /**
   * Remove raster tiles that are no longer retained
   */
  _cleanUpRasterTiles(retain: Record<string, OverscaledTileID>): void;
  /**
   * Remove vector tiles that are no longer retained and also not needed for symbol fading
   */
  _cleanUpVectorTiles(retain: Record<string, OverscaledTileID>): void;
  /**
   * Add ideal tiles needed for 3D terrain rendering
   */
  _addTerrainIdealTiles(idealTileIDs: OverscaledTileID[]): OverscaledTileID[];
  releaseSymbolFadeTiles(): void;
  /**
   * Set tiles to be retained on update of the source. For ideal tiles that do not have data, retain their loaded
   * children so they can be displayed as substitutes pending load of each ideal tile (to reduce flickering).
   * If no loaded children are available, fallback to seeking loaded parents as an alternative substitute.
   */
  _updateRetainedTiles(idealTileIDs: Array<OverscaledTileID>, zoom: number): Record<string, OverscaledTileID>;
  /**
   * Add a tile, given its coordinate, to the pyramid.
   */
  _addTile(tileID: OverscaledTileID): Tile;
  /**
   * Set a timeout to reload the tile after it expires
   */
  _setTileReloadTimer(id: string, tile: Tile): void;
  _clearTileReloadTimer(id: string): void;
  _resetTileReloadTimers(): void;
  /**
   * Reload any currently renderable tiles that are match one of the incoming `tileId` x/y/z
   */
  refreshTiles(tileIds: Array<ICanonicalTileID>): void;
  /**
   * Remove a tile, given its id, from the pyramid
   */
  _removeTile(id: string): void;
  /** @internal
   * Handles incoming source data messages (i.e. after the source has been updated via a worker that has fired
   * to map.ts data event). For sources with mutable data, the 'content' event fires when the underlying data
   * to a source has changed. (i.e. GeoJSONSource.setData and ImageSource.setCoordinates)
   */
  private _dataHandler;
  /**
   * Remove all tiles from this pyramid
   */
  clearTiles(): void;
  /**
   * Search through our current tiles and attempt to find the tiles that
   * cover the given bounds.
   * @param pointQueryGeometry - coordinates of the corners of bounding rectangle
   * @returns result items have `{tile, minX, maxX, minY, maxY}`, where min/max bounding values are the given bounds transformed in into the coordinate space of this tile.
   */
  tilesIn(pointQueryGeometry: Array<Point>, maxPitchScaleFactor: number, has3DLayer: boolean): TileResult[];
  private transformBbox;
  getVisibleCoordinates(symbolLayer?: boolean): Array<OverscaledTileID>;
  hasTransition(): boolean;
  setRasterFadeDuration(fadeDuration: number): void;
  /**
   * Set the value of a particular state for a feature
   */
  setFeatureState(sourceLayer: string, featureId: number | string, state: any): void;
  /**
   * Resets the value of a particular state key for a feature
   */
  removeFeatureState(sourceLayer?: string, featureId?: number | string, key?: string): void;
  /**
   * Get the entire state object for a feature
   */
  getFeatureState(sourceLayer: string, featureId: number | string): FeatureState;
  /**
   * Sets the set of keys that the tile depends on. This allows tiles to
   * be reloaded when their dependencies change.
   */
  setDependencies(tileKey: string, namespace: string, dependencies: Array<string>): void;
  /**
   * Reloads all tiles that depend on the given keys.
   */
  reloadTilesForDependencies(namespaces: Array<string>, keys: Array<string>): void;
  areTilesLoaded(): boolean;
}
declare class TerrainTileManager extends Evented {
  /**
   * tile manager for the raster-dem source.
   */
  tileManager: TileManager;
  /**
   * stores all render-to-texture tiles.
   */
  _tiles: {
    [_: string]: Tile;
  };
  /**
   * contains a list of tileID-keys for the current scene. (only for performance)
   */
  _renderableTilesKeys: Array<string>;
  /**
   * raster-dem-tile for a TileID cache.
   */
  _sourceTileCache: {
    [_: string]: string;
  };
  /**
   * minimum zoomlevel to render the terrain.
   */
  minzoom: number;
  /**
   * maximum zoomlevel to render the terrain.
   */
  maxzoom: number;
  /**
   * render-to-texture tileSize in scene.
   */
  tileSize: number;
  /**
   * raster-dem tiles will load for performance the actualZoom - deltaZoom zoom-level.
   */
  deltaZoom: number;
  /**
   * used to determine whether depth & coord framebuffers need updating
   */
  _lastTilesetChange: number;
  constructor(tileManager: TileManager);
  destruct(): void;
  getSource(): Source;
  /**
   * Load Terrain Tiles, create internal render-to-texture tiles, free GPU memory.
   * @param transform - the operation to do
   * @param terrain - the terrain
   */
  update(transform: ITransform, terrain: Terrain): void;
  /**
   * Free render to texture cache
   * @param tileID - optional, free only corresponding to tileID.
   */
  freeRtt(tileID?: OverscaledTileID): void;
  /**
   * get a list of tiles, which are loaded and should be rendered in the current scene
   * @returns the renderable tiles
   */
  getRenderableTiles(): Array<Tile>;
  /**
   * get terrain tile by the TileID key
   * @param id - the tile id
   * @returns the tile
   */
  getTileByID(id: string): Tile;
  /**
   * Searches for the corresponding current renderable terrain-tiles
   * @param tileID - the tile to look for
   * @returns the tiles that were found
   */
  getTerrainCoords(tileID: OverscaledTileID, terrainTileRanges?: {
    [zoom: string]: CanonicalTileRange;
  }): Record<string, OverscaledTileID>;
  /**
   * Searches for the corresponding current renderable terrain-tiles.
   * Includes terrain tiles that are either:
   * - the same as the tileID
   * - a parent of the tileID
   * - a child of the tileID
   * @param tileID - the tile to look for
   * @returns the tiles that were found
   */
  _getTerrainCoordsForRegularTile(tileID: OverscaledTileID): Record<string, OverscaledTileID>;
  /**
   * Searches for the corresponding current renderable terrain-tiles.
   * Includes terrain tiles that are within terrain tile ranges.
   * @param tileID - the tile to look for
   * @returns the tiles that were found
   */
  _getTerrainCoordsForTileRanges(tileID: OverscaledTileID, terrainTileRanges: {
    [zoom: string]: CanonicalTileRange;
  }): Record<string, OverscaledTileID>;
  /**
   * find the covering raster-dem tile
   * @param tileID - the tile to look for
   * @param searchForDEM - Optional parameter to search for (parent) source tiles with loaded dem.
   * @returns the tile
   */
  getSourceTile(tileID: OverscaledTileID, searchForDEM?: boolean): Tile | undefined;
  findTileInCaches(key: string): Tile | undefined;
  /**
   * gets whether any tiles were loaded after a specific time. This is used to update depth & coords framebuffers.
   * @param time - the time
   * @returns true if any tiles came into view at or after the specified time
   */
  anyTilesAfterTime(time?: number): boolean;
  /**
   * Checks whether a tile is within the canonical tile ranges.
   * @param tileID - Tile to check
   * @param canonicalTileRanges - Canonical tile ranges
   * @returns
   */
  private _isWithinTileRanges;
}
declare class Mesh {
  vertexBuffer: VertexBuffer;
  indexBuffer: IndexBuffer;
  segments: SegmentVector;
  constructor(vertexBuffer: VertexBuffer, indexBuffer: IndexBuffer, segments: SegmentVector);
  destroy(): void;
}
type GlyphMetrics = {
  width: number;
  height: number;
  left: number;
  top: number;
  advance: number;
  /**
   * isDoubleResolution = true for 48px textures
   */
  isDoubleResolution?: boolean;
};
/**
 * A style glyph type
 */
type StyleGlyph = {
  id: number;
  bitmap: AlphaImage;
  metrics: GlyphMetrics;
};
type Rect = {
  x: number;
  y: number;
  w: number;
  h: number;
};
/**
 * The glyph's position
 */
type GlyphPosition = {
  rect: Rect;
  metrics: GlyphMetrics;
};
/**
 * The glyphs' positions
 */
type GlyphPositions = {
  [_: string]: {
    [_: number]: GlyphPosition;
  };
};
declare enum WritingMode {
  none = 0,
  horizontal = 1,
  vertical = 2,
  horizontalOnly = 3
}
declare class Anchor extends Point {
  angle: any;
  segment?: number;
  constructor(x: number, y: number, angle: number, segment?: number);
  clone(): Anchor;
}
type SymbolLayoutProps = {
  "symbol-placement": DataConstantProperty<"point" | "line" | "line-center">;
  "symbol-spacing": DataConstantProperty<number>;
  "symbol-avoid-edges": DataConstantProperty<boolean>;
  "symbol-sort-key": DataDrivenProperty<number>;
  "symbol-z-order": DataConstantProperty<"auto" | "viewport-y" | "source">;
  "icon-allow-overlap": DataConstantProperty<boolean>;
  "icon-overlap": DataConstantProperty<"never" | "always" | "cooperative">;
  "icon-ignore-placement": DataConstantProperty<boolean>;
  "icon-optional": DataConstantProperty<boolean>;
  "icon-rotation-alignment": DataConstantProperty<"map" | "viewport" | "auto">;
  "icon-size": DataDrivenProperty<number>;
  "icon-text-fit": DataConstantProperty<"none" | "width" | "height" | "both">;
  "icon-text-fit-padding": DataConstantProperty<[number, number, number, number]>;
  "icon-image": DataDrivenProperty<ResolvedImage>;
  "icon-rotate": DataDrivenProperty<number>;
  "icon-padding": DataDrivenProperty<Padding>;
  "icon-keep-upright": DataConstantProperty<boolean>;
  "icon-offset": DataDrivenProperty<[number, number]>;
  "icon-anchor": DataDrivenProperty<"center" | "left" | "right" | "top" | "bottom" | "top-left" | "top-right" | "bottom-left" | "bottom-right">;
  "icon-pitch-alignment": DataConstantProperty<"map" | "viewport" | "auto">;
  "text-pitch-alignment": DataConstantProperty<"map" | "viewport" | "auto">;
  "text-rotation-alignment": DataConstantProperty<"map" | "viewport" | "viewport-glyph" | "auto">;
  "text-field": DataDrivenProperty<Formatted>;
  "text-font": DataDrivenProperty<Array<string>>;
  "text-size": DataDrivenProperty<number>;
  "text-max-width": DataDrivenProperty<number>;
  "text-line-height": DataConstantProperty<number>;
  "text-letter-spacing": DataDrivenProperty<number>;
  "text-justify": DataDrivenProperty<"auto" | "left" | "center" | "right">;
  "text-radial-offset": DataDrivenProperty<number>;
  "text-variable-anchor": DataConstantProperty<Array<"center" | "left" | "right" | "top" | "bottom" | "top-left" | "top-right" | "bottom-left" | "bottom-right">>;
  "text-variable-anchor-offset": DataDrivenProperty<VariableAnchorOffsetCollection>;
  "text-anchor": DataDrivenProperty<"center" | "left" | "right" | "top" | "bottom" | "top-left" | "top-right" | "bottom-left" | "bottom-right">;
  "text-max-angle": DataConstantProperty<number>;
  "text-writing-mode": DataConstantProperty<Array<"horizontal" | "vertical">>;
  "text-rotate": DataDrivenProperty<number>;
  "text-padding": DataConstantProperty<number>;
  "text-keep-upright": DataConstantProperty<boolean>;
  "text-transform": DataDrivenProperty<"none" | "uppercase" | "lowercase">;
  "text-offset": DataDrivenProperty<[number, number]>;
  "text-allow-overlap": DataConstantProperty<boolean>;
  "text-overlap": DataConstantProperty<"never" | "always" | "cooperative">;
  "text-ignore-placement": DataConstantProperty<boolean>;
  "text-optional": DataConstantProperty<boolean>;
};
type SymbolLayoutPropsPossiblyEvaluated = {
  "symbol-placement": "point" | "line" | "line-center";
  "symbol-spacing": number;
  "symbol-avoid-edges": boolean;
  "symbol-sort-key": PossiblyEvaluatedPropertyValue<number>;
  "symbol-z-order": "auto" | "viewport-y" | "source";
  "icon-allow-overlap": boolean;
  "icon-overlap": "never" | "always" | "cooperative";
  "icon-ignore-placement": boolean;
  "icon-optional": boolean;
  "icon-rotation-alignment": "map" | "viewport" | "auto";
  "icon-size": PossiblyEvaluatedPropertyValue<number>;
  "icon-text-fit": "none" | "width" | "height" | "both";
  "icon-text-fit-padding": [number, number, number, number];
  "icon-image": PossiblyEvaluatedPropertyValue<ResolvedImage>;
  "icon-rotate": PossiblyEvaluatedPropertyValue<number>;
  "icon-padding": PossiblyEvaluatedPropertyValue<Padding>;
  "icon-keep-upright": boolean;
  "icon-offset": PossiblyEvaluatedPropertyValue<[number, number]>;
  "icon-anchor": PossiblyEvaluatedPropertyValue<"center" | "left" | "right" | "top" | "bottom" | "top-left" | "top-right" | "bottom-left" | "bottom-right">;
  "icon-pitch-alignment": "map" | "viewport" | "auto";
  "text-pitch-alignment": "map" | "viewport" | "auto";
  "text-rotation-alignment": "map" | "viewport" | "viewport-glyph" | "auto";
  "text-field": PossiblyEvaluatedPropertyValue<Formatted>;
  "text-font": PossiblyEvaluatedPropertyValue<Array<string>>;
  "text-size": PossiblyEvaluatedPropertyValue<number>;
  "text-max-width": PossiblyEvaluatedPropertyValue<number>;
  "text-line-height": number;
  "text-letter-spacing": PossiblyEvaluatedPropertyValue<number>;
  "text-justify": PossiblyEvaluatedPropertyValue<"auto" | "left" | "center" | "right">;
  "text-radial-offset": PossiblyEvaluatedPropertyValue<number>;
  "text-variable-anchor": Array<"center" | "left" | "right" | "top" | "bottom" | "top-left" | "top-right" | "bottom-left" | "bottom-right">;
  "text-variable-anchor-offset": PossiblyEvaluatedPropertyValue<VariableAnchorOffsetCollection>;
  "text-anchor": PossiblyEvaluatedPropertyValue<"center" | "left" | "right" | "top" | "bottom" | "top-left" | "top-right" | "bottom-left" | "bottom-right">;
  "text-max-angle": number;
  "text-writing-mode": Array<"horizontal" | "vertical">;
  "text-rotate": PossiblyEvaluatedPropertyValue<number>;
  "text-padding": number;
  "text-keep-upright": boolean;
  "text-transform": PossiblyEvaluatedPropertyValue<"none" | "uppercase" | "lowercase">;
  "text-offset": PossiblyEvaluatedPropertyValue<[number, number]>;
  "text-allow-overlap": boolean;
  "text-overlap": "never" | "always" | "cooperative";
  "text-ignore-placement": boolean;
  "text-optional": boolean;
};
type SymbolPaintProps = {
  "icon-opacity": DataDrivenProperty<number>;
  "icon-color": DataDrivenProperty<Color>;
  "icon-halo-color": DataDrivenProperty<Color>;
  "icon-halo-width": DataDrivenProperty<number>;
  "icon-halo-blur": DataDrivenProperty<number>;
  "icon-translate": DataConstantProperty<[number, number]>;
  "icon-translate-anchor": DataConstantProperty<"map" | "viewport">;
  "text-opacity": DataDrivenProperty<number>;
  "text-color": DataDrivenProperty<Color>;
  "text-halo-color": DataDrivenProperty<Color>;
  "text-halo-width": DataDrivenProperty<number>;
  "text-halo-blur": DataDrivenProperty<number>;
  "text-translate": DataConstantProperty<[number, number]>;
  "text-translate-anchor": DataConstantProperty<"map" | "viewport">;
};
type SymbolPaintPropsPossiblyEvaluated = {
  "icon-opacity": PossiblyEvaluatedPropertyValue<number>;
  "icon-color": PossiblyEvaluatedPropertyValue<Color>;
  "icon-halo-color": PossiblyEvaluatedPropertyValue<Color>;
  "icon-halo-width": PossiblyEvaluatedPropertyValue<number>;
  "icon-halo-blur": PossiblyEvaluatedPropertyValue<number>;
  "icon-translate": [number, number];
  "icon-translate-anchor": "map" | "viewport";
  "text-opacity": PossiblyEvaluatedPropertyValue<number>;
  "text-color": PossiblyEvaluatedPropertyValue<Color>;
  "text-halo-color": PossiblyEvaluatedPropertyValue<Color>;
  "text-halo-width": PossiblyEvaluatedPropertyValue<number>;
  "text-halo-blur": PossiblyEvaluatedPropertyValue<number>;
  "text-translate": [number, number];
  "text-translate-anchor": "map" | "viewport";
};
declare class SymbolStyleLayer extends StyleLayer {
  _unevaluatedLayout: Layout<SymbolLayoutProps>;
  layout: PossiblyEvaluated<SymbolLayoutProps, SymbolLayoutPropsPossiblyEvaluated>;
  _transitionablePaint: Transitionable<SymbolPaintProps>;
  _transitioningPaint: Transitioning<SymbolPaintProps>;
  paint: PossiblyEvaluated<SymbolPaintProps, SymbolPaintPropsPossiblyEvaluated>;
  constructor(layer: LayerSpecification, globalState: Record<string, any>);
  recalculate(parameters: EvaluationParameters, availableImages: Array<string>): void;
  getValueAndResolveTokens(name: any, feature: Feature, canonical: CanonicalTileID, availableImages: Array<string>): any;
  createBucket(parameters: BucketParameters<any>): SymbolBucket;
  queryRadius(): number;
  queryIntersectsFeature(): boolean;
  _setPaintOverrides(): void;
  _handleOverridablePaintPropertyUpdate<T, R>(name: string, oldValue: PropertyValue<T, R>, newValue: PropertyValue<T, R>): boolean;
  static hasPaintOverride(layout: PossiblyEvaluated<SymbolLayoutProps, SymbolLayoutPropsPossiblyEvaluated>, propertyName: string): boolean;
}
type SymbolQuad = {
  tl: Point;
  tr: Point;
  bl: Point;
  br: Point;
  tex: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
  pixelOffsetTL: Point;
  pixelOffsetBR: Point;
  writingMode: any | void;
  glyphOffset: [number, number];
  sectionIndex: number;
  isSDF: boolean;
  minFontScaleX: number;
  minFontScaleY: number;
};
type SizeData = {
  kind: "constant";
  layoutSize: number;
} | {
  kind: "source";
} | {
  kind: "camera";
  minZoom: number;
  maxZoom: number;
  minSize: number;
  maxSize: number;
  interpolationType: InterpolationType;
} | {
  kind: "composite";
  minZoom: number;
  maxZoom: number;
  interpolationType: InterpolationType;
};
type SingleCollisionBox = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  anchorPointX: number;
  anchorPointY: number;
};
type CollisionArrays = {
  textBox?: SingleCollisionBox;
  verticalTextBox?: SingleCollisionBox;
  iconBox?: SingleCollisionBox;
  verticalIconBox?: SingleCollisionBox;
  textFeatureIndex?: number;
  verticalTextFeatureIndex?: number;
  iconFeatureIndex?: number;
  verticalIconFeatureIndex?: number;
};
type SymbolFeature = {
  sortKey: number | void;
  text: Formatted | void;
  icon: ResolvedImage;
  index: number;
  sourceLayerIndex: number;
  geometry: Array<Array<Point>>;
  properties: any;
  type: "Unknown" | "Point" | "LineString" | "Polygon";
  id?: any;
};
type SortKeyRange = {
  sortKey: number;
  symbolInstanceStart: number;
  symbolInstanceEnd: number;
};
declare function addDynamicAttributes(dynamicLayoutVertexArray: StructArray, p: Point, angle: number): void;
declare class SymbolBuffers {
  layoutVertexArray: SymbolLayoutArray;
  layoutVertexBuffer: VertexBuffer;
  indexArray: TriangleIndexArray;
  indexBuffer: IndexBuffer;
  programConfigurations: ProgramConfigurationSet<SymbolStyleLayer>;
  segments: SegmentVector;
  dynamicLayoutVertexArray: SymbolDynamicLayoutArray;
  dynamicLayoutVertexBuffer: VertexBuffer;
  opacityVertexArray: SymbolOpacityArray;
  opacityVertexBuffer: VertexBuffer;
  hasVisibleVertices: boolean;
  collisionVertexArray: CollisionVertexArray;
  collisionVertexBuffer: VertexBuffer;
  placedSymbolArray: PlacedSymbolArray;
  constructor(programConfigurations: ProgramConfigurationSet<SymbolStyleLayer>);
  isEmpty(): boolean;
  upload(context: Context, dynamicIndexBuffer: boolean, upload?: boolean, update?: boolean): void;
  destroy(): void;
}
declare class CollisionBuffers {
  layoutVertexArray: StructArray;
  layoutAttributes: Array<StructArrayMember>;
  layoutVertexBuffer: VertexBuffer;
  indexArray: TriangleIndexArray | LineIndexArray;
  indexBuffer: IndexBuffer;
  segments: SegmentVector;
  collisionVertexArray: CollisionVertexArray;
  collisionVertexBuffer: VertexBuffer;
  constructor(LayoutArray: {
    new (...args: any): StructArray;
  }, layoutAttributes: Array<StructArrayMember>, IndexArray: {
    new (...args: any): TriangleIndexArray | LineIndexArray;
  });
  upload(context: Context): void;
  destroy(): void;
}
declare class SymbolBucket implements Bucket {
  static MAX_GLYPHS: number;
  static addDynamicAttributes: typeof addDynamicAttributes;
  collisionBoxArray: CollisionBoxArray;
  zoom: number;
  overscaling: number;
  layers: Array<SymbolStyleLayer>;
  layerIds: Array<string>;
  stateDependentLayers: Array<SymbolStyleLayer>;
  stateDependentLayerIds: Array<string>;
  index: number;
  sdfIcons: boolean;
  iconsInText: boolean;
  iconsNeedLinear: boolean;
  bucketInstanceId: number;
  justReloaded: boolean;
  hasDependencies: boolean;
  textSizeData: SizeData;
  iconSizeData: SizeData;
  glyphOffsetArray: GlyphOffsetArray;
  lineVertexArray: SymbolLineVertexArray;
  features: Array<SymbolFeature>;
  symbolInstances: SymbolInstanceArray;
  textAnchorOffsets: TextAnchorOffsetArray;
  collisionArrays: Array<CollisionArrays>;
  sortKeyRanges: Array<SortKeyRange>;
  pixelRatio: number;
  tilePixelRatio: number;
  compareText: {
    [_: string]: Array<Point>;
  };
  fadeStartTime: number;
  sortFeaturesByKey: boolean;
  sortFeaturesByY: boolean;
  canOverlap: boolean;
  sortedAngle: number;
  featureSortOrder: Array<number>;
  collisionCircleArray: Array<number>;
  text: SymbolBuffers;
  icon: SymbolBuffers;
  textCollisionBox: CollisionBuffers;
  iconCollisionBox: CollisionBuffers;
  uploaded: boolean;
  sourceLayerIndex: number;
  sourceID: string;
  symbolInstanceIndexes: Array<number>;
  writingModes: WritingMode[];
  allowVerticalPlacement: boolean;
  hasRTLText: boolean;
  constructor(options: BucketParameters<SymbolStyleLayer>);
  createArrays(): void;
  private calculateGlyphDependencies;
  populate(features: Array<IndexedFeature>, options: PopulateParameters, canonical: CanonicalTileID): void;
  update(states: FeatureStates, vtLayer: VectorTileLayerLike, imagePositions: {
    [_: string]: ImagePosition;
  }): void;
  isEmpty(): boolean;
  uploadPending(): boolean;
  upload(context: Context): void;
  destroyDebugData(): void;
  destroy(): void;
  addToLineVertexArray(anchor: Anchor, line: Array<Point>): {
    lineStartIndex: number;
    lineLength: number;
  };
  addSymbols(arrays: SymbolBuffers, quads: Array<SymbolQuad>, sizeVertex: any, lineOffset: [number, number], alongLine: boolean, feature: SymbolFeature, writingMode: WritingMode, labelAnchor: Anchor, lineStartIndex: number, lineLength: number, associatedIconIndex: number, canonical: CanonicalTileID): void;
  _addCollisionDebugVertex(layoutVertexArray: StructArray, collisionVertexArray: StructArray, point: Point, anchorX: number, anchorY: number, extrude: Point): any;
  addCollisionDebugVertices(x1: number, y1: number, x2: number, y2: number, arrays: CollisionBuffers, boxAnchorPoint: Point, symbolInstance: SymbolInstance): void;
  addDebugCollisionBoxes(startIndex: number, endIndex: number, symbolInstance: SymbolInstance, isText: boolean): void;
  generateCollisionDebugBuffers(): void;
  _deserializeCollisionBoxesForSymbol(collisionBoxArray: CollisionBoxArray, textStartIndex: number, textEndIndex: number, verticalTextStartIndex: number, verticalTextEndIndex: number, iconStartIndex: number, iconEndIndex: number, verticalIconStartIndex: number, verticalIconEndIndex: number): CollisionArrays;
  deserializeCollisionBoxes(collisionBoxArray: CollisionBoxArray): void;
  hasTextData(): boolean;
  hasIconData(): boolean;
  hasDebugData(): CollisionBuffers;
  hasTextCollisionBoxData(): boolean;
  hasIconCollisionBoxData(): boolean;
  addIndicesForPlacedSymbol(iconOrText: SymbolBuffers, placedSymbolIndex: number): void;
  getSortedSymbolIndexes(angle: number): any[];
  addToSortKeyRanges(symbolInstanceIndex: number, sortKey: number): void;
  sortFeatures(angle: number): void;
}
interface SymbolsByKeyEntry {
  index?: KDBush;
  positions?: {
    x: number;
    y: number;
  }[];
  crossTileIDs: number[];
}
declare class TileLayerIndex {
  tileID: OverscaledTileID;
  bucketInstanceId: number;
  _symbolsByKey: Record<number, SymbolsByKeyEntry>;
  constructor(tileID: OverscaledTileID, symbolInstances: SymbolInstanceArray, bucketInstanceId: number);
  getScaledCoordinates(symbolInstance: SymbolInstance, childTileID: OverscaledTileID): {
    x: number;
    y: number;
  };
  findMatches(symbolInstances: SymbolInstanceArray, newTileID: OverscaledTileID, zoomCrossTileIDs: {
    [crossTileID: number]: boolean;
  }): void;
  getCrossTileIDsLists(): number[][];
}
declare class CrossTileIDs {
  maxCrossTileID: number;
  constructor();
  generate(): number;
}
declare class CrossTileSymbolLayerIndex {
  indexes: { [zoom in string | number]: { [tileId in string | number]: TileLayerIndex } };
  usedCrossTileIDs: { [zoom in string | number]: {
    [crossTileID: number]: boolean;
  } };
  lng: number;
  constructor();
  handleWrapJump(lng: number): void;
  addBucket(tileID: OverscaledTileID, bucket: SymbolBucket, crossTileIDs: CrossTileIDs): boolean;
  removeBucketCrossTileIDs(zoom: string | number, removedBucket: TileLayerIndex): void;
  removeStaleBuckets(currentIDs: { [k in string | number]: boolean }): boolean;
}
declare class CrossTileSymbolIndex {
  layerIndexes: {
    [layerId: string]: CrossTileSymbolLayerIndex;
  };
  crossTileIDs: CrossTileIDs;
  maxBucketInstanceId: number;
  bucketsInCurrentPlacement: {
    [_: number]: boolean;
  };
  constructor();
  addLayer(styleLayer: StyleLayer, tiles: Array<Tile>, lng: number): boolean;
  pruneUnusedLayers(usedLayers: Array<string>): void;
}
declare class DepthMode {
  func: DepthFuncType;
  mask: DepthMaskType;
  range: DepthRangeType;
  static ReadOnly: boolean;
  static ReadWrite: boolean;
  constructor(depthFunc: DepthFuncType, depthMask: DepthMaskType, depthRange: DepthRangeType);
  static disabled: Readonly<DepthMode>;
}
declare class StencilMode {
  test: StencilTestGL;
  ref: number;
  mask: number;
  fail: StencilOpConstant;
  depthFail: StencilOpConstant;
  pass: StencilOpConstant;
  constructor(test: StencilTestGL, ref: number, mask: number, fail: StencilOpConstant, depthFail: StencilOpConstant, pass: StencilOpConstant);
  static disabled: Readonly<StencilMode>;
}
declare class ColorMode {
  blendFunction: BlendFuncType;
  blendColor: Color;
  mask: ColorMaskType;
  constructor(blendFunction: BlendFuncType, blendColor: Color, mask: ColorMaskType);
  static Replace: BlendFuncType;
  static disabled: Readonly<ColorMode>;
  static unblended: Readonly<ColorMode>;
  static alphaBlended: Readonly<ColorMode>;
}
/**
 * A dash entry
 */
type DashEntry = {
  y: number;
  height: number;
  width: number;
};
declare class LineAtlas {
  width: number;
  height: number;
  nextRow: number;
  bytes: number;
  data: Uint8Array;
  dashEntry: {
    [_: string]: DashEntry;
  };
  dirty: boolean;
  texture: WebGLTexture;
  constructor(width: number, height: number);
  /**
   * Get or create a dash line pattern.
   *
   * @param dasharray - the key (represented by numbers) to get the dash texture
   * @param round - whether to add circle caps in between dash segments
   * @returns position of dash texture in {@link DashEntry}
   */
  getDash(dasharray: Array<number>, round: boolean): DashEntry;
  getDashRanges(dasharray: Array<number>, lineAtlasWidth: number, stretch: number): any[];
  addRoundDash(ranges: any, stretch: number, n: number): void;
  addRegularDash(ranges: any): void;
  addDash(dasharray: Array<number>, round: boolean): DashEntry;
  bind(context: Context): void;
}
/**
 * A type of MapLibre resource.
 */
declare const enum ResourceType {
  Glyphs = "Glyphs",
  Image = "Image",
  Source = "Source",
  SpriteImage = "SpriteImage",
  SpriteJSON = "SpriteJSON",
  Style = "Style",
  Tile = "Tile",
  Unknown = "Unknown"
}
/**
 * This function is used to transform a request.
 * It is used just before executing the relevant request.
 */
type RequestTransformFunction = (url: string, resourceType?: ResourceType) => RequestParameters | Promise<RequestParameters> | undefined;
declare class RequestManager {
  _transformRequestFn: RequestTransformFunction | null;
  constructor(transformRequestFn?: RequestTransformFunction | null);
  transformRequest(url: string, type: ResourceType): RequestParameters | Promise<RequestParameters>;
  setTransformRequest(transformRequest: RequestTransformFunction | null): void;
}
declare function loadGlyphRange(fontstack: string, range: number, urlTemplate: string, requestManager: RequestManager): Promise<{
  [_: number]: StyleGlyph | null;
}>;
type Entry = {
  glyphs: {
    [id: number]: StyleGlyph | null;
  };
  requests: {
    [range: number]: Promise<{
      [_: number]: StyleGlyph | null;
    }>;
  };
  ranges: {
    [range: number]: boolean | null;
  };
  tinySDF?: TinySDF;
  ideographTinySDF?: TinySDF;
};
declare class GlyphManager {
  requestManager: RequestManager;
  localIdeographFontFamily: string | false;
  entries: {
    [stack: string]: Entry;
  };
  url: string;
  lang?: string;
  static loadGlyphRange: typeof loadGlyphRange;
  static TinySDF: typeof TinySDF;
  constructor(requestManager: RequestManager, localIdeographFontFamily?: string | false, lang?: string);
  setURL(url?: string | null): void;
  getGlyphs(glyphs: {
    [stack: string]: Array<number>;
  }): Promise<GetGlyphsResponse>;
  _getAndCacheGlyphsPromise(stack: string, id: number): Promise<{
    stack: string;
    id: number;
    glyph: StyleGlyph;
  }>;
  _downloadAndCacheRangePromise(stack: string, id: number): Promise<{
    stack: string;
    id: number;
    glyph: StyleGlyph;
  }>;
  _warnOnMissingGlyphRange(glyph: StyleGlyph, range: number, id: number, err: Error): void;
  /**
   * Returns whether the given codepoint should be rendered locally.
   */
  _charUsesLocalIdeographFontFamily(id: number): boolean;
  /**
   * Draws a glyph offscreen using TinySDF, creating a TinySDF instance lazily.
   */
  _drawGlyph(entry: Entry, stack: string, id: number): StyleGlyph;
  _createTinySDF(stack: String | false): TinySDF;
  /**
   * Sniffs the font style out of a font family name.
   */
  _fontStyle(fontFamily: string): string;
  /**
   * Sniffs the font weight out of a font family name.
   */
  _fontWeight(fontFamily: string): string;
  destroy(): void;
}
type PoolObject = {
  id: number;
  fbo: Framebuffer;
  texture: Texture;
  stamp: number;
  inUse: boolean;
};
declare class RenderPool {
  private readonly _context;
  private readonly _size;
  private readonly _tileSize;
  private _objects;
  /**
   * An index array of recently used pool objects.
   * Items that are used recently are last in the array
   */
  private _recentlyUsed;
  private _stamp;
  constructor(_context: Context, _size: number, _tileSize: number);
  destruct(): void;
  private _createObject;
  getObjectForId(id: number): PoolObject;
  useObject(obj: PoolObject): void;
  stampObject(obj: PoolObject): void;
  getOrCreateFreeObject(): PoolObject;
  freeObject(obj: PoolObject): void;
  freeAllObjects(): void;
  isFull(): boolean;
}
declare class RenderToTexture {
  painter: Painter;
  terrain: Terrain;
  pool: RenderPool;
  /**
   * coordsAscending contains a list of all tiles which should be rendered for one render-to-texture tile
   * e.g. render 4 raster-tiles with size 256px to the 512px render-to-texture tile
   */
  _coordsAscending: {
    [_: string]: {
      [_: string]: Array<OverscaledTileID>;
    };
  };
  /**
   * fingerprint string representing the unique state of source tiles and revision
   * for a given render-to-texture tile. Used to detect changes and trigger re-rendering.
   * Format: "sorted_tile_keys#revision"
   */
  _rttFingerprints: {
    [sourceId: string]: {
      [rttTileKey: string]: string;
    };
  };
  /**
   * store for render-stacks
   * a render stack is a set of layers which should be rendered into one texture
   * every stylesheet can have multiple stacks. A new stack is created if layers which should
   * not rendered to texture sit between layers which should rendered to texture. e.g. hillshading or symbols
   */
  _stacks: Array<Array<string>>;
  /**
   * remember the previous processed layer to check if a new stack is needed
   */
  _prevType: string;
  /**
   * a list of tiles that can potentially rendered
   */
  _renderableTiles: Array<Tile>;
  /**
   * a list of tiles that should be rendered to screen in the next render-call
   */
  _rttTiles: Array<Tile>;
  /**
   * a list of all layer-ids which should be rendered
   */
  _renderableLayerIds: Array<string>;
  constructor(painter: Painter, terrain: Terrain);
  destruct(): void;
  getTexture(tile: Tile): Texture;
  prepareForRender(style: Style, zoom: number): void;
  /**
   * due that switching textures is relatively slow, the render
   * layer-by-layer context is not practicable. To bypass this problem
   * this lines of code stack all layers and later render all at once.
   * Because of the stylesheet possibility to mixing render-to-texture layers
   * and 'live'-layers (f.e. symbols) it is necessary to create more stacks. For example
   * a symbol-layer is in between of fill-layers.
   * @param layer - the layer to render
   * @param renderOptions - flags describing how to render the layer
   * @returns if true layer is rendered to texture, otherwise false
   */
  renderLayer(layer: StyleLayer, renderOptions: RenderOptions): boolean;
}
type RenderPass = "offscreen" | "opaque" | "translucent";
type PainterOptions = {
  showOverdrawInspector: boolean;
  showTileBoundaries: boolean;
  showPadding: boolean;
  rotating: boolean;
  zooming: boolean;
  moving: boolean;
  fadeDuration: number;
  anisotropicFilterPitch: number;
};
type RenderOptions = {
  isRenderingToTexture: boolean;
  isRenderingGlobe: boolean;
};
/**
 * @internal
 * Initialize a new painter object.
 */
declare class Painter {
  context: Context;
  transform: IReadonlyTransform;
  renderToTexture: RenderToTexture;
  _tileTextures: {
    [_: number]: Array<Texture>;
  };
  numSublayers: number;
  depthEpsilon: number;
  emptyProgramConfiguration: ProgramConfiguration;
  width: number;
  height: number;
  pixelRatio: number;
  tileExtentBuffer: VertexBuffer;
  tileExtentSegments: SegmentVector;
  tileExtentMesh: Mesh;
  debugBuffer: VertexBuffer;
  debugSegments: SegmentVector;
  rasterBoundsBuffer: VertexBuffer;
  rasterBoundsSegments: SegmentVector;
  rasterBoundsBufferPosOnly: VertexBuffer;
  rasterBoundsSegmentsPosOnly: SegmentVector;
  viewportBuffer: VertexBuffer;
  viewportSegments: SegmentVector;
  quadTriangleIndexBuffer: IndexBuffer;
  tileBorderIndexBuffer: IndexBuffer;
  _tileClippingMaskIDs: {
    [_: string]: number;
  };
  stencilClearMode: StencilMode;
  style: Style;
  options: PainterOptions;
  lineAtlas: LineAtlas;
  imageManager: ImageManager;
  glyphManager: GlyphManager;
  depthRangeFor3D: DepthRangeType;
  opaquePassCutoff: number;
  renderPass: RenderPass;
  currentLayer: number;
  currentStencilSource: string;
  nextStencilID: number;
  id: string;
  _showOverdrawInspector: boolean;
  cache: {
    [_: string]: Program<any>;
  };
  crossTileSymbolIndex: CrossTileSymbolIndex;
  symbolFadeChange: number;
  debugOverlayTexture: Texture;
  debugOverlayCanvas: HTMLCanvasElement;
  terrainFacilitator: {
    dirty: boolean;
    matrix: mat4;
    renderTime: number;
  };
  constructor(gl: WebGLRenderingContext | WebGL2RenderingContext, transform: IReadonlyTransform);
  resize(width: number, height: number, pixelRatio: number): void;
  setup(): void;
  clearStencil(): void;
  _renderTileClippingMasks(layer: StyleLayer, tileIDs: Array<OverscaledTileID>, renderToTexture: boolean): void;
  _renderTileMasks(tileStencilRefs: {
    [_: string]: number;
  }, tileIDs: Array<OverscaledTileID>, renderToTexture: boolean, useBorders: boolean): void;
  /**
   * Fills the depth buffer with the geometry of all supplied tiles.
   * Does not change the color buffer or the stencil buffer.
   */
  _renderTilesDepthBuffer(): void;
  stencilModeFor3D(): StencilMode;
  stencilModeForClipping(tileID: OverscaledTileID): StencilMode;
  getStencilConfigForOverlapAndUpdateStencilID(tileIDs: Array<OverscaledTileID>): [{
    [_: number]: Readonly<StencilMode>;
  }, Array<OverscaledTileID>];
  stencilConfigForOverlapTwoPass(tileIDs: Array<OverscaledTileID>): [{
    [_: number]: Readonly<StencilMode>;
  }, {
    [_: number]: Readonly<StencilMode>;
  }, Array<OverscaledTileID>];
  colorModeForRenderPass(): Readonly<ColorMode>;
  getDepthModeForSublayer(n: number, mask: DepthMaskType, func?: DepthFuncType | null): Readonly<DepthMode>;
  getDepthModeFor3D(): Readonly<DepthMode>;
  opaquePassEnabledForLayer(): boolean;
  render(style: Style, options: PainterOptions): void;
  /**
   * Update the depth and coords framebuffers, if the contents of those frame buffers is out of date.
   * If requireExact is false, then the contents of those frame buffers is not updated if it is close
   * to accurate (that is, the camera has not moved much since it was updated last).
   */
  maybeDrawDepthAndCoords(requireExact: boolean): void;
  renderLayer(painter: Painter, tileManager: TileManager, layer: StyleLayer, coords: Array<OverscaledTileID>, renderOptions: RenderOptions): void;
  static readonly MAX_TEXTURE_POOL_SIZE_PER_BUCKET = 50;
  saveTileTexture(texture: Texture): void;
  getTileTexture(size: number): Texture;
  /**
   * Checks whether a pattern image is needed, and if it is, whether it is not loaded.
   *
   * @returns true if a needed image is missing and rendering needs to be skipped.
   */
  isPatternMissing(image?: CrossFaded<ResolvedImage> | null): boolean;
  /**
   * Finds the required shader and its variant (base/terrain/globe, etc.) and binds it, compiling a new shader if required.
   * @param name - Name of the desired shader.
   * @param programConfiguration - Configuration of shader's inputs.
   * @param forceSimpleProjection - Whether to force the use of a shader variant with simple mercator projection vertex shader.
   * @param defines - Additional macros to be injected at the beginning of the shader. Expected format is `['#define XYZ']`, etc.
   * False by default. Use true when drawing with a simple projection matrix is desired, eg. when drawing a fullscreen quad.
   * @returns
   */
  useProgram(name: string, programConfiguration?: ProgramConfiguration | null, forceSimpleProjection?: boolean, defines?: Array<string>): Program<any>;
  setCustomLayerDefaults(): void;
  setBaseState(): void;
  initDebugOverlayCanvas(): void;
  destroy(): void;
  overLimit(): boolean;
}
type TerrainData = {
  "u_depth": number;
  "u_terrain": number;
  "u_terrain_dim": number;
  "u_terrain_matrix": mat4;
  "u_terrain_unpack": number[];
  "u_terrain_exaggeration": number;
  texture: WebGLTexture;
  depthTexture: WebGLTexture;
  tile: Tile;
};
declare class Terrain {
  /**
   * The style this terrain corresponds to
   */
  painter: Painter;
  /**
   * the tilemanager this terrain is based on
   */
  tileManager: TerrainTileManager;
  /**
   * the TerrainSpecification object passed to this instance
   */
  options: TerrainSpecification;
  /**
   * define the meshSize per tile.
   */
  meshSize: number;
  /**
   * multiplicator for the elevation. Used to make terrain more "extreme".
   */
  exaggeration: number;
  /**
   * to not see pixels in the render-to-texture tiles it is good to render them bigger
   * this number is the multiplicator (must be a power of 2) for the current tileSize.
   * So to get good results with not too much memory footprint a value of 2 should be fine.
   */
  qualityFactor: number;
  /**
   * holds the framebuffer object in size of the screen to render the coords & depth into a texture.
   */
  _fbo: Framebuffer;
  _fboCoordsTexture: Texture;
  _fboDepthTexture: Texture;
  _emptyDepthTexture: Texture;
  /**
   * GL Objects for the terrain-mesh
   * The mesh is a regular mesh, which has the advantage that it can be reused for all tiles.
   */
  _meshCache: {
    [key: string]: Mesh;
  };
  /**
   * coords index contains a list of tileID.keys. This index is used to identify
   * the tile via the alpha-cannel in the coords-texture.
   * As the alpha-channel has 1 Byte a max of 255 tiles can rendered without an error.
   */
  coordsIndex: Array<string>;
  /**
   * tile-coords encoded in the rgb channel, _coordsIndex is in the alpha-channel.
   */
  _coordsTexture: Texture;
  /**
   * accuracy of the coords. 2 * tileSize should be enough.
   */
  _coordsTextureSize: number;
  /**
   * variables for an empty dem texture, which is used while the raster-dem tile is loading.
   */
  _emptyDemUnpack: number[];
  _emptyDemTexture: Texture;
  _emptyDemMatrix: mat4;
  /**
   * as of overzooming of raster-dem tiles in high zoomlevels, this cache contains
   * matrices to transform from vector-tile coords to raster-dem-tile coords.
   */
  _demMatrixCache: {
    [_: string]: {
      matrix: mat4;
      coord: OverscaledTileID;
    };
  };
  constructor(painter: Painter, tileManager: TileManager, options: TerrainSpecification);
  destroy(): void;
  /**
   * Get the elevation-value from original dem-data for a given tile-coordinate.
   * Coordinates that fall outside `[0, extent)` are normalized to the
   * appropriate neighbor tile before lookup.
   * @param tileID - the tile to get the elevation for
   * @param x - x coordinate relative to the tile, may be outside `[0, extent)`
   * @param y - y coordinate relative to the tile, may be outside `[0, extent)`
   * @param extent - optional, default 8192
   * @returns the elevation
   */
  getDEMElevation(tileID: OverscaledTileID, x: number, y: number, extent?: number): number;
  /**
   * Get the elevation for given {@link LngLat} in respect of exaggeration.
   * @param lnglat - the location
   * @param zoom - the zoom, use {@link getElevationForLngLat} if you don't want a specific zoom level, but more accurate results.
   * @returns the elevation
   */
  getElevationForLngLatZoom(lnglat: LngLat, zoom: number): number;
  /**
   * Get the elevation for given {@link LngLat} in respect of exaggeration.
   * This will traverse up the zoom levels to find the first tile with data to return.
   * @param lnglat - the location
   * @returns the elevation
   */
  getElevationForLngLat(lnglat: LngLat, transform: IReadonlyTransform): number;
  /**
   * Get the elevation for given coordinate in respect of exaggeration.
   * @param tileID - the tile id
   * @param x - x coordinate relative to the tile, may be outside `[0, extent)`
   * @param y - y coordinate relative to the tile, may be outside `[0, extent)`
   * @param extent - optional, default 8192
   * @returns the elevation
   */
  getElevation(tileID: OverscaledTileID, x: number, y: number, extent?: number): number;
  /**
   * returns a Terrain Object for a tile. Unless the tile corresponds to data (e.g. tile is loading), return a flat dem object
   * @param tileID - the tile to get the terrain for
   * @returns the terrain data to use in the program
   */
  getTerrainData(tileID: OverscaledTileID): TerrainData;
  /**
   * get a framebuffer as big as the map-div, which will be used to render depth & coords into a texture
   * @param texture - the texture
   * @returns the frame buffer
   */
  getFramebuffer(texture: string): Framebuffer;
  /**
   * create coords texture, needed to grab coordinates from canvas
   * encode coords coordinate into 4 bytes:
   *   - 8 lower bits for x
   *   - 8 lower bits for y
   *   - 4 higher bits for x
   *   - 4 higher bits for y
   *   - 8 bits for coordsIndex (1 .. 255) (= number of terraintile), is later set in draw_terrain uniform value
   * @returns the texture
   */
  getCoordsTexture(): Texture;
  /**
   * Reads a pixel from the coords-framebuffer and translate this to mercator, or null, if the pixel doesn't lie on the terrain's surface (but the sky instead).
   * @param p - Screen-Coordinate
   * @returns Mercator coordinate for a screen pixel, or null, if the pixel is not covered by terrain (is in the sky).
   */
  pointCoordinate(p: Point): MercatorCoordinate;
  /**
   * Reads the depth value from the depth-framebuffer at a given screen pixel
   * @param p - Screen coordinate
   * @returns depth value in clip space (between 0 and 1)
   */
  depthAtPoint(p: Point): number;
  /**
   * create a regular mesh which will be used by all terrain-tiles
   * @returns the created regular mesh
   */
  getTerrainMesh(tileId: OverscaledTileID): Mesh;
  /**
   * Calculates a height of the frame around the terrain-mesh to avoid stitching between
   * tile boundaries in different zoomlevels.
   * @param zoom - current zoomlevel
   * @returns the elevation delta in meters
   */
  getMeshFrameDelta(zoom: number): number;
  getMinTileElevationForLngLatZoom(lnglat: LngLat, zoom: number): number;
  /**
   * Get the minimum and maximum elevation contained in a tile. This includes any
   * exaggeration included in the terrain.
   *
   * @param tileID - ID of the tile to be used as a source for the min/max elevation
   * @returns the minimum and maximum elevation found in the tile, including the terrain's
   * exaggeration
   */
  getMinMaxElevation(tileID: OverscaledTileID): {
    minElevation: number | null;
    maxElevation: number | null;
  };
  _getOverscaledTileIDFromLngLatZoom(lnglat: LngLat, zoom: number): {
    tileID: OverscaledTileID;
    mercatorX: number;
    mercatorY: number;
  };
}
type PointProjection = {
  /**
   * The projected point.
   */
  point: Point;
  /**
   * The original W component of the projection.
   */
  signedDistanceFromCamera: number;
  /**
   * For complex projections (such as globe), true if the point is occluded by the projection, such as by being on the backfacing side of the globe.
   * If the point is simply beyond the edge of the screen, this should NOT be set to false.
   */
  isOccluded: boolean;
};
type IndexToPointCache = {
  [lineIndex: number]: Point;
};
type ProjectionCache = {
  /**
   * tile-unit vertices projected into label-plane units
   */
  projections: IndexToPointCache;
  /**
   * label-plane vertices which have been shifted to follow an offset line
   */
  offsets: IndexToPointCache;
  /**
   * Cached projected anchor point.
   */
  cachedAnchorPoint: Point | undefined;
  /**
   * Was any projected point occluded by the map itself (eg. occluded by the planet when using globe projection).
   *
   * Viewport-pitched line-following texts where *any* of the line points is hidden behind the planet curve becomes entirely hidden.
   * This is perhaps not the most ideal behavior, but it works, it is simple and planetary-scale texts such as this seem to be a rare edge case.
   */
  anyProjectionOccluded: boolean;
};
type SymbolProjectionContext = {
  /**
   * Used to cache results, save cost if projecting the same vertex multiple times
   */
  projectionCache: ProjectionCache;
  /**
   * The array of tile-unit vertices transferred from worker
   */
  lineVertexArray: SymbolLineVertexArray;
  /**
   * Matrix for transforming from pixels (symbol shaping) to potentially rotated tile units (pitched map label plane).
   */
  pitchedLabelPlaneMatrix: mat4;
  /**
   * Function to get elevation at a point
   * @param x - the x coordinate
   * @param y - the y coordinate
  */
  getElevation: (x: number, y: number) => number;
  /**
   * Only for creating synthetic vertices if vertex would otherwise project behind plane of camera,
   * but still convenient to pass it inside this type.
   */
  tileAnchorPoint: Point;
  /**
   * True when line glyphs are projected onto the map, instead of onto the viewport.
   */
  pitchWithMap: boolean;
  transform: IReadonlyTransform;
  unwrappedTileID: UnwrappedTileID;
  /**
   * Viewport width.
   */
  width: number;
  /**
   * Viewport height.
   */
  height: number;
  /**
   * Translation in tile units, computed using text-translate and text-translate-anchor paint style properties.
   */
  translation: [number, number];
};
/**
 * This type contains all data necessary to project a tile to screen in MapLibre's shader system.
 * Contains data used for both mercator and globe projection.
 */
type ProjectionData = {
  /**
   * The main projection matrix. For mercator projection, it usually projects in-tile coordinates 0..EXTENT to screen,
   * for globe projection, it projects a unit sphere planet to screen.
   * Uniform name: `u_projection_matrix`.
   */
  mainMatrix: mat4;
  /**
   * The extent of current tile in the mercator square.
   * Used by globe projection.
   * First two components are X and Y offset, last two are X and Y scale.
   * Uniform name: `u_projection_tile_mercator_coords`.
   *
   * Conversion from in-tile coordinates in range 0..EXTENT is done as follows:
   * @example
   * ```
   * vec2 mercator_coords = u_projection_tile_mercator_coords.xy + in_tile.xy * u_projection_tile_mercator_coords.zw;
   * ```
   */
  tileMercatorCoords: [number, number, number, number];
  /**
   * The plane equation for a plane that intersects the planet's horizon.
   * Assumes the planet to be a unit sphere.
   * Used by globe projection for clipping.
   * Uniform name: `u_projection_clipping_plane`.
   */
  clippingPlane: [number, number, number, number];
  /**
   * A value in range 0..1 indicating interpolation between mercator (0) and globe (1) projections.
   * Used by globe projection to hide projection transition at high zooms.
   * Uniform name: `u_projection_transition`.
   */
  projectionTransition: number;
  /**
   * Fallback matrix that projects the current tile according to mercator projection.
   * Used by globe projection to fall back to mercator projection in an animated way.
   * Uniform name: `u_projection_fallback_matrix`.
   */
  fallbackMatrix: mat4;
};
type ProjectionDataParams = {
  /**
   * The ID of the current tile
   */
  overscaledTileID: OverscaledTileID | null;
  /**
   * Set to true if a pixel-aligned matrix should be used, if possible (mostly used for raster tiles under mercator projection)
   */
  aligned?: boolean;
  /**
   * Set to true if the terrain matrix should be applied (i.e. when rendering terrain)
   */
  applyTerrainMatrix?: boolean;
  /**
   * Set to true if the globe matrix should be applied (i.e. when rendering globe)
   */
  applyGlobeMatrix?: boolean;
};
interface CoveringTilesDetailsProvider {
  /**
   * Returns the distance from the point to the tile
   * @param pointX - point x.
   * @param pointY - point y.
   * @param tileID - Tile x, y and z for zoom.
   * @param boundingVolume - tile bounding volume
   */
  distanceToTile2d: (pointX: number, pointY: number, tileID: {
    x: number;
    y: number;
    z: number;
  }, boundingVolume: IBoundingVolume) => number;
  /**
   * Returns the wrap value for a given tile.
   */
  getWrap: (centerCoord: MercatorCoordinate, tileID: {
    x: number;
    y: number;
    z: number;
  }, parentWrap: number) => number;
  /**
   * Returns the bounding volume of the specified tile.
   * @param tileID - Tile x, y and z for zoom.
   * @param wrap - wrap number of the tile.
   * @param elevation - camera center point elevation.
   * @param options - CoveringTilesOptions.
   */
  getTileBoundingVolume: (tileID: {
    x: number;
    y: number;
    z: number;
  }, wrap: number, elevation: number, options: CoveringTilesOptionsInternal) => IBoundingVolume;
  /**
   * Whether to allow variable zoom, which is used at high pitch angle to avoid loading an excessive amount of tiles.
   */
  allowVariableZoom: (transform: IReadonlyTransform, options: CoveringTilesOptionsInternal) => boolean;
  /**
   * Whether to allow world copies to be rendered.
   */
  allowWorldCopies: () => boolean;
  /**
   * Prepare cache for the next frame.
   */
  prepareNextFrame(): void;
}
/**
 * The callback defining how the transform constrains the viewport's lnglat and zoom to respect the longitude and latitude bounds.
 * @see [Customize the map transform constrain](https://maplibre.org/maplibre-gl-js/docs/examples/customize-the-map-transform-constrain/)
 */
type TransformConstrainFunction = (lngLat: LngLat, zoom: number) => {
  center: LngLat;
  zoom: number;
};
interface ITransformGetters {
  get tileSize(): number;
  get tileZoom(): number;
  /**
   * How many times "larger" the world is compared to zoom 0. Usually computed as `pow(2, zoom)`.
   * Relevant mostly for mercator projection.
   */
  get scale(): number;
  /**
   * How many units the current world has. Computed by multiplying {@link worldSize} by {@link tileSize}.
   * Relevant mostly for mercator projection.
   */
  get worldSize(): number;
  /**
   * Gets the transform's width in pixels. Use {@link ITransform.resize} to set the transform's size.
   */
  get width(): number;
  /**
   * Gets the transform's height in pixels. Use {@link ITransform.resize} to set the transform's size.
   */
  get height(): number;
  get lngRange(): [number, number];
  get latRange(): [number, number];
  get minZoom(): number;
  get maxZoom(): number;
  get zoom(): number;
  get center(): LngLat;
  get minPitch(): number;
  get maxPitch(): number;
  /**
   * Roll in degrees.
   */
  get roll(): number;
  get rollInRadians(): number;
  /**
   * Pitch in degrees.
   */
  get pitch(): number;
  get pitchInRadians(): number;
  /**
   * Bearing in degrees.
   */
  get bearing(): number;
  get bearingInRadians(): number;
  /**
   * Vertical field of view in degrees.
   */
  get fov(): number;
  get fovInRadians(): number;
  get elevation(): number;
  get minElevationForCurrentTile(): number;
  get padding(): PaddingOptions;
  get unmodified(): boolean;
  get renderWorldCopies(): boolean;
  /**
   * The distance from the camera to the center of the map in pixels space.
   */
  get cameraToCenterDistance(): number;
  get nearZ(): number;
  get farZ(): number;
  get autoCalculateNearFarZ(): boolean;
  get constrainOverride(): TransformConstrainFunction;
}
interface ITransformMutators {
  clone(): ITransform;
  /**
   * Applies a transform to the current transform.
   * @param that - The transform to apply to the current transform.
   * @param constrain - Whether to constrain the transform's center and zoom and recompute internal matrices once applied.
   */
  apply(that: IReadonlyTransform, constrain: boolean): void;
  /**
   * Sets the transform's minimal allowed zoom level.
   * Automatically constrains the transform's zoom to the new range and recomputes internal matrices if needed.
   */
  setMinZoom(zoom: number): void;
  /**
   * Sets the transform's maximal allowed zoom level.
   * Automatically constrains the transform's zoom to the new range and recomputes internal matrices if needed.
   */
  setMaxZoom(zoom: number): void;
  /**
   * Sets the transform's minimal allowed pitch, in degrees.
   * Automatically constrains the transform's pitch to the new range and recomputes internal matrices if needed.
   */
  setMinPitch(pitch: number): void;
  /**
   * Sets the transform's maximal allowed pitch, in degrees.
   * Automatically constrains the transform's pitch to the new range and recomputes internal matrices if needed.
   */
  setMaxPitch(pitch: number): void;
  setRenderWorldCopies(renderWorldCopies: boolean): void;
  /**
   * Sets the transform's bearing, in degrees.
   * Recomputes internal matrices if needed.
   */
  setBearing(bearing: number): void;
  /**
   * Sets the transform's pitch, in degrees.
   * Recomputes internal matrices if needed.
   */
  setPitch(pitch: number): void;
  /**
   * Sets the transform's roll, in degrees.
   * Recomputes internal matrices if needed.
   */
  setRoll(roll: number): void;
  /**
   * Sets the transform's vertical field of view, in degrees.
   * Recomputes internal matrices if needed.
   */
  setFov(fov: number): void;
  /**
   * Sets the transform's zoom.
   * Automatically constrains the transform's center and zoom and recomputes internal matrices if needed.
   */
  setZoom(zoom: number): void;
  /**
   * Sets the transform's center.
   * Automatically constrains the transform's center and zoom and recomputes internal matrices if needed.
   */
  setCenter(center: LngLat): void;
  setElevation(elevation: number): void;
  setMinElevationForCurrentTile(elevation: number): void;
  setPadding(padding: PaddingOptions): void;
  /**
   * Sets the overriding values to use for near and far Z instead of what the transform would normally compute.
   * If set to undefined, the transform will compute its ideal values.
   * Calling this will set `autoCalculateNearFarZ` to false.
   */
  overrideNearFarZ(nearZ: number, farZ: number): void;
  /**
   * Resets near and far Z plane override. Sets `autoCalculateNearFarZ` to true.
   */
  clearNearFarZOverride(): void;
  /**
   * Sets the transform's width and height and recomputes internal matrices.
   */
  resize(width: number, height: number, constrainTransform: boolean): void;
  /**
   * Helper method to update edge-insets in place
   *
   * @param start - the starting padding
   * @param target - the target padding
   * @param t - the step/weight
   */
  interpolatePadding(start: PaddingOptions, target: PaddingOptions, t: number): void;
  /**
   * This method works in combination with freezeElevation activated.
   * freezeElevation is enabled during map-panning because during this the camera should sit in constant height.
   * After panning finished, call this method to recalculate the zoom level and center point for the current camera-height in current terrain.
   * @param terrain - the terrain
   */
  recalculateZoomAndCenter(terrain?: Terrain): void;
  /**
   * Set's the transform's center so that the given point on screen is at the given world coordinates.
   * @param lnglat - Desired world coordinates of the point.
   * @param point - The screen point that should lie at the given coordinates.
   */
  setLocationAtPoint(lnglat: LngLat, point: Point): void;
  /**
   * Sets or clears the map's geographical constraints.
   * @param bounds - A {@link LngLatBounds} object describing the new geographic boundaries of the map.
   */
  setMaxBounds(bounds?: LngLatBounds | null): void;
  /** Sets or clears the custom callback overriding the transform's default constrain,
   * whose responsibility is to respect the longitude and latitude bounds by constraining the viewport's lnglat and zoom.
   * @param constrain - A {@link TransformConstrainFunction} callback defining how the viewport should respect the bounds.
   */
  setConstrainOverride(constrain?: TransformConstrainFunction | null): void;
  /**
   * @internal
   * Called before rendering to allow the transform implementation
   * to precompute data needed to render the given tiles.
   * Used in mercator transform to precompute tile matrices (posMatrix).
   * @param coords - Array of tile IDs that will be rendered.
   */
  populateCache(coords: Array<OverscaledTileID>): void;
  /**
   * @internal
   * Sets the transform's transition state from one projection to another.
   * @param value - The transition state value.
   * @param error - The error value.
   */
  setTransitionState(value: number, error: number): void;
}
interface IReadonlyTransform extends ITransformGetters {
  /**
   * Distance from camera origin to view plane, in pixels.
   * Calculated using vertical fov and viewport height.
   * Center is considered to be in the middle of the viewport.
   */
  get cameraToCenterDistance(): number;
  get modelViewProjectionMatrix(): mat4;
  get projectionMatrix(): mat4;
  /**
   * Inverse of matrix from camera space to clip space.
   */
  get inverseProjectionMatrix(): mat4;
  get pixelsToClipSpaceMatrix(): mat4;
  get clipSpaceToPixelsMatrix(): mat4;
  get pixelsToGLUnits(): [number, number];
  get centerOffset(): Point;
  /**
   * Gets the transform's width and height in pixels (viewport size). Use {@link resize} to set the transform's size.
   */
  get size(): Point;
  get rotationMatrix(): mat2;
  /**
   * The center of the screen in pixels with the top-left corner being (0,0)
   * and +y axis pointing downwards. This accounts for padding.
   */
  get centerPoint(): Point;
  /**
   * @internal
   */
  get pixelsPerMeter(): number;
  /**
   * @internal
   * Returns the camera's position transformed to be in the same space as 3D features under this transform's projection. Mostly used for globe + fill-extrusion.
   */
  get cameraPosition(): vec3;
  /**
   * Returns if the padding params match
   *
   * @param padding - the padding to check against
   * @returns true if they are equal, false otherwise
   */
  isPaddingEqual(padding: PaddingOptions): boolean;
  /**
   * @internal
   * Return any "wrapped" copies of a given tile coordinate that are visible
   * in the current view.
   */
  getVisibleUnwrappedCoordinates(tileID: CanonicalTileID): Array<UnwrappedTileID>;
  /**
   * @internal
   * Return the camera frustum for the current view.
   */
  getCameraFrustum(): Frustum;
  /**
   * @internal
   * Return the clipping plane, behind which nothing should be rendered. If the camera frustum is sufficient
   * to describe the render geometry (additional clipping is not required), this may be null.
   */
  getClippingPlane(): vec4 | null;
  /**
   * @internal
   * Returns this transform's CoveringTilesDetailsProvider.
   */
  getCoveringTilesDetailsProvider(): CoveringTilesDetailsProvider;
  /**
   * @internal
   * Given a LngLat location, return the screen point that corresponds to it.
   * @param lnglat - location
   * @param terrain - optional terrain
   * @returns screen point
   */
  locationToScreenPoint(lnglat: LngLat, terrain?: Terrain): Point;
  /**
   * @internal
   * Given a point on screen, return its LngLat location.
   * @param p - screen point
   * @param terrain - optional terrain
   * @returns lnglat location
   */
  screenPointToLocation(p: Point, terrain?: Terrain): LngLat;
  /**
   * @internal
   * Given a point on screen, return its mercator coordinate.
   * @param p - the point
   * @param terrain - optional terrain
   * @returns lnglat
   */
  screenPointToMercatorCoordinate(p: Point, terrain?: Terrain): MercatorCoordinate;
  /**
   * @internal
   * Returns the map's geographical bounds. When the bearing or pitch is non-zero, the visible region is not
   * an axis-aligned rectangle, and the result is the smallest bounds that encompasses the visible region.
   * @returns Returns a {@link LngLatBounds} object describing the map's geographical bounds.
   */
  getBounds(): LngLatBounds;
  /**
   * Returns the maximum geographical bounds the map is constrained to, or `null` if none set.
   * @returns max bounds
   */
  getMaxBounds(): LngLatBounds | null;
  /**
   * @internal
   * Returns whether the specified screen point lies on the map.
   * May return false if, for example, the point is above the map's horizon, or if doesn't lie on the planet's surface if globe is enabled.
   * @param p - The point's coordinates.
   * @param terrain - Optional terrain.
   */
  isPointOnMapSurface(p: Point, terrain?: Terrain): boolean;
  /**
   * @internal
   * The tranform's default callback that ensures that longitude and latitude bounds are respected by the viewport.
   */
  defaultConstrain: TransformConstrainFunction;
  /**
   * Constrain the center lngLat and zoom to ensure that longitude and latitude bounds are respected and regions beyond the map bounds are not displayed.
   */
  applyConstrain: TransformConstrainFunction;
  maxPitchScaleFactor(): number;
  /**
   * The camera looks at the map from a 3D (lng, lat, altitude) location. Let's use `cameraLocation`
   * as the name for the location under the camera and on the surface of the earth (lng, lat, 0).
   * `cameraPoint` is the projected position of the `cameraLocation`.
   *
   * This point is useful to us because only fill-extrusions that are between `cameraPoint` and
   * the query point on the surface of the earth can extend and intersect the query.
   *
   * When the map is not pitched the `cameraPoint` is equivalent to the center of the map because
   * the camera is right above the center of the map.
   */
  getCameraPoint(): Point;
  /**
   * The altitude of the camera above the sea level in meters.
   */
  getCameraAltitude(): number;
  /**
   * The longitude and latitude of the camera.
   */
  getCameraLngLat(): LngLat;
  /**
   * Given the camera position (lng, lat, alt), calculate the center point and zoom level
   * @param lngLat - lng, lat of the camera
   * @param alt - altitude of the camera above sea level, in meters
   * @param bearing - bearing of the camera, in degrees
   * @param pitch - pitch angle of the camera, in degrees
   */
  calculateCenterFromCameraLngLatAlt(lngLat: LngLatLike, alt: number, bearing?: number, pitch?: number): {
    center: LngLat;
    elevation: number;
    zoom: number;
  };
  getRayDirectionFromPixel(p: Point): vec3;
  /**
   * When the map is pitched, some of the 3D features that intersect a query will not intersect
   * the query at the surface of the earth. Instead the feature may be closer and only intersect
   * the query because it extrudes into the air.
   * @param queryGeometry - For point queries, the line from the query point to the "camera point",
   * for other geometries, the envelope of the query geometry and the "camera point"
   * @returns a geometry that includes all of the original query as well as all possible ares of the
   * screen where the *base* of a visible extrusion could be.
   *
   */
  getCameraQueryGeometry(queryGeometry: Array<Point>): Array<Point>;
  /**
   * Return the distance to the camera in clip space from a LngLat.
   * This can be compared to the value from the depth buffer (terrain.depthAtPoint)
   * to determine whether a point is occluded.
   * @param lngLat - the point
   * @param elevation - the point's elevation
   * @returns depth value in clip space (between 0 and 1)
   */
  lngLatToCameraDepth(lngLat: LngLat, elevation: number): number;
  /**
   * @internal
   * Calculate the fogMatrix that, given a tile coordinate, would be used to calculate fog on the map.
   * Currently only supported in mercator projection.
   * @param unwrappedTileID - the tile ID
   */
  calculateFogMatrix(unwrappedTileID: UnwrappedTileID): mat4;
  /**
   * @internal
   * Generates a `ProjectionData` instance to be used while rendering the supplied tile.
   * @param params - Parameters for the projection data generation.
   */
  getProjectionData(params: ProjectionDataParams): ProjectionData;
  /**
   * @internal
   * Returns whether the supplied location is occluded in this projection.
   * For example during globe rendering a location on the backfacing side of the globe is occluded.
   */
  isLocationOccluded(lngLat: LngLat): boolean;
  /**
   * @internal
   */
  getPixelScale(): number;
  /**
   * @internal
   * Allows the projection to adjust the radius of `circle-pitch-alignment: 'map'` circles and heatmap kernels based on the map's latitude.
   * Circle radius and heatmap kernel radius is multiplied by this value.
   */
  getCircleRadiusCorrection(): number;
  /**
   * @internal
   * Allows the projection to adjust the scale of `text-pitch-alignment: 'map'` symbols's collision boxes based on the map's center and the text anchor.
   * Only affects the collision boxes (and click areas), scaling of the rendered text is mostly handled in shaders.
   * @param transform - The map's transform, with only the `center` property, describing the map's longitude and latitude.
   * @param textAnchorX - Text anchor position inside the tile, X axis.
   * @param textAnchorY - Text anchor position inside the tile, Y axis.
   * @param tileID - The tile coordinates.
   */
  getPitchedTextCorrection(textAnchorX: number, textAnchorY: number, tileID: UnwrappedTileID): number;
  /**
   * @internal
   * Returns light direction transformed to be in the same space as 3D features under this projection. Mostly used for globe + fill-extrusion.
   * @param transform - Current map transform.
   * @param dir - The light direction.
   * @returns A new vector with the transformed light direction.
   */
  transformLightDirection(dir: vec3): vec3;
  /**
   * @internal
   * Projects a point in tile coordinates to clip space. Used in symbol rendering.
   */
  projectTileCoordinates(x: number, y: number, unwrappedTileID: UnwrappedTileID, getElevation: (x: number, y: number) => number): PointProjection;
  /**
   * Returns a matrix that will place, rotate and scale a model to display at the given location and altitude
   * while also being projected by the custom layer matrix.
   * This function is intended to be called from custom layers.
   * @param location - Location of the model.
   * @param altitude - Altitude of the model. May be undefined.
   */
  getMatrixForModel(location: LngLatLike, altitude?: number): mat4;
  /**
   * Return projection data such that coordinates in mercator projection in range 0..1 will get projected to the map correctly.
   */
  getProjectionDataForCustomLayer(applyGlobeMatrix: boolean): ProjectionData;
  /**
   * Returns a tile-specific projection matrix. Used for symbol placement fast-path for mercator transform.
   */
  getFastPathSimpleProjectionMatrix(tileID: OverscaledTileID): mat4 | undefined;
}
interface ITransform extends IReadonlyTransform, ITransformMutators {}
type QueryParameters = {
  scale: number;
  pixelPosMatrix: mat4;
  transform: IReadonlyTransform;
  tileSize: number;
  queryGeometry: Array<Point>;
  cameraQueryGeometry: Array<Point>;
  queryPadding: number;
  getElevation: undefined | ((x: number, y: number) => number);
  params: {
    filter?: FilterSpecification;
    layers?: Set<string> | null;
    availableImages?: Array<string>;
    globalState?: Record<string, any>;
  };
};
type QueryResults = {
  [_: string]: QueryResultsItem[];
};
type QueryResultsItem = {
  featureIndex: number;
  feature: GeoJSONFeature;
  intersectionZ?: boolean | number;
};
/**
 * An in memory index class to allow fast interaction with features
 */
declare class FeatureIndex {
  tileID: OverscaledTileID;
  x: number;
  y: number;
  z: number;
  grid: TransferableGridIndex;
  grid3D: TransferableGridIndex;
  featureIndexArray: FeatureIndexArray;
  promoteId?: PromoteIdSpecification;
  encoding: string;
  rawTileData: ArrayBuffer;
  bucketLayerIDs: Array<Array<string>>;
  vtLayers: {
    [_: string]: VectorTileLayerLike;
  };
  sourceLayerCoder: DictionaryCoder;
  constructor(tileID: OverscaledTileID, promoteId?: PromoteIdSpecification | null);
  insert(feature: VectorTileFeatureLike, geometry: Array<Array<Point>>, featureIndex: number, sourceLayerIndex: number, bucketIndex: number, is3D?: boolean): void;
  loadVTLayers(): {
    [_: string]: VectorTileLayerLike;
  };
  query(args: QueryParameters, styleLayers: {
    [_: string]: StyleLayer;
  }, serializedLayers: {
    [_: string]: any;
  }, sourceFeatureState: SourceFeatureState): QueryResults;
  loadMatchingFeature(result: QueryResults, bucketIndex: number, sourceLayerIndex: number, featureIndex: number, filter: FeatureFilter, filterLayerIDs: Set<string> | undefined, availableImages: Array<string>, styleLayers: {
    [_: string]: StyleLayer;
  }, serializedLayers: {
    [_: string]: any;
  }, sourceFeatureState?: SourceFeatureState, intersectionTest?: (feature: VectorTileFeatureLike, styleLayer: StyleLayer, featureState: any, id: string | number | void) => boolean | number): void;
  lookupSymbolFeatures(symbolFeatureIndexes: Array<number>, serializedLayers: {
    [_: string]: StyleLayer;
  }, bucketIndex: number, sourceLayerIndex: number, filterParams: {
    filterSpec: FilterSpecification;
    globalState: Record<string, any>;
  }, filterLayerIDs: Set<string> | null, availableImages: Array<string>, styleLayers: {
    [_: string]: StyleLayer;
  }): QueryResults;
  hasLayer(id: string): boolean;
  getId(feature: VectorTileFeatureLike, sourceLayerId: string): string | number;
}
type DEMEncoding = "mapbox" | "terrarium" | "custom";
declare class DEMData {
  uid: string | number;
  data: Uint32Array;
  stride: number;
  dim: number;
  min: number;
  max: number;
  redFactor: number;
  greenFactor: number;
  blueFactor: number;
  baseShift: number;
  /**
   * Constructs a `DEMData` object
   * @param uid - the tile's unique id
   * @param data - RGBAImage data has uniform 1px padding on all sides: square tile edge size defines stride
  // and dim is calculated as stride - 2.
   * @param encoding - the encoding type of the data
   * @param redFactor - the red channel factor used to unpack the data, used for `custom` encoding only
   * @param greenFactor - the green channel factor used to unpack the data, used for `custom` encoding only
   * @param blueFactor - the blue channel factor used to unpack the data, used for `custom` encoding only
   * @param baseShift - the base shift used to unpack the data, used for `custom` encoding only
   */
  constructor(uid: string | number, data: RGBAImage | ImageData, encoding: DEMEncoding, redFactor?: number, greenFactor?: number, blueFactor?: number, baseShift?: number);
  get(x: number, y: number): number;
  getUnpackVector(): number[];
  _idx(x: number, y: number): number;
  unpack(r: number, g: number, b: number): number;
  pack(v: number): {
    r: number;
    g: number;
    b: number;
  };
  getPixels(): RGBAImage;
  backfillBorder(borderTile: DEMData, dx: number, dy: number): void;
}
type CircleGranularity = 1 | 3 | 5 | 7;
declare class SubdivisionGranularityExpression {
  /**
   * A tile of zoom level 0 will be subdivided to this granularity level.
   * Each subsequent zoom level will have its granularity halved.
   */
  private readonly _baseZoomGranularity;
  /**
   * No tile will have granularity level smaller than this.
   */
  private readonly _minGranularity;
  constructor(baseZoomGranularity: number, minGranularity: number);
  getGranularityForZoomLevel(zoomLevel: number): number;
}
declare class SubdivisionGranularitySetting {
  /**
   * Granularity settings used for fill and fill-extrusion layers (for fill, both polygons and their anti-aliasing outlines).
   */
  readonly fill: SubdivisionGranularityExpression;
  /**
   * Granularity used for the line layer.
   */
  readonly line: SubdivisionGranularityExpression;
  /**
   * Granularity used for geometry covering the entire tile: raster tiles, etc.
   */
  readonly tile: SubdivisionGranularityExpression;
  /**
   * Granularity used for stencil masks for tiles.
   */
  readonly stencil: SubdivisionGranularityExpression;
  /**
   * Controls the granularity of `pitch-alignment: map` circles and heatmap kernels.
   * More granular circles will more closely follow the map's surface.
   */
  readonly circle: CircleGranularity;
  constructor(options: {
    /**
     * Granularity settings used for fill and fill-extrusion layers (for fill, both polygons and their anti-aliasing outlines).
     */
    fill: SubdivisionGranularityExpression;
    /**
     * Granularity used for the line layer.
     */
    line: SubdivisionGranularityExpression;
    /**
     * Granularity used for geometry covering the entire tile: stencil masks, raster tiles, etc.
     */
    tile: SubdivisionGranularityExpression;
    /**
     * Granularity used for stencil masks for tiles.
     */
    stencil: SubdivisionGranularityExpression;
    /**
     * Controls the granularity of `pitch-alignment: map` circles and heatmap kernels.
     * More granular circles will more closely follow the map's surface.
     */
    circle: CircleGranularity;
  });
  /**
   * Granularity settings that disable subdivision altogether.
   */
  static readonly noSubdivision: SubdivisionGranularitySetting;
}
type TileParameters = {
  type: string;
  source: string;
  uid: string | number;
};
type WorkerTileParameters = TileParameters & {
  tileID: OverscaledTileID;
  request?: RequestParameters;
  zoom: number;
  maxZoom?: number;
  tileSize: number;
  promoteId: PromoteIdSpecification;
  pixelRatio: number;
  showCollisionBoxes: boolean;
  collectResourceTiming?: boolean;
  returnDependencies?: boolean;
  subdivisionGranularity: SubdivisionGranularitySetting;
  encoding?: string;
  /**
   * Provide this property when the requested tile has a higher canonical Z than source maxzoom.
   * This allows the worker to know that it needs to overzoom from a source tile.
   */
  overzoomParameters?: OverzoomParameters;
  etag?: string;
};
type OverzoomParameters = {
  maxZoomTileID: CanonicalTileID;
  overzoomRequest: RequestParameters;
};
type WorkerDEMTileParameters = TileParameters & {
  rawImageData: RGBAImage | ImageBitmap | ImageData;
  encoding: DEMEncoding;
  redFactor: number;
  greenFactor: number;
  blueFactor: number;
  baseShift: number;
};
type WorkerTileWithData = ExpiryData & {
  buckets: Array<Bucket>;
  imageAtlas: ImageAtlas;
  dashPositions: Record<string, DashEntry>;
  glyphAtlasImage: AlphaImage;
  featureIndex: FeatureIndex;
  collisionBoxArray: CollisionBoxArray;
  rawTileData?: ArrayBuffer;
  encoding?: string;
  resourceTiming?: Array<PerformanceResourceTiming>;
  glyphMap?: {
    [_: string]: {
      [_: number]: StyleGlyph;
    };
  } | null;
  iconMap?: {
    [_: string]: StyleImage;
  } | null;
  glyphPositions?: GlyphPositions | null;
  etagUnmodified?: false;
};
type WorkerTileWithoutData = ExpiryData & {
  etagUnmodified: true;
  resourceTiming?: Array<PerformanceResourceTiming>;
};
type WorkerTileResult = WorkerTileWithData | WorkerTileWithoutData;
type OverlapMode = "never" | "always" | "cooperative";
type QueryResult<T> = {
  key: T;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
};
type GridKey = {
  overlapMode?: OverlapMode;
};
declare class GridIndex<T extends GridKey> {
  circleKeys: Array<T>;
  boxKeys: Array<T>;
  boxCells: Array<Array<number>>;
  circleCells: Array<Array<number>>;
  bboxes: Array<number>;
  circles: Array<number>;
  xCellCount: number;
  yCellCount: number;
  width: number;
  height: number;
  xScale: number;
  yScale: number;
  boxUid: number;
  circleUid: number;
  constructor(width: number, height: number, cellSize: number);
  keysLength(): number;
  insert(key: T, x1: number, y1: number, x2: number, y2: number): void;
  insertCircle(key: T, x: number, y: number, radius: number): void;
  private _insertBoxCell;
  private _insertCircleCell;
  private _query;
  query(x1: number, y1: number, x2: number, y2: number): Array<QueryResult<T>>;
  hitTest(x1: number, y1: number, x2: number, y2: number, overlapMode: OverlapMode, predicate?: (key: T) => boolean): boolean;
  hitTestCircle(x: number, y: number, radius: number, overlapMode: OverlapMode, predicate?: (key: T) => boolean): boolean;
  private _queryCell;
  private _queryCellCircle;
  private _forEachCell;
  private _convertToXCellCoord;
  private _convertToYCellCoord;
  private _circlesCollide;
  private _circleAndRectCollide;
}
type PlacedCircles = {
  circles: Array<number>;
  offscreen: boolean;
  collisionDetected: boolean;
};
type PlacedBox = {
  box: Array<number>;
  placeable: boolean;
  offscreen: boolean;
  occluded: boolean;
};
type FeatureKey = {
  bucketInstanceId: number;
  featureIndex: number;
  collisionGroupID: number;
  overlapMode: OverlapMode;
};
declare class CollisionIndex {
  grid: GridIndex<FeatureKey>;
  ignoredGrid: GridIndex<FeatureKey>;
  transform: IReadonlyTransform;
  pitchFactor: number;
  screenRightBoundary: number;
  screenBottomBoundary: number;
  gridRightBoundary: number;
  gridBottomBoundary: number;
  perspectiveRatioCutoff: number;
  constructor(transform: IReadonlyTransform, grid?: GridIndex<FeatureKey>, ignoredGrid?: GridIndex<FeatureKey>);
  placeCollisionBox(collisionBox: SingleCollisionBox, overlapMode: OverlapMode, textPixelRatio: number, tileID: OverscaledTileID, unwrappedTileID: UnwrappedTileID, pitchWithMap: boolean, rotateWithMap: boolean, translation: [number, number], collisionGroupPredicate?: (key: FeatureKey) => boolean, getElevation?: (x: number, y: number) => number, shift?: Point, simpleProjectionMatrix?: mat4): PlacedBox;
  placeCollisionCircles(overlapMode: OverlapMode, symbol: PlacedSymbol, lineVertexArray: SymbolLineVertexArray, glyphOffsetArray: GlyphOffsetArray, fontSize: number, unwrappedTileID: UnwrappedTileID, pitchedLabelPlaneMatrix: mat4, showCollisionCircles: boolean, pitchWithMap: boolean, collisionGroupPredicate: (key: FeatureKey) => boolean, circlePixelDiameter: number, textPixelPadding: number, translation: [number, number], getElevation: (x: number, y: number) => number): PlacedCircles;
  projectPathToScreenSpace(projectedPath: Array<Point>, projectionContext: SymbolProjectionContext): Array<PointProjection>;
  /**
   * Because the geometries in the CollisionIndex are an approximation of the shape of
   * symbols on the map, we use the CollisionIndex to look up the symbol part of
   * `queryRenderedFeatures`.
   */
  queryRenderedSymbols(viewportQueryGeometry: Array<Point>): {};
  insertCollisionBox(collisionBox: Array<number>, overlapMode: OverlapMode, ignorePlacement: boolean, bucketInstanceId: number, featureIndex: number, collisionGroupID: number): void;
  insertCollisionCircles(collisionCircles: Array<number>, overlapMode: OverlapMode, ignorePlacement: boolean, bucketInstanceId: number, featureIndex: number, collisionGroupID: number): void;
  projectAndGetPerspectiveRatio(x: number, y: number, unwrappedTileID: UnwrappedTileID, getElevation?: (x: number, y: number) => number, simpleProjectionMatrix?: mat4): {
    x: number;
    y: number;
    perspectiveRatio: number;
    isOccluded: boolean;
    signedDistanceFromCamera: any;
  };
  getPerspectiveRatio(x: number, y: number, unwrappedTileID: UnwrappedTileID, getElevation?: (x: number, y: number) => number): number;
  isOffscreen(x1: number, y1: number, x2: number, y2: number): boolean;
  isInsideGrid(x1: number, y1: number, x2: number, y2: number): boolean;
  getViewportMatrix(): mat4;
  /**
   * Applies all layout+paint properties of the given box in order to find as good approximation of its screen-space bounding box as possible.
   */
  private _projectCollisionBox;
}
declare enum TextAnchorEnum {
  "center" = 1,
  "left" = 2,
  "right" = 3,
  "top" = 4,
  "bottom" = 5,
  "top-left" = 6,
  "top-right" = 7,
  "bottom-left" = 8,
  "bottom-right" = 9
}
type TextAnchor = keyof typeof TextAnchorEnum;
declare class OpacityState {
  opacity: number;
  placed: boolean;
  constructor(prevState: OpacityState, increment: number, placed: boolean, skipFade?: boolean | null);
  isHidden(): boolean;
}
declare class JointOpacityState {
  text: OpacityState;
  icon: OpacityState;
  constructor(prevState: JointOpacityState, increment: number, placedText: boolean, placedIcon: boolean, skipFade?: boolean | null);
  isHidden(): boolean;
}
declare class JointPlacement {
  text: boolean;
  icon: boolean;
  skipFade: boolean;
  constructor(text: boolean, icon: boolean, skipFade: boolean);
}
declare class RetainedQueryData {
  bucketInstanceId: number;
  featureIndex: FeatureIndex;
  sourceLayerIndex: number;
  bucketIndex: number;
  tileID: OverscaledTileID;
  featureSortOrder: Array<number>;
  constructor(bucketInstanceId: number, featureIndex: FeatureIndex, sourceLayerIndex: number, bucketIndex: number, tileID: OverscaledTileID);
}
type CollisionGroup = {
  ID: number;
  predicate?: (key: FeatureKey) => boolean;
};
declare class CollisionGroups {
  collisionGroups: {
    [groupName: string]: CollisionGroup;
  };
  maxGroupID: number;
  crossSourceCollisions: boolean;
  constructor(crossSourceCollisions: boolean);
  get(sourceID: string): CollisionGroup;
}
type VariableOffset = {
  textOffset: [number, number];
  width: number;
  height: number;
  anchor: TextAnchor;
  textBoxScale: number;
  prevAnchor?: TextAnchor;
};
type TileLayerParameters = {
  bucket: SymbolBucket;
  layout: PossiblyEvaluated<SymbolLayoutProps, SymbolLayoutPropsPossiblyEvaluated>;
  translationText: [number, number];
  translationIcon: [number, number];
  unwrappedTileID: UnwrappedTileID;
  pitchedLabelPlaneMatrix: mat4;
  scale: number;
  textPixelRatio: number;
  holdingForFade: boolean;
  collisionBoxArray: CollisionBoxArray;
  partiallyEvaluatedTextSize: {
    uSize: number;
    uSizeT: number;
  };
  collisionGroup: CollisionGroup;
};
type BucketPart = {
  sortKey?: number | void;
  symbolInstanceStart: number;
  symbolInstanceEnd: number;
  parameters: TileLayerParameters;
};
type CrossTileID = string | number;
declare class Placement {
  transform: IReadonlyTransform;
  terrain: Terrain;
  collisionIndex: CollisionIndex;
  placements: { [_ in CrossTileID]: JointPlacement };
  opacities: { [_ in CrossTileID]: JointOpacityState };
  variableOffsets: { [_ in CrossTileID]: VariableOffset };
  placedOrientations: { [_ in CrossTileID]: number };
  commitTime: number;
  prevZoomAdjustment: number;
  lastPlacementChangeTime: number;
  stale: boolean;
  fadeDuration: number;
  retainedQueryData: {
    [_: number]: RetainedQueryData;
  };
  collisionGroups: CollisionGroups;
  prevPlacement: Placement;
  zoomAtLastRecencyCheck: number;
  collisionCircleArrays: { [k in any]: Array<number> };
  collisionBoxArrays: Map<number, Map<number, {
    text: number[];
    icon: number[];
  }>>;
  constructor(transform: ITransform, terrain: Terrain, fadeDuration: number, crossSourceCollisions: boolean, prevPlacement?: Placement);
  private _getTerrainElevationFunc;
  getBucketParts(results: Array<BucketPart>, styleLayer: StyleLayer, tile: Tile, sortAcrossTiles: boolean): void;
  attemptAnchorPlacement(textAnchorOffset: TextAnchorOffset, textBox: SingleCollisionBox, width: number, height: number, textBoxScale: number, rotateWithMap: boolean, pitchWithMap: boolean, textPixelRatio: number, tileID: OverscaledTileID, unwrappedTileID: any, collisionGroup: CollisionGroup, textOverlapMode: OverlapMode, symbolInstance: SymbolInstance, bucket: SymbolBucket, orientation: number, translationText: [number, number], translationIcon: [number, number], iconBox?: SingleCollisionBox | null, getElevation?: (x: number, y: number) => number, simpleProjectionMatrix?: mat4): {
    shift: Point;
    placedGlyphBoxes: PlacedBox;
  };
  placeLayerBucketPart(bucketPart: BucketPart, seenCrossTileIDs: { [k in string | number]: boolean }, showCollisionBoxes: boolean): void;
  storeCollisionData(bucketInstanceId: number, symbolIndex: number, collisionArrays: CollisionArrays, placedGlyphBoxes: PlacedBox, placedIconBoxes: PlacedBox, placedGlyphCircles: PlacedCircles): void;
  markUsedJustification(bucket: SymbolBucket, placedAnchor: TextAnchor, symbolInstance: SymbolInstance, orientation: number): void;
  markUsedOrientation(bucket: SymbolBucket, orientation: number, symbolInstance: SymbolInstance): void;
  commit(now: number): void;
  updateLayerOpacities(styleLayer: StyleLayer, tiles: Array<Tile>): void;
  updateBucketOpacities(bucket: SymbolBucket, tileID: OverscaledTileID, seenCrossTileIDs: { [k in string | number]: boolean }, collisionBoxArray?: CollisionBoxArray | null): void;
  symbolFadeChange(now: number): number;
  zoomAdjustment(zoom: number): number;
  hasTransitions(now: number): boolean;
  stillRecent(now: number, zoom: number): boolean;
  setStale(): void;
}
/**
 * Options to pass to query the map for the rendered features
 */
type QueryRenderedFeaturesOptions = {
  /**
   * An array or set of [style layer IDs](https://maplibre.org/maplibre-style-spec/#layer-id) for the query to inspect.
   * Only features within these layers will be returned. If this parameter is undefined, all layers will be checked.
   */
  layers?: Array<string> | Set<string>;
  /**
   * A [filter](https://maplibre.org/maplibre-style-spec/layers/#filter) to limit query results.
   */
  filter?: FilterSpecification;
  /**
   * An array of string representing the available images
   */
  availableImages?: Array<string>;
  /**
   * Whether to check if the [options.filter] conforms to the MapLibre Style Specification. Disabling validation is a performance optimization that should only be used if you have previously validated the values you will be passing to this function.
   */
  validate?: boolean;
};
type QueryRenderedFeaturesOptionsStrict = Omit<QueryRenderedFeaturesOptions, "layers"> & {
  layers: Set<string> | null;
  globalState?: Record<string, any>;
};
/**
 * The options object related to the {@link Map.querySourceFeatures} method
 */
type QuerySourceFeatureOptions = {
  /**
   * The name of the source layer to query. *For vector tile sources, this parameter is required.* For GeoJSON sources, it is ignored.
   */
  sourceLayer?: string;
  /**
   * A [filter](https://maplibre.org/maplibre-style-spec/layers/#filter)
   * to limit query results.
   */
  filter?: FilterSpecification;
  /**
   * Whether to check if the [parameters.filter] conforms to the MapLibre Style Specification. Disabling validation is a performance optimization that should only be used if you have previously validated the values you will be passing to this function.
   * @defaultValue true
   */
  validate?: boolean;
};
type QuerySourceFeatureOptionsStrict = QuerySourceFeatureOptions & {
  globalState?: Record<string, any>;
};
type QueryRenderedFeaturesResults = {
  [key: string]: QueryRenderedFeaturesResultsItem[];
};
type QueryRenderedFeaturesResultsItem = QueryResultsItem & {
  feature: MapGeoJSONFeature;
};
type TileState = "loading" | "loaded" | "reloading" | "unloaded" | "errored" | "expired";
type CrossFadeArgs = {
  fadingRole: FadingRoles;
  fadingDirection: FadingDirections;
  fadingParentID?: OverscaledTileID;
  fadeEndTime: number;
};
declare enum FadingRoles {
  Base = 0,
  Parent = 1
}
declare enum FadingDirections {
  Departing = 0,
  Incoming = 1
}
/**
 * A tile object is the combination of a Coordinate, which defines
 * its place, as well as a unique ID and data tracking for its content
 */
declare class Tile {
  tileID: OverscaledTileID;
  uid: number;
  uses: number;
  tileSize: number;
  buckets: {
    [_: string]: Bucket;
  };
  latestFeatureIndex: FeatureIndex | null;
  latestRawTileData: ArrayBuffer;
  latestEncoding: string;
  imageAtlas: ImageAtlas;
  imageAtlasTexture: Texture;
  dashPositions: {
    [_: string]: DashEntry;
  };
  glyphAtlasImage: AlphaImage;
  glyphAtlasTexture: Texture;
  etag?: string;
  expirationTime: any;
  expiredRequestCount: number;
  state: TileState;
  fadingRole: FadingRoles;
  fadingDirection: FadingDirections;
  fadingParentID: OverscaledTileID;
  selfFading: boolean;
  timeAdded: number;
  fadeEndTime: number;
  fadeOpacity: number;
  collisionBoxArray: CollisionBoxArray;
  redoWhenDone: boolean;
  showCollisionBoxes: boolean;
  placementSource: any;
  actor: Actor;
  vtLayers: {
    [_: string]: VectorTileLayerLike;
  };
  neighboringTiles: Record<string, {
    backfilled: boolean;
  }>;
  dem: DEMData;
  demMatrix: mat4;
  aborted: boolean;
  needsHillshadePrepare: boolean;
  needsTerrainPrepare: boolean;
  abortController: AbortController;
  texture: any;
  fbo: Framebuffer;
  demTexture: Texture;
  refreshedUponExpiration: boolean;
  reloadPromise: {
    resolve: () => void;
    reject: () => void;
  };
  resourceTiming: Array<PerformanceResourceTiming>;
  queryPadding: number;
  symbolFadeHoldUntil: number;
  hasSymbolBuckets: boolean;
  hasRTLText: boolean;
  dependencies: any;
  rtt: Array<{
    id: number;
    stamp: number;
  }>;
  rttFingerprint: {
    [sourceId: string]: string;
  };
  /**
   * @param tileID - the tile ID
   * @param size - The tile size
   */
  constructor(tileID: OverscaledTileID, size: number);
  isRenderable(symbolLayer: boolean): boolean;
  /**
   * @internal
   * Many-to-one crossfade between a base tile and parent/ancestor tile (when zooming)
   */
  setCrossFadeLogic({
    fadingRole,
    fadingDirection,
    fadingParentID,
    fadeEndTime
  }: CrossFadeArgs): void;
  /**
   * Self fading for edge tiles (when panning map)
   */
  setSelfFadeLogic(fadeEndTime: number): void;
  resetFadeLogic(): void;
  wasRequested(): boolean;
  clearTextures(painter: any): void;
  /**
   * Given a data object with a 'buffers' property, load it into
   * this tile's elementGroups and buffers properties and set loaded
   * to true. If the data is null, like in the case of an empty
   * GeoJSON tile, no-op but still set loaded to true.
   * @param data - The data from the worker
   * @param painter - the painter
   * @param justReloaded - `true` to just reload
   */
  loadVectorData(data: WorkerTileResult, painter: Painter, justReloaded?: boolean | null): void;
  /**
   * Release any data or WebGL resources referenced by this tile.
   */
  unloadVectorData(): void;
  getBucket(layer: StyleLayer): Bucket;
  upload(context: Context): void;
  prepare(imageManager: ImageManager): void;
  queryRenderedFeatures(layers: {
    [_: string]: StyleLayer;
  }, serializedLayers: {
    [_: string]: any;
  }, sourceFeatureState: SourceFeatureState, queryGeometry: Array<Point>, cameraQueryGeometry: Array<Point>, scale: number, params: Pick<QueryRenderedFeaturesOptionsStrict, "filter" | "layers" | "availableImages"> | undefined, transform: IReadonlyTransform, maxPitchScaleFactor: number, pixelPosMatrix: mat4, getElevation: undefined | ((x: number, y: number) => number)): QueryResults;
  querySourceFeatures(result: Array<GeoJSONFeature>, params?: QuerySourceFeatureOptionsStrict): void;
  hasData(): boolean;
  patternsLoaded(): boolean;
  setExpiryData(data: ExpiryData): void;
  getExpiryTimeout(): number;
  setFeatureState(states: LayerFeatureStates, painter: any): void;
  holdingForSymbolFade(): boolean;
  symbolFadeFinished(): boolean;
  clearSymbolFadeHold(): void;
  setSymbolHoldDuration(duration: number): void;
  setDependencies(namespace: string, dependencies: Array<string>): void;
  hasDependency(namespaces: Array<string>, keys: Array<string>): boolean;
}
type FeatureStates = {
  [featureId: string]: FeatureState;
};
type LayerFeatureStates = {
  [layer: string]: FeatureStates;
};
declare class SourceFeatureState {
  state: LayerFeatureStates;
  stateChanges: LayerFeatureStates;
  deletedStates: {};
  revision: number;
  constructor();
  updateState(sourceLayer: string, featureId: number | string, newState: any): void;
  removeFeatureState(sourceLayer: string, featureId?: number | string, key?: string): void;
  getState(sourceLayer: string, featureId: number | string): FeatureState;
  initializeTileState(tile: Tile, painter: any): void;
  coalesceChanges(inViewTiles: InViewTiles, painter: any): void;
}
declare class CircleBucket<Layer extends CircleStyleLayer | HeatmapStyleLayer> implements Bucket {
  index: number;
  zoom: number;
  overscaling: number;
  layerIds: Array<string>;
  layers: Array<Layer>;
  stateDependentLayers: Array<Layer>;
  stateDependentLayerIds: Array<string>;
  layoutVertexArray: CircleLayoutArray;
  layoutVertexBuffer: VertexBuffer;
  indexArray: TriangleIndexArray;
  indexBuffer: IndexBuffer;
  hasDependencies: boolean;
  programConfigurations: ProgramConfigurationSet<Layer>;
  segments: SegmentVector;
  uploaded: boolean;
  constructor(options: BucketParameters<Layer>);
  populate(features: Array<IndexedFeature>, options: PopulateParameters, canonical: CanonicalTileID): void;
  update(states: FeatureStates, vtLayer: VectorTileLayerLike, imagePositions: {
    [_: string]: ImagePosition;
  }): void;
  isEmpty(): boolean;
  uploadPending(): boolean;
  upload(context: Context): void;
  destroy(): void;
  addFeature(feature: BucketFeature, geometry: Array<Array<Point>>, index: number, canonical: CanonicalTileID, granularity?: CircleGranularity): void;
}
type CircleLayoutProps = {
  "circle-sort-key": DataDrivenProperty<number>;
};
type CircleLayoutPropsPossiblyEvaluated = {
  "circle-sort-key": PossiblyEvaluatedPropertyValue<number>;
};
type CirclePaintProps = {
  "circle-radius": DataDrivenProperty<number>;
  "circle-color": DataDrivenProperty<Color>;
  "circle-blur": DataDrivenProperty<number>;
  "circle-opacity": DataDrivenProperty<number>;
  "circle-translate": DataConstantProperty<[number, number]>;
  "circle-translate-anchor": DataConstantProperty<"map" | "viewport">;
  "circle-pitch-scale": DataConstantProperty<"map" | "viewport">;
  "circle-pitch-alignment": DataConstantProperty<"map" | "viewport">;
  "circle-stroke-width": DataDrivenProperty<number>;
  "circle-stroke-color": DataDrivenProperty<Color>;
  "circle-stroke-opacity": DataDrivenProperty<number>;
};
type CirclePaintPropsPossiblyEvaluated = {
  "circle-radius": PossiblyEvaluatedPropertyValue<number>;
  "circle-color": PossiblyEvaluatedPropertyValue<Color>;
  "circle-blur": PossiblyEvaluatedPropertyValue<number>;
  "circle-opacity": PossiblyEvaluatedPropertyValue<number>;
  "circle-translate": [number, number];
  "circle-translate-anchor": "map" | "viewport";
  "circle-pitch-scale": "map" | "viewport";
  "circle-pitch-alignment": "map" | "viewport";
  "circle-stroke-width": PossiblyEvaluatedPropertyValue<number>;
  "circle-stroke-color": PossiblyEvaluatedPropertyValue<Color>;
  "circle-stroke-opacity": PossiblyEvaluatedPropertyValue<number>;
};
declare class CircleStyleLayer extends StyleLayer {
  _unevaluatedLayout: Layout<CircleLayoutProps>;
  layout: PossiblyEvaluated<CircleLayoutProps, CircleLayoutPropsPossiblyEvaluated>;
  _transitionablePaint: Transitionable<CirclePaintProps>;
  _transitioningPaint: Transitioning<CirclePaintProps>;
  paint: PossiblyEvaluated<CirclePaintProps, CirclePaintPropsPossiblyEvaluated>;
  constructor(layer: LayerSpecification, globalState: Record<string, any>);
  createBucket(parameters: BucketParameters<any>): CircleBucket<any>;
  queryRadius(bucket: Bucket): number;
  queryIntersectsFeature({
    queryGeometry,
    feature,
    featureState,
    geometry,
    transform,
    pixelsToTileUnits,
    unwrappedTileID,
    getElevation
  }: QueryIntersectsFeatureParams): boolean;
}
declare class FillBucket implements Bucket {
  index: number;
  zoom: number;
  overscaling: number;
  layers: Array<FillStyleLayer>;
  layerIds: Array<string>;
  stateDependentLayers: Array<FillStyleLayer>;
  stateDependentLayerIds: Array<string>;
  patternFeatures: Array<BucketFeature>;
  layoutVertexArray: FillLayoutArray;
  layoutVertexBuffer: VertexBuffer;
  indexArray: TriangleIndexArray;
  indexBuffer: IndexBuffer;
  indexArray2: LineIndexArray;
  indexBuffer2: IndexBuffer;
  hasDependencies: boolean;
  programConfigurations: ProgramConfigurationSet<FillStyleLayer>;
  segments: SegmentVector;
  segments2: SegmentVector;
  uploaded: boolean;
  constructor(options: BucketParameters<FillStyleLayer>);
  populate(features: Array<IndexedFeature>, options: PopulateParameters, canonical: CanonicalTileID): void;
  update(states: FeatureStates, vtLayer: VectorTileLayerLike, imagePositions: {
    [_: string]: ImagePosition;
  }): void;
  addFeatures(options: PopulateParameters, canonical: CanonicalTileID, imagePositions: {
    [_: string]: ImagePosition;
  }): void;
  isEmpty(): boolean;
  uploadPending(): boolean;
  upload(context: Context): void;
  destroy(): void;
  addFeature(feature: BucketFeature, geometry: Array<Array<Point>>, index: number, canonical: CanonicalTileID, imagePositions: {
    [_: string]: ImagePosition;
  }, subdivisionGranularity: SubdivisionGranularitySetting): void;
}
type FillLayoutProps = {
  "fill-sort-key": DataDrivenProperty<number>;
};
type FillLayoutPropsPossiblyEvaluated = {
  "fill-sort-key": PossiblyEvaluatedPropertyValue<number>;
};
type FillPaintProps = {
  "fill-antialias": DataConstantProperty<boolean>;
  "fill-opacity": DataDrivenProperty<number>;
  "fill-color": DataDrivenProperty<Color>;
  "fill-outline-color": DataDrivenProperty<Color>;
  "fill-translate": DataConstantProperty<[number, number]>;
  "fill-translate-anchor": DataConstantProperty<"map" | "viewport">;
  "fill-pattern": CrossFadedDataDrivenProperty<ResolvedImage>;
};
type FillPaintPropsPossiblyEvaluated = {
  "fill-antialias": boolean;
  "fill-opacity": PossiblyEvaluatedPropertyValue<number>;
  "fill-color": PossiblyEvaluatedPropertyValue<Color>;
  "fill-outline-color": PossiblyEvaluatedPropertyValue<Color>;
  "fill-translate": [number, number];
  "fill-translate-anchor": "map" | "viewport";
  "fill-pattern": PossiblyEvaluatedPropertyValue<CrossFaded<ResolvedImage>>;
};
declare class FillStyleLayer extends StyleLayer {
  _unevaluatedLayout: Layout<FillLayoutProps>;
  layout: PossiblyEvaluated<FillLayoutProps, FillLayoutPropsPossiblyEvaluated>;
  _transitionablePaint: Transitionable<FillPaintProps>;
  _transitioningPaint: Transitioning<FillPaintProps>;
  paint: PossiblyEvaluated<FillPaintProps, FillPaintPropsPossiblyEvaluated>;
  constructor(layer: LayerSpecification, globalState: Record<string, any>);
  recalculate(parameters: EvaluationParameters, availableImages: Array<string>): void;
  createBucket(parameters: BucketParameters<any>): FillBucket;
  queryRadius(): number;
  queryIntersectsFeature({
    queryGeometry,
    geometry,
    transform,
    pixelsToTileUnits
  }: QueryIntersectsFeatureParams): boolean;
  isTileClipped(): boolean;
}
declare class FillExtrusionBucket implements Bucket {
  index: number;
  zoom: number;
  overscaling: number;
  layers: Array<FillExtrusionStyleLayer>;
  layerIds: Array<string>;
  stateDependentLayers: Array<FillExtrusionStyleLayer>;
  stateDependentLayerIds: Array<string>;
  layoutVertexArray: FillExtrusionLayoutArray;
  layoutVertexBuffer: VertexBuffer;
  centroidVertexArray: PosArray;
  centroidVertexBuffer: VertexBuffer;
  indexArray: TriangleIndexArray;
  indexBuffer: IndexBuffer;
  hasDependencies: boolean;
  programConfigurations: ProgramConfigurationSet<FillExtrusionStyleLayer>;
  segments: SegmentVector;
  uploaded: boolean;
  features: Array<BucketFeature>;
  constructor(options: BucketParameters<FillExtrusionStyleLayer>);
  populate(features: Array<IndexedFeature>, options: PopulateParameters, canonical: CanonicalTileID): void;
  addFeatures(options: PopulateParameters, canonical: CanonicalTileID, imagePositions: {
    [_: string]: ImagePosition;
  }): void;
  update(states: FeatureStates, vtLayer: VectorTileLayerLike, imagePositions: {
    [_: string]: ImagePosition;
  }): void;
  isEmpty(): boolean;
  uploadPending(): boolean;
  upload(context: Context): void;
  destroy(): void;
  addFeature(feature: BucketFeature, geometry: Array<Array<Point>>, index: number, canonical: CanonicalTileID, imagePositions: {
    [_: string]: ImagePosition;
  }, subdivisionGranularity: SubdivisionGranularitySetting): void;
  private processPolygon;
  /**
   * Generates side faces for the supplied geometry. Assumes `geometry` to be a line string, like the output of {@link subdivideVertexLine}.
   * For rings, it is assumed that the first and last vertex of `geometry` are equal.
   */
  private _generateSideFaces;
}
type FillExtrusionPaintProps = {
  "fill-extrusion-opacity": DataConstantProperty<number>;
  "fill-extrusion-color": DataDrivenProperty<Color>;
  "fill-extrusion-translate": DataConstantProperty<[number, number]>;
  "fill-extrusion-translate-anchor": DataConstantProperty<"map" | "viewport">;
  "fill-extrusion-pattern": CrossFadedDataDrivenProperty<ResolvedImage>;
  "fill-extrusion-height": DataDrivenProperty<number>;
  "fill-extrusion-base": DataDrivenProperty<number>;
  "fill-extrusion-vertical-gradient": DataConstantProperty<boolean>;
};
type FillExtrusionPaintPropsPossiblyEvaluated = {
  "fill-extrusion-opacity": number;
  "fill-extrusion-color": PossiblyEvaluatedPropertyValue<Color>;
  "fill-extrusion-translate": [number, number];
  "fill-extrusion-translate-anchor": "map" | "viewport";
  "fill-extrusion-pattern": PossiblyEvaluatedPropertyValue<CrossFaded<ResolvedImage>>;
  "fill-extrusion-height": PossiblyEvaluatedPropertyValue<number>;
  "fill-extrusion-base": PossiblyEvaluatedPropertyValue<number>;
  "fill-extrusion-vertical-gradient": boolean;
};
declare class FillExtrusionStyleLayer extends StyleLayer {
  _transitionablePaint: Transitionable<FillExtrusionPaintProps>;
  _transitioningPaint: Transitioning<FillExtrusionPaintProps>;
  paint: PossiblyEvaluated<FillExtrusionPaintProps, FillExtrusionPaintPropsPossiblyEvaluated>;
  constructor(layer: LayerSpecification, globalState: Record<string, any>);
  createBucket(parameters: BucketParameters<FillExtrusionStyleLayer>): FillExtrusionBucket;
  queryRadius(): number;
  is3D(): boolean;
  queryIntersectsFeature({
    queryGeometry,
    feature,
    featureState,
    geometry,
    transform,
    pixelsToTileUnits,
    pixelPosMatrix
  }: QueryIntersectsFeatureParams): boolean | number;
}
type HillshadePaintProps = {
  "hillshade-illumination-direction": DataConstantProperty<NumberArray>;
  "hillshade-illumination-altitude": DataConstantProperty<NumberArray>;
  "hillshade-illumination-anchor": DataConstantProperty<"map" | "viewport">;
  "hillshade-exaggeration": DataConstantProperty<number>;
  "hillshade-shadow-color": DataConstantProperty<ColorArray>;
  "hillshade-highlight-color": DataConstantProperty<ColorArray>;
  "hillshade-accent-color": DataConstantProperty<Color>;
  "hillshade-method": DataConstantProperty<"standard" | "basic" | "combined" | "igor" | "multidirectional">;
  "resampling": DataConstantProperty<"linear" | "nearest">;
};
type HillshadePaintPropsPossiblyEvaluated = {
  "hillshade-illumination-direction": NumberArray;
  "hillshade-illumination-altitude": NumberArray;
  "hillshade-illumination-anchor": "map" | "viewport";
  "hillshade-exaggeration": number;
  "hillshade-shadow-color": ColorArray;
  "hillshade-highlight-color": ColorArray;
  "hillshade-accent-color": Color;
  "hillshade-method": "standard" | "basic" | "combined" | "igor" | "multidirectional";
  "resampling": "linear" | "nearest";
};
declare class HillshadeStyleLayer extends StyleLayer {
  _transitionablePaint: Transitionable<HillshadePaintProps>;
  _transitioningPaint: Transitioning<HillshadePaintProps>;
  paint: PossiblyEvaluated<HillshadePaintProps, HillshadePaintPropsPossiblyEvaluated>;
  constructor(layer: LayerSpecification, globalState: Record<string, any>);
  getIlluminationProperties(): {
    directionRadians: number[];
    altitudeRadians: number[];
    shadowColor: Color[];
    highlightColor: Color[];
  };
  hasOffscreenPass(): boolean;
}
type ColorReliefPaintProps = {
  "color-relief-opacity": DataConstantProperty<number>;
  "color-relief-color": ColorRampProperty;
  "resampling": DataConstantProperty<"linear" | "nearest">;
};
type ColorReliefPaintPropsPossiblyEvaluated = {
  "color-relief-opacity": number;
  "color-relief-color": ColorRampProperty;
  "resampling": "linear" | "nearest";
};
type ColorRamp = {
  elevationStops: Array<number>;
  colorStops: Array<Color>;
};
type ColorRampTextures = {
  elevationTexture: Texture;
  colorTexture: Texture;
};
declare class ColorReliefStyleLayer extends StyleLayer {
  colorRampExpression: StylePropertyExpression;
  colorRampTextures: ColorRampTextures;
  _transitionablePaint: Transitionable<ColorReliefPaintProps>;
  _transitioningPaint: Transitioning<ColorReliefPaintProps>;
  paint: PossiblyEvaluated<ColorReliefPaintProps, ColorReliefPaintPropsPossiblyEvaluated>;
  constructor(layer: LayerSpecification, globalState: Record<string, any>);
  /**
   * Create the color ramp, enforcing a maximum length for the vectors. This modifies the internal color ramp,
   * so that the remapping is only performed once.
   *
   * @param maxLength - the maximum number of stops in the color ramp
   *
   * @return a `ColorRamp` object with no more than `maxLength` stops.
   *
   */
  _createColorRamp(maxLength: number): ColorRamp;
  _colorRampChanged(): boolean;
  getColorRampTextures(context: Context, maxLength: number, unpackVector: number[]): ColorRampTextures;
  hasOffscreenPass(): boolean;
}
type LineClips = {
  start: number;
  end: number;
};
type GradientTexture = {
  texture?: Texture;
  gradient?: RGBAImage;
  version?: number;
};
declare class LineBucket implements Bucket {
  distance: number;
  totalDistance: number;
  maxLineLength: number;
  scaledDistance: number;
  lineClips?: LineClips;
  e1: number;
  e2: number;
  index: number;
  zoom: number;
  overscaling: number;
  layers: Array<LineStyleLayer>;
  layerIds: Array<string>;
  gradients: {
    [x: string]: GradientTexture;
  };
  stateDependentLayers: Array<any>;
  stateDependentLayerIds: Array<string>;
  patternFeatures: Array<BucketFeature>;
  lineClipsArray: Array<LineClips>;
  layoutVertexArray: LineLayoutArray;
  layoutVertexBuffer: VertexBuffer;
  layoutVertexArray2: LineExtLayoutArray;
  layoutVertexBuffer2: VertexBuffer;
  indexArray: TriangleIndexArray;
  indexBuffer: IndexBuffer;
  hasDependencies: boolean;
  programConfigurations: ProgramConfigurationSet<LineStyleLayer>;
  segments: SegmentVector;
  uploaded: boolean;
  constructor(options: BucketParameters<LineStyleLayer>);
  populate(features: Array<IndexedFeature>, options: PopulateParameters, canonical: CanonicalTileID): void;
  update(states: FeatureStates, vtLayer: VectorTileLayerLike, imagePositions: {
    [_: string]: ImagePosition;
  }, dashPositions: {
    [_: string]: DashEntry;
  }): void;
  addFeatures(options: PopulateParameters, canonical: CanonicalTileID, imagePositions: {
    [_: string]: ImagePosition;
  }, dashPositions?: {
    [_: string]: DashEntry;
  }): void;
  isEmpty(): boolean;
  uploadPending(): boolean;
  upload(context: Context): void;
  destroy(): void;
  lineFeatureClips(feature: BucketFeature): LineClips | undefined;
  addFeature(feature: BucketFeature, geometry: Array<Array<Point>>, index: number, canonical: CanonicalTileID, imagePositions: {
    [_: string]: ImagePosition;
  }, dashPositions: Record<string, DashEntry>, subdivisionGranularity: SubdivisionGranularitySetting): void;
  addLine(vertices: Array<Point>, feature: BucketFeature, join: string, cap: string, miterLimit: number, roundLimit: number, canonical: CanonicalTileID | undefined, subdivisionGranularity: SubdivisionGranularitySetting): void;
  /**
   * Add two vertices to the buffers.
   *
   * @param p - the line vertex to add buffer vertices for
   * @param normal - vertex normal
   * @param endLeft - extrude to shift the left vertex along the line
   * @param endRight - extrude to shift the left vertex along the line
   * @param segment - the segment object to add the vertex to
   * @param round - whether this is a round cap
   */
  addCurrentVertex(p: Point, normal: Point, endLeft: number, endRight: number, segment: Segment, round?: boolean): void;
  addHalfVertex({
    x,
    y
  }: Point, extrudeX: number, extrudeY: number, round: boolean, up: boolean, dir: number, segment: Segment): void;
  updateScaledDistance(): void;
  updateDistance(prev: Point, next: Point): void;
  private hasLineDasharray;
  private addLineDashDependencies;
}
type LineLayoutProps = {
  "line-cap": DataDrivenProperty<"butt" | "round" | "square">;
  "line-join": DataDrivenProperty<"bevel" | "round" | "miter">;
  "line-miter-limit": DataDrivenProperty<number>;
  "line-round-limit": DataDrivenProperty<number>;
  "line-sort-key": DataDrivenProperty<number>;
};
type LineLayoutPropsPossiblyEvaluated = {
  "line-cap": PossiblyEvaluatedPropertyValue<"butt" | "round" | "square">;
  "line-join": PossiblyEvaluatedPropertyValue<"bevel" | "round" | "miter">;
  "line-miter-limit": PossiblyEvaluatedPropertyValue<number>;
  "line-round-limit": PossiblyEvaluatedPropertyValue<number>;
  "line-sort-key": PossiblyEvaluatedPropertyValue<number>;
};
type LinePaintProps = {
  "line-opacity": DataDrivenProperty<number>;
  "line-color": DataDrivenProperty<Color>;
  "line-translate": DataConstantProperty<[number, number]>;
  "line-translate-anchor": DataConstantProperty<"map" | "viewport">;
  "line-width": DataDrivenProperty<number>;
  "line-gap-width": DataDrivenProperty<number>;
  "line-offset": DataDrivenProperty<number>;
  "line-blur": DataDrivenProperty<number>;
  "line-dasharray": CrossFadedDataDrivenProperty<Array<number>>;
  "line-pattern": CrossFadedDataDrivenProperty<ResolvedImage>;
  "line-gradient": ColorRampProperty;
};
type LinePaintPropsPossiblyEvaluated = {
  "line-opacity": PossiblyEvaluatedPropertyValue<number>;
  "line-color": PossiblyEvaluatedPropertyValue<Color>;
  "line-translate": [number, number];
  "line-translate-anchor": "map" | "viewport";
  "line-width": PossiblyEvaluatedPropertyValue<number>;
  "line-gap-width": PossiblyEvaluatedPropertyValue<number>;
  "line-offset": PossiblyEvaluatedPropertyValue<number>;
  "line-blur": PossiblyEvaluatedPropertyValue<number>;
  "line-dasharray": PossiblyEvaluatedPropertyValue<CrossFaded<Array<number>>>;
  "line-pattern": PossiblyEvaluatedPropertyValue<CrossFaded<ResolvedImage>>;
  "line-gradient": ColorRampProperty;
};
declare class LineStyleLayer extends StyleLayer {
  _unevaluatedLayout: Layout<LineLayoutProps>;
  layout: PossiblyEvaluated<LineLayoutProps, LineLayoutPropsPossiblyEvaluated>;
  gradientVersion: number;
  stepInterpolant: boolean;
  _transitionablePaint: Transitionable<LinePaintProps>;
  _transitioningPaint: Transitioning<LinePaintProps>;
  paint: PossiblyEvaluated<LinePaintProps, LinePaintPropsPossiblyEvaluated>;
  constructor(layer: LayerSpecification, globalState: Record<string, any>);
  _handleSpecialPaintPropertyUpdate(name: string): void;
  gradientExpression(): StylePropertyExpression;
  recalculate(parameters: EvaluationParameters, availableImages: Array<string>): void;
  createBucket(parameters: BucketParameters<any>): LineBucket;
  queryRadius(bucket: Bucket): number;
  queryIntersectsFeature({
    queryGeometry,
    feature,
    featureState,
    geometry,
    transform,
    pixelsToTileUnits
  }: QueryIntersectsFeatureParams): boolean;
  isTileClipped(): boolean;
}
type TypedStyleLayer = CircleStyleLayer | FillStyleLayer | FillExtrusionStyleLayer | HeatmapStyleLayer | HillshadeStyleLayer | ColorReliefStyleLayer | LineStyleLayer | SymbolStyleLayer;
type BinderUniform = {
  name: string;
  property: string;
  binding: Uniform<any>;
};
type PaintOptions = {
  imagePositions: {
    [_: string]: ImagePosition;
  };
  dashPositions?: {
    [_: string]: DashEntry;
  };
  canonical?: CanonicalTileID;
  formattedSection?: FormattedSection;
  globalState?: Record<string, any>;
};
interface AttributeBinder {
  populatePaintArray(length: number, feature: Feature, options: PaintOptions): void;
  updatePaintArray(start: number, length: number, feature: Feature, featureState: FeatureState, options: PaintOptions): void;
  upload(a: Context): void;
  destroy(): void;
}
interface UniformBinder {
  uniformNames: Array<string>;
  setUniform(uniform: Uniform<any>, globals: GlobalProperties, currentValue: PossiblyEvaluatedPropertyValue<any>, uniformName: string): void;
  getBinding(context: Context, location: WebGLUniformLocation, name: string): Partial<Uniform<any>>;
}
declare class ProgramConfiguration {
  binders: {
    [_: string]: AttributeBinder | UniformBinder;
  };
  cacheKey: string;
  _buffers: Array<VertexBuffer>;
  constructor(layer: TypedStyleLayer, zoom: number, filterProperties: (_: string) => boolean);
  getMaxValue(property: string): number;
  populatePaintArrays(newLength: number, feature: Feature, options: PaintOptions): void;
  setConstantPatternPositions(posTo: ImagePosition, posFrom: ImagePosition): void;
  setConstantDashPositions(dashTo: DashEntry, dashFrom: DashEntry): void;
  updatePaintArrays(featureStates: FeatureStates, featureMap: FeaturePositionMap, vtLayer: VectorTileLayerLike, layer: TypedStyleLayer, options: PaintOptions): boolean;
  defines(): Array<string>;
  getBinderAttributes(): Array<string>;
  getBinderUniforms(): Array<string>;
  getPaintVertexBuffers(): Array<VertexBuffer>;
  getUniforms(context: Context, locations: UniformLocations): Array<BinderUniform>;
  setUniforms(context: Context, binderUniforms: Array<BinderUniform>, properties: any, globals: GlobalProperties): void;
  updatePaintBuffers(crossfade?: CrossfadeParameters): void;
  upload(context: Context): void;
  destroy(): void;
}
declare class ProgramConfigurationSet<Layer extends TypedStyleLayer> {
  programConfigurations: {
    [_: string]: ProgramConfiguration;
  };
  needsUpload: boolean;
  _featureMap: FeaturePositionMap;
  _bufferOffset: number;
  constructor(layers: ReadonlyArray<Layer>, zoom: number, filterProperties?: (_: string) => boolean);
  populatePaintArrays(length: number, feature: Feature, index: number, options: PaintOptions): void;
  updatePaintArrays(featureStates: FeatureStates, vtLayer: VectorTileLayerLike, layers: ReadonlyArray<TypedStyleLayer>, options: PaintOptions): void;
  get(layerId: string): ProgramConfiguration;
  upload(context: Context): void;
  destroy(): void;
}
declare class CullFaceMode {
  enable: boolean;
  mode: CullFaceModeType;
  frontFace: FrontFaceType;
  constructor(enable: boolean, mode: CullFaceModeType, frontFace: FrontFaceType);
  static disabled: Readonly<CullFaceMode>;
  /**
   * The standard GL cull mode. Culls backfacing triangles when counterclockwise vertex order is used.
   * Use for 3D geometry such as terrain.
   */
  static backCCW: Readonly<CullFaceMode>;
  /**
   * Opposite of {@link backCCW}. Culls front-facing triangles when counterclockwise vertex order is used.
   */
  static frontCCW: Readonly<CullFaceMode>;
}
type SkyProps = {
  "sky-color": DataConstantProperty<Color>;
  "horizon-color": DataConstantProperty<Color>;
  "fog-color": DataConstantProperty<Color>;
  "fog-ground-blend": DataConstantProperty<number>;
  "horizon-fog-blend": DataConstantProperty<number>;
  "sky-horizon-blend": DataConstantProperty<number>;
  "atmosphere-blend": DataConstantProperty<number>;
};
type SkyPropsPossiblyEvaluated = {
  "sky-color": Color;
  "horizon-color": Color;
  "fog-color": Color;
  "fog-ground-blend": number;
  "horizon-fog-blend": number;
  "sky-horizon-blend": number;
  "atmosphere-blend": number;
};
declare class Sky extends Evented {
  properties: PossiblyEvaluated<SkyProps, SkyPropsPossiblyEvaluated>;
  /**
   * This is used to cache the gl mesh for the sky, it should be initialized only once.
   */
  mesh: Mesh | undefined;
  atmosphereMesh: Mesh | undefined;
  _transitionable: Transitionable<SkyProps>;
  _transitioning: Transitioning<SkyProps>;
  constructor(sky?: SkySpecification);
  setSky(sky?: SkySpecification, options?: StyleSetterOptions): void;
  getSky(): SkySpecification;
  updateTransitions(parameters: TransitionParameters): void;
  hasTransition(): boolean;
  recalculate(parameters: EvaluationParameters): void;
  _validate(validate: Function, value: unknown, options?: StyleSetterOptions): boolean;
  /**
   * Currently fog is a very simple implementation, and should only used
   * to create an atmosphere near the horizon.
   * But because the fog is drawn from the far-clipping-plane to
   * map-center, and because the fog does nothing know about the horizon,
   * this method does a fadeout in respect of pitch. So, when the horizon
   * gets out of view, which is at about pitch 70, this methods calculates
   * the corresponding opacity values. Below pitch 60 the fog is completely
   * invisible.
   */
  calculateFogBlendOpacity(pitch: number): number;
}
type TerrainPreludeUniformsType = {
  "u_depth": Uniform1i;
  "u_terrain": Uniform1i;
  "u_terrain_dim": Uniform1f;
  "u_terrain_matrix": UniformMatrix4f;
  "u_terrain_unpack": Uniform4f;
  "u_terrain_exaggeration": Uniform1f;
};
type ProjectionPreludeUniformsType = {
  "u_projection_matrix": UniformMatrix4f;
  "u_projection_tile_mercator_coords": Uniform4f;
  "u_projection_clipping_plane": Uniform4f;
  "u_projection_transition": Uniform1f;
  "u_projection_fallback_matrix": UniformMatrix4f;
};
type DrawMode = WebGLRenderingContextBase["LINES"] | WebGLRenderingContextBase["TRIANGLES"] | WebGL2RenderingContext["LINE_STRIP"];
declare class Program<Us extends UniformBindings> {
  program: WebGLProgram;
  attributes: {
    [_: string]: number;
  };
  numAttributes: number;
  fixedUniforms: Us;
  terrainUniforms: TerrainPreludeUniformsType;
  projectionUniforms: ProjectionPreludeUniformsType;
  binderUniforms: Array<BinderUniform>;
  failedToCreate: boolean;
  constructor(context: Context, source: PreparedShader, configuration: ProgramConfiguration, fixedUniforms: (b: Context, a: UniformLocations) => Us, showOverdrawInspector: boolean, hasTerrain: boolean, projectionPrelude: PreparedShader, projectionDefine: string, extraDefines?: Array<string>);
  draw(context: Context, drawMode: DrawMode, depthMode: Readonly<DepthMode>, stencilMode: Readonly<StencilMode>, colorMode: Readonly<ColorMode>, cullFaceMode: Readonly<CullFaceMode>, uniformValues: UniformValues<Us>, terrain: TerrainData, projectionData: ProjectionData, layerID: string, layoutVertexBuffer: VertexBuffer, indexBuffer: IndexBuffer, segments: SegmentVector, currentProperties?: any, zoom?: number | null, configuration?: ProgramConfiguration | null, dynamicLayoutBuffer?: VertexBuffer | null, dynamicLayoutBuffer2?: VertexBuffer | null, dynamicLayoutBuffer3?: VertexBuffer | null): void;
}
declare class VertexBuffer {
  length: number;
  attributes: ReadonlyArray<StructArrayMember>;
  itemSize: number;
  dynamicDraw: boolean;
  context: Context;
  buffer: WebGLBuffer;
  /**
   * @param dynamicDraw - Whether this buffer will be repeatedly updated.
   */
  constructor(context: Context, array: StructArray, attributes: ReadonlyArray<StructArrayMember>, dynamicDraw?: boolean);
  bind(): void;
  updateData(array: StructArray): void;
  enableAttributes(gl: WebGLRenderingContext | WebGL2RenderingContext, program: Program<any>): void;
  /**
   * Set the attribute pointers in a WebGL context
   * @param gl - The WebGL context
   * @param program - The active WebGL program
   * @param vertexOffset - Index of the starting vertex of the segment
   */
  setVertexAttribPointers(gl: WebGLRenderingContext | WebGL2RenderingContext, program: Program<any>, vertexOffset?: number | null): void;
  /**
   * Destroy the GL buffer bound to the given WebGL context
   */
  destroy(): void;
}
type ClearArgs = {
  color?: Color;
  depth?: number;
  stencil?: number;
};
declare class Context {
  gl: WebGLRenderingContext | WebGL2RenderingContext;
  currentNumAttributes: number;
  maxTextureSize: number;
  clearColor: ClearColor;
  clearDepth: ClearDepth;
  clearStencil: ClearStencil;
  colorMask: ColorMask;
  depthMask: DepthMask;
  stencilMask: StencilMask;
  stencilFunc: StencilFunc;
  stencilOp: StencilOp;
  stencilTest: StencilTest;
  depthRange: DepthRange;
  depthTest: DepthTest;
  depthFunc: DepthFunc;
  blend: Blend;
  blendFunc: BlendFunc;
  blendColor: BlendColor;
  blendEquation: BlendEquation;
  cullFace: CullFace;
  cullFaceSide: CullFaceSide;
  frontFace: FrontFace;
  program: ProgramValue;
  activeTexture: ActiveTextureUnit;
  viewport: Viewport;
  bindFramebuffer: BindFramebuffer;
  bindRenderbuffer: BindRenderbuffer;
  bindTexture: BindTexture;
  bindVertexBuffer: BindVertexBuffer;
  bindElementBuffer: BindElementBuffer;
  bindVertexArray: BindVertexArray;
  pixelStoreUnpack: PixelStoreUnpack;
  pixelStoreUnpackPremultiplyAlpha: PixelStoreUnpackPremultiplyAlpha;
  pixelStoreUnpackFlipY: PixelStoreUnpackFlipY;
  extTextureFilterAnisotropic: EXT_texture_filter_anisotropic | null;
  extTextureFilterAnisotropicMax?: GLfloat;
  HALF_FLOAT?: GLenum;
  RGBA16F?: GLenum;
  RGB16F?: GLenum;
  constructor(gl: WebGLRenderingContext | WebGL2RenderingContext);
  setDefault(): void;
  setDirty(): void;
  createIndexBuffer(array: TriangleIndexArray | LineIndexArray | LineStripIndexArray, dynamicDraw?: boolean): IndexBuffer;
  createVertexBuffer(array: StructArray, attributes: ReadonlyArray<StructArrayMember>, dynamicDraw?: boolean): VertexBuffer;
  createRenderbuffer(storageFormat: number, width: number, height: number): WebGLRenderbuffer;
  createFramebuffer(width: number, height: number, hasDepth: boolean, hasStencil: boolean): Framebuffer;
  clear({
    color,
    depth,
    stencil
  }: ClearArgs): void;
  setCullFace(cullFaceMode: Readonly<CullFaceMode>): void;
  setDepthMode(depthMode: Readonly<DepthMode>): void;
  setStencilMode(stencilMode: Readonly<StencilMode>): void;
  setColorMode(colorMode: Readonly<ColorMode>): void;
  createVertexArray(): WebGLVertexArrayObject | undefined;
  deleteVertexArray(x: WebGLVertexArrayObject | undefined): void;
  unbindVAO(): void;
}
type TextureFormat = WebGLRenderingContextBase["RGBA"] | WebGLRenderingContextBase["ALPHA"];
type TextureFilter = WebGLRenderingContextBase["LINEAR"] | WebGLRenderingContextBase["LINEAR_MIPMAP_NEAREST"] | WebGLRenderingContextBase["NEAREST"];
type TextureWrap = WebGLRenderingContextBase["REPEAT"] | WebGLRenderingContextBase["CLAMP_TO_EDGE"] | WebGLRenderingContextBase["MIRRORED_REPEAT"];
type EmptyImage = {
  width: number;
  height: number;
  data: null;
};
type DataTextureImage = RGBAImage | AlphaImage | EmptyImage;
type TextureImage = TexImageSource | DataTextureImage;
declare class Texture {
  context: Context;
  size: [number, number];
  texture: WebGLTexture;
  format: TextureFormat;
  filter: TextureFilter;
  wrap: TextureWrap;
  useMipmap: boolean;
  /** Tracks the original handle to detect corruption after context loss (#2811) */
  private _ownedHandle;
  constructor(context: Context, image: TextureImage, format: TextureFormat, options?: {
    premultiply?: boolean;
    useMipmap?: boolean;
  } | null);
  update(image: TextureImage, options?: {
    premultiply?: boolean;
    useMipmap?: boolean;
  } | null, position?: {
    x: number;
    y: number;
  }): void;
  private _uploadDomImage;
  private _uploadRawData;
  private _updateDomImage;
  private _updateRawData;
  bind(filter: TextureFilter, wrap: TextureWrap, minFilter?: TextureFilter | null): void;
  isSizePowerOfTwo(): boolean;
  destroy(): void;
}
declare class ImagePosition {
  paddedRect: Rect;
  pixelRatio: number;
  version: number;
  stretchY: Array<[number, number]>;
  stretchX: Array<[number, number]>;
  content: [number, number, number, number];
  textFitWidth: TextFit;
  textFitHeight: TextFit;
  constructor(paddedRect: Rect, {
    pixelRatio,
    version,
    stretchX,
    stretchY,
    content,
    textFitWidth,
    textFitHeight
  }: StyleImage);
  get tl(): [number, number];
  get br(): [number, number];
  get tlbr(): Array<number>;
  get displaySize(): [number, number];
}
/**
 * A class holding all the images
 */
declare class ImageAtlas {
  image: RGBAImage;
  iconPositions: {
    [_: string]: ImagePosition;
  };
  patternPositions: {
    [_: string]: ImagePosition;
  };
  haveRenderCallbacks: Array<string>;
  uploaded: boolean;
  constructor(icons: GetImagesResponse, patterns: GetImagesResponse);
  addImages(images: {
    [_: string]: StyleImage;
  }, positions: {
    [_: string]: ImagePosition;
  }, bins: Array<Rect>): void;
  patchUpdatedImages(imageManager: ImageManager, texture: Texture): void;
  patchUpdatedImage(position: ImagePosition, image: StyleImage, texture: Texture): void;
}
type Pattern = {
  bin: PotpackBox;
  position: ImagePosition;
};
declare class ImageManager extends Evented {
  images: {
    [_: string]: StyleImage;
  };
  updatedImages: {
    [_: string]: boolean;
  };
  callbackDispatchedThisFrame: {
    [_: string]: boolean;
  };
  loaded: boolean;
  /**
   * This is used to track requests for images that are not yet available. When the image is loaded,
   * the requestors will be notified.
   */
  requestors: Array<{
    ids: Array<string>;
    promiseResolve: (value: GetImagesResponse) => void;
  }>;
  patterns: {
    [_: string]: Pattern;
  };
  atlasImage: RGBAImage;
  atlasTexture: Texture;
  dirty: boolean;
  constructor();
  destroy(): void;
  isLoaded(): boolean;
  setLoaded(loaded: boolean): void;
  getImage(id: string): StyleImage;
  addImage(id: string, image: StyleImage): void;
  _validate(id: string, image: StyleImage): boolean;
  _validateStretch(stretch: Array<[number, number]>, size: number): boolean;
  _validateContent(content: [number, number, number, number], image: StyleImage): boolean;
  updateImage(id: string, image: StyleImage, validate?: boolean): void;
  removeImage(id: string): void;
  listImages(): Array<string>;
  getImages(ids: Array<string>): Promise<GetImagesResponse>;
  _getImagesForIds(ids: Array<string>): GetImagesResponse;
  getPixelSize(): {
    width: number;
    height: number;
  };
  getPattern(id: string): ImagePosition;
  bind(context: Context): void;
  _updatePatternAtlas(): void;
  beginFrame(): void;
  dispatchRenderCallbacks(ids: Array<string>): void;
  cloneImages(): Record<string, StyleImage>;
}
type LightPosition = {
  x: number;
  y: number;
  z: number;
};
declare class LightPositionProperty implements Property<[number, number, number], LightPosition> {
  specification: StylePropertySpecification;
  constructor();
  possiblyEvaluate(value: PropertyValue<[number, number, number], LightPosition>, parameters: EvaluationParameters): LightPosition;
  interpolate(a: LightPosition, b: LightPosition, t: number): LightPosition;
}
type LightProps = {
  "anchor": DataConstantProperty<"map" | "viewport">;
  "position": LightPositionProperty;
  "color": DataConstantProperty<Color>;
  "intensity": DataConstantProperty<number>;
};
type LightPropsPossiblyEvaluated = {
  "anchor": "map" | "viewport";
  "position": LightPosition;
  "color": Color;
  "intensity": number;
};
declare class Light extends Evented {
  _transitionable: Transitionable<LightProps>;
  _transitioning: Transitioning<LightProps>;
  properties: PossiblyEvaluated<LightProps, LightPropsPossiblyEvaluated>;
  constructor(lightOptions?: LightSpecification);
  getLight(): LightSpecification;
  setLight(light?: LightSpecification, options?: StyleSetterOptions): void;
  updateTransitions(parameters: TransitionParameters): void;
  hasTransition(): boolean;
  recalculate(parameters: EvaluationParameters): void;
  _validate(validate: Function, value: unknown, options?: {
    validate?: boolean;
  }): boolean;
}
declare class LayerPlacement {
  _sortAcrossTiles: boolean;
  _currentTileIndex: number;
  _currentPartIndex: number;
  _seenCrossTileIDs: { [k in string | number]: boolean };
  _bucketParts: Array<BucketPart>;
  constructor(styleLayer: SymbolStyleLayer);
  continuePlacement(tiles: Array<Tile>, placement: Placement, showCollisionBoxes: boolean, styleLayer: StyleLayer, shouldPausePlacement: () => boolean): boolean;
}
declare class PauseablePlacement {
  placement: Placement;
  _done: boolean;
  _currentPlacementIndex: number;
  _forceFullPlacement: boolean;
  _showCollisionBoxes: boolean;
  _inProgressLayer: LayerPlacement;
  constructor(transform: ITransform, terrain: Terrain, order: Array<string>, forceFullPlacement: boolean, showCollisionBoxes: boolean, fadeDuration: number, crossSourceCollisions: boolean, prevPlacement?: Placement);
  isDone(): boolean;
  continuePlacement(order: Array<string>, layers: {
    [_: string]: StyleLayer;
  }, layerTiles: {
    [_: string]: Array<Tile>;
  }): void;
  commit(now: number): Placement;
}
/**
* Input arguments exposed by custom render function.
*/
type CustomRenderMethodInput = {
  /**
   * This value represents the distance from the camera to the far clipping plane.
   * It is used in the calculation of the projection matrix to determine which objects are visible.
   * farZ should be larger than nearZ.
   */
  farZ: number;
  /**
   * This value represents the distance from the camera to the near clipping plane.
   * It is used in the calculation of the projection matrix to determine which objects are visible.
   * nearZ should be smaller than farZ.
   */
  nearZ: number;
  /**
   * Vertical field of view in radians.
   */
  fov: number;
  /**
  * model view projection matrix
  * represents the matrix converting from world space to clip space
  * https://learnopengl.com/Getting-started/Coordinate-Systems
  * **/
  modelViewProjectionMatrix: mat4;
  /**
  * projection matrix
  * represents the matrix converting from view space to clip space
  * https://learnopengl.com/Getting-started/Coordinate-Systems
  */
  projectionMatrix: mat4;
  /**
   * Data required for picking and compiling a custom shader for the current projection.
   */
  shaderData: {
    /**
     * Name of the shader variant that should be used.
     * Depends on current projection.
     * Whenever the other shader properties change, this string changes as well,
     * and can be used as a key with which to cache compiled shaders.
     */
    variantName: string;
    /**
     * The prelude code to add to the vertex shader to access MapLibre's `projectTile` projection function.
     * Depends on current projection.
     * @example
     * ```
     * const vertexSource = `#version 300 es
     * ${shaderData.vertexShaderPrelude}
     * ${shaderData.define}
     * in vec2 a_pos;
     * void main() {
     *     gl_Position = projectTile(a_pos);
     * }`;
     * ```
     */
    vertexShaderPrelude: string;
    /**
     * Defines to add to the shader code.
     * Depends on current projection.
     * @example
     * ```
     * const vertexSource = `#version 300 es
     * ${shaderData.vertexShaderPrelude}
     * ${shaderData.define}
     * in vec2 a_pos;
     * void main() {
     *     gl_Position = projectTile(a_pos);
     *     #ifdef GLOBE
     *     // Do globe-specific things
     *     #endif
     * }`;
     * ```
     */
    define: string;
  };
  /**
   * Uniforms that should be passed to the vertex shader, if MapLibre's projection code is used.
   * For more details of this object's internals, see its doc comments in `src/geo/projection/projection_data.ts`.
   *
   * These uniforms are set so that `projectTile` in shader accepts a vec2 in range 0..1 in web mercator coordinates.
   * Use `map.transform.getProjectionData({overscaledTileID: tileID})` to get uniforms for a given tile and pass vec2 in tile-local range 0..EXTENT instead.
   *
   * For projection 3D features, use `projectTileFor3D` in the shader.
   *
   * If you just need a projection matrix, use `defaultProjectionData.projectionMatrix`.
   * A projection matrix is sufficient for simple custom layers that also only support mercator projection.
   *
   * Under mercator projection, when these uniforms are used, the shader's `projectTile` function projects spherical mercator
   * coordinates to gl clip space coordinates. The spherical mercator coordinate `[0, 0]` represents the
   * top left corner of the mercator world and `[1, 1]` represents the bottom right corner. When
   * the `renderingMode` is `"3d"`, the z coordinate is conformal. A box with identical x, y, and z
   * lengths in mercator units would be rendered as a cube. {@link MercatorCoordinate.fromLngLat}
   * can be used to project a `LngLat` to a mercator coordinate.
   *
   * Under globe projection, when these uniforms are used, the `elevation` parameter
   * passed to `projectTileFor3D` in the shader is elevation in meters above "sea level",
   * or more accurately for globe, elevation above the surface of the perfect sphere used to render the planet.
   */
  defaultProjectionData: ProjectionData;
};
/**
 * @param gl - The map's gl context.
 * @param options - Argument object with render inputs like camera properties.
 */
type CustomRenderMethod = (gl: WebGLRenderingContext | WebGL2RenderingContext, options: CustomRenderMethodInput) => void;
/**
 * Interface for custom style layers. This is a specification for
 * implementers to model: it is not an exported method or class.
 *
 * Custom layers allow a user to render directly into the map's GL context using the map's camera.
 * These layers can be added between any regular layers using {@link Map.addLayer}.
 *
 * Custom layers must have a unique `id` and must have the `type` of `"custom"`.
 * They must implement `render` and may implement `prerender`, `onAdd` and `onRemove`.
 * They can trigger rendering using {@link Map.triggerRepaint}
 * and they should appropriately handle {@link MapContextEvent} with `webglcontextlost` and `webglcontextrestored`.
 *
 * The `renderingMode` property controls whether the layer is treated as a `"2d"` or `"3d"` map layer. Use:
 *
 * - `"renderingMode": "3d"` to use the depth buffer and share it with other layers
 * - `"renderingMode": "2d"` to add a layer with no depth. If you need to use the depth buffer for a `"2d"` layer you must use an offscreen
 *   framebuffer and {@link CustomLayerInterface.prerender}
 *
 * @example
 * Custom layer implemented as ES6 class
 * ```ts
 * class NullIslandLayer {
 *     constructor() {
 *         this.id = 'null-island';
 *         this.type = 'custom';
 *         this.renderingMode = '2d';
 *     }
 *
 *      onAdd(map: maplibregl.Map, gl: WebGLRenderingContext | WebGL2RenderingContext) {
 *         const vertexSource = `
 *         uniform mat4 u_matrix;
 *         void main() {
 *             gl_Position = u_matrix * vec4(0.5, 0.5, 0.0, 1.0);
 *             gl_PointSize = 20.0;
 *         }`;
 *
 *         const fragmentSource = `
 *         void main() {
 *             fragColor = vec4(1.0, 0.0, 0.0, 1.0);
 *         }`;
 *
 *         const vertexShader = gl.createShader(gl.VERTEX_SHADER);
 *         gl.shaderSource(vertexShader, vertexSource);
 *         gl.compileShader(vertexShader);
 *         const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
 *         gl.shaderSource(fragmentShader, fragmentSource);
 *         gl.compileShader(fragmentShader);
 *
 *         this.program = gl.createProgram();
 *         gl.attachShader(this.program, vertexShader);
 *         gl.attachShader(this.program, fragmentShader);
 *         gl.linkProgram(this.program);
 *     }
 *
 *     render({
 *      gl,
 *      modelViewProjectionMatrix: matrix
 *      }: {
 *      gl: WebGLRenderingContext | WebGL2RenderingContext;
 *      modelViewProjectionMatrix: Float32Array;
 *      }) {
 *         gl.useProgram(this.program);
 *         gl.uniformMatrix4fv(gl.getUniformLocation(this.program, "u_matrix"), false, matrix);
 *         gl.drawArrays(gl.POINTS, 0, 1);
 *     }
 * }
 *
 * map.on('load', () => {
 *     map.addLayer(new NullIslandLayer());
 * });
 * ```
 */
interface CustomLayerInterface {
  /**
   * A unique layer id.
   */
  id: string;
  /**
   * The layer's type. Must be `"custom"`.
   */
  type: "custom";
  /**
   * Either `"2d"` or `"3d"`. Defaults to `"2d"`.
   */
  renderingMode?: "2d" | "3d";
  /**
   * Called during a render frame allowing the layer to draw into the GL context.
   *
   * The layer can assume blending and depth state is set to allow the layer to properly
   * blend and clip other layers. The layer cannot make any other assumptions about the
   * current GL state.
   *
   * If the layer needs to render to a texture, it should implement the `prerender` method
   * to do this and only use the `render` method for drawing directly into the main framebuffer.
   *
   * The blend function is set to `gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)`. This expects
   * colors to be provided in premultiplied alpha form where the `r`, `g` and `b` values are already
   * multiplied by the `a` value. If you are unable to provide colors in premultiplied form you
   * may want to change the blend function to
   * `gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA)`.
   */
  render: CustomRenderMethod;
  /**
   * Optional method called during a render frame to allow a layer to prepare resources or render into a texture.
   *
   * The layer cannot make any assumptions about the current GL state and must bind a framebuffer before rendering.
   */
  prerender?: CustomRenderMethod;
  /**
   * Optional method called when the layer has been added to the Map with {@link Map.addLayer}. This
   * gives the layer a chance to initialize gl resources and register event listeners.
   *
   * @param map - The Map this custom layer was just added to.
   * @param gl - The gl context for the map.
   */
  onAdd?(map: Map$1, gl: WebGLRenderingContext | WebGL2RenderingContext): void;
  /**
   * Optional method called when the layer has been removed from the Map with {@link Map.removeLayer}. This
   * gives the layer a chance to clean up gl resources and event listeners.
   *
   * @param map - The Map this custom layer was just added to.
   * @param gl - The gl context for the map.
   */
  onRemove?(map: Map$1, gl: WebGLRenderingContext | WebGL2RenderingContext): void;
}
type ValidationError = {
  message: string;
  line: number;
  identifier?: string;
};
type Validator = (a: any) => ReadonlyArray<ValidationError>;
type ProjectionGPUContext = {
  context: Context;
  useProgram: (name: string) => Program<any>;
};
type TileMeshUsage = "stencil" | "raster";
interface Projection {
  /**
   * @internal
   * A short, descriptive name of this projection, such as 'mercator' or 'globe'.
   */
  get name(): ProjectionSpecification["type"];
  /**
   * @internal
   * True if this projection needs to render subdivided geometry.
   * Optimized rendering paths for non-subdivided geometry might be used throughout MapLibre.
   * The value of this property may change during runtime, for example in globe projection depending on zoom.
   */
  get useSubdivision(): boolean;
  /**
   * Name of the shader projection variant that should be used for this projection.
   * Note that this value may change dynamically, for example when globe projection internally transitions to mercator.
   * Then globe projection might start reporting the mercator shader variant name to make MapLibre use faster mercator shaders.
   */
  get shaderVariantName(): string;
  /**
   * A `#define` macro that is injected into every MapLibre shader that uses this projection.
   * @example
   * `const define = projection.shaderDefine; // '#define GLOBE'`
   */
  get shaderDefine(): string;
  /**
   * @internal
   * A preprocessed prelude code for both vertex and fragment shaders.
   */
  get shaderPreludeCode(): PreparedShader;
  /**
   * Vertex shader code that is injected into every MapLibre vertex shader that uses this projection.
   */
  get vertexShaderPreludeCode(): string;
  /**
   * @internal
   * An object describing how much subdivision should be applied to rendered geometry.
   * The subdivision settings should be a constant for a given projection.
   * Projections that do not require subdivision should return {@link SubdivisionGranularitySetting.noSubdivision}.
   */
  get subdivisionGranularity(): SubdivisionGranularitySetting;
  /**
   * @internal
   * A number representing the current transition state of the projection.
   * The return value should be a number between 0 and 1,
   * where 0 means the projection is fully in the initial state,
   * and 1 means the projection is fully in the final state.
   */
  get transitionState(): number;
  /**
   * @internal
   * Gets the error correction latitude in radians.
   */
  get latitudeErrorCorrectionRadians(): number;
  /**
   * @internal
   * Cleans up any resources the projection created, especially GPU buffers.
   */
  destroy(): void;
  /**
   * @internal
   * Runs any GPU-side tasks this projection required. Called at the beginning of every frame.
   */
  updateGPUdependent(renderContext: ProjectionGPUContext): void;
  /**
   * @internal
   * Returns a subdivided mesh for a given tile ID, covering 0..EXTENT range.
   * @param context - WebGL context.
   * @param tileID - The tile coordinates for which to return a mesh. Meshes for tiles that border the top/bottom mercator edge might include extra geometry for the north/south pole.
   * @param hasBorder - When true, the mesh will also include a small border beyond the 0..EXTENT range.
   * @param allowPoles - When true, the mesh will also include geometry to cover the north (south) pole, if the given tileID borders the mercator range's top (bottom) edge.
   * @param usage - Specify the usage of the tile mesh, as different usages might use different levels of subdivision.
   */
  getMeshFromTileID(context: Context, tileID: CanonicalTileID, hasBorder: boolean, allowPoles: boolean, usage: TileMeshUsage): Mesh;
  /**
   * @internal
   * Recalculates the projection state based on the current evaluation parameters.
   * @param params - Evaluation parameters.
   */
  recalculate(params: EvaluationParameters): void;
  /**
   * @internal
   * Returns true if the projection is currently transitioning between two states.
   */
  hasTransition(): boolean;
  /**
   * @internal
   * Sets the error query latidude in degrees
   */
  setErrorQueryLatitudeDegrees(value: number): any;
}
/**
 * A feature identifier that is bound to a source
 */
type FeatureIdentifier = {
  /**
   * Unique id of the feature.
   */
  id?: string | number | undefined;
  /**
   * The id of the vector or GeoJSON source for the feature.
   */
  source: string;
  /**
   * *For vector tile sources, `sourceLayer` is required.*
   */
  sourceLayer?: string | undefined;
};
/**
 * The options object related to the {@link Map}'s style related methods
 */
type StyleOptions = {
  /**
   * If false, style validation will be skipped. Useful in production environment.
   */
  validate?: boolean;
  /**
   * Defines a CSS
   * font-family for locally overriding generation of Chinese, Japanese, and Korean characters.
   * For these characters, font settings from the map's style will be ignored, except for font-weight keywords (light/regular/medium/bold).
   * Set to `false`, to enable font settings from the map's style for these glyph ranges.
   * Forces a full update.
   */
  localIdeographFontFamily?: string | false;
};
/**
 * Supporting type to add validation to another style related type
 */
type StyleSetterOptions = {
  /**
   * Whether to check if the filter conforms to the MapLibre Style Specification. Disabling validation is a performance optimization that should only be used if you have previously validated the values you will be passing to this function.
   */
  validate?: boolean;
};
/**
 * Part of {@link Map.setStyle} options, transformStyle is a convenience function that allows to modify a style after it is fetched but before it is committed to the map state.
 *
 * This function exposes previous and next styles, it can be commonly used to support a range of functionalities like:
 *
 * - when previous style carries certain 'state' that needs to be carried over to a new style gracefully;
 * - when a desired style is a certain combination of previous and incoming style;
 * - when an incoming style requires modification based on external state.
 * - when an incoming style uses relative paths, which need to be converted to absolute.
 *
 * @param previous - The current style.
 * @param next - The next style.
 * @returns resulting style that will to be applied to the map
 *
 * @example
 * ```ts
 * map.setStyle('https://demotiles.maplibre.org/style.json', {
 *   transformStyle: (previousStyle, nextStyle) => ({
 *       ...nextStyle,
 *       // make relative sprite path like "../sprite" absolute
 *       sprite: new URL(nextStyle.sprite, "https://demotiles.maplibre.org/styles/osm-bright-gl-style/sprites/").href,
 *       // make relative glyphs path like "../fonts/{fontstack}/{range}.pbf" absolute
 *       glyphs: new URL(nextStyle.glyphs, "https://demotiles.maplibre.org/font/").href,
 *       sources: {
 *           // make relative vector url like "../../" absolute
 *           ...nextStyle.sources.map(source => {
 *              if (source.url) {
 *                  source.url = new URL(source.url, "https://tiles.openfreemap.org/planet");
 *              }
 *              return source;
 *           }),
 *           // copy a source from previous style
 *           'osm': previousStyle.sources.osm
 *       },
 *       layers: [
 *           // background layer
 *           nextStyle.layers[0],
 *           // copy a layer from previous style
 *           previousStyle.layers[0],
 *           // other layers from the next style
 *           ...nextStyle.layers.slice(1).map(layer => {
 *               // hide the layers we don't need from demotiles style
 *               if (layer.id.startsWith('geolines')) {
 *                   layer.layout = {...layer.layout || {}, visibility: 'none'};
 *               // filter out US polygons
 *               } else if (layer.id.startsWith('coastline') || layer.id.startsWith('countries')) {
 *                   layer.filter = ['!=', ['get', 'ADM0_A3'], 'USA'];
 *               }
 *               return layer;
 *           })
 *       ]
 *   })
 * });
 * ```
 */
type TransformStyleFunction = (previous: StyleSpecification | undefined, next: StyleSpecification) => StyleSpecification;
/**
 * The options object related to the {@link Map}'s style related methods
 */
type StyleSwapOptions = {
  /**
   * If false, force a 'full' update, removing the current style
   * and building the given one instead of attempting a diff-based update.
   */
  diff?: boolean;
  /**
   * TransformStyleFunction is a convenience function
   * that allows to modify a style after it is fetched but before it is committed to the map state. Refer to {@link TransformStyleFunction}.
   */
  transformStyle?: TransformStyleFunction;
};
/**
 * Specifies a layer to be added to a {@link Style}. In addition to a standard {@link LayerSpecification}
 * or a {@link CustomLayerInterface}, a {@link LayerSpecification} with an embedded {@link SourceSpecification} can also be provided.
 */
type AddLayerObject = LayerSpecification | (Omit<LayerSpecification, "source"> & {
  source: SourceSpecification;
}) | CustomLayerInterface;
/**
 * The Style base class
 */
declare class Style extends Evented {
  map: Map$1;
  stylesheet: StyleSpecification;
  dispatcher: Dispatcher;
  imageManager: ImageManager;
  glyphManager: GlyphManager;
  lineAtlas: LineAtlas;
  light: Light;
  projection: Projection | undefined;
  sky: Sky;
  _frameRequest: AbortController;
  _loadStyleRequest: AbortController;
  _spriteRequest: AbortController;
  _layers: {
    [_: string]: StyleLayer;
  };
  _serializedLayers: {
    [_: string]: LayerSpecification;
  };
  _order: Array<string>;
  tileManagers: {
    [_: string]: TileManager;
  };
  zoomHistory: ZoomHistory;
  _loaded: boolean;
  _changed: boolean;
  _updatedSources: {
    [_: string]: "clear" | "reload";
  };
  _updatedLayers: {
    [_: string]: true;
  };
  _removedLayers: {
    [_: string]: StyleLayer;
  };
  _changedImages: {
    [_: string]: true;
  };
  _glyphsDidChange: boolean;
  _updatedPaintProps: {
    [layer: string]: true;
  };
  _layerOrderChanged: boolean;
  _spritesImagesIds: {
    [spriteId: string]: string[];
  };
  _availableImages: Array<string>;
  _globalState: Record<string, any>;
  crossTileSymbolIndex: CrossTileSymbolIndex;
  pauseablePlacement: PauseablePlacement;
  placement: Placement;
  z: number;
  constructor(map: Map$1, options?: StyleOptions);
  private _setInitialValues;
  _rtlPluginLoaded: () => void;
  setGlobalStateProperty(name: string, value: any): this;
  getGlobalState(): Record<string, any>;
  setGlobalState(newStylesheetState: StateSpecification): void;
  /**
   * @internal
   * Find all sources that are affected by the global state changes and reload them.
   * Find all paint properties that are affected by the global state changes and update them.
   * For example, if a layer filter uses global-state expression, this function will find the source id of that layer.
   */
  _applyGlobalStateChanges(globalStateRefs: string[]): void;
  loadURL(url: string, options?: StyleSwapOptions & StyleSetterOptions, previousStyle?: StyleSpecification): Promise<void>;
  loadJSON(json: StyleSpecification, options?: StyleSetterOptions & StyleSwapOptions, previousStyle?: StyleSpecification): void;
  loadEmpty(): void;
  _load(json: StyleSpecification, options: StyleSwapOptions & StyleSetterOptions, previousStyle?: StyleSpecification): void;
  private _createLayers;
  _loadSprite(sprite: SpriteSpecification, isUpdate?: boolean, completion?: (err: Error) => void): void;
  _unloadSprite(): void;
  _validateLayer(layer: StyleLayer): void;
  loaded(): boolean;
  /**
   * @hidden
   * take an array of string IDs, and based on this._layers, generate an array of LayerSpecification
   * @param ids - an array of string IDs, for which serialized layers will be generated. If omitted, all serialized layers will be returned
   * @param returnClose - if true, return a clone of the layer object
   * @returns generated result
   */
  private _serializeByIds;
  /**
   * @hidden
   * Lazy initialization of this._serializedLayers dictionary and return it
   * @returns this._serializedLayers dictionary
   */
  private _serializedAllLayers;
  hasTransitions(): boolean;
  _checkLoaded(): void;
  /**
   * @internal
   * Apply queued style updates in a batch and recalculate zoom-dependent paint properties.
   */
  update(parameters: EvaluationParameters): void;
  _updateTilesForChangedImages(): void;
  _updateTilesForChangedGlyphs(): void;
  _updateWorkerLayers(updatedIds: Array<string>, removedIds: Array<string>): void;
  _resetUpdates(): void;
  /**
   * Update this style's state to match the given style JSON, performing only
   * the necessary mutations.
   *
   * May throw an Error ('Unimplemented: METHOD') if the mapbox-gl-style-spec
   * diff algorithm produces an operation that is not supported.
   *
   * @returns true if any changes were made; false otherwise
   */
  setState(nextState: StyleSpecification, options?: StyleSwapOptions & StyleSetterOptions): boolean;
  _getOperationsToPerform(diff: DiffCommand<DiffOperations>[]): {
    operations: Function[];
    unimplemented: string[];
  };
  addImage(id: string, image: StyleImage): this;
  updateImage(id: string, image: StyleImage): void;
  getImage(id: string): StyleImage;
  removeImage(id: string): this;
  _afterImageUpdated(id: string): void;
  listImages(): string[];
  addSource(id: string, source: SourceSpecification | CanvasSourceSpecification, options?: StyleSetterOptions): void;
  /**
   * Remove a source from this stylesheet, given its id.
   * @param id - id of the source to remove
   * @throws if no source is found with the given ID
   */
  removeSource(id: string): this;
  /**
   * Set the data of a GeoJSON source, given its id.
   * @param id - id of the source
   * @param data - GeoJSON source
   */
  setGeoJSONSourceData(id: string, data: GeoJSON.GeoJSON | string): void;
  /**
   * Get a source by ID.
   * @param id - ID of the desired source
   * @returns source
   */
  getSource(id: string): Source | undefined;
  /**
   * Add a layer to the map style. The layer will be inserted before the layer with
   * ID `before`, or appended if `before` is omitted.
   * @param layerObject - The style layer to add.
   * @param before - ID of an existing layer to insert before
   * @param options - Style setter options.
   */
  addLayer(layerObject: AddLayerObject, before?: string, options?: StyleSetterOptions): this;
  /**
   * Moves a layer to a different z-position. The layer will be inserted before the layer with
   * ID `before`, or appended if `before` is omitted.
   * @param id - ID of the layer to move
   * @param before - ID of an existing layer to insert before
   */
  moveLayer(id: string, before?: string): void;
  /**
   * Remove the layer with the given id from the style.
   * A {@link ErrorEvent} event will be fired if no such layer exists.
   *
   * @param id - id of the layer to remove
   */
  removeLayer(id: string): void;
  /**
   * Return the style layer object with the given `id`.
   *
   * @param id - id of the desired layer
   * @returns a layer, if one with the given `id` exists
   */
  getLayer(id: string): StyleLayer | undefined;
  /**
   * Return the ids of all layers currently in the style, including custom layers, in order.
   *
   * @returns ids of layers, in order
   */
  getLayersOrder(): string[];
  /**
   * Checks if a specific layer is present within the style.
   *
   * @param id - the id of the desired layer
   * @returns a boolean specifying if the given layer is present
   */
  hasLayer(id: string): boolean;
  setLayerZoomRange(layerId: string, minzoom?: number | null, maxzoom?: number | null): void;
  setFilter(layerId: string, filter?: FilterSpecification | null, options?: StyleSetterOptions): void;
  /**
   * Get a layer's filter object
   * @param layer - the layer to inspect
   * @returns the layer's filter, if any
   */
  getFilter(layer: string): FilterSpecification | void;
  setLayoutProperty(layerId: string, name: string, value: any, options?: StyleSetterOptions): void;
  /**
   * Get a layout property's value from a given layer
   * @param layerId - the layer to inspect
   * @param name - the name of the layout property
   * @returns the property value
   */
  getLayoutProperty(layerId: string, name: string): any;
  setPaintProperty(layerId: string, name: string, value: any, options?: StyleSetterOptions): void;
  _updatePaintProperty(layer: StyleLayer, name: string, value: any, options?: StyleSetterOptions): void;
  getPaintProperty(layer: string, name: string): unknown;
  setFeatureState(target: FeatureIdentifier, state: any): void;
  removeFeatureState(target: FeatureIdentifier, key?: string): void;
  getFeatureState(target: FeatureIdentifier): FeatureState;
  getTransition(): {
    duration: number;
    delay: number;
  } & TransitionSpecification;
  serialize(): StyleSpecification | undefined;
  _updateLayer(layer: StyleLayer): void;
  _flattenAndSortRenderedFeatures(sourceResults: QueryRenderedFeaturesResults[]): MapGeoJSONFeature[];
  queryRenderedFeatures(queryGeometry: Point[], params: QueryRenderedFeaturesOptions, transform: IReadonlyTransform): MapGeoJSONFeature[];
  querySourceFeatures(sourceID: string, params?: QuerySourceFeatureOptions): GeoJSONFeature[];
  getLight(): LightSpecification;
  setLight(lightOptions: LightSpecification, options?: StyleSetterOptions): void;
  getProjection(): ProjectionSpecification;
  setProjection(projection?: ProjectionSpecification): void;
  getSky(): SkySpecification;
  setSky(skyOptions?: SkySpecification, options?: StyleSetterOptions): void;
  _setProjectionInternal(name: ProjectionSpecification["type"]): void;
  _validate(validate: Validator, key: string, value: any, props: any, options?: {
    validate?: boolean;
  }): boolean;
  _remove(mapRemoved?: boolean): void;
  _clearSource(id: string): void;
  _reloadSource(id: string): void;
  _updateSources(transform: ITransform): void;
  _generateCollisionBoxes(): void;
  _updatePlacement(transform: ITransform, showCollisionBoxes: boolean, fadeDuration: number, crossSourceCollisions: boolean, forceFullPlacement?: boolean): boolean;
  _releaseSymbolFadeTiles(): void;
  getImages(mapId: string | number, params: GetImagesParameters): Promise<GetImagesResponse>;
  getGlyphs(mapId: string | number, params: GetGlyphsParameters): Promise<GetGlyphsResponse>;
  getGlyphsUrl(): string | null;
  setGlyphs(glyphsUrl: string | null | undefined, options?: StyleSetterOptions): void;
  getDashes(mapId: string | number, params: GetDashesParameters): Promise<GetDashesResponse>;
  /**
   * Add a sprite.
   *
   * @param id - The id of the desired sprite
   * @param url - The url to load the desired sprite from
   * @param options - The style setter options
   * @param completion - The completion handler
   */
  addSprite(id: string, url: string, options?: StyleSetterOptions, completion?: (err: Error) => void): void;
  /**
   * Remove a sprite by its id. When the last sprite is removed, the whole `this.stylesheet.sprite` object becomes
   * `undefined`. This falsy `undefined` value later prevents attempts to load the sprite when it's absent.
   *
   * @param id - the id of the sprite to remove
   */
  removeSprite(id: string): void;
  /**
   * Get the current sprite value.
   *
   * @returns empty array when no sprite is set; id-url pairs otherwise
   */
  getSprite(): {
    id: string;
    url: string;
  }[];
  /**
   * Set a new value for the style's sprite.
   *
   * @param sprite - new sprite value
   * @param options - style setter options
   * @param completion - the completion handler
   */
  setSprite(sprite: SpriteSpecification, options?: StyleSetterOptions, completion?: (err: Error) => void): void;
  /**
   * Destroys all internal resources of the style (sources, images, layers, etc.)
   */
  destroy(): void;
}
type BucketParameters<Layer extends TypedStyleLayer> = {
  index: number;
  layers: Array<Layer>;
  zoom: number;
  pixelRatio: number;
  overscaling: number;
  collisionBoxArray: CollisionBoxArray;
  sourceLayerIndex: number;
  sourceID: string;
};
type PopulateParameters = {
  featureIndex: FeatureIndex;
  iconDependencies: {};
  patternDependencies: {};
  glyphDependencies: {};
  dashDependencies: Record<string, {
    round: boolean;
    dasharray: Array<number>;
  }>;
  availableImages: Array<string>;
  subdivisionGranularity: SubdivisionGranularitySetting;
};
type IndexedFeature = {
  feature: VectorTileFeatureLike;
  id: number | string;
  index: number;
  sourceLayerIndex: number;
};
type BucketFeature = {
  index: number;
  sourceLayerIndex: number;
  geometry: Array<Array<Point>>;
  properties: any;
  type: 0 | 1 | 2 | 3;
  id?: any;
  readonly patterns: {
    [_: string]: {
      "min": string;
      "mid": string;
      "max": string;
    };
  };
  readonly dashes?: NonNullable<Feature["dashes"]>;
  sortKey?: number;
};
/**
 * @hidden
 * The `Bucket` interface is the single point of knowledge about turning vector
 * tiles into WebGL buffers.
 *
 * `Bucket` is an abstract interface. An implementation exists for each style layer type.
 * Create a bucket via the `StyleLayer.createBucket` method.
 *
 * The concrete bucket types, using layout options from the style layer,
 * transform feature geometries into vertex and index data for use by the
 * vertex shader.  They also (via `ProgramConfiguration`) use feature
 * properties and the zoom level to populate the attributes needed for
 * data-driven styling.
 *
 * Buckets are designed to be built on a worker thread and then serialized and
 * transferred back to the main thread for rendering.  On the worker side, a
 * bucket's vertex, index, and attribute data is stored in `bucket.arrays: ArrayGroup`.
 * When a bucket's data is serialized and sent back to the main thread,
 * is gets deserialized (using `new Bucket(serializedBucketData)`, with
 * the array data now stored in `bucket.buffers: BufferGroup`. BufferGroups
 * hold the same data as ArrayGroups, but are tuned for consumption by WebGL.
 */
interface Bucket {
  layerIds: Array<string>;
  hasDependencies: boolean;
  readonly layers: Array<any>;
  readonly stateDependentLayers: Array<any>;
  readonly stateDependentLayerIds: Array<string>;
  populate(features: Array<IndexedFeature>, options: PopulateParameters, canonical: CanonicalTileID): void;
  update(states: FeatureStates, vtLayer: VectorTileLayerLike, imagePositions: {
    [_: string]: ImagePosition;
  }, dashPositions: Record<string, DashEntry>): void;
  isEmpty(): boolean;
  upload(context: Context): void;
  uploadPending(): boolean;
  /**
   * Release the WebGL resources associated with the buffers. Note that because
   * buckets are shared between layers having the same layout properties, they
   * must be destroyed in groups (all buckets for a tile, or all symbol buckets).
   */
  destroy(): void;
}
type QueryIntersectsFeatureParams = {
  /**
   * The geometry to check intersection with.
   * This geometry is in tile coordinates.
   */
  queryGeometry: Array<Point>;
  /**
   * The feature to allow expression evaluation.
   */
  feature: VectorTileFeatureLike;
  /**
   * The feature state to allow expression evaluation.
   */
  featureState: FeatureState;
  /**
   * The geometry of the feature.
   * This geometry is in tile coordinates.
   */
  geometry: Array<Array<Point>>;
  /**
   * The current zoom level.
   */
  zoom: number;
  /**
   * The transform to convert from tile coordinates to pixels.
   */
  transform: IReadonlyTransform;
  /**
   * The number of pixels per tile unit.
   */
  pixelsToTileUnits: number;
  /**
   * The matrix to convert from tile coordinates to pixel coordinates.
   * The pixel coordinates are relative to the center of the screen.
   */
  pixelPosMatrix: mat4;
  /**
   * The unwrapped tile ID for the tile being queried.
   */
  unwrappedTileID: UnwrappedTileID;
  /**
   * A function to get the elevation of a point in tile coordinates.
   */
  getElevation: undefined | ((x: number, y: number) => number);
};
/**
 * A base class for style layers
 */
declare abstract class StyleLayer extends Evented {
  id: string;
  metadata: unknown;
  type: LayerSpecification["type"] | CustomLayerInterface["type"];
  source: string;
  sourceLayer: string;
  minzoom: number;
  maxzoom: number;
  filter: FilterSpecification | void;
  visibility: VisibilitySpecification;
  private _evaluatedVisibility;
  _crossfadeParameters: CrossfadeParameters;
  _unevaluatedLayout: Layout<any>;
  readonly layout: unknown;
  _transitionablePaint: Transitionable<any>;
  _transitioningPaint: Transitioning<any>;
  readonly paint: unknown;
  _featureFilter: FeatureFilter;
  _visibilityExpression: VisibilityExpression;
  readonly onAdd: ((map: Map$1) => void);
  readonly onRemove: ((map: Map$1) => void);
  queryRadius?(bucket: Bucket): number;
  queryIntersectsFeature?(params: QueryIntersectsFeatureParams): boolean | number;
  createBucket?(parameters: BucketParameters<any>): Bucket;
  private _globalState;
  constructor(layer: LayerSpecification | CustomLayerInterface, properties: Readonly<{
    layout?: Properties<any>;
    paint?: Properties<any>;
  }>, globalState: Record<string, any>);
  setFilter(filter: FilterSpecification | void): void;
  getCrossfadeParameters(): CrossfadeParameters;
  getLayoutProperty(name: string): any;
  /**
   * Get list of global state references that are used within layout or filter properties.
   * This is used to determine if layer source need to be reloaded when global state property changes.
   *
   */
  getLayoutAffectingGlobalStateRefs(): Set<string>;
  /**
   * Get list of global state references that are used within paint properties.
   * This is used to determine if layer needs to be repainted when global state property changes.
   *
   */
  getPaintAffectingGlobalStateRefs(): globalThis.Map<string, Array<{
    name: string;
    value: any;
  }>>;
  /**
   * Get list of global state references that are used within visibility expression.
   * This is used to determine if layer visibility needs to be updated when global state property changes.
   */
  getVisibilityAffectingGlobalStateRefs(): Set<string>;
  setLayoutProperty(name: string, value: any, options?: StyleSetterOptions): void;
  getPaintProperty(name: string): unknown;
  setPaintProperty(name: string, value: unknown, options?: StyleSetterOptions): boolean;
  _handleSpecialPaintPropertyUpdate(_: string): void;
  _handleOverridablePaintPropertyUpdate<T, R>(name: string, oldValue: PropertyValue<T, R>, newValue: PropertyValue<T, R>): boolean;
  isHidden(zoom?: number, roundMinZoom?: boolean): boolean;
  updateTransitions(parameters: TransitionParameters): void;
  hasTransition(): boolean;
  recalculateVisibility(): void;
  recalculate(parameters: EvaluationParameters, availableImages: Array<string>): void;
  serialize(): LayerSpecification;
  _validate(validate: Function, key: string, name: string, value: unknown, options?: StyleSetterOptions): boolean;
  is3D(): boolean;
  isTileClipped(): boolean;
  hasOffscreenPass(): boolean;
  resize(): void;
  isStateDependent(): boolean;
}
type GeoJSONWorkerOptions = {
  source?: string;
  geojsonVtOptions?: GeoJSONVTOptions;
  clusterProperties?: Record<string, [unknown, unknown]>;
  filter?: FilterSpecification;
  collectResourceTiming?: boolean;
};
type LoadGeoJSONParameters = GeoJSONWorkerOptions & {
  type: "geojson";
  /**
   * Request parameters including a URL to fetch GeoJSON data.
   */
  request?: RequestParameters;
  /**
   * GeoJSON data to set as the source's data.
   */
  data?: GeoJSON.GeoJSON;
  /**
   * GeoJSONSourceDiff to apply to the existing GeoJSON source data.
   */
  dataDiff?: GeoJSONSourceDiff;
  /**
   * Update the supercluster using the latest worker cluster options.
   */
  updateCluster?: boolean;
};
type RTLPluginStatus = "unavailable" | "deferred" | "requested" | "loading" | "loaded" | "error";
type PluginState = {
  pluginStatus: RTLPluginStatus;
  pluginURL: string;
};
type ClusterIDAndSource = {
  type: "geojson";
  clusterId: number;
  source: string;
};
type GetClusterLeavesParams = ClusterIDAndSource & {
  limit: number;
  offset: number;
};
type GeoJSONWorkerSourceLoadDataResult = {
  resourceTiming?: {
    [_: string]: Array<PerformanceResourceTiming>;
  };
  abandoned?: boolean;
  data?: GeoJSON.GeoJSON;
};
type RemoveSourceParams = {
  source: string;
  type: string;
};
type UpdateLayersParameters = {
  layers: Array<LayerSpecification>;
  removedIds: Array<string>;
};
type GetImagesParameters = {
  icons: Array<string>;
  source: string;
  tileID: OverscaledTileID;
  type: string;
};
type GetGlyphsParameters = {
  type: string;
  stacks: {
    [_: string]: Array<number>;
  };
  source: string;
  tileID: OverscaledTileID;
};
type GetGlyphsResponse = {
  [stack: string]: {
    [id: number]: StyleGlyph;
  };
};
type GetImagesResponse = {
  [_: string]: StyleImage;
};
type GetDashesParameters = {
  dashes: {
    [key: string]: {
      dasharray: Array<number>;
      round: boolean;
    };
  };
};
type GetDashesResponse = {
  [dashId: string]: DashEntry;
};
/**
 * All the possible message types that can be sent to and from the worker
 */
declare const enum MessageType {
  loadDEMTile = "LDT",
  getClusterExpansionZoom = "GCEZ",
  getClusterChildren = "GCC",
  getClusterLeaves = "GCL",
  loadData = "LD",
  loadTile = "LT",
  reloadTile = "RT",
  getGlyphs = "GG",
  getDashes = "GDA",
  getImages = "GI",
  setImages = "SI",
  updateGlobalState = "UGS",
  setLayers = "SL",
  updateLayers = "UL",
  syncRTLPluginState = "SRPS",
  setReferrer = "SR",
  removeSource = "RS",
  removeMap = "RM",
  importScript = "IS",
  removeTile = "RMT",
  abortTile = "AT",
  removeDEMTile = "RDT",
  getResource = "GR"
}
/**
 * This is basically a mapping between all the calls that are made to and from the workers.
 * The key is the event name, the first parameter is the event input type, and the last parameter is the output type.
 */
type RequestResponseMessageMap = {
  [MessageType.loadDEMTile]: [WorkerDEMTileParameters, DEMData];
  [MessageType.getClusterExpansionZoom]: [ClusterIDAndSource, number];
  [MessageType.getClusterChildren]: [ClusterIDAndSource, Array<GeoJSON.Feature>];
  [MessageType.getClusterLeaves]: [GetClusterLeavesParams, Array<GeoJSON.Feature>];
  [MessageType.loadData]: [LoadGeoJSONParameters, GeoJSONWorkerSourceLoadDataResult];
  [MessageType.loadTile]: [WorkerTileParameters, WorkerTileResult];
  [MessageType.reloadTile]: [WorkerTileParameters, WorkerTileResult];
  [MessageType.getGlyphs]: [GetGlyphsParameters, GetGlyphsResponse];
  [MessageType.getImages]: [GetImagesParameters, GetImagesResponse];
  [MessageType.setImages]: [string[], void];
  [MessageType.updateGlobalState]: [Record<string, any>, void];
  [MessageType.setLayers]: [Array<LayerSpecification>, void];
  [MessageType.updateLayers]: [UpdateLayersParameters, void];
  [MessageType.syncRTLPluginState]: [PluginState, PluginState];
  [MessageType.setReferrer]: [string, void];
  [MessageType.removeSource]: [RemoveSourceParams, void];
  [MessageType.removeMap]: [undefined, void];
  [MessageType.importScript]: [string, void];
  [MessageType.removeTile]: [TileParameters, void];
  [MessageType.abortTile]: [TileParameters, void];
  [MessageType.removeDEMTile]: [TileParameters, void];
  [MessageType.getResource]: [RequestParameters, GetResourceResponse<any>];
  [MessageType.getDashes]: [GetDashesParameters, GetDashesResponse];
};
/**
 * The message to be sent by the actor
 */
type ActorMessage<T extends MessageType> = {
  type: T;
  data: RequestResponseMessageMap[T][0];
  targetMapId?: string | number | null;
  mustQueue?: boolean;
  sourceMapId?: string | number | null;
};
interface ActorTarget {
  addEventListener: typeof window.addEventListener;
  removeEventListener: typeof window.removeEventListener;
  postMessage: typeof window.postMessage;
  terminate?: () => void;
}
type MessageData = {
  id: string;
  type: MessageType | "<cancel>" | "<response>";
  origin: string;
  data?: Serialized;
  targetMapId?: string | number | null;
  mustQueue?: boolean;
  error?: Serialized | null;
  sourceMapId: string | number | null;
};
type ResolveReject = {
  resolve: (value?: RequestResponseMessageMap[MessageType][1]) => void;
  reject: (reason?: Error) => void;
};
/**
 * This interface allowing to substitute only the sendAsync method of the Actor class.
 */
interface IActor {
  sendAsync<T extends MessageType>(message: ActorMessage<T>, abortController?: AbortController): Promise<RequestResponseMessageMap[T][1]>;
}
type MessageHandler<T extends MessageType> = (mapId: string | number, params: RequestResponseMessageMap[T][0], abortController?: AbortController) => Promise<RequestResponseMessageMap[T][1]>;
/**
 * An implementation of the [Actor design pattern](https://en.wikipedia.org/wiki/Actor_model)
 * that maintains the relationship between asynchronous tasks and the objects
 * that spin them off - in this case, tasks like parsing parts of styles,
 * owned by the styles
 */
declare class Actor implements IActor {
  target: ActorTarget;
  mapId: string | number | null;
  resolveRejects: {
    [x: string]: ResolveReject;
  };
  name: string;
  tasks: {
    [x: string]: MessageData;
  };
  taskQueue: Array<string>;
  abortControllers: {
    [x: number | string]: AbortController;
  };
  invoker: ThrottledInvoker;
  globalScope: ActorTarget;
  messageHandlers: { [x in MessageType]?: MessageHandler<MessageType> };
  subscription: Subscription;
  /**
   * @param target - The target
   * @param mapId - A unique identifier for the Map instance using this Actor.
   */
  constructor(target: ActorTarget, mapId?: string | number);
  registerMessageHandler<T extends MessageType>(type: T, handler: MessageHandler<T>): void;
  unregisterMessageHandler<T extends MessageType>(type: T): void;
  /**
   * Sends a message from a main-thread map to a Worker or from a Worker back to
   * a main-thread map instance.
   * @param message - the message to send
   * @param abortController - an optional AbortController to abort the request
   * @returns a promise that will be resolved with the response data
   */
  sendAsync<T extends MessageType>(message: ActorMessage<T>, abortController?: AbortController): Promise<RequestResponseMessageMap[T][1]>;
  receive(message: {
    data: MessageData;
  }): void;
  process(): void;
  processTask(id: string, task: MessageData): Promise<void>;
  completeTask(id: string, err: Error, data?: RequestResponseMessageMap[MessageType][1]): void;
  remove(): void;
}
/**
 * Allows to unsubscribe from events without the need to store the method reference.
 */
interface Subscription {
  /**
   * Unsubscribes from the event.
   */
  unsubscribe(): void;
}
/**
 * Makes optional keys required and add the the undefined type.
 *
 * ```
 * interface Test {
 *  foo: number;
 *  bar?: number;
 *  baz: number | undefined;
 * }
 *
 * Complete<Test> {
 *  foo: number;
 *  bar: number | undefined;
 *  baz: number | undefined;
 * }
 *
 * ```
 *
 * See https://medium.com/terria/typescript-transforming-optional-properties-to-required-properties-that-may-be-undefined-7482cb4e1585
 */
type Complete<T> = { [P in keyof Required<T>]: Pick<T, P> extends Required<Pick<T, P>> ? T[P] : (T[P] | undefined) };
/**
 * A helper to allow require of at least one property
 */
type RequireAtLeastOne<T> = { [K in keyof T]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<keyof T, K>>> }[keyof T];
/**
 * Adds the map's position to its page's location hash.
 * Passed as an option to the map object.
 *
 * @group Markers and Controls
 */
declare class Hash {
  _map: Map$1;
  _hashName: string;
  constructor(hashName?: string | null);
  /**
   * Map element to listen for coordinate changes
   *
   * @param map - The map object
   */
  addTo(map: Map$1): this;
  /**
   * Removes hash
   */
  remove(): this;
  getHashString(mapFeedback?: boolean): string;
  _getCurrentHash: () => any;
  _onHashChange: () => boolean;
  _updateHashUnthrottled: () => void;
  _removeHash: () => void;
  /**
   * Mobile Safari doesn't allow updating the hash more than 100 times per 30 seconds.
   */
  _updateHash: () => ReturnType<typeof setTimeout>;
  _isValidHash(hash: number[]): boolean;
}
interface DragMovementResult {
  bearingDelta?: number;
  pitchDelta?: number;
  rollDelta?: number;
  around?: Point;
  panDelta?: Point;
}
interface DragPanResult extends DragMovementResult {
  around: Point;
  panDelta: Point;
}
interface DragRotateResult extends DragMovementResult {
  bearingDelta: number;
}
interface DragPitchResult extends DragMovementResult {
  pitchDelta: number;
}
interface DragRollResult extends DragMovementResult {
  rollDelta: number;
}
interface DragMoveHandler<T extends DragMovementResult, E extends Event> extends Handler {
  dragStart: (e: E, point: Point) => void;
  dragMove: (e: E, point: Point) => T | void;
  dragEnd: (e: E) => void;
}
interface MousePanHandler extends DragMoveHandler<DragPanResult, MouseEvent> {}
interface MouseRotateHandler extends DragMoveHandler<DragRotateResult, MouseEvent> {}
interface MousePitchHandler extends DragMoveHandler<DragPitchResult, MouseEvent> {}
interface MouseRollHandler extends DragMoveHandler<DragRollResult, MouseEvent> {}
declare class TouchPanHandler implements Handler {
  _enabled: boolean;
  _active: boolean;
  _touches: { [k in string | number]: Point };
  _clickTolerance: number;
  _sum: Point;
  _map: Map$1;
  constructor(options: {
    clickTolerance: number;
  }, map: Map$1);
  reset(): void;
  _shouldBePrevented(touchesCount: number): boolean;
  touchstart(e: TouchEvent, points: Array<Point>, mapTouches: Array<Touch>): {
    around: Point;
    panDelta: Point;
  };
  touchmove(e: TouchEvent, points: Array<Point>, mapTouches: Array<Touch>): {
    around: Point;
    panDelta: Point;
  };
  touchend(e: TouchEvent, points: Array<Point>, mapTouches: Array<Touch>): void;
  touchcancel(): void;
  _calculateTransform(e: TouchEvent, points: Array<Point>, mapTouches: Array<Touch>): {
    around: Point;
    panDelta: Point;
  };
  enable(): void;
  disable(): void;
  isEnabled(): boolean;
  isActive(): boolean;
}
/**
 * A {@link DragPanHandler} options object
 */
type DragPanOptions = {
  /**
   * factor used to scale the drag velocity
   * @defaultValue 0
   */
  linearity?: number;
  /**
   * easing function applied to `map.panTo` when applying the drag.
   * @param t - the easing function
   * @defaultValue bezier(0, 0, 0.3, 1)
   */
  easing?: (t: number) => number;
  /**
   * the maximum value of the drag velocity.
   * @defaultValue 1400
   */
  deceleration?: number;
  /**
   * the rate at which the speed reduces after the pan ends.
   * @defaultValue 2500
   */
  maxSpeed?: number;
};
/**
 * The `DragPanHandler` allows the user to pan the map by clicking and dragging
 * the cursor.
 *
 * @group Handlers
 */
declare class DragPanHandler {
  _el: HTMLElement;
  _mousePan: MousePanHandler;
  _touchPan: TouchPanHandler;
  _inertiaOptions: DragPanOptions | boolean;
  /** @internal */
  constructor(el: HTMLElement, mousePan: MousePanHandler, touchPan: TouchPanHandler);
  /**
   * Enables the "drag to pan" interaction.
   *
   * @param options - Options object
   * @example
   * ```ts
   *   map.dragPan.enable();
   *   map.dragPan.enable({
   *      linearity: 0.3,
   *      easing: bezier(0, 0, 0.3, 1),
   *      maxSpeed: 1400,
   *      deceleration: 2500,
   *   });
   * ```
   */
  enable(options?: DragPanOptions | boolean): void;
  /**
   * Disables the "drag to pan" interaction.
   *
   * @example
   * ```ts
   * map.dragPan.disable();
   * ```
   */
  disable(): void;
  /**
   * Returns a Boolean indicating whether the "drag to pan" interaction is enabled.
   *
   * @returns `true` if the "drag to pan" interaction is enabled.
   */
  isEnabled(): boolean;
  /**
   * Returns a Boolean indicating whether the "drag to pan" interaction is active, i.e. currently being used.
   *
   * @returns `true` if the "drag to pan" interaction is active.
   */
  isActive(): boolean;
}
type TaskID = number;
type Task = {
  callback: (timeStamp: number) => void;
  id: TaskID;
  cancelled: boolean;
};
declare class TaskQueue {
  _queue: Array<Task>;
  _id: TaskID;
  _cleared: boolean;
  _currentlyRunning: Array<Task> | false;
  constructor();
  add(callback: (timeStamp: number) => void): TaskID;
  remove(id: TaskID): void;
  run(timeStamp?: number): void;
  clear(): void;
}
type MapControlsDeltas = {
  panDelta: Point;
  zoomDelta: number;
  bearingDelta: number;
  pitchDelta: number;
  rollDelta: number;
  around: Point;
};
type CameraForBoxAndBearingHandlerResult = {
  center: LngLat;
  zoom: number;
  bearing: number;
};
type EaseToHandlerOptions = {
  bearing: number;
  pitch: number;
  roll: number;
  padding: PaddingOptions;
  offsetAsPoint: Point;
  around?: LngLat;
  aroundPoint?: Point;
  center?: LngLatLike;
  zoom?: number;
  offset?: PointLike;
};
type EaseToHandlerResult = {
  easeFunc: (k: number) => void;
  elevationCenter: LngLat;
  isZooming: boolean;
};
type FlyToHandlerOptions = {
  bearing: number;
  pitch: number;
  roll: number;
  padding: PaddingOptions;
  offsetAsPoint: Point;
  center?: LngLatLike;
  locationAtOffset: LngLat;
  zoom?: number;
  minZoom?: number;
};
type FlyToHandlerResult = {
  easeFunc: (k: number, scale: number, centerFactor: number, pointAtOffset: Point) => void;
  scaleOfZoom: number;
  scaleOfMinZoom?: number;
  targetCenter: LngLat;
  pixelPathLength: number;
};
interface ICameraHelper {
  get useGlobeControls(): boolean;
  handlePanInertia(pan: Point, transform: IReadonlyTransform): {
    easingCenter: LngLat;
    easingOffset: Point;
  };
  handleMapControlsRollPitchBearingZoom(deltas: MapControlsDeltas, tr: ITransform): void;
  handleMapControlsPan(deltas: MapControlsDeltas, tr: ITransform, preZoomAroundLoc: LngLat): void;
  cameraForBoxAndBearing(options: CameraForBoundsOptions, padding: PaddingOptions, bounds: LngLatBounds, bearing: number, tr: IReadonlyTransform): CameraForBoxAndBearingHandlerResult;
  handleJumpToCenterZoom(tr: ITransform, options: {
    zoom?: number;
    center?: LngLatLike;
  }): void;
  handleEaseTo(tr: ITransform, options: EaseToHandlerOptions): EaseToHandlerResult;
  handleFlyTo(tr: ITransform, options: FlyToHandlerOptions): FlyToHandlerResult;
}
/**
 * A [Point](https://github.com/mapbox/point-geometry) or an array of two numbers representing `x` and `y` screen coordinates in pixels.
 *
 * @group Geography and Geometry
 *
 * @example
 * ```ts
 * let p1 = new Point(-77, 38); // a PointLike which is a Point
 * let p2 = [-77, 38]; // a PointLike which is an array of two numbers
 * ```
 */
type PointLike = Point | [number, number];
/**
 * Options common to {@link Map.jumpTo}, {@link Map.easeTo}, and {@link Map.flyTo}, controlling the desired location,
 * zoom, bearing, pitch, and roll of the camera. All properties are optional, and when a property is omitted, the current
 * camera value for that property will remain unchanged.
 *
 * @example
 * Set the map's initial perspective with CameraOptions
 * ```ts
 * let map = new Map({
 *   container: 'map',
 *   style: 'https://demotiles.maplibre.org/style.json',
 *   center: [-73.5804, 45.53483],
 *   pitch: 60,
 *   bearing: -60,
 *   zoom: 10
 * });
 * ```
 * @see [Set pitch and bearing](https://maplibre.org/maplibre-gl-js/docs/examples/set-pitch-and-bearing/)
 * @see [Jump to a series of locations](https://maplibre.org/maplibre-gl-js/docs/examples/jump-to-a-series-of-locations/)
 * @see [Fly to a location](https://maplibre.org/maplibre-gl-js/docs/examples/fly-to-a-location/)
 * @see [Display buildings in 3D](https://maplibre.org/maplibre-gl-js/docs/examples/display-buildings-in-3d/)
 */
type CameraOptions = CenterZoomBearing & {
  /**
   * The desired pitch in degrees. The pitch is the angle towards the horizon
   * measured in degrees with a range between 0 and 60 degrees. For example, pitch: 0 provides the appearance
   * of looking straight down at the map, while pitch: 60 tilts the user's perspective towards the horizon.
   * Increasing the pitch value is often used to display 3D objects.
   */
  pitch?: number;
  /**
   * The desired roll in degrees. The roll is the angle about the camera boresight.
   */
  roll?: number;
  /**
   * The elevation of the center point in meters above sea level.
   */
  elevation?: number;
};
/**
 * Holds center, zoom and bearing properties
 */
type CenterZoomBearing = {
  /**
   * The desired center.
   */
  center?: LngLatLike;
  /**
   * The desired mercator zoom level.
   */
  zoom?: number;
  /**
   * The desired bearing in degrees. The bearing is the compass direction that
   * is "up". For example, `bearing: 90` orients the map so that east is up.
   */
  bearing?: number;
};
/**
 * The options object related to the {@link Map.jumpTo} method
 */
type JumpToOptions = CameraOptions & {
  /**
   * Dimensions in pixels applied on each side of the viewport for shifting the vanishing point.
   */
  padding?: PaddingOptions;
};
/**
 * A options object for the {@link Map.cameraForBounds} method
 */
type CameraForBoundsOptions = CameraOptions & {
  /**
   * The amount of padding in pixels to add to the given bounds.
   */
  padding?: number | PaddingOptions;
  /**
   * The center of the given bounds relative to the map's center, measured in pixels.
   * @defaultValue [0, 0]
   */
  offset?: PointLike;
  /**
   * The maximum zoom level to allow when the camera would transition to the specified bounds.
   */
  maxZoom?: number;
};
/**
 * The {@link Map.flyTo} options object
 */
type FlyToOptions = AnimationOptions & CameraOptions & {
  /**
   * The zooming "curve" that will occur along the
   * flight path. A high value maximizes zooming for an exaggerated animation, while a low
   * value minimizes zooming for an effect closer to {@link Map.easeTo}. 1.42 is the average
   * value selected by participants in the user study discussed in
   * [van Wijk (2003)](https://www.win.tue.nl/~vanwijk/zoompan.pdf). A value of
   * `Math.pow(6, 0.25)` would be equivalent to the root mean squared average velocity. A
   * value of 1 would produce a circular motion.
   * @defaultValue 1.42
   */
  curve?: number;
  /**
   * The zero-based zoom level at the peak of the flight path. If
   * `options.curve` is specified, this option is ignored.
   */
  minZoom?: number;
  /**
   * The average speed of the animation defined in relation to
   * `options.curve`. A speed of 1.2 means that the map appears to move along the flight path
   * by 1.2 times `options.curve` screenfulls every second. A _screenfull_ is the map's visible span.
   * It does not correspond to a fixed physical distance, but varies by zoom level.
   * @defaultValue 1.2
   */
  speed?: number;
  /**
   * The average speed of the animation measured in screenfulls
   * per second, assuming a linear timing curve. If `options.speed` is specified, this option is ignored.
   */
  screenSpeed?: number;
  /**
   * The animation's maximum duration, measured in milliseconds.
   * If duration exceeds maximum duration, it resets to 0.
   */
  maxDuration?: number;
  /**
   * The amount of padding in pixels to add to the given bounds.
   */
  padding?: number | PaddingOptions;
};
/**
 * The {@link Map.easeTo} options object
 */
type EaseToOptions = AnimationOptions & CameraOptions & {
  delayEndEvents?: number;
  padding?: number | PaddingOptions;
  /**
   * If `zoom` is specified, `around` determines the point around which the zoom is centered.
   */
  around?: LngLatLike;
  easeId?: string;
  noMoveStart?: boolean;
};
/**
 * Options for {@link Map.fitBounds} method
 */
type FitBoundsOptions = FlyToOptions & {
  /**
   * If `true`, the map transitions using {@link Map.easeTo}. If `false`, the map transitions using {@link Map.flyTo}.
   * See those functions and {@link AnimationOptions} for information about options available.
   * @defaultValue false
   */
  linear?: boolean;
  /**
   * The center of the given bounds relative to the map's center, measured in pixels.
   * @defaultValue [0, 0]
   */
  offset?: PointLike;
  /**
   * The maximum zoom level to allow when the map view transitions to the specified bounds.
   */
  maxZoom?: number;
};
/**
 * Options common to map movement methods that involve animation, such as {@link Map.panBy} and
 * {@link Map.easeTo}, controlling the duration and easing function of the animation. All properties
 * are optional.
 *
 */
type AnimationOptions = {
  /**
   * The animation's duration, measured in milliseconds.
   */
  duration?: number;
  /**
   * A function taking a time in the range 0..1 and returning a number where 0 is
   * the initial state and 1 is the final state.
   */
  easing?: (_: number) => number;
  /**
   * of the target center relative to real map container center at the end of animation.
   */
  offset?: PointLike;
  /**
   * If `false`, no animation will occur.
   */
  animate?: boolean;
  /**
   * If `true`, then the animation is considered essential and will not be affected by
   * [`prefers-reduced-motion`](https://developer.mozilla.org/en-US/docs/Web/CSS/\@media/prefers-reduced-motion).
   */
  essential?: boolean;
  /**
   * Default false. Needed in 3D maps to let the camera stay in a constant
   * height based on sea-level. After the animation finished the zoom-level will be recalculated in respect of
   * the distance from the camera to the center-coordinate-altitude.
   */
  freezeElevation?: boolean;
};
/**
 * A callback hook that allows manipulating the camera and being notified about camera updates before they happen
 */
type CameraUpdateTransformFunction = (next: {
  center: LngLat;
  zoom: number;
  roll: number;
  pitch: number;
  bearing: number;
  elevation: number;
}) => {
  center?: LngLat;
  zoom?: number;
  roll?: number;
  pitch?: number;
  bearing?: number;
  elevation?: number;
};
declare abstract class Camera extends Evented {
  transform: ITransform;
  cameraHelper: ICameraHelper;
  terrain: Terrain;
  handlers: HandlerManager;
  _moving: boolean;
  _zooming: boolean;
  _rotating: boolean;
  _pitching: boolean;
  _rolling: boolean;
  _padding: boolean;
  _bearingSnap: number;
  _zoomSnap: number;
  _easeStart: number;
  _easeOptions: {
    duration?: number;
    easing?: (_: number) => number;
  };
  _easeId: string | void;
  _onEaseFrame: (_: number) => void;
  _onEaseEnd: (easeId?: string) => void;
  _easeFrameId: TaskID;
  /**
   * @internal
   * holds the geographical coordinate of the target
   */
  _elevationCenter: LngLat;
  /**
   * @internal
   * holds the targ altitude value, = center elevation of the target.
   * This value may changes during flight, because new terrain-tiles loads during flight.
   */
  _elevationTarget: number;
  /**
   * @internal
   * holds the start altitude value, = center elevation before animation begins
   * this value will recalculated during flight in respect of changing _elevationTarget values,
   * so the linear interpolation between start and target keeps smooth and without jumps.
   */
  _elevationStart: number;
  /**
   * @internal
   * Saves the current state of the elevation freeze - this is used during map movement to prevent "rocky" camera movement.
   */
  _elevationFreeze: boolean;
  /**
   * @internal
   * Used to track accumulated changes during continuous interaction
   */
  _requestedCameraState?: ITransform;
  /**
   * A callback used to defer camera updates or apply arbitrary constraints.
   * If specified, this Camera instance can be used as a stateless component in React etc.
   */
  transformCameraUpdate: CameraUpdateTransformFunction | null;
  /**
   * @internal
   * If true, the elevation of the center point will automatically be set to the terrain elevation
   * (or zero if terrain is not enabled). If false, the elevation of the center point will default
   * to sea level and will not automatically update. Defaults to true. Needs to be set to false to
   * keep the camera above ground when pitch \> 90 degrees.
   */
  _centerClampedToGround: boolean;
  abstract _requestRenderFrame(a: () => void): TaskID;
  abstract _cancelRenderFrame(_: TaskID): void;
  constructor(transform: ITransform, cameraHelper: ICameraHelper, options: {
    bearingSnap: number;
    zoomSnap: number;
  });
  /**
   * @internal
   * Creates a new specialized transform instance from a projection instance and migrates
   * to this new transform, carrying over all the properties of the old transform (center, pitch, etc.).
   * When the style's projection is changed (or first set), this function should be called.
   */
  migrateProjection(newTransform: ITransform, newCameraHelper: ICameraHelper): void;
  /**
   * Returns the map's geographical centerpoint.
   *
   * @returns The map's geographical centerpoint.
   * @example
   * Return a LngLat object such as `{lng: 0, lat: 0}`
   * ```ts
   * let center = map.getCenter();
   * // access longitude and latitude values directly
   * let {lng, lat} = map.getCenter();
   * ```
   */
  getCenter(): LngLat;
  /**
   * Sets the map's geographical centerpoint. Equivalent to `jumpTo({center: center})`.
   *
   * Triggers the following events: `movestart` and `moveend`.
   *
   * @param center - The centerpoint to set.
   * @param eventData - Additional properties to be added to event objects of events triggered by this method.
   * @example
   * ```ts
   * map.setCenter([-74, 38]);
   * ```
   */
  setCenter(center: LngLatLike, eventData?: any): this;
  /**
   * Returns the elevation of the map's center point.
   *
   * @returns The elevation of the map's center point, in meters above sea level.
   */
  getCenterElevation(): number;
  /**
   * Sets the elevation of the map's center point, in meters above sea level. Equivalent to `jumpTo({elevation: elevation})`.
   *
   * Triggers the following events: `movestart` and `moveend`.
   *
   * @param elevation - The elevation to set, in meters above sea level.
   * @param eventData - Additional properties to be added to event objects of events triggered by this method.
   */
  setCenterElevation(elevation: number, eventData?: any): this;
  /**
   * Returns the value of `centerClampedToGround`.
   *
   * If true, the elevation of the center point will automatically be set to the terrain elevation
   * (or zero if terrain is not enabled). If false, the elevation of the center point will default
   * to sea level and will not automatically update. Defaults to true. Needs to be set to false to
   * keep the camera above ground when pitch \> 90 degrees.
   */
  getCenterClampedToGround(): boolean;
  /**
   * Sets the value of `centerClampedToGround`.
   *
   * If true, the elevation of the center point will automatically be set to the terrain elevation
   * (or zero if terrain is not enabled). If false, the elevation of the center point will default
   * to sea level and will not automatically update. Defaults to true. Needs to be set to false to
   * keep the camera above ground when pitch \> 90 degrees.
   */
  setCenterClampedToGround(centerClampedToGround: boolean): void;
  /**
   * Pans the map by the specified offset.
   *
   * Triggers the following events: `movestart` and `moveend`.
   *
   * @param offset - `x` and `y` coordinates by which to pan the map.
   * @param options - Options object
   * @param eventData - Additional properties to be added to event objects of events triggered by this method.
   * @see [Navigate the map with game-like controls](https://maplibre.org/maplibre-gl-js/docs/examples/navigate-the-map-with-game-like-controls/)
   */
  panBy(offset: PointLike, options?: EaseToOptions, eventData?: any): this;
  /**
   * Pans the map to the specified location with an animated transition.
   *
   * Triggers the following events: `movestart` and `moveend`.
   *
   * @param lnglat - The location to pan the map to.
   * @param options - Options describing the destination and animation of the transition.
   * @param eventData - Additional properties to be added to event objects of events triggered by this method.
   * @example
   * ```ts
   * map.panTo([-74, 38]);
   * // Specify that the panTo animation should last 5000 milliseconds.
   * map.panTo([-74, 38], {duration: 5000});
   * ```
   * @see [Update a feature in realtime](https://maplibre.org/maplibre-gl-js/docs/examples/update-a-feature-in-realtime/)
   */
  panTo(lnglat: LngLatLike, options?: EaseToOptions, eventData?: any): this;
  /**
   * Returns the map's current zoom level.
   *
   * @returns The map's current zoom level.
   * @example
   * ```ts
   * map.getZoom();
   * ```
   */
  getZoom(): number;
  /**
   * Sets the map's zoom level. Equivalent to `jumpTo({zoom: zoom})`.
   *
   * Triggers the following events: `movestart`, `move`, `moveend`, `zoomstart`, `zoom`, and `zoomend`.
   *
   * @param zoom - The zoom level to set (0-20).
   * @param eventData - Additional properties to be added to event objects of events triggered by this method.
   * @example
   * Zoom to the zoom level 5 without an animated transition
   * ```ts
   * map.setZoom(5);
   * ```
   */
  setZoom(zoom: number, eventData?: any): this;
  /**
   * Zooms the map to the specified zoom level, with an animated transition.
   *
   * Triggers the following events: `movestart`, `move`, `moveend`, `zoomstart`, `zoom`, and `zoomend`.
   *
   * @param zoom - The zoom level to transition to.
   * @param options - Options object
   * @param eventData - Additional properties to be added to event objects of events triggered by this method.
   * @example
   * ```ts
   * // Zoom to the zoom level 5 without an animated transition
   * map.zoomTo(5);
   * // Zoom to the zoom level 8 with an animated transition
   * map.zoomTo(8, {
   *   duration: 2000,
   *   offset: [100, 50]
   * });
   * ```
   */
  zoomTo(zoom: number, options?: EaseToOptions | null, eventData?: any): this;
  /**
   * Incrementally increases the map's zoom level by 1, first snapping to the nearest `zoomSnap` increment.
   *
   * Triggers the following events: `movestart`, `move`, `moveend`, `zoomstart`, `zoom`, and `zoomend`.
   *
   * @param options - Options object
   * @param eventData - Additional properties to be added to event objects of events triggered by this method.
   * @example
   * Zoom the map in one level with a custom animation duration
   * ```ts
   * map.zoomIn({duration: 1000});
   * ```
   */
  zoomIn(options?: AnimationOptions, eventData?: any): this;
  /**
   * Decreases the map's zoom level by 1, first snapping to the nearest `zoomSnap` increment.
   *
   * Triggers the following events: `movestart`, `move`, `moveend`, `zoomstart`, `zoom`, and `zoomend`.
   *
   * @param options - Options object
   * @param eventData - Additional properties to be added to event objects of events triggered by this method.
   * @example
   * Zoom the map out one level with a custom animation offset
   * ```ts
   * map.zoomOut({offset: [80, 60]});
   * ```
   */
  zoomOut(options?: AnimationOptions, eventData?: any): this;
  /**
   * Returns the map's current vertical field of view, in degrees.
   *
   * @returns The map's current vertical field of view.
   * @defaultValue 36.87
   * @example
   * ```ts
   * const verticalFieldOfView = map.getVerticalFieldOfView();
   * ```
   */
  getVerticalFieldOfView(): number;
  /**
   * Sets the map's vertical field of view, in degrees.
   *
   * Triggers the following events: `movestart`, `move`, and `moveend`.
   *
   * @param fov - The vertical field of view to set, in degrees (0-180).
   * @param eventData - Additional properties to be added to event objects of events triggered by this method.
   * @defaultValue 36.87
   * @example
   * Change vertical field of view to 30 degrees
   * ```ts
   * map.setVerticalFieldOfView(30);
   * ```
   */
  setVerticalFieldOfView(fov: number, eventData?: any): this;
  /**
   * Returns the map's current bearing. The bearing is the compass direction that is "up"; for example, a bearing
   * of 90° orients the map so that east is up.
   *
   * @returns The map's current bearing.
   * @see [Navigate the map with game-like controls](https://maplibre.org/maplibre-gl-js/docs/examples/navigate-the-map-with-game-like-controls/)
   */
  getBearing(): number;
  /**
   * Sets the map's zoom snap level.
   *
   * @param snap - The zoom snap level to set.
   */
  setZoomSnap(snap: number): this;
  /**
   * Returns the map's current zoom snap level.
   *
   * @returns The map's current zoom snap level.
   */
  getZoomSnap(): number;
  /**
   * Sets the map's bearing (rotation). The bearing is the compass direction that is "up"; for example, a bearing
   * of 90° orients the map so that east is up.
   *
   * Equivalent to `jumpTo({bearing: bearing})`.
   *
   * Triggers the following events: `movestart`, `moveend`, and `rotate`.
   *
   * @param bearing - The desired bearing.
   * @param eventData - Additional properties to be added to event objects of events triggered by this method.
   * @example
   * Rotate the map to 90 degrees
   * ```ts
   * map.setBearing(90);
   * ```
   */
  setBearing(bearing: number, eventData?: any): this;
  /**
   * Returns the current padding applied around the map viewport.
   *
   * @returns The current padding around the map viewport.
   */
  getPadding(): PaddingOptions;
  /**
   * Sets the padding in pixels around the viewport.
   *
   * Equivalent to `jumpTo({padding: padding})`.
   *
   * Triggers the following events: `movestart` and `moveend`.
   *
   * @param padding - The desired padding.
   * @param eventData - Additional properties to be added to event objects of events triggered by this method.
   * @example
   * Sets a left padding of 300px, and a top padding of 50px
   * ```ts
   * map.setPadding({ left: 300, top: 50 });
   * ```
   */
  setPadding(padding: PaddingOptions, eventData?: any): this;
  /**
   * Rotates the map to the specified bearing, with an animated transition. The bearing is the compass direction
   * that is "up"; for example, a bearing of 90° orients the map so that east is up.
   *
   * Triggers the following events: `movestart`, `moveend`, and `rotate`.
   *
   * @param bearing - The desired bearing.
   * @param options - Options object
   * @param eventData - Additional properties to be added to event objects of events triggered by this method.
   */
  rotateTo(bearing: number, options?: EaseToOptions, eventData?: any): this;
  /**
   * Rotates the map so that north is up (0° bearing), with an animated transition.
   *
   * Triggers the following events: `movestart`, `moveend`, and `rotate`.
   *
   * @param options - Options object
   * @param eventData - Additional properties to be added to event objects of events triggered by this method.
   */
  resetNorth(options?: AnimationOptions, eventData?: any): this;
  /**
   * Rotates and pitches the map so that north is up (0° bearing) and pitch and roll are 0°, with an animated transition.
   *
   * Triggers the following events: `movestart`, `move`, `moveend`, `pitchstart`, `pitch`, `pitchend`, `rollstart`, `roll`, `rollend`, and `rotate`.
   *
   * @param options - Options object
   * @param eventData - Additional properties to be added to event objects of events triggered by this method.
   */
  resetNorthPitch(options?: AnimationOptions, eventData?: any): this;
  /**
   * Snaps the map so that north is up (0° bearing), if the current bearing is close enough to it (i.e. within the
   * `bearingSnap` threshold).
   *
   * Triggers the following events: `movestart`, `moveend`, and `rotate`.
   *
   * @param options - Options object
   * @param eventData - Additional properties to be added to event objects of events triggered by this method.
   */
  snapToNorth(options?: AnimationOptions, eventData?: any): this;
  /**
   * Returns the map's current pitch (tilt).
   *
   * @returns The map's current pitch, measured in degrees away from the plane of the screen.
   */
  getPitch(): number;
  /**
   * Sets the map's pitch (tilt). Equivalent to `jumpTo({pitch: pitch})`.
   *
   * Triggers the following events: `movestart`, `moveend`, `pitchstart`, and `pitchend`.
   *
   * @param pitch - The pitch to set, measured in degrees away from the plane of the screen (0-60).
   * @param eventData - Additional properties to be added to event objects of events triggered by this method.
   */
  setPitch(pitch: number, eventData?: any): this;
  /**
   * Returns the map's current roll angle.
   *
   * @returns The map's current roll, measured in degrees about the camera boresight.
   */
  getRoll(): number;
  /**
   * Sets the map's roll angle. Equivalent to `jumpTo({roll: roll})`.
   *
   * Triggers the following events: `movestart`, `moveend`, `rollstart`, and `rollend`.
   *
   * @param roll - The roll to set, measured in degrees about the camera boresight
   * @param eventData - Additional properties to be added to event objects of events triggered by this method.
   */
  setRoll(roll: number, eventData?: any): this;
  /**
   * @param bounds - Calculate the center for these bounds in the viewport and use
   * the highest zoom level up to and including {@link Map.getMaxZoom} that fits
   * in the viewport. LngLatBounds represent a box that is always axis-aligned with bearing 0.
   * Bounds will be taken in [sw, ne] order. Southwest point will always be to the left of the northeast point.
   * @param options - Options object
   * @returns If map is able to fit to provided bounds, returns `center`, `zoom`, and `bearing`.
   * If map is unable to fit, method will warn and return undefined.
   * @example
   * ```ts
   * let bbox = [[-79, 43], [-73, 45]];
   * let newCameraTransform = map.cameraForBounds(bbox, {
   *   padding: {top: 10, bottom:25, left: 15, right: 5}
   * });
   * ```
   */
  cameraForBounds(bounds: LngLatBoundsLike, options?: CameraForBoundsOptions): CenterZoomBearing | undefined;
  /**
   * @internal
   * Calculate the center of these two points in the viewport and use
   * the highest zoom level up to and including {@link Map.getMaxZoom} that fits
   * the AABB defined by these points in the viewport at the specified bearing.
   * @param p0 - First point
   * @param p1 - Second point
   * @param bearing - Desired map bearing at end of animation, in degrees
   * @param options - the camera options
   * @returns If map is able to fit to provided bounds, returns `center`, `zoom`, and `bearing`.
   *      If map is unable to fit, method will warn and return undefined.
   * @example
   * ```ts
   * let p0 = [-79, 43];
   * let p1 = [-73, 45];
   * let bearing = 90;
   * let newCameraTransform = map._cameraForBoxAndBearing(p0, p1, bearing, {
   *   padding: {top: 10, bottom:25, left: 15, right: 5}
   * });
   * ```
   */
  _cameraForBoxAndBearing(p0: LngLatLike, p1: LngLatLike, bearing: number, options?: CameraForBoundsOptions): CenterZoomBearing | undefined;
  /**
   * Pans and zooms the map to contain its visible area within the specified geographical bounds.
   * This function will also reset the map's bearing to 0 if bearing is nonzero.
   *
   * Triggers the following events: `movestart` and `moveend`.
   *
   * @param bounds - Center these bounds in the viewport and use the highest
   * zoom level up to and including {@link Map.getMaxZoom} that fits them in the viewport.
   * Bounds will be taken in [sw, ne] order. Southwest point will always be to the left of the northeast point.
   * @param options - Options supports all properties from {@link AnimationOptions} and {@link CameraOptions} in addition to the fields below.
   * @param eventData - Additional properties to be added to event objects of events triggered by this method.
   * @example
   * ```ts
   * let bbox = [[-79, 43], [-73, 45]];
   * map.fitBounds(bbox, {
   *   padding: {top: 10, bottom:25, left: 15, right: 5}
   * });
   * ```
   * @see [Fit a map to a bounding box](https://maplibre.org/maplibre-gl-js/docs/examples/fit-a-map-to-a-bounding-box/)
   */
  fitBounds(bounds: LngLatBoundsLike, options?: FitBoundsOptions, eventData?: any): this;
  /**
   * Pans, rotates and zooms the map to to fit the box made by points p0 and p1
   * once the map is rotated to the specified bearing. To zoom without rotating,
   * pass in the current map bearing.
   *
   * Triggers the following events: `movestart`, `move`, `moveend`, `zoomstart`, `zoom`, `zoomend` and `rotate`.
   *
   * @param p0 - First point on screen, in pixel coordinates
   * @param p1 - Second point on screen, in pixel coordinates
   * @param bearing - Desired map bearing at end of animation, in degrees
   * @param options - Options object
   * @param eventData - Additional properties to be added to event objects of events triggered by this method.
   * @example
   * ```ts
   * let p0 = [220, 400];
   * let p1 = [500, 900];
   * map.fitScreenCoordinates(p0, p1, map.getBearing(), {
   *   padding: {top: 10, bottom:25, left: 15, right: 5}
   * });
   * ```
   * @see Used by {@link BoxZoomHandler}
   */
  fitScreenCoordinates(p0: PointLike, p1: PointLike, bearing: number, options?: FitBoundsOptions, eventData?: any): this;
  _fitInternal(calculatedOptions?: CenterZoomBearing, options?: FitBoundsOptions, eventData?: any): this;
  /**
   * Changes any combination of center, zoom, bearing, pitch, and roll, without
   * an animated transition. The map will retain its current values for any
   * details not specified in `options`.
   *
   * Triggers the following events: `movestart`, `move`, `moveend`, `zoomstart`, `zoom`, `zoomend`, `pitchstart`,
   * `pitch`, `pitchend`, `rollstart`, `roll`, `rollend` and `rotate`.
   *
   * @param options - Options object
   * @param eventData - Additional properties to be added to event objects of events triggered by this method.
   * @example
   * ```ts
   * // jump to coordinates at current zoom
   * map.jumpTo({center: [0, 0]});
   * // jump with zoom, pitch, and bearing options
   * map.jumpTo({
   *   center: [0, 0],
   *   zoom: 8,
   *   pitch: 45,
   *   bearing: 90
   * });
   * ```
   * @see [Jump to a series of locations](https://maplibre.org/maplibre-gl-js/docs/examples/jump-to-a-series-of-locations/)
   * @see [Update a feature in realtime](https://maplibre.org/maplibre-gl-js/docs/examples/update-a-feature-in-realtime/)
   */
  jumpTo(options: JumpToOptions, eventData?: any): this;
  /**
   * Given a camera 'from' position and a position to look at (`to`), calculates zoom and camera rotation and returns them as {@link CameraOptions}.
   * @param from - The camera to look from
   * @param altitudeFrom - The altitude of the camera to look from
   * @param to - The center to look at
   * @param altitudeTo - Optional altitude of the center to look at. If none given the ground height will be used.
   * @returns the calculated camera options
   * @example
   * ```ts
   * // Calculate options to look from (1°, 0°, 1000m) to (1°, 1°, 0m)
   * const cameraLngLat = new LngLat(1, 0);
   * const cameraAltitude = 1000;
   * const targetLngLat = new LngLat(1, 1);
   * const targetAltitude = 0;
   * const cameraOptions = map.calculateCameraOptionsFromTo(cameraLngLat, cameraAltitude, targetLngLat, targetAltitude);
   * // Apply calculated options
   * map.jumpTo(cameraOptions);
   * ```
   */
  calculateCameraOptionsFromTo(from: LngLatLike, altitudeFrom: number, to: LngLatLike, altitudeTo?: number): CameraOptions;
  /**
   * Given a camera position and rotation, calculates zoom and center point and returns them as {@link CameraOptions}.
   * @param cameraLngLat - The lng, lat of the camera to look from
   * @param cameraAlt - The altitude of the camera to look from, in meters above sea level
   * @param bearing - Bearing of the camera, in degrees
   * @param pitch - Pitch of the camera, in degrees
   * @param roll - Roll of the camera, in degrees
   * @returns the calculated camera options
   * @example
   * ```ts
   * // Calculate options to look from camera position(1°, 0°, 1000m) with bearing = 90°, pitch = 30°, and roll = 45°
   * const cameraLngLat = new LngLat(1, 0);
   * const cameraAltitude = 1000;
   * const bearing = 90;
   * const pitch = 30;
   * const roll = 45;
   * const cameraOptions = map.calculateCameraOptionsFromCameraLngLatAltRotation(cameraLngLat, cameraAltitude, bearing, pitch, roll);
   * // Apply calculated options
   * map.jumpTo(cameraOptions);
   * ```
   */
  calculateCameraOptionsFromCameraLngLatAltRotation(cameraLngLat: LngLatLike, cameraAlt: number, bearing: number, pitch: number, roll?: number): CameraOptions;
  /**
   * Changes any combination of `center`, `zoom`, `bearing`, `pitch`, `roll`, and `padding` with an animated transition
   * between old and new values. The map will retain its current values for any
   * details not specified in `options`.
   *
   * !!! note "Reduced Motion"
   *     The transition will happen instantly if the user has enabled
   *     the `reduced motion` accessibility feature enabled in their operating system,
   *     unless `options` includes `essential: true`.
   *
   * Triggers the following events: `movestart`, `move`, `moveend`, `zoomstart`, `zoom`, `zoomend`, `pitchstart`,
   * `pitch`, `pitchend`, `rollstart`, `roll`, `rollend`, and `rotate`.
   *
   * @param options - Options describing the destination and animation of the transition.
   * Accepts {@link CameraOptions} and {@link AnimationOptions}.
   * @param eventData - Additional properties to be added to event objects of events triggered by this method.
   * @see [Navigate the map with game-like controls](https://maplibre.org/maplibre-gl-js/docs/examples/navigate-the-map-with-game-like-controls/)
   */
  easeTo(options: EaseToOptions, eventData?: any): this;
  _prepareEase(eventData: any, noMoveStart: boolean, currently?: {
    moving?: boolean;
    zooming?: boolean;
    rotating?: boolean;
    pitching?: boolean;
    rolling?: boolean;
  }): void;
  _prepareElevation(center: LngLat): void;
  _updateElevation(k: number): void;
  _finalizeElevation(): void;
  /**
   * @internal
   * Called when the camera is about to be manipulated.
   * If `transformCameraUpdate` is specified or terrain is enabled, a copy of
   * the current transform is created to track the accumulated changes.
   * This underlying transform represents the "desired state" proposed by input handlers / animations / UI controls.
   * It may differ from the state used for rendering (`this.transform`).
   * @returns Transform to apply changes to
   */
  _getTransformForUpdate(): ITransform;
  /**
   * @internal
   * Checks the given transform for the camera being below terrain surface and
   * returns new pitch and zoom to fix that.
   *
   * With the new pitch and zoom, the camera will be at the same ground
   * position but at higher altitude. It will still point to the same spot on
   * the map.
   *
   * @param tr - The transform to check.
   */
  _elevateCameraIfInsideTerrain(tr: ITransform): {
    pitch?: number;
    zoom?: number;
  };
  /**
   * @internal
   * Called after the camera is done being manipulated.
   * @param tr - the requested camera end state
   * If the camera is inside terrain, it gets elevated.
   * Call `transformCameraUpdate` if present, and then apply the "approved" changes.
   */
  _applyUpdatedTransform(tr: ITransform): void;
  _fireMoveEvents(eventData?: any): void;
  _afterEase(eventData?: any, easeId?: string): void;
  /**
   * Changes any combination of center, zoom, bearing, pitch, and roll, animating the transition along a curve that
   * evokes flight. The animation seamlessly incorporates zooming and panning to help
   * the user maintain her bearings even after traversing a great distance.
   *
   * !!! note "Reduced Motion"
   *     The animation will be skipped, and this will behave equivalently to `jumpTo`
   *     if the user has the `reduced motion` accessibility feature enabled in their operating system,
   *     unless 'options' includes `essential: true`.
   *
   * Triggers the following events: `movestart`, `move`, `moveend`, `zoomstart`, `zoom`, `zoomend`, `pitchstart`,
   * `pitch`, `pitchend`, `rollstart`, `roll`, `rollend`, and `rotate`.
   *
   * @param options - Options describing the destination and animation of the transition.
   * Accepts {@link CameraOptions}, {@link AnimationOptions},
   * and the following additional options.
   * @param eventData - Additional properties to be added to event objects of events triggered by this method.
   * @example
   * ```ts
   * // fly with default options to null island
   * map.flyTo({center: [0, 0], zoom: 9});
   * // using flyTo options
   * map.flyTo({
   *   center: [0, 0],
   *   zoom: 9,
   *   speed: 0.2,
   *   curve: 1,
   *   easing(t) {
   *     return t;
   *   }
   * });
   * ```
   * @see [Fly to a location](https://maplibre.org/maplibre-gl-js/docs/examples/fly-to-a-location/)
   * @see [Slowly fly to a location](https://maplibre.org/maplibre-gl-js/docs/examples/slowly-fly-to-a-location/)
   * @see [Fly to a location based on scroll position](https://maplibre.org/maplibre-gl-js/docs/examples/fly-to-a-location-based-on-scroll-position/)
   */
  flyTo(options: FlyToOptions, eventData?: any): this;
  isEasing(): boolean;
  /**
   * Stops any animated transition underway.
   */
  stop(): this;
  _stop(allowGestures?: boolean, easeId?: string): this;
  _ease(frame: (_: number) => void, finish: () => void, options: {
    animate?: boolean;
    duration?: number;
    easing?: (_: number) => number;
  }): void;
  _renderFrameCallback: () => void;
  _normalizeBearing(bearing: number, currentBearing: number): number;
  /**
   * Gets the elevation at a given location, in meters above sea level.
   * Returns null if terrain is not enabled.
   * If terrain is enabled with some exaggeration value, the value returned here will be reflective of (multiplied by) that exaggeration value.
   * This method should be used for proper positioning of custom 3d objects, as explained [here](https://maplibre.org/maplibre-gl-js/docs/examples/adding-3d-models-using-threejs-on-terrain/)
   * @param lngLatLike - [x,y] or LngLat coordinates of the location
   * @returns elevation in meters
   */
  queryTerrainElevation(lngLatLike: LngLatLike): number | null;
}
declare class HandlerInertia {
  _map: Map$1;
  _inertiaBuffer: Array<{
    time: number;
    settings: any;
  }>;
  constructor(map: Map$1);
  clear(): void;
  record(settings: any): void;
  _drainInertiaBuffer(): void;
  _onMoveEnd(panInertiaOptions?: DragPanOptions | boolean): EaseToOptions;
}
/**
 * Handlers interpret dom events and return camera changes that should be
 * applied to the map (`HandlerResult`s). The camera changes are all deltas.
 * The handler itself should have no knowledge of the map's current state.
 * This makes it easier to merge multiple results and keeps handlers simpler.
 * For example, if there is a mousedown and mousemove, the mousePan handler
 * would return a `panDelta` on the mousemove.
 */
interface Handler {
  enable(): void;
  disable(): void;
  isEnabled(): boolean;
  /**
   * This is used to indicate if the handler is currently active or not.
   * In case a handler is active, it will block other handlers from getting the relevant events.
   * There is an allow list of handlers that can be active at the same time, which is configured when adding a handler.
   */
  isActive(): boolean;
  /**
   * `reset` can be called by the manager at any time and must reset everything to it's original state
   */
  reset(): void;
  readonly touchstart?: (e: TouchEvent, points: Array<Point>, mapTouches: Array<Touch>) => HandlerResult | void;
  readonly touchmove?: (e: TouchEvent, points: Array<Point>, mapTouches: Array<Touch>) => HandlerResult | void;
  readonly touchmoveWindow?: (e: TouchEvent, points: Array<Point>, mapTouches: Array<Touch>) => HandlerResult | void;
  readonly touchend?: (e: TouchEvent, points: Array<Point>, mapTouches: Array<Touch>) => HandlerResult | void;
  readonly touchcancel?: (e: TouchEvent, points: Array<Point>, mapTouches: Array<Touch>) => HandlerResult | void;
  readonly mousedown?: (e: MouseEvent, point: Point) => HandlerResult | void;
  readonly mousemove?: (e: MouseEvent, point: Point) => HandlerResult | void;
  readonly mousemoveWindow?: (e: MouseEvent, point: Point) => HandlerResult | void;
  readonly mouseup?: (e: MouseEvent, point: Point) => HandlerResult | void;
  readonly mouseupWindow?: (e: MouseEvent, point: Point) => HandlerResult | void;
  readonly dblclick?: (e: MouseEvent, point: Point) => HandlerResult | void;
  readonly contextmenu?: (e: MouseEvent) => HandlerResult | void;
  readonly wheel?: (e: WheelEvent, point: Point) => HandlerResult | void;
  readonly keydown?: (e: KeyboardEvent) => HandlerResult | void;
  readonly keyup?: (e: KeyboardEvent) => HandlerResult | void;
  /**
   * `renderFrame` is the only non-dom event. It is called during render
   * frames and can be used to smooth camera changes (see scroll handler).
   */
  readonly renderFrame?: () => HandlerResult | void;
}
/**
 * All handler methods that are called with events can optionally return a `HandlerResult`.
 */
type HandlerResult = {
  panDelta?: Point;
  zoomDelta?: number;
  bearingDelta?: number;
  pitchDelta?: number;
  rollDelta?: number;
  /**
   * the point to not move when changing the camera
   */
  around?: Point | null;
  /**
   * same as above, except for pinch actions, which are given higher priority
   */
  pinchAround?: Point | null;
  /**
   * A method that can fire a one-off easing by directly changing the map's camera.
   */
  cameraAnimation?: (map: Map$1) => void;
  /**
   * The last three properties are needed by only one handler: scrollzoom.
   * The DOM event to be used as the `originalEvent` on any camera change events.
   */
  originalEvent?: Event$1;
  /**
   * Makes the manager trigger a frame, allowing the handler to return multiple results over time (see scrollzoom).
   */
  needsRenderFrame?: boolean;
  /**
   * The camera changes won't get recorded for inertial zooming.
   */
  noInertia?: boolean;
};
type EventInProgress = {
  handlerName: string;
  originalEvent: Event$1;
};
type EventsInProgress = {
  zoom?: EventInProgress;
  roll?: EventInProgress;
  pitch?: EventInProgress;
  rotate?: EventInProgress;
  drag?: EventInProgress;
};
type MapControlsScenarioOptions = {
  terrain?: Terrain | null;
  tr: ITransform;
  deltasForHelper: MapControlsDeltas;
  preZoomAroundLoc: LngLat;
  combinedEventsInProgress: EventsInProgress;
  panDelta?: Point;
};
declare class HandlerManager {
  _map: Map$1;
  _el: HTMLElement;
  _handlers: Array<{
    handlerName: string;
    handler: Handler;
    allowed: Array<string>;
  }>;
  _eventsInProgress: EventsInProgress;
  _frameId: number;
  _inertia: HandlerInertia;
  _bearingSnap: number;
  _handlersById: {
    [x: string]: Handler;
  };
  _updatingCamera: boolean;
  _changes: Array<[HandlerResult, EventsInProgress, {
    [handlerName: string]: Event$1;
  }]>;
  _terrainMovement: boolean;
  _zoom: {
    handlerName: string;
  };
  _previousActiveHandlers: {
    [x: string]: Handler;
  };
  _listeners: Array<[Window | Document | HTMLElement, string, {
    passive?: boolean;
    capture?: boolean;
  } | undefined]>;
  /**
   * @internal
   * The document that contains the map container element, for cross-window support.
   */
  get _ownerDocument(): Document;
  /**
   * @internal
   * The window that contains the map container element, for cross-window support.
   */
  get _ownerWindow(): Window;
  constructor(map: Map$1, options: CompleteMapOptions);
  destroy(): void;
  _addDefaultHandlers(options: CompleteMapOptions): void;
  _add(handlerName: string, handler: Handler, allowed?: Array<string>): void;
  stop(allowEndAnimation: boolean): void;
  isActive(): boolean;
  isZooming(): boolean;
  isRotating(): boolean;
  isMoving(): boolean;
  _blockedByActive(activeHandlers: {
    [x: string]: Handler;
  }, allowed: Array<string>, myName: string): boolean;
  handleWindowEvent: (e: {
    type: "mousemove" | "mouseup" | "touchmove";
  }) => void;
  _getMapTouches(touches: TouchList): TouchList;
  handleEvent: (e: Event$1, eventName?: keyof Handler) => void;
  mergeHandlerResult(mergedHandlerResult: HandlerResult, eventsInProgress: EventsInProgress, handlerResult: HandlerResult, name: string, e?: UIEvent): void;
  _applyChanges(): void;
  _updateMapTransform(combinedResult: HandlerResult, combinedEventsInProgress: EventsInProgress, deactivatedHandlers: {
    [handlerName: string]: Event$1;
  }): void;
  _handleMapControls({
    terrain,
    tr,
    deltasForHelper,
    preZoomAroundLoc,
    combinedEventsInProgress,
    panDelta
  }: MapControlsScenarioOptions): void;
  _fireEvents(newEventsInProgress: EventsInProgress, deactivatedHandlers: {
    [handlerName: string]: Event$1;
  }, allowEndAnimation: boolean): void;
  _fireEvent(type: string, e?: Event$1): void;
  _requestFrame(): number;
  _triggerRenderFrame(): void;
}
/**
 * A position definition for the control to be placed, can be in one of the corners of the map.
 * When two or more controls are places in the same location they are stacked toward the center of the map.
 */
type ControlPosition = "top-left" | "top-right" | "bottom-left" | "bottom-right";
/**
 * Interface for interactive controls added to the map. This is a
 * specification for implementers to model: it is not
 * an exported method or class.
 *
 * Controls must implement `onAdd` and `onRemove`, and must own an
 * element, which is often a `div` element. To use MapLibre GL JS's
 * default control styling, add the `maplibregl-ctrl` class to your control's
 * node.
 *
 * @example
 * ```ts
 * class HelloWorldControl: IControl {
 *     onAdd(map) {
 *         this._map = map;
 *         this._container = document.createElement('div');
 *         this._container.className = 'maplibregl-ctrl';
 *         this._container.textContent = 'Hello, world';
 *         return this._container;
 *     }
 *
 *     onRemove() {
 *         this._container.remove();
 *         this._map = undefined;
 *     }
 * }
 * ```
 */
interface IControl {
  /**
   * Register a control on the map and give it a chance to register event listeners
   * and resources. This method is called by {@link Map.addControl}
   * internally.
   *
   * @param map - the Map this control will be added to
   * @returns The control's container element. This should
   * be created by the control and returned by onAdd without being attached
   * to the DOM: the map will insert the control's element into the DOM
   * as necessary.
   */
  onAdd(map: Map$1): HTMLElement;
  /**
   * Unregister a control on the map and give it a chance to detach event listeners
   * and resources. This method is called by {@link Map.removeControl}
   * internally.
   *
   * @param map - the Map this control will be removed from
   */
  onRemove(map: Map$1): void;
  /**
   * Optionally provide a default position for this control. If this method
   * is implemented and {@link Map.addControl} is called without the `position`
   * parameter, the value returned by getDefaultPosition will be used as the
   * control's position.
   *
   * @returns a control position, one of the values valid in addControl.
   */
  readonly getDefaultPosition?: () => ControlPosition;
}
/**
 * An event from the mouse relevant to a specific layer.
 *
 * @group Event Related
 */
type MapLayerMouseEvent = MapMouseEvent & {
  features?: MapGeoJSONFeature[];
};
/**
 * An event from a touch device relevant to a specific layer.
 *
 * @group Event Related
 */
type MapLayerTouchEvent = MapTouchEvent & {
  features?: MapGeoJSONFeature[];
};
/**
 * The source event data type
 */
type MapSourceDataType = "content" | "metadata" | "visibility" | "idle";
/**
 * `MapLayerEventType` - a mapping between the event name and the event.
 * !!! note
 *     These events are compatible with the optional `layerId` parameter.
 * If `layerId` is included as the second argument in {@link Map.on}, the event listener will fire only when the
 * event action contains a visible portion of the specified layer.
 * The following example can be used for all the events.
 *
 * @group Event Related
 * @example
 * ```ts
 * // Initialize the map
 * let map = new Map({ // map options });
 * // Set an event listener for a specific layer
 * map.on('the-event-name', 'poi-label', (e) => {
 *   console.log('An event has occurred on a visible portion of the poi-label layer');
 * });
 * ```
 */
type MapLayerEventType = {
  /**
   * Fired when a pointing device (usually a mouse) is pressed and released contains a visible portion of the specified layer.
   *
   * @see [Measure distances](https://maplibre.org/maplibre-gl-js/docs/examples/measure-distances/)
   * @see [Center the map on a clicked symbol](https://maplibre.org/maplibre-gl-js/docs/examples/center-the-map-on-a-clicked-symbol/)
   */
  click: MapLayerMouseEvent;
  /**
   * Fired when a pointing device (usually a mouse) is pressed and released twice contains a visible portion of the specified layer.
   *
   * !!! note
   *     Under normal conditions, this event will be preceded by two `click` events.
   */
  dblclick: MapLayerMouseEvent;
  /**
   * Fired when a pointing device (usually a mouse) is pressed while inside a visible portion of the specified layer.
   * @see [Create a draggable point](https://maplibre.org/maplibre-gl-js/docs/examples/create-a-draggable-point/)
   */
  mousedown: MapLayerMouseEvent;
  /**
   * Fired when a pointing device (usually a mouse) is released while inside a visible portion of the specified layer.
   * @see [Create a draggable point](https://maplibre.org/maplibre-gl-js/docs/examples/create-a-draggable-point/)
   */
  mouseup: MapLayerMouseEvent;
  /**
   * Fired when a pointing device (usually a mouse) is moved while the cursor is inside a visible portion of the specified layer.
   * As you move the cursor across the layer, the event will fire every time the cursor changes position within that layer.
   *
   * @see [Get coordinates of the mouse pointer](https://maplibre.org/maplibre-gl-js/docs/examples/get-coordinates-of-the-mouse-pointer/)
   * @see [Highlight features under the mouse pointer](https://maplibre.org/maplibre-gl-js/docs/examples/create-a-hover-effect/)
   * @see [Display a popup on over](https://maplibre.org/maplibre-gl-js/docs/examples/display-a-popup-on-hover/)
   * @see [Animate symbol to follow the mouse](https://maplibre.org/maplibre-gl-js/docs/examples/animate-symbol-to-follow-the-mouse/)
   */
  mousemove: MapLayerMouseEvent;
  /**
   * Fired when a pointing device (usually a mouse) enters a visible portion of a specified layer from
   * outside that layer or outside the map canvas.
   *
   * @see [Center the map on a clicked symbol](https://maplibre.org/maplibre-gl-js/docs/examples/center-the-map-on-a-clicked-symbol/)
   * @see [Display a popup on click](https://maplibre.org/maplibre-gl-js/docs/examples/display-a-popup-on-click/)
   */
  mouseenter: MapLayerMouseEvent;
  /**
   * Fired when a pointing device (usually a mouse) leaves a visible portion of a specified layer, or leaves
   * the map canvas.
   *
   * @see [Highlight features under the mouse pointer](https://maplibre.org/maplibre-gl-js/docs/examples/create-a-hover-effect/)
   * @see [Display a popup on click](https://maplibre.org/maplibre-gl-js/docs/examples/display-a-popup-on-click/)
   */
  mouseleave: MapLayerMouseEvent;
  /**
   * Fired when a pointing device (usually a mouse) is moved inside a visible portion of the specified layer.
   *
   * @see [Get coordinates of the mouse pointer](https://maplibre.org/maplibre-gl-js/docs/examples/get-coordinates-of-the-mouse-pointer/)
   * @see [Highlight features under the mouse pointer](https://maplibre.org/maplibre-gl-js/docs/examples/create-a-hover-effect/)
   * @see [Display a popup on hover](https://maplibre.org/maplibre-gl-js/docs/examples/display-a-popup-on-hover/)
   */
  mouseover: MapLayerMouseEvent;
  /**
   * Fired when a point device (usually a mouse) leaves the visible portion of the specified layer.
   */
  mouseout: MapLayerMouseEvent;
  /**
   * Fired when the right button of the mouse is clicked or the context menu key is pressed within visible portion of the specified layer.
   */
  contextmenu: MapLayerMouseEvent;
  /**
   * Fired when a [`touchstart`](https://developer.mozilla.org/en-US/docs/Web/Events/touchstart) event occurs within the visible portion of the specified layer.
   * @see [Create a draggable point](https://maplibre.org/maplibre-gl-js/docs/examples/create-a-draggable-point/)
   */
  touchstart: MapLayerTouchEvent;
  /**
   * Fired when a [`touchend`](https://developer.mozilla.org/en-US/docs/Web/Events/touchend) event occurs within the visible portion of the specified layer.
   * @see [Create a draggable point](https://maplibre.org/maplibre-gl-js/docs/examples/create-a-draggable-point/)
   */
  touchend: MapLayerTouchEvent;
  /**
   * Fired when a [`touchstart`](https://developer.mozilla.org/en-US/docs/Web/Events/touchstart) event occurs within the visible portion of the specified layer.
   * @see [Create a draggable point](https://maplibre.org/maplibre-gl-js/docs/examples/create-a-draggable-point/)
   */
  touchcancel: MapLayerTouchEvent;
};
/**
 * `MapEventType` - a mapping between the event name and the event value.
 * These events are used with the {@link Map.on} method.
 * When using a `layerId` with {@link Map.on} method, please refer to {@link MapLayerEventType}.
 * The following example can be used for all the events.
 *
 * @group Event Related
 * @example
 * ```ts
 * // Initialize the map
 * let map = new Map({ // map options });
 * // Set an event listener
 * map.on('the-event-name', () => {
 *   console.log('An event has occurred!');
 * });
 * ```
 */
interface MapEventType {
  /**
   * Fired when an error occurs. This is GL JS's primary error reporting
   * mechanism. We use an event instead of `throw` to better accommodate
   * asynchronous operations. If no listeners are bound to the `error` event, the
   * error will be printed to the console.
   */
  error: ErrorEvent;
  /**
   * Fired immediately after all necessary resources have been downloaded
   * and the first visually complete rendering of the map has occurred.
   *
   * @see [Draw GeoJSON points](https://maplibre.org/maplibre-gl-js/docs/examples/draw-geojson-points/)
   * @see [Add live realtime data](https://maplibre.org/maplibre-gl-js/docs/examples/add-live-realtime-data/)
   * @see [Animate a point](https://maplibre.org/maplibre-gl-js/docs/examples/animate-a-point/)
   */
  load: MapLibreEvent;
  /**
   * Fired after the last frame rendered before the map enters an
   * "idle" state:
   *
   * - No camera transitions are in progress
   * - All currently requested tiles have loaded
   * - All fade/transition animations have completed
   */
  idle: MapLibreEvent;
  /**
   * Fired immediately after the map has been removed with {@link Map.remove}.
   */
  remove: MapLibreEvent;
  /**
   * Fired whenever the map is drawn to the screen, as the result of
   *
   * - a change to the map's position, zoom, pitch, or bearing
   * - a change to the map's style
   * - a change to a GeoJSON source
   * - the loading of a vector tile, GeoJSON file, glyph, or sprite
   */
  render: MapLibreEvent;
  /**
   * Fired immediately after the map has been resized.
   */
  resize: MapLibreEvent;
  /**
   * Fired when the WebGL context is lost.
   */
  webglcontextlost: MapContextEvent;
  /**
   * Fired when the WebGL context is restored.
   */
  webglcontextrestored: MapContextEvent;
  /**
   * Fired when any map data (style, source, tile, etc) begins loading or
   * changing asynchronously. All `dataloading` events are followed by a `data`,
   * `dataabort` or `error` event.
   */
  dataloading: MapDataEvent;
  /**
   * Fired when any map data loads or changes. See {@link MapDataEvent} for more information.
   * @see [Display HTML clusters with custom properties](https://maplibre.org/maplibre-gl-js/docs/examples/display-html-clusters-with-custom-properties/)
   */
  data: MapDataEvent;
  tiledataloading: MapDataEvent;
  /**
   * Fired when one of the map's sources begins loading or changing asynchronously.
   * All `sourcedataloading` events are followed by a `sourcedata`, `sourcedataabort` or `error` event.
   */
  sourcedataloading: MapSourceDataEvent;
  /**
   * Fired when the map's style begins loading or changing asynchronously.
   * All `styledataloading` events are followed by a `styledata`
   * or `error` event.
   */
  styledataloading: MapStyleDataEvent;
  /**
   * Fired when one of the map's sources loads or changes, including if a tile belonging
   * to a source loads or changes.
   */
  sourcedata: MapSourceDataEvent;
  /**
   * Fired when the map's style loads or changes.
   */
  styledata: MapStyleDataEvent;
  /**
   * Fired when an icon or pattern needed by the style is missing. The missing image can
   * be added with {@link Map.addImage} within this event listener callback to prevent the image from
   * being skipped. This event can be used to dynamically generate icons and patterns.
   * @see [Generate and add a missing icon to the map](https://maplibre.org/maplibre-gl-js/docs/examples/generate-and-add-a-missing-icon-to-the-map/)
   */
  styleimagemissing: MapStyleImageMissingEvent;
  /**
   * Fired when a request for one of the map's sources' tiles or data is aborted.
   */
  dataabort: MapDataEvent;
  /**
   * Fired when a request for one of the map's sources' data is aborted.
   */
  sourcedataabort: MapSourceDataEvent;
  /**
   * Fired when the user cancels a "box zoom" interaction, or when the bounding box does not meet the minimum size threshold.
   * See {@link BoxZoomHandler}.
   */
  boxzoomcancel: MapLibreZoomEvent;
  /**
   * Fired when a "box zoom" interaction starts. See {@link BoxZoomHandler}.
   */
  boxzoomstart: MapLibreZoomEvent;
  /**
   * Fired when a "box zoom" interaction ends.  See {@link BoxZoomHandler}.
   */
  boxzoomend: MapLibreZoomEvent;
  /**
   * Fired when a [`touchcancel`](https://developer.mozilla.org/en-US/docs/Web/Events/touchcancel) event occurs within the map.
   */
  touchcancel: MapTouchEvent;
  /**
   * Fired when a [`touchmove`](https://developer.mozilla.org/en-US/docs/Web/Events/touchmove) event occurs within the map.
   * @see [Create a draggable point](https://maplibre.org/maplibre-gl-js/docs/examples/create-a-draggable-point/)
   */
  touchmove: MapTouchEvent;
  /**
   * Fired when a [`touchend`](https://developer.mozilla.org/en-US/docs/Web/Events/touchend) event occurs within the map.
   * @see [Create a draggable point](https://maplibre.org/maplibre-gl-js/docs/examples/create-a-draggable-point/)
   */
  touchend: MapTouchEvent;
  /**
   * Fired when a [`touchstart`](https://developer.mozilla.org/en-US/docs/Web/Events/touchstart) event occurs within the map.
   * @see [Create a draggable point](https://maplibre.org/maplibre-gl-js/docs/examples/create-a-draggable-point/)
   */
  touchstart: MapTouchEvent;
  /**
   * Fired when a pointing device (usually a mouse) is pressed and released at the same point on the map.
   *
   * @see [Measure distances](https://maplibre.org/maplibre-gl-js/docs/examples/measure-distances/)
   * @see [Center the map on a clicked symbol](https://maplibre.org/maplibre-gl-js/docs/examples/center-the-map-on-a-clicked-symbol/)
   */
  click: MapMouseEvent;
  /**
   * Fired when the right button of the mouse is clicked or the context menu key is pressed within the map.
   */
  contextmenu: MapMouseEvent;
  /**
   * Fired when a pointing device (usually a mouse) is pressed and released twice at the same point on the map in rapid succession.
   *
   * !!! note
   *     Under normal conditions, this event will be preceded by two `click` events.
   */
  dblclick: MapMouseEvent;
  /**
   * Fired when a pointing device (usually a mouse) is moved while the cursor is inside the map.
   * As you move the cursor across the map, the event will fire every time the cursor changes position within the map.
   *
   * @see [Get coordinates of the mouse pointer](https://maplibre.org/maplibre-gl-js/docs/examples/get-coordinates-of-the-mouse-pointer/)
   * @see [Highlight features under the mouse pointer](https://maplibre.org/maplibre-gl-js/docs/examples/create-a-hover-effect/)
   * @see [Display a popup on over](https://maplibre.org/maplibre-gl-js/docs/examples/display-a-popup-on-hover/)
   */
  mousemove: MapMouseEvent;
  /**
   * Fired when a pointing device (usually a mouse) is released within the map.
   *
   * @see [Create a draggable point](https://maplibre.org/maplibre-gl-js/docs/examples/create-a-draggable-point/)
   */
  mouseup: MapMouseEvent;
  /**
   * Fired when a pointing device (usually a mouse) is pressed within the map.
   *
   * @see [Create a draggable point](https://maplibre.org/maplibre-gl-js/docs/examples/create-a-draggable-point/)
   */
  mousedown: MapMouseEvent;
  /**
   * Fired when a point device (usually a mouse) leaves the map's canvas.
   */
  mouseout: MapMouseEvent;
  /**
   * Fired when a pointing device (usually a mouse) is moved within the map.
   * As you move the cursor across a web page containing a map,
   * the event will fire each time it enters the map or any child elements.
   *
   * @see [Get coordinates of the mouse pointer](https://maplibre.org/maplibre-gl-js/docs/examples/get-coordinates-of-the-mouse-pointer/)
   * @see [Highlight features under the mouse pointer](https://maplibre.org/maplibre-gl-js/docs/examples/create-a-hover-effect/)
   * @see [Display a popup on hover](https://maplibre.org/maplibre-gl-js/docs/examples/display-a-popup-on-hover/)
   */
  mouseover: MapMouseEvent;
  /**
   * Fired just before the map begins a transition from one
   * view to another, as the result of either user interaction or methods such as {@link Map.jumpTo}.
   *
   */
  movestart: MapLibreEvent<MouseEvent | TouchEvent | WheelEvent | undefined>;
  /**
   * Fired repeatedly during an animated transition from one view to
   * another, as the result of either user interaction or methods such as {@link Map.flyTo}.
   *
   * @see [Display HTML clusters with custom properties](https://maplibre.org/maplibre-gl-js/docs/examples/display-html-clusters-with-custom-properties/)
   */
  move: MapLibreEvent<MouseEvent | TouchEvent | WheelEvent | undefined>;
  /**
   * Fired just after the map completes a transition from one
   * view to another, as the result of either user interaction or methods such as {@link Map.jumpTo}.
   *
   * @see [Display HTML clusters with custom properties](https://maplibre.org/maplibre-gl-js/docs/examples/display-html-clusters-with-custom-properties/)
   */
  moveend: MapLibreEvent<MouseEvent | TouchEvent | WheelEvent | undefined>;
  /**
   * Fired just before the map begins a transition from one zoom level to another,
   * as the result of either user interaction or methods such as {@link Map.flyTo}.
   */
  zoomstart: MapLibreEvent<MouseEvent | TouchEvent | WheelEvent | undefined>;
  /**
   * Fired repeatedly during an animated transition from one zoom level to another,
   * as the result of either user interaction or methods such as {@link Map.flyTo}.
   */
  zoom: MapLibreEvent<MouseEvent | TouchEvent | WheelEvent | undefined>;
  /**
   * Fired just after the map completes a transition from one zoom level to another,
   * as the result of either user interaction or methods such as {@link Map.flyTo}.
   */
  zoomend: MapLibreEvent<MouseEvent | TouchEvent | WheelEvent | undefined>;
  /**
   * Fired when a "drag to rotate" interaction starts. See {@link DragRotateHandler}.
   */
  rotatestart: MapLibreEvent<MouseEvent | TouchEvent | undefined>;
  /**
   * Fired repeatedly during a "drag to rotate" interaction. See {@link DragRotateHandler}.
   */
  rotate: MapLibreEvent<MouseEvent | TouchEvent | undefined>;
  /**
   * Fired when a "drag to rotate" interaction ends. See {@link DragRotateHandler}.
   */
  rotateend: MapLibreEvent<MouseEvent | TouchEvent | undefined>;
  /**
   * Fired when a "drag to pan" interaction starts. See {@link DragPanHandler}.
   */
  dragstart: MapLibreEvent<MouseEvent | TouchEvent | undefined>;
  /**
   * Fired repeatedly during a "drag to pan" interaction. See {@link DragPanHandler}.
   */
  drag: MapLibreEvent<MouseEvent | TouchEvent | undefined>;
  /**
   * Fired when a "drag to pan" interaction ends. See {@link DragPanHandler}.
   * @see [Create a draggable marker](https://maplibre.org/maplibre-gl-js/docs/examples/create-a-draggable-marker/)
   */
  dragend: MapLibreEvent<MouseEvent | TouchEvent | undefined>;
  /**
   * Fired whenever the map's pitch (tilt) begins a change as
   * the result of either user interaction or methods such as {@link Map.flyTo} .
   */
  pitchstart: MapLibreEvent<MouseEvent | TouchEvent | undefined>;
  /**
   * Fired repeatedly during the map's pitch (tilt) animation between
   * one state and another as the result of either user interaction
   * or methods such as {@link Map.flyTo}.
   */
  pitch: MapLibreEvent<MouseEvent | TouchEvent | undefined>;
  /**
   * Fired immediately after the map's pitch (tilt) finishes changing as
   * the result of either user interaction or methods such as {@link Map.flyTo}.
   */
  pitchend: MapLibreEvent<MouseEvent | TouchEvent | undefined>;
  /**
   * Fired when a [`wheel`](https://developer.mozilla.org/en-US/docs/Web/Events/wheel) event occurs within the map.
   */
  wheel: MapWheelEvent;
  /**
   * Fired when terrain is changed
   */
  terrain: MapTerrainEvent;
  /**
   * Fired whenever the cooperativeGestures option prevents a gesture from being handled by the map.
   * This is useful for showing your own UI when this happens.
   */
  cooperativegestureprevented: MapLibreEvent<WheelEvent | TouchEvent> & {
    gestureType: "wheel_zoom" | "touch_pan";
  };
  /**
   * Fired when map's projection is modified in other ways than by map being moved.
   */
  projectiontransition: MapProjectionEvent;
}
/**
 * The base event for MapLibre
 *
 * @group Event Related
 */
type MapLibreEvent<TOrig = unknown> = {
  type: keyof MapEventType | keyof MapLayerEventType;
  target: Map$1;
  originalEvent: TOrig;
};
/**
 * The style data event
 *
 * @group Event Related
 */
type MapStyleDataEvent = MapLibreEvent & {
  dataType: "style";
};
/**
 * The source data event interface
 *
 * @group Event Related
 */
type MapSourceDataEvent = MapLibreEvent & {
  dataType: "source";
  /**
   * True if the event has a `dataType` of `source` and the source has no outstanding network requests.
   */
  isSourceLoaded: boolean;
  /**
   * The [style spec representation of the source](https://maplibre.org/maplibre-style-spec/#sources) if the event has a `dataType` of `source`.
   */
  source: SourceSpecification;
  sourceId: string;
  sourceDataType: MapSourceDataType;
  sourceDataChanged?: boolean;
  /**
   * The tile being loaded or changed, if the event has a `dataType` of `source` and
   * the event is related to loading of a tile.
   */
  tile: any;
  /**
   * Options to determine whether a tile should be reloaded.
   * @internal
   */
  shouldReloadTileOptions: GeoJSONSourceShouldReloadTileOptions;
};
/**
 * `MapMouseEvent` is the event type for mouse-related map events.
 *
 * @group Event Related
 *
 * @example
 * ```ts
 * // The `click` event is an example of a `MapMouseEvent`.
 * // Set up an event listener on the map.
 * map.on('click', (e) => {
 *   // The event object (e) contains information like the
 *   // coordinates of the point on the map that was clicked.
 *   console.log('A click event has occurred at ' + e.lngLat);
 * });
 * ```
 */
declare class MapMouseEvent extends Event$1 implements MapLibreEvent<MouseEvent> {
  /**
   * The event type
   */
  type: "mousedown" | "mouseup" | "click" | "dblclick" | "mousemove" | "mouseover" | "mouseenter" | "mouseleave" | "mouseout" | "contextmenu";
  /**
   * The `Map` object that fired the event.
   */
  target: Map$1;
  /**
   * The DOM event which caused the map event.
   */
  originalEvent: MouseEvent;
  /**
   * The pixel coordinates of the mouse cursor, relative to the map and measured from the top left corner.
   */
  point: Point;
  /**
   * The geographic location on the map of the mouse cursor.
   */
  lngLat: LngLat;
  /**
   * Prevents subsequent default processing of the event by the map.
   *
   * Calling this method will prevent the following default map behaviors:
   *
   *   * On `mousedown` events, the behavior of {@link DragPanHandler}
   *   * On `mousedown` events, the behavior of {@link DragRotateHandler}
   *   * On `mousedown` events, the behavior of {@link BoxZoomHandler}
   *   * On `dblclick` events, the behavior of {@link DoubleClickZoomHandler}
   *
   */
  preventDefault(): void;
  /**
   * `true` if `preventDefault` has been called.
   */
  get defaultPrevented(): boolean;
  _defaultPrevented: boolean;
  constructor(type: string, map: Map$1, originalEvent: MouseEvent, data?: any);
}
/**
 * `MapTouchEvent` is the event type for touch-related map events.
 *
 * @group Event Related
 */
declare class MapTouchEvent extends Event$1 implements MapLibreEvent<TouchEvent> {
  /**
   * The event type.
   */
  type: "touchstart" | "touchmove" | "touchend" | "touchcancel";
  /**
   * The `Map` object that fired the event.
   */
  target: Map$1;
  /**
   * The DOM event which caused the map event.
   */
  originalEvent: TouchEvent;
  /**
   * The geographic location on the map of the center of the touch event points.
   */
  lngLat: LngLat;
  /**
   * The pixel coordinates of the center of the touch event points, relative to the map and measured from the top left
   * corner.
   */
  point: Point;
  /**
   * The array of pixel coordinates corresponding to a
   * [touch event's `touches`](https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent/touches) property.
   */
  points: Array<Point>;
  /**
   * The geographical locations on the map corresponding to a
   * [touch event's `touches`](https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent/touches) property.
   */
  lngLats: Array<LngLat>;
  /**
   * Prevents subsequent default processing of the event by the map.
   *
   * Calling this method will prevent the following default map behaviors:
   *
   *   * On `touchstart` events, the behavior of {@link DragPanHandler}
   *   * On `touchstart` events, the behavior of {@link TwoFingersTouchZoomRotateHandler}
   *
   */
  preventDefault(): void;
  /**
   * `true` if `preventDefault` has been called.
   */
  get defaultPrevented(): boolean;
  _defaultPrevented: boolean;
  constructor(type: string, map: Map$1, originalEvent: TouchEvent);
}
/**
 * `MapWheelEvent` is the event type for the `wheel` map event.
 *
 * @group Event Related
 */
declare class MapWheelEvent extends Event$1 {
  /**
   * The event type.
   */
  type: "wheel";
  /**
   * The `Map` object that fired the event.
   */
  target: Map$1;
  /**
   * The DOM event which caused the map event.
   */
  originalEvent: WheelEvent;
  /**
   * Prevents subsequent default processing of the event by the map.
   *
   * Calling this method will prevent the behavior of {@link ScrollZoomHandler}.
   */
  preventDefault(): void;
  /**
   * `true` if `preventDefault` has been called.
   */
  get defaultPrevented(): boolean;
  _defaultPrevented: boolean;
  /** */
  constructor(type: string, map: Map$1, originalEvent: WheelEvent);
}
/**
 * A `MapLibreZoomEvent` is the event type for the boxzoom-related map events emitted by the {@link BoxZoomHandler}.
 *
 * @group Event Related
 */
type MapLibreZoomEvent = {
  /**
   * The type of boxzoom event. One of `boxzoomstart`, `boxzoomend` or `boxzoomcancel`
   */
  type: "boxzoomstart" | "boxzoomend" | "boxzoomcancel";
  /**
   * The `Map` instance that triggered the event
   */
  target: Map$1;
  /**
   * The DOM event that triggered the boxzoom event. Can be a `MouseEvent` or `KeyboardEvent`
   */
  originalEvent: MouseEvent;
};
/**
 * A `MapDataEvent` object is emitted with the `data`
 * and `dataloading` events. Possible values for
 * `dataType`s are:
 *
 * - `'source'`: The non-tile data associated with any source
 * - `'style'`: The [style](https://maplibre.org/maplibre-style-spec/) used by the map
 *
 * Possible values for `sourceDataType`s are:
 *
 * - `'metadata'`: indicates that any necessary source metadata has been loaded (such as TileJSON) and it is ok to start loading tiles
 * - `'content'`: indicates the source data has changed (such as when source.setData() has been called on GeoJSONSource)
 * - `'visibility'`: send when the source becomes used when at least one of its layers becomes visible in style sense (inside the layer's zoom range and with layout.visibility set to 'visible')
 * - `'idle'`: indicates that no new source data has been fetched (but the source has done loading)
 *
 * @group Event Related
 *
 * @example
 * ```ts
 * // The sourcedata event is an example of MapDataEvent.
 * // Set up an event listener on the map.
 * map.on('sourcedata', (e) => {
 *    if (e.isSourceLoaded) {
 *        // Do something when the source has finished loading
 *    }
 * });
 * ```
 */
type MapDataEvent = {
  /**
   * The event type.
   */
  type: string;
  /**
   * The type of data that has changed. One of `'source'`, `'style'`.
   */
  dataType: string;
  /**
   *  Included if the event has a `dataType` of `source` and the event signals that internal data has been received or changed. Possible values are `metadata`, `content`, `visibility` and `idle`.
   */
  sourceDataType: MapSourceDataType;
};
/**
 * The terrain event
 *
 * @group Event Related
 */
type MapTerrainEvent = {
  type: "terrain";
};
/**
 * The map projection event
 *
 * @group Event Related
 */
type MapProjectionEvent = {
  type: "projectiontransition";
  /**
   * Specifies the name of the new projection.
   * For example:
   *
   *  - `globe` to describe globe that has internally switched to mercator
   *  - `vertical-perspective` to describe a globe that doesn't change to mercator
   *  - `mercator` to describe mercator projection
   */
  newProjection: ProjectionSpecification["type"];
};
/**
 * An event related to the web gl context
 *
 * @group Event Related
 */
type MapContextEvent = {
  type: "webglcontextlost" | "webglcontextrestored";
  originalEvent: WebGLContextEvent;
};
/**
 * The style image missing event
 *
 * @group Event Related
 *
 * @see [Generate and add a missing icon to the map](https://maplibre.org/maplibre-gl-js/docs/examples/generate-and-add-a-missing-icon-to-the-map/)
 */
type MapStyleImageMissingEvent = MapLibreEvent & {
  type: "styleimagemissing";
  id: string;
};
/**
 * The {@link AttributionControl} options object
 */
type AttributionControlOptions = {
  /**
   * If `true`, the attribution control will always collapse when moving the map. If `false`,
   * force the expanded attribution control. The default is a responsive attribution that collapses when the user moves the map on maps less than 640 pixels wide.
   * **Attribution should not be collapsed if it can comfortably fit on the map. `compact` should only be used to modify default attribution when map size makes it impossible to fit default attribution and when the automatic compact resizing for default settings are not sufficient.**
   */
  compact?: boolean;
  /**
   * Attributions to show in addition to any other attributions.
   */
  customAttribution?: string | Array<string>;
};
declare const defaultLocale: {
  "AttributionControl.ToggleAttribution": string;
  "AttributionControl.MapFeedback": string;
  "FullscreenControl.Enter": string;
  "FullscreenControl.Exit": string;
  "GeolocateControl.FindMyLocation": string;
  "GeolocateControl.LocationNotAvailable": string;
  "LogoControl.Title": string;
  "Map.Title": string;
  "Marker.Title": string;
  "NavigationControl.ResetBearing": string;
  "NavigationControl.ZoomIn": string;
  "NavigationControl.ZoomOut": string;
  "Popup.Close": string;
  "ScaleControl.Feet": string;
  "ScaleControl.Meters": string;
  "ScaleControl.Kilometers": string;
  "ScaleControl.Miles": string;
  "ScaleControl.NauticalMiles": string;
  "GlobeControl.Enable": string;
  "GlobeControl.Disable": string;
  "TerrainControl.Enable": string;
  "TerrainControl.Disable": string;
  "CooperativeGesturesHandler.WindowsHelpText": string;
  "CooperativeGesturesHandler.MacHelpText": string;
  "CooperativeGesturesHandler.MobileHelpText": string;
};
declare class TransformProvider {
  _map: Map$1;
  constructor(map: Map$1);
  get transform(): IReadonlyTransform;
  get center(): {
    lng: number;
    lat: number;
  };
  get zoom(): number;
  get pitch(): number;
  get bearing(): number;
  unproject(point: PointLike): LngLat;
}
/**
 * An options object sent to the enable function of some of the handlers
 */
type AroundCenterOptions = {
  /**
   * If "center" is passed, map will zoom around the center of map
   */
  around: "center";
};
declare abstract class TwoFingersTouchHandler implements Handler {
  _enabled?: boolean;
  _active?: boolean;
  _firstTwoTouches?: [number, number];
  _vector?: Point;
  _startVector?: Point;
  _aroundCenter?: boolean;
  /** @internal */
  constructor();
  reset(): void;
  abstract _start(points: [Point, Point]): void;
  abstract _move(points: [Point, Point], pinchAround: Point | null, e: TouchEvent): HandlerResult | void;
  touchstart(e: TouchEvent, points: Array<Point>, mapTouches: Array<Touch>): void;
  touchmove(e: TouchEvent, points: Array<Point>, mapTouches: Array<Touch>): HandlerResult | void;
  touchend(e: TouchEvent, points: Array<Point>, mapTouches: Array<Touch>): void;
  touchcancel(): void;
  /**
   * Enables the "drag to pitch" interaction.
   *
   * @example
   * ```ts
   * map.touchPitch.enable();
   * ```
   */
  enable(options?: AroundCenterOptions | boolean | null): void;
  /**
   * Disables the "drag to pitch" interaction.
   *
   * @example
   * ```ts
   * map.touchPitch.disable();
   * ```
   */
  disable(): void;
  /**
   * Returns a Boolean indicating whether the "drag to pitch" interaction is enabled.
   *
   * @returns  `true` if the "drag to pitch" interaction is enabled.
   */
  isEnabled(): boolean;
  /**
   * Returns a Boolean indicating whether the "drag to pitch" interaction is active, i.e. currently being used.
   *
   * @returns `true` if the "drag to pitch" interaction is active.
   */
  isActive(): boolean;
}
/**
 * The `TwoFingersTouchHandler`s allows the user to zoom the map two fingers
 *
 * @group Handlers
 */
declare class TwoFingersTouchZoomHandler extends TwoFingersTouchHandler {
  _distance?: number;
  _startDistance?: number;
  reset(): void;
  _start(points: [Point, Point]): void;
  _move(points: [Point, Point], pinchAround: Point | null): HandlerResult | void;
}
/**
 * The `TwoFingersTouchHandler`s allows the user to rotate the map two fingers
 *
 * @group Handlers
 */
declare class TwoFingersTouchRotateHandler extends TwoFingersTouchHandler {
  _minDiameter?: number;
  reset(): void;
  _start(points: [Point, Point]): void;
  _move(points: [Point, Point], pinchAround: Point | null, _e: TouchEvent): HandlerResult | void;
  _isBelowThreshold(vector: Point): boolean;
}
/**
 * The `TwoFingersTouchPitchHandler` allows the user to pitch the map by dragging up and down with two fingers.
 *
 * @group Handlers
 */
declare class TwoFingersTouchPitchHandler extends TwoFingersTouchHandler {
  _valid?: boolean;
  _firstMove?: number;
  _lastPoints?: [Point, Point];
  _map: Map$1;
  _currentTouchCount: number;
  constructor(map: Map$1);
  reset(): void;
  touchstart(e: TouchEvent, points: Array<Point>, mapTouches: Array<Touch>): void;
  _start(points: [Point, Point]): void;
  _move(points: [Point, Point], center: Point | null, e: TouchEvent): HandlerResult | void;
  gestureBeginsVertically(vectorA: Point, vectorB: Point, timeStamp: number): boolean | undefined;
}
/**
 * The `ScrollZoomHandler` allows the user to zoom the map by scrolling.
 *
 * @group Handlers
 */
declare class ScrollZoomHandler implements Handler {
  _map: Map$1;
  _tr: TransformProvider;
  _enabled: boolean;
  _active: boolean;
  _zooming: boolean;
  _aroundCenter: boolean;
  _aroundPoint: Point;
  _type: "wheel" | "trackpad" | null;
  _lastValue: number;
  _timeout: ReturnType<typeof setTimeout>;
  _finishTimeout: ReturnType<typeof setTimeout>;
  _lastWheelEvent: any;
  _lastWheelEventTime: number;
  _lastExpectedZoom: number;
  _startZoom: number;
  _targetZoom: number;
  _delta: number;
  _easing: ((a: number) => number);
  _prevEase: {
    start: number;
    duration: number;
    easing: (_: number) => number;
  };
  _frameId: boolean;
  _triggerRenderFrame: () => void;
  _defaultZoomRate: number;
  _wheelZoomRate: number;
  /** @internal */
  constructor(map: Map$1, triggerRenderFrame: () => void);
  /**
   * Set the zoom rate of a trackpad
   * @param zoomRate - 1/100 The rate used to scale trackpad movement to a zoom value.
   * @example
   * Speed up trackpad zoom
   * ```ts
   * map.scrollZoom.setZoomRate(1/25);
   * ```
   */
  setZoomRate(zoomRate: number): void;
  /**
   * Set the zoom rate of a mouse wheel
   * @param wheelZoomRate - 1/450 The rate used to scale mouse wheel movement to a zoom value.
   * @example
   * Slow down zoom of mouse wheel
   * ```ts
   * map.scrollZoom.setWheelZoomRate(1/600);
   * ```
   */
  setWheelZoomRate(wheelZoomRate: number): void;
  /**
   * Returns a Boolean indicating whether the "scroll to zoom" interaction is enabled.
   * @returns `true` if the "scroll to zoom" interaction is enabled.
   */
  isEnabled(): boolean;
  isActive(): boolean;
  isZooming(): boolean;
  /**
   * Enables the "scroll to zoom" interaction.
   *
   * @param options - Options object.
   * @example
   * ```ts
   * map.scrollZoom.enable();
   * map.scrollZoom.enable({ around: 'center' })
   * ```
   */
  enable(options?: AroundCenterOptions | boolean): void;
  /**
   * Disables the "scroll to zoom" interaction.
   *
   * @example
   * ```ts
   * map.scrollZoom.disable();
   * ```
   */
  disable(): void;
  /**
   * Determines whether or not the gesture is blocked due to cooperativeGestures.
   */
  _shouldBePrevented(e: WheelEvent): boolean;
  wheel(e: WheelEvent): void;
  _onTimeout: (initialEvent: MouseEvent) => void;
  _start(e: MouseEvent): void;
  renderFrame(): {
    noInertia: boolean;
    needsRenderFrame: boolean;
    zoomDelta: number;
    around: Point;
    originalEvent: any;
  };
  _smoothOutEasing(duration: number): (t: number) => number;
  reset(): void;
}
/**
 * Callback for customizing what happens when a box zoom gesture ends.
 */
type BoxZoomEndHandler = (map: Map$1, startPos: Point, endPos: Point, originalEvent: MouseEvent) => void;
/**
 * A {@link BoxZoomHandler} options object.
 */
type BoxZoomHandlerOptions = {
  /**
   * A callback that runs when the user completes the Shift-drag box gesture.
   * Providing this callback suppresses the default fit-to-box zoom behavior.
   */
  boxZoomEnd?: BoxZoomEndHandler;
};
/**
 * The `BoxZoomHandler` allows the user to zoom the map to fit within a bounding box.
 * The bounding box is defined by clicking and holding `shift` while dragging the cursor.
 *
 * @group Handlers
 */
declare class BoxZoomHandler implements Handler {
  _map: Map$1;
  _tr: TransformProvider;
  _el: HTMLElement;
  _container: HTMLElement;
  _enabled: boolean;
  _active: boolean;
  _startPos: Point;
  _lastPos: Point;
  _box: HTMLElement;
  _clickTolerance: number;
  _boxZoomEnd?: BoxZoomEndHandler;
  /** @internal */
  constructor(map: Map$1, options: {
    clickTolerance: number;
    boxZoom?: boolean | BoxZoomHandlerOptions;
  });
  /**
   * Returns a Boolean indicating whether the "box zoom" interaction is enabled.
   *
   * @returns `true` if the "box zoom" interaction is enabled.
   */
  isEnabled(): boolean;
  /**
   * Returns a Boolean indicating whether the "box zoom" interaction is active, i.e. currently being used.
   *
   * @returns `true` if the "box zoom" interaction is active.
   */
  isActive(): boolean;
  /**
   * Enables the "box zoom" interaction.
   *
   * @example
   * ```ts
   * map.boxZoom.enable();
   * ```
   */
  enable(): void;
  /**
   * Disables the "box zoom" interaction.
   *
   * @example
   * ```ts
   * map.boxZoom.disable();
   * ```
   */
  disable(): void;
  mousedown(e: MouseEvent, point: Point): void;
  mousemoveWindow(e: MouseEvent, point: Point): void;
  mouseupWindow(e: MouseEvent, point: Point): {
    cameraAnimation: (map: any) => any;
  };
  keydown(e: KeyboardEvent): void;
  reset(): void;
  _fireEvent(type: string, e: any): Map$1;
}
type DragRotateHandlerOptions = {
  /**
   * Control the map pitch in addition to the bearing
   * @defaultValue true
   */
  pitchWithRotate: boolean;
  /**
   * Control the map roll in addition to the bearing
   * @defaultValue false
   */
  rollEnabled: boolean;
};
/**
 * The `DragRotateHandler` allows the user to rotate the map by clicking and
 * dragging the cursor while holding the right mouse button or `ctrl` key.
 *
 * @group Handlers
 */
declare class DragRotateHandler {
  _mouseRotate: MouseRotateHandler;
  _mousePitch: MousePitchHandler;
  _mouseRoll: MouseRollHandler;
  _pitchWithRotate: boolean;
  _rollEnabled: boolean;
  /** @internal */
  constructor(options: DragRotateHandlerOptions, mouseRotate: MouseRotateHandler, mousePitch: MousePitchHandler, mouseRoll: MouseRollHandler);
  /**
   * Enables the "drag to rotate" interaction.
   *
   * @example
   * ```ts
   * map.dragRotate.enable();
   * ```
   */
  enable(): void;
  /**
   * Disables the "drag to rotate" interaction.
   *
   * @example
   * ```ts
   * map.dragRotate.disable();
   * ```
   */
  disable(): void;
  /**
   * Returns a Boolean indicating whether the "drag to rotate" interaction is enabled.
   *
   * @returns `true` if the "drag to rotate" interaction is enabled.
   */
  isEnabled(): boolean;
  /**
   * Returns a Boolean indicating whether the "drag to rotate" interaction is active, i.e. currently being used.
   *
   * @returns `true` if the "drag to rotate" interaction is active.
   */
  isActive(): boolean;
}
/**
 * The {@link CooperativeGesturesHandler} options object for the gesture settings
 */
type GestureOptions = boolean;
/**
 * A `CooperativeGestureHandler` is a control that adds cooperative gesture info when user tries to zoom in/out.
 *
 * When the CooperativeGestureHandler blocks a gesture, it will emit a `cooperativegestureprevented` event.
 *
 * @group Handlers
 *
 * @example
 * ```ts
 * const map = new Map({
 *   cooperativeGestures: true
 * });
 * ```
 * @see [Example: cooperative gestures](https://maplibre.org/maplibre-gl-js/docs/examples/cooperative-gestures/)
 **/
declare class CooperativeGesturesHandler implements Handler {
  _options: GestureOptions;
  _map: Map$1;
  _container: HTMLElement;
  /**
   * This is the key that will allow to bypass the cooperative gesture protection
   */
  _bypassKey: "metaKey" | "ctrlKey";
  _enabled: boolean;
  constructor(map: Map$1, options: GestureOptions);
  isActive(): boolean;
  reset(): void;
  _setupUI(): void;
  _destroyUI(): void;
  enable(): void;
  disable(): void;
  isEnabled(): boolean;
  isBypassed(event: MouseEvent | WheelEvent | PointerEvent): boolean;
  notifyGestureBlocked(gestureType: "wheel_zoom" | "touch_pan", originalEvent: Event$1): void;
}
/**
 * The `KeyboardHandler` allows the user to zoom, rotate, and pan the map using
 * the following keyboard shortcuts:
 *
 * - `=` / `+`: Increase the zoom level by 1.
 * - `Shift-=` / `Shift-+`: Increase the zoom level by 2.
 * - `-`: Decrease the zoom level by 1.
 * - `Shift--`: Decrease the zoom level by 2.
 * - Arrow keys: Pan by 100 pixels.
 * - `Shift+⇢`: Increase the rotation by 15 degrees.
 * - `Shift+⇠`: Decrease the rotation by 15 degrees.
 * - `Shift+⇡`: Increase the pitch by 10 degrees.
 * - `Shift+⇣`: Decrease the pitch by 10 degrees.
 *
 * @group Handlers
 */
declare class KeyboardHandler implements Handler {
  _tr: TransformProvider;
  _enabled: boolean;
  _active: boolean;
  _panStep: number;
  _bearingStep: number;
  _pitchStep: number;
  _rotationDisabled: boolean;
  /** @internal */
  constructor(map: Map$1);
  reset(): void;
  keydown(e: KeyboardEvent): {
    cameraAnimation: (map: Map$1) => void;
  };
  /**
   * Enables the "keyboard rotate and zoom" interaction.
   *
   * @example
   * ```ts
   * map.keyboard.enable();
   * ```
   */
  enable(): void;
  /**
   * Disables the "keyboard rotate and zoom" interaction.
   *
   * @example
   * ```ts
   * map.keyboard.disable();
   * ```
   */
  disable(): void;
  /**
   * Returns a Boolean indicating whether the "keyboard rotate and zoom"
   * interaction is enabled.
   *
   * @returns `true` if the "keyboard rotate and zoom"
   * interaction is enabled.
   */
  isEnabled(): boolean;
  /**
   * Returns true if the handler is enabled and has detected the start of a
   * zoom/rotate gesture.
   *
   * @returns `true` if the handler is enabled and has detected the
   * start of a zoom/rotate gesture.
   */
  isActive(): boolean;
  /**
   * Disables the "keyboard pan/rotate" interaction, leaving the
   * "keyboard zoom" interaction enabled.
   *
   * @example
   * ```ts
   * map.keyboard.disableRotation();
   * ```
   */
  disableRotation(): void;
  /**
   * Enables the "keyboard pan/rotate" interaction.
   *
   * @example
   * ```ts
   * map.keyboard.enable();
   * map.keyboard.enableRotation();
   * ```
   */
  enableRotation(): void;
}
declare class ClickZoomHandler implements Handler {
  _tr: TransformProvider;
  _enabled: boolean;
  _active: boolean;
  /** @internal */
  constructor(map: Map$1);
  reset(): void;
  dblclick(e: MouseEvent, point: Point): {
    cameraAnimation: (map: Map$1) => void;
  };
  enable(): void;
  disable(): void;
  isEnabled(): boolean;
  isActive(): boolean;
}
declare class SingleTapRecognizer {
  numTouches: number;
  centroid: Point;
  startTime: number;
  aborted: boolean;
  touches: { [k in number | string]: Point };
  constructor(options: {
    numTouches: number;
  });
  reset(): void;
  touchstart(e: TouchEvent, points: Array<Point>, mapTouches: Array<Touch>): void;
  touchmove(e: TouchEvent, points: Array<Point>, mapTouches: Array<Touch>): void;
  touchend(e: TouchEvent, points: Array<Point>, mapTouches: Array<Touch>): Point;
}
declare class TapRecognizer {
  singleTap: SingleTapRecognizer;
  numTaps: number;
  lastTime: number;
  lastTap: Point;
  count: number;
  constructor(options: {
    numTaps: number;
    numTouches: number;
  });
  reset(): void;
  touchstart(e: TouchEvent, points: Array<Point>, mapTouches: Array<Touch>): void;
  touchmove(e: TouchEvent, points: Array<Point>, mapTouches: Array<Touch>): void;
  touchend(e: TouchEvent, points: Array<Point>, mapTouches: Array<Touch>): Point;
}
declare class TapZoomHandler implements Handler {
  _tr: TransformProvider;
  _enabled: boolean;
  _active: boolean;
  _zoomIn: TapRecognizer;
  _zoomOut: TapRecognizer;
  constructor(map: Map$1);
  reset(): void;
  touchstart(e: TouchEvent, points: Array<Point>, mapTouches: Array<Touch>): void;
  touchmove(e: TouchEvent, points: Array<Point>, mapTouches: Array<Touch>): void;
  touchend(e: TouchEvent, points: Array<Point>, mapTouches: Array<Touch>): {
    cameraAnimation: (map: Map$1) => Map$1;
  };
  touchcancel(): void;
  enable(): void;
  disable(): void;
  isEnabled(): boolean;
  isActive(): boolean;
}
/**
 * The `DoubleClickZoomHandler` allows the user to zoom the map at a point by
 * double clicking or double tapping.
 *
 * @group Handlers
 */
declare class DoubleClickZoomHandler {
  _clickZoom: ClickZoomHandler;
  _tapZoom: TapZoomHandler;
  /** @internal */
  constructor(clickZoom: ClickZoomHandler, TapZoom: TapZoomHandler);
  /**
   * Enables the "double click to zoom" interaction.
   *
   * @example
   * ```ts
   * map.doubleClickZoom.enable();
   * ```
   */
  enable(): void;
  /**
   * Disables the "double click to zoom" interaction.
   *
   * @example
   * ```ts
   * map.doubleClickZoom.disable();
   * ```
   */
  disable(): void;
  /**
   * Returns a Boolean indicating whether the "double click to zoom" interaction is enabled.
   *
   * @returns `true` if the "double click to zoom" interaction is enabled.
   */
  isEnabled(): boolean;
  /**
   * Returns a Boolean indicating whether the "double click to zoom" interaction is active, i.e. currently being used.
   *
   * @returns `true` if the "double click to zoom" interaction is active.
   */
  isActive(): boolean;
}
declare class TapDragZoomHandler implements Handler {
  _enabled: boolean;
  _active: boolean;
  _swipePoint: Point;
  _swipeTouch: number;
  _tapTime: number;
  _tapPoint: Point;
  _tap: TapRecognizer;
  constructor();
  reset(): void;
  touchstart(e: TouchEvent, points: Array<Point>, mapTouches: Array<Touch>): void;
  touchmove(e: TouchEvent, points: Array<Point>, mapTouches: Array<Touch>): {
    zoomDelta: number;
  };
  touchend(e: TouchEvent, points: Array<Point>, mapTouches: Array<Touch>): void;
  touchcancel(): void;
  enable(): void;
  disable(): void;
  isEnabled(): boolean;
  isActive(): boolean;
}
/**
 * The `TwoFingersTouchZoomRotateHandler` allows the user to zoom and rotate the map by
 * pinching on a touchscreen.
 *
 * They can zoom with one finger by double tapping and dragging. On the second tap,
 * hold the finger down and drag up or down to zoom in or out.
 *
 * @group Handlers
 */
declare class TwoFingersTouchZoomRotateHandler {
  _el: HTMLElement;
  _touchZoom: TwoFingersTouchZoomHandler;
  _touchRotate: TwoFingersTouchRotateHandler;
  _tapDragZoom: TapDragZoomHandler;
  _rotationDisabled: boolean;
  _enabled: boolean;
  /** @internal */
  constructor(el: HTMLElement, touchZoom: TwoFingersTouchZoomHandler, touchRotate: TwoFingersTouchRotateHandler, tapDragZoom: TapDragZoomHandler);
  /**
   * Enables the "pinch to rotate and zoom" interaction.
   *
   * @param options - Options object.
   *
   * @example
   * ```ts
   * map.touchZoomRotate.enable();
   * map.touchZoomRotate.enable({ around: 'center' });
   * ```
   */
  enable(options?: AroundCenterOptions | boolean | null): void;
  /**
   * Disables the "pinch to rotate and zoom" interaction.
   *
   * @example
   * ```ts
   * map.touchZoomRotate.disable();
   * ```
   */
  disable(): void;
  /**
   * Returns a Boolean indicating whether the "pinch to rotate and zoom" interaction is enabled.
   *
   * @returns `true` if the "pinch to rotate and zoom" interaction is enabled.
   */
  isEnabled(): boolean;
  /**
   * Returns true if the handler is enabled and has detected the start of a zoom/rotate gesture.
   *
   * @returns `true` if the handler is active, `false` otherwise
   */
  isActive(): boolean;
  /**
   * Disables the "pinch to rotate" interaction, leaving the "pinch to zoom"
   * interaction enabled.
   *
   * @example
   * ```ts
   * map.touchZoomRotate.disableRotation();
   * ```
   */
  disableRotation(): void;
  /**
   * Enables the "pinch to rotate" interaction.
   *
   * @example
   * ```ts
   * map.touchZoomRotate.enable();
   * map.touchZoomRotate.enableRotation();
   * ```
   */
  enableRotation(): void;
}
type WebGLSupportedVersions = "webgl2" | "webgl" | undefined;
type WebGLContextAttributesWithType = WebGLContextAttributes & {
  contextType?: WebGLSupportedVersions;
};
/**
 * The {@link Map} options object.
 */
type MapOptions = {
  /**
   * If `true`, the map's position (zoom, center latitude, center longitude, bearing, and pitch) will be synced with the hash fragment of the page's URL.
   * For example, `http://path/to/my/page.html#2.59/39.26/53.07/-24.1/60`.
   * An additional string may optionally be provided to indicate a parameter-styled hash,
   * e.g. http://path/to/my/page.html#map=2.59/39.26/53.07/-24.1/60&foo=bar, where foo
   * is a custom parameter and bar is an arbitrary hash distinct from the map hash.
   * @defaultValue false
   */
  hash?: boolean | string;
  /**
   * If `false`, no mouse, touch, or keyboard listeners will be attached to the map, so it will not respond to interaction.
   * @defaultValue true
   */
  interactive?: boolean;
  /**
   * The HTML element in which MapLibre GL JS will render the map, or the element's string `id`. The specified element must have no children.
   */
  container: HTMLElement | string;
  /**
   * The threshold, measured in degrees, that determines when the map's
   * bearing will snap to north. For example, with a `bearingSnap` of 7, if the user rotates
   * the map within 7 degrees of north, the map will automatically snap to exact north.
   * @defaultValue 7
   */
  bearingSnap?: number;
  /**
   * The step increment the zoom level will snap to.
   * For example, if `zoomSnap` is 1, the map will snap to whole integers during discrete zoom operations.
   * If set to 0, zooming is continuous.
   * @defaultValue 0
   */
  zoomSnap?: number;
  /**
   * If set, an {@link AttributionControl} will be added to the map with the provided options.
   * To disable the attribution control, pass `false`.
   * !!! note
   *     Showing the logo of MapLibre is not required for using MapLibre.
   * @defaultValue compact: true, customAttribution: "MapLibre ...".
   */
  attributionControl?: false | AttributionControlOptions;
  /**
   * If `true`, the MapLibre logo will be shown.
   */
  maplibreLogo?: boolean;
  /**
   * A string representing the position of the MapLibre wordmark on the map. Valid options are `top-left`,`top-right`, `bottom-left`, or `bottom-right`.
   * @defaultValue 'bottom-left'
   */
  logoPosition?: ControlPosition;
  /**
   * Set of WebGLContextAttributes that are applied to the WebGL context of the map.
   * See https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext for more details.
   * `contextType` can be set to `webgl2` or `webgl` to force a WebGL version. Not setting it, Maplibre will do it's best to get a suitable context.
   * @defaultValue antialias: false, powerPreference: 'high-performance', preserveDrawingBuffer: false, failIfMajorPerformanceCaveat: false, desynchronized: false, contextType: 'webgl2withfallback'
   */
  canvasContextAttributes?: WebGLContextAttributesWithType;
  /**
   * If `false`, the map won't attempt to re-request tiles once they expire per their HTTP `cacheControl`/`expires` headers.
   * @defaultValue true
   */
  refreshExpiredTiles?: boolean;
  /**
   * If set, the map will be constrained to the given bounds.
   */
  maxBounds?: LngLatBoundsLike;
  /**
   * If `true`, the "scroll to zoom" interaction is enabled. {@link AroundCenterOptions} are passed as options to {@link ScrollZoomHandler.enable}.
   * @defaultValue true
   */
  scrollZoom?: boolean | AroundCenterOptions;
  /**
   * The minimum zoom level of the map (0-24).
   * @defaultValue 0
   */
  minZoom?: number | null;
  /**
   * The maximum zoom level of the map (0-24).
   * @defaultValue 22
   */
  maxZoom?: number | null;
  /**
   * The minimum pitch of the map (0-180).
   * @defaultValue 0
   */
  minPitch?: number | null;
  /**
   * The maximum pitch of the map (0-180).
   * @defaultValue 60
   */
  maxPitch?: number | null;
  /**
   * The pitch above which to apply anisotropic filtering to the map's raster layers (0-180).
   * @defaultValue 20
   */
  anisotropicFilterPitch?: number | null;
  /**
   * If `true`, the "box zoom" interaction is enabled (see {@link BoxZoomHandler}).
   * An `Object` value configures {@link BoxZoomHandler} options.
   * If `boxZoomEnd` is provided, the callback runs instead of the default fit-to-box zoom.
   * @defaultValue true
   */
  boxZoom?: boolean | BoxZoomHandlerOptions;
  /**
   * If `true`, the "drag to rotate" interaction is enabled (see {@link DragRotateHandler}).
   * @defaultValue true
   */
  dragRotate?: boolean;
  /**
   * If `true`, the "drag to pan" interaction is enabled. An `Object` value is passed as options to {@link DragPanHandler.enable}.
   * @defaultValue true
   */
  dragPan?: boolean | DragPanOptions;
  /**
   * If `true`, keyboard shortcuts are enabled (see {@link KeyboardHandler}).
   * @defaultValue true
   */
  keyboard?: boolean;
  /**
   * If `true`, the "double click to zoom" interaction is enabled (see {@link DoubleClickZoomHandler}).
   * @defaultValue true
   */
  doubleClickZoom?: boolean;
  /**
   * If `true`, the "pinch to rotate and zoom" interaction is enabled. An `Object` value is passed as options to {@link TwoFingersTouchZoomRotateHandler.enable}.
   * @defaultValue true
   */
  touchZoomRotate?: boolean | AroundCenterOptions;
  /**
   * If `true`, the "drag to pitch" interaction is enabled. An `Object` value is passed as options to {@link TwoFingersTouchPitchHandler.enable}.
   * @defaultValue true
   */
  touchPitch?: boolean | AroundCenterOptions;
  /**
   * If `true` or set to an options object, the map is only accessible on desktop while holding Command/Ctrl and only accessible on mobile with two fingers. Interacting with the map using normal gestures will trigger an informational screen. With this option enabled, "drag to pitch" requires a three-finger gesture. Cooperative gestures are disabled when a map enters fullscreen using {@link FullscreenControl}.
   * @defaultValue false
   */
  cooperativeGestures?: GestureOptions;
  /**
   * If `true`, the map will automatically resize when the browser window resizes.
   * @defaultValue true
   */
  trackResize?: boolean;
  /**
   * The initial geographical centerpoint of the map. If `center` is not specified in the constructor options, MapLibre GL JS will look for it in the map's style object. If it is not specified in the style, either, it will default to `[0, 0]`
   * !!! note
   *     MapLibre GL JS uses longitude, latitude coordinate order (as opposed to latitude, longitude) to match GeoJSON.
   * @defaultValue [0, 0]
   */
  center?: LngLatLike;
  /**
   * The elevation of the initial geographical centerpoint of the map, in meters above sea level. If `elevation` is not specified in the constructor options, it will default to `0`.
   * @defaultValue 0
   */
  elevation?: number;
  /**
   * The initial zoom level of the map. If `zoom` is not specified in the constructor options, MapLibre GL JS will look for it in the map's style object. If it is not specified in the style, either, it will default to `0`.
   * @defaultValue 0
   */
  zoom?: number;
  /**
   * The initial bearing (rotation) of the map, measured in degrees counter-clockwise from north. If `bearing` is not specified in the constructor options, MapLibre GL JS will look for it in the map's style object. If it is not specified in the style, either, it will default to `0`.
   * @defaultValue 0
   */
  bearing?: number;
  /**
   * The initial pitch (tilt) of the map, measured in degrees away from the plane of the screen (0-85). If `pitch` is not specified in the constructor options, MapLibre GL JS will look for it in the map's style object. If it is not specified in the style, either, it will default to `0`. Values greater than 60 degrees are experimental and may result in rendering issues. If you encounter any, please raise an issue with details in the MapLibre project.
   * @defaultValue 0
   */
  pitch?: number;
  /**
   * The initial roll angle of the map, measured in degrees counter-clockwise about the camera boresight. If `roll` is not specified in the constructor options, MapLibre GL JS will look for it in the map's style object. If it is not specified in the style, either, it will default to `0`.
   * @defaultValue 0
   */
  roll?: number;
  /**
   * If `true`, multiple copies of the world will be rendered side by side beyond -180 and 180 degrees longitude. If set to `false`:
   *
   * - When the map is zoomed out far enough that a single representation of the world does not fill the map's entire
   * container, there will be blank space beyond 180 and -180 degrees longitude.
   * - Features that cross 180 and -180 degrees longitude will be cut in two (with one portion on the right edge of the
   * map and the other on the left edge of the map) at every zoom level.
   * @defaultValue true
   */
  renderWorldCopies?: boolean;
  /**
   * The maximum number of tiles stored in the tile cache for a given source. If omitted, the cache will be dynamically sized based on the current viewport which can be set using `maxTileCacheZoomLevels` constructor options.
   * @defaultValue null
   */
  maxTileCacheSize?: number | null;
  /**
   * The maximum number of zoom levels for which to store tiles for a given source. Tile cache dynamic size is calculated by multiplying `maxTileCacheZoomLevels` with the approximate number of tiles in the viewport for a given source.
   * @defaultValue 5
   */
  maxTileCacheZoomLevels?: number;
  /**
   * A callback run before the Map makes a request for an external URL. The callback can be used to modify the url, set headers, or set the credentials property for cross-origin requests.
   * Expected to return an object with a `url` property and optionally `headers` and `credentials` properties.
   * @defaultValue null
   */
  transformRequest?: RequestTransformFunction | null;
  /**
   * A callback run before the map's camera is moved due to user input or animation. The callback can be used to modify the new center, zoom, pitch and bearing.
   * Expected to return an object containing center, zoom, pitch or bearing values to overwrite.
   * @defaultValue null
   */
  transformCameraUpdate?: CameraUpdateTransformFunction | null;
  /**
   * A callback that overrides how the map constrains the viewport's lnglat and zoom to respect the longitude and latitude bounds.
   * @see [Customize the map transform constrain](https://maplibre.org/maplibre-gl-js/docs/examples/customize-the-map-transform-constrain/)
   * Expected to return an object containing center and zoom.
   * @defaultValue null
   */
  transformConstrain?: TransformConstrainFunction | null;
  /**
   * A patch to apply to the default localization table for UI strings, e.g. control tooltips. The `locale` object maps namespaced UI string IDs to translated strings in the target language; see `src/ui/default_locale.js` for an example with all supported string IDs. The object may specify all UI strings (thereby adding support for a new translation) or only a subset of strings (thereby patching the default translation table).
   * For an example, see https://maplibre.org/maplibre-gl-js/docs/examples/locale-switching/
   * Alternatively, search the official plugins page for plugins related to localization.
   * @defaultValue null
   */
  locale?: Record<string, string>;
  /**
   * Controls the duration of the fade-in/fade-out animation for label collisions after initial map load, in milliseconds. This setting affects all symbol layers. This setting does not affect the duration of runtime styling transitions or raster tile cross-fading.
   * @defaultValue 300
   */
  fadeDuration?: number;
  /**
   * If `true`, symbols from multiple sources can collide with each other during collision detection. If `false`, collision detection is run separately for the symbols in each source.
   * @defaultValue true
   */
  crossSourceCollisions?: boolean;
  /**
   * If `true`, Resource Timing API information will be collected for requests made by GeoJSON and Vector Tile web workers (this information is normally inaccessible from the main Javascript thread). Information will be returned in a `resourceTiming` property of relevant `data` events.
   * @defaultValue false
   */
  collectResourceTiming?: boolean;
  /**
   * The max number of pixels a user can shift the mouse pointer during a click for it to be considered a valid click (as opposed to a mouse drag).
   * @defaultValue 3
   */
  clickTolerance?: number;
  /**
   * The initial bounds of the map. If `bounds` is specified, it overrides `center` and `zoom` constructor options.
   */
  bounds?: LngLatBoundsLike;
  /**
   * A {@link FitBoundsOptions} options object to use _only_ when fitting the initial `bounds` provided above.
   */
  fitBoundsOptions?: FitBoundsOptions;
  /**
   * Defines a CSS
   * font-family for locally overriding generation of Chinese, Japanese, and Korean characters.
   * For these characters, font settings from the map's style will be ignored, except for font-weight keywords (light/regular/medium/bold).
   * Set to `false`, to enable font settings from the map's style for these glyph ranges.
   * The purpose of this option is to avoid bandwidth-intensive glyph server requests.
   * @see [Use locally generated ideographs](https://maplibre.org/maplibre-gl-js/docs/examples/use-locally-generated-ideographs/)
   * @defaultValue 'sans-serif'
   */
  localIdeographFontFamily?: string | false;
  /**
   * The map's MapLibre style. This must be a JSON object conforming to
   * the schema described in the [MapLibre Style Specification](https://maplibre.org/maplibre-style-spec/),
   * or a URL to such JSON.
   * When the style is not specified, calling {@link Map.setStyle} is required to render the map.
   */
  style?: StyleSpecification | string;
  /**
   * If `false`, the map's pitch (tilt) control with "drag to rotate" interaction will be disabled.
   * @defaultValue true
   */
  pitchWithRotate?: boolean;
  /**
   * If `false`, the map's roll control with "drag to rotate" interaction will be disabled.
   * @defaultValue false
   */
  rollEnabled?: boolean;
  /**
   * If `true`, gesture inertia (such as panning) is disabled. If not provided, gesture inertia defaults to the user's device settings.
   * @defaultValue undefined
   */
  reduceMotion?: boolean | undefined;
  /**
   * The pixel ratio.
   * The canvas' `width` attribute will be `container.clientWidth * pixelRatio` and its `height` attribute will be `container.clientHeight * pixelRatio`. Defaults to `devicePixelRatio` if not specified.
   */
  pixelRatio?: number;
  /**
   * If false, style validation will be skipped.
   * Useful in production environments due to enabling tree-shaking of the validation code in some environments and minor performance improvements.
   * Disabling this option comes at the cost of less clear error messages
   * @defaultValue true
   */
  validateStyle?: boolean;
  /**
   * The canvas' `width` and `height` max size. The values are passed as an array where the first element is max width and the second element is max height.
   * You shouldn't set this above WebGl `MAX_TEXTURE_SIZE`.
   * @defaultValue [4096, 4096].
   */
  maxCanvasSize?: [number, number];
  /**
   * Determines whether to cancel, or retain, tiles from the current viewport which are still loading but which belong to a farther (smaller) zoom level than the current one.
   * * If `true`, when zooming in, tiles which didn't manage to load for previous zoom levels will become canceled. This might save some computing resources for slower devices, but the map details might appear more abruptly at the end of the zoom.
   * * If `false`, when zooming in, the previous zoom level(s) tiles will progressively appear, giving a smoother map details experience. However, more tiles will be rendered in a short period of time.
   * @defaultValue true
   */
  cancelPendingTileRequestsWhileZooming?: boolean;
  /**
   * If true, the elevation of the center point will automatically be set to the terrain elevation
   * (or zero if terrain is not enabled). If false, the elevation of the center point will default
   * to sea level and will not automatically update. Defaults to true. Needs to be set to false to
   * keep the camera above ground when pitch \> 90 degrees.
   */
  centerClampedToGround?: boolean;
  /**
   * Allows overzooming by splitting vector tiles after max zoom.
   * Defines the number of zoom level that will overscale from map's max zoom and below.
   * For example if the map's max zoom is 20 and this is set to 3, the zoom levels of 20, 19 and 18 will be overscaled
   * and the rest will be split.
   * When undefined, all zoom levels after source's max zoom will be overscaled.
   * This can help in reducing the size of the overscaling and improve performance in high zoom levels.
   * The drawback is that it changes rendering for polygon centered labels and changes the results of query rendered features.
   * @defaultValue undefined
   * @experimental
   */
  experimentalZoomLevelsToOverscale?: number;
  /**
   * Determines the rotation interaction model:
   * - When true: Uses "Orbital" logic where rotation is relative to the pivot center.
   *   Dragging right at the top rotates clockwise, while dragging right at the bottom
   *   rotates counter-clockwise (like spinning a physical globe).
   * - When false: Uses "Linear" logic where horizontal mouse movement translates directly
   *   to bearing change regardless of cursor position.
   */
  aroundCenter?: boolean;
};
type CompleteMapOptions = Complete<MapOptions>;
type DelegatedListener = {
  layers: string[];
  listener: Listener;
  delegates: { [E in keyof MapEventType]?: Delegate<MapEventType[E]> };
};
type Delegate<E extends Event$1 = Event$1> = (e: E) => void;
type LostContextStyle = {
  style: StyleSpecification | null;
  images: {
    [_: string]: StyleImage;
  } | null;
};
/**
 * The `Map` object represents the map on your page. It exposes methods
 * and properties that enable you to programmatically change the map,
 * and fires events as users interact with it.
 *
 * You create a `Map` by specifying a `container` and other options, see {@link MapOptions} for the full list.
 * Then MapLibre GL JS initializes the map on the page and returns your `Map` object.
 *
 * @group Main
 *
 * @example
 * ```ts
 * let map = new Map({
 *   container: 'map',
 *   center: [-122.420679, 37.772537],
 *   zoom: 13,
 *   style: style_object,
 *   hash: true,
 *   transformRequest: (url, resourceType)=> {
 *     if(resourceType === 'Source' && url.startsWith('http://myHost')) {
 *       return {
 *        url: url.replace('http', 'https'),
 *        headers: { 'my-custom-header': true},
 *        credentials: 'include'  // Include cookies for cross-origin requests
 *      }
 *     }
 *   }
 * });
 * ```
 * @see [Display a map](https://maplibre.org/maplibre-gl-js/docs/examples/display-a-map/)
 */
declare class Map$1 extends Camera {
  style: Style;
  painter: Painter;
  handlers: HandlerManager;
  _container: HTMLElement;
  _canvasContainer: HTMLElement;
  _controlContainer: HTMLElement;
  _controlPositions: Partial<Record<ControlPosition, HTMLElement>>;
  _interactive: boolean;
  _showTileBoundaries: boolean;
  _showCollisionBoxes: boolean;
  _showPadding: boolean;
  _showOverdrawInspector: boolean;
  _repaint: boolean;
  _vertices: boolean;
  _canvas: HTMLCanvasElement;
  _maxTileCacheSize: number | null;
  _maxTileCacheZoomLevels: number;
  _frameRequest: AbortController;
  _styleDirty: boolean;
  _sourcesDirty: boolean;
  _placementDirty: boolean;
  _anisotropicFilterPitch: number;
  _loaded: boolean;
  _idleTriggered: boolean;
  _fullyLoaded: boolean;
  _trackResize: boolean;
  _resizeObserver: ResizeObserver;
  _canvasContextAttributes: WebGLContextAttributesWithType;
  _refreshExpiredTiles: boolean;
  _hash: Hash;
  _delegatedListeners: Record<string, DelegatedListener[]>;
  _fadeDuration: number;
  _crossSourceCollisions: boolean;
  _crossFadingFactor: number;
  _collectResourceTiming: boolean;
  _renderTaskQueue: TaskQueue;
  _controls: Array<IControl>;
  _mapId: number;
  _localIdeographFontFamily: string | false;
  _validateStyle: boolean;
  _requestManager: RequestManager;
  _locale: Record<string, string>;
  _removed: boolean;
  _diffStyleRequest: AbortController;
  _clickTolerance: number;
  _overridePixelRatio: number | null | undefined;
  _maxCanvasSize: [number, number];
  _terrainDataCallback: (e: MapStyleDataEvent | MapSourceDataEvent) => void;
  /** @internal */
  _zoomLevelsToOverscale: number | undefined;
  /**
   * @internal
   * The window that owns the map container element, for cross-window support.
   * Returns `typeof window` to include global constructors like ResizeObserver.
   */
  get _ownerWindow(): typeof window;
  /**
   * @internal
   * image queue throttling handle. To be used later when clean up
   */
  _imageQueueHandle: number;
  /**
   * @internal
   * Used to store the previous style and images when a context loss occurs, so they can be restored.
   */
  _lostContextStyle: LostContextStyle;
  /**
   * The map's {@link ScrollZoomHandler}, which implements zooming in and out with a scroll wheel or trackpad.
   * Find more details and examples using `scrollZoom` in the {@link ScrollZoomHandler} section.
   */
  scrollZoom: ScrollZoomHandler;
  /**
   * The map's {@link BoxZoomHandler}, which implements zooming using a drag gesture with the Shift key pressed.
   * Find more details and examples using `boxZoom` in the {@link BoxZoomHandler} section.
   */
  boxZoom: BoxZoomHandler;
  /**
   * The map's {@link DragRotateHandler}, which implements rotating the map while dragging with the right
   * mouse button or with the Control key pressed. Find more details and examples using `dragRotate`
   * in the {@link DragRotateHandler} section.
   */
  dragRotate: DragRotateHandler;
  /**
   * The map's {@link DragPanHandler}, which implements dragging the map with a mouse or touch gesture.
   * Find more details and examples using `dragPan` in the {@link DragPanHandler} section.
   */
  dragPan: DragPanHandler;
  /**
   * The map's {@link KeyboardHandler}, which allows the user to zoom, rotate, and pan the map using keyboard
   * shortcuts. Find more details and examples using `keyboard` in the {@link KeyboardHandler} section.
   */
  keyboard: KeyboardHandler;
  /**
   * The map's {@link DoubleClickZoomHandler}, which allows the user to zoom by double clicking.
   * Find more details and examples using `doubleClickZoom` in the {@link DoubleClickZoomHandler} section.
   */
  doubleClickZoom: DoubleClickZoomHandler;
  /**
   * The map's {@link TwoFingersTouchZoomRotateHandler}, which allows the user to zoom or rotate the map with touch gestures.
   * Find more details and examples using `touchZoomRotate` in the {@link TwoFingersTouchZoomRotateHandler} section.
   */
  touchZoomRotate: TwoFingersTouchZoomRotateHandler;
  /**
   * The map's {@link TwoFingersTouchPitchHandler}, which allows the user to pitch the map with touch gestures.
   * Find more details and examples using `touchPitch` in the {@link TwoFingersTouchPitchHandler} section.
   */
  touchPitch: TwoFingersTouchPitchHandler;
  /**
   * The map's {@link CooperativeGesturesHandler}, which allows the user to see cooperative gesture info when user tries to zoom in/out.
   * Find more details and examples using `cooperativeGestures` in the {@link CooperativeGesturesHandler} section.
   */
  cooperativeGestures: CooperativeGesturesHandler;
  /**
   * The map's property which determines whether to cancel, or retain, tiles from the current viewport which are still loading but which belong to a farther (smaller) zoom level than the current one.
   * * If `true`, when zooming in, tiles which didn't manage to load for previous zoom levels will become canceled. This might save some computing resources for slower devices, but the map details might appear more abruptly at the end of the zoom.
   * * If `false`, when zooming in, the previous zoom level(s) tiles will progressively appear, giving a smoother map details experience. However, more tiles will be rendered in a short period of time.
   * @defaultValue true
   */
  cancelPendingTileRequestsWhileZooming: boolean;
  /**
   * The map transform's callback that overrides the default constrain function.
   * @defaultValue null
   */
  transformConstrain: TransformConstrainFunction | null;
  constructor(options: MapOptions);
  /**
   * @internal
   * Returns a unique number for this map instance which is used for the MapLoadEvent
   * to make sure we only fire one event per instantiated map object.
   * @returns the uniq map ID
   */
  _getMapId(): number;
  /**
   * Sets a global state property that can be retrieved with the [`global-state` expression](https://maplibre.org/maplibre-style-spec/expressions/#global-state).
   * If the value is null, it resets the property to its default value defined in the [`state` style property](https://maplibre.org/maplibre-style-spec/root/#state).
   *
   * @param propertyName - The name of the state property to set.
   * @param value - The value of the state property to set.
   */
  setGlobalStateProperty(propertyName: string, value: any): this;
  /**
   * Returns the global map state
   *
   * @returns The map state object.
  */
  getGlobalState(): Record<string, any>;
  /**
   * Adds an {@link IControl} to the map, calling `control.onAdd(this)`.
   *
   * An {@link ErrorEvent} will be fired if the image parameter is invalid.
   *
   * @param control - The {@link IControl} to add.
   * @param position - position on the map to which the control will be added.
   * Valid values are `'top-left'`, `'top-right'`, `'bottom-left'`, and `'bottom-right'`. Defaults to `'top-right'`.
   * @example
   * Add zoom and rotation controls to the map.
   * ```ts
   * map.addControl(new NavigationControl());
   * ```
   * @see [Display map navigation controls](https://maplibre.org/maplibre-gl-js/docs/examples/display-map-navigation-controls/)
   */
  addControl(control: IControl, position?: ControlPosition): Map$1;
  /**
   * Removes the control from the map.
   *
   * An {@link ErrorEvent} will be fired if the image parameter is invalid.
   *
   * @param control - The {@link IControl} to remove.
   * @example
   * ```ts
   * // Define a new navigation control.
   * let navigation = new NavigationControl();
   * // Add zoom and rotation controls to the map.
   * map.addControl(navigation);
   * // Remove zoom and rotation controls from the map.
   * map.removeControl(navigation);
   * ```
   */
  removeControl(control: IControl): Map$1;
  /**
   * Checks if a control exists on the map.
   *
   * @param control - The {@link IControl} to check.
   * @returns true if map contains control.
   * @example
   * ```ts
   * // Define a new navigation control.
   * let navigation = new NavigationControl();
   * // Add zoom and rotation controls to the map.
   * map.addControl(navigation);
   * // Check that the navigation control exists on the map.
   * map.hasControl(navigation);
   * ```
   */
  hasControl(control: IControl): boolean;
  /**
  * Returns an array of `OverscaledTileID` objects that cover the current viewport for a given tile size.
  * This method is useful for determining which tiles are visible in the current viewport.
  *
  * @param options - Options for calculating the covering tiles.
  * @returns An array of `OverscaledTileID` objects.
  * @example
  * ```ts
  * // Get the tiles to cover the view for a 512x512px tile source
  * const tiles = map.coveringTiles({tileSize: 512});
  * ```
  */
  coveringTiles(options: CoveringTilesOptions): OverscaledTileID[];
  calculateCameraOptionsFromTo(from: LngLat, altitudeFrom: number, to: LngLat, altitudeTo?: number): CameraOptions;
  /**
   * Resizes the map according to the dimensions of its
   * `container` element.
   *
   * Checks if the map container size changed and updates the map if it has changed.
   * This method must be called after the map's `container` is resized programmatically
   * or when the map is shown after being initially hidden with CSS.
   *
   * Triggers the following events: `movestart`, `move`, `moveend`, and `resize`.
   *
   * @param eventData - Additional properties to be passed to `movestart`, `move`, `resize`, and `moveend`
   * events that get triggered as a result of resize. This can be useful for differentiating the
   * source of an event (for example, user-initiated or programmatically-triggered events).
   * @example
   * Resize the map when the map container is shown after being initially hidden with CSS.
   * ```ts
   * let mapDiv = document.getElementById('map');
   * if (mapDiv.style.visibility === true) map.resize();
   * ```
   */
  resize(eventData?: any, constrainTransform?: boolean): Map$1;
  /**
   * Resizes the map according to the dimensions of its
   * `container` element.
   *
   * It does not trigger any events, and does not check for context loss.
   *
   * It is used internally and by {@link Map.resize}.
   *
   * @internal
   *
   * @param constrainTransform - whether to constrain the transform after resizing.
   */
  _resizeInternal(constrainTransform?: boolean): void;
  _resizeTransform(constrainTransform?: boolean): void;
  /**
   * @internal
   * Return the map's pixel ratio eventually scaled down to respect maxCanvasSize.
   * Internally you should use this and not getPixelRatio().
   */
  _getClampedPixelRatio(width: number, height: number): number;
  /**
   * Returns the map's pixel ratio.
   * Note that the pixel ratio actually applied may be lower to respect maxCanvasSize.
   * @returns The pixel ratio.
   */
  getPixelRatio(): number;
  /**
   * Sets the map's pixel ratio. This allows to override `devicePixelRatio`.
   * After this call, the canvas' `width` attribute will be `container.clientWidth * pixelRatio`
   * and its height attribute will be `container.clientHeight * pixelRatio`.
   * Set this to null to disable `devicePixelRatio` override.
   * Note that the pixel ratio actually applied may be lower to respect maxCanvasSize.
   * @param pixelRatio - The pixel ratio.
   */
  setPixelRatio(pixelRatio: number): void;
  /**
   * Returns the map's geographical bounds. When the bearing or pitch is non-zero, the visible region is not
   * an axis-aligned rectangle, and the result is the smallest bounds that encompasses the visible region.
   * @returns The geographical bounds of the map as {@link LngLatBounds}.
   * @example
   * ```ts
   * let bounds = map.getBounds();
   * ```
   */
  getBounds(): LngLatBounds;
  /**
   * Returns the maximum geographical bounds the map is constrained to, or `null` if none set.
   * @returns The map object.
   * @example
   * ```ts
   * let maxBounds = map.getMaxBounds();
   * ```
   */
  getMaxBounds(): LngLatBounds | null;
  /**
   * Sets or clears the map's geographical bounds.
   *
   * Pan and zoom operations are constrained within these bounds.
   * If a pan or zoom is performed that would
   * display regions outside these bounds, the map will
   * instead display a position and zoom level
   * as close as possible to the operation's request while still
   * remaining within the bounds.
   *
   * @param bounds - The maximum bounds to set. If `null` or `undefined` is provided, the function removes the map's maximum bounds.
   * @example
   * Define bounds that conform to the `LngLatBoundsLike` object as set the max bounds.
   * ```ts
   * let bounds = [
   *   [-74.04728, 40.68392], // [west, south]
   *   [-73.91058, 40.87764]  // [east, north]
   * ];
   * map.setMaxBounds(bounds);
   * ```
   */
  setMaxBounds(bounds?: LngLatBoundsLike | null): Map$1;
  /**
   * Sets or clears the map's minimum zoom level.
   * If the map's current zoom level is lower than the new minimum,
   * the map will zoom to the new minimum and trigger the following events:
   * `movestart`, `move`, `moveend`, `zoomstart`, `zoom`, and `zoomend`.
   *
   * It is not always possible to zoom out and reach the set `minZoom`.
   * Other factors such as map height may restrict zooming. For example,
   * if the map is 512px tall it will not be possible to zoom below zoom 0
   * no matter what the `minZoom` is set to.
   *
   * A {@link ErrorEvent} event will be fired if minZoom is out of bounds.
   *
   * @param minZoom - The minimum zoom level to set (-2 - 24).
   * If `null` or `undefined` is provided, the function removes the current minimum zoom (i.e. sets it to -2).
   * @example
   * ```ts
   * map.setMinZoom(12.25);
   * ```
   */
  setMinZoom(minZoom?: number | null): Map$1;
  /**
   * Returns the map's minimum allowable zoom level.
   *
   * @returns minZoom
   * @example
   * ```ts
   * let minZoom = map.getMinZoom();
   * ```
   */
  getMinZoom(): number;
  /**
   * Sets or clears the map's maximum zoom level.
   * If the map's current zoom level is higher than the new maximum,
   * the map will zoom to the new maximum and trigger the following events:
   * `movestart`, `move`, `moveend`, `zoomstart`, `zoom`, and `zoomend`.
   *
   * A {@link ErrorEvent} event will be fired if minZoom is out of bounds.
   *
   * @param maxZoom - The maximum zoom level to set.
   * If `null` or `undefined` is provided, the function removes the current maximum zoom (sets it to 22).
   * @example
   * ```ts
   * map.setMaxZoom(18.75);
   * ```
   */
  setMaxZoom(maxZoom?: number | null): Map$1;
  /**
   * Returns the map's maximum allowable zoom level.
   *
   * @returns The maxZoom
   * @example
   * ```ts
   * let maxZoom = map.getMaxZoom();
   * ```
   */
  getMaxZoom(): number;
  /**
   * Sets or clears the map's minimum pitch.
   * If the map's current pitch is lower than the new minimum,
   * the map will pitch to the new minimum and trigger the following events:
   * `movestart`, `move`, `moveend`, `pitchstart`, `pitch`, and `pitchend`.
   *
   * A {@link ErrorEvent} event will be fired if minPitch is out of bounds.
   *
   * @param minPitch - The minimum pitch to set (0-180). Values greater than 60 degrees are experimental and may result in rendering issues. If you encounter any, please raise an issue with details in the MapLibre project.
   * If `null` or `undefined` is provided, the function removes the current minimum pitch (i.e. sets it to 0).
   */
  setMinPitch(minPitch?: number | null): Map$1;
  /**
   * Returns the map's minimum allowable pitch.
   *
   * @returns The minPitch
   */
  getMinPitch(): number;
  /**
   * Sets or clears the map's maximum pitch.
   * If the map's current pitch is higher than the new maximum,
   * the map will pitch to the new maximum and trigger the following events:
   * `movestart`, `move`, `moveend`, `pitchstart`, `pitch`, and `pitchend`.
   *
   * A {@link ErrorEvent} event will be fired if maxPitch is out of bounds.
   *
   * @param maxPitch - The maximum pitch to set (0-180). Values greater than 60 degrees are experimental and may result in rendering issues. If you encounter any, please raise an issue with details in the MapLibre project.
   * If `null` or `undefined` is provided, the function removes the current maximum pitch (sets it to 60).
   */
  setMaxPitch(maxPitch?: number | null): Map$1;
  /**
   * Returns the map's maximum allowable pitch.
   *
   * @returns The maxPitch
   */
  getMaxPitch(): number;
  /**
   * Returns the map's anisotropic filter pitch.
   * If the map is pitched beyond this threshold, anisotropic filtering will be applied to all raster layers.
   *
   * @returns The anisotropicFilterPitch
   * @example
   * ```ts
   * let anisotropicFilterPitch = map.getAnisotropicFilterPitch();
   * ```
   */
  getAnisotropicFilterPitch(): number;
  /**
   * Sets the map's anisotropic filter pitch or reverts it to its default.
   *
   * A {@link ErrorEvent} event will be fired if anisotropicFilterPitch is out of bounds.
   *
   * @param anisotropicFilterPitch - The pitch above which to apply anisotropic filtering to the map's raster layers (0-180).
   * If `null` or `undefined` is provided, the function reverts to the default pitch threshold (20).
   *
   *
   * @example
   * ```ts
   * map.setAnisotropicFilterPitch(85);
   * ```
   */
  setAnisotropicFilterPitch(anisotropicFilterPitch?: number | null): Map$1;
  /**
   * Returns the state of `renderWorldCopies`. If `true`, multiple copies of the world will be rendered side by side beyond -180 and 180 degrees longitude. If set to `false`:
   *
   * - When the map is zoomed out far enough that a single representation of the world does not fill the map's entire
   * container, there will be blank space beyond 180 and -180 degrees longitude.
   * - Features that cross 180 and -180 degrees longitude will be cut in two (with one portion on the right edge of the
   * map and the other on the left edge of the map) at every zoom level.
   * @returns The renderWorldCopies
   * @example
   * ```ts
   * let worldCopiesRendered = map.getRenderWorldCopies();
   * ```
   * @see [Render world copies](https://maplibre.org/maplibre-gl-js/docs/examples/render-world-copies/)
   */
  getRenderWorldCopies(): boolean;
  /**
   * Sets the state of `renderWorldCopies`.
   *
   * @param renderWorldCopies - If `true`, multiple copies of the world will be rendered side by side beyond -180 and 180 degrees longitude. If set to `false`:
   *
   * - When the map is zoomed out far enough that a single representation of the world does not fill the map's entire
   * container, there will be blank space beyond 180 and -180 degrees longitude.
   * - Features that cross 180 and -180 degrees longitude will be cut in two (with one portion on the right edge of the
   * map and the other on the left edge of the map) at every zoom level.
   *
   * `undefined` is treated as `true`, `null` is treated as `false`.
   * @example
   * ```ts
   * map.setRenderWorldCopies(true);
   * ```
   * @see [Render world copies](https://maplibre.org/maplibre-gl-js/docs/examples/render-world-copies/)
   */
  setRenderWorldCopies(renderWorldCopies?: boolean | null): Map$1;
  /** Sets or clears the callback overriding how the map constrains the viewport's lnglat and zoom to respect the longitude and latitude bounds.
   *
   * @param constrain - A {@link TransformConstrainFunction} callback defining how the viewport should respect the bounds.
   *
   * `null` clears the callback and reverts the constrain to the map transform's default constrain function.
   * @example
   * ```ts
   * function customTransformConstrain(lngLat, zoom) {
   *   return {center: lngLat, zoom: zoom ?? 0};
   * };
   * map.setTransformConstrain(customTransformConstrain);
   * ```
   * @see [Customize the map transform constrain](https://maplibre.org/maplibre-gl-js/docs/examples/customize-the-map-transform-constrain/)
   */
  setTransformConstrain(constrain?: TransformConstrainFunction | null): Map$1;
  /**
   * Returns a [Point](https://github.com/mapbox/point-geometry) representing pixel coordinates, relative to the map's `container`,
   * that correspond to the specified geographical location.
   *
   * @param lnglat - The geographical location to project.
   * @returns The [Point](https://github.com/mapbox/point-geometry) corresponding to `lnglat`, relative to the map's `container`.
   * @example
   * ```ts
   * let coordinate = [-122.420679, 37.772537];
   * let point = map.project(coordinate);
   * ```
   */
  project(lnglat: LngLatLike): Point;
  /**
   * Returns a {@link LngLat} representing geographical coordinates that correspond
   * to the specified pixel coordinates.
   *
   * @param point - The pixel coordinates to unproject.
   * @returns The {@link LngLat} corresponding to `point`.
   * @example
   * ```ts
   * map.on('click', (e) => {
   *   // When the map is clicked, get the geographic coordinate.
   *   let coordinate = map.unproject(e.point);
   * });
   * ```
   */
  unproject(point: PointLike): LngLat;
  /**
   * Returns true if the map is panning, zooming, rotating, or pitching due to a camera animation or user gesture.
   * @returns true if the map is moving.
   * @example
   * ```ts
   * let isMoving = map.isMoving();
   * ```
   */
  isMoving(): boolean;
  /**
   * Returns true if the map is zooming due to a camera animation or user gesture.
   * @returns true if the map is zooming.
   * @example
   * ```ts
   * let isZooming = map.isZooming();
   * ```
   */
  isZooming(): boolean;
  /**
   * Returns true if the map is rotating due to a camera animation or user gesture.
   * @returns true if the map is rotating.
   * @example
   * ```ts
   * map.isRotating();
   * ```
   */
  isRotating(): boolean;
  _createDelegatedListener(type: keyof MapEventType | string, layerIds: string[], listener: Listener): DelegatedListener;
  _saveDelegatedListener(type: keyof MapEventType | string, delegatedListener: DelegatedListener): void;
  _removeDelegatedListener(type: string, layerIds: string[], listener: Listener): void;
  /**
   * @event
   * Adds a listener for events of a specified type, optionally limited to features in a specified style layer(s).
   * See {@link MapEventType} and {@link MapLayerEventType} for a full list of events and their description.
   *
   * | Event                  | Compatible with `layerId` |
   * |------------------------|---------------------------|
   * | `mousedown`            | yes                       |
   * | `mouseup`              | yes                       |
   * | `mouseover`            | yes                       |
   * | `mouseout`             | yes                       |
   * | `mousemove`            | yes                       |
   * | `mouseenter`           | yes (required)            |
   * | `mouseleave`           | yes (required)            |
   * | `click`                | yes                       |
   * | `dblclick`             | yes                       |
   * | `contextmenu`          | yes                       |
   * | `touchstart`           | yes                       |
   * | `touchend`             | yes                       |
   * | `touchcancel`          | yes                       |
   * | `wheel`                |                           |
   * | `resize`               |                           |
   * | `remove`               |                           |
   * | `touchmove`            |                           |
   * | `movestart`            |                           |
   * | `move`                 |                           |
   * | `moveend`              |                           |
   * | `dragstart`            |                           |
   * | `drag`                 |                           |
   * | `dragend`              |                           |
   * | `zoomstart`            |                           |
   * | `zoom`                 |                           |
   * | `zoomend`              |                           |
   * | `rotatestart`          |                           |
   * | `rotate`               |                           |
   * | `rotateend`            |                           |
   * | `pitchstart`           |                           |
   * | `pitch`                |                           |
   * | `pitchend`             |                           |
   * | `boxzoomstart`         |                           |
   * | `boxzoomend`           |                           |
   * | `boxzoomcancel`        |                           |
   * | `webglcontextlost`     |                           |
   * | `webglcontextrestored` |                           |
   * | `load`                 |                           |
   * | `render`               |                           |
   * | `idle`                 |                           |
   * | `error`                |                           |
   * | `data`                 |                           |
   * | `styledata`            |                           |
   * | `sourcedata`           |                           |
   * | `dataloading`          |                           |
   * | `styledataloading`     |                           |
   * | `sourcedataloading`    |                           |
   * | `styleimagemissing`    |                           |
   * | `dataabort`            |                           |
   * | `sourcedataabort`      |                           |
   *
   * @param type - The event type to listen for. Events compatible with the optional `layerId` parameter are triggered
   * when the cursor enters a visible portion of the specified layer from outside that layer or outside the map canvas.
   * @param layer - The ID of a style layer or a listener if no ID is provided. Event will only be triggered if its location
   * is within a visible feature in this layer. The event will have a `features` property containing
   * an array of the matching features. If `layer` is not supplied, the event will not have a `features` property.
   * Please note that many event types are not compatible with the optional `layer` parameter.
   * @param listener - The function to be called when the event is fired.
   * @example
   * ```ts
   * // Set an event listener that will fire
   * // when the map has finished loading
   * map.on('load', () => {
   *   // Once the map has finished loading,
   *   // add a new layer
   *   map.addLayer({
   *     id: 'points-of-interest',
   *     source: {
   *       type: 'vector',
   *       url: 'https://maplibre.org/maplibre-style-spec/'
   *     },
   *     'source-layer': 'poi_label',
   *     type: 'circle',
   *     paint: {
   *       // MapLibre Style Specification paint properties
   *     },
   *     layout: {
   *       // MapLibre Style Specification layout properties
   *     }
   *   });
   * });
   * ```
   * @example
   * ```ts
   * // Set an event listener that will fire
   * // when a feature on the countries layer of the map is clicked
   * map.on('click', 'countries', (e) => {
   *   new Popup()
   *     .setLngLat(e.lngLat)
   *     .setHTML(`Country name: ${e.features[0].properties.name}`)
   *     .addTo(map);
   * });
   * ```
   * @see [Display popup on click](https://maplibre.org/maplibre-gl-js/docs/examples/display-a-popup-on-click/)
   * @see [Center the map on a clicked symbol](https://maplibre.org/maplibre-gl-js/docs/examples/center-the-map-on-a-clicked-symbol/)
   * @see [Create a hover effect](https://maplibre.org/maplibre-gl-js/docs/examples/create-a-hover-effect/)
   * @see [Create a draggable marker](https://maplibre.org/maplibre-gl-js/docs/examples/create-a-draggable-point/)
   */
  on<T extends keyof MapLayerEventType>(type: T, layer: string, listener: (ev: MapLayerEventType[T] & Object) => void): Subscription;
  /**
   * Overload of the `on` method that allows to listen to events specifying multiple layers.
   * @event
   * @param type - The type of the event.
   * @param layerIds - The array of style layer IDs.
   * @param listener - The listener callback.
   */
  on<T extends keyof MapLayerEventType>(type: T, layerIds: string[], listener: (ev: MapLayerEventType[T] & Object) => void): Subscription;
  /**
   * Overload of the `on` method that allows to listen to events without specifying a layer.
   * @event
   * @param type - The type of the event.
   * @param listener - The listener callback.
   */
  on<T extends keyof MapEventType>(type: T, listener: (ev: MapEventType[T] & Object) => void): Subscription;
  /**
   * Overload of the `on` method that allows to listen to events without specifying a layer.
   * @event
   * @param type - The type of the event.
   * @param listener - The listener callback.
   */
  on(type: keyof MapEventType | string, listener: Listener): Subscription;
  /**
   * Adds a listener that will be called only once to a specified event type, optionally limited to features in a specified style layer.
   *
   * @event
   * @param type - The event type to listen for; one of `'mousedown'`, `'mouseup'`, `'click'`, `'dblclick'`,
   * `'mousemove'`, `'mouseenter'`, `'mouseleave'`, `'mouseover'`, `'mouseout'`, `'contextmenu'`, `'touchstart'`,
   * `'touchend'`, or `'touchcancel'`. `mouseenter` and `mouseover` events are triggered when the cursor enters
   * a visible portion of the specified layer from outside that layer or outside the map canvas. `mouseleave`
   * and `mouseout` events are triggered when the cursor leaves a visible portion of the specified layer, or leaves
   * the map canvas.
   * @param layer - The ID of a style layer or a listener if no ID is provided. Only events whose location is within a visible
   * feature in this layer will trigger the listener. The event will have a `features` property containing
   * an array of the matching features.
   * @param listener - The function to be called when the event is fired.
   * @returns `this` if listener is provided, promise otherwise to allow easier usage of async/await
   */
  once<T extends keyof MapLayerEventType>(type: T, layer: string, listener?: (ev: MapLayerEventType[T] & Object) => void): this | Promise<MapLayerEventType[T] & Object>;
  /**
   * Overload of the `once` method that allows to listen to events specifying multiple layers.
   * @event
   * @param type - The type of the event.
   * @param layerIds - The array of style layer IDs.
   * @param listener - The listener callback.
   */
  once<T extends keyof MapLayerEventType>(type: T, layerIds: string[], listener?: (ev: MapLayerEventType[T] & Object) => void): this | Promise<any>;
  /**
   * Overload of the `once` method that allows to listen to events without specifying a layer.
   * @event
   * @param type - The type of the event.
   * @param listener - The listener callback.
   */
  once<T extends keyof MapEventType>(type: T, listener?: (ev: MapEventType[T] & Object) => void): this | Promise<any>;
  /**
   * Overload of the `once` method that allows to listen to events without specifying a layer.
   * @event
   * @param type - The type of the event.
   * @param listener - The listener callback.
   */
  once(type: keyof MapEventType | string, listener?: Listener): this | Promise<any>;
  /**
   * Removes an event listener for events previously added with `{@link Map.on}`.
   *
   * @event
   * @param type - The event type previously used to install the listener.
   * @param layer - The layer ID or listener previously used to install the listener.
   * @param listener - The function previously installed as a listener.
   */
  off<T extends keyof MapLayerEventType>(type: T, layer: string, listener: (ev: MapLayerEventType[T] & Object) => void): this;
  /**
   * Overload of the `off` method that allows to remove an event created with multiple layers.
   * Provide the same layer IDs as to `on` or `once`, when the listener was registered.
   * @event
   * @param type - The type of the event.
   * @param layers - The layer IDs previously used to install the listener.
   * @param listener - The function previously installed as a listener.
   */
  off<T extends keyof MapLayerEventType>(type: T, layers: string[], listener: (ev: MapLayerEventType[T] & Object) => void): this;
  /**
   * Overload of the `off` method that allows to remove an event created without specifying a layer.
   * @event
   * @param type - The type of the event.
   * @param listener - The function previously installed as a listener.
   */
  off<T extends keyof MapEventType>(type: T, listener: (ev: MapEventType[T] & Object) => void): this;
  /**
   * Overload of the `off` method that allows to remove an event created without specifying a layer.
   * @event
   * @param type - The type of the event.
   * @param listener - The function previously installed as a listener.
   */
  off(type: keyof MapEventType | string, listener: Listener): this;
  /**
   * Returns an array of MapGeoJSONFeature objects
   * representing visible features that satisfy the query parameters.
   *
   * @param geometryOrOptions - (optional) The geometry of the query region in pixel points within the map viewport:
   * either a single pixel point or a pair of top-left and bottom-right pixel points describing a bounding box.
   * The origin of the pixel points is at the top-left of the map viewport.
   * Omitting this parameter (i.e. calling {@link Map.queryRenderedFeatures} with zero arguments,
   * or with only a `options` argument) is equivalent to passing a bounding box encompassing the entire
   * map viewport.
   * The geometryOrOptions can receive a {@link QueryRenderedFeaturesOptions} only to support a situation where the function receives only one parameter which is the options parameter.
   * @param options - (optional) Options object.
   *
   * @returns An array of MapGeoJSONFeature objects.
   *
   * The `properties` value of each returned feature object contains the properties of its source feature. For GeoJSON sources, only
   * string and numeric property values are supported (i.e. `null`, `Array`, and `Object` values are not supported).
   *
   * Each feature includes top-level `layer`, `source`, and `sourceLayer` properties. The `layer` property is an object
   * representing the style layer to  which the feature belongs. Layout and paint properties in this object contain values
   * which are fully evaluated for the given zoom level and feature.
   *
   * Only features that are currently rendered are included. Some features will **not** be included, like:
   *
   * - Features from layers whose `visibility` property is `"none"`.
   * - Features from layers whose zoom range excludes the current zoom level.
   * - Symbol features that have been hidden due to text or icon collision.
   *
   * Features from all other layers are included, including features that may have no visible
   * contribution to the rendered result; for example, because the layer's opacity or color alpha component is set to
   * 0.
   *
   * The topmost rendered feature appears first in the returned array, and subsequent features are sorted by
   * descending z-order. Features that are rendered multiple times (due to wrapping across the antemeridian at low
   * zoom levels) are returned only once (though subject to the following caveat).
   *
   * Because features come from tiled vector data or GeoJSON data that is converted to tiles internally, feature
   * geometries may be split or duplicated across tile boundaries and, as a result, features may appear multiple
   * times in query results. For example, suppose there is a highway running through the bounding rectangle of a query.
   * The results of the query will be those parts of the highway that lie within the map tiles covering the bounding
   * rectangle, even if the highway extends into other tiles, and the portion of the highway within each map tile
   * will be returned as a separate feature. Similarly, a point feature near a tile boundary may appear in multiple
   * tiles due to tile buffering.
   *
   * @example
   * Find all features at a point
   * ```ts
   * let features = map.queryRenderedFeatures(
   *   [20, 35],
   *   { layers: ['my-layer-name'] }
   * );
   * ```
   *
   * @example
   * Find all features within a static bounding box
   * ```ts
   * let features = map.queryRenderedFeatures(
   *   [[10, 20], [30, 50]],
   *   { layers: ['my-layer-name'] }
   * );
   * ```
   *
   * @example
   * Find all features within a bounding box around a point
   * ```ts
   * let width = 10;
   * let height = 20;
   * let features = map.queryRenderedFeatures([
   *   [point.x - width / 2, point.y - height / 2],
   *   [point.x + width / 2, point.y + height / 2]
   * ], { layers: ['my-layer-name'] });
   * ```
   *
   * @example
   * Query all rendered features from a single layer
   * ```ts
   * let features = map.queryRenderedFeatures({ layers: ['my-layer-name'] });
   * ```
   * @see [Get features under the mouse pointer](https://maplibre.org/maplibre-gl-js/docs/examples/get-features-under-the-mouse-pointer/)
   */
  queryRenderedFeatures(geometryOrOptions?: PointLike | [PointLike, PointLike] | QueryRenderedFeaturesOptions, options?: QueryRenderedFeaturesOptions): MapGeoJSONFeature[];
  /**
   * Returns an array of MapGeoJSONFeature objects
   * representing features within the specified vector tile or GeoJSON source that satisfy the query parameters.
   *
   * @param sourceId - The ID of the vector tile or GeoJSON source to query.
   * @param parameters - The options object.
   * @returns An array of MapGeoJSONFeature objects.
   *
   * In contrast to {@link Map.queryRenderedFeatures}, this function returns all features matching the query parameters,
   * whether or not they are rendered by the current style (i.e. visible). The domain of the query includes all currently-loaded
   * vector tiles and GeoJSON source tiles: this function does not check tiles outside the currently
   * visible viewport.
   *
   * Because features come from tiled vector data or GeoJSON data that is converted to tiles internally, feature
   * geometries may be split or duplicated across tile boundaries and, as a result, features may appear multiple
   * times in query results. For example, suppose there is a highway running through the bounding rectangle of a query.
   * The results of the query will be those parts of the highway that lie within the map tiles covering the bounding
   * rectangle, even if the highway extends into other tiles, and the portion of the highway within each map tile
   * will be returned as a separate feature. Similarly, a point feature near a tile boundary may appear in multiple
   * tiles due to tile buffering.
   *
   * @example
   * Find all features in one source layer in a vector source
   * ```ts
   * let features = map.querySourceFeatures('your-source-id', {
   *   sourceLayer: 'your-source-layer'
   * });
   * ```
   *
   */
  querySourceFeatures(sourceId: string, parameters?: QuerySourceFeatureOptions | null): GeoJSONFeature[];
  /**
   * Updates the map's MapLibre style object with a new value.
   *
   * If a style is already set when this is used and options.diff is set to true, the map renderer will attempt to compare the given style
   * against the map's current state and perform only the changes necessary to make the map style match the desired state. Changes in sprites
   * (images used for icons and patterns) and glyphs (fonts for label text) **cannot** be diffed. If the sprites or fonts used in the current
   * style and the given style are different in any way, the map renderer will force a full update, removing the current style and building
   * the given one from scratch.
   *
   *
   * @param style - A JSON object conforming to the schema described in the
   * [MapLibre Style Specification](https://maplibre.org/maplibre-style-spec/), or a URL to such JSON.
   * @param options - The options object.
   *
   * @example
   * ```ts
   * map.setStyle("https://demotiles.maplibre.org/style.json");
   *
   * map.setStyle('https://demotiles.maplibre.org/style.json', {
   *   transformStyle: (previousStyle, nextStyle) => ({
   *       ...nextStyle,
   *       sources: {
   *           ...nextStyle.sources,
   *           // copy a source from previous style
   *           'osm': previousStyle.sources.osm
   *       },
   *       layers: [
   *           // background layer
   *           nextStyle.layers[0],
   *           // copy a layer from previous style
   *           previousStyle.layers[0],
   *           // other layers from the next style
   *           ...nextStyle.layers.slice(1).map(layer => {
   *               // hide the layers we don't need from demotiles style
   *               if (layer.id.startsWith('geolines')) {
   *                   layer.layout = {...layer.layout || {}, visibility: 'none'};
   *               // filter out US polygons
   *               } else if (layer.id.startsWith('coastline') || layer.id.startsWith('countries')) {
   *                   layer.filter = ['!=', ['get', 'ADM0_A3'], 'USA'];
   *               }
   *               return layer;
   *           })
   *       ]
   *   })
   * });
   * ```
   */
  setStyle(style: StyleSpecification | string | null, options?: StyleSwapOptions & StyleOptions): this;
  /**
   *  Updates the requestManager's transform request with a new function
   *
   * @param transformRequest - A callback run before the Map makes a request for an external URL. The callback can be used to modify the url, set headers, or set the credentials property for cross-origin requests.
   * Expected to return an object with a `url` property and optionally `headers` and `credentials` properties
   *
   * @example
   * ```ts
   * map.setTransformRequest((url: string, resourceType: string) => {});
   * ```
   */
  setTransformRequest(transformRequest: RequestTransformFunction | null): this;
  _getUIString(key: keyof typeof defaultLocale): string;
  _updateStyle(style: StyleSpecification | string | null, options?: StyleSwapOptions & StyleOptions): this;
  _lazyInitEmptyStyle(): void;
  _diffStyle(style: StyleSpecification | string, options?: StyleSwapOptions & StyleOptions): Promise<void>;
  _updateDiff(style: StyleSpecification, options?: StyleSwapOptions & StyleOptions): void;
  /**
   * Returns the map's MapLibre style object, a JSON object which can be used to recreate the map's style.
   *
   * @returns The map's style JSON object.
   *
   * @example
   * ```ts
   * let styleJson = map.getStyle();
   * ```
   *
   */
  getStyle(): StyleSpecification;
  /**
   * @internal
   * Returns the map's style and cloned images to restore context.
   * @returns An object containing the style and images.
   */
  _getStyleAndImages(): LostContextStyle;
  /**
   * Returns a Boolean indicating whether the map's style is fully loaded.
   *
   * @returns A Boolean indicating whether the style is fully loaded.
   *
   * @example
   * ```ts
   * let styleLoadStatus = map.isStyleLoaded();
   * ```
   */
  isStyleLoaded(): boolean | void;
  /**
   * Adds a source to the map's style.
   *
   * Events triggered:
   *
   * Triggers the `source.add` event.
   *
   * @param id - The ID of the source to add. Must not conflict with existing sources.
   * @param source - The source object, conforming to the
   * MapLibre Style Specification's [source definition](https://maplibre.org/maplibre-style-spec/sources) or
   * {@link CanvasSourceSpecification}.
   * @example
   * ```ts
   * map.addSource('my-data', {
   *   type: 'vector',
   *   url: 'https://demotiles.maplibre.org/tiles/tiles.json'
   * });
   * ```
   * @example
   * ```ts
   * map.addSource('my-data', {
   *   "type": "geojson",
   *   "data": {
   *     "type": "Feature",
   *     "geometry": {
   *       "type": "Point",
   *       "coordinates": [-77.0323, 38.9131]
   *     },
   *     "properties": {
   *       "title": "Mapbox DC",
   *       "marker-symbol": "monument"
   *     }
   *   }
   * });
   * ```
   * @see GeoJSON source: [Add live realtime data](https://maplibre.org/maplibre-gl-js/docs/examples/add-live-realtime-data/)
   */
  addSource(id: string, source: SourceSpecification | CanvasSourceSpecification): this;
  /**
   * Returns a Boolean indicating whether the source is loaded. Returns `true` if the source with
   * the given ID in the map's style has no outstanding network requests, otherwise `false`.
   *
   * A {@link ErrorEvent} event will be fired if there is no source with the specified ID.
   *
   * @param id - The ID of the source to be checked.
   * @returns A Boolean indicating whether the source is loaded.
   * @example
   * ```ts
   * let sourceLoaded = map.isSourceLoaded('bathymetry-data');
   * ```
   */
  isSourceLoaded(id: string): boolean;
  /**
   * Loads a 3D terrain mesh, based on a "raster-dem" source.
   *
   * Triggers the `terrain` event.
   *
   * @param options - Options object.
   * @example
   * ```ts
   * map.setTerrain({ source: 'terrain' });
   * ```
   */
  setTerrain(options: TerrainSpecification | null): this;
  /**
   * Get the terrain-options if terrain is loaded
   * @returns the TerrainSpecification passed to setTerrain
   * @example
   * ```ts
   * map.getTerrain(); // { source: 'terrain' };
   * ```
   */
  getTerrain(): TerrainSpecification | null;
  /**
   * Returns a Boolean indicating whether all tiles in the viewport from all sources on
   * the style are loaded.
   *
   * @returns A Boolean indicating whether all tiles are loaded.
   * @example
   * ```ts
   * let tilesLoaded = map.areTilesLoaded();
   * ```
   */
  areTilesLoaded(): boolean;
  /**
   * Removes a source from the map's style.
   *
   * @param id - The ID of the source to remove.
   * @example
   * ```ts
   * map.removeSource('bathymetry-data');
   * ```
   */
  removeSource(id: string): Map$1;
  /**
   * Returns the source with the specified ID in the map's style.
   *
   * This method is often used to update a source using the instance members for the relevant
   * source type as defined in classes that derive from {@link Source}.
   * For example, setting the `data` for a GeoJSON source or updating the `url` and `coordinates`
   * of an image source.
   *
   * @param id - The ID of the source to get.
   * @returns The style source with the specified ID or `undefined` if the ID
   * corresponds to no existing sources.
   * The shape of the object varies by source type.
   * A list of options for each source type is available on the MapLibre Style Specification's
   * [Sources](https://maplibre.org/maplibre-style-spec/sources/) page.
   * @example
   * ```ts
   * let sourceObject = map.getSource('points');
   * ```
   * @see [Create a draggable point](https://maplibre.org/maplibre-gl-js/docs/examples/create-a-draggable-point/)
   * @see [Animate a point](https://maplibre.org/maplibre-gl-js/docs/examples/animate-a-point/)
   * @see [Add live realtime data](https://maplibre.org/maplibre-gl-js/docs/examples/add-live-realtime-data/)
   */
  getSource<TSource extends Source>(id: string): TSource | undefined;
  /**
   * Change the tile Level of Detail behavior of the specified source. These parameters have no effect when
   * pitch == 0, and the largest effect when the horizon is visible on screen.
   *
   * @param maxZoomLevelsOnScreen - The maximum number of distinct zoom levels allowed on screen at a time.
   * There will generally be fewer zoom levels on the screen, the maximum can only be reached when the horizon
   * is at the top of the screen. Increasing the maximum number of zoom levels causes the zoom level to decay
   * faster toward the horizon.
   * @param tileCountMaxMinRatio - The ratio of the maximum number of tiles loaded (at high pitch) to the minimum
   * number of tiles loaded. Increasing this ratio allows more tiles to be loaded at high pitch angles. If the ratio
   * would otherwise be exceeded, the zoom level is reduced uniformly to keep the number of tiles within the limit.
   * @param sourceId - The ID of the source to set tile LOD parameters for. All sources will be updated if unspecified.
   * If `sourceId` is specified but a corresponding source does not exist, an error is thrown.
   * @example
   * ```ts
   * map.setSourceTileLodParams(4.0, 3.0, 'terrain');
   * ```
   * @see [Modify Level of Detail behavior](https://maplibre.org/maplibre-gl-js/docs/examples/level-of-detail-control/)
  	 */
  setSourceTileLodParams(maxZoomLevelsOnScreen: number, tileCountMaxMinRatio: number, sourceId?: string): this;
  /**
   * Triggers a reload of the selected tiles
   *
   * @param sourceId - The ID of the source
   * @param tileIds - An array of tile IDs to be reloaded. If not defined, all tiles will be reloaded.
   * @example
   * ```ts
   * map.refreshTiles('satellite', [{x:1024, y: 1023, z: 11}, {x:1023, y: 1023, z: 11}]);
   * ```
   */
  refreshTiles(sourceId: string, tileIds?: Array<{
    x: number;
    y: number;
    z: number;
  }>): void;
  /**
   * Add an image to the style. This image can be displayed on the map like any other icon in the style's
   * sprite using the image's ID with
   * [`icon-image`](https://maplibre.org/maplibre-style-spec/layers/#layout-symbol-icon-image),
   * [`background-pattern`](https://maplibre.org/maplibre-style-spec/layers/#paint-background-background-pattern),
   * [`fill-pattern`](https://maplibre.org/maplibre-style-spec/layers/#paint-fill-fill-pattern),
   * or [`line-pattern`](https://maplibre.org/maplibre-style-spec/layers/#paint-line-line-pattern).
   *
   * A {@link ErrorEvent} event will be fired if the image parameter is invalid or there is not enough space in the sprite to add this image.
   *
   * @param id - The ID of the image.
   * @param image - The image as an `HTMLImageElement`, `ImageData`, `ImageBitmap` or object with `width`, `height`, and `data`
   * properties with the same format as `ImageData`.
   * @param options - Options object.
   * @example
   * ```ts
   * // If the style's sprite does not already contain an image with ID 'cat',
   * // add the image 'cat-icon.png' to the style's sprite with the ID 'cat'.
   * const image = await map.loadImage('https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Cat_silhouette.svg/400px-Cat_silhouette.svg.png');
   * if (!map.hasImage('cat')) map.addImage('cat', image.data);
   *
   * // Add a stretchable image that can be used with `icon-text-fit`
   * // In this example, the image is 600px wide by 400px high.
   * const image = await map.loadImage('https://upload.wikimedia.org/wikipedia/commons/8/89/Black_and_White_Boxed_%28bordered%29.png');
   * if (map.hasImage('border-image')) return;
   * map.addImage('border-image', image.data, {
   *     content: [16, 16, 300, 384], // place text over left half of image, avoiding the 16px border
   *     stretchX: [[16, 584]], // stretch everything horizontally except the 16px border
   *     stretchY: [[16, 384]], // stretch everything vertically except the 16px border
   * });
   * ```
   * @see Use `HTMLImageElement`: [Add an icon to the map](https://maplibre.org/maplibre-gl-js/docs/examples/add-an-icon-to-the-map/)
   * @see Use `ImageData`: [Add a generated icon to the map](https://maplibre.org/maplibre-gl-js/docs/examples/add-a-generated-icon-to-the-map/)
   */
  addImage(id: string, image: HTMLImageElement | ImageBitmap | ImageData | {
    width: number;
    height: number;
    data: Uint8Array | Uint8ClampedArray;
  } | StyleImageInterface, options?: Partial<StyleImageMetadata>): this;
  /**
   * Update an existing image in a style. This image can be displayed on the map like any other icon in the style's
   * sprite using the image's ID with
   * [`icon-image`](https://maplibre.org/maplibre-style-spec/layers/#layout-symbol-icon-image),
   * [`background-pattern`](https://maplibre.org/maplibre-style-spec/layers/#paint-background-background-pattern),
   * [`fill-pattern`](https://maplibre.org/maplibre-style-spec/layers/#paint-fill-fill-pattern),
   * or [`line-pattern`](https://maplibre.org/maplibre-style-spec/layers/#paint-line-line-pattern).
   *
   * An {@link ErrorEvent} will be fired if the image parameter is invalid.
   *
   * @param id - The ID of the image.
   * @param image - The image as an `HTMLImageElement`, `ImageData`, `ImageBitmap` or object with `width`, `height`, and `data`
   * properties with the same format as `ImageData`.
   * @example
   * ```ts
   * // If an image with the ID 'cat' already exists in the style's sprite,
   * // replace that image with a new image, 'other-cat-icon.png'.
   * if (map.hasImage('cat')) map.updateImage('cat', './other-cat-icon.png');
   * ```
   */
  updateImage(id: string, image: HTMLImageElement | ImageBitmap | ImageData | {
    width: number;
    height: number;
    data: Uint8Array | Uint8ClampedArray;
  } | StyleImageInterface): this;
  /**
   * Returns an image, specified by ID, currently available in the map.
   * This includes both images from the style's original sprite
   * and any images that have been added at runtime using {@link Map.addImage}.
   *
   * @param id - The ID of the image.
   * @returns An image in the map with the specified ID.
   *
   * @example
   * ```ts
   * let coffeeShopIcon = map.getImage("coffee_cup");
   * ```
   */
  getImage(id: string): StyleImage;
  /**
   * Check whether or not an image with a specific ID exists in the style. This checks both images
   * in the style's original sprite and any images
   * that have been added at runtime using {@link Map.addImage}.
   *
   * An {@link ErrorEvent} will be fired if the image parameter is invalid.
   *
   * @param id - The ID of the image.
   *
   * @returns A Boolean indicating whether the image exists.
   * @example
   * Check if an image with the ID 'cat' exists in the style's sprite.
   * ```ts
   * let catIconExists = map.hasImage('cat');
   * ```
   */
  hasImage(id: string): boolean;
  /**
   * Remove an image from a style. This can be an image from the style's original
   * sprite or any images
   * that have been added at runtime using {@link Map.addImage}.
   *
   * @param id - The ID of the image.
   *
   * @example
   * ```ts
   * // If an image with the ID 'cat' exists in
   * // the style's sprite, remove it.
   * if (map.hasImage('cat')) map.removeImage('cat');
   * ```
   */
  removeImage(id: string): void;
  /**
   * Load an image from an external URL to be used with {@link Map.addImage}. External
   * domains must support [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS).
   *
   * @param url - The URL of the image file. Image file must be in png, webp, or jpg format.
   * @returns a promise that is resolved when the image is loaded
   *
   * @example
   * Load an image from an external URL.
   * ```ts
   * const response = await map.loadImage('https://picsum.photos/50/50');
   * // Add the loaded image to the style's sprite with the ID 'photo'.
   * map.addImage('photo', response.data);
   * ```
   * @see [Add an icon to the map](https://maplibre.org/maplibre-gl-js/docs/examples/add-an-icon-to-the-map/)
   */
  loadImage(url: string): Promise<GetResourceResponse<HTMLImageElement | ImageBitmap>>;
  /**
   * Returns an Array of strings containing the IDs of all images currently available in the map.
   * This includes both images from the style's original sprite
   * and any images that have been added at runtime using {@link Map.addImage}.
   *
   * @returns An Array of strings containing the names of all sprites/images currently available in the map.
   *
   * @example
   * ```ts
   * let allImages = map.listImages();
   * ```
   */
  listImages(): Array<string>;
  /**
   * Adds a [MapLibre style layer](https://maplibre.org/maplibre-style-spec/layers)
   * to the map's style.
   *
   * A layer defines how data from a specified source will be styled. Read more about layer types
   * and available paint and layout properties in the [MapLibre Style Specification](https://maplibre.org/maplibre-style-spec/layers).
   *
   * @param layer - The layer to add,
   * conforming to either the MapLibre Style Specification's [layer definition](https://maplibre.org/maplibre-style-spec/layers) or,
   * less commonly, the {@link CustomLayerInterface} specification. Can also be a layer definition with an embedded source definition.
   * The MapLibre Style Specification's layer definition is appropriate for most layers.
   *
   * @param beforeId - The ID of an existing layer to insert the new layer before,
   * resulting in the new layer appearing visually beneath the existing layer.
   * If this argument is not specified, the layer will be appended to the end of the layers array
   * and appear visually above all other layers.
   *
   * @example
   * Add a circle layer with a vector source
   * ```ts
   * map.addLayer({
   *   id: 'points-of-interest',
   *   source: {
   *     type: 'vector',
   *     url: 'https://demotiles.maplibre.org/tiles/tiles.json'
   *   },
   *   'source-layer': 'poi_label',
   *   type: 'circle',
   *   paint: {
   *     // MapLibre Style Specification paint properties
   *   },
   *   layout: {
   *     // MapLibre Style Specification layout properties
   *   }
   * });
   * ```
   *
   * @example
   * Define a source before using it to create a new layer
   * ```ts
   * map.addSource('state-data', {
   *   type: 'geojson',
   *   data: 'path/to/data.geojson'
   * });
   *
   * map.addLayer({
   *   id: 'states',
   *   // References the GeoJSON source defined above
   *   // and does not require a `source-layer`
   *   source: 'state-data',
   *   type: 'symbol',
   *   layout: {
   *     // Set the label content to the
   *     // feature's `name` property
   *     text-field: ['get', 'name']
   *   }
   * });
   * ```
   *
   * @example
   * Add a new symbol layer before an existing layer
   * ```ts
   * map.addLayer({
   *   id: 'states',
   *   // References a source that's already been defined
   *   source: 'state-data',
   *   type: 'symbol',
   *   layout: {
   *     // Set the label content to the
   *     // feature's `name` property
   *     text-field: ['get', 'name']
   *   }
   * // Add the layer before the existing `cities` layer
   * }, 'cities');
   * ```
   * @see [Create and style clusters](https://maplibre.org/maplibre-gl-js/docs/examples/create-and-style-clusters/)
   * @see [Add a vector tile source](https://maplibre.org/maplibre-gl-js/docs/examples/add-a-vector-tile-source/)
   * @see [Add a WMS source](https://maplibre.org/maplibre-gl-js/docs/examples/add-a-wms-source/)
   */
  addLayer(layer: AddLayerObject, beforeId?: string): this;
  /**
   * Moves a layer to a different z-position.
   *
   * @param id - The ID of the layer to move.
   * @param beforeId - The ID of an existing layer to insert the new layer before. When viewing the map, the `id` layer will appear beneath the `beforeId` layer. If `beforeId` is omitted, the layer will be appended to the end of the layers array and appear above all other layers on the map.
   *
   * @example
   * Move a layer with ID 'polygon' before the layer with ID 'country-label'. The `polygon` layer will appear beneath the `country-label` layer on the map.
   * ```ts
   * map.moveLayer('polygon', 'country-label');
   * ```
   */
  moveLayer(id: string, beforeId?: string): this;
  /**
   * Removes the layer with the given ID from the map's style.
   *
   * An {@link ErrorEvent} will be fired if the image parameter is invalid.
   *
   * @param id - The ID of the layer to remove
   *
   * @example
   * If a layer with ID 'state-data' exists, remove it.
   * ```ts
   * if (map.getLayer('state-data')) map.removeLayer('state-data');
   * ```
   */
  removeLayer(id: string): this;
  /**
   * Returns the layer with the specified ID in the map's style.
   *
   * @param id - The ID of the layer to get.
   * @returns The layer with the specified ID, or `undefined`
   * if the ID corresponds to no existing layers.
   *
   * @example
   * ```ts
   * let stateDataLayer = map.getLayer('state-data');
   * ```
   * @see [Filter symbols by toggling a list](https://maplibre.org/maplibre-gl-js/docs/examples/filter-symbols-by-toggling-a-list/)
   * @see [Filter symbols by text input](https://maplibre.org/maplibre-gl-js/docs/examples/filter-symbols-by-text-input/)
   */
  getLayer(id: string): StyleLayer | undefined;
  /**
   * Return the ids of all layers currently in the style, including custom layers, in order.
   *
   * @returns ids of layers, in order
   *
   * @example
   * ```ts
   * const orderedLayerIds = map.getLayersOrder();
   * ```
   */
  getLayersOrder(): string[];
  /**
   * Sets the zoom extent for the specified style layer. The zoom extent includes the
   * [minimum zoom level](https://maplibre.org/maplibre-style-spec/layers/#minzoom)
   * and [maximum zoom level](https://maplibre.org/maplibre-style-spec/layers/#maxzoom))
   * at which the layer will be rendered.
   *
   * !!! note
   *     For style layers using vector sources, style layers cannot be rendered at zoom levels lower than the
   *     minimum zoom level of the _source layer_ because the data does not exist at those zoom levels. If the minimum
   *     zoom level of the source layer is higher than the minimum zoom level defined in the style layer, the style
   *     layer will not be rendered at all zoom levels in the zoom range.
   *
   * @param layerId - The ID of the layer to which the zoom extent will be applied.
   * @param minzoom - The minimum zoom to set (0-24).
   * @param maxzoom - The maximum zoom to set (0-24).
   *
   * @example
   * ```ts
   * map.setLayerZoomRange('my-layer', 2, 5);
   * ```
   */
  setLayerZoomRange(layerId: string, minzoom: number, maxzoom: number): this;
  /**
   * Sets the filter for the specified style layer.
   *
   * Filters control which features a style layer renders from its source.
   * Any feature for which the filter expression evaluates to `true` will be
   * rendered on the map. Those that are false will be hidden.
   *
   * Use `setFilter` to show a subset of your source data.
   *
   * To clear the filter, pass `null` or `undefined` as the second parameter.
   *
   * @param layerId - The ID of the layer to which the filter will be applied.
   * @param filter - The filter, conforming to the MapLibre Style Specification's
   * [filter definition](https://maplibre.org/maplibre-style-spec/layers/#filter).  If `null` or `undefined` is provided, the function removes any existing filter from the layer.
   * @param options - Options object.
   *
   * @example
   * Display only features with the 'name' property 'USA'
   * ```ts
   * map.setFilter('my-layer', ['==', ['get', 'name'], 'USA']);
   * ```
   * @example
   * Display only features with five or more 'available-spots'
   * ```ts
   * map.setFilter('bike-docks', ['>=', ['get', 'available-spots'], 5]);
   * ```
   * @example
   * Remove the filter for the 'bike-docks' style layer
   * ```ts
   * map.setFilter('bike-docks', null);
   * ```
   * @see [Create a timeline animation](https://maplibre.org/maplibre-gl-js/docs/examples/create-a-time-slider/)
   */
  setFilter(layerId: string, filter?: FilterSpecification | null, options?: StyleSetterOptions): this;
  /**
   * Returns the filter applied to the specified style layer.
   *
   * @param layerId - The ID of the style layer whose filter to get.
   * @returns The layer's filter.
   */
  getFilter(layerId: string): FilterSpecification | void;
  /**
   * Sets the value of a paint property in the specified style layer.
   *
   * @param layerId - The ID of the layer to set the paint property in.
   * @param name - The name of the paint property to set.
   * @param value - The value of the paint property to set.
   * Must be of a type appropriate for the property, as defined in the [MapLibre Style Specification](https://maplibre.org/maplibre-style-spec/).
   * Pass `null` to unset the existing value.
   * @param options - Options object.
   * @example
   * ```ts
   * map.setPaintProperty('my-layer', 'fill-color', '#faafee');
   * ```
   * @see [Change a layer's color with buttons](https://maplibre.org/maplibre-gl-js/docs/examples/change-a-layers-color-with-buttons/)
   * @see [Create a draggable point](https://maplibre.org/maplibre-gl-js/docs/examples/create-a-draggable-point/)
   */
  setPaintProperty(layerId: string, name: string, value: any, options?: StyleSetterOptions): this;
  /**
   * Returns the value of a paint property in the specified style layer.
   *
   * @param layerId - The ID of the layer to get the paint property from.
   * @param name - The name of a paint property to get.
   * @returns The value of the specified paint property.
   */
  getPaintProperty(layerId: string, name: string): unknown;
  /**
   * Sets the value of a layout property in the specified style layer.
   *
   * @param layerId - The ID of the layer to set the layout property in.
   * @param name - The name of the layout property to set.
   * @param value - The value of the layout property. Must be of a type appropriate for the property, as defined in the [MapLibre Style Specification](https://maplibre.org/maplibre-style-spec/).
   * @param options - The options object.
   * @example
   * ```ts
   * map.setLayoutProperty('my-layer', 'visibility', 'none');
   * ```
   */
  setLayoutProperty(layerId: string, name: string, value: any, options?: StyleSetterOptions): this;
  /**
   * Returns the value of a layout property in the specified style layer.
   *
   * @param layerId - The ID of the layer to get the layout property from.
   * @param name - The name of the layout property to get.
   * @returns The value of the specified layout property.
   */
  getLayoutProperty(layerId: string, name: string): any;
  /**
  * Sets the value of the style's glyphs property. Pass a falsy value (null or undefined)
  * to unset glyphs.
   *
   * @param glyphsUrl - Glyph URL to set. Must conform to the [MapLibre Style Specification](https://maplibre.org/maplibre-style-spec/glyphs/).
   * @param options - Options object.
   * @example
   * ```ts
   * map.setGlyphs('https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf');
   * ```
   */
  setGlyphs(glyphsUrl: string | null | undefined, options?: StyleSetterOptions): this;
  /**
   * Returns the value of the style's glyphs URL
   *
   * @returns glyphs Style's glyphs url, or `null` if glyphs are unset.
   */
  getGlyphs(): string | null;
  /**
   * Adds a sprite to the map's style. Fires the `style` event.
   *
   * @param id - The ID of the sprite to add. Must not conflict with existing sprites.
   * @param url - The URL to load the sprite from
   * @param options - Options object.
   * @example
   * ```ts
   * map.addSprite('sprite-two', 'http://example.com/sprite-two');
   * ```
   */
  addSprite(id: string, url: string, options?: StyleSetterOptions): this;
  /**
   * Removes the sprite from the map's style. Fires the `style` event.
   *
   * @param id - The ID of the sprite to remove. If the sprite is declared as a single URL, the ID must be "default".
   * @example
   * ```ts
   * map.removeSprite('sprite-two');
   * map.removeSprite('default');
   * ```
   */
  removeSprite(id: string): this;
  /**
   * Returns the as-is value of the style's sprite.
   *
   * @returns style's sprite list of id-url pairs
   */
  getSprite(): {
    id: string;
    url: string;
  }[];
  /**
   * Sets the value of the style's sprite property.
   *
   * @param spriteUrl - Sprite URL to set.
   * @param options - Options object.
   * @example
   * ```ts
   * map.setSprite('YOUR_SPRITE_URL');
   * ```
   */
  setSprite(spriteUrl: string | null, options?: StyleSetterOptions): this;
  /**
   * Sets the any combination of light values.
   *
   * @param light - Light properties to set. Must conform to the [MapLibre Style Specification](https://maplibre.org/maplibre-style-spec/light).
   * @param options - Options object.
   *
   * @example
   * ```ts
   * let layerVisibility = map.getLayoutProperty('my-layer', 'visibility');
   * ```
   */
  setLight(light: LightSpecification, options?: StyleSetterOptions): this;
  /**
   * Returns the value of the light object.
   *
   * @returns light Light properties of the style.
   */
  getLight(): LightSpecification;
  /**
   * Sets the value of style's sky properties.
   *
   * @param sky - Sky properties to set. Must conform to the [MapLibre Style Specification](https://maplibre.org/maplibre-style-spec/sky/).
   * @param options - Options object.
   *
   * @example
   * ```ts
   * map.setSky({'atmosphere-blend': 1.0});
   * ```
   */
  setSky(sky: SkySpecification, options?: StyleSetterOptions): this;
  /**
   * Returns the value of the style's sky.
   *
   * @returns the sky properties of the style.
   * @example
   * ```ts
   * map.getSky();
   * ```
   */
  getSky(): SkySpecification;
  /**
   * Sets the `state` of a feature.
   * A feature's `state` is a set of user-defined key-value pairs that are assigned to a feature at runtime.
   * When using this method, the `state` object is merged with any existing key-value pairs in the feature's state.
   * Features are identified by their `feature.id` attribute, which can be any number or string.
   *
   * This method can only be used with sources that have a `feature.id` attribute. The `feature.id` attribute can be defined in three ways:
   *
   * - For vector or GeoJSON sources, including an `id` attribute in the original data file.
   * - For vector or GeoJSON sources, using the [`promoteId`](https://maplibre.org/maplibre-style-spec/sources/#promoteid) option at the time the source is defined.
   * - For GeoJSON sources, using the [`generateId`](https://maplibre.org/maplibre-style-spec/sources/#generateid) option to auto-assign an `id` based on the feature's index in the source data. If you change feature data using `map.getSource('some id').setData(..)`, you may need to re-apply state taking into account updated `id` values.
   *
   * !!! note
   *     You can use the [`feature-state` expression](https://maplibre.org/maplibre-style-spec/expressions/#feature-state) to access the values in a feature's state object for the purposes of styling.
   *
   * @param feature - Feature identifier. Feature objects returned from
   * {@link Map.queryRenderedFeatures} or event handlers can be used as feature identifiers.
   * @param state - A set of key-value pairs. The values should be valid JSON types.
   *
   * @example
   * ```ts
   * // When the mouse moves over the `my-layer` layer, update
   * // the feature state for the feature under the mouse
   * map.on('mousemove', 'my-layer', (e) => {
   *   if (e.features.length > 0) {
   *     map.setFeatureState({
   *       source: 'my-source',
   *       sourceLayer: 'my-source-layer',
   *       id: e.features[0].id,
   *     }, {
   *       hover: true
   *     });
   *   }
   * });
   * ```
   * @see [Create a hover effect](https://maplibre.org/maplibre-gl-js/docs/examples/create-a-hover-effect/)
   */
  setFeatureState(feature: FeatureIdentifier, state: any): this;
  /**
   * Removes the `state` of a feature, setting it back to the default behavior.
   * If only a `target.source` is specified, it will remove the state for all features from that source.
   * If `target.id` is also specified, it will remove all keys for that feature's state.
   * If `key` is also specified, it removes only that key from that feature's state.
   * Features are identified by their `feature.id` attribute, which can be any number or string.
   *
   * @param target - Identifier of where to remove state. It can be a source, a feature, or a specific key of feature.
   * Feature objects returned from {@link Map.queryRenderedFeatures} or event handlers can be used as feature identifiers.
   * @param key - (optional) The key in the feature state to reset.
   * @example
   * Reset the entire state object for all features in the `my-source` source
   * ```ts
   * map.removeFeatureState({
   *   source: 'my-source'
   * });
   * ```
   *
   * @example
   * When the mouse leaves the `my-layer` layer,
   * reset the entire state object for the
   * feature under the mouse
   * ```ts
   * map.on('mouseleave', 'my-layer', (e) => {
   *   map.removeFeatureState({
   *     source: 'my-source',
   *     sourceLayer: 'my-source-layer',
   *     id: e.features[0].id
   *   });
   * });
   * ```
   *
   * @example
   * When the mouse leaves the `my-layer` layer,
   * reset only the `hover` key-value pair in the
   * state for the feature under the mouse
   * ```ts
   * map.on('mouseleave', 'my-layer', (e) => {
   *   map.removeFeatureState({
   *     source: 'my-source',
   *     sourceLayer: 'my-source-layer',
   *     id: e.features[0].id
   *   }, 'hover');
   * });
   * ```
   */
  removeFeatureState(target: FeatureIdentifier, key?: string): this;
  /**
   * Gets the `state` of a feature.
   * A feature's `state` is a set of user-defined key-value pairs that are assigned to a feature at runtime.
   * Features are identified by their `feature.id` attribute, which can be any number or string.
   *
   * !!! note
   *     To access the values in a feature's state object for the purposes of styling the feature, use the [`feature-state` expression](https://maplibre.org/maplibre-style-spec/expressions/#feature-state).
   *
   * @param feature - Feature identifier. Feature objects returned from
   * {@link Map.queryRenderedFeatures} or event handlers can be used as feature identifiers.
   * @returns The state of the feature: a set of key-value pairs that was assigned to the feature at runtime.
   *
   * @example
   * When the mouse moves over the `my-layer` layer,
   * get the feature state for the feature under the mouse
   * ```ts
   * map.on('mousemove', 'my-layer', (e) => {
   *   if (e.features.length > 0) {
   *     map.getFeatureState({
   *       source: 'my-source',
   *       sourceLayer: 'my-source-layer',
   *       id: e.features[0].id
   *     });
   *   }
   * });
   * ```
   */
  getFeatureState(feature: FeatureIdentifier): any;
  /**
   * Returns the map's containing HTML element.
   *
   * @returns The map's container.
   */
  getContainer(): HTMLElement;
  /**
   * Returns the HTML element containing the map's `<canvas>` element.
   *
   * If you want to add non-GL overlays to the map, you should append them to this element.
   *
   * This is the element to which event bindings for map interactivity (such as panning and zooming) are
   * attached. It will receive bubbled events from child elements such as the `<canvas>`, but not from
   * map controls.
   *
   * @returns The container of the map's `<canvas>`.
   * @see [Create a draggable point](https://maplibre.org/maplibre-gl-js/docs/examples/create-a-draggable-point/)
   */
  getCanvasContainer(): HTMLElement;
  /**
   * Returns the map's `<canvas>` element.
   *
   * @returns The map's `<canvas>` element.
   * @see [Measure distances](https://maplibre.org/maplibre-gl-js/docs/examples/measure-distances/)
   * @see [Display a popup on hover](https://maplibre.org/maplibre-gl-js/docs/examples/display-a-popup-on-hover/)
   * @see [Center the map on a clicked symbol](https://maplibre.org/maplibre-gl-js/docs/examples/center-the-map-on-a-clicked-symbol/)
   */
  getCanvas(): HTMLCanvasElement;
  _containerDimensions(): number[];
  /**
   * @internal
   * Sets up the ResizeObserver to track container size changes.
   * Uses the owning window's ResizeObserver for cross-window support.
   */
  private _setupResizeObserver;
  /**
   * @internal
   * Resolves the container option to an HTMLElement.
   * Supports string ID, HTMLElement, or cross-window elements (using nodeType check).
   */
  private _resolveContainer;
  _setupContainer(): void;
  _resizeCanvas(width: number, height: number, pixelRatio: number): void;
  _setupPainter(): void;
  migrateProjection(newTransform: ITransform, newCameraHelper: ICameraHelper): void;
  _contextLost: (event: any) => void;
  _contextRestored: (event: any) => void;
  _onMapScroll: (event: any) => boolean;
  /**
   * Returns a Boolean indicating whether the map is fully loaded.
   *
   * Returns `false` if the style is not yet fully loaded,
   * or if there has been a change to the sources or style that
   * has not yet fully loaded.
   *
   * @returns A Boolean indicating whether the map is fully loaded.
   */
  loaded(): boolean;
  /**
   * @internal
   * Update this map's style and sources, and re-render the map.
   *
   * @param updateStyle - mark the map's style for reprocessing as
   * well as its sources
   */
  _update(updateStyle?: boolean): this;
  /**
   * @internal
   * Request that the given callback be executed during the next render
   * frame.  Schedule a render frame if one is not already scheduled.
   *
   * @returns An id that can be used to cancel the callback
   */
  _requestRenderFrame(callback: () => void): TaskID;
  _cancelRenderFrame(id: TaskID): void;
  /**
   * @internal
   * Call when a (re-)render of the map is required:
   *
   * - The style has changed (`setPaintProperty()`, etc.)
   * - Source data has changed (e.g. tiles have finished loading)
   * - The map has is moving (or just finished moving)
   * - A transition is in progress
   *
   * @param paintStartTimeStamp - The time when the animation frame began executing.
   */
  _render(paintStartTimeStamp: number): this;
  /**
   * Force a synchronous redraw of the map.
   * @example
   * ```ts
   * map.redraw();
   * ```
   */
  redraw(): this;
  /**
   * Clean up and release all internal resources associated with this map.
   *
   * This includes DOM elements, event bindings, web workers, and WebGL resources.
   *
   * Use this method when you are done using the map and wish to ensure that it no
   * longer consumes browser resources. Afterwards, you must not call any other
   * methods on the map.
   */
  remove(): void;
  /**
   * Trigger the rendering of a single frame. Use this method with custom layers to
   * repaint the map when the layer changes. Calling this multiple times before the
   * next frame is rendered will still result in only a single frame being rendered.
   * @example
   * ```ts
   * map.triggerRepaint();
   * ```
   * @see [Add a 3D model](https://maplibre.org/maplibre-gl-js/docs/examples/add-a-3d-model-using-threejs/)
   * @see [Add an animated icon to the map](https://maplibre.org/maplibre-gl-js/docs/examples/add-an-animated-icon-to-the-map/)
   */
  triggerRepaint(): void;
  _onWindowOnline: () => void;
  /**
   * Gets and sets a Boolean indicating whether the map will render an outline
   * around each tile and the tile ID. These tile boundaries are useful for
   * debugging.
   *
   * The uncompressed file size of the first vector source is drawn in the top left
   * corner of each tile, next to the tile ID.
   *
   * @example
   * ```ts
   * map.showTileBoundaries = true;
   * ```
   */
  get showTileBoundaries(): boolean;
  set showTileBoundaries(value: boolean);
  /**
   * Gets and sets a Boolean indicating whether the map will visualize
   * the padding offsets.
   */
  get showPadding(): boolean;
  set showPadding(value: boolean);
  /**
   * Gets and sets a Boolean indicating whether the map will render boxes
   * around all symbols in the data source, revealing which symbols
   * were rendered or which were hidden due to collisions.
   * This information is useful for debugging.
   */
  get showCollisionBoxes(): boolean;
  set showCollisionBoxes(value: boolean);
  /**
   * Gets and sets a Boolean indicating whether the map should color-code
   * each fragment to show how many times it has been shaded.
   * White fragments have been shaded 8 or more times.
   * Black fragments have been shaded 0 times.
   * This information is useful for debugging.
   */
  get showOverdrawInspector(): boolean;
  set showOverdrawInspector(value: boolean);
  /**
   * Gets and sets a Boolean indicating whether the map will
   * continuously repaint. This information is useful for analyzing performance.
   */
  get repaint(): boolean;
  set repaint(value: boolean);
  get vertices(): boolean;
  set vertices(value: boolean);
  /**
   * Returns the package version of the library
   * @returns Package version of the library
   */
  get version(): string;
  /**
   * Returns the elevation for the point where the camera is looking.
   * This value corresponds to:
   * "meters above sea level" * "exaggeration"
   * @returns The elevation.
   */
  getCameraTargetElevation(): number;
  /**
   * Gets the {@link ProjectionSpecification}.
   * @returns the projection specification.
   * @example
   * ```ts
   * let projection = map.getProjection();
   * ```
   */
  getProjection(): ProjectionSpecification;
  /**
   * Sets the {@link ProjectionSpecification}.
   * @param projection - the projection specification to set
   * @returns
   */
  setProjection(projection: ProjectionSpecification): this;
}
/**
 * The {@link NavigationControl} options object
 */
//#endregion
//#region src/index.d.ts
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
};
type AddImageOptions = {
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
};
/**
 * The payload passed to listeners of the
 * {@link MaplibreAreaTransformEventMap.create | create} and
 * {@link MaplibreAreaTransformEventMap.change | change} events.
 */
type MaplibreAreaTransformFeatureEvent = {
  /** The ID of the feature this event refers to. */id: string; /** The feature's corner coordinates in `[lng, lat]` format. */
  coordinates: GeoJSON.Position[];
};
/**
 * The events emitted by {@link MaplibreAreaTransform}, mapped to the arguments
 * passed to their listeners. Use these names with
 * {@link MaplibreAreaTransform.on | on} and {@link MaplibreAreaTransform.off | off}.
 */
type MaplibreAreaTransformEventMap = {
  /** Fired once the control has been added to the map and fully initialized. */init: []; /** Fired when a new area is created (via an image, rectangle or polygon). */
  create: [event: MaplibreAreaTransformFeatureEvent]; /** Fired whenever a feature's coordinates change (move, scale, resize or rotate). */
  change: [event: MaplibreAreaTransformFeatureEvent]; /** Fired when a feature is deleted. The listener receives the deleted feature's ID. */
  delete: [featureId: string];
  /**
   * Fired when the selected feature changes — the listener receives the newly
   * selected feature's ID, or `null` when the selection is cleared. Only fires
   * on an actual change, never redundantly for the same selection.
   */
  selected: [featureId: string | null];
};
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
  private _colorCache;
  private _addedImageIds;
  private _addedLayerIds;
  private _addedSourceIds;
  /**
   * @param options - control options; any omitted option falls back to its default
   */
  constructor(options?: MaplibreAreaTransformOptions);
  /** @inheritdoc */
  onAdd(map: Map$1): HTMLElement;
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
  /**
   * Create the coordinates for an image in mercator projection (centered on the map)
   * @param img The image.
   * @returns The coordinates of the image in GeoJSON format.
   */
  createCoordinatesForLoadedImage(img: HTMLImageElement): GeoJSON.Position[];
  /**
   * Adds an image to the map.
   * @param options - The options for adding the image.
   * @returns The ID of the added image.
   */
  addImage(options: AddImageOptions): Promise<string>;
  setImageOpacity(imageId: string, opacity: number): Promise<void>;
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
  /**
   * Deletes a feature
   * @param featureId - the feature ID to delete
   */
  deleteFeature(featureId: string): Promise<void>;
  /**
   * Sets the background and border color used for newly drawn and selected areas.
   * @param color - any CSS color string
   */
  setAreaColor(color: string): Promise<void>;
  /**
   * Subscribes to a control event.
   * @param event - the event name, see {@link MaplibreAreaTransformEventMap}
   * @param listener - callback invoked with the event's payload
   */
  on<K extends keyof MaplibreAreaTransformEventMap>(event: K, listener: (...args: MaplibreAreaTransformEventMap[K]) => void): void;
  /**
   * Unsubscribes a previously registered event listener.
   * @param event - the event name, see {@link MaplibreAreaTransformEventMap}
   * @param listener - the same callback reference that was passed to {@link MaplibreAreaTransform.on | on}
   */
  off<K extends keyof MaplibreAreaTransformEventMap>(event: K, listener: (...args: MaplibreAreaTransformEventMap[K]) => void): void;
  private onFileSelected;
  private initMapListeners;
  private addTrackedLayer;
  private buildPolygonGeoJSONFeatures;
  private getRotateHandlePoint;
  /** Heading in degrees for scale handle icon rotation */
  private getScaleHandleHeadingSnapped;
  private onMouseMoveForCursor;
  private onMouseDown;
  private setStateFromMouseDown;
  private onMouseMove;
  private onMouseUp;
  private onClick;
  private onClickWhenInPolygonMode;
  private addColoredImages;
  private removeLayer;
  private removeSource;
  private removeImage;
  /** Updates the current selection, emitting `selected` only when it actually changes. */
  private setSelectedFeatureId;
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
//#endregion
export { AddImageOptions, MaplibreAreaTransform, MaplibreAreaTransformEventMap, MaplibreAreaTransformFeatureEvent, MaplibreAreaTransformOptions };