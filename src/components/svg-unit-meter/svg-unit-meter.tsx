import { For, createEffect, createSignal } from 'solid-js'
import Field from '../../lib/elements/field/field'

interface Args {
    value: number // pct value
    valueColor: string
    meterColor: string
    style?: any
    scale: number // how long scale (independent of pct value)
}

const size = 2
const startPath = 'M0 10 L0 10'

const createPath = (val: number, scale: number) => {
    const rv = val / 100
    const pxv = size * (rv * scale) * 2
    const pxvr = Math.round(pxv / scale) * scale
    return `M0 10 ${pxvr} 10`
}

export const SvgUnitMeter = (a: Args) => {
    const [path, setPath] = createSignal<string>(startPath)

    createEffect(() => {
        if (a.value) {
            setPath(createPath(a.value, a.scale))
        }
    })

    const baseStyle: any = {
        transition: '.6s ease all',
        'stroke-width': size * 6,
        'stroke-dasharray': size,
    }

    return (
        <svg height='100%' xmlns='http://www.w3.org/2000/svg'>
            <path
                style={{
                    ...{ ...baseStyle },
                    stroke: a.meterColor,
                }}
                d={createPath(100, a.scale)}
            />
            <path
                style={{
                    ...{ ...baseStyle },
                    stroke: a.valueColor,
                }}
                d={path()}
            />
        </svg>
    )
}
