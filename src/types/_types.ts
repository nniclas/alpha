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

////////////////////////////////////////

export interface Session {
    username: string
    token: string
    user?: User // TODO add from api
}

export type Theme = 'dark' | 'lite'
