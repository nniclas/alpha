import { For, createSignal, onCleanup, onMount } from 'solid-js'
import { BaseArgs } from '../../types/base-args'
import { ThemeArgs } from '../../types/theme-args'
import Field from '../../elements/field/field'
import { isCompact } from '../../../lib/utils'

interface Args {
    children: any
    w?: number
}

export const Slider = (a: Args & BaseArgs & ThemeArgs) => {
    let layerRef: any

    const [index, setIndex] = createSignal<number>(0)

    const [drag, setDrag] = createSignal<boolean>(false)
    const [x, setX] = createSignal<number>(0)
    const [w, setW] = createSignal<number>(a.w || 0)

    const reset = () => {
        if (a.w == undefined) {
            setW(layerRef.clientWidth)
            setIndex(0)
            setX(0)
        }
    }
    onMount(() => reset())

    const resetSize = () => {
        if (isCompact()) {
            reset()
        }
    }

    onMount(() => window.addEventListener('resize', resetSize))
    onCleanup(() => window.removeEventListener('resize', resetSize))

    const start = (e: any) => {
        setDrag(true)
    }

    const move = (e: any) => {
        const margin = 0

        if (drag()) {
            const itemStopRange = w() - margin * 3
            const dir = e.movementX < 0 ? -1 : 1
            let movement = e.movementX * 40

            if (Math.abs(movement) > 5) {
                let xl = x()

                xl -= itemStopRange * dir
                const range = w() * a.children.length
                if (xl < 0) xl = 0
                if (xl > range - itemStopRange) xl = range - itemStopRange

                setX(xl)
                setIndex(xl / w())
            }

            setDrag(false)
        }
    }

    return (
        <Field
            {...a}
            w={w()}
            style='overflow:hidden;'
            onPointerDown={start}
            onPointerMove={move}
            rel
        >
            <Field
                layer
                s
                a
                style={`transform:translateX(-${x()}px); width: ${w() * 3}px`}
            >
                <For each={a.children}>
                    {(c, i) => {
                        return (
                            <Field s w={w()} style={`width: ${w()}px`}>
                                {c}
                            </Field>
                        )
                    }}
                </For>
            </Field>
            <Field layer ref={layerRef} style='pointer-events:none'></Field>
            <Field layer aie jcs style='pointer-events:none'>
                <Field pmd gxs s>
                    <For each={Array(a.children?.length).fill(0)}>
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
                </Field>
            </Field>
        </Field>
    )
}
