import {
    FiZap,
    FiZapOff,
    FiTool,
    FiMoon,
    FiLoader,
    FiPower,
    FiX,
} from 'solid-icons/fi'

interface ValueIconPair {
    value: number
    icon: any
}

interface Args {
    value: number
}

export const UnitStateIcon = (a: Args) => {
    const stateIcons: ValueIconPair[] = [
        { value: 1, icon: <FiMoon color='hsl(200, 12%, 62%)' /> },
        { value: 2, icon: <FiPower color='hsl(200, 12%, 62%)' /> },
        { value: 3, icon: <FiLoader color='hsl(200, 12%, 62%)' /> },
        { value: 4, icon: <FiTool color='hsl(200, 12%, 62%)' /> },
        { value: 5, icon: <FiX color='hsl(200, 12%, 62%)' /> },
    ]

    return stateIcons.find((s) => s.value == a.value)?.icon
}
