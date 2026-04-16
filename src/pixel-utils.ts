export type PxPoint = [number, number];

export function pxCentroid(pts: PxPoint[]): PxPoint {
    const x = pts.reduce((s, p) => s + p[0], 0) / pts.length;
    const y = pts.reduce((s, p) => s + p[1], 0) / pts.length;
    return [x, y];
}

export function pxDistance(a: PxPoint, b: PxPoint): number {
    return Math.sqrt((b[0] - a[0]) ** 2 + (b[1] - a[1]) ** 2);
}

/** Angle in radians from a to b */
export function pxAngle(from: PxPoint, to: PxPoint): number {
    return Math.atan2(to[1] - from[1], to[0] - from[0]);
}

/** Rotate a single point around a pivot by `angle` radians */
export function pxRotatePoint(pt: PxPoint, pivot: PxPoint, angle: number): PxPoint {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const dx = pt[0] - pivot[0];
    const dy = pt[1] - pivot[1];
    return [
        pivot[0] + dx * cos - dy * sin,
        pivot[1] + dx * sin + dy * cos
    ];
}

/** Rotate all corners around their centroid */
export function pxRotatePolygon(cornersPx: PxPoint[], startPx: PxPoint, currentPx: PxPoint): PxPoint[] {
    const center = pxCentroid(cornersPx);
    const angle = pxAngle(center, currentPx) - pxAngle(center, startPx);
    return cornersPx.map(pt => pxRotatePoint(pt, center, angle));
}

/** Scale corners from opposite anchor point */
export function pxScalePolygon(cornersPx: PxPoint[], handlePx: PxPoint, currentPx: PxPoint): PxPoint[] {
    const oppositePx = pxGetOppositePoint(cornersPx, handlePx);
    const distStart = pxDistance(handlePx, oppositePx);
    const distCurrent = pxDistance(currentPx, oppositePx);
    if (distStart === 0) return cornersPx;
    const scale = distCurrent / distStart;
    return cornersPx.map(pt => [
        oppositePx[0] + (pt[0] - oppositePx[0]) * scale,
        oppositePx[1] + (pt[1] - oppositePx[1]) * scale
    ] as PxPoint);
}

export function pxResizePolygon(cornersPx: PxPoint[], handlePx: PxPoint, currentPx: PxPoint): PxPoint[] {
    const handleIdx = pxGetClosestPointIndex(cornersPx, handlePx);
    console.log(handleIdx);
    const oppositeIdx = (handleIdx + 2) % 4;
    const adj1Idx = (handleIdx + 1) % 4;
    const adj2Idx = (handleIdx + 3) % 4;

    const opposite = cornersPx[oppositeIdx]!;
    const edge1 = [cornersPx[adj1Idx]![0] - opposite[0]!, cornersPx[adj1Idx]![1] - opposite[1]!];
    const edge2 = [cornersPx[adj2Idx]![0] - opposite[0]!, cornersPx[adj2Idx]![1] - opposite[1]!];

    const delta = [currentPx[0] - opposite[0]!, currentPx[1] - opposite[1]!];
    const s = Math.max(0.1, (delta[0]! * edge1[0]! + delta[1]! * edge1[1]!) / (edge1[0]! ** 2 + edge1[1]! ** 2));
    const t = Math.max(0.1, (delta[0]! * edge2[0]! + delta[1]! * edge2[1]!) / (edge2[0]! ** 2 + edge2[1]! ** 2));

    const newCorners = [...cornersPx] as PxPoint[];
    newCorners[adj1Idx] = [opposite[0] + s * edge1[0]!, opposite[1] + s * edge1[1]!] as PxPoint;
    newCorners[adj2Idx] = [opposite[0] + t * edge2[0]!, opposite[1] + t * edge2[1]!] as PxPoint;
    newCorners[handleIdx] = [
        newCorners[adj1Idx]![0] + newCorners[adj2Idx]![0] - opposite[0]!,
        newCorners[adj1Idx]![1] + newCorners[adj2Idx]![1] - opposite[1]!,
    ] as PxPoint;

    return newCorners;
}

export function pxGetOppositePoint(cornersPx: PxPoint[], handlePx: PxPoint): PxPoint {
    let maxDist = -Infinity;
    let opposite = cornersPx[0]!;
    for (const pt of cornersPx) {
        if (Math.abs(pt[0] - handlePx[0]) < 0.1 && Math.abs(pt[1] - handlePx[1]) < 0.1) continue;
        const d = pxDistance(pt, handlePx);
        if (d > maxDist) { maxDist = d; opposite = pt; }
    }
    return opposite;
}

export function pxMidpoint(a: PxPoint, b: PxPoint): PxPoint {
    return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
}

/** Project a point onto the normal of an edge, return signed pixel distance */
export function pxProjectOntoNormal(edgePx0: PxPoint, edgePx1: PxPoint, fromPx: PxPoint, toPx: PxPoint): number {
    const edgeVec: PxPoint = [edgePx1[0] - edgePx0[0], edgePx1[1] - edgePx0[1]];
    const edgeLen = Math.sqrt(edgeVec[0] ** 2 + edgeVec[1] ** 2);
    if (edgeLen === 0) return 0;
    // Normal perpendicular to edge (pointing inward/outward)
    const normal: PxPoint = [-edgeVec[1] / edgeLen, edgeVec[0] / edgeLen];
    const drag: PxPoint = [toPx[0] - fromPx[0], toPx[1] - fromPx[1]];
    return drag[0] * normal[0] + drag[1] * normal[1];
}

function pxGetClosestPointIndex(cornersPx: PxPoint[], pointPx: PxPoint): number {
    let closest = 0;
    let minDist = Infinity;
    for (let i = 0; i < cornersPx.length; i++) {
        const d = pxDistance(pointPx, cornersPx[i]!);
        if (d < minDist) {
            minDist = d;
            closest = i;
        }
    }
    return closest;
}

export function pxMovePoints(cornersPx: PxPoint[], startPx: PxPoint, currentPx: PxPoint) {
    const dx = currentPx[0] - startPx[0];
    const dy = currentPx[1] - startPx[1];
    return cornersPx!.map(p => [p[0] + dx, p[1] + dy] as PxPoint);
}

/**
 * Sort points in clockwise order starting from the top-left corner.
 * @param corners The corners of the rectangle.
 * @returns The sorted corners of the rectangle.
 */
export function sortPoints(points: PxPoint[]): PxPoint[] {
    const centerPx = pxCentroid(points);
    const indexed = points.map((px, i) => ({
        px, i,
        angle: Math.atan2(px[1] - centerPx[1], px[0] - centerPx[0])
    }));
    indexed.sort((a, b) => a.angle - b.angle);

    // Find top-left (min x - y in pixel space)
    let topLeftIndex = 0;
    let minVal = Infinity;
    indexed.forEach((item, i) => {
        const val = item.px[0] - item.px[1];
        if (val < minVal) {
            minVal = val;
            topLeftIndex = i;
        }
    });

    const sorted = [...indexed.slice(topLeftIndex), ...indexed.slice(0, topLeftIndex)];
    return sorted.map(item => points[item.i]!);
}