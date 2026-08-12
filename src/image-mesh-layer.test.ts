import {describe, expect, it} from 'vitest'
import {imageMeshDataGet, type ImageMeshCoordinates} from './image-mesh-layer'

const coordinates: ImageMeshCoordinates = [
    [-10, 10],
    [10, 10],
    [20, -10],
    [-20, -10],
]

describe('imageMeshDataGet', () => {
    it('builds a subdivided indexed quad with stable UV corners', () => {
        const {vertices, indices} = imageMeshDataGet(coordinates, 2)

        expect(vertices.length).toBe(36)
        expect(indices.length).toBe(24)
        expect([...vertices.slice(2, 4)]).toEqual([0, 0])
        expect([...vertices.slice(10, 12)]).toEqual([1, 0])
        expect([...vertices.slice(-2)]).toEqual([1, 1])
    })

    it('bilinearly moves interior vertices when one corner moves inward', () => {
        const original = imageMeshDataGet(coordinates, 2).vertices
        const movedCoordinates: ImageMeshCoordinates = [[0, 0], coordinates[1], coordinates[2], coordinates[3]]
        const moved = imageMeshDataGet(movedCoordinates, 2).vertices
        const centerOffset = (1 * 3 + 1) * 4

        expect(moved[centerOffset]).not.toBe(original[centerOffset])
        expect(moved[centerOffset + 1]).not.toBe(original[centerOffset + 1])
    })

    it('unwraps coordinates that cross the antimeridian', () => {
        const crossing: ImageMeshCoordinates = [
            [170, 10],
            [-170, 10],
            [-170, -10],
            [170, -10],
        ]
        const {vertices} = imageMeshDataGet(crossing, 1)

        expect(Math.abs(vertices[4]! - vertices[0]!)).toBeLessThan(0.1)
    })
})
