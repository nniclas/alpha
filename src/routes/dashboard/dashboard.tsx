import {
    Component,
    For,
    Suspense,
    createEffect,
    createSignal,
    lazy,
    onMount,
} from 'solid-js'
import Field from '../../lib/elements/field/field'
import Text from '../../lib/elements/text/text'
import as from '../../core/app-store'
import ds from '../../core/data-store'
import { Operation } from './operation/operation'
import { Events } from './events/events'
import { Transition } from 'solid-transition-group'
import { Unit } from '../../types/entities/unit'
import { Loader } from '../../components/loader/loader'
import { unitColors } from '../../common/constants'
import machineDataStore from '../../core/machine-data-store'
import { Minimizer } from '../../components/minimizer/minimizer'
import { FiTrendingUp } from 'solid-icons/fi'
import { Statistics } from './statistics/statistics'

export const Dashboard: Component = () => {
    onMount(() => {
        // on successful log on (user has entered dashboard) manually trigger resource fetches
        // if (!ds.selectedUnitRes()) {
        //     ds.initalize()
        // }
        // console.log(ds.getUnitIndex(ds.selectedUnitId()))

        ds.initialize()
        // console.log(as.showCharts())
    })

    const primary = () => <Operation section='primary' />
    const secondary = () => (
        <Minimizer
            sections={[
                <Events section='secondary' />,
                <Statistics section='secondary' />,
            ]}
            names={['events', 'statistics']}
            // openAction={(sec: any) => console.log('hello there')}
            minSize={80}
            section={as.showCharts() ? 'statistics' : 'events'}
        />
    )

    return (
        <Field col>
            {/* <Text>{machineDataStore.testCount()}</Text> */}

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
