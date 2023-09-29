import {
    Component,
    For,
    Suspense,
    createEffect,
    createSignal,
    lazy,
} from 'solid-js'

import Field from '../../../lib/elements/field/field'
import Text from '../../../lib/elements/text/text'
import as from '../../../core/app-store'
import ds from '../../../core/data-store'
import {
    FiAlertCircle,
    FiPlusCircle,
    FiTrendingUp,
    FiX,
    FiZap,
} from 'solid-icons/fi'
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
import { Loader } from '../../../components/loader/loader'
import { Sidemenu } from '../../../components/sidemenu/sidemenu'
import Button from '../../../lib/elements/button/button'
import { Statistics } from '../statistics/statistics'
import { Minimizer } from '../../../components/minimizer/minimizer'
import appStore from '../../../core/app-store'
import { Section } from 'types/_types'

const iconStyle = { size: 18, color: 'var(--color-accent)' }

interface Args {
    section: Section
}

export const Events = (a: Args) => {
    const [entryMenuOpen, setEntryMenuOpen] = createSignal<boolean>(false)

    createEffect(() => {
        if (as.section() != a.section) setEntryMenuOpen(false)
    })

    const hcell = (text: string, showInCompact = false) => {
        const comp = !showInCompact && { ...{ compact: <></> } }
        return (
            <HeaderCell bg='var(--color-stronger)' bb='var(--color-medium)'>
                <Responsive {...comp} addRule={as.section() != a.section}>
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
        <Field rel a bg='var(--color-stronger)'>
            <Transition name='fade'>
                <Suspense
                    fallback={
                        as.section() == a.section && (
                            <Field layer c style='pointer-events:none'>
                                <Loader />
                            </Field>
                        )
                    }
                >
                    <Field rel col bg='var(--color-stronger)'>
                        <Field
                            aic
                            s
                            jcs
                            h={80}
                            res={{ h: 60 }}
                            onClick={() => {
                                as.setSection(a.section)
                                as.setShowCharts(false)
                            }}
                        >
                            <Field s w={80} h={80} c res={{ w: 60, h: 60 }}>
                                <FiAlertCircle {...iconStyle} />
                            </Field>
                            <Text>Events</Text>
                            <Field jce>
                                <Field s h={80} c res={{ h: 60 }}>
                                    <Button
                                        onClick={() => {
                                            as.setSection('secondary')
                                            setEntryMenuOpen(true)
                                        }}
                                    >
                                        <Field s w={80} res={{ w: 60 }} c>
                                            <Label
                                                size='md'
                                                icon={<FiPlusCircle />}
                                                iconTheme='accent'
                                            />
                                        </Field>
                                    </Button>
                                </Field>
                            </Field>
                        </Field>

                        {/* <SectionHeader
                        title=''
                        icon={
                            <Field>
                                <Field s w={60} h={60} c>
                                    <FiTrendingUp {...iconStyle} />
                                </Field>
                                <Text>Stats</Text>
                            </Field>
                        }
                        iconTheme='tertiary'
                        tool={
                            // as.section() == 'events' ? (
                            <Button
                                onClick={() => {
                                    as.setSection('events')
                                    setEntryMenuOpen(true)
                                }}
                            >
                                <Field s w={80} res={{ w: 60 }} c>
                                    <Label
                                        size='md'
                                        icon={<FiPlusCircle />}
                                        iconTheme='accent'
                                    />
                                </Field>
                            </Button>
                        }
                        click={() => as.setSection('events')}
                    /> */}
                        {/* <Field>
                <Statistics />
            </Field> */}

                        <Field>
                            <Field s w={80} res={{ w: 60 }}></Field>
                            <Field col>
                                <Field s pmd res={{ pwxs: true }}>
                                    <TimeLine />
                                </Field>

                                <Field
                                    col
                                    gsm
                                    plg
                                    res={{ col: false, pmd: true }}
                                    style={`flex-direction:${
                                        as.section() == a.section ||
                                        !isCompact()
                                            ? 'column'
                                            : 'row'
                                    } `}
                                >
                                    <TableContainer
                                        trig={as.section() == a.section}
                                    >
                                        <Table>
                                            <Row>
                                                {hcell('Event', true)}
                                                {hcell('Date')}
                                                {hcell('Controller')}
                                                {hcell('Remark')}
                                            </Row>

                                            <For each={ds.entriesRes()}>
                                                {(e, i) => {
                                                    const et = tags.find(
                                                        (t) => t.value == e.tag
                                                    )!
                                                    return (
                                                        <EntryRow
                                                            e={e}
                                                            t={et}
                                                            compact={
                                                                as.section() !=
                                                                a.section
                                                            }
                                                        />
                                                    )
                                                }}
                                            </For>
                                        </Table>
                                    </TableContainer>
                                </Field>
                            </Field>{' '}
                        </Field>
                    </Field>
                </Suspense>
            </Transition>
            {/* <Collapser
                sections={[<Evts />, <Stats />]}
                names={['evts', 'stats']}
                openAction={(sec: any) => console.log('hej')}
            /> */}

            <Sidemenu maxWidth={500} open={entryMenuOpen()}>
                <Field layer>
                    <EditEntry />
                </Field>
                <Field layer pevn jce h={80}>
                    <Field s peva>
                        <Button
                            w={80}
                            h={80}
                            res={{ w: 60, h: 60 }}
                            onClick={(e) => {
                                setEntryMenuOpen(false)
                            }}
                        >
                            <FiX {...iconStyle} />
                        </Button>
                    </Field>
                </Field>
            </Sidemenu>
        </Field>
    )
}
