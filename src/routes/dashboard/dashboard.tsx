import { Component, For, createEffect, createSignal, lazy } from 'solid-js'

// common css resources
import '../../lib/styles/easing.css'
import '../../lib/styles/transitions.css'
import '../../lib/styles/fonts.css'
import '../../lib/styles/themes/lite.css' // todo make dynamic, // const [theme, setTheme] = createStore<String>('lite')
import Field from '../../lib/elements/field/field'
import Text from '../../lib/elements/text/text'
import appStore from '../../core/app-store'
import dataStore from '../../core/data-store'

export const Dashboard: Component = () => {
    createEffect(() => {
        dataStore.getUnits()

        // setShow(true)
    })

    return (
        <Field pmd c>
            {/* <Text md color='hsl(200, 12%, 62%)'>
                DASHBOARD
            </Text> */}
            <Field s>
                <Text lg tertiary>
                    {dataStore.units().length}
                </Text>
            </Field>
        </Field>
    )
}
