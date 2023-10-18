import { BaseArgs } from '../../types/base-args'
import { For, createEffect, createSignal } from 'solid-js'
import { FieldArgs } from 'lib/types/field-args'
import Field from '../../elements/field/field'
import Button from '../../elements/button/button'

interface Args {
    index?: number // default selected
    items: any[]
    onChange: (i: number) => void
    buttonArgs?: any
}

export default (a: Args & BaseArgs & FieldArgs) => {
    const [open, setOpen] = createSignal<boolean>(false)
    const [index, setIndex] = createSignal<number>(a.index ?? 0)

    return (
        <Field rel {...a}>
            <Button
                a
                {...a.buttonArgs}
                onClick={(e) => {
                    setOpen(true)
                    e.stopPropagation()
                }}
            >
                {!open() && a.items[index()]}
            </Button>

            <Field
                a
                style={`z-index:2; opacity:${open() ? 1 : 0}; pointer-events:${
                    open() ? 'opacity' : 'none'
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
