import { For, createEffect, createSignal, onMount } from 'solid-js'
import Field from '../../lib/elements/field/field'

interface Args {
    value: number // pct value
    valueColor: string
    meterColor: string
    style?: any
    // scale: number // how long scale (independent of pct value)
}

const scale = 100
const size = 2
const startPath = 'M0 10 L0 10'
const fullPath = `M0 10 L200 10`

const createPath = (val: number, scale: number) => {
    const rv = val / 100
    const pxv = size * (rv * scale)
    const pxvr = (pxv / scale) * scale
    return `M0 10 L${pxvr} 10`
}

export const SvgUnitMeter = (a: Args) => {
    const [path, setPath] = createSignal<string>(startPath)

    createEffect(() => {
        //console.log(a.value)
        if (a.value) {
            setPath(createPath(a.value, scale))
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
                d={fullPath}
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
