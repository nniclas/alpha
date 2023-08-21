import { Component, For, Suspense, createEffect, createSignal } from 'solid-js'
import { useNavigate } from '@solidjs/router'
import Field from '../../lib/elements/field/field'
import Text from '../../lib/elements/text/text'

import styles from './timeline.module.css'
import { trendColors } from '../../common/constants'

const TESTWEEKS = ['30', '31', '32', '33']

export const TimeLine = () => {
    return (
        <Field rel c>
            {/* <Field
                layer
                aic
                rel
                style='height:2px;   background:var(--color-accent)'
            ></Field> */}

            <Field
                s
                gsm
                style='cursor:pointer;cursor:hand'
                onClick={() => {
                    console.log('todo change week!')
                }}
            >
                <For each={TESTWEEKS}>
                    {(w, i) => {
                        const c =
                            i() == TESTWEEKS.length - 1
                                ? 'var(--color-medium)'
                                : 'var(--color-stronger)'
                        return (
                            <Field rel>
                                {/* <Field layer aic jce>
                                        <Field
                                            s
                                            style={`height:2px; width:92px;  background:${c}`}
                                        ></Field>
                                    </Field> */}
                                <Field
                                    rel
                                    c
                                    s
                                    style={`width: 50px; height:50px; ${
                                        i() == TESTWEEKS.length - 1 &&
                                        'border:2px solid var(--color-accent);  border-radius:32px'
                                    } `}
                                >
                                    <Field layer c>
                                        <Text
                                            sm
                                            color={
                                                i() == TESTWEEKS.length - 1
                                                    ? 'var(--color-accent)'
                                                    : trendColors[0]
                                            }
                                            style='font-weight:bold'
                                        >
                                            {'w ' + w}
                                        </Text>
                                    </Field>
                                </Field>
                                {/* {i() < TESTWEEKS.length - 1 && (
                                    <Field c>
                                        <Field
                                            s
                                            c
                                            a
                                            class={`${styles.line}`}
                                            style={`background:var(--color-medium)`}
                                        ></Field>
                                    </Field>
                                )} */}
                            </Field>
                        )
                    }}
                </For>
            </Field>
        </Field>
    )
}
