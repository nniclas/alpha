import { createSignal, createMemo, createRoot, createEffect } from 'solid-js'
// import { Activity } from 'types/activity'
import { get, post, put, del } from './api'
import { Unit } from 'types/entities/unit'
import { User } from 'types/entities/user'
import { Entry } from 'types/entities/entry'

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

function createDataState() {
    const [units, setUnits] = createSignal<Unit[]>([])
    const [selectedUnit, setSelectedUnit] = createSignal<Unit>()
    // const [events, setEvents] = createSignal<Event[]>([])
    // const [entries, setEntries] = createSignal<Entry[]>([])
    // const [users, setUsers] = createSignal<User[]>([])

    createEffect(() => {
        if (units() && units().length) {
            setSelectedUnit(units()[0])
        }
    })

    const getUnits = async () => {
        const unitss = await getItems<Unit[]>('units')
        setUnits(unitss)

        ////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // setTimeout(() => {
        //     setSelectedUnit(unitss[0]) // every fetch-all-units will reset selected unit
        // }, 1000)
    }
    const selectUnit = async (id: number) => {
        setSelectedUnit(units().find((u) => u.id == id))
    }
    const addUnit = async (unit: Unit) =>
        addItem(unit, 'units', () => getUnits())
    const updateUnit = async (unit: Unit) =>
        updateItem(unit, 'units', () => getUnits())
    const deleteUnit = async (id: number) =>
        deleteItem(`units/${id}`, () => getUnits())

    return {
        units,
        selectedUnit,
        getUnits,
        selectUnit,
        addUnit,
        updateUnit,
        deleteUnit,
    }
}

export default createRoot(createDataState)
