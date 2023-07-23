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
    'min-width:256px; transition:1s cubic-bezier(0.19, 1, 0.22, 1) all'

export const Dashboard: Component = () => {
    // const [page, setPage] = createSignal<any[]>([])

    // const pages = dataStore.units().map((u) => {
    //     const sections = [<Operation unit={u} />, <Actions unit={u} />]
    //     return {
    //         id: u.id,
    //         sections: sections,
    //     } as any
    // })

    createEffect(async () => {
        await dataStore.getUnits()
        dataStore.selectUnit(dataStore.units()[0].id)
        // setPage(
        //     pages.find((p) => p.id == dataStore.selectedUnit()?.id)?.sections
        // )
    })

    const createPage = (u: Unit) => (
        <Field layer>
            <For each={[<Operation unit={u} />, <Actions unit={u} />]}>
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

    return (
        <Field rel>
            <Transition name='slide-fade'>
                {createPage(dataStore.selectedUnit()!)}
            </Transition>
        </Field>
    )
}
