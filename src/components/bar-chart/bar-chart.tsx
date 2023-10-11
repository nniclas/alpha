import { For, createEffect, createSignal, onMount } from 'solid-js'
import Field from '../../lib/elements/field/field'
import {
    Point,
    bezierCommand,
    connectPathAsArea,
    dataToPctData,
    dataToPoints,
    getBarsPath,
    getSplineLinePath,
    // timedPointCountSwitch,
    zeroLine,
} from '../../common/chart-helpers'
import Text from '../../lib/elements/text/text'
import Responsive from '../../lib/components/responsive/responsive'

const mp = 100 // multipler
const barThickness = 20

interface Args {
    visible?: boolean
    data: number[] | undefined
    labels?: string[]
    scale?: { min: number; max: number }
    color: string
    percentage?: boolean
}

export const BarChart = (a: Args) => {
    const [visible, setVisible] = createSignal<boolean>(true)
    const [bars, setBars] = createSignal<string>('')
    // const [markers, setMarkers] = createSignal<boolean>(true)
    const [points, setPoints] = createSignal<Point[]>()

    let container: any
    let lastps: Point[]

    const update = () => {
        if (a.data == undefined) a.data = [0, 0]

        const newps = dataToPoints(
            a.percentage ? dataToPctData(a.data) : a.data,
            mp,
            a.scale?.min,
            a.scale?.max,
            undefined,
            'fraction'
        )
        setRendering(newps, lastps?.length != newps.length)
    }

    const setRendering = (ps: Point[], reset = false) => {
        const set = (ps: Point[]) => {
            setPoints(ps)
            const bPath = getBarsPath(ps)
            setBars(bPath)
            lastps = ps
        }

        // if (reset && lastps != undefined) {
        //     timedPointCountSwitch(set, ps, lastps)
        //     return
        // }

        set(ps)
    }

    onMount(() => {})

    createEffect(() => {
        if (a.data) update()

        // console.log('baars')
    })

    createEffect(() => {
        setVisible(a.visible ? true : false)
    })

    const baseStyle = {
        transition: '.3s ease d, .6s ease fill',
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
                    {/* {a.areaColor && (
                        <g class='area'>
                            <path
                                vector-effect='non-scaling-stroke'
                                style={{ ...baseStyle }}
                                d={`${area()}`}
                                fill={a.areaColor}
                            />
                        </g>
                    )} */}

                    {a.color && (
                        <g class='line'>
                            <path
                                vector-effect='non-scaling-stroke'
                                style={{ ...baseStyle }}
                                d={`${getBarsPath(
                                    points()?.map((p) => ({ x: p.x, y: 0 })) ||
                                        []
                                )}`}
                                fill='transparent'
                                stroke={a.color}
                                opacity={0.2}
                                stroke-width={barThickness + 8}
                            />
                            <path
                                vector-effect='non-scaling-stroke'
                                style={{ ...baseStyle }}
                                d={`${bars()}`}
                                fill='transparent'
                                stroke={a.color}
                                stroke-width={barThickness}
                            />
                        </g>
                    )}

                    {/* {markers() && (
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
                    )} */}
                </svg>
            </Field>

            {a.labels && (
                <Field layer aie>
                    <Field h={64}>
                        <For each={a.data}>
                            {(n, i) => (
                                <Field c col gxs>
                                    <Text caption color='var(--color-lighter)'>
                                        {n}
                                    </Text>

                                    <Text caption color='var(--color-lighter)'>
                                        <Responsive
                                            compact={a.labels![i()].substring(
                                                0,
                                                4
                                            )}
                                        >
                                            {a.labels![i()]}
                                        </Responsive>
                                    </Text>
                                </Field>
                            )}
                        </For>
                    </Field>
                </Field>
            )}
        </Field>
    )
}
