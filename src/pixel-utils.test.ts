import { describe, it, expect } from 'vitest';
import { pxGetOppositePoint, type PxPoint } from './pixel-utils';

describe('pxGetOppositePoint', () => {
    it('returns the diagonal corner of a rectangle', () => {
        const corners: PxPoint[] = [[0, 0], [10, 0], [10, 10], [0, 10]];
        expect(pxGetOppositePoint(corners, [0, 0])).toEqual([10, 10]);
        expect(pxGetOppositePoint(corners, [10, 0])).toEqual([0, 10]);
    });

    it('resolves the handle from the closest corner when not given exactly', () => {
        const corners: PxPoint[] = [[0, 0], [10, 0], [10, 10], [0, 10]];
        expect(pxGetOppositePoint(corners, [0.3, -0.2])).toEqual([10, 10]);
    });

    it('picks the point half-way around by arc length, not by corner count', () => {
        const corners: PxPoint[] = [
            [0, 0],     // handle
            [1, 0],     // clustered
            [2, 0],     // clustered  <- count-based opposite (floor(5/2) = 2)
            [100, 0],   // far side   <- arc-length opposite
            [50, 50],
        ];
        const opposite = pxGetOppositePoint(corners, [0, 0]);

        expect(opposite).toEqual([100, 0]);
        expect(opposite).not.toEqual([2, 0]);
    });
});
