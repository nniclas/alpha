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

interface Args {
    value: number
}

export const UnitMeter = (a: Args) => {
    return (
        <Field style='gap:4px'>
            <For
                each={Array(Math.round(a.value / 10))
                    .fill(0)
                    .map((v) => v)}
            >
                {(v, i) => <Field s w={4} h={8} tertiary></Field>}
            </For>
        </Field>
    )
}
