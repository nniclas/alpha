import { format, parseISO } from 'date-fns'

const DATEFORMAT = 'dd-MM-yyyy HH:mm'

export const date = (d?: string): string =>
    d
        ? format(parseISO(d), DATEFORMAT)
        : format(new Date(), DATEFORMAT).toString()
