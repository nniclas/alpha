import { For, createEffect, createSignal } from 'solid-js'
import Field from '../../lib/elements/field/field'
import Button from '../../lib/elements/button/button'
import { BaseArgs } from '../../lib/types/base-args'
import { ThemeArgs } from '../../lib/types/theme-args'
import { ButtonArgs } from '../../lib/types/button-args'
import styles from './slider-button.module.css'
import Text from '../../lib/elements/text/text'
import { Transition } from 'solid-transition-group'
import { FieldArgs } from 'lib/types/field-args'

interface Args {
    value: number
    change: (i: number) => void
    values: string[]
    w: number
    h: number
}

export const SliderButton = (a: Args & ButtonArgs & BaseArgs & ThemeArgs) => {
    const [selected, setSelected] = createSignal<number>(a.value)

    createEffect(() => {
        setSelected(a.value)
        // console.log(a.value)
    })

    const content = (v: string) => (
        <Field layer>
            <Button
                w={a.w}
                h={a.h}
                onClick={() => {
                    const i =
                        selected() < a.values.length - 1 ? selected() + 1 : 0
                    setSelected(i)
                    a.change(i)
                }}
            >
                <Text
                    noselect
                    color='var(--accent-color)'
                    res
                    title
                    // style='font-weight:bold; '
                >
                    {v}
                </Text>
            </Button>
        </Field>
    )

    return (
        <Field
            s
            rel
            trim
            style={`width:${a.w}px; height:${a.h}px; border-left:2px solid var(--color-dim);`}
        >
            <Transition name='slide-fade'>
                {content(a.values[selected()])}
            </Transition>
        </Field>
    )
}
