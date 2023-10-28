import Field from '../../lib/elements/field/field'
import { For } from 'solid-js'
import { Transition } from 'solid-transition-group'

interface Page {
    condition: boolean
    content: any
}

interface Args {
    pages?: Page[] // either a fixed set of pages based on conditions
    children?: any // or just an updated new child
    tr?: string
    nl?: boolean
}

export default (a: Args) => {
    const layer = a.nl != true ? true : false

    const create = (content: any) => {
        return <Field layer={layer}>{content}</Field>
    }

    return (
        <Field rel trim>
            <Transition name={a.tr || 'slide-fade'}>
                {a.children && create(a.children)}
                {a.pages && (
                    <For each={a.pages}>
                        {(p) =>
                            p.condition && (
                                <Field layer={layer}>{p.content}</Field>
                            )
                        }
                    </For>
                )}
            </Transition>
        </Field>
    )
}
