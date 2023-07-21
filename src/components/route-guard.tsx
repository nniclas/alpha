import { Outlet, useNavigate } from '@solidjs/router'
import { createEffect } from 'solid-js'
// import Header from "../components/Header";

/// https://www.thisdot.co/blog/how-to-authenticate-your-solidjs-routes-with-solid-router/

export default function RouteGuard() {
    const navigate = useNavigate()
    const token = sessionStorage.getItem('token')

    createEffect(() => {
        if (!token) {
            navigate('/login', { replace: true })
        }
    })

    return <Outlet />
}
