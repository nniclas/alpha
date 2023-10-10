import { Component, For, Suspense, createEffect, createSignal } from 'solid-js'
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
} from 'solid-icons/fi'
import { Transition } from 'solid-transition-group'
import { Loader } from '../../components/loader/loader'
import Modal from '../../lib/components/modal/modal'
import Responsive from '../../lib/components/responsive/responsive'
import Dropdown from '../../lib/components/dropdown/dropdown'
import { Slider } from '../../lib/components/slider/slider'
import { Label } from '../../lib/components/label/label'
import { BaseArgs } from '../../lib/types/base-args'
import { FieldArgs } from '../../lib/types/field-args'
import { unitColors } from '../../common/constants'
import styles from './section-header.module.css'

interface Args {
    title: string
    // titleTheme?: string
    titleColor?: string
    icon?: any
    iconTheme?: string
    aux?: any
    tool?: any
    // color?: string

    click?: () => void
}

export const SectionHeader = (a: Args & FieldArgs) => {
    // const titleTheme = a.titleTheme && { titleTheme: a.titleTheme }
    const titleColor = a.titleColor && { color: a.titleColor }
    const icon = a.icon && { icon: a.icon }
    const iconTheme = a.iconTheme && { iconTheme: a.iconTheme }

    const click = a.click && {
        onclick: a.click,
        class: styles.clicker,
    }

    return (
        <Field
            a
            s
            h={80}
            res={{ h: 60, ...a }}
            {...a}
            // style={`border-top: 12px solid ${a.color}`}
        >
            <Field {...click}>
                <Label
                    size='md'
                    // {...titleTheme}
                    {...titleColor}
                    {...icon}
                    {...iconTheme}
                >
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
