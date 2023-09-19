import { BaseArgs } from '../../types/base-args'
import { For, createEffect, createSignal, onMount } from 'solid-js'
import { FieldArgs } from 'lib/types/field-args'
import Field from '../../elements/field/field'
import Button from '../../elements/button/button'

interface Args {
    dock?: 'left' | 'right' | 'topfix'
    buttonContent?: any
    items: any[]
    open?: boolean
    opened?: (o: boolean) => void
}

export default (a: Args & BaseArgs & FieldArgs) => {
    const [open, setOpen] = createSignal<boolean>(false)

    createEffect(() => {
        if (a.open != undefined) {
            setOpen(a.open)
            console.log('burka!')
        }
    })

    return (
        <Field rel {...a}>
            {a.buttonContent && (
                <Button
                    onClick={(e) => {
                        setOpen(true)
                        a.opened?.(true)
                        e.stopPropagation()
                    }}
                >
                    {a.buttonContent}
                </Button>
            )}

            <Field
                a
                style={`opacity:${open() ? 1 : 0}; pointer-events:${
                    open() ? 'all' : 'none'
                };`}
                layer
            >
                <Field
                    layer
                    s
                    style='position:fixed;z-index:100'
                    onClick={(e) => {
                        setOpen(false)
                        a.opened?.(false)
                    }}
                />

                <Field
                    a
                    // jcs

                    // jce={a.dock == 'right'}
                    style={`${
                        a.dock == 'topfix' &&
                        'position:fixed; left:0; width:100%;'
                    } left:0;z-index:101;  height:auto;`}
                    onClick={(e) => {
                        setOpen(false) // clicking anywhere in menu or outside will close menu
                        a.opened?.(false)
                        // e.preventDefault()
                        // e.stopPropagation()
                        // return false
                    }}
                >
                    <Field col>
                        <For each={a.items}>{(item, i) => item}</For>
                    </Field>
                </Field>
            </Field>
        </Field>
    )
}
