import Field from '../../lib/elements/field/field'
import Text from '../../lib/elements/text/text'
import { ThemeArgs } from 'lib/types/theme-args'

interface Args {
    header: string
    children: any
}

export const Area = (a: Args & ThemeArgs) => {
    return (
        <Field br trim col {...a}>
            <Field s h={32} aic pwmd>
                <Text sm primary title>
                    {a.header}
                </Text>
            </Field>
            <Field col pmd res={{ pmd: true }}>
                {a.children}
            </Field>
        </Field>
    )
}
