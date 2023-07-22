import { For } from 'solid-js'
import Field from '../../lib/elements/field/field'

interface Args {
    value: number
    scale?: 10 | 100
}

export const UnitMeter = (a: Args) => {
    return (
        <Field style='gap:4px'>
            <For
                each={Array(Math.round(a.value / (a.scale == 10 ? 10 : 1)))
                    .fill(0)
                    .map((v) => v)}
            >
                {(v, i) => <Field s w={4} h={8} tertiary></Field>}
            </For>
        </Field>
    )
}
