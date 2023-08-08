import Field from '../../../lib/elements/field/field'
import Text from '../../../lib/elements/text/text'
import as from '../../../core/app-store'
import ds from '../../../core/data-store'
import mds from '../../../core/machine-data-store'
import { UnitMeter } from '../../../components/unit-meter/unit-meter'
import { CircularMeter } from '../../../components/circular-meter/circular-meter'
import { Transition } from 'solid-transition-group'
import styles from './operation.module.css'

import Responsive from '../../../lib/components/responsive/responsive'

export const SignalStrength = () => {
    return (
        <Field col gmd p='0 128px' res={{ p: '0 32px' }}>
            <Field s col gsm res>
                <Text sm res primary>
                    Signal strength
                </Text>
                <Field s h={48}>
                    <Transition name='foo'>
                        <Responsive
                            compact={
                                <UnitMeter
                                    scale={10}
                                    value={mds.signalStrength()}
                                    meterColor='hsl(200, 12%, 28%)'
                                    valueColor='hsl(50, 36%, 62%)'
                                />
                            }
                            addRule={as.section() != 'operation'}
                        >
                            <UnitMeter
                                value={mds.signalStrength()}
                                meterColor='hsl(200, 12%, 28%)'
                                valueColor='hsl(50, 36%, 62%)'
                            />
                        </Responsive>
                    </Transition>
                </Field>
            </Field>
        </Field>
    )
}

export const BatteryLevel = () => {
    return (
        <Field col gsm p='0 128px' res={{ p: '0 32px' }}>
            <Text sm res primary>
                Battery level
            </Text>
            <Field s h={48}>
                <Transition name='foo'>
                    <Responsive
                        compact={
                            <UnitMeter
                                scale={10}
                                value={mds.batteryLevel()}
                                meterColor='hsl(200, 12%, 28%)'
                                valueColor='hsl(50, 36%, 62%)'
                            />
                        }
                        addRule={as.section() != 'operation'}
                    >
                        <UnitMeter
                            value={mds.batteryLevel()}
                            meterColor='hsl(200, 12%, 28%)'
                            valueColor='hsl(50, 36%, 62%)'
                        />
                    </Responsive>
                </Transition>
            </Field>
        </Field>
    )
}

export const ProcessorUsage = () => {
    return (
        <Field col gsm p='0 128px' res={{ p: '0 32px' }}>
            <Text sm res primary>
                Processor usage
            </Text>
            <Transition name='foo'>
                <Responsive
                    compact={
                        <UnitMeter
                            scale={10}
                            value={mds.processorUsage()}
                            meterColor='hsl(200, 12%, 28%)'
                            valueColor='hsl(50, 36%, 62%)'
                        />
                    }
                    addRule={
                        as.section() != 'operation' || !ds.selectedUnitRes()
                    }
                >
                    <CircularMeter
                        value={mds.processorUsage()}
                        meterColor='hsl(200, 18%, 28%)'
                        valueColor='hsl(50, 36%, 62%)'
                    />
                </Responsive>
            </Transition>
        </Field>
    )
}
