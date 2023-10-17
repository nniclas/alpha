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
import {
    measures,
    statResolutions,
    stats,
    unitColors,
} from '../../../common/constants'
import { SliderButton } from '../../../components/slider-button/slider-button'
import { LineChart } from '../../../components/line-chart/line-chart'
import ds from '../../../core/data-store'
import { BarChart } from '../../../components/bar-chart/bar-chart'
import { StatData } from 'types/_types'

export const MachineChartArea = () => {
    const [chartData, setChartData] = createSignal<StatData>()

    let data: StatData

    onMount(async () => {})

    createEffect(() => {
        const d = ds.machineStatsRes()[ds.selectedMachineStatisticsElement()]
        if (d) data = d
        setChartData(data)
    })

    return (
        <Field col>
            <Field s col p='32px 8px'>
                <SliderButton
                    w={100}
                    h={40}
                    value={stats.machine.indexOf(
                        ds.selectedMachineStatisticsElement() || ''
                    )}
                    change={(v) => {
                        ds.setSelectedMachineStatisticsElement(stats.machine[v])
                    }}
                    values={stats.machine}
                />
                <SliderButton
                    w={100}
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
                data={chartData()?.data}
                labels={chartData()?.titles}
                scale={{ min: 0, max: 100 }}
                areaColor={unitColors[ds.getUnitIndex(ds.selectedUnitId())]}
            />
        </Field>
    )
}

export const EventsChartArea = () => {
    const [chartData, setChartData] = createSignal<StatData>()

    let data: StatData
    onMount(async () => {})

    createEffect(async () => {
        const d = await ds.entryStatsRes()
        if (d) data = d
        setChartData(data)
    })

    const chart = () => (
        <BarChart
            percentage
            visible={as.showCharts()}
            data={chartData()?.data}
            labels={chartData()?.titles}
            color={unitColors[ds.getUnitIndex(ds.selectedUnitId())]}
        />
    )

    return (
        <Field col>
            <Field s col p='32px 8px'>
                <SliderButton
                    w={100}
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

            <Field s h={64} />

            <Responsive compact={chart()}>
                <Field style='padding:0 128px'>{chart()}</Field>
            </Responsive>
        </Field>
    )
}
