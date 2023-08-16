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

const color = { color: 'var(--color-lighter)' }

export const UnitStateIcon = (a: Args) => {
    const stateIcons: ValueIconPair[] = [
        { value: 1, icon: <FiMoon {...color} /> },
        { value: 2, icon: <FiPower {...color} /> },
        { value: 3, icon: <FiLoader {...color} /> },
        { value: 4, icon: <FiTool {...color} /> },
        { value: 5, icon: <FiX {...color} /> },
    ]

    return stateIcons.find((s) => s.value == a.value)?.icon
}
