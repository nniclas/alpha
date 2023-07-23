import { For, createEffect, createSignal } from 'solid-js'
import Field from '../../lib/elements/field/field'
import { Transition, TransitionGroup } from 'solid-transition-group'

import styles from './unit-meter.module.css'

interface Args {
    value: number
    scale?: 10 | 100
    valueColor: string
    meterColor: string
}

export const UnitMeter = (a: Args) => {
    const [value, setValue] = createSignal<number>(a.value)

    createEffect(() => {
        setValue(a.value)
    })

    // createEffect(() => {
    //     const d = a.value - value()
    //     const dabs = Math.abs(d)

    //     let c = 0

    //     const setLater = (action: () => void) => {
    //         console.log(d, c)
    //         setTimeout(() => {
    //             if (c > 0) {
    //                 c--
    //                 action()
    //             }
    //         }, 20)
    //     }

    //     c = dabs
    //     // setLater(() => setValue(value() + 1))
    // })

    return (
        <Field rel>
            <div class={styles.block} />
            {/* <Field layer>
                <Field style='gap:4px'>
                    <For
                        each={Array(Math.round(100 / (a.scale == 10 ? 10 : 1)))
                            .fill(0)
                            .map((v) => v)}
                    >
                        {(v, i) => (
                            <Field s w={2} h={8} bg={a.meterColor}></Field>
                        )}
                    </For>
                </Field>
            </Field>
            <Field layer>
                <Field style='gap:4px'>
                    <For
                        each={Array(
                            Math.round(value() / (a.scale == 10 ? 10 : 1))
                        )
                            .fill(0)
                            .map((v) => v)}
                    >
                        {(v, i) => (
                            <Field s w={2} h={8} bg={a.valueColor}></Field>
                        )}
                    </For>
                </Field>
            </Field> */}
        </Field>
    )
}
