import Field from '../../lib/elements/field/field'
import { Label } from '../../lib/components/label/label'
import { FieldArgs } from '../../lib/types/field-args'
import styles from './section-header.module.css'

interface Args {
    title: string
    titleColor?: string
    icon?: any
    iconTheme?: string
    aux?: any
    tool?: any
    click?: () => void
}

export const SectionHeader = (a: Args & FieldArgs) => {
    const titleColor = a.titleColor && { color: a.titleColor }
    const icon = a.icon && { icon: a.icon }
    const iconTheme = a.iconTheme && { iconTheme: a.iconTheme }

    const click = a.click && {
        onclick: a.click,
        class: styles.clicker,
    }

    return (
        <Field a s h={80} res={{ h: 60, ...a }} {...a}>
            <Field {...click}>
                <Label size='md' {...titleColor} {...icon} {...iconTheme}>
                    {a.title}
                </Label>
                <Field s c>
                    {a.aux}
                </Field>
            </Field>
            <Field s>{a.tool}</Field>
        </Field>
    )
}
