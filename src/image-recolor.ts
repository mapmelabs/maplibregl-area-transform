async function getImageData(
    source: HTMLImageElement | ImageBitmap
): Promise<ImageData> {
    const canvas = document.createElement('canvas');

    if (source instanceof HTMLImageElement) {
        canvas.width = source.naturalWidth;
        canvas.height = source.naturalHeight;
    } else {
        // ImageBitmap
        canvas.width = source.width;
        canvas.height = source.height;
    }

    const ctx = canvas.getContext('2d')!;
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
export async function recolor(
    source: HTMLImageElement | ImageBitmap,
    targetColor: string
): Promise<ImageData | null> {
    const imageData = await getImageData(source);
    return applyRecolor(imageData, targetColor);
}

function parseColor(color: string): [number, number, number] | null {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 1;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 1, 1);
    const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
    // If alpha is 0 and color wasn't 'transparent', parsing likely failed
    if (a === 0 && color.trim().toLowerCase() !== 'transparent') return null;
    return [r!, g!, b!];
}

function applyRecolor(originalImageData: ImageData, targetColor: string): ImageData | null {
    const rgb = parseColor(targetColor.trim());
    if (!rgb) return null;

    const src = originalImageData.data;
    const out = new Uint8ClampedArray(src.length);
    const [tr, tg, tb] = rgb;

    for (let i = 0; i < src.length; i += 4) {
        const r = src[i]!;
        const g = src[i + 1]!;
        const b = src[i + 2]!;
        const a = src[i + 3]!;

        // detect warm/orange-ish pixels (broad enough for AA)
        const warm = r > g * 0.9 && r > b * 1.05;

        if (warm) {
            // distance from white (preserves anti-aliasing gradient)
            const minC = Math.min(r, g, b);
            const intensity = (255 - minC) / 255;

            // rebuild: white -> target color
            out[i] = Math.round((1 - intensity) * 255 + intensity * tr);
            out[i + 1] = Math.round((1 - intensity) * 255 + intensity * tg);
            out[i + 2] = Math.round((1 - intensity) * 255 + intensity * tb);
        } else {
            out[i] = r; out[i + 1] = g; out[i + 2] = b;
        }

        out[i + 3] = a; // preserve alpha
    }

    return new ImageData(out, originalImageData.width, originalImageData.height);
}