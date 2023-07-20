import { Component, For, createEffect, createSignal, lazy } from 'solid-js'

// common css resources
import '../../lib/styles/easing.css'
import '../../lib/styles/transitions.css'
import '../../lib/styles/fonts.css'
import '../../lib/styles/themes/lite.css' // todo make dynamic, // const [theme, setTheme] = createStore<String>('lite')
import Field from '../../lib/elements/field/field'

export const Dashboard: Component = () => {
    return <Field>dashboard page</Field>
}
