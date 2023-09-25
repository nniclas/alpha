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

// todo: in constants
const COMPACT_HEADER_SIZE = 60
const DESKTOP_MINIMIZED_WIDTH = 600

const flexClosed = `flex-basis:${DESKTOP_MINIMIZED_WIDTH}px; min-width:${DESKTOP_MINIMIZED_WIDTH}px`
const flexOpen = `flex-basis:calc(100% - ${DESKTOP_MINIMIZED_WIDTH}px)`
const flexClosedCompact = `flex-basis:${COMPACT_HEADER_SIZE}px; min-height:${COMPACT_HEADER_SIZE}px`
const flexOpenCompact = `flex-basis:calc(100% - ${COMPACT_HEADER_SIZE}px)`
const style = `transition:1s cubic-bezier(0.19, 1, 0.22, 1) all`

interface Args {
    sections: any[]
    names: string[]
    // openAction: (s: string) => void
    section: string
}

// responsive collapser
export const Collapser = (a: Args) => {
    const [compact, setCompact] = createSignal<boolean>(false)
    const [section, setSection] = createSignal<string>(a.names[0])

    createEffect(() => {
        if (a.section) {
            setSection(a.section)
        }
        // if (appStore.section()) setSection(appStore.section())
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
            <Field layer res={{ col: true }}>
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
