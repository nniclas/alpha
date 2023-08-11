import {
    Component,
    For,
    Suspense,
    createEffect,
    createSignal,
    lazy,
    onCleanup,
    onMount,
} from 'solid-js'
import Field from '../../lib/elements/field/field'
import Text from '../../lib/elements/text/text'
import appStore from '../../core/app-store'
import ds from '../../core/data-store'

import { Transition } from 'solid-transition-group'
import { Unit } from '../../types/entities/unit'
import { Loader } from '../../components/loader/loader'
import Responsive from '../../lib/components/responsive/responsive'
import { isCompact } from '../../lib/utils'

const flexClosed = 'flex-basis:400px; min-width:400px'
const flexOpen = 'flex-basis:calc(100% - 400px)'
const flexClosedCompact = 'flex-basis:80px; min-height:80px'
const flexOpenCompact = 'flex-basis:calc(100% - 80px)'
const style = 'transition:1s cubic-bezier(0.19, 1, 0.22, 1) all'

interface Args {
    sections: { s: string; c: any }[] // 2
    openAction: (s: string) => void
}

// responsive collapser
export const Collapser = (a: Args) => {
    const [compact, setCompact] = createSignal<boolean>(false)
    const [section, setSection] = createSignal<string>(a.sections[0].s)

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
            <Field layer res={{ col: true }}>
                <For each={a.sections}>
                    {(sec, i) => {
                        return (
                            <Field
                                trim
                                style={
                                    section() == sec.s
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
                                onClick={() => {
                                    a.openAction(sec.s)
                                    setSection(sec.s)
                                }}
                            >
                                {sec.c}
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
