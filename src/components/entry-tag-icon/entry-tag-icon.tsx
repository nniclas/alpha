import { FiShuffle, FiBell, FiOctagon, FiTrello } from 'solid-icons/fi'

interface ValueIconPair {
    value: number
    icon: any
}

interface Args {
    value: number
}

const iconStyle = { size: 18, color: 'var(--color-accent)' }

export const EntryTagIcon = (a: Args) => {
    const tagIcons: ValueIconPair[] = [
        { value: 1, icon: <FiShuffle {...iconStyle} /> },
        { value: 2, icon: <FiBell {...iconStyle} /> },
        { value: 3, icon: <FiOctagon {...iconStyle} /> },
        { value: 4, icon: <FiTrello {...iconStyle} /> },
    ]

    return tagIcons.find((s) => s.value == a.value)!.icon
}
