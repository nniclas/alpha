import Field from '../../lib/elements/field/field'
import styles from './loader.module.css'

export const Loader = () => {
    return (
        <Field a s class={styles.container}>
            <Field class={styles.move} s w={8} h={4} accent />
        </Field>
    )
}
