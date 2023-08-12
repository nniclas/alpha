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
import appStore from './app-store'
import { delay } from '../common/utils'

const getItems = async <T>(path: string): Promise<T> => {
    // !!!! todo: also enable [Authorize] and checks in backend

    await delay(500) // intentional additional delay for demo purposes
    if (!appStore.session()?.token) {
        return [] as any /// just disable api calls ?????
    }

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
    const [selectedUnitId, setSelectedUnitId] = createSignal<number>()
    const [selectedWeek, setSelectedWeek] = createSignal<string>()
    // const [entries] = createSignal<Entry[]>([])

    createEffect(() => {
        if (unitsRes() && unitsRes()?.length)
            setSelectedUnitId(unitsRes()![0].id)
    })

    const [unitsRes] = createResource<Unit[], Unit[]>(units, async () => {
        return await getItems<Unit[]>('units')
    })

    const [entriesRes] = createResource<Entry[], number>(
        selectedUnitId,
        (unitId) => getItems<Entry[]>(`entries/byUnit/${unitId}`)
    )

    // const [entriesByWeekRes] = createResource<Entry[], string>(
    //     selectedWeek,
    //     (unitId) => getItems<Entry[]>(`entries/byUnit/${unitId}/week/${unitId}`)
    // )

    const [selectedUnitRes] = createResource<Unit, number>(
        selectedUnitId,
        (id) => getItems<Unit>(`units/${id}`)
    )

    // const [entriesRes] = createResource<Entry[], number>(
    //     selectedUnitId,
    //     (unitId) => getItems<Entry[]>(`entries/byUnit/${unitId}`)
    // )

    // used to manually trigger fetchers, after log on
    const initalize = async () => {
        const units = await getItems<Unit[]>('units')
        setUnits(units)
        await delay(250)
        setSelectedUnitId(units[0].id)
    }

    return {
        unitsRes,
        entriesRes,
        selectedUnitRes,
        selectedUnitId,
        setSelectedUnitId,
        initalize,
    }
}

export default createRoot(createDataState)
