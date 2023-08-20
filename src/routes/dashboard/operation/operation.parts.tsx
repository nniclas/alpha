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
import { Area } from '../../../components/area/area'
import { Mover } from '../../../components/mover/mover'
import Button from '../../../lib/elements/button/button'

const meterColors = {
    meterColor: 'var(--color-strongest)',
    valueColor: 'var(--color-accent)',
}

const iconStyle = { size: 32, color: 'var(--color-accent)' }

export const SignalStrengthArea = () => {
    return (
        <Area header='Signal strength'>
            <Field col gsm>
                <Field s aic gsm>
                    <Text xs accent>
                        Stability
                    </Text>
                    <FiArrowDownRight {...iconStyle} color={trendColors[0]} />
                    <Text lg color={trendColors[0]}>
                        {12} %
                    </Text>
                </Field>
                <Field s w={320} h={64}>
                    <SvgUnitMeter
                        scale={50}
                        value={mds.signalStrength()}
                        {...meterColors}
                    />
                </Field>
            </Field>
        </Area>
    )
}

export const BatteryLevelArea = () => {
    return (
        <Area header='Battery level'>
            <Field col gsm>
                <Field s aic gsm col>
                    <Text xs accent>
                        Recharge frequency
                    </Text>
                    <Field s>
                        <FiArrowUpRight {...iconStyle} color={trendColors[2]} />
                        <Text lg color={trendColors[2]}>
                            {27} %
                        </Text>
                    </Field>
                </Field>
                <Field s w={320} h={64}>
                    <SvgUnitMeter
                        scale={58}
                        value={mds.batteryLevel()}
                        {...meterColors}
                    />
                </Field>
            </Field>
        </Area>
    )
}

export const ProcessorUsageArea = () => {
    return (
        <Area header='Processor usage'>
            <Field col gsm>
                <Field s aic gsm>
                    <Text xs accent>
                        Average load
                    </Text>
                    <FiArrowRight {...iconStyle} color={trendColors[1]} />
                    <Text lg color={trendColors[1]}>
                        {4} %
                    </Text>
                </Field>
                <Field s w={320} h={64}>
                    <SvgUnitMeter
                        scale={50}
                        value={mds.processorUsage()}
                        {...meterColors}
                    />
                </Field>
            </Field>
        </Area>
    )
}

export const ChargeControlArea = () => {
    return (
        <Area header='Charge threshold'>
            <Field col gsm>
                <Mover />
            </Field>
        </Area>
    )
}

export const MachineControlArea = () => {
    return (
        <Area header='Machine control'>
            <Field s gmd>
                <Button lg res={{ md: true }} secondary>
                    <Text>Reboot</Text>
                </Button>
                <Button lg res={{ md: true }} secondary>
                    <Text>Run diagnostics</Text>
                </Button>
            </Field>
        </Area>
    )
}
