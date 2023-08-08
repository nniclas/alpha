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
        <Field>
            <Field col glg res={{ gmd: true }}>
                <SectionHeader
                    title='Operation'
                    icon={<FiSettings />}
                    iconTheme='tertiary'
                />
                <Responsive compact={<Slider>{meters()}</Slider>}>
                    <Field s col>
                        {meters()}
                    </Field>
                </Responsive>
            </Field>
        </Field>
    )
}

{
    /* <Label accent size='md' icon={<FiSettings />} iconTheme='tertiary'>
                Operation
            </Label> */
}

{
    /* <Field s gsm pmd>
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
            </Field> */
}
