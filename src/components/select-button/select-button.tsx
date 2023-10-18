import { For, createEffect, createSignal } from 'solid-js'
import Field from '../../lib/elements/field/field'
import Button from '../../lib/elements/button/button'
import { BaseArgs } from '../../lib/types/base-args'
import { ThemeArgs } from '../../lib/types/theme-args'
import { ButtonArgs } from '../../lib/types/button-args'

interface Args {
    value: number
    children: any[]
    change: (i: number) => void
}

export const SelectButton = (a: Args & ButtonArgs & BaseArgs & ThemeArgs) => {
    const [selected, setSelected] = createSignal<number>(a.value)

    // createEffect(() => {
    //     setSelected(a.value)
    //     console.log(a.value)
    // })

    return (
        <Field rel>
            <For each={a.children}>
                {(c, i) => {
                    return (
                        <Button
                            tertiary
                            a
                            o={selected() == i() ? '_1' : '_0.6'}
                            bb={`2px solid ${
                                selected() == i()
                                    ? 'var(--accent-color)'
                                    : 'transparent'
                            }`}
                            onClick={(e) => {
                                a.change(i())
                                setSelected(i())
                                e.stopPropagation()
                            }}
                            // style={`
                            //     ${
                            //         i() == 0
                            //             ? brl
                            //             : i() == a.children.length - 1
                            //             ? brr
                            //             : 'none'
                            //     }`}
                            {...a}
                        >
                            {c}
                        </Button>
                    )
                }}
            </For>
        </Field>
    )
}
