import { Component, For, createEffect, createSignal, lazy } from 'solid-js'

import Field from '../../../lib/elements/field/field'
import Text from '../../../lib/elements/text/text'
import as from '../../../core/app-store'
import ds from '../../../core/data-store'
import { FiPlusCircle, FiZap } from 'solid-icons/fi'
import { Unit } from '../../../types/entities/unit'
import { tags, unitColors, unitColorsDarker } from '../../../common/constants'
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
import { SectionHeader } from '../../../parts/section-header/section-header'
import SelectField from '../../../lib/components/select-field/select-field'
import { Label } from '../../../lib/components/label/label'
import { TimeLine } from '../../../components/timeline/timeline'

// const TESTWEEKS = ['2023-31', '2023-32', '2023-33', '2023-34']

export const Events = () => {
    // createEffect(() => {
    //     console.log()
    // })

    const hcell = (text: string, showInCompact = false) => {
        const comp = !showInCompact && { ...{ compact: <></> } }
        return (
            <HeaderCell bg='var(--color-stronger)' bb='var(--color-medium)'>
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
        <Field rel a col bg='var(--color-stronger)'>
            {/* <Field layer col style='pointer-events:none'>
                <Responsive
                    compact={
                        <div
                            style={`transition:.4s ease border; flex:1; border-left:12px solid ${
                                unitColorsDarker[
                                    ds.getUnitIndex(ds.selectedUnitId())
                                ]
                            }`}
                        ></div>
                    }
                >
                    <div
                        style={`transition:.4s ease border; flex:1; border-top:12px solid ${
                            unitColorsDarker[
                                ds.getUnitIndex(ds.selectedUnitId())
                            ]
                        }`}
                    ></div>
                </Responsive>
            </Field> */}

            <SectionHeader
                title='Events'
                icon={<FiZap />}
                iconTheme='tertiary'
                tool={
                    <Modal
                        jcc
                        buttonContent={
                            <Field s w={80} res={{ w: 60 }} c>
                                <Label
                                    size='md'
                                    icon={<FiPlusCircle />}
                                    iconTheme='accent'
                                />
                            </Field>
                        }
                    >
                        <EditEntry />
                    </Modal>
                }
                click={() => as.setSection('events')}
                // color={}
            />

            <Field s pmd res={{ pwxs: true }}>
                <TimeLine />
            </Field>

            <Field
                col
                gsm
                plg
                res={{ col: false, pmd: true }}
                style={`flex-direction:${
                    as.section() == 'events' || !isCompact() ? 'column' : 'row'
                } `}
            >
                <TableContainer trig={as.section() == 'events'}>
                    <Table>
                        {/* table headers */}

                        <Row>
                            {hcell('Event', true)}
                            {hcell('Date', true)}
                            {hcell('Controller')}
                            {hcell('Remark')}
                            {/* {hcell('Measure')} */}
                        </Row>

                        <For each={ds.entriesRes()}>
                            {(e, i) => {
                                const et = tags.find((t) => t.value == e.tag)!
                                return <EntryRow e={e} t={et} />
                            }}
                        </For>
                    </Table>
                </TableContainer>
            </Field>
        </Field>
    )
}
