import {
    Component,
    For,
    createEffect,
    createSignal,
    lazy,
    onCleanup,
    onMount,
} from 'solid-js'
import Field from '../../../lib/elements/field/field'
import Text from '../../../lib/elements/text/text'
import { FiMessageCircle, FiTag, FiUser } from 'solid-icons/fi'
import { Entry } from '../../../types/entities/entry'
import { ValueIdTitle } from '../../../types/_types'
import { EventIcon } from '../../../components/event-icon/event-icon'
import styles from './events.parts.module.css'
import Responsive from '../../../lib/components/responsive/responsive'
import as from '../../../core/app-store'
import { Transition } from 'solid-transition-group'
import { date } from '../../../common/date-utils'

const iconStyle = { size: 18, color: 'var(--color-accent)' }

export const EntryRow = (a: { e: Entry; t: ValueIdTitle }) => {
    return (
        <Row>
            <Cell>
                <Responsive
                    compact={
                        <Field gsm>
                            <EventIcon value={a.t.value} />
                            <Text res xs tertiary>
                                {a.t.title}
                            </Text>
                        </Field>
                    }
                    addRule={as.section() != 'events'}
                >
                    <Field gsm>
                        <EventIcon value={a.t.value} />
                        <Text xs tertiary>
                            {a.t.title}
                        </Text>
                    </Field>
                </Responsive>
            </Cell>
            <Cell>
                <Text xs tertiary>
                    {date(a.e.date)}
                </Text>
            </Cell>
            <Cell>
                {a.e.user && (
                    <Responsive
                        compact={<></>}
                        addRule={as.section() != 'events'}
                    >
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
                {/* <Text xs primary>
                    {a.e.notes && <></>}
                </Text> */}
            </Cell>
            <Cell>{/* <FiTag {...iconStyle} /> */}</Cell>
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
        if (a.h == undefined) {
            setH(layerRef.clientHeight)
        }

        // console.log(a.children.map((c: any) => c.content.innerHTML))
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

export const Row = (a: { children: any }) => (
    <tr class={styles.row}>{a.children}</tr>
)

export const Cell = (a: { children: any }) => (
    <td class={styles.cell}>{a.children}</td>
)

export const HeaderCell = (a: { bg: string; bb: string; children: any }) => (
    <th
        class={styles.headercell}
        style={`background: ${a.bg}; border-bottom:2px solid ${a.bb}`}
    >
        {a.children}
    </th>
)
