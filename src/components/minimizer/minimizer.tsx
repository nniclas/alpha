import { For, createEffect, createSignal, onCleanup, onMount } from 'solid-js'
import Field from '../../lib/elements/field/field'
import appStore from '../../core/app-store'

import { Transition } from 'solid-transition-group'
import { isCompact } from '../../lib/utils'

// todo: in constants
const COMPACT_HEADER_SIZE = 60

interface Args {
    sections: any[]
    names: string[]
    // openAction: (s: string) => void
    minSize: number
    section: string
}

// responsive minimizer
export const Minimizer = (a: Args) => {
    const [compact, setCompact] = createSignal<boolean>(false)
    const [section, setSection] = createSignal<string>('')

    const flexClosed = `flex-basis:${a.minSize}px; min-width:${a.minSize}px`
    const flexOpen = `flex-basis:calc(100% - ${a.minSize}px)`
    const flexClosedCompact = `flex-basis:${COMPACT_HEADER_SIZE}px; min-height:${COMPACT_HEADER_SIZE}px`
    const flexOpenCompact = `flex-basis:calc(100% - ${COMPACT_HEADER_SIZE}px)`
    const style = `transition:1s cubic-bezier(0.19, 1, 0.22, 1) all`

    createEffect(() => {
        if (a.section) setSection(a.section)
    })

    createEffect(() => {
        size()
    })

    const size = () => {
        setCompact(isCompact())
    }

    onMount(() => window.addEventListener('resize', size))
    onCleanup(() => window.removeEventListener('resize', size))

    const createPage = () => {
        return (
            <Field>
                <For each={a.sections}>
                    {(sec, i) => {
                        return (
                            <Field
                                rel
                                trim
                                style={
                                    section() == a.names[i()]
                                        ? [
                                              compact()
                                                  ? flexOpenCompact
                                                  : flexOpen,
                                              style,
                                          ].join(';')
                                        : [
                                              compact()
                                                  ? flexClosedCompact
                                                  : flexClosed,
                                              style,
                                          ].join(';')
                                }
                                // onClick={() => {
                                //     a.openAction(sec.s)
                                //     setSection(sec.s)
                                // }}
                            >
                                {sec}
                            </Field>
                        )
                    }}
                </For>
            </Field>
        )
    }

    return (
        <Field layer>
            <Transition name='slide-fade'>{createPage()}</Transition>
        </Field>
    )
}
