import {
    FiZap,
    FiZapOff,
    FiTool,
    FiMoon,
    FiLoader,
    FiPower,
    FiX,
} from 'solid-icons/fi'

interface StateIconPair {
    value: number
    icon: any
}

interface Args {
    state: number
}

export const StateIcon = (a: Args) => {
    const stateIcons: StateIconPair[] = [
        { value: 1, icon: <FiMoon color='hsl(200, 12%, 62%)' /> },
        { value: 2, icon: <FiPower color='hsl(200, 12%, 62%)' /> },
        { value: 3, icon: <FiLoader color='hsl(200, 12%, 62%)' /> },
        { value: 4, icon: <FiTool color='hsl(200, 12%, 62%)' /> },
        { value: 5, icon: <FiX color='hsl(200, 12%, 62%)' /> },
    ]

    return stateIcons.find((s) => s.value == a.state)?.icon
}
