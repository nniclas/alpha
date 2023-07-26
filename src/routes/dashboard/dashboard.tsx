import { Component, For, createEffect, createSignal, lazy } from 'solid-js'
import Field from '../../lib/elements/field/field'
import Text from '../../lib/elements/text/text'
import appStore from '../../core/app-store'
import dataStore from '../../core/data-store'
import { Operation } from './operation/operation'
import { Actions } from './actions/actions'
import { Transition } from 'solid-transition-group'
import { Unit } from 'types/entities/unit'

const flexClosed = 'flex-grow:0.3' // enable animation of flex-grow, must be higher than 0
const flexOpen = 'flex-grow:1'
const style =
    'min-width:400px; transition:1s cubic-bezier(0.19, 1, 0.22, 1) all'

export const Dashboard: Component = () => {
    createEffect(async () => {})

    const createPage = (u: Unit) => {
        const sections = [
            { s: 'operation', c: <Operation unit={u} /> },
            { s: 'actions', c: <Actions unit={u} /> },
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
            <Transition name='slide-fade'>
                {createPage(dataStore.selectedUnitRes()!)}
            </Transition>
        </Field>
    )
}
