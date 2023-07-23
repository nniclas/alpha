import { createSignal, createMemo, createRoot, createEffect } from 'solid-js'
// import { Activity } from 'types/activity'
import { get, post, put, del } from './api'
import { Unit } from 'types/entities/unit'
import { User } from 'types/entities/user'
import { Entry } from 'types/entities/entry'
import {
    getSignalStrength,
    getProcessorUsage,
    getBatteryLevel,
} from './machine-api'

function createDataState() {
    const [pollingActive, setPollingActive] = createSignal<boolean>(true) // control whether to poll machine api indefinitely
    const [signalStrength, setSignalStrength] = createSignal<number>(0) // signal strength of current monitored unit
    const [processorUsage, setProcessorUsage] = createSignal<number>(0) // processor usage of current monitored unit
    const [batteryLevel, setBatteryLevel] = createSignal<number>(0) // battery level of current monitored unit

    const [i1, setI1] = createSignal<NodeJS.Timer>()
    const [i2, setI2] = createSignal<NodeJS.Timer>()
    const [i3, setI3] = createSignal<NodeJS.Timer>()

    createEffect(() => {
        if (pollingActive()) {
            const i1 = setInterval(() => {
                setSignalStrength(getSignalStrength(0, signalStrength()))
            }, 3200)
            setI1(i1)

            const i2 = setInterval(() => {
                setProcessorUsage(getProcessorUsage(0, processorUsage()))
            }, 1100)
            setI2(i2)

            const i3 = setInterval(() => {
                setBatteryLevel(getBatteryLevel(0, batteryLevel()))
            }, 5000)
            setI3(i3)
        }

        if (!pollingActive()) {
            clearInterval(i1())
            clearInterval(i2())
            clearInterval(i3())
            setSignalStrength(0)
            setProcessorUsage(0)
            setBatteryLevel(0)
        }
    })

    return {
        setPollingActive,
        signalStrength,
        processorUsage,
        batteryLevel,
    }
}

export default createRoot(createDataState)
