import {
    Component,
    For,
    Suspense,
    createEffect,
    createSignal,
    lazy,
    onCleanup,
    onMount,
} from 'solid-js'
import Field from '../../lib/elements/field/field'
import Text from '../../lib/elements/text/text'
import appStore from '../../core/app-store'
import ds from '../../core/data-store'
import Button from '../../lib/elements/button/button'
import { BaseArgs } from '../../lib/types/base-args'
import { ThemeArgs } from '../../lib/types/theme-args'
import { ButtonArgs } from 'lib/types/button-args'

interface Args {
    children: any[]
    change: (i: number) => void
}

export const SliderButton = (a: Args & BaseArgs & ThemeArgs) => {
    const [selected, setSelected] = createSignal<number>(0)

    return (
        <Field rel>
            <For each={a.children}>
                {(c, i) => {
                    return (
                        <Button
                            {...a}
                            secondary={selected() == i()}
                            onClick={() => a.change(i())}
                        >
                            {c}
                        </Button>
                    )
                }}
            </For>
            <Field layer psm>
                <Field psm accent />
            </Field>
        </Field>
    )
}
