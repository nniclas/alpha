import { For, createSignal } from 'solid-js'
import Field from '../../lib/elements/field/field'
import Button from '../../lib/elements/button/button'
import { BaseArgs } from '../../lib/types/base-args'
import { ThemeArgs } from '../../lib/types/theme-args'
import { ButtonArgs } from 'lib/types/button-args'

interface Args {
    children: any[]
    change: (i: number) => void
}

export const ButtonGroup = (a: Args & ButtonArgs & BaseArgs & ThemeArgs) => {
    const [selected, setSelected] = createSignal<number>(0)

    return (
        <Field>
            <For each={a.children}>
                {(c, i) => {
                    return (
                        <Field rel>
                            <Field
                                s
                                layer
                                a
                                style={`height:2px; top:58px; background:var(--${
                                    selected() == i() ? 'accent' : ''
                                }-color)`}
                            >
                                {c}
                            </Field>
                            <Button
                                {...a}
                                a
                                onClick={(e) => {
                                    a.change(i())
                                    setSelected(i())
                                    e.stopPropagation()
                                }}
                            >
                                {c}
                            </Button>
                        </Field>
                    )
                }}
            </For>
        </Field>
    )
}
