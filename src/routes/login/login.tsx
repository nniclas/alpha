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

    return (
        <Field col rel>
            <Field class={styles.bg} />
            <Text accent xs>
                login page
            </Text>
        </Field>
    )
}
