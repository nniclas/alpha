export interface TextFieldArgs {
    value?: string | number | boolean
    multiline?: boolean
    w?: number | string
    color?: string
    placeholder?: string
    password?: boolean
    bg?: string

    pxs?: boolean // padding
    psm?: boolean
    pmd?: boolean
    plg?: boolean
    pxl?: boolean

    change?: (val: string) => void
}
