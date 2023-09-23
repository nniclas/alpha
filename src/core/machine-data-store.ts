import { createSignal, createRoot, createEffect } from 'solid-js'
import {
    getSignalStrength,
    getProcessorUsage,
    getBatteryLevel,
} from './machine-readers'
import dataStore from './data-store'
import { randInt } from '../common/utils'

// simulator!

// let intervals: (NodeJS.Timer | undefined)[][] // matrix ordered by units and measures

interface UnitEntry {
    measures: MachineMeasure[]
}

interface MachineMeasure {
    name: string
    reader: (prev: number) => number
    timing: number
    value: number
}

// const defaultData: UnitEntry[] = [
//     { measures: [{ name: '_', reader: () => 0, timing: 1000, value: 0 }] },
// ]

// let iSignalInterval: NodeJS.Timer, iProcessorInterval: NodeJS.Timer

function createDataState() {
    // const [unitCount, setUnitCount] = createSignal<number>(1)

    const [intervalData, setIntervalData] = createSignal<
        (NodeJS.Timer | undefined)[][]
    >([])

    const [selectedUnit, setSelectedUnit] = createSignal<number>(0)
    const [data, setData] = createSignal<UnitEntry[]>() //

    // const [signalStrength, setSignalStrength] = createSignal<number[]>([0]) // signal strength of current monitored unit
    // const [processorUsage, setProcessorUsage] = createSignal<number[]>([0]) // processor usage of current monitored unit
    // const [batteryLevel, setBatteryLevel] = createSignal<number[]>([0]) // battery level of current monitored unit

    const read = (ui: number, mi: number) => {
        // console.log('reading from the depths of the mysterious catacombs..')

        // total destructuring for immutability..
        const d = [...data()!]
        const ud = { ...d[ui] }
        const udm = { ...[...ud.measures][mi] }

        const val = udm.reader(udm.value)

        udm.value = val
        ud.measures[mi] = udm
        d[ui] = ud

        if (mi == 0) console.log(mi, val)

        // d[ui].measures[mi].value == val

        // console.log(d[ui].measures[mi].value)

        setData(d) // update state
    }

    // set interval of a measure or all measures of a unit
    const start = (u: number, m?: number) => {
        const set = (m: number) => {
            console.log(intervalData())
            stop(u, m)
            // clearInterval(intervalData()[0][0])

            if (intervalData()[u][m] == undefined) {
                const intvl = setInterval(
                    () => read(u, m),
                    data()![u].measures[m].timing
                )

                const intvldata = [...intervalData()]
                const intvalsUnit = [...intvldata[u]]

                intvalsUnit[m] = intvl
                intvldata[u] = intvalsUnit

                setIntervalData(intvldata)

                console.log(intervalData())
            }
        }

        if (!m) {
            intervalData()[u].forEach((ivl, i) => set(i))
            return
        }

        set(m)
    }

    // clear interval of a measure or all measures of a unit
    const stop = (u: number, m?: number) => {
        const clear = (m: number) => {
            clearInterval(intervalData()[u][m])
            // intervals[u][m] = undefined
        }

        if (!m) {
            // console.log(intervals)
            intervalData()[u].forEach((ivl, i) => clear(i))
            return
        }

        clear(m)
    }

    const initialize = (
        unitCount: number,
        mnames: string[],
        readers: ((prev: number) => number)[],
        timings: number[]
    ) => {
        const data: UnitEntry[] = []
        const intvls = []
        for (let ui = 0; ui < unitCount; ui++) {
            data.push({
                measures: mnames.map((n, ni) => ({
                    name: mnames[ni],
                    reader: readers[ni],
                    timing: timings[ni],
                    value: 0,
                })),
            })
            intvls.push(mnames.map((n) => undefined))
        }
        console.log('init..')
        setIntervalData(intvls)
        setData(data)
    }

    const changeUnit = (u: number) => {
        data()!.forEach((u, ui) => stop(ui)) // stop all
        start(u) // start selected
        console.log('start ', u)
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
