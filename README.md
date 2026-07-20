# MapLibre Area Transfrom

Interactive area transform tool for MapLibre GL JS. Draw, move, resize, rotate, and optionally warp rectangles into quadrilaterals to capture precise lat/lng coordinates. Supports image overlay alignment and georeferencing workflows with real-time visual feedback.

## API Docs

https://mapmelabs.github.io/maplibregl-area-transform/

## Live Demo

https://mapmelabs.github.io/maplibregl-area-transform/demo/

## Use Cases

- Image georeferencing (historical maps, floor plans, overlays)
- Selecting and transforming map regions
- Defining custom bounding areas with rotation

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
    zoom: 2,
})

const tool = new AreaTransform({
    // options
})

map.addControl(tool)

// listen to updates
tool.on('change', coords => {
    console.log('Area coordinates:', coords)
})
```

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

### Consuming a release

Since the package isn't published to npm, install it directly from the release asset URL:

```bash
npm install https://github.com/mapmelabs/maplibregl-area-transform/releases/download/v1.1.1/maplibregl-area-transform-1.1.1.tgz
```

Replace the version in the URL with the release you want. Every release on the [Releases page](https://github.com/mapmelabs/maplibregl-area-transform/releases) has its own permalink.
