import { BaseArgs } from '../../types/base-args'
import { For, createEffect, createSignal, onMount } from 'solid-js'
import { FieldArgs } from 'lib/types/field-args'
import Field from '../../elements/field/field'
import Button from '../../elements/button/button'

interface Args {
    dock?: 'left' | 'right' | 'topfix'
    side?: 'left' | 'right'
    buttonContent?: any
    items: any
    open?: boolean
}

export default (a: Args & BaseArgs & FieldArgs) => {
    const [open, setOpen] = createSignal<boolean>(false)

    createEffect(() => {
        if (a.open != undefined) {
            setOpen(a.open)
        }
    })

    return (
        <Field rel {...a}>
            {a.buttonContent && (
                <Button
                    onClick={(e) => {
                        setOpen(true)
                        e.stopPropagation()
                    }}
                >
                    {a.buttonContent}
                </Button>
            )}

            <Field
                a
                style={`z-index:2;opacity:${open() ? 1 : 0}; pointer-events:${
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
                        // e.preventDefault()
                        // e.stopPropagation()
                        // return false
                    }}
                >
                    <Field col aie={a.side == 'left'} ais={a.side == 'right'}>
                        {a.items}
                    </Field>
                </Field>
            </Field>
        </Field>
    )
}
