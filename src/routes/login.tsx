import { Component, For, createEffect, createSignal, lazy } from 'solid-js'
import { Outlet, useNavigate } from '@solidjs/router'

// common css resources
import '../lib/styles/easing.css'
import '../lib/styles/transitions.css'
import '../lib/styles/fonts.css'
import '../lib/styles/themes/lite.css' // todo make dynamic, // const [theme, setTheme] = createStore<String>('lite')
import Field from '../lib/elements/field/field'

export const Login: Component = () => {
    const navigate = useNavigate()
    const logIn = () => {
        sessionStorage.setItem('token', 'mytokenisawesome')
        navigate('/home', { replace: true })
    }

    createEffect(() => {
        if (sessionStorage.getItem('token')) {
            navigate('/home', { replace: true })
        }
    })

    return <Field>login page</Field>
}
