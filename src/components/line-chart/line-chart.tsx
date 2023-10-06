import { For, createEffect, createSignal, onMount } from 'solid-js'
import Field from '../../lib/elements/field/field'
import {
    Point,
    bezierCommand,
    connectPathAsArea,
    dataToPoints,
    getSplineLinePath,
} from '../../common/chart-helpers'
import Text from '../../lib/elements/text/text'

const mp = 100 // multipler
const lineThickness = 2

interface Args {
    visible?: boolean
    data: number[] | undefined
    scale?: { min: number; max: number }
    lineColor?: string
    areaColor?: string
}

export const LineChart = (a: Args) => {
    const [visible, setVisible] = createSignal<boolean>(true)
    const [line, setLine] = createSignal<string>('')
    const [area, setArea] = createSignal<string>('')
    const [markers, setMarkers] = createSignal<boolean>(true)
    const [points, setPoints] = createSignal<Point[]>()

    let container: any

    const update = () => {
        if (a.data == undefined) a.data = [0, 0]

        let ps = dataToPoints(a.data, mp, a.scale?.min, a.scale?.max)
        setPoints(ps)
        let lpath = getSplineLinePath(ps, bezierCommand)
        let apath = connectPathAsArea(ps, lpath, mp)

        if (a.lineColor) setLine(lpath)
        if (a.areaColor) setArea(apath)
    }

    onMount(() => {})

    createEffect(() => {
        if (a.data) update()
    })

    createEffect(() => {
        setVisible(a.visible ? true : false)
    })

    const baseStyle = {
        transition: '.6s ease d, .6s ease fill',
    }

    return (
        <Field
            rel
            ref={container}
            trim
            a
            style={`opacity:${visible() ? '1' : '0'}`}
        >
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
                    {markers() && (
                        <g class='markers'>
                            <For each={points()}>
                                {(p, i) =>
                                    i() > 0 &&
                                    i() < points()!.length - 1 && (
                                        <line
                                            vector-effect='non-scaling-stroke'
                                            x1={p.x}
                                            y1='97'
                                            x2={p.x}
                                            y2='98'
                                            stroke-width={lineThickness}
                                            stroke={'var(--color-strong)'}
                                        />
                                    )
                                }
                            </For>
                        </g>
                    )}
                </svg>
            </Field>
            {/* <Field layer c aie pevn>
                <Field c pmd>
                    <Text xs secondary>
                        From
                    </Text>
                </Field>
                <Field jce pmd c>
                    <Text xs secondary>
                        To
                    </Text>
                </Field>
            </Field> */}
        </Field>
    )
}
