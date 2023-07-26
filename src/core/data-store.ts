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

function createDataState() {
    const [units] = createSignal<Unit[]>([])
    // const [entries] = createSignal<Entry[]>([])

    const [selectedUnitId, setSelectedUnitId] = createSignal<number>(1)

    const [unitsRes] = createResource<Unit[], Unit[]>(units, () =>
        getItems<Unit[]>('units')
    )

    const [entriesRes] = createResource<Entry[], number>(
        selectedUnitId,
        (unitId) => getItems<Entry[]>(`entries/byUnit/${unitId}`)
    )

    const [selectedUnitRes] = createResource<Unit, number>(
        selectedUnitId,
        (id) => getItems<Unit>(`units/${id}`)
    )

    return {
        unitsRes,
        entriesRes,
        selectedUnitRes,
        selectedUnitId,
        setSelectedUnitId,
    }
}

export default createRoot(createDataState)
