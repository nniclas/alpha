import { Component, For, Suspense } from 'solid-js'
import { useNavigate } from '@solidjs/router'
import Field from '../../lib/elements/field/field'
import Text from '../../lib/elements/text/text'

const TESTWEEKS = ['30', '31', '32', '33', '34', '35']

export const TimeLine = () => {
    return (
        <Field rel c>
            {/* <Field
                layer
                aic
                rel
                style='height:2px;   background:var(--color-accent)'
            ></Field> */}

            <Field s>
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
                                    style={`border:2px solid var(--color-medium); width: 40px; height:40px; background:${c}; border-radius:32px`}
                                >
                                    <Field layer c>
                                        <Text
                                            xs
                                            secondary
                                            accent={i() == TESTWEEKS.length - 1}
                                            style='font-weight:bold'
                                        >
                                            {w}
                                        </Text>
                                    </Field>
                                </Field>
                                {i() < TESTWEEKS.length - 1 && (
                                    <Field c>
                                        <Field
                                            s
                                            c
                                            style='height:2px; width:32px; background:var(--color-medium)'
                                        ></Field>
                                    </Field>
                                )}
                            </Field>
                        )
                    }}
                </For>
            </Field>
        </Field>
    )
}
