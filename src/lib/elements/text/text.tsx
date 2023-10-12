import { customStyles, hasTheme, scopeStyles } from '../../utils'
import styles from './text.module.css'
import { BaseArgs } from '../../types/base-args'
import { ThemeArgs } from '../../types/theme-args'
import { TextArgs } from '../../types/text-args'
import { EffectArgs } from '../../types/effect-args'
import { styleMap } from './style-map'

export default (a: BaseArgs & ThemeArgs & EffectArgs & TextArgs) => {
    if (a.size) {
        ;(a as any)[a.size] = true
    }

    if (!hasTheme(a)) a.primary = true //  set default theme

    const ss = scopeStyles(styles, a)
    const cs = customStyles(a, styleMap)

    return (
        <span class={`${styles.text} ${ss}`} style={cs} {...(a as any)}>
            {a.children}
        </span>
    )
}
