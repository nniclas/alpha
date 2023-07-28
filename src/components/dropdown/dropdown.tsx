import { BaseArgs } from '../../lib/types/base-args'
import { createEffect, createSignal, onMount } from 'solid-js'
import { FieldArgs } from 'lib/types/field-args'
import Field from '../../lib/elements/field/field'
import Button from '../../lib/elements/button/button'

interface ClickerArgs {
    icon?: any
    text?: string
    args?: any
}

interface Args {
    dock: 'left' | 'right'
    clicker: ClickerArgs
    children?: any
}

export default (a: Args & BaseArgs & FieldArgs) => {
    const [open, setOpen] = createSignal<boolean>(false)

    createEffect(() => {
        console.log('dropdown: ' + open())
    })

    return (
        <Field rel {...a}>
            <Button
                {...a.clicker.args}
                onClick={() => {
                    setOpen(true)
                }}
            >
                {a.clicker.icon || a.clicker.text}
            </Button>

            <Field
                a
                style={`opacity:${open() ? 1 : 0.5}; pointer-events:${
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
                    layer
                    jce={a.dock == 'right' ? true : false}
                    a
                    style={`z-index:101;  height:auto`}
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
