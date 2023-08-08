import {
    Component,
    For,
    Suspense,
    createEffect,
    createSignal,
    lazy,
} from 'solid-js'
import Field from '../../lib/elements/field/field'
import Text from '../../lib/elements/text/text'
import appStore from '../../core/app-store'
import ds from '../../core/data-store'
import { Operation } from './operation/operation'
import { Events } from './events/events'
import { Transition } from 'solid-transition-group'
import { Unit } from '../../types/entities/unit'
import { Loader } from '../../components/loader/loader'

const flexClosed = 'flex-grow:0.3' // enable animation of flex-grow, must be higher than 0
const flexOpen = 'flex-grow:1'
const style =
    'min-width:400px; transition:1s cubic-bezier(0.19, 1, 0.22, 1) all'

export const Dashboard: Component = () => {
    createEffect(async () => {
        // on successful log on (user has entered dashboard) manually trigger resource fetches
        if (!ds.selectedUnitRes()) {
            ds.initalize()
        }
    })

    const createPage = (u: Unit) => {
        const sections = [
            { s: 'operation', c: <Operation /> },
            { s: 'events', c: <Events /> },
        ]

        return (
            <Field layer res={{ col: true }}>
                <For each={sections}>
                    {(sec, i) => {
                        return (
                            <Field
                                trim
                                style={
                                    appStore.section() == sec.s
                                        ? [flexOpen, style].join(';')
                                        : [flexClosed, style].join(';')
                                }
                                onClick={() => {
                                    appStore.setSection(sec.s as any)
                                    // a.pageChanged(i())
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
        <Field rel>
            <Transition name='fade'>
                <Suspense
                    fallback={
                        <Field a layer c style='pointer-events:none'>
                            <Loader />
                        </Field>
                    }
                >
                    {ds.selectedUnitRes() && (
                        <Field layer>
                            <Transition name='slide-fade'>
                                {createPage(ds.selectedUnitRes()!)}
                            </Transition>
                        </Field>
                    )}
                </Suspense>
            </Transition>
        </Field>
    )
}
