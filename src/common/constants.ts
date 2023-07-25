import { ValueIdTitle } from 'types/_types'

// names in default EN

export const states: ValueIdTitle[] = [
    { value: 1, identifier: 'IDLE', title: 'Idle' },
    { value: 2, identifier: 'NORMAL_OPERATION', title: 'Normal operation' },
    { value: 3, identifier: 'SUSPENDED', title: 'Suspended' },
    { value: 4, identifier: 'FAULT', title: 'Fault' },
    { value: 5, identifier: 'DISENGAGED', title: 'Disengaged' },
]

export const measures: ValueIdTitle[] = [
    { value: 1, identifier: 'IGNORE', title: 'Ignore' },
    { value: 2, identifier: 'FOLLOW_UP', title: 'Follow up' },
    { value: 3, identifier: 'RESTORE', title: 'Restore' },
]

export const tags: ValueIdTitle[] = [
    {
        value: 1,
        identifier: 'PERIODIC_INTEGRITY_CHECK',
        title: 'Periodic integrity check',
    },
    { value: 2, identifier: 'MONTHLY_FIELD_TEST', title: 'Monthly field test' },
    {
        value: 3,
        identifier: 'DEVIATION_IDENTIFIED',
        title: 'Deviation identified',
    },
    { value: 4, identifier: 'TEMP_LOW', title: 'Temperature alarm' },
]

export const events: ValueIdTitle[] = [
    { value: 1, identifier: 'ROUTINE', title: 'Routine' },
    { value: 2, identifier: 'UPGRADE', title: 'Upgrade' },
    { value: 3, identifier: 'REPORT', title: 'Report' },
    { value: 4, identifier: 'ALERT', title: 'Alert' },
    { value: 5, identifier: 'CRITICAL', title: 'Critical' },
]
