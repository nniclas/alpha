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
import { statResolutions, stats, unitColors } from '../../../common/constants'
import ds from '../../../core/data-store'
import Field from '../../../lib/elements/field/field'
import { FiTrendingUp } from 'solid-icons/fi'
import Text from '../../../lib/elements/text/text'
import { Section } from 'types/_types'
import as from '../../../core/app-store'
import { avg } from '../../../common/utils'
import SelectField from '../../../lib/components/select-field/select-field'

const iconStyle = { size: 18, color: 'var(--color-accent)' }

interface Args {
    section: Section
}

const testDataZeroes = [0, 0, 0, 0, 0]
const testData = [14, 45, 23, 78, 34]

export const Statistics = (a: Args) => {
    const [chartData, setChartData] = createSignal<number[]>(testDataZeroes)

    onMount(() => {
        // // testing...
        // setTimeout(() => setChartData(testData), 1000)

        setTimeout(() => {
            // console.log(
            //     ds
            //         .machineStatsRes()
            //         ['Battery'].data.map((x: string) => x.substring(0, 2))
            // )
            // console.log(ds.machineStatsRes()['Battery'].data)
            // console.log(avg(ds.machineStatsRes()['Battery'].data, true))
        }, 2000)
    })

    createEffect(() => {
        // console.log(as.showCharts())
        if (as.showCharts() == undefined || as.showCharts() == false)
            setChartData(testDataZeroes)
        if (as.showCharts() == true) {
            setTimeout(() => setChartData(testData), 500)
        }
    })

    const cats = Object.keys(stats)

    return (
        <Field tertiary col>
            <Field
                s
                h={80}
                res={{ h: 60 }}
                jcs
                onClick={() => {
                    as.setSection(a.section)
                    as.setShowCharts(true)
                }}
            >
                <Field s w={80} h={80} res={{ w: 60, h: 60 }} c>
                    <FiTrendingUp {...iconStyle} />
                </Field>
                <Field aic>
                    <Text>Stats</Text>
                </Field>
                <Field jce>
                    <Field rel s w={100} res={{ w: 100 }}>
                        <Field
                            layer
                            s
                            w={80}
                            res={{ w: 60, h: 60 }}
                            col
                            style='z-index:1'
                        >
                            <SelectField
                                // index={entry()?.measure}
                                items={cats.map((c: string) => (
                                    <Field
                                        bg='var(--color-strong)'
                                        c
                                        w={100}
                                        h={80}
                                        res={{
                                            w: 60,
                                            h: 60,
                                        }}
                                    >
                                        <Text xs accent>
                                            {c}
                                        </Text>
                                    </Field>
                                ))}
                                onChange={(v) => {
                                    ds.setSelectedStatCategory(cats[v])
                                }}
                                // buttonArgs={btnStyle}
                            />
                            {ds.selectedStatCategory() == 'machine' && (
                                <SelectField
                                    // index={entry()?.measure}
                                    items={statResolutions.map((r) => (
                                        <Field
                                            bg='var(--color-strong)'
                                            c
                                            w={100}
                                            h={80}
                                            res={{
                                                w: 100,
                                                h: 60,
                                            }}
                                        >
                                            <Text xs accent>
                                                {r}
                                            </Text>
                                        </Field>
                                    ))}
                                    onChange={(v) => {
                                        // const e = { ...entry()! }
                                        // e.measure = v
                                        // setEntry(e)
                                    }}
                                    // buttonArgs={btnStyle}
                                />
                            )}
                        </Field>
                    </Field>
                </Field>
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
