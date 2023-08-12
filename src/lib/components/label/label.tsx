import Field from '../../elements/field/field'
import Text from '../../elements/text/text'
import { Size, Theme } from '../../types/types'
import styles from './label.module.css'
import { ThemeArgs } from '../../types/theme-args'
import { thToStr } from '../../utils'
import { BaseArgs } from 'lib/types/base-args'
import { TextArgs } from 'lib/types/text-args'

interface Args {
    children?: any
    icon?: any
    size?: Size
    titleTheme?: Theme
    iconTheme?: Theme
}

export const Label = (a: Args & TextArgs & ThemeArgs) => {
    // if (a.titleTheme) {
    //     console.log(
    //         `color:var(--${a.titleTheme ? a.titleTheme : thToStr(a)}-color)`
    //     )
    // }
    return (
        <Field s aic gsm h={80} res={{ h: 60, p: '0 20px' }} p='0 32px'>
            {a.icon && (
                <div
                    class={`${styles.icon} ${styles[a.size ?? 'sm']}`}
                    style={`color:var(--${
                        a.iconTheme ? a.iconTheme : thToStr(a)
                    }-color)`}
                >
                    {a.icon}
                </div>
            )}
            {a.children && (
                <Text
                    res
                    size={a.size}
                    style={`color:var(--${
                        a.titleTheme ? a.titleTheme : thToStr(a)
                    }-color)`}
                >
                    {a.children}
                </Text>
            )}
        </Field>
    )
}
