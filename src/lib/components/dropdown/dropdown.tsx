import { BaseArgs } from '../../types/base-args'
import { For, createEffect, createSignal, onMount } from 'solid-js'
import { FieldArgs } from 'lib/types/field-args'
import Field from '../../elements/field/field'
import Button from '../../elements/button/button'

interface Args {
    dock?: 'left' | 'right'
    buttonContent: any
    items: any[]
}

export default (a: Args & BaseArgs & FieldArgs) => {
    const [open, setOpen] = createSignal<boolean>(false)

    return (
        <Field rel {...a}>
            <Button
                onClick={(e) => {
                    setOpen(true)
                    e.stopPropagation()
                }}
            >
                {a.buttonContent}
            </Button>

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
                    }}
                />

                <Field
                    layer
                    a
                    // jcs
                    jce
                    // jce={a.dock == 'right'}
                    style={`z-index:101;  height:auto; justify-content:end`}
                    onClick={(e) => {
                        setOpen(false) // clicking anywhere in menu or outside will close menu
                        e.preventDefault()
                        e.stopPropagation()
                        return false
                    }}
                >
                    <Field col s>
                        <For each={a.items}>{(item, i) => item}</For>
                    </Field>
                </Field>
            </Field>
        </Field>
    )
}
