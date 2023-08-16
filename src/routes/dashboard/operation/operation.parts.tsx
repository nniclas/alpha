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

const meterColors = {
    meterColor: 'var(--color-strongest)',
    valueColor: 'var(--color-accent)',
}

export const SignalStrength = () => {
    return (
        <Field res={{ c: true }}>
            <Field s col gsm>
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
                                    {...meterColors}
                                />
                            }
                            addRule={as.section() != 'operation'}
                        >
                            <UnitMeter
                                value={mds.signalStrength()}
                                {...meterColors}
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
        <Field res={{ c: true }}>
            <Field s col gsm>
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
                                    {...meterColors}
                                />
                            }
                            addRule={as.section() != 'operation'}
                        >
                            <UnitMeter
                                value={mds.batteryLevel()}
                                {...meterColors}
                            />
                        </Responsive>
                    </Transition>
                </Field>
            </Field>
        </Field>
    )
}

export const ProcessorUsage = () => {
    return (
        <Field res={{ c: true }}>
            <Field s col gsm>
                <Text sm res primary>
                    Processor usage
                </Text>

                <Transition name='foo'>
                    <Responsive
                        compact={
                            <Field s h={48}>
                                <UnitMeter
                                    scale={10}
                                    value={mds.processorUsage()}
                                    {...meterColors}
                                />
                            </Field>
                        }
                        addRule={
                            as.section() != 'operation' || !ds.selectedUnitRes()
                        }
                    >
                        <CircularMeter
                            value={mds.processorUsage()}
                            {...meterColors}
                        />
                    </Responsive>
                </Transition>
            </Field>
        </Field>
    )
}
