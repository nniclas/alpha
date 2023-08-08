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
import { UnitStateIcon } from '../../components/unit-state-icon/unit-state-icon'
import { UnitMeter } from '../../components/unit-meter/unit-meter'
import { FiEdit, FiLogOut, FiMenu, FiMoreVertical } from 'solid-icons/fi'
import { Transition } from 'solid-transition-group'
import { Loader } from '../../components/loader/loader'
import EditUnit from '../../components/edit-unit/edit-unit'
import Modal from '../../lib/components/modal/modal'
import Responsive from '../../lib/components/responsive/responsive'
import Dropdown from '../../lib/components/dropdown/dropdown'
import { MainMenu, MiniUnit } from './header.parts'

export const Header: Component = () => {
    return (
        <Field s h={240} pmd secondary>
            <Field col>
                <Field s col gxs>
                    <Text md res tertiary>
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
                                            <Text xs res primary>
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
                                            <EditUnit />
                                        </Modal>
                                    </Field>
                                    <AnimArray
                                        items={ds.unitsRes()}
                                        template={MiniUnit}
                                    />
                                </Field>
                            </Field>
                        </Suspense>
                    </Transition>
                </Field>
            </Field>
            <MainMenu />
        </Field>
    )
}
