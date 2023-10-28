import {
    IdValuePair,
    Resolution,
    StatCategory,
    Theme,
    ValueIdTitle,
} from 'types/_types'

export const themes: Theme[] = ['dark', 'lite']

export const stats = {
    machine: ['Battery', 'Signal', 'Processor'],
    events: null, // todo view multiple event params
}

export const statResolutions: Resolution[] = ['week', 'month', 'quarter']

export const trendColors: string[] = [
    'rgb(150,110,110)',
    'rgb(110,130,150)',
    'rgb(110,150,110)',
]

// anyway a maximum of 6 units (demo purpose)
export const unitColors: string[] = [
    'rgb(80,80,110)',
    'rgb(80,110,80)',
    'rgb(80,110,110)',
    'rgb(110,80,80)',
    'rgb(110,110,80)',
    'rgb(110,80,110)',
]
// anyway a maximum of 6 units (demo purpose)
export const unitColorsDarker: string[] = [
    'rgb(60,60,90)',
    'rgb(60,90,60)',
    'rgb(60,90,90)',
    'rgb(90,60,60)',
    'rgb(90,90,60)',
    'rgb(90,60,90)',
]

export const brl =
    'border-top-left-radius:var(--rounding); border-bottom-left-radius:var(--rounding);'
export const brr =
    'border-top-right-radius:var(--rounding); border-bottom-right-radius:var(--rounding);'

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
