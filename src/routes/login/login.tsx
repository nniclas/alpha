import { Component, For, createEffect, createSignal, lazy } from 'solid-js'
import { Outlet, useNavigate } from '@solidjs/router'
// import BG from '../assets/bg2.svg?component-solid'

// common css resources
import '../../lib/styles/easing.css'
import '../../lib/styles/transitions.css'
import '../../lib/styles/fonts.css'
import '../../lib/styles/themes/lite.css' // todo make dynamic, // const [theme, setTheme] = createStore<String>('lite')
import Field from '../../lib/elements/field/field'
import Text from '../../lib/elements/text/text'

import styles from './login.module.css'
import Button from '../../lib/elements/button/button'

const Layout = (a: { bg: string; color: string; lslot: any; rslot: any }) => {
    return (
        <Field col rel>
            <Field></Field>
            <Field>
                <Field rel h={800} bg={a.color}>
                    <Field h={300} bg={a.bg}></Field>
                    <Field layer>{a.lslot}</Field>
                </Field>
                <Field s rel w={800} h={800}>
                    <Field class={styles.bg}></Field>
                </Field>
                <Field rel h={800} bg={a.color}>
                    <Field h={600} bg={a.bg}></Field>
                    <Field layer>{a.rslot}</Field>
                </Field>
            </Field>
            <Field bg={a.color}></Field>
        </Field>
    )
}

export const Login: Component = () => {
    // const navigate = useNavigate()
    const logIn = () => {
        // sessionStorage.setItem('token', 'mytokenisawesome')
        // navigate('/home', { replace: true })
    }

    createEffect(() => {
        // if (sessionStorage.getItem('token')) {
        //     navigate('/home', { replace: true })
        // }
    })

    // login page covers the full window
    return (
        <Field rel class={styles.cover}>
            <Layout
                bg='hsl(200, 18%, 22%)'
                color='hsl(200, 8%, 58%)'
                lslot={
                    <Field aic jce style='z-index:1; margin-right:-100px'>
                        <Text>logo</Text>
                    </Field>
                }
                rslot={
                    <Field aic jcs style='z-index:1; margin-left:-200px'>
                        <Field col gmd>
                            <Text>stuff</Text>
                            <Button tertiary br md>
                                <Text>hello there</Text>
                            </Button>
                        </Field>
                    </Field>
                }
            />
        </Field>
    )
}
