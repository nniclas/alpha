import {
    createSignal,
    createRoot,
    createEffect,
    createResource,
} from 'solid-js'
import { clear, tick } from '../common/timer-utils'
import { delay } from '../common/utils'

// simulator!

interface UnitEntry {
    measures: MachineMeasure[]
}

interface MachineMeasure {
    element: string
    reader: (prev: number) => number
    value: number
}

function createDataState() {
    const [selectedUnit, setSelectedUnit] = createSignal<number>(0)
    const [data, setData] = createSignal<UnitEntry[]>() //
    // const [loaded, setLoaded] = createSignal<boolean>(false) //

    // intentional set-loaded resource
    const [loadedRes] = createResource<boolean, number>(
        selectedUnit,
        async () => {
            await delay(800)
            return true
        }
    )

    // createEffect(() => {
    //     console.log(data())
    // })

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
    const startRead = async (ui: number, mi?: number) => {
        // setLoaded(false)

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
        elements: string[],
        readers: ((prev: number) => number)[]
    ) => {
        const data: UnitEntry[] = []
        const intvls = []
        for (let ui = 0; ui < unitCount; ui++) {
            data.push({
                measures: elements.map((n, ei) => ({
                    element: elements[ei],
                    reader: readers[ei],
                    value: 0,
                })),
            })
            intvls.push(elements.map((e) => undefined))
        }
        setData(data)
    }

    const readUnit = (u: number) => {
        startRead(u) // start selected
        setSelectedUnit(u)
    }

    return {
        initialize,
        loadedRes,
        readUnit,
        selectedUnit,
        data,
        stop,
    }
}

export default createRoot(createDataState)
