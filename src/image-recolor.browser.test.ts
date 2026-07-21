import {describe, it, expect, beforeAll} from 'vitest'
import {imageCanvasBounds, paintImageOnCanvas, recolor} from './image-recolor'
import rotateUrl from '../assets/rotate.png'

const TARGET = 'rgb(0, 0, 255)'

function loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const img = new Image()
        img.onload = () => resolve(img)
        img.onerror = reject
        img.src = src
    })
}

/** Reads the RGBA pixels of an image */
function readPixels(source: HTMLImageElement): ImageData {
    const canvas = document.createElement('canvas')
    canvas.width = source.naturalWidth
    canvas.height = source.naturalHeight
    const ctx = canvas.getContext('2d')!
    ctx.drawImage(source, 0, 0)
    return ctx.getImageData(0, 0, canvas.width, canvas.height)
}

describe('recolor (real rotate.png)', () => {
    let img: HTMLImageElement
    let imgData: ImageData

    beforeAll(async () => {
        img = await loadImage(rotateUrl)
        imgData = readPixels(img)
    })

    it('keeps the source dimensions', async () => {
        const result = await recolor(img, TARGET)
        expect(result!.width).toBe(imgData.width)
        expect(result!.height).toBe(imgData.height)
    })

    it('preserves the alpha channel of every pixel', async () => {
        const out = (await recolor(img, TARGET))!.data
        for (let i = 3; i < imgData.data.length; i += 4) {
            expect(out[i]).toBe(imgData.data[i])
        }
    })

    it('reads an ImageBitmap source (the type produced by map.loadImage)', async () => {
        const bitmap = await createImageBitmap(img)
        const result = await recolor(bitmap, TARGET)
        expect(result!.width).toBe(imgData.width)
        expect(result!.height).toBe(imgData.height)
    })

    it('returns null when the target color resolves to zero alpha', async () => {
        expect(await recolor(img, 'rgba(0, 0, 0, 0)')).toBeNull()
    })
})

describe('image canvas mercator warp', () => {
    const MAX_MERCATOR_LAT = 85.051129
    const mercatorY = (lat: number) => {
        const clamped = Math.max(-MAX_MERCATOR_LAT, Math.min(MAX_MERCATOR_LAT, lat))
        const radians = (clamped * Math.PI) / 180
        return (1 - Math.log(Math.tan(radians) + 1 / Math.cos(radians)) / Math.PI) / 2
    }

    it('keeps antimeridian quads from spanning the whole world', () => {
        const bounds = imageCanvasBounds([
            [179, 10],
            [-179, 10],
            [-179, 0],
            [179, 0],
        ])
        expect(bounds[1][0] - bounds[0][0]).toBeCloseTo(2)
    })

    it('places a high-latitude corner with mercator Y, not linear latitude', () => {
        const canvas = document.createElement('canvas')
        canvas.width = 100
        canvas.height = 400
        const source = document.createElement('canvas')
        source.width = source.height = 2
        const sourceCtx = source.getContext('2d')!
        sourceCtx.fillStyle = '#fff'
        sourceCtx.fillRect(0, 0, 2, 2)

        const coordinates: [number, number][] = [
            [0, 80],
            [10, 80],
            [10, 0],
            [0, 60],
        ]
        paintImageOnCanvas(canvas, source, coordinates, 1)

        const topY = mercatorY(80)
        const bottomY = mercatorY(0)
        const mercatorPx = ((mercatorY(60) - topY) / (bottomY - topY)) * canvas.height
        const linearPx = ((80 - 60) / 80) * canvas.height
        const ctx = canvas.getContext('2d')!
        let lastOpaqueY = -1
        for (let y = 0; y < canvas.height; y++) {
            if (ctx.getImageData(1, y, 1, 1).data[3]! > 0) lastOpaqueY = y
        }
        // Left edge ends at BL (lat 60), which must follow mercator Y rather than linear latitude.
        expect(lastOpaqueY).toBeGreaterThan(-1)
        expect(Math.abs(lastOpaqueY - mercatorPx)).toBeLessThan(5)
        expect(Math.abs(lastOpaqueY - linearPx)).toBeGreaterThan(20)
    })
})
