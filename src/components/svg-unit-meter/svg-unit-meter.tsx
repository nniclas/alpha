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
const startPath = 'M0 10 L0 10 Z'
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

    const baseStyle = { transition: '.6s ease d' }

    return (
        <div>
            <svg
                width='100%'
                height='100%'
                preserveAspectRatio='none'
                // viewBox={`0 0 10 10`}
                xmlns='http://www.w3.org/2000/svg'
            >
                <path
                    style={{ ...baseStyle }}
                    d={fullPath}
                    stroke-width={size * 6}
                    stroke-dasharray={size.toString()}
                    stroke={a.meterColor}
                />
                <path
                    style={{ ...baseStyle }}
                    d={path()}
                    stroke-width={size * 6}
                    stroke-dasharray={size.toString()}
                    stroke={a.valueColor}
                />
            </svg>
        </div>
    )
}
