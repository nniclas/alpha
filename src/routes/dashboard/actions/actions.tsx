import { Component, For, createEffect, createSignal, lazy } from 'solid-js'

import Field from '../../../lib/elements/field/field'
import Text from '../../../lib/elements/text/text'
import appStore from '../../../core/app-store'
import dataStore from '../../../core/data-store'
import { FiSettings, FiZap } from 'solid-icons/fi'

export const Actions: Component = () => {
    createEffect(() => {})

    return (
        <Field focus pmd>
            <Field s gsm>
                <Field s h={30} c>
                    <FiZap size={22} color='hsl(50, 36%, 62%)' />
                </Field>
                <Text primary md>
                    Actions
                </Text>
            </Field>
        </Field>
    )
}
