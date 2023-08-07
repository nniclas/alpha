import { Component, For, createEffect, createSignal, lazy } from 'solid-js'

import Field from '../../../lib/elements/field/field'
import Text from '../../../lib/elements/text/text'
import as from '../../../core/app-store'
import ds from '../../../core/data-store'
import { FiPlusCircle, FiZap } from 'solid-icons/fi'
import { Unit } from '../../../types/entities/unit'
import { tags } from '../../../common/constants'
import { Transition } from 'solid-transition-group'
import { isCompact } from '../../../lib/utils'
import Modal from '../../../lib/components/modal/modal'
import EditEntry from '../../../components/edit-entry/edit-entry'
import { FullEntryRow, CompactEntryRow, Table } from './actions.parts'

export const Actions = () => {
    return (
        <Field col focus pmd glg res={{ gmd: true }}>
            <Field s gsm>
                <Field s h={30} c>
                    <FiZap size={22} color='hsl(50, 36%, 62%)' />
                </Field>
                <Text md res primary>
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
                </Field>
            </Field>
            <Field
                col
                gsm
                res={{ col: false }}
                style={`flex-direction:${
                    as.section() == 'actions' || !isCompact() ? 'column' : 'row'
                } `}
            >
                <Table>
                    <For each={ds.entriesRes()}>
                        {(e, i) => {
                            const et = tags.find((t) => t.value == e.tag)!
                            return (
                                <>
                                    {as.section() == 'actions' ? (
                                        <FullEntryRow e={e} t={et} />
                                    ) : (
                                        <CompactEntryRow t={et} />
                                    )}
                                </>
                                // <Modal
                                //     s
                                //     c
                                //     buttonContent={
                                //         <Field a s p='8px 24px'>
                                //             <Transition name='slide-fade'>
                                //                 <Field s>
                                //                     {as.section() ==
                                //                     'actions' ? (
                                //                         <FullEntryRow
                                //                             e={e}
                                //                             t={et}
                                //                         />
                                //                     ) : (
                                //                         <CompactEntryRow
                                //                             t={et}
                                //                         />
                                //                     )}
                                //                 </Field>
                                //             </Transition>
                                //         </Field>
                                //     }
                                // >
                                //     <EditEntry entry={e} />
                                // </Modal>
                            )
                        }}
                    </For>
                </Table>

                {/* <For each={ds.entriesRes()}>
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
                                                {as.section() == 'actions' ? (
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
                </For> */}
            </Field>
        </Field>
    )
}
