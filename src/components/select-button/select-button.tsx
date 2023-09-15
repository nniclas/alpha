import { For, createSignal } from 'solid-js'
import Field from '../../lib/elements/field/field'
import Button from '../../lib/elements/button/button'
import { BaseArgs } from '../../lib/types/base-args'
import { ThemeArgs } from '../../lib/types/theme-args'
import { ButtonArgs } from '../../lib/types/button-args'

interface Args {
    children: any[]
    change: (i: number) => void
}

export const SelectButton = (a: Args & ButtonArgs & BaseArgs & ThemeArgs) => {
    const [selected, setSelected] = createSignal<number>(0)

    return (
        <Field rel>
            <For each={a.children}>
                {(c, i) => {
                    return (
                        <Button
                            {...a}
                            a
                            id='hello'
                            o={selected() == i() ? '_1' : '_0.6'}
                            bb={`2px solid ${
                                selected() == i()
                                    ? 'var(--color-accent)'
                                    : 'transparent'
                            }`}
                            onClick={(e) => {
                                a.change(i())
                                setSelected(i())
                                e.stopPropagation()
                            }}
                        >
                            {c}
                        </Button>
                    )
                }}
            </For>
            {/* <Field layer psm>
                <Field psm />
            </Field> */}
        </Field>
    )
}
