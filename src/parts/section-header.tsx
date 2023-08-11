import { Component, For, Suspense } from 'solid-js'
import { useNavigate } from '@solidjs/router'

import Field from '../lib/elements/field/field'
import Button from '../lib/elements/button/button'
import Text from '../lib/elements/text/text'
import appStore from '../core/app-store'
import ds from '../core/data-store'

import Logo from '../../assets/logo.svg?component-solid'
import AnimArray from '../components/anim-array/anim-array'
import { Unit } from '../types/entities/unit'
import { UnitStateIcon } from '../components/unit-state-icon/unit-state-icon'
import { UnitMeter } from '../components/unit-meter/unit-meter'
import {
    FiAlertCircle,
    FiAlertTriangle,
    FiEdit,
    FiLogOut,
    FiMenu,
    FiMoreVertical,
} from 'solid-icons/fi'
import { Transition } from 'solid-transition-group'
import { Loader } from '../components/loader/loader'
import EditUnit from '../components/edit-unit/edit-unit'
import Modal from '../lib/components/modal/modal'
import Responsive from '../lib/components/responsive/responsive'
import Dropdown from '../lib/components/dropdown/dropdown'
import { Slider } from '../lib/components/slider/slider'
import { Label } from '../lib/components/label/label'

const iconStyle = { size: 18, color: 'hsl(50, 36%, 62%)' }

interface Args {
    title: string
    icon?: any
    iconTheme?: string
    aux?: any
    tool?: any
}

export const SectionHeader = (a: Args) => {
    const icon = a.icon && { icon: a.icon }
    const iconTheme = a.iconTheme && { iconTheme: a.iconTheme }

    return (
        <Field s h={80}>
            <Field>
                <Label accent size='md' {...icon} {...iconTheme}>
                    {a.title}
                </Label>
                <Field s c>
                    {a.aux}
                </Field>
            </Field>
            <Field s>{a.tool}</Field>
        </Field>
    )
}
