import { createEffect, createSignal } from 'solid-js'
import Field from '../../lib/elements/field/field'

interface Args {
    value: number
    valueColor: string
    meterColor: string
    style?: any
}

interface CircleCalc {
    radius: number
    cf: number
    offset: number
}

const center = 60
const radiusOuter = 60
const strokeWidth = 8

const calcCircle = (value: number) => {
    const radius = radiusOuter - strokeWidth
    const cf = radius * 2 * Math.PI
    return {
        radius: radius,
        cf: cf,
        offset: cf - (value / 100) * cf,
    }
}

export const CircularMeter = (a: Args) => {
    const [c, setC] = createSignal<CircleCalc>(calcCircle(a.value))

    createEffect(() => {
        setC(calcCircle(a.value))
    })

    const baseStyle = {
        transition: '.4s ease all',
        transform: 'rotate(-90deg)',
        'transform-origin': '50% 50%',
    }

    return (
        <Field s style='gap:4px'>
            <svg height='120' width='120' xmlns='http://www.w3.org/2000/svg'>
                <circle
                    style={{
                        ...{ ...baseStyle, stroke: a.meterColor },
                        ...a.style,
                        'stroke-width': strokeWidth,
                    }}
                    fill='transparent'
                    cx={center}
                    cy={center}
                    r={c()!.radius}
                />

                <circle
                    style={{
                        ...{ ...baseStyle, stroke: a.valueColor },
                        ...a.style,
                        'stroke-dasharray': `${c()!.cf} ${c()!.cf}`,
                        'stroke-dashoffset': c()!.offset,
                        'stroke-width': strokeWidth,
                    }}
                    fill='transparent'
                    cx={center}
                    cy={center}
                    r={c()!.radius}
                />
            </svg>
        </Field>
    )
}
