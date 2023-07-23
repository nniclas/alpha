import { createSignal, createRoot, createEffect } from 'solid-js'
import { Session } from 'types/session'
function createDataState() {
    const [session, setSession] = createSignal<Session>()
    const [section, setSection] = createSignal<'operation' | 'actions'>(
        'operation'
    )

    createEffect(() => {
        // reassign to data store if browser refreshes
        const username = sessionStorage.getItem('username')
        const token = sessionStorage.getItem('token')
        if (username != null && token != null) {
            setSession({ username: username, token: token })
        }
    })

    const updateSession = (token: string, username: string) => {
        sessionStorage.setItem('username', username)
        sessionStorage.setItem('token', token)
        setSession({ username: username, token: token })
    }

    const removeSession = () => {
        sessionStorage.removeItem('username')
        sessionStorage.removeItem('token')
    }

    return {
        session,
        updateSession,
        removeSession,
        section,
        setSection,
    }
}

export default createRoot(createDataState)
