import type {PxPoint} from './pixel-utils'

type Triangle = [number, number, number, number, number, number]

async function getImageData(source: HTMLImageElement | ImageBitmap): Promise<ImageData> {
    const canvas = document.createElement('canvas')

    if (source instanceof HTMLImageElement) {
        canvas.width = source.naturalWidth
        canvas.height = source.naturalHeight
    } else {
        // ImageBitmap
        canvas.width = source.width
        canvas.height = source.height
    }

    const ctx = canvas.getContext('2d')!
    ctx.drawImage(source, 0, 0)
    return ctx.getImageData(0, 0, canvas.width, canvas.height)
}

/**
 * Recolor an image to a target color
 * This assumes the original images as part of this project has a white halo and internal orange.
 * @param source The image to recolor
 * @param targetColor The target color
 * @returns The recolored image data
 */
export async function recolor(source: HTMLImageElement | ImageBitmap, targetColor: string): Promise<ImageData | null> {
    const imageData = await getImageData(source)
    return applyRecolor(imageData, targetColor)
}

function parseColor(color: string): [number, number, number] | null {
    const canvas = document.createElement('canvas')
    canvas.width = canvas.height = 1
    const ctx = canvas.getContext('2d')!
    ctx.fillStyle = color
    ctx.fillRect(0, 0, 1, 1)
    const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data
    // If alpha is 0 and color wasn't 'transparent', parsing likely failed
    if (a === 0 && color.trim().toLowerCase() !== 'transparent') return null
    return [r!, g!, b!]
}

function applyRecolor(originalImageData: ImageData, targetColor: string): ImageData | null {
    const rgb = parseColor(targetColor.trim())
    if (!rgb) return null

    const src = originalImageData.data
    const out = new Uint8ClampedArray(src.length)
    const [tr, tg, tb] = rgb

    for (let i = 0; i < src.length; i += 4) {
        const r = src[i]!
        const g = src[i + 1]!
        const b = src[i + 2]!
        const a = src[i + 3]!

        // detect warm/orange-ish pixels (broad enough for AA)
        const warm = r > g * 0.9 && r > b * 1.05

        if (warm) {
            // distance from white (preserves anti-aliasing gradient)
            const minC = Math.min(r, g, b)
            const intensity = (255 - minC) / 255

            // rebuild: white -> target color
            out[i] = Math.round((1 - intensity) * 255 + intensity * tr)
            out[i + 1] = Math.round((1 - intensity) * 255 + intensity * tg)
            out[i + 2] = Math.round((1 - intensity) * 255 + intensity * tb)
        } else {
            out[i] = r
            out[i + 1] = g
            out[i + 2] = b
        }

        out[i + 3] = a // preserve alpha
    }

    return new ImageData(out, originalImageData.width, originalImageData.height)
}

function bilinear(corners: PxPoint[], u: number, v: number): PxPoint {
    const [tl, tr, br, bl] = corners
    const top: PxPoint = [tl![0] + (tr![0] - tl![0]) * u, tl![1] + (tr![1] - tl![1]) * u]
    const bottom: PxPoint = [bl![0] + (br![0] - bl![0]) * u, bl![1] + (br![1] - bl![1]) * u]
    return [top[0] + (bottom[0] - top[0]) * v, top[1] + (bottom[1] - top[1]) * v]
}

function drawTriangle(
    ctx: CanvasRenderingContext2D,
    image: CanvasImageSource,
    source: Triangle,
    destination: Triangle,
): void {
    const [u0, v0, u1, v1, u2, v2] = source
    const [x0, y0, x1, y1, x2, y2] = destination
    const d = u0 * v1 + v0 * u2 + u1 * v2 - v1 * u2 - v0 * u1 - u0 * v2
    if (Math.abs(d) < 1e-6) return

    ctx.save()
    ctx.beginPath()
    ctx.moveTo(x0, y0)
    ctx.lineTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.closePath()
    ctx.clip()
    ctx.transform(
        (x0 * v1 + v0 * x2 + x1 * v2 - v1 * x2 - v0 * x1 - x0 * v2) / d,
        (y0 * v1 + v0 * y2 + y1 * v2 - v1 * y2 - v0 * y1 - y0 * v2) / d,
        (u0 * x1 + x0 * u2 + u1 * x2 - x1 * u2 - x0 * u1 - u0 * x2) / d,
        (u0 * y1 + y0 * u2 + u1 * y2 - y1 * u2 - y0 * u1 - u0 * y2) / d,
        (u0 * v1 * x2 + v0 * x1 * u2 + x0 * u1 * v2 - x0 * v1 * u2 - v0 * u1 * x2 - u0 * x1 * v2) / d,
        (u0 * v1 * y2 + v0 * y1 * u2 + y0 * u1 * v2 - y0 * v1 * u2 - v0 * u1 * y2 - u0 * y1 * v2) / d,
    )
    ctx.drawImage(image, 0, 0)
    ctx.restore()
}

