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
import Field from '../../../lib/elements/field/field'
import { FiTrendingUp } from 'solid-icons/fi'
import Text from '../../../lib/elements/text/text'
import { Section } from 'types/_types'
import as from '../../../core/app-store'

const iconStyle = { size: 18, color: 'var(--color-accent)' }

interface Args {
    section: Section
}

const testDataZeroes = [0, 0, 0, 0, 0]
const testData = [14, 45, 23, 78, 34]

export const Statistics = (a: Args) => {
    const [chartData, setChartData] = createSignal<number[]>(testDataZeroes)

    // onMount(() => {
    //     // testing...
    //     setTimeout(() => setChartData(testData), 1000)
    // })

    createEffect(() => {
        // console.log(as.showCharts())
        if (as.showCharts() == undefined || as.showCharts() == false)
            setChartData(testDataZeroes)
        if (as.showCharts() == true) {
            setTimeout(() => setChartData(testData), 500)
        }
    })

    return (
        <Field tertiary col>
            <Field
                s
                h={80}
                res={{ h: 60 }}
                aic
                jcs
                onClick={() => {
                    as.setSection(a.section)
                    as.setShowCharts(true)
                }}
            >
                <Field s w={80} h={80} res={{ w: 60, h: 60 }} c>
                    <FiTrendingUp {...iconStyle} />
                </Field>
                <Text>Stats</Text>
            </Field>

            <Field rel>
                {/* <Field s w={80} res={60}></Field> */}
                <LineChart
                    data={chartData()}
                    scale={{ min: 0, max: 100 }}
                    areaColor='var(--color-accent)'
                    // areaColor={
                    //     unitColors[ds.getUnitIndex(ds.selectedUnitId()!)]
                    // }
                    // areaColor='var(--color-medium)'
                    // lineColor='var(--color-medium)'
                />
            </Field>
        </Field>
    )
}
