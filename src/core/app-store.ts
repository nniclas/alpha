import { Session, Theme } from '../types/_types'
import { setCondensedAttribute, setThemeAttribute } from '../common/utils'
import { createSignal, createRoot, createEffect } from 'solid-js'
function createDataState() {
    const [session, setSession] = createSignal<Session>()

    const [theme, setTheme] = createSignal<Theme>('dark')
    const [condensed, setCondensed] = createSignal<boolean>(false)
    const [section, setSection] = createSignal<'operation' | 'events'>(
        'operation'
    )
    const [week, setWeek] = createSignal<string>('2023-32') ////////////////////////

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

    const changeTheme = (theme: Theme) => {
        setTheme(theme)
        setThemeAttribute(theme)
    }

    const changeCondensed = (condensed: boolean) => {
        setCondensed(condensed)
        setCondensedAttribute(condensed)
    }

    return {
        session,
        theme,
        changeTheme,
        condensed,
        changeCondensed,
        updateSession,
        removeSession,
        section,
        setSection,
        week,
        setWeek,
    }
}

export default createRoot(createDataState)