type LngLatCoord = [number, number]

const MAX_MERCATOR_LAT = 85.051129

const imageSizeGet = (
    image: CanvasImageSource & {
        width?: number
        height?: number
        naturalWidth?: number
        naturalHeight?: number
    },
) => ({
    width: 'naturalWidth' in image && image.naturalWidth ? image.naturalWidth : image.width!,
    height: 'naturalHeight' in image && image.naturalHeight ? image.naturalHeight : image.height!,
})

function mercatorY(lat: number): number {
    const clamped = Math.max(-MAX_MERCATOR_LAT, Math.min(MAX_MERCATOR_LAT, lat))
    const radians = (clamped * Math.PI) / 180
    return (1 - Math.log(Math.tan(radians) + 1 / Math.cos(radians)) / Math.PI) / 2
}

function unwrapCoordinates(coordinates: LngLatCoord[]): LngLatCoord[] {
    const anchor = coordinates[0]?.[0] ?? 0
    return coordinates.map(([lng, lat]) => [lng + 360 * Math.round((anchor - lng) / 360), lat])
}

export function imageCanvasBounds(coordinates: LngLatCoord[]): [LngLatCoord, LngLatCoord, LngLatCoord, LngLatCoord] {
    const unwrapped = unwrapCoordinates(coordinates)
    const lngs = unwrapped.map(([lng]) => lng)
    const lats = unwrapped.map(([, lat]) => lat)
    const minLng = Math.min(...lngs)
    const maxLng = Math.max(...lngs)
    const minLat = Math.min(...lats)
    const maxLat = Math.max(...lats)
    return [
        [minLng, maxLat],
        [maxLng, maxLat],
        [maxLng, minLat],
        [minLng, minLat],
    ]
}

export function paintImageOnCanvas(
    canvas: HTMLCanvasElement,
    image: CanvasImageSource & {
        width?: number
        height?: number
        naturalWidth?: number
        naturalHeight?: number
    },
    coordinates: LngLatCoord[],
    grid = 12,
): [LngLatCoord, LngLatCoord, LngLatCoord, LngLatCoord] {
    const unwrapped = unwrapCoordinates(coordinates)
    const bounds = imageCanvasBounds(unwrapped)
    const minLng = bounds[0][0]
    const maxLng = bounds[1][0]
    const topY = mercatorY(bounds[0][1])
    const bottomY = mercatorY(bounds[3][1])
    const lngSpan = Math.max(maxLng - minLng, 1e-12)
    const mercatorSpan = Math.max(bottomY - topY, 1e-12)
    const destination = unwrapped.map(([lng, lat]): PxPoint => [
        ((lng - minLng) / lngSpan) * canvas.width,
        ((mercatorY(lat) - topY) / mercatorSpan) * canvas.height,
    ])
    const {width, height} = imageSizeGet(image)
    drawImageQuad(canvas.getContext('2d')!, image, width, height, destination, grid)
    return bounds
}

export function drawImageQuad(
    ctx: CanvasRenderingContext2D,
    image: CanvasImageSource,
    imageWidth: number,
    imageHeight: number,
    destination: PxPoint[],
    grid = 12,
): void {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    for (let x = 0; x < grid; x++) {
        for (let y = 0; y < grid; y++) {
            const u0 = x / grid,
                u1 = (x + 1) / grid
            const v0 = y / grid,
                v1 = (y + 1) / grid
            const p00 = bilinear(destination, u0, v0)
            const p10 = bilinear(destination, u1, v0)
            const p11 = bilinear(destination, u1, v1)
            const p01 = bilinear(destination, u0, v1)
            drawTriangle(
                ctx,
                image,
                [
                    u0 * imageWidth,
                    v0 * imageHeight,
                    u1 * imageWidth,
                    v0 * imageHeight,
                    u1 * imageWidth,
                    v1 * imageHeight,
                ],
                [...p00, ...p10, ...p11],
            )
            drawTriangle(
                ctx,
                image,
                [
                    u0 * imageWidth,
                    v0 * imageHeight,
                    u1 * imageWidth,
                    v1 * imageHeight,
                    u0 * imageWidth,
                    v1 * imageHeight,
                ],
                [...p00, ...p11, ...p01],
            )
        }
    }
}
