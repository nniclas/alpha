import { User } from './entities/user'

export interface ValueIdTitle {
    value: number
    identifier: string
    title: string
}

export interface ValueIconPair {
    value: number
    icon: any
}

export interface IdValuePair {
    id: any
    value: string
}

export interface Session {
    username: string
    token: string
    user?: User
}

export interface StatData {
    data: number[]
    titles: string[]
}

export interface MachineStatData {
    [statData: string]: StatData[]
}

export type Theme = 'dark' | 'lite'
export type Section = 'primary' | 'secondary'

export type StatCategory = 'machine' | 'events'
export type Resolution = 'week' | 'month' | 'quarter'

export type Stats = {
    machine: string[]
    events: string[]
}
