import Field from '../../lib/elements/field/field'
import { For, createEffect, createSignal } from 'solid-js'
import './anim-array.css'
import { TransitionGroup } from 'solid-transition-group'

interface Args {
    items?: any[]
    template: (a: any) => void
}

interface Unit {
    id: string
    element: any
}

export default (a: Args) => {
    const [list, setList] = createSignal<any[]>([])

    createEffect(() => {
        if (a.items) {
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
                        itemsToAdd.push(a.items![i])
                    }
                })
                add(itemsToAdd, true)
            }
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
        <Field>
            <Field gxs>
                <TransitionGroup name='list-item'>
                    <For each={a.items || list()}>
                        {(u, i) => (
                            <div class='list-item'>
                                <Field s col>
                                    <Field s>{a.template(u)}</Field>
                                </Field>
                            </div>
                        )}
                    </For>
                </TransitionGroup>
            </Field>
        </Field>
    )
}
