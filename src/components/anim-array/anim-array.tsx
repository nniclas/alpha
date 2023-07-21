import Field from '../../lib/elements/field/field'
import Text from '../../lib/elements/text/text'
import { For, createEffect, createSignal } from 'solid-js'
import './anim-array.css'
import { TransitionGroup } from 'solid-transition-group'
import Button from '../../lib/elements/button/button'

interface Args {
    //units: Unit[]
    items: any[]
    template: (a: any) => void
}

interface Unit {
    id: string
    element: any
}

// https://github.com/solidjs/solid/issues/39
// https://codesandbox.io/s/basic-css-transition-36rln?file=/index.js:3422-3437

export default (a: Args) => {
    const [list, setList] = createSignal<any[]>([])

    createEffect(() => {
        // console.log(a.items)

        const listIds = list().map((u) => u.id)
        const incomingIds = a.items.map((inu) => inu.id)

        // REMOVE
        if (a.items.length < list().length) {
            let indexesToRemove: number[] = []
            listIds.forEach((id, i) => {
                if (!incomingIds.includes(id)) {
                    indexesToRemove.push(i)
                }
            })
            remove(indexesToRemove)
        }

        // ADD
        if (a.items.length > list().length) {
            let itemsToAdd: any[] = []
            incomingIds.forEach((id, i) => {
                if (!listIds.includes(id)) {
                    itemsToAdd.push(a.items[i])
                }
            })
            add(itemsToAdd, true)
        }
    })

    const add = (items: any[], animSeq = false) => {
        const ls = [...list()]

        if (animSeq) {
            for (const item of items) {
                setTimeout(() => {
                    ls.push(item)
                    setList(ls)
                }, 100)
            }
            return
        }

        ls.push(...items)
        setList(ls)
    }

    const remove = (indexes: number[]) => {
        const ls = [...list()]
        for (const i of indexes) ls.splice(i, 1)
        setList(ls)
    }

    return (
        <Field gsm>
            {/* <Button md primary onClick={() => add()}>
                <Text secondary>Add</Text>
            </Button> */}

            <Field>
                <TransitionGroup name='list-item'>
                    <For each={list()}>
                        {(u, i) => (
                            <div class='list-item'>
                                <Field s col psm>
                                    {/* <Button
                                    md
                                    secondary
                                    onClick={() => remove(i())}
                                >
                                    <Text accent>Remove</Text>
                                </Button> */}
                                    <Field s psm>
                                        {a.template(u)}
                                    </Field>
                                </Field>
                            </div>
                        )}
                    </For>
                </TransitionGroup>
            </Field>

            {/* <For each={units()}>
                {(u, i) => {
                    return <FaderField show={u.show}>{u.field}</FaderField>
                }}
            </For> */}
        </Field>
    )
}
