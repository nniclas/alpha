import { customStyles, scopeStyles } from '../../utils'
import styles from './text.module.css'
import { BaseArgs } from '../../types/base-args'
import { ThemeArgs } from '../../types/theme-args'
import { TextArgs } from '../../types/text-args'
import { EffectArgs } from '../../types/effect-args'
import { styleMap } from './style-map'

export default (a: BaseArgs & ThemeArgs & EffectArgs & TextArgs) => {
    const ss = scopeStyles(styles, a)
    const cs = customStyles(a, styleMap)

    return (
        <span class={`${styles.text} ${ss}`} style={cs} {...a}>
            {a.children}
        </span>
    )
}
