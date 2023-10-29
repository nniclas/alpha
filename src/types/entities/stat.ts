import { Unit } from './unit'

export interface Stat {
    id?: number
    unitId: number
    element: string
    value: number
    date: string

    unit?: Unit
}
