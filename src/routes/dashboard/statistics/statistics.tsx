import {
    Component,
    For,
    Suspense,
    createEffect,
    createSignal,
    lazy,
    onMount,
} from 'solid-js'

import { LineChart } from '../../../components/line-chart/line-chart'
import { unitColors } from '../../../common/constants'
import ds from '../../../core/data-store'

export const Statistics = () => {
    const [chartData, setChartData] = createSignal<number[]>([0, 0, 0, 0, 0])

    onMount(() => {
        // testing...
        setTimeout(() => setChartData([14, 45, 23, 78, 34]), 1000)
        setTimeout(() => setChartData([24, 85, 43, 68, 54]), 2000)
    })

    return (
        <LineChart
            data={chartData()}
            scale={{ min: 0, max: 100 }}
            areaColor={unitColors[ds.getUnitIndex(ds.selectedUnitId()!)]}
            // areaColor='var(--color-medium)'
            // lineColor='var(--color-medium)'
        />
    )
}
