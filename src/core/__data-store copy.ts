import {
    createSignal,
    createMemo,
    createRoot,
    createEffect,
    createResource,
} from 'solid-js'
// import { Activity } from 'types/activity'
import { get, post, put, del } from './api'
import { Unit } from 'types/entities/unit'
import { User } from 'types/entities/user'
import { Entry } from 'types/entities/entry'

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

const getItems = async <T>(path: string): Promise<T> => {
    return await get<T>(path)
}

const addItem = async <T>(item: T, path: string, refetch?: () => void) => {
    await post<T>(path, item)
    refetch?.()
}

const updateItem = async <T>(item: T, path: string, refetch?: () => void) => {
    await put<T>(path, item)
    refetch?.()
}

const deleteItem = async (path: string, refetch?: () => void) => {
    await del(path)
    refetch?.()
}

const fetchFoo = async (): Promise<{ name: string }> => {
    console.log('fetching mr foo...')
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('fetched mr foo')
            resolve({
                name: 'Mr foo!',
            })
        }, 5000)
    })
}

const getUnits = async (): Promise<Unit[]> => {
    await delay(2000)
    return await getItems<Unit[]>('units')
}

const getEntries = async (): Promise<Entry[]> => {
    await delay(2000)
    return await getItems<Entry[]>('entries')
}

function createDataState() {
    const [units, setUnits] = createSignal<Unit[]>([])
    const [selectedUnitId, setSelectedUnitId] = createSignal<number>()
    const [entries, setEntries] = createSignal<Entry[]>([])
    const [users, setUsers] = createSignal<User[]>([])

    const [selectedUnit, setSelectedUnit] = createSignal<Unit>()

    // const [foo, setFoo] = createSignal<{ name: string }>()

    // const selectUnit = async (): Promise<Unit> => {
    //     await delay(2000)
    //     return units()![0]
    // }

    const fletchUnit = async () => {
        await delay(2000)
        return units().find((x) => x.id == selectedUnitId())
    }

    const [unitsRes] = createResource<Unit[], Unit[]>(getUnits)
    const [selectedUnitRes] = createResource(selectedUnitId, fletchUnit)

    const [entriesRes] = createResource(entries, getEntries)

    createEffect(() => {})

    // const getUnits = async () => {
    //     const units = await getItems<Unit[]>('units')
    //     setUnits(units)
    // }
    // const selectUnit = async (id: number) => {
    //     setSelectedUnit(units().find((u) => u.id == id))
    // }
    const addUnit = async (unit: Unit) =>
        addItem(unit, 'units', () => getUnits())
    const updateUnit = async (unit: Unit) =>
        updateItem(unit, 'units', () => getUnits())
    const deleteUnit = async (id: number) =>
        deleteItem(`units/${id}`, () => getUnits())

    // const getEntries = async (unitId?: number) => {
    //     const entries = await getItems<Entry[]>(
    //         'entries/' + (unitId ? `byUnit/${unitId}` : '')
    //     )
    //     setEntries(entries)
    // }

    // const getFoo = async () => {
    //     await delay(5000)
    //     setFoo({ name: 'Mr foo!' })
    // }

    return {
        units,
        selectedUnit,
        selectedUnitRes,
        setSelectedUnitId,
        getUnits,
        // selectUnit,
        addUnit,
        updateUnit,
        deleteUnit,
        getEntries,
        entries,
        // foo,
    }
}

export default createRoot(createDataState)
