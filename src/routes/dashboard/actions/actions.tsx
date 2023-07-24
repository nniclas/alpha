import { Component, For, createEffect, createSignal, lazy } from 'solid-js'

import Field from '../../../lib/elements/field/field'
import Text from '../../../lib/elements/text/text'
import appStore from '../../../core/app-store'
import dataStore from '../../../core/data-store'
import { FiSettings, FiZap } from 'solid-icons/fi'
import { Unit } from '../../../types/entities/unit'
import { entryTags } from '../../../common/constants'

interface Args {
    unit?: Unit
}

export const Actions = (a: Args) => {
    createEffect(() => {
        dataStore.getEntries() // todo query by unit id, add to backend
    })

    return (
        <Field col focus pmd glg>
            <Field s gsm>
                <Field s h={30} c>
                    <FiZap size={22} color='hsl(50, 36%, 62%)' />
                </Field>
                <Text primary md>
                    Actions
                </Text>
            </Field>
            <Field col gsm res={{ col: false }}>
                <For each={dataStore.entries()}>
                    {(e, i) => {
                        const et = entryTags.find((et) => et.value == e.tag)
                        return (
                            <Field
                                a
                                s
                                illume
                                pxs
                                aic
                                p='8px 24px'
                                style={`height:${
                                    appStore.section() == 'actions' ? 128 : 32
                                }px; width: ${
                                    appStore.section() == 'actions' ? 512 : 32
                                }px`}
                            >
                                <Text primary xs>
                                    {appStore.section() == 'actions'
                                        ? et?.name
                                        : et?.value}
                                </Text>
                            </Field>
                        )
                    }}
                </For>
            </Field>
        </Field>
    )
}
