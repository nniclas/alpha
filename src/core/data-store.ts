import {
    createSignal,
    createRoot,
    createEffect,
    createResource,
} from 'solid-js'
import { get, post, put, del } from './api'
import { Unit } from 'types/entities/unit'
import { Entry } from 'types/entities/entry'
import appStore from './app-store'
import { delay } from '../common/utils'
import { stats } from '../common/constants'
import { Resolution, StatCategory } from 'types/_types'

const getWithAuth = async <T>(path: string, simDelay = true): Promise<T> => {
    if (simDelay) await delay(500) // intentional additional delay for demo purposes

    if (!appStore.session()?.token) return [] as any

    return await get<T>(path, true)
}

const addItem = async <T>(
    item: T,
    path: string,
    refetch?: () => void
): Promise<T> => {
    const addedItem = await post<T>(path, item)
    refetch?.()
    return addedItem
}

const updateItem = async <T>(
    item: T,
    path: string,
    refetch?: () => void
): Promise<T> => {
    const updatedItem = await put<T>(path, item)
    refetch?.()
    return updatedItem
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
    const [
        selectedMachineStatisticsElement,
        setSelectedMachineStatisticsElement,
    ] = createSignal<string>(stats.machine[0])
    const [
        selectedMachineStatisticsResolution,
        setSelectedMachineStatisticsResolution,
    ] = createSignal<Resolution>('month')
    const [
        selectedEventsStatisticsResolution,
        setSelectedEventsStatisticsResolution,
    ] = createSignal<Resolution>('quarter')

    createEffect(() => {})

    const initialize = async () => {
        if (!appStore.session()?.token) return [] as any

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
            return await getWithAuth<Unit[]>('units')
        }
    )

    const [selectedUnitRes] = createResource<Unit, number>(
        selectedUnitId,
        (id) => getWithAuth<Unit>(`units/${id}`)
    )

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
            [selectedUnitId(), selectedMachineStatisticsResolution()] as const,
        async ([unitId, res]) => {
            if (!unitId) return []
            return await getWithAuth<any>(
                `stats/machine/unit/${unitId}/res/${res}`,
                false
            )
        }
    )

    const [entryStatsRes] = createResource(
        () => [selectedUnitId(), selectedEventsStatisticsResolution()] as const,
        async ([unitId, res]) => {
            if (!unitId) return []
            return await getWithAuth<any>(
                `stats/entries/unit/${unitId}/res/${res}`,
                false
            )
        }
    )

    const addUnit = async (u: Unit) => {
        const addedUnit = await addItem<Unit>(u, 'units')
        await unitsResActions.refetch()
        setSelectedUnitId(addedUnit.id)
    }

    const updateUnit = async (u: Unit) => {
        await updateItem<Unit>(u, `units/${u.id}`)
        await unitsResActions.refetch()
    }

    const deleteUnit = async (u: Unit) => {
        await deleteItem(`units/${u.id}`)
        await unitsResActions.refetch()
        setSelectedUnitId(unitsRes()![0].id)
    }

    /////// WIP
    const addEntry = async (e: Entry) => {
        await addItem<Entry>(e, 'entries')
        // refresh here? update units resource
    }

    /////// WIP
    const updateEntry = async (e: Entry) => {
        await updateItem<Entry>(e, `entries/${e.id}`)
    }

    /////// WIP
    const deleteEntry = async (e: Entry) => {
        await deleteItem(`entries/${e.id}`)
    }

    const getUnitIndex = (unitId?: number) => {
        if (!unitsRes()) return 0

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
        entryStatsRes,
        initialize,
        selectedUnitId,
        setSelectedUnitId,
        selectedWeek,
        setSelectedWeek,
        selectedStatCategory,
        setSelectedStatCategory,
        selectedMachineStatisticsElement,
        setSelectedMachineStatisticsElement,
        selectedMachineStatisticsResolution,
        setSelectedMachineStatisticsResolution,
        selectedEventsStatisticsResolution,
        setSelectedEventsStatisticsResolution,
        getUnitIndex,
        addUnit,
        updateUnit,
        deleteUnit,
        addEntry,
        updateEntry,
        deleteEntry,
    }
}

export default createRoot(createDataState)
