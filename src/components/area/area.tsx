import { FieldArgs } from 'lib/types/field-args'
import Field from '../../lib/elements/field/field'
import Text from '../../lib/elements/text/text'
import styles from './area.module.css'
import { ThemeArgs } from 'lib/types/theme-args'

interface Args {
    header: string
    children: any
}

export const Area = (a: Args & ThemeArgs) => {
    return (
        <Field
            col
            {...a}
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
