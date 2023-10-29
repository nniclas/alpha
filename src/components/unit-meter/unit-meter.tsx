import { For } from 'solid-js'
import Field from '../../lib/elements/field/field'

interface Args {
    value: number
    scale?: 10 | 100
    valueColor: string
    meterColor: string
}

export const UnitMeter = (a: Args) => {
    return (
        <Field rel h={8}>
            <Field s c>
                <Field s style='gap:2px'>
                    <For
                        each={Array(Math.round(100 / (a.scale == 10 ? 10 : 1)))
                            .fill(0)
                            .map((v) => v)}
                    >
                        {(v, i) => {
                            const val = Math.round(
                                a.value / (a.scale == 10 ? 10 : 1)
                            )

                            return (
                                <Field
                                    s
                                    w={6}
                                    h={8}
                                    bg={val < i() ? a.valueColor : a.meterColor}
                                ></Field>
                            )
                        }}
                    </For>
                </Field>
            </Field>
        </Field>
    )
}
