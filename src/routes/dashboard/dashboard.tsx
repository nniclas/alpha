import {
    Component,
    For,
    Suspense,
    createEffect,
    createSignal,
    lazy,
} from 'solid-js'
import Field from '../../lib/elements/field/field'
import Text from '../../lib/elements/text/text'
import appStore from '../../core/app-store'
import ds from '../../core/data-store'
import { Operation } from './operation/operation'
import { Events } from './events/events'
import { Transition } from 'solid-transition-group'
import { Unit } from '../../types/entities/unit'
import { Loader } from '../../components/loader/loader'
import { Collapser } from '../../components/collapser/collapser'
import { unitColors } from '../../common/constants'
import machineDataStore from '../../core/machine-data-store'

export const Dashboard: Component = () => {
    createEffect(() => {
        // on successful log on (user has entered dashboard) manually trigger resource fetches
        // if (!ds.selectedUnitRes()) {
        //     ds.initalize()
        // }
        // console.log(ds.getUnitIndex(ds.selectedUnitId()))

        ds.initialize()
    })

    return (
        <Field col>
            {/* <Text>{machineDataStore.testCount()}</Text> */}
            <Field
                a
                style={`height:8px; flex:none; background: ${
                    unitColors[ds.getUnitIndex(ds.selectedUnitId())]
                }`}
            />
            <Field rel>
                {ds.selectedUnitRes() && (
                    <Collapser
                        sections={[<Operation />, <Events />]}
                        names={['operation', 'events']}
                        openAction={(sec: any) => appStore.setSection(sec)}
                    />
                )}
            </Field>
        </Field>
    )
}
