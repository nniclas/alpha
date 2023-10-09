import Field from '../../lib/elements/field/field'
import Text from '../../lib/elements/text/text'
import styles from './area.module.css'

interface Args {
    header: string
    children: any
}

export const Area = (a: Args) => {
    return (
        <Field
            col
            bg='var(--color-stronger)'
            // style='border:2px solid var(--color-strongest)'
        >
            <Field
                // bg='var(--color-strongest)'
                s
                h={32}
                aic
                pwmd
                // res={{ pwsm: true }}
            >
                <Text sm primary caption>
                    {a.header}
                </Text>
            </Field>
            <Field col pmd res={{ pmd: true }}>
                {a.children}
            </Field>
        </Field>
    )
}
