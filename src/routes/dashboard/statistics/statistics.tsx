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
import { EventsChartArea, MachineChartArea } from './statistics.parts'

const iconStyle = { size: 18, color: 'var(--color-dim)' }

interface Args {
    section: Section
}

export const Statistics = (a: Args) => {
    const cats = Object.keys(stats) as StatCategory[]

    return (
        <Field primary col>
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
                    <Text res title tertiary>
                        Statistics
                    </Text>
                </Field>
                <Field jce>
                    <Field rel s w={100} res={{ w: 100 }}>
                        <Field
                            layer
                            s
                            w={80}
                            res={{ w: 60, h: 60 }}
                            col
                            // style='z-index:1'
                        >
                            <SelectField
                                // index={entry()?.measure}
                                items={cats.map((c: string) => (
                                    <Field
                                        primary
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
                            content: <MachineChartArea />,
                        },
                        {
                            condition: ds.selectedStatCategory() == 'events',
                            content: <EventsChartArea />,
                        },
                    ]}
                ></Shifter>
            </Field>
        </Field>
    )
}
