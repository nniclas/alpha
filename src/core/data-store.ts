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
import {
    statResolutions,
    unitColors,
    unitColorsDarker,
} from '../common/constants'
import { MachineStatData, Resolution, StatCategory } from 'types/_types'

const getWithAuth = async <T>(path: string, simDelay = true): Promise<T> => {
    // !!!! todo: also enable [Authorize] and checks in backend

    if (simDelay) await delay(500) // intentional additional delay for demo purposes

    if (!appStore.session()?.token) {
        return [] as any /// just disable api calls ?????
    }

    // console.log('authenticated..')

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
    const [selectedStatCategory, setSelectedStatCategory] =
        createSignal<StatCategory>('machine')
    const [selectedOperationResolution, setSelectedOperationResolution] =
        createSignal<Resolution>('week')
    const [
        selectedMachineStatisticsOperationResolution,
        setSelectedMachineStatisticsOperationResolution,
    ] = createSignal<Resolution>('week')
    // const [entries] = createSignal<Entry[]>([])

    createEffect(() => {})

    const initialize = async () => {
        const us = await unitsResActions.refetch()
        if (us && us?.length > 0) {
            setSelectedUnitId(us[0].id)
            return
        }

        setSelectedUnitId((await unitsResActions.refetch())![0].id)
    }

    const [unitsRes, unitsResActions] = createResource<Unit[], Unit[]>(
        units,
        async () => {
            // console.log('trying to fetch all units..')
            return await getWithAuth<Unit[]>('units')
        }
    )

    const [selectedUnitRes] = createResource<Unit, number>(
        selectedUnitId,
        (id) => getWithAuth<Unit>(`units/${id}`)
    )

    // const [entriesRes] = createResource<Entry[], number>(
    //     selectedUnitId,
    //     (unitId) => getItems<Entry[]>(`entries/byUnit/${unitId}`)
    // )
    /////////////
    /////////////
    // see https://docs.solidjs.com/references/api-reference/basic-reactivity/createResource
    const [entriesRes] = createResource(
        () => [selectedUnitId(), selectedWeek()] as const,
        async ([unitId, week]) => {
            if (!unitId) return []
            return await getWithAuth<Entry[]>(
                `entries/unit/${unitId}${week ? `/week/${week}` : ''}`
            )
        }
    )

    const [machineStatsRes] = createResource(
        () =>
            [
                selectedUnitId(),
                selectedMachineStatisticsOperationResolution(),
            ] as const,
        async ([unitId, res]) => {
            if (!unitId) return []
            return await getWithAuth<any>(
                `stats/machine/unit/${unitId}/res/${res}`,
                false
            )
        }
    )

    // const [entryStatsRes] = createResource(
    //     () => [selectedUnitId(), statResolutions[0]] as const,
    //     ([unitId, res]) => {
    //         if (!unitId) return []
    //         return getWithAuth<Entry[]>(
    //             `stats/entries/unit/${unitId}/res/${res}`
    //         )
    //     }
    // )

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
        machineStatsRes,
        // entryStatsRes,
        initialize,
        selectedUnitId,
        setSelectedUnitId,
        selectedWeek,
        setSelectedWeek,
        selectedStatCategory,
        setSelectedStatCategory,
        selectedOperationResolution,
        setSelectedOperationResolution,
        selectedMachineStatisticsOperationResolution,
        setSelectedMachineStatisticsOperationResolution,
        getUnitIndex,
        addUnit,
    }
}

export default createRoot(createDataState)
