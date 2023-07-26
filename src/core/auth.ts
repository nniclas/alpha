import { post } from './api'
import appStore from '../core/app-store'
import { delay } from '../common/utils'

export const signIn = async (email: string, password: string) => {
    const token = await post<any>('account/signin', {
        Email: email,
        Password: password,
    })

    if (token) {
        appStore.updateSession(token, email)
        return token
    }
}
