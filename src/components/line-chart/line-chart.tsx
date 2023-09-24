import { For, createEffect, createSignal, onMount } from 'solid-js'
import Field from '../../lib/elements/field/field'
import {
    bezierCommand,
    connectPathAsArea,
    dataToPoints,
    getSplineLinePath,
} from './chart-helpers'
import Text from '../../lib/elements/text/text'

const mp = 100 // multipler
const lineThickness = 2

interface Args {
    data: number[]
    scale?: { min: number; max: number }
    lineColor?: string
    areaColor?: string
}

export const LineChart = (a: Args) => {
    const [line, setLine] = createSignal<string>('')
    const [area, setArea] = createSignal<string>('')

    let container: any

    const update = () => {
        let ps = dataToPoints(a.data, mp, a.scale?.min, a.scale?.max)
        let lpath = getSplineLinePath(ps, bezierCommand)
        let apath = connectPathAsArea(ps, lpath, mp)

        if (a.lineColor) setLine(lpath)
        if (a.areaColor) setArea(apath)
    }

    onMount(() => {})

    createEffect(() => {
        if (a.data) update()
    })

    const baseStyle = {
        transition: '.6s ease d, .6s ease fill',
    }

    return (
        <Field rel ref={container}>
            <Field layer>
                <svg
                    width='100%'
                    height='100%'
                    preserveAspectRatio='none'
                    viewBox={`0 0 ${mp} ${mp}`}
                    xmlns='http://www.w3.org/2000/svg'
                >
                    {a.areaColor && (
                        <g class='area'>
                            <path
                                vector-effect='non-scaling-stroke'
                                style={{ ...baseStyle }}
                                d={`${area()}`}
                                fill={a.areaColor}
                            />
                        </g>
                    )}

                    {a.lineColor && (
                        <g class='line'>
                            <path
                                vector-effect='non-scaling-stroke'
                                style={{ ...baseStyle }}
                                d={`${line()}`}
                                fill='transparent'
                                stroke={a.lineColor}
                                stroke-width={lineThickness}
                            />
                        </g>
                    )}
                </svg>
                <Field layer c aie pevn>
                    <Field plg>
                        <Text xs>From</Text>
                    </Field>
                    <Field jce plg c>
                        <Text xs>To</Text>
                    </Field>
                </Field>
            </Field>
        </Field>
    )
}
