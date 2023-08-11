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
import {
    EntryRow,
    Table,
    Row,
    Cell,
    TableContainer,
    HeaderCell,
} from './events.parts'
import Responsive from '../../../lib/components/responsive/responsive'
import { SectionHeader } from '../../../parts/section-header'

const iconStyle = { size: 18, color: 'hsl(50, 36%, 62%)' }

export const Events = () => {
    const hcell = (text: string, showInCompact = false) => {
        const comp = !showInCompact && { ...{ compact: <></> } }
        return (
            <HeaderCell bg='var(--color-fjong)'>
                <Responsive {...comp} addRule={as.section() != 'events'}>
                    <Field>
                        <Text xs accent>
                            {text}
                        </Text>
                    </Field>
                </Responsive>
            </HeaderCell>
        )
    }
    return (
        <Field col focus glg res={{ gmd: true }}>
            <SectionHeader
                title='Events'
                icon={<FiZap />}
                iconTheme='tertiary'
                tool={
                    <Modal
                        jcc
                        pxl
                        buttonContent={
                            <Field s w={80} c>
                                <FiPlusCircle
                                    color='var(--color-accent)'
                                    size={22}
                                />{' '}
                            </Field>
                        }
                    >
                        <EditEntry />
                    </Modal>
                }
            />

            {/* <Field s gsm>
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
            </Field> */}
            <Field
                col
                gsm
                res={{ col: false }}
                style={`flex-direction:${
                    as.section() == 'events' || !isCompact() ? 'column' : 'row'
                } `}
            >
                <TableContainer h={200}>
                    <Table>
                        {/* table headers */}

                        <Row>
                            {hcell('Events', true)}
                            {hcell('Controller')}
                            {hcell('Remark')}
                            {hcell('Measure')}
                            {/* <HeaderCell>
                                <Responsive
                                    compact={<></>}
                                    addRule={as.section() != 'events'}
                                >
                                    <Text xs accent>
                                        Controller
                                    </Text>
                                </Responsive>
                            </HeaderCell>
                            <HeaderCell>
                                <Responsive
                                    compact={<></>}
                                    addRule={as.section() != 'events'}
                                >
                                    <Text xs accent>
                                        Remark
                                    </Text>
                                </Responsive>
                            </HeaderCell>
                            <HeaderCell>
                                <Responsive
                                    compact={<></>}
                                    addRule={as.section() != 'events'}
                                >
                                    <Text xs accent>
                                        Measure
                                    </Text>
                                </Responsive>
                            </HeaderCell> */}
                        </Row>

                        <For each={ds.entriesRes()}>
                            {(e, i) => {
                                const et = tags.find((t) => t.value == e.tag)!
                                return (
                                    <>
                                        <EntryRow e={e} t={et} />
                                        {/* {as.section() == 'actions' ? (
                                        <EntryRow e={e} t={et} />
                                    ) : (
                                        <CompactEntryRow t={et} />
                                    )} */}
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
                </TableContainer>

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
