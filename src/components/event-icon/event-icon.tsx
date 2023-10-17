import {
    FiShuffle,
    FiBell,
    FiOctagon,
    FiTrello,
    FiAlertCircle,
    FiXCircle,
    FiZap,
    FiEdit2,
    FiEdit,
    FiCornerRightUp,
    FiCheckCircle,
} from 'solid-icons/fi'
import { ValueIconPair } from 'types/_types'

interface Args {
    value: number
}

export const EventIcon = (a: Args) => {
    const iconStyle = { size: 18, color: 'var(--color-dim)' }

    const tagIcons: ValueIconPair[] = [
        { value: 1, icon: <FiCheckCircle {...iconStyle} /> },
        { value: 2, icon: <FiCornerRightUp {...iconStyle} /> },
        { value: 3, icon: <FiEdit {...iconStyle} /> },
        { value: 4, icon: <FiAlertCircle {...iconStyle} /> },
        { value: 5, icon: <FiXCircle {...iconStyle} /> },
    ]

    return tagIcons.find((s) => s.value == a.value)!.icon
}
