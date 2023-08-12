import { Component, For, createEffect, createSignal, lazy } from 'solid-js'
import { Outlet, useNavigate } from '@solidjs/router'
import Logo from '../../assets/logo.svg?component-solid'

import Field from '../../lib/elements/field/field'
import Text from '../../lib/elements/text/text'

import styles from './login.module.css'
import Button from '../../lib/elements/button/button'
import Textfield from '../../lib/elements/textfield/textfield'
import { signIn } from '../../core/auth'
import { Transition } from 'solid-transition-group'
import SelectField from '../../lib/components/select-field/select-field'

const Layout = (a: { bg: string; color: string; lslot: any; rslot: any }) => {
    return (
        <Field col rel>
            <Field></Field>
            <Field>
                <Field rel h={600} bg={a.color}>
                    <Field h={150} bg={a.bg}></Field>
                    <Field layer>{a.lslot}</Field>
                </Field>
                <Field s rel w={600} h={600}>
                    <Field class={styles.bg}></Field>
                </Field>
                <Field rel h={600} bg={a.color}>
                    <Field h={450} bg={a.bg}></Field>
                    <Field layer>{a.rslot}</Field>
                </Field>
            </Field>
            <Field bg={a.color}></Field>
        </Field>
    )
}
import as from '../../core/app-store'
import ds from '../../core/data-store'
const TESTWEEKS = ['2023-31', '2023-32', '2023-33', '2023-34']

export const Login: Component = () => {
    const navigate = useNavigate()

    const [email, setEmail] = createSignal<string>('john@doe.com') /////////////////////// remove default
    const [password, setPassword] = createSignal<string>('eple') ///////////////////////// remove default

    const logIn = async () => {
        if (await signIn(email(), password())) {
            navigate('/dashboard', { replace: true })
        }
    }

    // login page covers the full window
    return (
        <Field rel class={styles.cover}>
            <Field layer jcs ais>
                <Field s pmd h={400} aic>
                    <Field s col gsm>
                        <img
                            src='src/assets/icons/cogs.png'
                            style='width:180px;'
                        />
                        <Field p='16px 48px' gmd col>
                            <Text
                                md
                                color='var(--color-accent)'
                                style='letter-spacing:32px'
                            >
                                ALPHA
                            </Text>
                            <Text
                                sm
                                color='var(--color-middle)'
                                style='letter-spacing:1px'
                            >
                                Remote configuration and operating technical
                                tool.
                            </Text>
                        </Field>
                    </Field>
                </Field>
            </Field>
            <Layout
                bg='var(--color-stronger)'
                color='var(--color-light)'
                lslot={
                    <Field aic jce gmd style='z-index:1; margin-right:-100px'>
                        <Field s w={300} h={300}>
                            <Logo />
                        </Field>
                    </Field>
                }
                rslot={
                    <Field col ais jce style='z-index:1; margin-left:-100px;'>
                        <Field s col psm>
                            <Text sm color='var(--color-middle)'>
                                Account
                            </Text>
                        </Field>

                        <Field
                            col
                            s
                            gsm
                            plg
                            style='width:340px; background:var(--color-strongest); transition:1s ease all'
                        >
                            <Field s psm>
                                <Text color='var(--color-light)'>Sign in</Text>
                            </Field>
                            <Field s>
                                <Textfield
                                    placeholder='Email'
                                    value={email()}
                                    primary
                                    psm
                                    color='var(--color-middle)'
                                    change={(v) => setEmail(v)}
                                />
                            </Field>
                            <Field s>
                                <Textfield
                                    password
                                    placeholder='Password'
                                    value={password()}
                                    primary
                                    psm
                                    color='var(--color-middle)'
                                    change={(v) => setPassword(v)}
                                />
                            </Field>
                            <Field jce>
                                <Field s>
                                    <Button tertiary md onClick={logIn}>
                                        <Text color='var(--color-stronger)'>
                                            Sign in
                                        </Text>
                                    </Button>
                                </Field>
                            </Field>
                        </Field>
                    </Field>
                }
            />
            <Field layer jcc aie>
                <Field s pmd>
                    <Text color='var(--color-lightest)' sm>
                        nniclas © Copyright 2023
                    </Text>
                </Field>
            </Field>
        </Field>
    )
}
