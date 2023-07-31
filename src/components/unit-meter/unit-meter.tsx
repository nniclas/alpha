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
    const [ready, setReady] = createSignal<boolean>(false)
    const [value, setValue] = createSignal<number>(0)

    createEffect(() => {
        if (!ready()) {
            for (let i = 0; i < a.value; i++) {
                setTimeout(() => {
                    setValue(i)
                    if (i == a.value - 1) setReady(true)
                }, 8 * i)
            }
        }
        if (ready()) setValue(a.value)
    })

    return (
        <Field rel h={8}>
            {/* <div class={styles.block} style={`animation:${getCssAnimValue}`} /> */}
            <Field layer>
                <Field style='gap:2px'>
                    <For
                        each={Array(Math.round(100 / (a.scale == 10 ? 10 : 1)))
                            .fill(0)
                            .map((v) => v)}
                    >
                        {(v, i) => (
                            <Field s w={6} h={8} bg={a.meterColor}></Field>
                        )}
                    </For>
                </Field>
            </Field>
            <Field layer>
                <Field style='gap:2px'>
                    <For
                        each={Array(
                            Math.round(value() / (a.scale == 10 ? 10 : 1))
                        )
                            .fill(0)
                            .map((v) => v)}
                    >
                        {(v, i) => (
                            <Field s w={6} h={8} bg={a.valueColor}></Field>
                        )}
                    </For>
                </Field>
            </Field>
        </Field>
    )
}
