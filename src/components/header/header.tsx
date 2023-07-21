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
import dataStore from '../../core/data-store'

import Logo from '../../assets/logo.svg?component-solid'
import AnimArray from '../../components/anim-array/anim-array'
import { Unit } from '../../types/entities/unit'

const unitTemplate = (u: Unit) => {
    return (
        <Field s col gsm pmd>
            <Field s w={140} h={80} tertiary pmd br col>
                <Text md secondary>
                    {u.name}
                </Text>
                <Text md secondary>
                    {u.state}
                </Text>
            </Field>
        </Field>
    )
}

export const Header: Component = () => {
    const navigate = useNavigate()

    const logOut = () => {
        appStore.removeSession()
        navigate('/login', { replace: true })
    }

    return (
        <Field s h={300} pmd secondary>
            <Field col>
                <Field col gxs>
                    <Text md tertiary>
                        Units
                    </Text>
                    <Field gsm aic p='0 2px'>
                        <Field s jcc>
                            <Field
                                s
                                style='border-radius:16px; background:green; width:12px; height:12px'
                            />
                        </Field>
                        <Field s>
                            <Text sm primary>
                                All units functional and in full operation
                            </Text>
                        </Field>
                    </Field>
                </Field>
                <AnimArray
                    items={dataStore.units()}
                    template={unitTemplate}
                    // units={dataState
                    //     .activities()
                    //     .map((a) => ({ id: a.id!, element: activityElement(a) }))}
                />

                {/* <For each={dataStore.units()}>
                        {(u, i) => (
                            <Field s col gsm pmd>
                                <Field s w={140} h={80} tertiary pmd br col>
                                    <Text md secondary>
                                        {u.name}
                                    </Text>
                                    <Text md secondary>
                                        {u.state}
                                    </Text>
                                </Field>
                            </Field>
                        )}
                    </For> */}
            </Field>
            <Field s jce>
                <Field s col gsm>
                    <Field s w={100} h={100}>
                        <Logo />
                    </Field>
                    <Field s c>
                        <Text xs color='hsl(200, 12%, 62%)'>
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
