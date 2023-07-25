import { Component, For, createEffect, createSignal, lazy } from 'solid-js'

import Field from '../../../lib/elements/field/field'
import Text from '../../../lib/elements/text/text'
import appStore from '../../../core/app-store'
import dataStore from '../../../core/data-store'
import {
    FiBell,
    FiMessageCircle,
    FiOctagon,
    FiSettings,
    FiShuffle,
    FiTag,
    FiTrello,
    FiUser,
    FiZap,
} from 'solid-icons/fi'
import { Unit } from '../../../types/entities/unit'
import { tags } from '../../../common/constants'
import { Transition } from 'solid-transition-group'
import { isCompact } from '../../../lib/utils'
import { Entry } from '../../../types/entities/entry'
import { ValueIdTitle } from '../../../types/_types'
import { EventIcon } from '../../../components/event-icon/event-icon'

interface Args {
    unit?: Unit
}

const iconStyle = { size: 18, color: 'hsl(50, 36%, 62%)' }

export const Actions = (a: Args) => {
    createEffect(() => {
        console.log(a.unit?.id)
        dataStore.getEntries(a.unit?.id)
    })

    const FullEntry = (a: { e: Entry; t: ValueIdTitle }) => {
        return (
            <Field
                a
                w={800}
                h={32}
                s
                bg='hsl(200, 18%, 16%)'
                pxs
                aic
                gsm
                p='8px 16px'
            >
                <Field s>
                    <EventIcon value={a.e.event} />
                </Field>
                <Text xs tertiary>
                    {a.t.title}
                </Text>
                <Field jce gsm>
                    <Field s gsm w={400}>
                        <Field s w={200} gsm>
                            {a.e.user && (
                                <Field gsm>
                                    <FiUser {...iconStyle} />
                                    <Text xs tertiary>
                                        {a.e.user.email}
                                    </Text>
                                </Field>
                            )}
                        </Field>

                        <Field s w={18}>
                            {a.e.notes && <FiMessageCircle {...iconStyle} />}
                        </Field>
                    </Field>

                    <Field s w={18}>
                        <FiTag {...iconStyle} />
                    </Field>
                </Field>
            </Field>
        )
    }

    const CompactEntry = (a: { t: ValueIdTitle }) => {
        return (
            <Field
                a
                w={256}
                // w={18}
                h={32}
                s
                bg='hsl(200, 18%, 16%)'
                pxs
                aic
                gsm
                p='8px 16px'
            >
                <Field s>
                    <EventIcon value={a.t.value} />
                </Field>
                <Text xs tertiary>
                    {a.t.title}
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
                        const et = tags.find((t) => t.value == e.tag)!
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
