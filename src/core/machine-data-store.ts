import { createSignal, createRoot, createEffect } from 'solid-js'
import dataStore from './data-store'
import { clear, tick } from '../common/timer-utils'

// simulator!

interface UnitEntry {
    measures: MachineMeasure[]
}

interface MachineMeasure {
    name: string
    reader: (prev: number) => number
    value: number
}

function createDataState() {
    const [selectedUnit, setSelectedUnit] = createSignal<number>(0)
    const [data, setData] = createSignal<UnitEntry[]>() //

    const read = (ui: number, mi: number) => {
        // console.log('reading from the depths of the mysterious catacombs..')

        //////////////
        //////////////
        //////////////
        //////////////
        // total destructuring for immutability..
        const d = [...data()!]
        const ud = { ...d[ui] }
        const udm = { ...[...ud.measures][mi] }
        const val = udm.reader(udm.value)
        udm.value = val
        ud.measures[mi] = udm
        d[ui] = ud
        setData(d) // update state ///////////////////////////////////////////////
        //////////////
        //////////////
        //////////////
        //////////////
    }

    //
    const start = (ui: number, mi?: number) => {
        tick(
            data()![ui].measures.map((m, mi) => () => {
                // console.log('read ', ui, mi)
                read(ui, mi)
            }),
            true,
            true
        )
    }

    // clear all, stop reading
    const stop = () => {
        clear()
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
                    timerRef: undefined,
                    timing: timings[ni],
                    value: 0,
                })),
            })
            intvls.push(mnames.map((n) => undefined))
        }
        setData(data)
    }

    const changeUnit = (u: number) => {
        start(u) // start selected
        setSelectedUnit(u)
    }

    return {
        initialize,
        changeUnit,
        selectedUnit,
        data,
        stop,
    }
}

export default createRoot(createDataState)
