import {
    Component,
    For,
    Suspense,
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
import { Transition } from 'solid-transition-group'
import { Loader } from '../../../components/loader/loader'

declare var global: any

export const Operation = () => {
    let container: any

    createEffect(() => {
        if (ds.selectedUnitRes()) {
            mds.start()
            // console.log('start?')
        }

        if (as.section()) {
            container?.scrollTo({
                top: 0,
                behavior: 'smooth',
            })
        }
    })

    const scrollHandler = (e: Event) => {
        if (isCompact() && as.section() != 'operation' && container)
            container.scrollTop = 0
    }

    onMount(() => container?.addEventListener('scroll', scrollHandler))
    onCleanup(() => container?.removeEventListener('resize', scrollHandler))

    return (
        <Field rel>
            <Transition name='fade'>
                <Suspense
                    fallback={
                        <Field a layer c style='pointer-events:none'>
                            <Loader />
                        </Field>
                    }
                >
                    <Field rel a secondary>
                        <Field col ref={container} style={`overflow:scroll`}>
                            <SectionHeader
                                title='Operation'
                                icon={<FiSettings />}
                                iconTheme='tertiary'
                                click={() => as.setSection('operation')}
                            />

                            <Field s pwmd>
                                <Text md accent>
                                    Monitoring - {ds.selectedUnitRes()?.name}
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
                </Suspense>
            </Transition>
        </Field>
    )
}
