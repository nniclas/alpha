import { BaseArgs } from '../../types/base-args'
import { createEffect, createSignal, onMount } from 'solid-js'
import Field from '../../elements/field/field'
import { FieldArgs } from '../../types/field-args'
import Button from '../../elements/button/button'

interface Args {
    buttonContent: any
    children: any
}

export default (a: Args & BaseArgs & FieldArgs) => {
    const [open, setOpen] = createSignal<boolean>(false)

    createEffect(() => {})

    return (
        <Field s rel style={`z-index: ${open() ? 100 : 'auto'};`}>
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
                    style='position:fixed;z-index:101; background:rgba(0,0,0,0.5)'
                    onClick={(e) => {
                        setOpen(false)
                    }}
                />

                <Field
                    {...a}
                    layer
                    a
                    style={`position:fixed; z-index:102; transform:translateY(${
                        open() ? 0 : -20
                    }px); `}
                    onClick={(e) => {
                        setOpen(false)
                        // clicking anywhere in menu will close
                        // handle close targets in child like this: if (!isABtn(e.target)) e.stopPropagation()
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
