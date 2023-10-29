import { stats } from '../../../common/constants'
import ds from '../../../core/data-store'
import Field from '../../../lib/elements/field/field'
import { FiTrendingUp } from 'solid-icons/fi'
import Text from '../../../lib/elements/text/text'
import { Section, StatCategory } from 'types/_types'
import as from '../../../core/app-store'
import SelectField from '../../../lib/components/select-field/select-field'
import Shifter from '../../../components/shifter/shifter'
import { EventsChartArea, MachineChartArea } from './statistics.parts'
import styles from '../../../common/common.module.css'

const iconStyle = { size: 18, color: 'var(--color-middle)' }

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
                class={styles.sectionheader}
            >
                <Field s w={80} h={80} res={{ w: 60, h: 60 }} c>
                    <FiTrendingUp {...iconStyle} />
                </Field>
                <Field aic>
                    <Text res title>
                        Statistics
                    </Text>
                </Field>
                <Field jce>
                    <Field rel s w={100} res={{ w: 100 }}>
                        <Field layer s w={80} res={{ w: 60, h: 60 }} col>
                            <SelectField
                                items={cats.map((c: string) => (
                                    <Field
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
