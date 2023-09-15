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
import { unitColors, unitColorsDarker } from '../common/constants'

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
    const [units] = createSignal<Unit[]>([])
    const [selectedUnitId, setSelectedUnitId] = createSignal<number>()
    const [selectedWeek, setSelectedWeek] = createSignal<string>('2023-33')
    // const [entries] = createSignal<Entry[]>([])

    createEffect(() => {
        if (unitsRes() && unitsRes()?.length) {
            console.log(unitsRes())
            setSelectedUnitId(unitsRes()![0].id)
        }
    })

    const [unitsRes] = createResource<Unit[], Unit[]>(units, async () => {
        console.log('fetch all units')
        return await getItems<Unit[]>('units')
    })

    const [selectedUnitRes] = createResource<Unit, number>(
        selectedUnitId,
        (id) => getItems<Unit>(`units/${id}`)
    )

    // const [entriesRes] = createResource<Entry[], number>(
    //     selectedUnitId,
    //     (unitId) => getItems<Entry[]>(`entries/byUnit/${unitId}`)
    // )
    /////////////
    /////////////
    /// todo: optional added week parameter..
    // see https://docs.solidjs.com/references/api-reference/basic-reactivity/createResource
    const [entriesRes] = createResource(
        () => [selectedUnitId(), selectedWeek()] as const,
        ([unitId, week]) => {
            if (!unitId) return []
            return getItems<Entry[]>(
                `entries/unit/${unitId}${week ? `/week/${week}` : ''}`
            )
        }
    )

    /////// WIP WIP
    const addUnit = (u: Unit) => {
        addItem<Unit>(u, 'units')

        // refresh here??? update units resource
    }

    // const [entriesByWeekRes] = createResource<Entry[], string>(
    //     selectedWeek,
    //     (unitId) => getItems<Entry[]>(`entries/byUnit/${unitId}/week/${unitId}`)
    // )

    // const [entriesRes] = createResource<Entry[], number>(
    //     selectedUnitId,
    //     (unitId) => getItems<Entry[]>(`entries/byUnit/${unitId}`)
    // )

    const getUnitIndex = (unitId?: number) => {
        if (!unitsRes()) return 0

        // default is selected unit
        return unitsRes()!.indexOf(
            unitsRes()!.filter(
                (u) => u.id == unitId ?? selectedUnitRes()!.id
            )[0]
        )
    }

    return {
        unitsRes,
        selectedUnitRes,
        entriesRes,
        selectedUnitId,
        setSelectedUnitId,
        selectedWeek,
        setSelectedWeek,
        getUnitIndex,
        addUnit,
    }
}

export default createRoot(createDataState)
