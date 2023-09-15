import {
    customStyles,
    isCompact,
    isObjectWithProps,
    replaceWithLayeredStyles,
    scopeStyles,
} from '../../utils'
import styles from './button.module.css'
import { BaseArgs } from '../../types/base-args'
import { ThemeArgs } from '../../types/theme-args'
import { EffectArgs } from '../../types/effect-args'
import { ButtonArgs } from '../../types/button-args'
import { batch, createEffect, createSignal, onCleanup, onMount } from 'solid-js'
import { styleMap } from './style-map'

export default (a: BaseArgs & ThemeArgs & EffectArgs & ButtonArgs) => {
    const ssDefault = scopeStyles(styles, a)
    const csDefault = customStyles(a, styleMap)

    const [ss, setSs] = createSignal<string>(ssDefault)
    const [cs, setCs] = createSignal<string>(csDefault)

    let ssRes: any
    let csRes: any

    createEffect(() => {
        if (a.res && isCompact()) {
            setSs(ssRes)
            setCs(csRes)
        } else {
            setSs(scopeStyles(styles, a))
            setCs(customStyles(a, styleMap))
        }

        // ssRes = scopeStyles(styles, replaceWithLayeredStyles(a, a.res))
        // csRes = customStyles(a.res, styleMap)
    })

    // when manually using class prop
    let ac
    if (a.class) {
        ac = a.class
        delete a.class
    }

    let st // when manually adding style
    if (a.style) {
        st = a.style
        // delete a.style
    }

    /////////// custom styles responsive handling ////////////
    if (isObjectWithProps(a.res)) {
        const resStyles = () => {
            if (isCompact()) {
                batch(() => {
                    setSs(ssRes)
                    setCs(csRes)
                })
            } else {
                batch(() => {
                    setSs(ssDefault)
                    setCs(csDefault)
                })
            }
        }

        onMount(() => {
            resStyles()
        })

        onMount(() => window.addEventListener('resize', resStyles))
        onCleanup(() => window.removeEventListener('resize', resStyles))
    }
    //////////////////////////////////////////////////////////

    if (a.id == 'hello') console.log(cs())

    return (
        <a class={`${styles.btn} ${ss()} ${ac}`} style={`${cs()};${st}`} {...a}>
            {a.children}
        </a>
    )
}
