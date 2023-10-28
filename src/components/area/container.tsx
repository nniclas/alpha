import Field from '../../lib/elements/field/field'
import styles from './container.module.css'

interface Args {
    children: any
}

export const Container = (a: Args) => {
    return <Field class={styles.container}>{a.children}</Field>
}
