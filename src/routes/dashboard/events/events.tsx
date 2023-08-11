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
            <HeaderCell bg='var(--color-stronger)' bb='var(--color-fjong)'>
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
        <Field col bg='var(--color-stronger)'>
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

            <Field
                col
                gsm
                pmd
                res={{ col: false, psm: true }}
                style={`flex-direction:${
                    as.section() == 'events' || !isCompact() ? 'column' : 'row'
                } `}
            >
                <TableContainer trig={as.section() == 'events'}>
                    <Table>
                        {/* table headers */}

                        <Row>
                            {hcell('Event', true)}
                            {hcell('Controller')}
                            {hcell('Remark')}
                            {hcell('Measure')}
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
