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
import { SvgUnitMeter } from '../../../components/svg-unit-meter/svg-unit-meter'
import { trendColors } from '../../../common/constants'
import { FiArrowDownRight, FiArrowRight, FiArrowUpRight } from 'solid-icons/fi'

const meterColors = {
    meterColor: 'var(--color-strongest)',
    valueColor: 'var(--color-accent)',
}

const iconStyle = { size: 32, color: 'var(--color-accent)' }

export const SignalStrength = () => {
    return (
        <Field s res={{ c: true }}>
            <Field s col gsm>
                <Text md res primary>
                    Signal strength
                </Text>
                <Field s aic gsm>
                    <Text xs accent>
                        Stability
                    </Text>
                    <FiArrowDownRight {...iconStyle} color={trendColors[0]} />
                    <Text lg color={trendColors[0]}>
                        {12} %
                    </Text>
                </Field>
                <Field s>
                    <Transition name='foo'>
                        <Field s w={320} h={64}>
                            <SvgUnitMeter
                                scale={70}
                                value={mds.signalStrength()}
                                valueColor='var(--color-accent)'
                                meterColor='var(--color-strongest)'
                            />
                        </Field>
                        {/* <Responsive
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
                        </Responsive> */}
                    </Transition>
                </Field>
            </Field>
        </Field>
    )
}

export const BatteryLevel = () => {
    return (
        <Field s res={{ c: true }}>
            <Field s col gsm>
                <Text md res primary>
                    Battery level
                </Text>
                <Field s aic gsm>
                    <Text xs accent>
                        Recharge frequency
                    </Text>
                    <FiArrowUpRight {...iconStyle} color={trendColors[2]} />
                    <Text lg color={trendColors[2]}>
                        {12} %
                    </Text>
                </Field>
                <Field s h={48}>
                    <Transition name='foo'>
                        <Field s w={320} h={64}>
                            <SvgUnitMeter
                                scale={70}
                                value={mds.batteryLevel()}
                                valueColor='var(--color-accent)'
                                meterColor='var(--color-strongest)'
                            />
                        </Field>
                        {/* <Responsive
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
                        </Responsive> */}
                    </Transition>
                </Field>
            </Field>
        </Field>
    )
}

export const ProcessorUsage = () => {
    return (
        <Field s res={{ c: true }}>
            <Field s col gsm>
                <Text md res primary>
                    Processor usage
                </Text>
                <Field s aic gsm>
                    <Text xs accent>
                        Average load
                    </Text>
                    <FiArrowRight {...iconStyle} color={trendColors[1]} />
                    <Text lg color={trendColors[1]}>
                        {4} %
                    </Text>
                </Field>
                <Transition name='foo'>
                    <Responsive
                        compact={
                            <Field s w={320} h={20} pmd>
                                <SvgUnitMeter
                                    scale={20}
                                    value={mds.batteryLevel()}
                                    valueColor='var(--color-accent)'
                                    meterColor='var(--color-strongest)'
                                />
                            </Field>
                            // <Field s h={48}>
                            //     <UnitMeter
                            //         scale={10}
                            //         value={mds.processorUsage()}
                            //         {...meterColors}
                            //     />
                            // </Field>
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
