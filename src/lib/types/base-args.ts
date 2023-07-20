export interface BaseArgs {
    style?: any
    class?: string
    children?: any
    id?: string

    onClick?: (e: MouseEvent) => void
    onScroll?: (e: Event) => void
    onResize?: (e: any) => void

    onPointerDown?: (e: PointerEvent) => void
    onPointerUp?: (e: PointerEvent) => void
    onPointerMove?: (e: PointerEvent) => void

    // responsive, if enabled (boolean only): .res styles will be applied according to rules in .res media queries
    //             if object is provied: apply these settings in compact mode
    res?: boolean | any
}
