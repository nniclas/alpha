import { For, createEffect, createSignal, onMount } from 'solid-js'
import { BaseArgs } from '../../types/base-args'
import { ThemeArgs } from '../../types/theme-args'
import Field from '../../elements/field/field'

interface Args {
    children: any
    w?: number
    p?: number
}

export const SliderNew = (a: Args & BaseArgs & ThemeArgs) => {
    let layerRef: any

    let p = a.p || 64

    const [index, setIndex] = createSignal<number>(0)

    const [drag, setDrag] = createSignal<boolean>(false)
    const [pos, setPos] = createSignal<number>(0)
    const [offset, setOffset] = createSignal<number>(0)
    const [relOffset, setRelOffset] = createSignal<number>(0)
    const [w, setW] = createSignal<number>(a.w || 0)

    onMount(() => {
        if (a.w == undefined) {
            setW(layerRef.clientWidth)
        }

        // console.log(a.children.map((c: any) => c.content.innerHTML))
    })

    createEffect(() => {
        if (layerRef.clientWidth > 0) goTo(undefined, 0)
        // console.log(pos())
    })

    const start = (e: any) => {
        setDrag(true)
        setOffset(e.clientX - pos())
        setRelOffset(e.clientX)
    }

    const move = (e: any) => {
        if (drag()) {
            let pos = e.clientX - offset()

            const movement = Math.round(e.clientX - relOffset())

            if (Math.abs(movement) > 80) {
                goTo(pos, undefined, movement > 0 ? 'next' : 'prev')
            } else setPos(pos)
        }
    }

    const stop = (e: any) => {
        goTo(pos())
    }

    const goTo = (pos?: number, i?: number, push?: 'next' | 'prev') => {
        let index = i || 0
        if (pos) index = -Math.round(pos / (w() - p))
        if (push) index += push == 'next' ? -1 : 1
        if (index < 0) index = 0
        if (index > a.children.length - 1) index = a.children.length - 1

        const nearestPos = -index * (w() - (p - p / 4)) + p / 2
        setIndex(index)
        setPos(nearestPos)
        setDrag(false)
    }

    return (
        <Field
            {...a}
            w={w()}
            style='overflow:hidden; touch-action:none'
            onPointerDown={start}
            onPointerMove={move}
            onPointerUp={stop}
            // onPointerLeave={stop}
            rel
        >
            <Field
                s
                style={`gap:${
                    p / 4
                }px; transform:translateX(${pos()}px); width: ${
                    w() * 3
                }px; transition: ${
                    drag() ? '.1s ease transform' : '.3s ease transform'
                }`}
            >
                <For each={a.children}>
                    {(c, i) => {
                        return (
                            <Field s style={`width: ${w() - p}px`}>
                                {c}
                            </Field>
                        )
                    }}
                </For>
            </Field>
            <Field layer ref={layerRef} style='pointer-events:none'></Field>
            <Field layer aie jcs style='pointer-events:none'>
                {/* <Field pmd gxs s>
                    <For each={Array(a.children.length).fill(0)}>
                        {(c, i) => {
                            return (
                                <Field
                                    s
                                    a
                                    br
                                    w={8}
                                    h={8}
                                    style={`width: 8px; height: 8px; background:${
                                        index() == i()
                                            ? 'rgba(255,255,255,0.4)'
                                            : 'rgba(0,0,0,0.4)'
                                    }`}
                                    focus
                                />
                            )
                        }}
                    </For>
                </Field> */}
            </Field>
        </Field>
    )
}
