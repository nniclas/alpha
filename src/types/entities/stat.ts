import { Unit } from './unit'
import { User } from './user'

export interface Stat {
    id?: number
    unitId: number
    element: string
    value: number
    date: string

    unit?: Unit
}
