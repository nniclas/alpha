import { Component, For, createEffect, createSignal, lazy } from 'solid-js'
import { Outlet, useNavigate } from '@solidjs/router'
import Logo from '../../assets/logo.svg?component-solid'

// common css resources
import '../../lib/styles/easing.css'
import '../../lib/styles/transitions.css'
import '../../lib/styles/fonts.css'
import '../../lib/styles/themes/lite.css' // todo make dynamic, // const [theme, setTheme] = createStore<String>('lite')
import Field from '../../lib/elements/field/field'
import Text from '../../lib/elements/text/text'

import styles from './login.module.css'
import Button from '../../lib/elements/button/button'
import Textfield from '../../lib/elements/textfield/textfield'
import { signIn } from '../../core/auth'

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

export const Login: Component = () => {
    const navigate = useNavigate()

    const [email, setEmail] = createSignal<string>('john@doe.com') /////////////////////// remove default
    const [password, setPassword] = createSignal<string>('eple') ///////////////////////// remove default

    const logIn = async () => {
        if (await signIn(email(), password()))
            navigate('/dashboard', { replace: true })
    }

    // login page covers the full window
    return (
        <Field rel class={styles.cover}>
            <Field layer jcs ais>
                <Field s pmd h={400} aic>
                    <Field s col>
                        <img
                            src='src/assets/icons/cogs.png'
                            style='width:180px;'
                        />
                        <Field c p='16px 48px' gmd>
                            <Text
                                lg
                                color='hsl(50, 36%, 62%)'
                                style='letter-spacing:32px'
                            >
                                ALPHA
                            </Text>
                            <Text sm color='hsl(200, 12%, 42%)'>
                                Remote configuration and operating technical
                                tool.
                            </Text>
                        </Field>
                    </Field>
                </Field>
            </Field>
            <Layout
                bg='hsl(200, 18%, 22%)'
                color='hsl(200, 8%, 58%)'
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
                            <Text sm color='hsl(200, 18%, 42%)'>
                                Account
                            </Text>
                        </Field>
                        <Field
                            col
                            s
                            gsm
                            plg
                            style='width:340px; background:hsla(200, 18%, 20%,0.8)'
                        >
                            <Field s psm>
                                <Text color='hsl(200, 18%, 62%)'>Sign in</Text>
                            </Field>
                            <Field s>
                                <Textfield
                                    placeholder='Email'
                                    value={email()}
                                    primary
                                    psm
                                    color='hsl(200, 18%, 32%)'
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
                                    color='hsl(200, 18%, 32%)'
                                    change={(v) => setPassword(v)}
                                />
                            </Field>
                            <Field jce>
                                <Field s>
                                    <Button tertiary md onClick={logIn}>
                                        <Text color='hsl(200, 18%, 22%)'>
                                            Sign in
                                        </Text>
                                    </Button>
                                </Field>
                            </Field>
                        </Field>

                        {/* <Text
                            lg
                            tertiary
                            style='letter-spacing:2px;opacity:0.25;color:black'
                        >
                            ALPHA
                        </Text> */}
                        {/* <Field col gmd>
                            <Text>stuff</Text>
                            <Button tertiary br md>
                                <Text>hello there</Text>
                            </Button>
                        </Field> */}
                        {/* <Text>•</Text> */}
                    </Field>
                }
            />
            <Field layer jcc aie>
                <Field s pmd>
                    <Text color='hsl(200, 18%, 32%)' sm>
                        nniclas © Copyright 2023
                    </Text>
                </Field>
            </Field>
        </Field>
    )
}
