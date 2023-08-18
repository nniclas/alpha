import { Component, For, createEffect, createSignal, lazy } from 'solid-js'

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

export const Operation = () => {
    const [testValue, setTestValue] = createSignal<number>(0)

    createEffect(() => {
        if (dataStore.selectedUnitRes()) {
            mds.reset()
        }

        setTimeout(() => {
            setTestValue(31)
        }, 1000)

        setTimeout(() => {
            setTestValue(96)
        }, 2000)

        setTimeout(() => {
            setTestValue(19)
        }, 3000)
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
            <Field col glg res={{ gmd: true }}>
                <SectionHeader
                    title='Operation'
                    icon={<FiSettings />}
                    iconTheme='tertiary'
                />
                <Field s w={900} h={20} pmd>
                    <SvgUnitMeter
                        scale={40}
                        value={testValue()}
                        valueColor='var(--color-accent)'
                        meterColor='var(--color-strongest)'
                    />
                </Field>
                {/* <Responsive compact={<Slider>{meters()}</Slider>}>
                    <Field s col plg>
                        {meters()}
                    </Field>
                </Responsive> */}
            </Field>
        </Field>
    )
}
