import { Tag } from 'types/tag'

export const stateTags: Tag[] = [
    { value: 1, name: 'Idle' },
    { value: 2, name: 'Normal operation' },
    { value: 3, name: 'Suspended' },
    { value: 4, name: 'Fault' },
    { value: 5, name: 'Disengaged' },
]

export const entryTags: Tag[] = [
    { value: 1, name: 'PERIODIC_INTEGRITY_CHECK' },
    { value: 2, name: 'MONTHLY_FIELD_TEST' },
    { value: 3, name: 'DEVIATION_IDENTIFIED' },
    { value: 4, name: 'TEMP_LOW' },
]
