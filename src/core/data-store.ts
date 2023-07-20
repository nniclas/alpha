import { createSignal, createMemo, createRoot } from 'solid-js'
// import { Activity } from 'types/activity'
import { get, post, put, del } from './api'
import { Unit } from 'types/unit'
import { User } from 'types/user'
import { Entry } from 'types/entry'

function createDataState() {
    const [units, setUnits] = createSignal<Unit[]>([])
    const [events, setEvents] = createSignal<Event[]>([])
    const [entries, setEntries] = createSignal<Entry[]>([])
    const [users, setUsers] = createSignal<User[]>([])
    const [selectedUnit, setSelectedUnit] = createSignal<Unit>()

    const getUnits = async () => {
        const units = await get<Unit[]>(`units`)
        setUnits(units)
    }

    const getUnit = async (id: string) => {
        const unit = await get<Unit>(`units/${id}`)

        // first check if existing?????????
        setSelectedUnit(unit)
    }

    // const selectActivity = (id: string) => {
    //     setActivity(activities().find((a) => a.id == id))
    // }

    // const addActivity = async (a: Activity, refetch = true) => {
    //     await addStoredActivity(a).then(() => {
    //         if (refetch) getActivities()
    //     })
    // }

    // const updateActivity = async (a: Activity, refetch = true) => {
    //     await updateStoredActivity(a).then(() => {
    //         if (refetch) getActivities()
    //     })
    // }

    // const deleteActivity = async (id: string, refetch = true) => {
    //     await deleteStoredActivity(id).then(() => {
    //         if (refetch) getActivities()
    //     })
    // }

    return {
        // activities,
        // getActivities,
        // activity,
        // selectActivity,
        // addActivity,
        // updateActivity,
        // deleteActivity,
    }
}

export default createRoot(createDataState)
