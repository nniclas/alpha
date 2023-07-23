import { Component, For, createEffect, createSignal, lazy } from 'solid-js'

import Field from '../../../lib/elements/field/field'
import Text from '../../../lib/elements/text/text'
import appStore from '../../../core/app-store'
import dataStore from '../../../core/data-store'
import machineDataStore from '../../../core/machine-data-store'
import { FiSettings } from 'solid-icons/fi'
import { UnitMeter } from '../../../components/unit-meter/unit-meter'

export const Operation: Component = () => {
    createEffect(() => {})

    return (
        <Field pmd col gmd>
            <Field s gsm>
                <Field s h={30} c>
                    <FiSettings size={22} color='hsl(50, 36%, 62%)' />
                </Field>
                <Text primary md>
                    Operation
                </Text>
            </Field>
            <Field col gmd>
                <Field s col gsm>
                    <Text sm primary>
                        Signal
                    </Text>
                    <UnitMeter value={machineDataStore.signalStrength()} />
                </Field>
                <Field s col gsm>
                    <Text sm primary>
                        Processor
                    </Text>
                    <UnitMeter value={machineDataStore.processorUsage()} />
                </Field>
                <Field s col gsm>
                    <Text sm primary>
                        Battery
                    </Text>
                    <UnitMeter value={machineDataStore.batteryLevel()} />
                </Field>
            </Field>
        </Field>
    )
}
