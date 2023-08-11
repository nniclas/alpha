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
import {
    FiAlertCircle,
    FiAlertTriangle,
    FiEdit,
    FiLogOut,
    FiMenu,
    FiMoreVertical,
    FiSearch,
} from 'solid-icons/fi'
import { Transition } from 'solid-transition-group'
import { Loader } from '../../components/loader/loader'
import EditUnit from '../../components/edit-unit/edit-unit'
import Modal from '../../lib/components/modal/modal'
import Responsive from '../../lib/components/responsive/responsive'
import Dropdown from '../../lib/components/dropdown/dropdown'
import { MainMenu, MiniUnit } from './header.parts'
import { Slider } from '../../lib/components/slider/slider'
import { SectionHeader } from '../../parts/section-header'

const iconStyle = { size: 18, color: 'hsl(50, 36%, 62%)' }

export const Header: Component = () => {
    const units = () => {
        return ds.unitsRes()?.map((u) => <MiniUnit u={u} />)

        // return <For each={ds.unitsRes()}>{(u, i) => <MiniUnit u={u} />}</For>
    }
    return (
        <Field s h={260} secondary>
            <Field col>
                <Responsive
                    s
                    compact={
                        <SectionHeader
                            title='Some'
                            iconTheme='accent'
                            tool={<MainMenu />}
                            icon={<FiAlertTriangle />}
                        />
                    }
                >
                    <SectionHeader
                        title='Some'
                        aux={
                            <Text xs>
                                Some units are offline, check status.
                            </Text>
                        }
                        iconTheme='accent'
                        tool={<MainMenu />}
                        icon={<FiAlertTriangle />}
                    />
                </Responsive>

                {/* <Field s col gxs>
                    <Text md res tertiary>
                        Units
                    </Text>
                </Field> */}
                <Field rel>
                    <Transition name='fade'>
                        <Suspense
                            fallback={
                                <Field a layer c style='pointer-events:none'>
                                    <Loader />
                                </Field>
                            }
                        >
                            <Field layer col>
                                {/* {ds.unitsRes() && ds.unitsRes()?.length && (
                                    <Field s gsm aic psm>
                                        <Field s jcc>
                                            <FiAlertTriangle {...iconStyle} />
                                        </Field>
                                        <Field s>
                                            <Text xs res primary>
                                                Some units are offline, check
                                                status.
                                            </Text>
                                        </Field>
                                    </Field>
                                )} */}

                                <Responsive
                                    compact={
                                        <Field psm>
                                            <Slider>{units()}</Slider>
                                        </Field>
                                    }
                                >
                                    <Field p='32px 64px' s gxs>
                                        {units()}
                                    </Field>
                                </Responsive>

                                {/* <Field s>
                                    <Field s c psm>
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
                                    {units}

                                   
                                </Field> */}
                                {/* <AnimArray
                                        items={ds.unitsRes()}
                                        template={MiniUnit}
                                    /> */}
                            </Field>
                        </Suspense>
                    </Transition>
                </Field>
            </Field>
            {/* <MainMenu /> */}
        </Field>
    )
}
