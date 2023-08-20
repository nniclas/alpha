import Field from '../../lib/elements/field/field'
import Text from '../../lib/elements/text/text'
import styles from './area.module.css'

interface Args {
    header: string
    children: any
}

export const Area = (a: Args) => {
    return (
        <Field col br style='border:2px solid var(--color-strongest)'>
            <Field s h={32} aic pwmd res={{ pwsm: true }}>
                <Text md primary>
                    {a.header}
                </Text>
            </Field>
            <Field col plg res={{ pmd: true }}>
                {a.children}
            </Field>
        </Field>
    )
}
