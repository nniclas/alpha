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
import {
    BatteryLevelArea,
    ChargeControlArea,
    MachineControlArea,
    ProcessorUsageArea,
    SignalStrengthArea,
} from './operation.parts'
import { SectionHeader } from '../../../parts/section-header'
import { unitColors } from '../../../common/constants'
import { SvgUnitMeter } from '../../../components/svg-unit-meter/svg-unit-meter'
import { Mover } from '../../../components/mover/mover'
import Button from '../../../lib/elements/button/button'
import { Container } from '../../../components/area/container'

export const Operation = () => {
    createEffect(() => {
        if (dataStore.selectedUnitRes()) {
            mds.reset()
        }
    })

    // const meters = () => {
    //     return (
    //         <>
    //             <SignalStrength />
    //             <BatteryLevel />
    //             <ProcessorUsage />
    //         </>
    //     )
    // }

    // console.log(appStore.section(), a.unit?.name)

    return (
        <Field
            rel
            a
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
                <Field layer col style='pointer-events:none'>
                    <Responsive
                        compact={
                            <div
                                style={`transition:.4s ease border; flex:1; border-left:12px solid ${
                                    unitColors[
                                        ds.getUnitIndex(ds.selectedUnitId())
                                    ]
                                }`}
                            ></div>
                        }
                    >
                        <div
                            style={`transition:.4s ease border; flex:1; border-top:12px solid ${
                                unitColors[ds.getUnitIndex(ds.selectedUnitId())]
                            }`}
                        ></div>
                    </Responsive>
                </Field>

                <SectionHeader
                    title='Operation'
                    icon={<FiSettings />}
                    iconTheme='tertiary'
                />

                <Field s pwmd res={{ pwsm: true }}>
                    <Text md accent>
                        Monitoring
                    </Text>
                </Field>
                <Container>
                    <SignalStrengthArea />
                    <BatteryLevelArea />
                    <ProcessorUsageArea />
                </Container>
                <Field s pwmd res={{ pwsm: true }}>
                    <Text md accent>
                        Controls
                    </Text>
                </Field>
                <Container>
                    <ChargeControlArea />
                    <MachineControlArea />
                </Container>
            </Field>
        </Field>
    )
}
