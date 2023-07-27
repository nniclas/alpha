import { For, createEffect, createSignal } from 'solid-js'
import Field from '../../lib/elements/field/field'
import { Transition, TransitionGroup } from 'solid-transition-group'

import styles from './loader.module.css'

const count = 100

export const Loader = () => {
    return (
        <Field
            a
            s
            style=' width:400px; gap:4px;     background: hsl(200, 18%, 26%);'
        >
            <Field class={styles.move} s w={8} h={4} accent />
        </Field>
    )
}
