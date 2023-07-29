import { Component, For, Suspense } from 'solid-js'
import { useNavigate } from '@solidjs/router'

import Field from '../../lib/elements/field/field'
import Button from '../../lib/elements/button/button'
import Text from '../../lib/elements/text/text'
import appStore from '../../core/app-store'
import ds from '../../core/data-store'

import Logo from '../../assets/logo.svg?component-solid'
import AnimArray from '../../components/anim-array/anim-array'
import { Unit } from '../../types/entities/unit'
import { UnitStateIcon } from '../unit-state-icon/unit-state-icon'
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
import Dropdown from '../../components/dropdown/dropdown'
import ManageUnitModal from '../edit-unit/edit-unit'
import Modal from '../../lib/components/modal/modal'

const unitTemplate = (u: Unit) => {
    // createEffect(() => {
    //     console.log(dataStore.selectedUnitRes()?.id)
    // })

    return (
        <Button
            onClick={(e) => {
                ds.setSelectedUnitId(u.id)
                // u.selected = true
                // machineDataStore.setPollingActive(false)
            }}
        >
            <Field s col gsm pxs>
                <Field
                    a
                    s
                    pmd
                    gsm
                    style={`width:240px; border:2px solid ${
                        ds.selectedUnitId() == u.id
                            ? 'hsl(50, 36%, 62%)'
                            : 'hsl(200, 12%, 26%)'
                    }; border-radius:16px`}
                >
                    <Field>
                        <Field col gsm>
                            <Text sm primary>
                                {u.name}
                            </Text>

                            <Field s gsm c>
                                <UnitStateIcon value={u.state} />
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
                                pxl
                                buttonContent={
                                    <FiEdit
                                        size={18}
                                        color='var(--color-lighter)'
                                    />
                                }
                            >
                                <ManageUnitModal unit={u} />
                            </Modal>
                        </Field>
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
        <Field s h={240} pmd secondary>
            <Field col>
                <Field s col gxs>
                    <Text md tertiary>
                        Units
                    </Text>
                </Field>
                <Field rel>
                    <Transition name='fade'>
                        <Suspense
                            fallback={
                                <Field a layer c style='pointer-events:none'>
                                    <Loader />
                                </Field>
                            }
                        >
                            <Field layer col psm>
                                {ds.unitsRes() && ds.unitsRes()?.length && (
                                    <Field gsm aic p='0 2px'>
                                        <Field s jcc>
                                            <Field
                                                s
                                                style='border-radius:16px; background:rgb(180,120,120); width:12px; height:12px'
                                            />
                                        </Field>
                                        <Field s>
                                            <Text sm primary>
                                                Some units are offline, check
                                                status.
                                            </Text>
                                        </Field>
                                    </Field>
                                )}
                                <Field>
                                    <Field s c>
                                        <Modal
                                            jcc
                                            pxl
                                            buttonContent={
                                                <FiMoreVertical
                                                    size={28}
                                                    color='hsl(160, 18%, 40%)'
                                                />
                                            }
                                        >
                                            <ManageUnitModal />
                                        </Modal>

                                        {/* <ManageUnitModal
                                            button={}
                                            action={(e) => {
                                                console.log('hejja!')
                                                e.preventDefault()
                                                e.stopPropagation()
                                            }}
                                        /> */}

                                        {/* <Button>
                                            <FiMoreVertical
                                                size={28}
                                                color='hsl(160, 18%, 40%)'
                                            />
                                        </Button> */}
                                    </Field>
                                    <AnimArray
                                        items={ds.unitsRes()}
                                        template={unitTemplate}
                                    />
                                </Field>
                            </Field>
                        </Suspense>
                    </Transition>
                </Field>
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
