import { createEffect, createSignal } from 'solid-js'

interface Args {
    value: number // pct value
    valueColor: string
    meterColor: string
    style?: any
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
