import {
    Component,
    For,
    createEffect,
    createSignal,
    lazy,
    onMount,
} from 'solid-js'

import Field from '../../../lib/elements/field/field'
import Text from '../../../lib/elements/text/text'
import as from '../../../core/app-store'
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
import { BatteryLevel, ProcessorUsage, SignalStrength } from './operation.parts'
import { SectionHeader } from '../../../parts/section-header'
import { unitColors } from '../../../common/constants'
import { SvgUnitMeter } from '../../../components/svg-unit-meter/svg-unit-meter'
import { Mover } from '../../../components/mover/mover'
import Button from '../../../lib/elements/button/button'

export const Operation = () => {
    createEffect(() => {
        if (dataStore.selectedUnitRes()) {
            mds.reset()
        }
    })

    const meters = () => {
        return (
            <>
                <SignalStrength />
                <BatteryLevel />
                <ProcessorUsage />
            </>
        )
    }

    // console.log(appStore.section(), a.unit?.name)

    return (
        <Field
            a
            style={`border-left:12px solid ${
                unitColors[ds.getUnitIndex(ds.selectedUnitId())]
            }`}
            // bt={`12px solid ${
            //     unitColors[ds.getUnitIndex(ds.selectedUnitId())]
            // }`}
            // res={{
            //     bl: `12px solid ${
            //         unitColors[ds.getUnitIndex(ds.selectedUnitId())]
            //     }`,
            // }}
        >
            <Field col>
                <SectionHeader
                    title='Operation'
                    icon={<FiSettings />}
                    iconTheme='tertiary'
                />
                <Field s pwlg>
                    <Text md accent>
                        Monitoring
                    </Text>
                </Field>
                {/* <Field s w={900} h={20} pmd>
                    <SvgUnitMeter
                        scale={70}
                        value={testValue()}
                        valueColor='var(--color-accent)'
                        meterColor='var(--color-strongest)'
                    />
                </Field> */}
                <Responsive s compact={<Slider>{meters()}</Slider>}>
                    <Field s pwlg>
                        {meters()}
                    </Field>
                </Responsive>
                <Field s pwlg>
                    <Text md accent>
                        Controls
                    </Text>
                </Field>
                <Field s pwlg col>
                    <Text md primary>
                        Charge threshold
                    </Text>
                    <Mover />
                </Field>
                <Field s pwlg col gsm>
                    <Text md primary>
                        Machine control
                    </Text>
                    <Field s gmd>
                        <Button lg res={{ md: true }} secondary>
                            <Text>Reboot</Text>
                        </Button>
                        <Button lg res={{ md: true }} secondary>
                            <Text>Run diagnostics</Text>
                        </Button>
                    </Field>
                </Field>
            </Field>
        </Field>
    )
}
