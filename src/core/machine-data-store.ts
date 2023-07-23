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

    createEffect(() => {
        if (pollingActive()) {
            setInterval(() => {
                setSignalStrength(getSignalStrength(0, signalStrength()))
            }, 3200)

            setInterval(() => {
                setProcessorUsage(getProcessorUsage(0, processorUsage()))
            }, 1100)

            setInterval(() => {
                setBatteryLevel(getBatteryLevel(0, batteryLevel()))
            }, 5000)
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
