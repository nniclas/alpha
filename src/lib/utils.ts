import { ThemeArgs } from './types/theme-args'

export const scopeStyles = (modulesStyles: any, args: any) => {
    if (args == undefined) return ''
    let classes: string[] = []
    for (let k of Object.keys(args)) {
        // make it possible to do: foo={false}
        if (k in modulesStyles && args[k] != false) {
            classes.push(modulesStyles[k])
        }
    }
    return classes.join(' ')
}

export const customStyles = (args: any, styleMap: any[]) => {
    if (args == undefined) return ''
    let styles: string[] = []
    styleMap.forEach((a) => {
        const key = Object.keys(a)[0]
        const value = (args as any)[key]

        if (typeof value === 'undefined') return

        // numbers are single px values
        let styleValue = `${value}px`

        // otherwise any string
        if (isNaN(value)) {
            styleValue = value

            // if _xx its a clean number value (like opacity, z-index etc.)
            if (styleValue.toString().includes('_'))
                styleValue = value.replace('_', '')
        }

        // (booleans are scopeStyles only)
        if (value != undefined && typeof value != 'boolean') {
            styles.push(`${a[key]}:${styleValue}`)
        }
    })

    // also add any styles added with "style" attribute
    let style = ''
    if ((args as any).style != undefined) style = (args as any).style

    return styles.concat(style).join(';')
}

export const hasTheme = (a: ThemeArgs) =>
    a.primary || a.secondary || a.tertiary || a.accent
export const thToStr = (a: ThemeArgs) =>
    a.secondary
        ? 'secondary'
        : a.tertiary
        ? 'tertiary'
        : a.accent
        ? 'accent'
        : 'primary'

export const width = (id: string) => {
    return document.getElementById(id)?.clientWidth
}

// primitive mobile detection
export const isMobile = () => {
    if (
        navigator.userAgent.match(/Android/i) ||
        navigator.userAgent.match(/iPhone/i)
    ) {
        return true
    }
    return false
}

export const isObjectWithProps = (o: any) =>
    typeof o === 'object' && Object.keys(o).length > 0

export const isCompact = (breakPoint = 1400) => {
    return window.innerWidth < breakPoint
}

// merge-function . todo investigate if Object.assign will work here
export const replaceWithLayeredStyles = (original: any, layered: any) => {
    if (layered == undefined) return original
    const result: any = {}
    Object.keys(original).forEach((k) => {
        const lkeys = Object.keys(layered)

        let foundKey = undefined
        lkeys.forEach((lk) => {
            if (lk[0] == k[0] && lk.length == k.length) foundKey = lk
        })

        if (foundKey) result[foundKey] = layered[foundKey]
        else result[k] = original[k]
    })

    // add layered props not existing in original
    Object.keys(layered).forEach((lk) => {
        const okeys = Object.keys(original)
        // append to object
        if (!okeys.includes(lk)) result[lk] = layered[lk]
    })

    return result
}
