import { createSignal, createRoot, createResource } from 'solid-js'
import { get } from './api'
import { Unit } from 'types/entities/unit'
import { Entry } from 'types/entities/entry'
import { delay } from '../common/utils'

const getItems = async <T>(path: string): Promise<T> => {
    return await get<T>(path)
}

const fetchUnits = async (): Promise<Unit[]> => {
    await delay(2000)
    throw 0
    // return await getItems<Unit[]>('units')
}

const fetchUnit = async (id: number): Promise<Unit> => {
    await delay(1000)
    throw 0
    // return await getItems<Unit>(`units/${id}`)
}

const fetchEntries = async (unitId: number): Promise<Entry[]> => {
    await delay(500)
    throw 0
    // return await getItems<Entry[]>(`entries/byUnit/${unitId}`)
}

function createDataState() {
    const [selectedUnitId, setSelectedUnitId] = createSignal<number>(1)
    const [units, setUnits] = createSignal<Unit[]>([])

    const [unitsRes] = createResource<Unit[], Unit[]>(units, fetchUnits)

    const [entriesRes] = createResource<Entry[], number>(
        selectedUnitId,
        fetchEntries
    )

    const [selectedUnitRes] = createResource<Unit, number>(
        selectedUnitId,
        fetchUnit
    )

    return {
        unitsRes,
        selectedUnitRes,
        entriesRes,
        selectedUnitId,
        setSelectedUnitId,
    }
}

export default createRoot(createDataState)