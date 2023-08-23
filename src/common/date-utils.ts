import { format, parseISO, getISOWeek, getYear } from 'date-fns'

const DATEFORMAT = 'dd-MM-yyyy HH:mm'
const WEEKFORMAT = '{y}-{w}'
const WEEKDISPLAYFORMAT = 'w {w}'

export const date = (d?: string | Date): string =>
    d
        ? format(typeof d === 'string' ? parseISO(d) : d, DATEFORMAT)
        : format(new Date(), DATEFORMAT).toString()

export const week = (d?: string, display = false): string => {
    const dp = parseISO(d!)
    const y = getYear(dp)
    const isoWeek = getISOWeek(dp)

    const w = WEEKFORMAT.replace('{y}', `${y}`).replace('{w}', `${isoWeek}`)
    if (display) return displayWeek(w)
    return w
}

export const displayWeek = (w: string): string => {
    const yw = w.split('-')
    return WEEKDISPLAYFORMAT.replace('{y}', `${yw[0]}`).replace(
        '{w}',
        `${yw[1]}`
    )
}
