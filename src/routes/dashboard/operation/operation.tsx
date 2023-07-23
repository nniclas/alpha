import { Component, For, createEffect, createSignal, lazy } from 'solid-js'

import Field from '../../../lib/elements/field/field'
import Text from '../../../lib/elements/text/text'
import appStore from '../../../core/app-store'
import dataStore from '../../../core/data-store'
import machineDataStore from '../../../core/machine-data-store'
import { FiSettings } from 'solid-icons/fi'
import { UnitMeter } from '../../../components/unit-meter/unit-meter'
import { CircularMeter } from '../../../components/circular-meter/circular-meter'
import { Unit } from 'types/entities/unit'
import { Transition } from 'solid-transition-group'
import styles from './operation.module.css'

interface Args {
    unit?: Unit
}

export const Operation = (a: Args) => {
    createEffect(() => {
        // console.log(appStore.section())
    })

    // console.log(appStore.section(), a.unit?.name)

    return (
        <Field pmd col glg>
            <Field s gsm>
                <Field s h={30} c>
                    <FiSettings size={22} color='hsl(50, 36%, 62%)' />
                </Field>
                <Text primary md>
                    Operation
                </Text>
                <Field aic>
                    <Text tertiary sm>
                        {dataStore.selectedUnit()?.name}
                    </Text>
                </Field>
            </Field>

            <Field a style={`padding:0 ${appStore.section() == 0 ? 64 : 32}px`}>
                <Field col glg>
                    <Field s col gsm>
                        <Text sm primary>
                            Signal strength
                        </Text>
                        <Field h={64}>
                            <Transition name='foo'>
                                {appStore.section() == 0 && (
                                    <UnitMeter
                                        value={machineDataStore.signalStrength()}
                                        meterColor='hsl(200, 12%, 28%)'
                                        valueColor='hsl(50, 36%, 62%)'
                                    />
                                )}
                            </Transition>
                        </Field>
                    </Field>
                    <Field s col gsm>
                        <Text sm primary>
                            Battery level
                        </Text>
                        <Field h={64}>
                            <Transition name='foo'>
                                {appStore.section() == 0 && (
                                    <UnitMeter
                                        value={machineDataStore.batteryLevel()}
                                        meterColor='hsl(200, 12%, 28%)'
                                        valueColor='hsl(50, 36%, 62%)'
                                    />
                                )}
                            </Transition>
                        </Field>
                    </Field>
                </Field>
                <Field s col gsm jcs>
                    <Text sm primary>
                        Processor usage
                    </Text>
                    <Transition name='foo'>
                        {appStore.section() == 0 && (
                            <CircularMeter
                                value={machineDataStore.processorUsage()}
                                meterColor='hsl(200, 18%, 28%)'
                                valueColor='hsl(50, 36%, 62%)'
                            />
                        )}
                    </Transition>
                </Field>
            </Field>
        </Field>
    )
}
