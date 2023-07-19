import { createEffect, createSignal, onCleanup, onMount } from 'solid-js'
import { RES_BREAKPOINT } from '../../../common/vars'
import Field from '../field/field'
import { isCompact } from '../../../core/utils'

interface Args {
    children?: any
    compact?: any
}

export default (a: Args & any) => {
    const [compact, setCompact] = createSignal<boolean>(false)

    const handler = (e?: Event) => {
        setCompact(isCompact())
    }

    onMount(() => window.addEventListener('resize', handler))
    onCleanup(() => window.removeEventListener('resize', handler))

    onMount(() => {
        handler()
    })

    return (
        <Field col {...a}>
            {compact() == true ? a.compact : a.children}
        </Field>
    )
}
