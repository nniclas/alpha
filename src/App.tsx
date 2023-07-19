import { Component, For, createEffect, createSignal, lazy } from 'solid-js'

// common css resources
import './lib/styles/easing.css'
import './lib/styles/transitions.css'
import './lib/styles/fonts.css'
import './lib/styles/themes/lite.css' // todo make dynamic, // const [theme, setTheme] = createStore<String>('lite')

import Field from './lib/elements/field/field'
import { Header } from './components/header/header'
import { Footer } from './components/footer/footer'

import { Route, Router, Routes } from '@solidjs/router' // 👈 Import the router
import { Dashboard } from 'routes/dashboard'
import { Login } from 'routes/login'

export const App: Component = () => {
    return (
        <Field col bg='hsl(200, 18%, 12%)' trim>
            <Field s col>
                <Header />
            </Field>
            <Field rel col>
                <Router>
                    <Routes>
                        <Route path='/' component={App} />
                        <Route path='/login' component={Login} />
                        <Route path='/dashboard' component={Dashboard} />
                    </Routes>
                </Router>
            </Field>
            <Field s col>
                <Footer />
            </Field>
        </Field>
    )
}
