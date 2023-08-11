import { Component, For, createEffect, createSignal, lazy } from 'solid-js'
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

const iconStyle = { size: 18, color: 'hsl(50, 36%, 62%)' }

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
    // return (
    //     <Field
    //         a
    //         // w={800}
    //         // h={32}
    //         s
    //         style='width:800px; height:32px; border-bottom: 2px solid hsl(200, 18%, 26%);'
    //         pxs
    //         aic
    //         gsm
    //     >
    //         <Field s>
    //             <EventIcon value={a.e.event} />
    //         </Field>
    //         <Text xs tertiary>
    //             {a.t.title}
    //         </Text>
    //         <Field jce gsm>
    //             <Field s gsm w={400}>
    //                 <Field s w={200} gsm>
    //                     {a.e.user && (
    //                         <Field gsm>
    //                             <FiUser {...iconStyle} />
    //                             <Text xs tertiary>
    //                                 {a.e.user.email}
    //                             </Text>
    //                         </Field>
    //                     )}
    //                 </Field>

    //                 <Field s w={18}>
    //                     {a.e.notes && <FiMessageCircle {...iconStyle} />}
    //                 </Field>
    //             </Field>

    //             <Field s w={18}>
    //                 <FiTag {...iconStyle} />
    //             </Field>
    //         </Field>
    //     </Field>
    // )
}

// export const CompactEntryRow = (a: { t: ValueIdTitle }) => {
//     return (
//         <Row>
//             <Cell>
//                 <Field gsm>
//                     <EventIcon value={a.t.value} />
//                 </Field>
//             </Cell>
//             <Cell>
//                 <Field gsm>
//                     <EventIcon value={a.t.value} />
//                 </Field>
//             </Cell>
//             <Cell>
//                 <Field gsm>
//                     <EventIcon value={a.t.value} />
//                 </Field>
//             </Cell>
//             <Cell>
//                 <Field gsm>
//                     <EventIcon value={a.t.value} />
//                 </Field>
//             </Cell>
//         </Row>
//     )

// return (
//     <Field
//         a
//         s
//         style='width:256px; height:32px; border-bottom: 2px solid hsl(200, 18%, 26%);'
//         pxs
//         aic
//         gsm
//         p='8px 16px'
//     >
//         <Field s>
//             <EventIcon value={a.t.value} />
//         </Field>
//         <Text xs tertiary>
//             {a.t.title}
//         </Text>
//     </Field>
// )

export const TableContainer = (a: { h: number; children: any }) => (
    <div class={styles.tablecontainer} style={`height:${a.h}px`}>
        {a.children}
    </div>
)

export const Table = (a: { children: any }) => (
    <table class={styles.table}>{a.children}</table>
)

export const Row = (a: { children: any }) => (
    <tr class={styles.row}>{a.children}</tr>
)

export const Cell = (a: { children: any }) => (
    <td class={styles.cell}>{a.children}</td>
)

export const HeaderCell = (a: { bg: string; children: any }) => (
    <th class={styles.headercell} style={`background:${a.bg}`}>
        {a.children}
    </th>
)
