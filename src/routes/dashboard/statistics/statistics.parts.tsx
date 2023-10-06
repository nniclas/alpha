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
import { FiMessageCircle, FiPlay, FiTag, FiUser } from 'solid-icons/fi'
import { Entry } from '../../../types/entities/entry'
import { EventIcon } from '../../../components/event-icon/event-icon'
import styles from './events.parts.module.css'
import Responsive from '../../../lib/components/responsive/responsive'
import as from '../../../core/app-store'
import { Transition } from 'solid-transition-group'
import { date } from '../../../common/date-utils'
import Modal from '../../../lib/components/modal/modal'
import { Label } from '../../../lib/components/label/label'
import Dropdown from '../../../lib/components/dropdown/dropdown'
import { measures, statResolutions } from '../../../common/constants'
import { SliderButton } from '../../../components/slider-button/slider-button'
import { LineChart } from '../../../components/line-chart/line-chart'
import ds from '../../../core/data-store'
import { BarChart } from '../../../components/bar-chart/bar-chart'

export const MachineChartArea = () => {
    const [chartData, setChartData] = createSignal<number[]>()

    let data: number[]

    onMount(async () => {})

    createEffect(() => {
        const batteryData = ds.machineStatsRes()['Battery']?.data

        if (batteryData) {
            data = batteryData
        }

        setChartData(data)
    })

    const elements: string[] = ['foo', 'bar']

    return (
        <Field col>
            <Field s pwlg col gsm>
                <SliderButton
                    w={80}
                    h={40}
                    value={elements.indexOf(
                        ds.selectedMachineStatisticsElement() || ''
                    )}
                    change={(v) => {
                        ds.setSelectedMachineStatisticsElement(elements[v])
                    }}
                    values={elements}
                />
                <SliderButton
                    w={80}
                    h={40}
                    value={statResolutions.indexOf(
                        ds.selectedMachineStatisticsResolution()
                    )}
                    change={(v) => {
                        ds.setSelectedMachineStatisticsResolution(
                            statResolutions[v]
                        )
                    }}
                    values={statResolutions}
                />
            </Field>
            <LineChart
                visible={as.showCharts()}
                data={chartData()}
                scale={{ min: 0, max: 150 }}
                areaColor='var(--color-middle)'
            />
        </Field>
    )
}

export const EventsChartArea = () => {
    const [chartData, setChartData] = createSignal<number[]>()

    let data: number[]
    onMount(async () => {})

    createEffect(async () => {
        const d = await ds.entryStatsRes().data
        if (d) data = d
        setChartData(data)
    })

    return (
        <Field col>
            <Field s pwlg col>
                <SliderButton
                    w={80}
                    h={40}
                    value={statResolutions.indexOf(
                        ds.selectedEventsStatisticsResolution()
                    )}
                    change={(v) => {
                        ds.setSelectedEventsStatisticsResolution(
                            statResolutions[v]
                        )
                    }}
                    values={statResolutions}
                />
            </Field>
            <BarChart
                visible={as.showCharts()}
                data={chartData()}
                scale={{ min: 0, max: 150 }}
                color='var(--color-middle)'
            />
        </Field>
    )
}
