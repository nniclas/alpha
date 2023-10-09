import Field from '../../lib/elements/field/field'
import { Transition } from 'solid-transition-group'
import styles from './sidemenu.module.css'
import { createEffect, createSignal } from 'solid-js'
import { BaseArgs } from 'lib/types/base-args'
import { ThemeArgs } from 'lib/types/theme-args'
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
                style={`opacity:${open() ? 1 : 0}; 
                        pointer-events:${open() ? 'auto' : 'none'}; 
                        position:fixed;z-index:101; background:rgba(0,0,0,0.2);`}
                onClick={(e) => {
                    setOpen(false)

                    e.stopPropagation()
                    e.preventDefault()
                }}
            />
            <Field
                class={`${styles.content}`}
                style={`z-index:102; ${
                    a.maxWidth ? `max-width:${a.maxWidth}px;` : ''
                } ${open() ? 'transform: translateX(0);' : ''}`}
            >
                {a.children}
            </Field>
        </Field>
    )
}
