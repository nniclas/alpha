import { Component, For, createEffect, createSignal, lazy } from 'solid-js'
import { Outlet, useNavigate } from '@solidjs/router'

// common css resources
import '../lib/styles/easing.css'
import '../lib/styles/transitions.css'
import '../lib/styles/fonts.css'
import '../lib/styles/themes/lite.css' // todo make dynamic, // const [theme, setTheme] = createStore<String>('lite')
import Field from '../../lib/elements/field/field'
import Button from '../../lib/elements/button/button'

export const Header: Component = () => {
    const navigate = useNavigate()

    const logOut = () => {
        sessionStorage.removeItem('token')
        navigate('/signin', { replace: true })
    }

    return (
        <Field>
            header component <Button onClick={logOut}>Log out</Button>
        </Field>
    )
}
