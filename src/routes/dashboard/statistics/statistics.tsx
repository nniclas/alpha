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
import { Section, StatCategory } from 'types/_types'
import as from '../../../core/app-store'
import { avg } from '../../../common/utils'
import SelectField from '../../../lib/components/select-field/select-field'
import { BarChart } from '../../../components/bar-chart/bar-chart'
import { SliderButton } from '../../../components/slider-button/slider-button'
import Shifter from '../../../components/shifter/shifter'

const iconStyle = { size: 18, color: 'var(--color-accent)' }

interface Args {
    section: Section
}

export const Statistics = (a: Args) => {
    const [chartData, setChartData] = createSignal<number[]>()

    let data: number[]
    let zeroData: number[]

    onMount(async () => {})

    createEffect(() => {
        const batteryData = ds.machineStatsRes()['Battery']?.data

        if (batteryData) {
            data = batteryData
            zeroData = batteryData.map((v: number) => 0)
        }

        setChartData(data)
    })

    const cats = Object.keys(stats) as StatCategory[]

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
                                            w: 100,
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
                            />
                        </Field>
                    </Field>
                </Field>
            </Field>

            <Field rel>
                <Shifter
                    pages={[
                        {
                            condition: !as.showCharts(),
                            content: <></>,
                        },
                        {
                            condition: ds.selectedStatCategory() == 'machine',
                            content: (
                                <Field col>
                                    <Field s pwlg>
                                        <SliderButton
                                            w={80}
                                            h={40}
                                            value={statResolutions.indexOf(
                                                ds.selectedMachineStatisticsOperationResolution()
                                            )}
                                            change={(v) => {
                                                ds.setSelectedMachineStatisticsOperationResolution(
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
                            ),
                        },
                        {
                            condition: ds.selectedStatCategory() == 'events',
                            content: (
                                <LineChart
                                    visible={as.showCharts()}
                                    data={chartData()}
                                    scale={{ min: 0, max: 150 }}
                                    areaColor='var(--color-middle)'
                                />
                            ),
                        },
                    ]}
                ></Shifter>
            </Field>
        </Field>
    )
}
