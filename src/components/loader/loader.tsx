import { For, createEffect, createSignal } from 'solid-js'
import Field from '../../lib/elements/field/field'
import { Transition, TransitionGroup } from 'solid-transition-group'

import styles from './loader.module.css'

export const Loader = () => {
    return (
        <Field a s style='width:200px; gap:4px; background: var(--primary-bg)'>
            <Field class={styles.move} s w={8} h={4} accent />
        </Field>
    )
}
