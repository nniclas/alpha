import { Component, For, Suspense, createEffect, createSignal } from 'solid-js'
import { useNavigate } from '@solidjs/router'
import Field from '../../lib/elements/field/field'
import Text from '../../lib/elements/text/text'

import styles from './timeline.module.css'
import { trendColors } from '../../common/constants'
import ds from '../../core/data-store'
import { displayWeek, week } from '../../common/date-utils'

const TESTWEEKS = ['2023-31', '2023-32', '2023-33', '2023-34']

export const TimeLine = () => {
    // createEffect(() => {
    //     console.log(ds.selectedWeek())
    // })

    return (
        <Field rel c>
            <Field s gsm>
                <For each={TESTWEEKS}>
                    {(w, i) => {
                        // const c =
                        //     i() == TESTWEEKS.length - 1
                        //         ? 'var(--color-medium)'
                        //         : 'var(--color-stronger)'
                        return (
                            <Field
                                rel
                                onClick={() => {
                                    ds.setSelectedWeek(w)
                                }}
                            >
                                <Field
                                    class={styles.item}
                                    style={` ${
                                        w == ds.selectedWeek() &&
                                        'border-bottom:2px solid var(--color-dim);  '
                                    } `}
                                >
                                    <Field layer c>
                                        <Text
                                            sm
                                            // class={styles.text}
                                            // color={
                                            //     w == ds.selectedWeek()
                                            //         ? 'var(--color-accent)'
                                            //         : 'var(--color-middle)'
                                            // }
                                            style={`color:${
                                                w == ds.selectedWeek()
                                                    ? 'var(--color-dim)'
                                                    : 'var(--color-middle)'
                                            }`}
                                        >
                                            {displayWeek(w)}
                                        </Text>
                                    </Field>
                                </Field>
                            </Field>
                        )
                    }}
                </For>
            </Field>
        </Field>
    )
}
