import { For, createEffect, createSignal, onMount } from 'solid-js'
import Field from '../../lib/elements/field/field'
import {
    Point,
    bezierCommand,
    connectPathAsArea,
    dataToPoints,
    getSplineLinePath,
    timedPointCountSwitch,
    zeroLine,
} from '../../common/chart-helpers'
import Text from '../../lib/elements/text/text'
import Responsive from '../../lib/components/responsive/responsive'
import Shifter from '../../components/shifter/shifter'
import { Transition } from 'solid-transition-group'

const mp = 100 // multipler
const lineThickness = 2

interface Args {
    visible?: boolean
    data: number[] | undefined
    labels?: string[]
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
    let lastps: Point[]

    const update = () => {
        if (a.data == undefined) a.data = [0, 0]
        let newps = dataToPoints(
            a.data,
            mp,
            a.scale?.min,
            a.scale?.max,
            undefined,
            'fraction',
            true
        )

        setRendering(newps, lastps?.length != newps.length)
    }

    const setRendering = (ps: Point[], reset = false) => {
        const set = (ps: Point[]) => {
            setPoints(ps)
            let lpath = getSplineLinePath(ps, bezierCommand)
            let apath = connectPathAsArea(ps, lpath, mp)

            if (a.lineColor) setLine(lpath)
            if (a.areaColor) setArea(apath)
            lastps = ps
        }

        if (reset && lastps != undefined) {
            timedPointCountSwitch(set, ps, lastps)
            return
        }

        set(ps)
    }

    const labels = () => (
        <Field layer aie>
            <Field h={96}>
                <For each={a.data}>
                    {(n, i) => (
                        <Field c col gxs>
                            <Text caption color='var(--color-lighter)'>
                                {n}
                            </Text>

                            <Text caption color='var(--color-lighter)'>
                                <Responsive
                                    compact={a.labels![i()].substring(0, 2)}
                                >
                                    {a.labels![i()]}
                                </Responsive>
                            </Text>
                        </Field>
                    )}
                </For>
            </Field>
        </Field>
    )

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
                                            stroke={'var(--color-lighter)'}
                                        />
                                    )
                                }
                            </For>
                        </g>
                    )}
                </svg>
            </Field>

            {labels()}
        </Field>
    )
}
