import { customStyles, scopeStyles } from '../../utils'
import styles from './textfield.module.css'
import { BaseArgs } from '../../types/base-args'
import { ThemeArgs } from '../../types/theme-args'
import { TextArgs } from '../../types/text-args'
import { TextFieldArgs } from '../../types/textfield-args'
import { EffectArgs } from '../../types/effect-args'
import { styleMap } from './style-map'
import Field from '../field/field'
import { createEffect, createSignal } from 'solid-js'

export default (
    a: BaseArgs & ThemeArgs & EffectArgs & TextArgs & TextFieldArgs
) => {
    const ss = scopeStyles(styles, a)
    const cs = customStyles(a, styleMap)

    if (a.multiline)
        return (
            <>
                <textarea
                    rows={4}
                    class={`${styles.textfield} ${ss}`}
                    style={cs}
                    {...(a as any)}
                    onInput={(v: any) => a.change?.(v.target.value)}
                    value={a.value as string}
                >
                    {a.children}
                </textarea>
            </>
        )

    return (
        <Field rel class={`${styles.container}`}>
            <Field
                a
                class={`${styles.indicator}`}
                style={`${
                    a.error
                        ? 'border-bottom: 2px solid var(--color-error);'
                        : ''
                }`}
            ></Field>
            <input
                type={a.password ? 'password' : 'text'}
                class={`${styles.textfield} ${ss}`}
                style={cs}
                {...(a as any)}
                onInput={(v: any) => a.change?.(v.target.value)}
                value={a.value as string}
                placeholder={a.placeholder ?? ''}
            >
                {a.children}
            </input>
        </Field>
    )
}
