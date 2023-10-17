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
                                        'border-bottom:2px solid var(--accent-color);  '
                                    } `}
                                >
                                    <Field layer c>
                                        <Text
                                            sm
                                            style={`color:${
                                                w == ds.selectedWeek()
                                                    ? 'var(--accent-color)'
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
