import { describe, it, expect, beforeAll } from 'vitest';
import { recolor } from './image-recolor';
import rotateUrl from '../assets/rotate.png';

const TARGET = 'rgb(0, 0, 255)';

function loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
    });
}

/** Reads the RGBA pixels of an image */
function readPixels(source: HTMLImageElement): ImageData {
    const canvas = document.createElement('canvas');
    canvas.width = source.naturalWidth;
    canvas.height = source.naturalHeight;
    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(source, 0, 0);
    return ctx.getImageData(0, 0, canvas.width, canvas.height);
}

describe('recolor (real rotate.png)', () => {
    let img: HTMLImageElement;
    let imgData: ImageData;

    beforeAll(async () => {
        img = await loadImage(rotateUrl);
        imgData = readPixels(img);
    });

    it('keeps the source dimensions', async () => {
        const result = await recolor(img, TARGET);
        expect(result!.width).toBe(imgData.width);
        expect(result!.height).toBe(imgData.height);
    });


    it('preserves the alpha channel of every pixel', async () => {
        const out = (await recolor(img, TARGET))!.data;
        for (let i = 3; i < imgData.data.length; i += 4) {
            expect(out[i]).toBe(imgData.data[i]);
        }
    });

    it('reads an ImageBitmap source (the type produced by map.loadImage)', async () => {
        const bitmap = await createImageBitmap(img);
        const result = await recolor(bitmap, TARGET);
        expect(result!.width).toBe(imgData.width);
        expect(result!.height).toBe(imgData.height);
    });

    it('returns null when the target color resolves to zero alpha', async () => {
        expect(await recolor(img, 'rgba(0, 0, 0, 0)')).toBeNull();
    });
});
