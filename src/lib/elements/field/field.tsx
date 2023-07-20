import {
    customStyles,
    isCompact,
    isObjectWithProps,
    replaceWithLayeredStyles,
    scopeStyles,
} from '../../utils'
import { styleMap } from './style-map'
import './field.module.css'
import styles from './field.module.css'
import { BaseArgs } from '../../types/base-args'
import { ThemeArgs } from '../../types/theme-args'
import { FieldArgs } from '../../types/field-args'
import { EffectArgs } from '../../types/effect-args'
import { createSignal, onMount } from 'solid-js'

export default (a: BaseArgs & ThemeArgs & EffectArgs & FieldArgs) => {
    const ssDefault = scopeStyles(styles, a)
    const csDefault = customStyles(a, styleMap)
    const [ss, setSs] = createSignal<string>(ssDefault)
    const [cs, setCs] = createSignal<string>(csDefault)

    /////////// custom styles responsive handling ////////////
    if (isObjectWithProps(a.res)) {
        const ssRes = scopeStyles(styles, replaceWithLayeredStyles(a, a.res))
        const csRes = customStyles(a.res, styleMap)

        const resStyles = () => {
            if (isCompact()) {
                setSs(ssRes)
                setCs(csRes)
            } else {
                setSs(ssDefault)
                setCs(csDefault)
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

    return <div class={`${styles.field} ${ss()}`} style={cs()} {...a} />
}
