import {describe, it, expect} from 'vitest'
import {
    pxCentroid,
    pxDistance,
    pxAngle,
    pxRotatePoint,
    pxRotatePolygon,
    pxScalePolygon,
    pxResizePolygon,
    pxGetOppositePoint,
    pxMidpoint,
    pxProjectOntoNormal,
    pxMovePoints,
    sortPoints,
    type PxPoint,
} from './pixel-utils'

const SQUARE: PxPoint[] = [
    [0, 0],
    [10, 0],
    [10, 10],
    [0, 10],
]

describe('pxGetOppositePoint', () => {
    it('returns the diagonal corner of a rectangle', () => {
        expect(pxGetOppositePoint(SQUARE, [0, 0])).toEqual([10, 10])
        expect(pxGetOppositePoint(SQUARE, [10, 0])).toEqual([0, 10])
    })

    it('resolves the handle from the closest corner when not given exactly', () => {
        expect(pxGetOppositePoint(SQUARE, [0.3, -0.2])).toEqual([10, 10])
    })

    it('picks the point half-way around by arc length, not by corner count', () => {
        // 3 corners clustered by the handle; count-based would pick [2, 0], arc-length picks [100, 0].
        const corners: PxPoint[] = [
            [0, 0],
            [1, 0],
            [2, 0],
            [100, 0],
            [50, 50],
        ]
        const opposite = pxGetOppositePoint(corners, [0, 0])

        expect(opposite).toEqual([100, 0])
        expect(opposite).not.toEqual([2, 0])
    })
})

describe('pxCentroid', () => {
    it('returns the average of all points', () => {
        expect(pxCentroid(SQUARE)).toEqual([5, 5])
    })
})

describe('pxDistance', () => {
    it('returns the euclidean distance (3-4-5 triangle)', () => {
        expect(pxDistance([0, 0], [3, 4])).toBe(5)
    })
})

describe('pxAngle', () => {
    it('returns the angle in radians from one point to another', () => {
        expect(pxAngle([0, 0], [1, 0])).toBeCloseTo(0)
        expect(pxAngle([0, 0], [0, 1])).toBeCloseTo(Math.PI / 2)
        expect(pxAngle([0, 0], [-1, 0])).toBeCloseTo(Math.PI)
    })
})

describe('pxRotatePoint', () => {
    it('rotates [1, 0] by 90° around the origin to [0, 1]', () => {
        const [x, y] = pxRotatePoint([1, 0], [0, 0], Math.PI / 2)
        expect(x).toBeCloseTo(0)
        expect(y).toBeCloseTo(1)
    })

    it('leaves the pivot itself unchanged', () => {
        expect(pxRotatePoint([5, 5], [5, 5], 1.234)).toEqual([5, 5])
    })
})

describe('pxRotatePolygon', () => {
    it('rotates corners around the centroid by a 90° drag', () => {
        const rotated = pxRotatePolygon(SQUARE, [10, 5], [5, 10])
        expect(rotated[0]![0]).toBeCloseTo(10)
        expect(rotated[0]![1]).toBeCloseTo(0)
    })
})

describe('pxScalePolygon', () => {
    it('doubles the shape, scaling from the corner opposite the handle', () => {
        const scaled = pxScalePolygon(SQUARE, [10, 10], [20, 20])
        expect(scaled).toEqual([
            [0, 0],
            [20, 0],
            [20, 20],
            [0, 20],
        ])
    })

    it('returns a zero-size shape unchanged when handle and anchor coincide', () => {
        const degenerate: PxPoint[] = [
            [5, 5],
            [5, 5],
            [5, 5],
            [5, 5],
        ]
        expect(pxScalePolygon(degenerate, [5, 5], [20, 20])).toEqual(degenerate)
    })
})

describe('pxResizePolygon', () => {
    it('moves the dragged corner while keeping the opposite corner fixed', () => {
        const resized = pxResizePolygon(SQUARE, [0, 0], [-10, -10])
        expect(resized).toEqual([
            [-10, -10],
            [10, -10],
            [10, 10],
            [-10, 10],
        ])
        expect(resized[2]).toEqual([10, 10])
    })
})

describe('pxMidpoint', () => {
    it('returns the midpoint between two points', () => {
        expect(pxMidpoint([0, 0], [10, 20])).toEqual([5, 10])
    })
})

describe('pxProjectOntoNormal', () => {
    it('returns the drag distance perpendicular to the edge', () => {
        expect(pxProjectOntoNormal([0, 0], [10, 0], [5, 5], [5, 15])).toBeCloseTo(10)
    })

    it('returns ~0 for a drag parallel to the edge', () => {
        expect(pxProjectOntoNormal([0, 0], [10, 0], [5, 5], [15, 5])).toBeCloseTo(0)
    })

    it('returns 0 for a zero-length edge', () => {
        expect(pxProjectOntoNormal([5, 5], [5, 5], [0, 0], [10, 20])).toBe(0)
    })
})

describe('pxMovePoints', () => {
    it('translates every point by the drag delta', () => {
        const moved = pxMovePoints(
            [
                [0, 0],
                [10, 10],
            ],
            [0, 0],
            [5, -3],
        )
        expect(moved).toEqual([
            [5, -3],
            [15, 7],
        ])
    })
})

describe('sortPoints', () => {
    it('orders scrambled points into a non-self-intersecting loop', () => {
        const scrambled: PxPoint[] = [
            [10, 10],
            [0, 0],
            [0, 10],
            [10, 0],
        ]
        expect(sortPoints(scrambled)).toEqual([
            [0, 10],
            [0, 0],
            [10, 0],
            [10, 10],
        ])
    })
})
