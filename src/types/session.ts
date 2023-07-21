import { User } from './entities/user'

export interface Session {
    username: string
    token: string
}
