declare module '*.png' {
    const value: string
    export default value
}

declare module 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url' {
    const url: string
    export default url
}
