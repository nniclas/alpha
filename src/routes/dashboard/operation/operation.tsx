import {
    Component,
    For,
    createEffect,
    createSignal,
    lazy,
    onCleanup,
    onMount,
} from 'solid-js'

import Field from '../../../lib/elements/field/field'
import Text from '../../../lib/elements/text/text'
import as from '../../../core/app-store'
import ds from '../../../core/data-store'
import mds from '../../../core/machine-data-store'
import { FiSettings, FiSunrise } from 'solid-icons/fi'

import {
    BatteryLevelArea,
    ChargeControlArea,
    MachineControlArea,
    ProcessorUsageArea,
    SignalStrengthArea,
} from './operation.parts'
import { SectionHeader } from '../../../parts/section-header/section-header'

import { Container } from '../../../components/area/container'
import { isCompact } from '../../../lib/utils'

export const Operation = () => {
    let container: any

    createEffect(() => {
        if (ds.selectedUnitRes()) {
            mds.reset()
        }

        if (as.section()) {
            container.scrollTo({
                top: 0,
                behavior: 'smooth',
            })
        }
    })

    const scrollHandler = (e: Event) => {
        if (isCompact() && as.section() != 'operation') container.scrollTop = 0
    }

    onMount(() => container.addEventListener('scroll', scrollHandler))
    onCleanup(() => container.removeEventListener('resize', scrollHandler))

    return (
        <Field rel a>
            <Field
                col
                ref={container}
                style={`overflow:scroll`}
                // res={{
                //     style: `overflow:${
                //         as.section() == 'operation' ? 'scroll' : 'visible'
                //     }`,
                // }}
            >
                <SectionHeader
                    title='Operation'
                    icon={<FiSettings />}
                    iconTheme='tertiary'
                    click={() => as.setSection('operation')}
                />

                <Field s pwmd>
                    <Text md accent>
                        Monitoring
                    </Text>
                </Field>
                <Container>
                    <SignalStrengthArea />
                    <BatteryLevelArea />
                    <ProcessorUsageArea />
                </Container>
                <Field s pwmd>
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
