import {
    customStyles,
    isCompact,
    isObjectWithProps,
    scopeStyles,
} from '../../utils'
import styles from './button.module.css'
import { BaseArgs } from '../../types/base-args'
import { ThemeArgs } from '../../types/theme-args'
import { EffectArgs } from '../../types/effect-args'
import { ButtonArgs } from '../../types/button-args'
import { createSignal, onMount } from 'solid-js'
import { styleMap } from './style-map'

export default (a: BaseArgs & ThemeArgs & EffectArgs & ButtonArgs) => {
    const [csResState, setCsResState] = createSignal<string>('')

    const ss = scopeStyles(styles, a)
    const cs = customStyles(a, styleMap)
    const csRes = customStyles(a.res, styleMap) // responsive styles

    /////////// custom styles responsive handling ////////////
    if (isObjectWithProps(a.res)) {
        const resStyles = () => {
            if (isCompact()) {
                setCsResState(csRes) // set css props with responsive styles
            } else {
                setCsResState('')
            }
        }

        onMount(() => {
            resStyles()
        })

        window.addEventListener(
            'resize',
            (e: any) => {
                resStyles()
            },
            false
        )
    }
    //////////////////////////////////////////////////////////

    return (
        <a
            class={`${styles.btn} ${ss}`}
            style={[cs, csResState()].join(' ')}
            {...a}
        >
            {a.children}
        </a>
    )
}
