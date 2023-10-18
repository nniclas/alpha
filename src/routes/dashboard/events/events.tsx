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
import { tags } from '../../../common/constants'
import { Transition } from 'solid-transition-group'
import { isCompact } from '../../../lib/utils'
import Modal from '../../../lib/components/modal/modal'
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
import EditEntry from '../../../parts/edit-entry/edit-entry'

import styles from '../../../common/common.module.css'

const iconStyle = { size: 18, color: 'var(--color-dim)' }

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
            <HeaderCell bg='var(--secondary-bg)' bb='var(--color-medium)'>
                <Responsive {...comp} addRule={as.section() != a.section}>
                    <Field>
                        <Text xs accent caption>
                            {text}
                        </Text>
                    </Field>
                </Responsive>
            </HeaderCell>
        )
    }

    return (
        <Field rel a secondary>
            <Transition name='fade'>
                <Suspense
                    fallback={
                        <Field layer c style='pointer-events:none'>
                            {!as.showCharts() && <Loader />}
                        </Field>
                    }
                >
                    <Field rel col>
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
                            class={styles.sectionheader}
                        >
                            <Field s w={80} h={80} c res={{ w: 60, h: 60 }}>
                                <FiAlertCircle {...iconStyle} />
                            </Field>
                            <Text res title>
                                Events
                            </Text>
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

                        <Field>
                            <Field
                                s
                                a
                                w={80}
                                style={`width:${as.showCharts() ? 60 : 20}px`}
                            ></Field>
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
                <Field>
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
