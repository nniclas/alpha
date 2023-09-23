import { createSignal, createRoot, createEffect } from 'solid-js'
import {
    getSignalStrength,
    getProcessorUsage,
    getBatteryLevel,
} from './machine-api'
import dataStore from './data-store'
import { randInt } from '../common/utils'

// simulator!

let intervals: (NodeJS.Timer | undefined)[][] // matrix ordered by units and measures

interface UnitEntry {
    measures: MachineMeasure[]
}

interface MachineMeasure {
    name: string
    reader: (lr: number) => number
    timing: number
    value: number
}

const defaultData: UnitEntry[] = [
    { measures: [{ name: '_', reader: () => 0, timing: 1000, value: 0 }] },
]

// let iSignalInterval: NodeJS.Timer, iProcessorInterval: NodeJS.Timer

function createDataState() {
    // const [unitCount, setUnitCount] = createSignal<number>(1)
    const [selectedUnit, setSelectedUnit] = createSignal<number>(0)
    const [data, setData] = createSignal<UnitEntry[]>(defaultData) //

    // const [signalStrength, setSignalStrength] = createSignal<number[]>([0]) // signal strength of current monitored unit
    // const [processorUsage, setProcessorUsage] = createSignal<number[]>([0]) // processor usage of current monitored unit
    // const [batteryLevel, setBatteryLevel] = createSignal<number[]>([0]) // battery level of current monitored unit

    const read = (ui: number, mi: number) => {
        // total destructuring for immutability..
        const d = [...data()]
        const ud = { ...d[ui] }
        const udm = { ...[...ud.measures][mi] }

        const val = udm.reader(udm.value)
        ud.measures[mi].value == val
        setData(d) // update state
    }

    // set interval of a measure or all measures of a unit
    const start = (u: number, m?: number) => {
        const set = (m: number) => {
            if (intervals[u][m] == undefined)
                intervals[u][m] = setInterval(
                    () => read(u, m),
                    data()[u].measures[m].timing
                )
        }

        if (!m) {
            intervals[u].forEach((ivl, i) => set(i))
            return
        }

        set(m)
    }

    // clear interval of a measure or all measures of a unit
    const stop = (u: number, m?: number) => {
        const clear = (m: number) => {
            clearInterval(intervals[u][m])
            intervals[u][m] = undefined
        }

        if (!m) {
            intervals[u].forEach((ivl, i) => clear(i))
            return
        }

        clear(m)
    }

    const initialize = (
        unitCount: number,
        mnames: string[],
        readers: (() => number)[],
        timings: number[]
    ) => {
        const data: UnitEntry[] = []
        for (let ui = 0; ui < unitCount; ui++) {
            data.push({
                measures: mnames.map((n, ni) => ({
                    name: mnames[ni],
                    reader: readers[ni],
                    timing: timings[ni],
                    value: 0,
                })),
            })

            for (let mi = 0; mi < readers.length; mi++) {
                // hmm this will create intervals for measure-count TIMES machines...
                // but we can have one machine active and toggle interval group on/off.. using setSelected state
                start(ui, mi)
            }
        }
    }

    const changeUnit = (u: number) => {
        data().forEach((u, ui) => stop(ui)) // stop all
        start(u) // start selected
        setSelectedUnit(u)
    }

    // // // // measure null will start all measures
    // // // const start = (unit: number, measure?: number) => {}

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
        initialize,
        changeUnit,
        selectedUnit,
        data,
        // setMachineCount,
        // setSelected,
        // signalStrength,
        // processorUsage,
        // batteryLevel,
        // start,
        // stop,
        // reset,
    }
}

export default createRoot(createDataState)
