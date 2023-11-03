import { createEffect, createSignal, onCleanup, onMount } from 'solid-js'
import Field from '../../../lib/elements/field/field'
import Text from '../../../lib/elements/text/text'
import { FiMessageCircle, FiUser } from 'solid-icons/fi'
import { Entry } from '../../../types/entities/entry'
import { EventIcon } from '../../../components/event-icon/event-icon'
import styles from './events.parts.module.css'
import Responsive from '../../../lib/components/responsive/responsive'
import { date } from '../../../common/date-utils'
import { events, measures, tags } from '../../../common/constants'
import Shifter from '../../../components/shifter/shifter'
import { Transition } from 'solid-transition-group'

const iconStyle = { size: 18, color: 'var(--color-middle)' }

const Details = (a: { entry: Entry; compact?: boolean }) => {
    const field = (h: string, val?: string) => (
        <Field pwxs gsm>
            <Text accent sm res>
                {h}
            </Text>
            <Text primary sm res>
                {val}
            </Text>
        </Field>
    )

    return (
        <Field s>
            <Field col>
                {field('Date', date(a.entry.date))}
                {field(
                    'Event',
                    events.find((t) => t.value == a.entry.event)?.title
                )}
                {a.entry.measure &&
                    field('Measure', measures[a.entry.measure - 1].title)}
                {a.entry.notes && field('Notes', a.entry.notes)}
                <Responsive
                    compact={a.entry.user && field('User', a.entry.user.email)}
                />
            </Field>
        </Field>
    )
}

export const EntryRow = (a: { e: Entry; compact: boolean }) => {
    const [openDetails, setOpenDetails] = createSignal<boolean>(false)

    return (
        <Row
            open={openDetails()}
            onClick={(e: any) => setOpenDetails(!openDetails())}
        >
            <Cell>
                <Field rel>
                    <Field gsm>
                        <EventIcon value={a.e.tag} />
                        <Text res xs tertiary>
                            {tags.find((t) => t.value == a.e.tag)?.title}
                        </Text>
                    </Field>

                    <Field layer style='top:32px; left:18px'>
                        <Transition name='foo'>
                            {openDetails() && <Details entry={a.e} />}
                        </Transition>
                    </Field>
                </Field>
            </Cell>
            <Cell>
                <Responsive compact={<></>} addRule={a.compact}>
                    <Text xs tertiary>
                        {date(a.e.date)}
                    </Text>
                </Responsive>
            </Cell>
            <Cell>
                {a.e.user && (
                    <Responsive compact={<></>} addRule={a.compact}>
                        <Text xs primary>
                            <Field gsm>
                                <FiUser {...iconStyle} />
                                <Text xs tertiary>
                                    {a.e.user.email}
                                </Text>
                            </Field>
                        </Text>
                    </Responsive>
                )}
            </Cell>
            <Cell>
                {a.e.notes && (
                    <Responsive compact={<></>} addRule={a.compact}>
                        <FiMessageCircle {...iconStyle} />
                    </Responsive>
                )}
            </Cell>
        </Row>
    )
}

export const TableContainer = (a: {
    h?: number
    children: any
    trig: boolean
}) => {
    let layerRef: any
    const [h, setH] = createSignal<number>(a.h || 0)

    createEffect(() => {
        if (a.h == undefined) {
            setH(layerRef.clientHeight)
        }

        if (a.trig) {
            setTimeout(() => {
                setH(layerRef.clientHeight)
            }, 500)
        }
    })

    onMount(() => {
        if (a.h == undefined) setH(layerRef.clientHeight)
    })

    const size = () => {
        setH(layerRef.clientHeight)
    }

    onMount(() => window.addEventListener('resize', size))
    onCleanup(() => window.removeEventListener('resize', size))

    return (
        <Field rel>
            <Field layer ref={layerRef} style='pointer-events:none'></Field>
            <Field layer>
                <div class={styles.tablecontainer} style={`height:${h()}px`}>
                    {a.children}
                </div>
            </Field>
        </Field>
    )
}

export const Table = (a: { children: any }) => (
    <table class={styles.table}>{a.children}</table>
)

export const Row = (a: {
    children: any
    open?: boolean
    onClick?: (e: any) => void
}) => {
    return (
        <tr
            onClick={a.onClick}
            class={`${styles.row} ${a.open && styles.open}`}
        >
            {a.children}
        </tr>
    )
}

export const Cell = (a: { children: any }) => (
    <td class={styles.cell}>
        <Field s h={60} aic>
            {a.children}
        </Field>
    </td>
)

export const HeaderCell = (a: { bg: string; bb: string; children: any }) => (
    <th
        class={styles.headercell}
        style={`background: ${a.bg}; border-bottom:2px solid ${a.bb}`}
    >
        {a.children}
    </th>
)
