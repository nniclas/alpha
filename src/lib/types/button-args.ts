export interface ButtonArgs {
    sm?: boolean
    md?: boolean
    lg?: boolean
    br?: boolean

    o?: string // opacity
    bb?: string // border-bottom
    w?: number | string // width:
    h?: number | string // height:
    p?: number | string // padding

    span?: boolean // special prop, include in flex calc (since button has default flex none)

    bg?: string // background override
}
