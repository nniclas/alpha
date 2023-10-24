import { Section, Session, Theme } from '../types/_types'
import { createSignal, createRoot, createEffect, onMount } from 'solid-js'
import { setVars } from '../lib/styles/theming/_theming'
import { useNavigate } from '@solidjs/router'
import { checkStylesAndSetCssTheming } from '../common/utils'

function createDataState() {
    // const navigate = useNavigate()

    const [session, setSession] = createSignal<Session>()

    const [theme, setTheme] = createSignal<Theme>('dark')
    const [condensed, setCondensed] = createSignal<boolean>(false)
    const [rounding, setRounding] = createSignal<boolean>(true)
    const [section, setSection] = createSignal<Section>('primary') // main dashboard sections, left/right or top/bottom
    const [showCharts, setShowCharts] = createSignal<boolean>(false)

    // const [week, setWeek] = createSignal<string>('2023-32') ////////////////////////

    createEffect(() => {
        // reassign to data store if browser refreshes
        const username = sessionStorage.getItem('username')
        const token = sessionStorage.getItem('token')
        if (username != null && token != null) {
            setSession({ username: username, token: token })
        }
    })

    onMount(() => {
        checkStylesAndSetCssTheming(() => {
            changeTheme(theme())
            changeCondensed(condensed())
            changeRounding(rounding())
        })
    })

    const updateSession = (token: string, username: string) => {
        sessionStorage.setItem('username', username)
        sessionStorage.setItem('token', token)
        setSession({ username: username, token: token })
    }

    const removeSession = (navOut?: boolean) => {
        sessionStorage.removeItem('username')
        sessionStorage.removeItem('token')

        if (navOut) {
            const navigate = useNavigate()
            navigate('/login', { replace: true })
        }
    }

    const changeTheme = (theme: Theme) => {
        setTheme(theme)
        setVars(theme)
    }

    const changeCondensed = (condensed: boolean) => {
        setCondensed(condensed)
        setVars(condensed ? 'ltcondensed' : 'ltstandard')
    }

    const changeRounding = (rounding: boolean) => {
        setRounding(rounding)
        setVars(rounding ? 'rndon' : 'rndoff')
    }

    return {
        session,
        theme,
        changeTheme,
        condensed,
        changeCondensed,
        rounding,
        changeRounding,
        updateSession,
        removeSession,
        section,
        setSection,
        showCharts,
        setShowCharts,
        // week,
        // setWeek,
    }
}

export default createRoot(createDataState)
