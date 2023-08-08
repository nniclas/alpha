import { createEffect, createSignal, onCleanup, onMount } from 'solid-js'
import Field from '../../elements/field/field'
import { isCompact } from '../../utils'

interface Args {
    children?: any
    compact?: any
    addRule?: boolean // additionally apply compact when true
}

export default (a: Args & any) => {
    const [compact, setCompact] = createSignal<boolean>(false)

    createEffect(() => {
        if (a.addRule) {
            setCompact(true)
            return
        }
        setCompact(isCompact() ? true : false)
    })

    const handler = (e?: Event) => {
        setCompact(a.addRule ? true : isCompact())
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
