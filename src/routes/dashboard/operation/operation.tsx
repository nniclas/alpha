import { Component, For, createEffect, createSignal, lazy } from 'solid-js'

import Field from '../../../lib/elements/field/field'
import Text from '../../../lib/elements/text/text'
import appStore from '../../../core/app-store'
import ds from '../../../core/data-store'
import mds from '../../../core/machine-data-store'
import { FiSettings, FiSunrise } from 'solid-icons/fi'
import { UnitMeter } from '../../../components/unit-meter/unit-meter'
import { CircularMeter } from '../../../components/circular-meter/circular-meter'
import { Unit } from 'types/entities/unit'
import { Transition } from 'solid-transition-group'
import styles from './operation.module.css'
import dataStore from '../../../core/data-store'
import { isCompact } from '../../../lib/utils'
import Responsive from '../../../lib/components/responsive/responsive'
import { Slider } from '../../../lib/components/slider/slider'
import { Label } from '../../../lib/components/label/label'

interface Args {
    unit?: Unit
}

export const Operation = (a: Args) => {
    createEffect(() => {
        if (dataStore.selectedUnitRes()) {
            mds.reset()
        }
    })

    // console.log(appStore.section(), a.unit?.name)

    return (
        <Field col glg res={{ gmd: true }}>
            <Label accent size='md' icon={<FiSunrise />} iconTheme='secondary'>
                Operation
            </Label>
            {/* <Field s gsm pmd>
                <Field s c>
                    <FiSettings size={22} color='hsl(50, 36%, 62%)' />
                </Field>
                <Text md res primary>
                    Operation
                </Text>
                <Field aic>
                    <Text sm res tertiary>
                        {ds.selectedUnitRes()?.name}
                    </Text>
                </Field>
            </Field> */}

            <Field gmd a style={`padding:0 0px`}>
                <Slider>
                    <Field aic col gmd>
                        <Field s col gsm>
                            <Text sm res primary>
                                Signal strength
                            </Text>
                            <Field>
                                <Transition name='foo'>
                                    {appStore.section() == 'operation' && (
                                        <Responsive
                                            compact={
                                                <UnitMeter
                                                    scale={10}
                                                    value={mds.signalStrength()}
                                                    meterColor='hsl(200, 12%, 28%)'
                                                    valueColor='hsl(50, 36%, 62%)'
                                                />
                                            }
                                        >
                                            <UnitMeter
                                                value={mds.signalStrength()}
                                                meterColor='hsl(200, 12%, 28%)'
                                                valueColor='hsl(50, 36%, 62%)'
                                            />
                                        </Responsive>
                                    )}
                                </Transition>
                            </Field>
                        </Field>
                        <Field s col gsm>
                            <Text sm res primary>
                                Battery level
                            </Text>
                            <Field>
                                <Transition name='foo'>
                                    {appStore.section() == 'operation' && (
                                        <Responsive
                                            compact={
                                                <UnitMeter
                                                    scale={10}
                                                    value={mds.batteryLevel()}
                                                    meterColor='hsl(200, 12%, 28%)'
                                                    valueColor='hsl(50, 36%, 62%)'
                                                />
                                            }
                                        >
                                            <UnitMeter
                                                value={mds.batteryLevel()}
                                                meterColor='hsl(200, 12%, 28%)'
                                                valueColor='hsl(50, 36%, 62%)'
                                            />
                                        </Responsive>
                                    )}
                                </Transition>
                            </Field>
                        </Field>
                    </Field>
                    <Field c col gsm jcs>
                        <Text sm res primary>
                            Processor usage
                        </Text>
                        <Transition name='foo'>
                            {appStore.section() == 'operation' &&
                                ds.selectedUnitRes() && (
                                    <CircularMeter
                                        value={mds.processorUsage()}
                                        meterColor='hsl(200, 18%, 28%)'
                                        valueColor='hsl(50, 36%, 62%)'
                                    />
                                )}
                        </Transition>
                    </Field>
                    <Field c col gsm jcs>
                        <Text sm res primary>
                            Processor usage
                        </Text>
                        <Transition name='foo'>
                            {appStore.section() == 'operation' &&
                                ds.selectedUnitRes() && (
                                    <CircularMeter
                                        value={mds.processorUsage()}
                                        meterColor='hsl(200, 18%, 28%)'
                                        valueColor='hsl(50, 36%, 62%)'
                                    />
                                )}
                        </Transition>
                    </Field>
                </Slider>
            </Field>
        </Field>
    )
}
