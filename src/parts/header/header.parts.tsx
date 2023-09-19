import { Component, For, Suspense, createEffect } from 'solid-js'
import { useNavigate } from '@solidjs/router'

import Field from '../../lib/elements/field/field'
import Button from '../../lib/elements/button/button'
import Text from '../../lib/elements/text/text'
import appStore from '../../core/app-store'
import ds from '../../core/data-store'

import Logo from '../../assets/logo.svg?component-solid'
import { Unit } from '../../types/entities/unit'
import { UnitStateIcon } from '../../components/unit-state-icon/unit-state-icon'
import { UnitMeter } from '../../components/unit-meter/unit-meter'
import {
    FiEdit,
    FiEdit2,
    FiEdit3,
    FiLogOut,
    FiMenu,
    FiMoreHorizontal,
    FiMoreVertical,
    FiPlus,
    FiPlusCircle,
    FiPlusSquare,
    FiSettings,
    FiTool,
} from 'solid-icons/fi'
import { Transition } from 'solid-transition-group'
import { Loader } from '../../components/loader/loader'
import ManageUnitModal from '../../components/edit-unit/edit-unit'
import Modal from '../../lib/components/modal/modal'
import Responsive from '../../lib/components/responsive/responsive'
import Dropdown from '../../lib/components/dropdown/dropdown'
// import { stateColors } from '../../common/constants'
import { Label } from '../../lib/components/label/label'
import EditUnit from '../../components/edit-unit/edit-unit'
import { unitColors } from '../../common/constants'
import { SvgUnitMeter } from '../../components/svg-unit-meter/svg-unit-meter'
import Settings from '../../components/settings/settings'

const meterColors = {
    meterColor: 'var(--color-strong)',
    valueColor: 'var(--color-middle)',
}

const ps = 60

export const MiniUnit = (a: { u: Unit }) => {
    // const c = stateColors.find((sc) => sc.id == a.u.state)?.value

    return (
        <Field
            gxs
            res={{ psm: true }}
            onClick={(e) => {
                ds.setSelectedUnitId(a.u.id)
                // u.selected = true
                // machineDataStore.setPollingActive(false)
            }}
            style='cursor:pointer;cursor:hand'
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
                        <Text sm color='var(--color-lighter)'>
                            {a.u.name}
                        </Text>
                    </Field>
                    <Field jce psm>
                        <UnitStateIcon value={a.u.state} />
                    </Field>
                </Field>
                <Field>
                    <Field w={200} h={24} pmd>
                        <SvgUnitMeter
                            scale={50}
                            value={47}
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
    const navigate = useNavigate()

    const logOut = () => {
        appStore.removeSession()
        navigate('/login', { replace: true })
    }

    const compactActions = [
        <Modal
            jcc
            buttonContent={
                <Field secondary psm s h={70} w={140} c>
                    <Label size='md' iconTheme='secondary'>
                        settings
                    </Label>
                </Field>
            }
        >
            <Settings />
        </Modal>,
        <Button secondary onClick={logOut}>
            <Field s h={70} w={140} psm c col gxs>
                <Text xs>{appStore.session()?.username}</Text>

                <FiLogOut color='var(--color-light)' size={18} />
            </Field>
        </Button>,
    ]

    return (
        <Responsive
            s
            compact={
                <Field s>
                    <Dropdown
                        jce
                        dock='left'
                        buttonContent={
                            <Field s c w={80} h={80} res={{ w: 60, h: 60 }}>
                                <FiMenu
                                    color='var(--color-secondary)'
                                    size={20}
                                />
                            </Field>
                        }
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
                                        <Label
                                            size='sm'
                                            icon={<FiSettings />}
                                            iconTheme='secondary'
                                        />
                                    </Field>
                                }
                            >
                                <Settings />
                            </Modal>
                            <Field s>
                                <Button w={80} h={80} onClick={logOut}>
                                    <FiLogOut
                                        color='var(--color-strong)'
                                        size={18}
                                    />
                                </Button>
                            </Field>
                        </Field>
                    </Field>
                </Field>
            </Field>
        </Responsive>
    )
}
