import { Component, For, Suspense } from 'solid-js'
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
import { stateColors } from '../../common/constants'
import { Label } from '../../lib/components/label/label'
import EditUnit from '../../components/edit-unit/edit-unit'

const meterColors = {
    meterColor: 'var(--color-strong)',
    valueColor: 'var(--color-middle)',
}

const ps = 60

export const MiniUnit = (a: { u: Unit }) => {
    // createEffect(() => {
    //     console.log(dataStore.selectedUnitRes()?.id)
    // })

    const c = stateColors.find((sc) => sc.id == a.u.state)?.value

    return (
        <Field gxs c s>
            <Field
                s
                col
                style={`border:0px solid var(--color-lighter);width:240px; background: ${
                    ds.selectedUnitId() == a.u.id
                        ? 'var(--color-lightest)'
                        : 'var(--color-lighter)'
                }`}
            >
                <Field s h={40} aic gxs bg={c}>
                    {/* <Field s pxs>
                        <Field
                            s
                            style={`border-radius:16px;  background:${
                                stateColors.find((sc) => sc.id == a.u.state)
                                    ?.value
                            }; width:12px; height:12px`}
                        />
                    </Field> */}
                    <Field psm>
                        <Text sm primary>
                            {a.u.name}
                        </Text>
                    </Field>
                    <Field jce psm>
                        <UnitStateIcon value={a.u.state} />
                    </Field>
                </Field>
                <Field c s h={60}>
                    <Field s>
                        <UnitMeter value={73} scale={10} {...meterColors} />
                    </Field>
                </Field>
            </Field>
        </Field>
    )

    return (
        <Field s col>
            <Field s col h={ps} gxs c>
                <Text sm secondary>
                    {a.u.name}
                </Text>
                <Field
                    secondary
                    w={ps * 3}
                    h={ps}
                    c
                    style='border-radius:1020px;gap:240px;width:180px;height:60px'
                >
                    <UnitMeter value={73} scale={10} {...meterColors} />
                </Field>
            </Field>
            {/* <Field>
                <Field s w={ps} h={ps} c>
                    <Field
                        s
                        style={`border-radius:16px;  background:${
                            stateColors.find((sc) => sc.id == a.u.state)?.value
                        }; width:12px; height:12px`}
                    />
                </Field>
                <Field s w={ps} h={ps} c>
                    <UnitStateIcon value={a.u.state} />
                </Field>
            </Field> */}
        </Field>
    )

    return (
        <Field
            onClick={(e) => {
                ds.setSelectedUnitId(a.u.id)
                // u.selected = true
                // machineDataStore.setPollingActive(false)
            }}
            style='cursor:pointer;cursor:hand'
            s
        >
            <Field col gsm>
                <Field
                    a
                    gsm
                    style={` border-bottom:0px solid var(--color-strong); border-bottom: 2px solid ${
                        ds.selectedUnitId() == a.u.id
                            ? 'var(--color-middle)'
                            : 'var(--color-lighter)'
                    } `}
                >
                    <Field gsm pmd>
                        <Field col gsm>
                            <Field s gsm aic>
                                <Field s aic gxs>
                                    <Field
                                        s
                                        style={`border-radius:16px;  background:${
                                            stateColors.find(
                                                (sc) => sc.id == a.u.state
                                            )?.value
                                        }; width:12px; height:12px`}
                                    />
                                    <UnitStateIcon value={a.u.state} />
                                </Field>
                                <Text sm secondary>
                                    {a.u.name}
                                </Text>
                            </Field>

                            <Field s gsm c>
                                <UnitMeter
                                    value={73}
                                    scale={10}
                                    {...meterColors}
                                />
                            </Field>
                        </Field>
                        {/* <Field s c gsm>
                          
                        </Field> */}
                        <Field s ais>
                            <Modal
                                jcc
                                buttonContent={
                                    <FiEdit
                                        size={18}
                                        color='var(--color-middle)'
                                    />
                                }
                            >
                                <ManageUnitModal unit={a.u} />
                            </Modal>
                        </Field>
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
        <Button accent>
            <Field s h={60} w={100} psm c>
                <Text xs secondary>
                    {appStore.session()?.username}
                </Text>
            </Field>
        </Button>,
        <Button primary>
            <Field s h={60} w={100} psm c>
                <Text xs secondary>
                    users
                </Text>
            </Field>
        </Button>,
        <Modal
            jcc
            buttonContent={
                <Field accent psm s h={60} w={100} c>
                    <Label secondary size='md' iconTheme='secondary'>
                        add unit
                    </Label>
                </Field>
            }
        >
            <EditUnit />
        </Modal>,
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
                                    <Field illume s h={80} w={80} c>
                                        <Label
                                            size='sm'
                                            icon={<FiSettings />}
                                            iconTheme='secondary'
                                        />
                                    </Field>
                                }
                            >
                                <EditUnit />
                            </Modal>
                            <Field s focus>
                                <Button
                                    w={80}
                                    h={80}
                                    res={{ w: 60, h: 60 }}
                                    onClick={logOut}
                                >
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
