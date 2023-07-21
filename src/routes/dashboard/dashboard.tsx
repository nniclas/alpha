import { Component, For, createEffect, createSignal, lazy } from 'solid-js'

// common css resources
import '../../lib/styles/easing.css'
import '../../lib/styles/transitions.css'
import '../../lib/styles/fonts.css'
import '../../lib/styles/themes/lite.css' // todo make dynamic, // const [theme, setTheme] = createStore<String>('lite')
import Field from '../../lib/elements/field/field'
import Text from '../../lib/elements/text/text'

export const Dashboard: Component = () => {
    return (
        <Field pmd c>
            <Text md color='hsl(200, 12%, 62%)'>
                DASHBOARD
            </Text>
        </Field>
    )
}
