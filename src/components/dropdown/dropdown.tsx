import { BaseArgs } from '../../lib/types/base-args'
import { For, createEffect, createSignal, onMount } from 'solid-js'
import { FieldArgs } from 'lib/types/field-args'
import Field from '../../lib/elements/field/field'
import Button from '../../lib/elements/button/button'

interface Args {
    dock?: 'left' | 'right'
    // buttonContent: any
    index?: number // default selected
    items: any[]
    onChange: (i: number) => void
    buttonArgs?: any
}

export default (a: Args & BaseArgs & FieldArgs) => {
    const [open, setOpen] = createSignal<boolean>(false)
    const [index, setIndex] = createSignal<number>(a.index ?? 0)

    // createEffect(() => {
    //     console.log(a.items)
    // })

    return (
        <Field rel {...a}>
            <Button
                {...a.buttonArgs}
                onClick={(e) => {
                    setOpen(true)
                    e.stopPropagation()
                }}
            >
                {a.items[index()]}
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
                    jcs
                    jce={a.dock == 'right'}
                    a
                    style={`z-index:101;  height:auto`}
                    onClick={(e) => {
                        setOpen(false) // clicking anywhere in menu or outside will close menu
                        e.preventDefault()
                        e.stopPropagation()
                        return false
                    }}
                >
                    <Field col s>
                        <For each={a.items}>
                            {(item, i) => (
                                <Button
                                    {...a.buttonArgs}
                                    onClick={() => {
                                        setIndex(i())
                                        a.onChange(i())
                                    }}
                                >
                                    {item}
                                </Button>
                            )}
                        </For>
                    </Field>
                </Field>
            </Field>
        </Field>
    )
}
