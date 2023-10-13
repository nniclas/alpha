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
                            id={i() == 1 ? 'hello' : ''}
                            a
                            o={selected() == i() ? '_1' : '_0.6'}
                            bb={`2px solid ${
                                selected() == i()
                                    ? 'var(--color-dim)'
                                    : 'transparent'
                            }`}
                            onClick={(e) => {
                                a.change(i())
                                setSelected(i())
                                e.stopPropagation()
                            }}
                            // style={`border-bottom:4px solid ${
                            //     selected() == 1
                            //         ? 'var(--color-accent)'
                            //         : 'transparent'
                            // }`}
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
