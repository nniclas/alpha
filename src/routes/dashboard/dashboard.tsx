import { Component, For, createEffect, createSignal, lazy } from 'solid-js'
import Field from '../../lib/elements/field/field'
import Text from '../../lib/elements/text/text'
import appStore from '../../core/app-store'
import dataStore from '../../core/data-store'
import { Operation } from './operation/operation'
import { Actions } from './actions/actions'

const flexClosed = 'flex-grow:0.3' // enable animation of flex-grow, must be higher than 0
const flexOpen = 'flex-grow:1'
const style =
    'min-width:256px; transition:1s cubic-bezier(0.19, 1, 0.22, 1) all'

export const Dashboard: Component = () => {
    createEffect(() => {
        dataStore.getUnits()
        // console.log(dataStore.selectedUnit()?.name)
    })

    const sections = [<Operation />, <Actions />]

    return (
        <Field>
            <For each={sections}>
                {(c, i) => {
                    return (
                        <Field
                            trim
                            style={
                                appStore.section() == i()
                                    ? [flexOpen, style].join(';')
                                    : [flexClosed, style].join(';')
                            }
                            onClick={() => {
                                appStore.setSection(i())
                                // a.pageChanged(i())
                            }}
                        >
                            {c}
                        </Field>
                    )
                }}
            </For>
        </Field>
    )
}
