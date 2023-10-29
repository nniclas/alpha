// common css resources
import './lib/styles/easing.css'
import './lib/styles/transitions.css'
import './lib/styles/fonts.css'
import '../index.css'

import { Component } from 'solid-js'
import Field from './lib/elements/field/field'
import { Header } from './parts/header/header'
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
import { trendColors, unitColors } from './common/constants'
import ds from './core/data-store'

const iconStyle = { size: 18, color: trendColors[0] }

export const App: Component = () => {
    return (
        <Router>
            <Field layer col bg='var(--primary-bg)'>
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
                            titleColor='var(--color-dim)'
                            aux={
                                <Field aic gmd>
                                    <FiAlertTriangle {...iconStyle} />
                                    <Text xs accent>
                                        {'Some units are offline..'}
                                    </Text>
                                </Field>
                            }
                            iconTheme='accent'
                            icon={<FiAlertTriangle />}
                        />
                        <Field
                            a
                            style={`height:8px; flex:none; background: ${
                                unitColors[ds.getUnitIndex(ds.selectedUnitId())]
                            }`}
                        />
                    </Responsive>
                </Field>
            </Field>
        </Router>
    )
}
