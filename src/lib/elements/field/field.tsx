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
import { batch, createEffect, createSignal, onCleanup, onMount } from 'solid-js'

export default (a: BaseArgs & ThemeArgs & EffectArgs & FieldArgs) => {
    const ssDefault = scopeStyles(styles, a)
    const csDefault = customStyles(a, styleMap)
    const [ss, setSs] = createSignal<string>(ssDefault)
    const [cs, setCs] = createSignal<string>(csDefault)

    let ssRes: any
    let csRes: any

    createEffect(() => {
        // console.log(cs())

        // !!!
        // investigate this: when parent has a res prop all Field children is rendered twice.
        // see replaceWithLayeredStyles() where it happens
        ssRes = scopeStyles(styles, replaceWithLayeredStyles(a, a.res))
        csRes = customStyles(a.res, styleMap)
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
            }

            if (!isCompact()) {
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

    return (
        <div
            class={`${styles.field} ${ss()} ${ac}`}
            style={`${cs()};${st}`}
            {...a}
        />
    )
}
