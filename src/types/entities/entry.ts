import { Unit } from './unit'
import { User } from './user'

export interface Entry {
    id?: number
    unitId: number
    userId: number
    event: number
    measure: number
    tag: number
    notes?: string
    date: string

    user?: User
    unit?: Unit
}
