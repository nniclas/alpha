import { Component, For, createEffect, createSignal, lazy } from 'solid-js'

import Field from '../../../lib/elements/field/field'
import Text from '../../../lib/elements/text/text'
import appStore from '../../../core/app-store'
import ds from '../../../core/data-store'
import {
    FiBell,
    FiMessageCircle,
    FiOctagon,
    FiPlusCircle,
    FiSettings,
    FiShuffle,
    FiTag,
    FiTrello,
    FiUser,
    FiZap,
} from 'solid-icons/fi'
import { Unit } from '../../../types/entities/unit'
import { events, tags } from '../../../common/constants'
import { Transition } from 'solid-transition-group'
import { isCompact } from '../../../lib/utils'
import { Entry } from '../../../types/entities/entry'
import { ValueIdTitle } from '../../../types/_types'
import { EventIcon } from '../../../components/event-icon/event-icon'
import Button from '../../../lib/elements/button/button'
import Modal from '../../../lib/components/modal/modal'
import EditEntry from '../../../components/edit-entry/edit-entry'
import Dropdown from '../../../components/dropdown/dropdown'

interface Args {
    unit?: Unit
}

const iconStyle = { size: 18, color: 'hsl(50, 36%, 62%)' }

export const Actions = (a: Args) => {
    createEffect(() => {
        // dataStore.getEntries(a.unit?.id)
    })

    const FullEntry = (a: { e: Entry; t: ValueIdTitle }) => {
        return (
            <Field
                a
                // w={800}
                // h={32}
                s
                style='width:800px; height:32px; border-bottom: 2px solid hsl(200, 18%, 26%);'
                pxs
                aic
                gsm
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
                // w={256}
                // w={18}
                // h={32}
                s
                // bg='hsl(200, 18%, 16%)'
                style='width:256px; height:32px; border-bottom: 2px solid hsl(200, 18%, 26%);'
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
                <Field jce>
                    <Field s>
                        <Modal
                            jcc
                            pxl
                            buttonContent={
                                <FiPlusCircle
                                    color='var(--color-accent)'
                                    size={22}
                                />
                            }
                        >
                            <EditEntry />
                        </Modal>
                    </Field>
                    {/* <Button>
                        <FiPlusCircle color='var(--color-accent)' size={22} />
                    </Button> */}
                </Field>
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
                <For each={ds.entriesRes()}>
                    {(e, i) => {
                        const et = tags.find((t) => t.value == e.tag)!
                        return (
                            <Modal
                                s
                                c
                                buttonContent={
                                    <Field a s p='8px 24px'>
                                        <Transition name='slide-fade'>
                                            <Field s>
                                                {appStore.section() ==
                                                'actions' ? (
                                                    <FullEntry e={e} t={et} />
                                                ) : (
                                                    <CompactEntry t={et} />
                                                )}
                                            </Field>
                                        </Transition>
                                    </Field>
                                }
                            >
                                <EditEntry entry={e} />
                            </Modal>
                        )
                    }}
                </For>
            </Field>
        </Field>
    )
}
