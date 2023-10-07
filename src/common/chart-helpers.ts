export interface Point {
    x: number
    y: number
}

export const getSplineLine = (pointA: Point, pointB: Point) => {
    const lengthX = pointB.x - pointA.x
    const lengthY = pointB.y - pointA.y

    return {
        length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
        angle: Math.atan2(lengthY, lengthX),
    }
}

export const getControlPoint = (
    current: Point,
    previous: Point,
    next: Point,
    reverse?: boolean
) => {
    const p = previous || current
    const n = next || current
    const smoothing = 0.2
    const o = getSplineLine(p, n)
    const angle = o.angle + (reverse ? Math.PI : 0)
    const length = o.length * smoothing
    const x = current.x + Math.cos(angle) * length
    const y = current.y + Math.sin(angle) * length

    return {
        x: Math.round(x * 100) / 100,
        y: Math.round(y * 100) / 100,
    }
}

export const bezierCommand = (point: Point, i: number, a: Point[]) => {
    const { x: cpsX, y: cpsY } = getControlPoint(a[i - 1], a[i - 2], point)
    const { x: cpeX, y: cpeY } = getControlPoint(
        point,
        a[i - 1],
        a[i + 1],
        true
    )
    return `C ${cpsX},${cpsY} ${cpeX},${cpeY} ${Math.round(
        point.x
    )},${Math.round(point.y)}`
}

export const getSplineLinePath = (
    points: Point[],
    command: (point: Point, i: number, a: Point[]) => void
) =>
    points.reduce(
        (acc, point, i, a) =>
            i === 0
                ? `M ${point.x},${point.y}`
                : `${acc} ${command(point, i, a)}`,
        ''
    )

// "box" in the path
export const connectPathAsArea = (
    points: Point[],
    path: string,
    min?: number
): string => {
    const ex = getExtremes(points)

    if (min) ex.ymax = min

    let x1 = ex.xmax
    let y1 = ex.ymin
    let x2 = ex.xmin
    let y2 = ex.ymin

    y1 = ex.ymax
    y2 = ex.ymax

    return path.concat(`L ${x1} ${y1}`, `L ${x2} ${y2} Z`)
}

export const getExtremes = (points: Point[]) => ({
    xmin: Math.min(...points.map((p) => p.x)),
    ymin: Math.min(...points.map((p) => p.y)),
    xmax: Math.max(...points.map((p) => p.x)),
    ymax: Math.max(...points.map((p) => p.y)),
})

export const dataToPctData = (data: number[]) => {
    const max = Math.max(...data)
    return data.map((n) => Math.round((n / max) * 100))
}

export const dataToPoints = (
    data: number[],
    multiplier?: number,
    scaleMin?: number,
    scaleMax?: number,
    nonInvert?: boolean,
    rMargin?: number | 'fraction', // ratio horizontal margin, or use dist between points
    fillSides?: boolean // if rMargin, add start end points to fill sides
): Point[] => {
    const min = scaleMin != undefined ? scaleMin : Math.min(...data)
    const max = scaleMax != undefined ? scaleMax : Math.max(...data)

    const fraction = 1 / data.length

    const result = data.map((dp, dpi) => {
        const rm = rMargin == 'fraction' ? fraction / 2 : rMargin || 0
        const rx = dpi / (data.length - 1)
        const rxm = rx * (1 - rm) + (1 - rx) * rm

        let ry = (dp - min) / (max - min) || 0
        let y = nonInvert ? ry : 1 - ry

        return {
            x: rxm * (multiplier || 1),
            y: y * (multiplier || 1),
        }
    })

    if (fillSides) {
        const fr =
            rMargin == 'fraction' ? result[1].x - result[0].x : rMargin || 0

        // interpolate to edges using first last points
        result.unshift({ x: result[0].x - fr, y: result[0].y })
        result.push({
            x: result[result.length - 1].x + fr,
            y: result[result.length - 1].y,
        })
    }

    return result
}

// export const getBarsPath = (points: Point[]) =>
//     points.reduce((acc, p, i) => `M ${p.x},${p.y} L ${p.x},${p.y}`)

export const getBarsPath = (points: Point[]) =>
    points.reduce(
        (acc, point, i, a) =>
            `${acc} 
            M ${Math.round(point.x)},100
            L ${Math.round(point.x)},${Math.round(point.y - 0)}`,

        ''
    )

export const zeroLine = (ps: Point[]) => ps.map((p) => ({ x: p.x, y: 100 }))

export const timedPointCountSwitch = (
    set: (ps: Point[]) => void,
    newps: Point[],
    lastps: Point[]
) => {
    set(zeroLine(lastps))

    setTimeout(() => {
        set(zeroLine(newps))
    }, 200)

    setTimeout(() => {
        set(newps)
    }, 400)
}
