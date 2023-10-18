import { Component, For, createEffect, createSignal, lazy } from 'solid-js'

// common css resources
import './lib/styles/easing.css'
import './lib/styles/transitions.css'
import './lib/styles/fonts.css'

// theme resources
// import './lib/styles/themes/_theme-helpers.ts'
import './lib/styles/theming/_vars.css'
import './lib/styles/theming/dark.css'
import './lib/styles/theming/lite.css'
import './lib/styles/theming/layout.css'
import './lib/styles/theming/rounding.css'

import '../index.css'

import Field from './lib/elements/field/field'
import { Header } from './parts/header/header'
import { Footer } from './parts/footer/footer'

import { Route, Router, Routes } from '@solidjs/router' // 👈 Import the router
import { Dashboard } from './routes/dashboard/dashboard'
import { Login } from './routes/login/login'
import RouteGuard from './components/route-guard'
import { Transition } from 'solid-transition-group'
import { Dev } from './routes/_dev'
import Responsive from './lib/components/responsive/responsive'
import Text from './lib/elements/text/text'
import { SectionHeader } from './parts/section-header/section-header'
import { FiAlertTriangle } from 'solid-icons/fi'
import { trendColors } from './common/constants'

const iconStyle = { size: 18, color: trendColors[0] }

export const App: Component = () => {
    return (
        // <Field plg w={400} accent res={{ w: 200 }}>
        //     <Text secondary>hello there</Text>
        // </Field>
        <Router>
            <Field layer col bg='var(--secondary-bg)' trim>
                <Field s col>
                    <Header />
                </Field>
                <Field rel col>
                    <Transition name='bar'>
                        <Routes>
                            <Route path='/login' component={Login} />
                            <Route path='/' component={RouteGuard}>
                                <Route path='/' component={Dashboard} />
                                <Route
                                    path='/dashboard'
                                    component={Dashboard}
                                />
                            </Route>

                            <Route path='/dev' component={Dev} />
                        </Routes>
                    </Transition>
                </Field>
                <Field s col>
                    <Responsive compact={<></>}>
                        <SectionHeader
                            bg='var(--color-intense)'
                            title='Alert'
                            titleColor='var(--color-accent)'
                            aux={
                                <Field aic gmd>
                                    <FiAlertTriangle {...iconStyle} />
                                    <Text xs>
                                        {
                                            'Some units are offline, check status.'
                                        }
                                    </Text>
                                </Field>
                            }
                            iconTheme='accent'
                            icon={<FiAlertTriangle />}
                        />
                    </Responsive>
                </Field>
            </Field>
        </Router>
    )
}
