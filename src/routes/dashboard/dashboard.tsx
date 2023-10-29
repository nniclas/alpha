import { Component, onMount } from 'solid-js'
import Field from '../../lib/elements/field/field'
import as from '../../core/app-store'
import ds from '../../core/data-store'
import { Operation } from './operation/operation'
import { Events } from './events/events'
import { Minimizer } from '../../components/minimizer/minimizer'
import { Statistics } from './statistics/statistics'

export const Dashboard: Component = () => {
    onMount(() => ds.initialize())

    const primary = () => <Operation section='primary' />
    const secondary = () => (
        <Minimizer
            sections={[
                <Events section='secondary' />,
                <Statistics section='secondary' />,
            ]}
            names={['events', 'statistics']}
            minSize={80}
            section={as.showCharts() ? 'statistics' : 'events'}
        />
    )

    return (
        <Field col>
            <Field rel>
                {ds.selectedUnitRes() && (
                    <Minimizer
                        minSize={600}
                        colRes
                        sections={[primary(), secondary()]}
                        names={['primary', 'secondary']}
                        section={as.section()?.toString()!}
                    />
                )}
            </Field>
        </Field>
    )
}
