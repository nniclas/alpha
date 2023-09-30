import { For, createEffect, createSignal } from 'solid-js'
import Field from '../../lib/elements/field/field'
import Button from '../../lib/elements/button/button'
import { BaseArgs } from '../../lib/types/base-args'
import { ThemeArgs } from '../../lib/types/theme-args'
import { ButtonArgs } from '../../lib/types/button-args'
import styles from './slider-button.module.css'
import Text from '../../lib/elements/text/text'

interface Args {
    value: number
    change: (i: number) => void
    values: string[]
}

export const SliderButton = (a: Args & ButtonArgs & BaseArgs & ThemeArgs) => {
    const [selected, setSelected] = createSignal<number>(a.value)

    createEffect(() => {
        setSelected(a.value)
        console.log(a.value)
    })

    return (
        <Field s rel gmd>
            <For each={a.values}>
                {(v, i) => {
                    return (
                        <Field s col gxs w={20} c>
                            <Field
                                a
                                s
                                col
                                class={`${styles.option}
                                
                                `}
                                style={`${
                                    selected() == i() &&
                                    'background:var(--color-dim); border:2px solid var(--color-dim);'
                                }`}
                            />
                            <Field s>
                                <Text xs style='font-weight:bold'>
                                    {v.substring(0, 1).toUpperCase()}
                                </Text>
                            </Field>
                        </Field>

                        // <Button
                        //     id={i() == 1 ? 'hello' : ''}
                        //     a
                        //     o={selected() == i() ? '_1' : '_0.6'}
                        //     bb={`2px solid ${
                        //         selected() == i()
                        //             ? 'var(--color-accent)'
                        //             : 'transparent'
                        //     }`}
                        //     onClick={(e) => {
                        //         a.change(i())
                        //         setSelected(i())
                        //         e.stopPropagation()
                        //     }}
                        //     // style={`border-bottom:4px solid ${
                        //     //     selected() == 1
                        //     //         ? 'var(--color-accent)'
                        //     //         : 'transparent'
                        //     // }`}
                        //     {...a}
                        // >
                        //     {c}
                        // </Button>
                    )
                }}
            </For>
        </Field>
    )
}
