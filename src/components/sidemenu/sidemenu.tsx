import Field from '../../lib/elements/field/field'
import { Transition } from 'solid-transition-group'
import styles from './sidemenu.module.css'
import { createEffect, createSignal } from 'solid-js'

interface Args {
    open: boolean
    children: any
    maxWidth?: number
}

export const Sidemenu = (a: Args) => {
    const [open, setOpen] = createSignal<boolean>(false)

    createEffect(() => {
        if (a.open != open()) setOpen(a.open)

        console.log(a.open)
    })

    return (
        <Field s class={styles.container}>
            <Field
                id='heeeeeeeeeeey'
                class={`${styles.content}`}
                style={`${a.maxWidth ? `max-width:${a.maxWidth}px;` : ''} ${
                    open() ? 'transform: translateX(0);' : ''
                }`}
            >
                {a.children}
            </Field>
        </Field>
    )
}
