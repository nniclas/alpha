import { createSignal, createRoot, createEffect } from 'solid-js'
import {
    getSignalStrength,
    getProcessorUsage,
    getBatteryLevel,
} from './machine-api'
import dataStore from './data-store'
import { randInt } from '../common/utils'

// simulator!

let intervals: NodeJS.Timer[]

interface MachineEntry {
    measures: MachineMeasure[]
}

interface MachineMeasure {
    name: string
    reader: (lr: number) => number
    value: number
}

const defaultData: MachineEntry[] = [
    { measures: [{ name: '_', reader: () => 0, value: 0 }] },
]

// let iSignalInterval: NodeJS.Timer, iProcessorInterval: NodeJS.Timer

function createDataState() {
    const [unitCount, setUnitCount] = createSignal<number>(1)
    const [selected, setSelected] = createSignal<number>(0)
    const [data, setData] = createSignal<MachineEntry[]>(defaultData)

    // const [signalStrength, setSignalStrength] = createSignal<number[]>([0]) // signal strength of current monitored unit
    // const [processorUsage, setProcessorUsage] = createSignal<number[]>([0]) // processor usage of current monitored unit
    // const [batteryLevel, setBatteryLevel] = createSignal<number[]>([0]) // battery level of current monitored unit

    const initialize = (
        unitCount: number,
        names: string[],
        readers: (() => number)[],
        times: number[]
    ) => {
        const data: MachineEntry[] = []
        for (let ui = 0; ui < unitCount; ui++) {
            data.push({
                measures: [
                    {
                        name: names[ui],
                        reader: readers[ui],
                        value: 0,
                    },
                ],
            })

            for (let mi = 0; mi < readers.length; mi++) {
                // hmm this will create intervals for measure-count TIMES units...
                // but we can have one unit active and toggle interval group on/off.. using setSelected state
                initInterval(
                    mi,
                    () => {
                        // total destructuring for immutability..
                        const d = [...data]
                        const ud = { ...d[ui] }
                        const udm = { ...[...ud.measures][mi] }

                        const val = udm.reader(udm.value)
                        ud.measures[mi].value == val
                        setData(d) // update state
                    },
                    times[mi]
                )
            }
        }
    }

    const initInterval = (
        measure: number,
        action: () => void,
        time: number
    ) => {
        if (intervals[measure] == undefined)
            intervals[measure] = setInterval(action, time)
    }

    // const start = () => {
    //     // code will continually update the selected index of the array.

    //     if (iSignalInterval == undefined)
    //         iSignalInterval = setInterval(() => {
    //             // console.log('set', signalStrength())

    //             const prev = signalStrength()[unitCount()]
    //             const arr = [...signalStrength()]
    //             arr[selected()] = getSignalStrength(prev)
    //             setSignalStrength(arr)
    //         }, 2400)

    //     if (iProcessorInterval == undefined)
    //         iProcessorInterval = setInterval(() => {
    //             setProcessorUsage(getProcessorUsage(processorUsage()))
    //         }, 1700)

    //     setBatteryLevel(randInt(30, 90))
    // }

    // const stop = () => {
    //     clearInterval(iSignalInterval)
    //     clearInterval(iProcessorInterval)
    //     setSignalStrength(0)
    //     setProcessorUsage(0)
    //     setBatteryLevel(0)
    // }

    // this will simply result in an on/off with new random starting points
    // (there is no keeping track of units and last read values etc.)
    // const reset = () => {
    //     stop()
    //     setTimeout(() => {
    //         start()
    //     }, 500)
    // }

    return {
        setUnitCount,
        setSelected,
        // signalStrength,
        // processorUsage,
        // batteryLevel,
        // start,
        // stop,
        // reset,
    }
}

export default createRoot(createDataState)
