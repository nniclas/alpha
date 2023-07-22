import { Component, For, createEffect, createSignal, lazy } from 'solid-js'

// common css resources
import './lib/styles/index.css'
import './lib/styles/easing.css'
import './lib/styles/transitions.css'
import './lib/styles/fonts.css'
import './lib/styles/themes/lite.css' // todo make dynamic, // const [theme, setTheme] = createStore<String>('lite')

import Field from './lib/elements/field/field'
import { Header } from './components/header/header'
import { Footer } from './components/footer/footer'

import { Route, Router, Routes } from '@solidjs/router' // 👈 Import the router
import { Dashboard } from './routes/dashboard/dashboard'
import { Login } from './routes/login/login'
import RouteGuard from './components/route-guard'
import { Transition } from 'solid-transition-group'

// import BG from './assets/bg2.svg?component-solid'

export const App: Component = () => {
    return (
        // <Field>
        //     <BG />
        // </Field>
        <Router>
            <Field layer col bg='hsl(200, 18%, 22%)' trim>
                <Field s col>
                    <Header />
                </Field>
                <Field rel col>
                    <Transition name='bar' >
                        <Routes>
                            {/* <Route path='/' component={App} /> */}
                            <Route path='/login' component={Login} />
                            <Route path='/' component={RouteGuard}>
                                <Route
                                    path='/dashboard'
                                    component={Dashboard}
                                />
                            </Route>
                        </Routes>
                    </Transition>
                </Field>
                <Field s col>
                    <Footer />
                </Field>
            </Field>
        </Router>
    )
}
