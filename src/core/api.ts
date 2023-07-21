import axios, { AxiosError, ResponseType } from 'axios'

const authHeaders = () => {
    return {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    }
}

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_ENDPOINT,
})

console.log(import.meta.env.VITE_API_ENDPOINT)

export const get = async <T>(path: string, auth?: boolean): Promise<T> => {
    return await instance
        .get(`${path}`, {
            // params: params,
            headers: auth ? authHeaders() : {},
        })
        .then((result) => {
            return result.data
        })
        .catch((error: AxiosError) => {
            console.log(error)
        })
}

export const post = async <T>(path: string, data: T): Promise<T> => {
    return await instance
        .post(`${path}`, data, {
            headers: authHeaders(),
        })
        .then((result) => {
            return result.data
        })
        .catch((error: AxiosError) => {
            console.log(error)
        })
}

export const put = async <T>(path: string, data: T): Promise<T> => {
    return await instance
        .put(`${path}`, data, {
            headers: authHeaders(),
        })
        .then((result) => {
            return result.data
        })
        .catch((error: AxiosError) => {
            console.log(error)
        })
}

export const del = async (path: string): Promise<any> => {
    return await instance
        .delete(`${path}`, {
            headers: authHeaders(),
        })
        .then((result) => {
            return result.data
        })
        .catch((error: AxiosError) => {
            console.log(error)
        })
}

// // Add a request interceptor
// axios.interceptors.request.use(
//     function (config) {
//         // Do something before request is sent
//         // console.log(config)
//         return config
//     },
//     function (error) {
//         // Do something with request error
//         return Promise.reject(error)
//     }
// )

// // Add a response interceptor
// axios.interceptors.response.use(
//     function (response) {
//         // Do something with response data
//         return response
//     },
//     function (error) {
//         // Do something with response error
//         return Promise.reject(error)
//     }
// )
