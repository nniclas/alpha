import {
    Component,
    For,
    createEffect,
    createSignal,
    lazy,
    Suspense,
} from 'solid-js'
import { Outlet, useNavigate } from '@solidjs/router'

import Field from '../../lib/elements/field/field'
import Button from '../../lib/elements/button/button'
import Text from '../../lib/elements/text/text'
import appStore from '../../core/app-store'
import dataStore from '../../core/data-store'

import Logo from '../../assets/logo.svg?component-solid'
import AnimArray from '../../components/anim-array/anim-array'
import { Unit } from '../../types/entities/unit'
import { UnitStateIcon } from '../unit-state-icon/unit-state-icon'
import { UnitMeter } from '../../components/unit-meter/unit-meter'
import { FiLock, FiLogOut } from 'solid-icons/fi'

const unitTemplate = (u: Unit) => {
    createEffect(() => {})

    return (
        <Button
            style={`border: ${u.selected ? 2 : 0}px solid green `}
            onClick={() => {
                // dataStore.selectUnit(u.id)
                // u.selected = true
                // machineDataStore.setPollingActive(false)
            }}
        >
            <Field s col gsm pxs>
                <Field
                    a
                    s
                    pmd
                    col
                    gsm
                    style={`width:140px; border:2px solid ${
                        dataStore.selectedUnit()?.id == u.id
                            ? 'hsl(50, 36%, 62%)'
                            : 'hsl(200, 12%, 26%)'
                    }; border-radius:16px`}
                >
                    <Field s>
                        <Text sm primary>
                            {u.name}
                        </Text>
                    </Field>
                    <Field s c gsm>
                        <UnitStateIcon value={u.state} />
                        <UnitMeter
                            value={73}
                            scale={10}
                            meterColor='hsl(200, 12%, 22%)'
                            valueColor='hsl(50, 36%, 62%)'
                        />
                    </Field>
                </Field>
            </Field>
        </Button>
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
                {/* <Suspense
                    fallback={
                        <Text accent xs>
                            Loading fun facts...................
                        </Text>
                    }
                >
                    <Field>
                        <Text accent xs>
                            {dataStore.foo()?.name}
                        </Text>
                    </Field>
                </Suspense> */}
                <Field col gxs>
                    <Text md tertiary>
                        Units
                    </Text>
                    <Field gsm aic p='0 2px'>
                        <Field s jcc>
                            <Field
                                s
                                style='border-radius:16px; background:rgb(180,120,120); width:12px; height:12px'
                            />
                        </Field>
                        <Field s>
                            <Text sm primary>
                                Some units are offline, check status.
                            </Text>
                        </Field>
                    </Field>
                </Field>
                <Field s h={180}>
                    <Suspense
                        fallback={
                            <Text accent xs>
                                Loading uuuuuuunits...................
                            </Text>
                        }
                    >
                        <AnimArray
                            items={dataStore.units()}
                            template={unitTemplate}
                            // units={dataState
                            //     .activities()
                            //     .map((a) => ({ id: a.id!, element: activityElement(a) }))}
                        />
                    </Suspense>{' '}
                </Field>

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
            <Field s>
                <Field s col gsm aie>
                    <Field jce>
                        <Field s ais gsm>
                            <Field s c h={48}>
                                <Text xs color='hsl(200, 12%, 62%)'>
                                    {appStore.session()?.username}
                                </Text>
                            </Field>

                            <Button w={48} h={48} onClick={logOut}>
                                <FiLogOut color='hsl(50, 36%, 62%)' size={18} />
                            </Button>
                        </Field>
                    </Field>
                    <Field s w={100} h={100} p='0 32px'>
                        <Logo />
                    </Field>
                </Field>
            </Field>
        </Field>
    )
}
