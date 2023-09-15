import { Component, For, createEffect, createSignal, lazy } from 'solid-js'

// common css resources
import Field from '../../lib/elements/field/field'
import Text from '../../lib/elements/text/text'

export const Footer: Component = () => {
    return (
        <Field pmd secondary>
            <Text md color='var(--color-middle)'>
                <Field aic>
                    <Text xs accent>
                        {'Some units are offline, check status.'}
                    </Text>
                </Field>
            </Text>
        </Field>
    )
}
