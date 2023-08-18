import { Size } from './types'

// predefined sizes handling, good with responsive designs
export const FIELD_XS = 200
export const FIELD_SM = 400
export const FIELD_MD = 600
export const FIELD_LG = 800
export const FIELD_XL = 1000

export interface FieldArgs {
    rel?: boolean // relative
    layer?: boolean // absolute
    trim?: boolean // of hidden
    s?: boolean // separate: exclude from flex calc
    col?: boolean // flex column
    c?: boolean // center horizontal and vertical
    jcs?: boolean // justify content
    jcc?: boolean
    jce?: boolean
    ais?: boolean // align items
    aic?: boolean
    aie?: boolean
    gxs?: boolean // gap
    gsm?: boolean
    gmd?: boolean
    glg?: boolean
    pxs?: boolean // padding
    psm?: boolean
    pmd?: boolean
    plg?: boolean
    pxl?: boolean
    br?: boolean // border-radius

    w?: number | string | Size // width:
    h?: number | string | Size // height: ;
    p?: number | string // padding

    bg?: string

    // bt?: string // border-top
    // bl?: string // border-left
}
