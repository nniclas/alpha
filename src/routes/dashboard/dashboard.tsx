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

export const Dashboard: Component = () => {
    createEffect(() => {
        // on successful log on (user has entered dashboard) manually trigger resource fetches
        // if (!ds.selectedUnitRes()) {
        //     ds.initalize()
        // }

        console.log(ds.getUnitIndex(ds.selectedUnitId()))
    })

    return (
        <Field col>
            <Field
                style={`height:8px; flex:none; background: ${
                    unitColors[ds.getUnitIndex(ds.selectedUnitId())]
                }`}
            />
            <Field rel>
                <Transition name='fade'>
                    <Suspense
                        fallback={
                            <Field a layer c style='pointer-events:none'>
                                <Loader />
                            </Field>
                        }
                    >
                        {ds.selectedUnitRes() && (
                            <Collapser
                                sections={[
                                    { s: 'operation', c: <Operation /> },
                                    { s: 'events', c: <Events /> },
                                ]}
                                openAction={(sec: any) =>
                                    appStore.setSection(sec)
                                }
                            />
                        )}
                    </Suspense>
                </Transition>
            </Field>
        </Field>
    )
}
