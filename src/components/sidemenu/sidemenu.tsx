import Field from '../../lib/elements/field/field'
import styles from './sidemenu.module.css'
import { createEffect, createSignal } from 'solid-js'
import { FieldArgs } from 'lib/types/field-args'

interface Args {
    open: boolean
    children: any
    maxWidth?: number
}

export const Sidemenu = (a: Args & FieldArgs) => {
    const [open, setOpen] = createSignal<boolean>(false)

    createEffect(() => {
        if (a.open != open()) {
            setOpen(a.open)
        }
    })

    return (
        <Field rel s class={styles.container} {...a}>
            <Field
                a
                layer
                class={styles.backdrop}
                style={`opacity:${open() ? 1 : 0}; pointer-events:${
                    open() ? 'auto' : 'none'
                };`}
                onClick={(e) => {
                    setOpen(false)

                    e.stopPropagation()
                    e.preventDefault()
                }}
            />
            <Field
                class={`${styles.content}`}
                style={`z-index:102; overflow: scroll; ${
                    a.maxWidth ? `max-width:${a.maxWidth}px;` : ''
                } ${open() ? 'transform: translateX(0);' : ''}`}
            >
                {a.children}
            </Field>
        </Field>
    )
}
