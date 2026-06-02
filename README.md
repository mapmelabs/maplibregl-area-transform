# MapLibre Area Transfrom

Interactive area transform tool for MapLibre GL JS. Draw, move, resize, rotate, and optionally warp rectangles into quadrilaterals to capture precise lat/lng coordinates. Supports image overlay alignment and georeferencing workflows with real-time visual feedback.

## API Docs

https://mapmelabs.github.io/maplibregl-area-transform/

## Live Demo

https://mapmelabs.github.io/maplibregl-area-transform/demo/

---

The below is still a work in progress...

## Features

- Draw rectangular areas on the map
- Move, resize, and rotate the area
- Optional **quadrilateral mode** (independent corner manipulation)
- Extract exact 4-point lat/lng coordinates
- Optional image overlay for alignment / georeferencing
- Real-time visual feedback during interaction
- Designed for MapLibre GL JS

---

## Use Cases

- Image georeferencing (historical maps, floor plans, overlays)
- Selecting and transforming map regions
- Defining custom bounding areas with rotation
- Aligning arbitrary imagery to geographic coordinates

---

## Installation

```bash
yarn add maplibregl-area-transform
```
or
```bash
npm install maplibregl-area-transform
```
## Basic Usage
```js
import maplibregl from 'maplibre-gl'
import AreaTransform from 'maplibregl-area-transform'

const map = new maplibregl.Map({
  container: 'map',
  style: 'https://demotiles.maplibre.org/style.json',
  center: [0, 0],
  zoom: 2
})

const tool = new AreaTransform({
  // options
})

map.addControl(tool)

// listen to updates
tool.on('change', (coords) => {
  console.log('Area coordinates:', coords)
})
```
### Example Output - Coordinates format
```js
[
  [lng1, lat1],
  [lng2, lat2],
  [lng3, lat3],
  [lng4, lat4]
]
```

## Options

| Option           | Type      | Default | Description |
|-----------------|-----------|---------|-------------|
| `quadrilateral` | boolean   | `false` | Enable free corner manipulation (non-rectangular shape) |
| `rotatable`     | boolean   | `true`  | Allow rotation of the area |
| `resizable`     | boolean   | `true`  | Allow scaling / resizing |
| `draggable`     | boolean   | `true`  | Allow moving the entire area |
| `image`         | string    | `null`  | URL of overlay image (optional) |
| `opacity`       | number    | `1.0`   | Opacity of the overlay image |
| `minSize`       | number    | `0`     | Minimum allowed size of the area (in pixels or map units) |
| `aspectRatio`   | number    | `null`  | Lock aspect ratio (e.g. `1` for square) |

---

## Events

| Event    | Payload                         | Description |
|----------|----------------------------------|-------------|
| `start`  | `{ coordinates }`               | Fired when user starts interaction |
| `change` | `{ coordinates }`               | Fired on any update (drag, resize, rotate, warp) |
| `end`    | `{ coordinates }`               | Fired when interaction ends |
| `create` | `{ coordinates }`               | Fired when a new area is created |
| `delete` | `null`                          | Fired when the area is removed |

 
## Notes
	•	In quadrilateral mode, the shape may become non-rectangular and distort any attached image.
	•	Coordinates are returned in [lng, lat] format.
	•	Designed to work alongside existing MapLibre controls.

---

## Releasing a new version

Releases are produced by the [Release workflow](.github/workflows/release.yaml). You don't bump the version by hand — the workflow does it for you:

1. Go to the repo's **Actions** tab → **Release** → **Run workflow**.
2. Pick the **Version bump** from the dropdown — `patch`, `minor`, or `major` (defaults to `patch`).
3. Run it. The workflow then:
   - builds the package,
   - runs `npm version <bump>`, which updates the `version` in `package.json`, commits it, and creates a matching `vX.Y.Z` git tag,
   - pushes the commit and tag back to the branch,
   - packs the package with `npm pack` and publishes a **GitHub Release** for the tag with the `.tgz` attached.

Choose the bump according to [semver](https://semver.org/): `patch` for bug fixes, `minor` for backwards-compatible features, `major` for breaking changes.

### Consuming a release without npm

Since the package isn't published to npm, install it directly from the release asset URL:

```bash
npm install https://github.com/mapmelabs/maplibregl-area-transform/releases/download/v1.0.1/maplibregl-area-transform-1.0.1.tgz
```

Replace the version in the URL with the release you want. Every release on the [Releases page](https://github.com/mapmelabs/maplibregl-area-transform/releases) has its own permalink.

