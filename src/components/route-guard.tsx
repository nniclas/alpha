import { Outlet, useNavigate } from '@solidjs/router'
import { createEffect } from 'solid-js'
import appStore from '../core/app-store'

export default function RouteGuard() {
    const navigate = useNavigate()

    createEffect(() => {
        if (!appStore.session()?.token) {
            navigate('/login', { replace: true })
        }
    })

    return <Outlet />
}
