import { IdValuePair, Resolution, Theme, ValueIdTitle } from 'types/_types'

export const themes: Theme[] = ['dark', 'lite']

export const statResolutions: Resolution[] = ['Week', 'Month', 'Quarter']

// export const stateColors: IdValuePair[] = [
//     { id: 1, value: 'rgb(80,80,110)' },
//     { id: 2, value: 'rgb(80,110,80)' },
//     { id: 3, value: 'rgb(80,110,110)' },
//     { id: 4, value: 'rgb(110,80,80)' },
//     { id: 5, value: 'var(--color-middle)' },
// ]

export const trendColors: string[] = [
    'rgb(150,110,110)',
    'rgb(110,130,150)',
    'rgb(110,150,110)',
]

// anyway a maximum of 6 units
export const unitColors: string[] = [
    'rgb(80,80,110)',
    'rgb(80,110,80)',
    'rgb(80,110,110)',
    'rgb(110,80,80)',
    'rgb(110,110,80)',
    'rgb(110,80,110)',
]
export const unitColorsDarker: string[] = [
    'rgb(75,75,105)',
    'rgb(75,105,75)',
    'rgb(75,105,105)',
    'rgb(105,75,75)',
    'rgb(105,105,75)',
    'rgb(105,75,105)',
]

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
