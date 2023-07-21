import { Component, For, createEffect, createSignal, lazy } from 'solid-js'
import { Outlet, useNavigate } from '@solidjs/router'

// common css resources
import '../../lib/styles/easing.css'
import '../../lib/styles/transitions.css'
import '../../lib/styles/fonts.css'
import '../../lib/styles/themes/lite.css' // todo make dynamic, // const [theme, setTheme] = createStore<String>('lite')
import Field from '../../lib/elements/field/field'
import Button from '../../lib/elements/button/button'
import Text from '../../lib/elements/text/text'

import appStore from '../../core/app-store'

export const Header: Component = () => {
    const navigate = useNavigate()

    const logOut = () => {
        appStore.removeSession()
        navigate('/login', { replace: true })
    }

    return (
        <Field s h={300} pmd secondary>
            <Text md color='hsl(200, 12%, 42%)'>
                HEADER
            </Text>
            <Field jce>
                <Field s col gsm>
                    <Field s>
                        <Text sm color='hsl(200, 12%, 42%)'>
                            {appStore.session()?.username}
                        </Text>
                    </Field>
                    <Button sm tertiary onClick={logOut}>
                        <Text xs color='hsl(200, 12%, 22%)'>
                            Sign out
                        </Text>
                    </Button>
                </Field>
            </Field>
        </Field>
    )
}
