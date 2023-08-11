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
    FiTool,
} from 'solid-icons/fi'
import { Transition } from 'solid-transition-group'
import { Loader } from '../../components/loader/loader'
import ManageUnitModal from '../../components/edit-unit/edit-unit'
import Modal from '../../lib/components/modal/modal'
import Responsive from '../../lib/components/responsive/responsive'
import Dropdown from '../../lib/components/dropdown/dropdown'
import { stateColors } from '../../common/constants'

export const MiniUnit = (a: { u: Unit }) => {
    // createEffect(() => {
    //     console.log(dataStore.selectedUnitRes()?.id)
    // })

    return (
        <Field
            onClick={(e) => {
                ds.setSelectedUnitId(a.u.id)
                // u.selected = true
                // machineDataStore.setPollingActive(false)
            }}
            style='cursor:pointer;cursor:hand'
        >
            <Field col gsm>
                <Field
                    a
                    pmd
                    gsm
                    style={` border:0px solid transparent; background:  ${
                        ds.selectedUnitId() == a.u.id
                            ? 'hsl(200, 18%, 12%)'
                            : 'hsl(200, 18%, 16%)'
                    } `}
                >
                    <Field>
                        <Field col gsm>
                            <Field gsm>
                                <Field s aic>
                                    <Field
                                        s
                                        style={`border-radius:16px;  background:${
                                            stateColors.find(
                                                (sc) => sc.id == a.u.state
                                            )?.value
                                        }; width:12px; height:12px`}
                                    />
                                </Field>
                                <Text sm primary>
                                    {a.u.name}
                                </Text>
                            </Field>

                            <Field s gsm c>
                                <UnitStateIcon value={a.u.state} />
                                <UnitMeter
                                    value={73}
                                    scale={10}
                                    meterColor='hsl(200, 12%, 22%)'
                                    valueColor='hsl(50, 36%, 62%)'
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
                                        color='var(--color-lighter)'
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
            <Field h={100} psm>
                <Text xs secondary>
                    {appStore.session()?.username}
                </Text>
            </Field>
        </Button>,
        <Button primary>
            <Field h={100} psm>
                <Text xs secondary>
                    users
                </Text>
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
                            <Field s c w={80} h={80}>
                                <FiMenu color='hsl(50, 36%, 62%)' size={20} />
                            </Field>
                        }
                        items={compactActions}
                    />
                </Field>
            }
        >
            <Field s h={80} c>
                <Field s col gsm aie>
                    <Field jce>
                        <Field s ais gsm>
                            <Field s c h={80}>
                                <Text xs color='hsl(200, 12%, 62%)'>
                                    {appStore.session()?.username}
                                </Text>
                            </Field>

                            <Button w={80} h={80} onClick={logOut}>
                                <FiLogOut color='hsl(50, 36%, 62%)' size={18} />
                            </Button>
                        </Field>
                    </Field>
                </Field>
            </Field>
        </Responsive>
    )
}
