import { Outlet, useNavigate } from '@solidjs/router'
import { createEffect } from 'solid-js'
import appStore from '../core/app-store'
// import Header from "../components/Header";

/// https://www.thisdot.co/blog/how-to-authenticate-your-solidjs-routes-with-solid-router/

export default function RouteGuard() {
    const navigate = useNavigate()

    createEffect(() => {
        if (!appStore.session()?.token) {
            navigate('/login', { replace: true })
        }
    })

    return <Outlet />
}
