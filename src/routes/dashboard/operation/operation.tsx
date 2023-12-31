import { Suspense, createEffect, onCleanup, onMount } from 'solid-js'
import Field from '../../../lib/elements/field/field'
import Text from '../../../lib/elements/text/text'
import as from '../../../core/app-store'
import ds from '../../../core/data-store'
import mds from '../../../core/machine-data-store'
import { FiMonitor } from 'solid-icons/fi'
import { Container } from '../../../components/area/container'
import { isCompact } from '../../../lib/utils'
import { Transition } from 'solid-transition-group'
import { Loader } from '../../../components/loader/loader'
import {
    getSignalStrength,
    getBatteryLevel,
    getProcessorUsage,
} from '../../../core/machine-readers'
import {
    BatteryLevelArea,
    ChargeControlArea,
    MachineControlArea,
    ProcessorUsageArea,
    SignalStrengthArea,
} from './operation.parts'
import { Section } from 'types/_types'
import { stats } from '../../../common/constants'
import styles from '../../../common/common.module.css'

const iconStyle = { size: 18, color: 'var(--color-middle)' }
const readers = [getSignalStrength, getBatteryLevel, getProcessorUsage]

interface Args {
    section: Section
}

const initMds = () => {
    mds.initialize(ds.unitsRes()!.length, stats.machine, readers)
}

export const Operation = (a: Args) => {
    let container: any

    onMount(() => {
        // initialize machine units with readers
        if (ds.selectedUnitRes()) {
            initMds()
        }
    })

    // switch read machine when changing unit
    createEffect(() => {
        if (ds.selectedUnitRes()) {
            mds.readUnit(ds.getUnitIndex(ds.selectedUnitId()))
        }
    })

    createEffect(() => {
        if (
            ds.selectedUnitRes() &&
            ds.unitsRes()?.length != mds.data()?.length
        ) {
            initMds()
        }
    })

    createEffect(() => {
        if (isCompact() && as.section() != a.section && container)
            container.scrollTop = 0
    })

    const scrollHandler = (e: Event) => {
        if (isCompact() && as.section() != a.section && container)
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
                    {mds.loadedRes() && (
                        <Field rel a tertiary>
                            <Field
                                col
                                ref={container}
                                style={`overflow:scroll`}
                            >
                                <Field
                                    aic
                                    s
                                    jcs
                                    h={80}
                                    res={{ h: 60 }}
                                    onClick={() => {
                                        as.setSection(a.section)
                                        as.setShowCharts(false)
                                    }}
                                    class={styles.sectionheader}
                                >
                                    <Field
                                        s
                                        w={80}
                                        h={80}
                                        c
                                        res={{ w: 60, h: 60 }}
                                    >
                                        <FiMonitor {...iconStyle} />
                                    </Field>
                                    <Text res title>
                                        Operation
                                    </Text>
                                </Field>

                                <Field s pwmd gmd>
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
                    )}
                </Suspense>
            </Transition>
        </Field>
    )
}
