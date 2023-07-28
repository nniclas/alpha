import { BaseArgs } from '../../types/base-args'
import { createEffect, createSignal, onMount } from 'solid-js'
import Field from '../../elements/field/field'
import { FieldArgs } from '../../types/field-args'
import Button from '../../elements/button/button'

interface Args {
    buttonContent: any
    // open: boolean
    children: any
}

export default (a: Args & BaseArgs & FieldArgs) => {
    const [open, setOpen] = createSignal<boolean>(false)

    createEffect(() => {
        // console.log(open())
        // console.log('modal: ' + a.open)
        // if (a.open == false) setOpen(false)
    })

    return (
        <Field rel>
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
                style={`opacity:${open() ? 1 : 0}; pointer-events:${
                    open() ? 'all' : 'none'
                };`}
                layer
            >
                <Field
                    layer
                    style='position:fixed;z-index:100; background:rgba(0,0,0,0.2)'
                    onClick={(e) => {
                        setOpen(false)
                    }}
                />

                <Field
                    {...a}
                    layer
                    a
                    style={`position:fixed; z-index:101; transform:translateY(${
                        open() ? 0 : -20
                    }px); `}
                    onClick={(e) => {
                        setOpen(false) // clicking anywhere in menu or outside will close menu
                        e.preventDefault()
                        e.stopPropagation()
                        return false
                    }}
                >
                    {a.children}
                </Field>
            </Field>
        </Field>
    )
}
