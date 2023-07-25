import { Component, For, createEffect, createSignal, lazy } from 'solid-js'

import Field from '../../../lib/elements/field/field'
import Text from '../../../lib/elements/text/text'
import appStore from '../../../core/app-store'
import dataStore from '../../../core/data-store'
import {
    FiBell,
    FiOctagon,
    FiSettings,
    FiShuffle,
    FiTrello,
    FiZap,
} from 'solid-icons/fi'
import { Unit } from '../../../types/entities/unit'
import { entryTags } from '../../../common/constants'
import { Transition } from 'solid-transition-group'
import { isCompact } from '../../../lib/utils'
import { Entry } from '../../../types/entities/entry'
import { ValueNamePair } from '../../../types/_types'
import { EntryTagIcon } from '../../../components/entry-tag-icon/entry-tag-icon'

interface Args {
    unit?: Unit
}

export const Actions = (a: Args) => {
    createEffect(() => {
        dataStore.getEntries() // todo query by unit id, add to backend
    })

    const FullEntry = (a: { e: Entry; t: ValueNamePair }) => {
        return (
            <Field a w={512} h={32} s illume pxs aic gsm p='8px 16px'>
                <Field s>
                    <EntryTagIcon value={a.t.value} />
                </Field>
                <Field s>{a.e.tag}</Field>
                <Text xs primary>
                    {a.t.name}
                </Text>
            </Field>
        )
    }

    const CompactEntry = (a: { t: ValueNamePair }) => {
        return (
            <Field a w={256} h={32} s illume pxs aic gsm p='8px 16px'>
                <Field s>
                    <EntryTagIcon value={a.t.value} />
                </Field>
                <Text xs primary>
                    {a.t.name}
                </Text>
            </Field>
        )
    }

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
            <Field
                col
                gsm
                res={{ col: false }}
                style={`flex-direction:${
                    appStore.section() == 'actions' || !isCompact()
                        ? 'column'
                        : 'row'
                } `}
            >
                <For each={dataStore.entries()}>
                    {(e, i) => {
                        const et = entryTags.find((et) => et.value == e.tag)!
                        return (
                            <Field a s pxs aic p='8px 24px'>
                                <Transition name='slide-fade'>
                                    {appStore.section() == 'actions' ? (
                                        <FullEntry e={e} t={et} />
                                    ) : (
                                        <CompactEntry t={et} />
                                    )}
                                </Transition>
                            </Field>
                        )
                    }}
                </For>
            </Field>
        </Field>
    )
}
