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
import { createEffect, onMount } from 'solid-js'

const meterColors = {
    meterColor: 'var(--color-medium)',
    valueColor: 'var(--color-accent)',
}

const iconStyle = { size: 26, color: 'var(--color-middle)' }

export const SignalStrengthArea = () => {
    return (
        <Area header='Signal strength' secondary>
            <Field col gsm aic>
                <Field s w={200} h={24}>
                    <SvgUnitMeter
                        // scale={100}
                        value={
                            mds.data()![ds.getUnitIndex(ds.selectedUnitId())]
                                .measures[0].value
                        }
                        // value={50} ///////////////////////////////////////////////////////////
                        {...meterColors}
                    />
                </Field>
                <Field s aic gsm>
                    <Text xs>Stability</Text>
                    <Field s gxs aic>
                        <FiArrowDownRight
                            {...iconStyle}
                            color={trendColors[0]}
                        />
                        <Text lg color={trendColors[0]}>
                            {12} %
                        </Text>
                    </Field>
                </Field>
            </Field>
        </Area>
    )
}

export const BatteryLevelArea = () => {
    return (
        <Area header='Battery level' secondary>
            <Field col gsm aic>
                <Field s w={200} h={24}>
                    <SvgUnitMeter
                        // value={mds.batteryLevel()}
                        value={
                            mds.data()![ds.getUnitIndex(ds.selectedUnitId())]
                                .measures[1].value
                        }
                        // value={50} ///////////////////////////////////////////////////////////
                        {...meterColors}
                    />
                </Field>
                <Field s aic gsm>
                    <Text xs>Recharge frequency</Text>
                    <Field s gxs aic>
                        <FiArrowUpRight {...iconStyle} color={trendColors[2]} />
                        <Text lg color={trendColors[2]}>
                            {27} %
                        </Text>
                    </Field>
                </Field>
            </Field>
        </Area>
    )
}

export const ProcessorUsageArea = () => {
    return (
        <Area header='Processor usage' secondary>
            <Field col gsm aic>
                <Field s h={24} w={200}>
                    <SvgUnitMeter
                        // value={mds.processorUsage()}
                        value={
                            mds.data()![ds.getUnitIndex(ds.selectedUnitId())]
                                .measures[2].value
                        }
                        // value={50} ///////////////////////////////////////////////////////////
                        {...meterColors}
                    />
                </Field>
                <Field s aic gsm>
                    <Text xs>Average load</Text>
                    <Field s aic gxs>
                        <FiArrowRight {...iconStyle} color={trendColors[1]} />
                        <Text lg color={trendColors[1]}>
                            {4} %
                        </Text>
                    </Field>
                </Field>
            </Field>
        </Area>
    )
}

export const ChargeControlArea = () => {
    return (
        <Area header='Charge threshold' secondary>
            <Field col gsm pwmd>
                <Mover />
            </Field>
        </Area>
    )
}

export const MachineControlArea = () => {
    return (
        <Area header='Machine control' secondary>
            <Field s style='gap:4px'>
                <Button w={160} h={60} md res={{ w: 120 }} primary>
                    <Text>Reboot</Text>
                </Button>
                <Button w={160} h={60} md res={{ w: 120 }} primary>
                    <Text>Run diagnostics</Text>
                </Button>
            </Field>
        </Area>
    )
}
