import { post } from './api'

export const signIn = async (email: string, password: string) => {
    const token = await post<any>('account/signin', {
        Email: email,
        Password: password,
    })
    if (token) {
        sessionStorage.setItem('token', token)
        return token
    }
}
