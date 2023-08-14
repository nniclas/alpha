import { format, parseISO } from 'date-fns'

const DATEFORMAT = 'dd-MM-yyyy HH:mm'

export const date = (): string => format(new Date(), DATEFORMAT).toString()
