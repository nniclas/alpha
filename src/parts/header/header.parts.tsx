import { Component, For, Suspense, createEffect, createSignal } from 'solid-js'
import { useNavigate } from '@solidjs/router'

import Field from '../../lib/elements/field/field'
import Button from '../../lib/elements/button/button'
import Text from '../../lib/elements/text/text'
import appStore from '../../core/app-store'
import ds from '../../core/data-store'

import Logo from '../../assets/logo.svg?component-solid'
import { Unit } from '../../types/entities/unit'
import { UnitStateIcon } from '../../components/unit-state-icon/unit-state-icon'
import { FiBatteryCharging, FiLogOut, FiMenu, FiSettings } from 'solid-icons/fi'
import Modal from '../../lib/components/modal/modal'
import Responsive from '../../lib/components/responsive/responsive'
import Dropdown from '../../lib/components/dropdown/dropdown'
import { Label } from '../../lib/components/label/label'
import { unitColors } from '../../common/constants'
import { SvgUnitMeter } from '../../components/svg-unit-meter/svg-unit-meter'
import { randInt } from '../../common/utils'
import Settings from '../settings/settings'

const iconStyle = { size: 18, color: 'var(--color-medium)' }

// const meterColors = {
//     meterColor: 'var(--color-strong)',
//     valueColor: 'var(--color-middle)',
// }

// const ps = 60

export const MiniUnit = (a: { u: Unit }) => {
    // const c = stateColors.find((sc) => sc.id == a.u.state)?.value

    return (
        <Field
            gxs
            onClick={(e) => {
                ds.setSelectedUnitId(a.u.id)
                // u.selected = true
                // machineDataStore.setPollingActive(false)
            }}
            style='cursor:pointer;cursor:hand;'
        >
            <Field
                col
                style={`border:0px solid var(--color-lighter);width:240px; background: ${
                    ds.selectedUnitId() == a.u.id
                        ? 'var(--color-lightest)'
                        : 'var(--color-lighter)'
                }`}
            >
                <Field
                    s
                    h={40}
                    aic
                    gxs
                    bg={unitColors[ds.getUnitIndex(a.u.id)]}
                >
                    <Field psm>
                        <Text sm color='var(--color-lighter)' title>
                            {a.u.name}
                        </Text>
                    </Field>
                    <Field jce psm>
                        <UnitStateIcon value={a.u.state} />
                    </Field>
                </Field>
                <Field>
                    <Field w={200} h={20} psm gxs>
                        <FiBatteryCharging
                            {...iconStyle}
                            color={unitColors[ds.getUnitIndex(a.u.id)]}
                        />
                        <SvgUnitMeter
                            value={randInt(30, 80)}
                            valueColor={unitColors[ds.getUnitIndex(a.u.id)]}
                            meterColor='var(--color-light)'
                        />
                    </Field>
                </Field>
            </Field>
        </Field>
    )
}

export const MainMenu = () => {
    // const navigate = useNavigate()

    const logOut = () => {
        appStore.removeSession(true)
        // navigate('/login', { replace: true })
    }

    const compactActions = [
        <Field pxs col s w={240}>
            <Modal
                buttonContent={
                    <Field tertiary h={60}>
                        <Field s w={60} h={60} c secondary>
                            <FiSettings color='var(--color-light)' size={16} />
                        </Field>
                        <Field h={60} secondary aic>
                            <Text>settings</Text>
                        </Field>
                    </Field>
                }
            >
                <Settings />
            </Modal>
            <Button tertiary onClick={logOut} style='justify-content:start'>
                <Field s w={60} h={60} c>
                    <FiLogOut color='var(--accent-color)' size={16} />
                </Field>
                <Field s h={60} c col>
                    <Text xs accent>
                        {appStore.session()?.username}
                    </Text>
                </Field>
            </Button>
        </Field>,
    ]

    return (
        <Responsive
            s
            compact={
                <Field s>
                    <Dropdown
                        // style='z-index:2'
                        dock='topfix'
                        buttonContent={
                            <Field s c w={80} h={80} res={{ w: 60, h: 60 }}>
                                <FiMenu
                                    color='var(--secondary-color)'
                                    size={20}
                                />
                            </Field>
                        }
                        side='left'
                        items={compactActions}
                    />
                </Field>
            }
        >
            <Field s h={80} res={{ h: 60 }} c>
                <Field s col gsm aie>
                    <Field jce>
                        <Field s ais>
                            <Field s c h={80} res={{ h: 60 }} p='0 32px'>
                                <Text xs color='var(--color-medium)'>
                                    {appStore.session()?.username}
                                </Text>
                            </Field>
                            <Modal
                                jcc
                                buttonContent={
                                    <Field s h={80} w={80} c>
                                        <FiSettings {...iconStyle} />
                                    </Field>
                                }
                            >
                                <Settings />
                            </Modal>
                            <Field s>
                                <Button w={80} h={80} onClick={logOut}>
                                    <FiLogOut {...iconStyle} size={18} />
                                </Button>
                            </Field>
                        </Field>
                    </Field>
                </Field>
            </Field>
        </Responsive>
    )
}
