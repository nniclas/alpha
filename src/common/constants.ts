import { ValueNamePair } from 'types/_types'

export const stateTags: ValueNamePair[] = [
    { value: 1, name: 'Idle' },
    { value: 2, name: 'Normal operation' },
    { value: 3, name: 'Suspended' },
    { value: 4, name: 'Fault' },
    { value: 5, name: 'Disengaged' },
]

export const entryTags: ValueNamePair[] = [
    { value: 1, name: 'PERIODIC_INTEGRITY_CHECK' },
    { value: 2, name: 'MONTHLY_FIELD_TEST' },
    { value: 3, name: 'DEVIATION_IDENTIFIED' },
    { value: 4, name: 'TEMP_LOW' },
]

export const eventTags: ValueNamePair[] = [
    { value: 1, name: 'Routine' },
    { value: 2, name: 'Upgrade' },
    { value: 3, name: 'Report' },
    { value: 4, name: 'Alert' },
    { value: 5, name: 'Critical' },
]
