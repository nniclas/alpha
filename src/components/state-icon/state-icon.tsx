import { Component, For, createEffect, createSignal, lazy } from 'solid-js'
import { Outlet, useNavigate } from '@solidjs/router'

// common css resources
import '../../lib/styles/easing.css'
import '../../lib/styles/transitions.css'
import '../../lib/styles/fonts.css'
import '../../lib/styles/themes/lite.css' // todo make dynamic, // const [theme, setTheme] = createStore<String>('lite')
import Field from '../../lib/elements/field/field'
import Button from '../../lib/elements/button/button'
import Text from '../../lib/elements/text/text'
import appStore from '../../core/app-store'
import dataStore from '../../core/data-store'

import Logo from '..    /../assets/logo.svg?component-solid'
import AnimArray from '../anim-array/anim-array'
import { Unit } from '../../types/entities/unit'
import { FiZap, FiZapOff, FiTool, FiMoon, FiLoader } from 'solid-icons/fi'

interface StateIconPair {
    value: number
    icon: any
}

interface Args {
    state: number
}

export const StateIcon = (a: Args) => {
    const stateIcons: StateIconPair[] = [
        { value: 1, icon: <FiMoon color='hsl(200, 12%, 62%)' /> },
        { value: 2, icon: <FiZap color='hsl(200, 12%, 62%)' /> },
        { value: 3, icon: <FiLoader color='hsl(200, 12%, 62%)' /> },
        { value: 4, icon: <FiTool color='hsl(200, 12%, 62%)' /> },
        { value: 5, icon: <FiZapOff color='hsl(200, 12%, 62%)' /> },
    ]

    return stateIcons.find((s) => s.value == a.state)?.icon
}
