import { createSignal, createRoot, createEffect } from 'solid-js'
import {
    getSignalStrength,
    getProcessorUsage,
    getBatteryLevel,
} from './machine-api'
import dataStore from './data-store'
import { randInt } from '../common/utils'

// simulator!

let iSignalInterval: NodeJS.Timer, iProcessorInterval: NodeJS.Timer

function createDataState() {
    const [signalStrength, setSignalStrength] = createSignal<number>(0) // signal strength of current monitored unit
    const [processorUsage, setProcessorUsage] = createSignal<number>(0) // processor usage of current monitored unit
    const [batteryLevel, setBatteryLevel] = createSignal<number>(0) // battery level of current monitored unit

    const start = () => {
        if (iSignalInterval == undefined)
            iSignalInterval = setInterval(() => {
                // console.log('set', signalStrength())
                setSignalStrength(getSignalStrength(signalStrength()))
            }, 2400)

        if (iProcessorInterval == undefined)
            iProcessorInterval = setInterval(() => {
                setProcessorUsage(getProcessorUsage(processorUsage()))
            }, 1700)

        setBatteryLevel(randInt(30, 90))
    }

    const stop = () => {
        clearInterval(iSignalInterval)
        clearInterval(iProcessorInterval)
        setSignalStrength(0)
        setProcessorUsage(0)
        setBatteryLevel(0)
    }

    // this will simply result in an on/off with new random starting points
    // (there is no keeping track of units and last read values etc.)
    const reset = () => {
        stop()
        setTimeout(() => {
            start()
        }, 500)
    }

    return {
        signalStrength,
        processorUsage,
        batteryLevel,
        start,
        stop,
        reset,
    }
}

export default createRoot(createDataState)
