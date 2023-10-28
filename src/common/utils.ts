export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

export const isABtn = (target: any) => {
    if (
        target.tagName == 'A' ||
        target.parentElement.tagName == 'A' || // typical span button
        target.parentElement.tagName == 'svg' // if icon button
    )
        return true
    return false
}

export const randInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export const setThemeAttribute = (name: string) => {
    const path = `src/lib/styles/themes/${name}.css`
    document.getElementById('theme')?.setAttribute('href', path)
}

export const setCondensedAttribute = (condensed: boolean) => {
    const path = condensed ? `src/lib/styles/themes/_layout-condensed.css` : ''
    document.getElementById('layout-condensed')?.setAttribute('href', path)
}

export const avg = (values: number[], round = false) => {
    const result = values.reduce((acc, val) => acc + val, 0) / values.length
    return round ? Math.round(result) : result
}

export const capFirst = (str: string) =>
    `${str.charAt(0).toUpperCase()}${str.slice(1)}`

// WORKAROUND TO SET STYLES ON IOS, POLL FOR STYLESHEETS LOADED
let pollTimerId: NodeJS.Timer | undefined
let timerElapsed = 0
export const checkStylesAndSetCssTheming = (action: () => void) => {
    pollTimerId = setInterval(() => {
        timerElapsed++
        if (
            document.styleSheets[0] &&
            document.styleSheets[0].cssRules.length &&
            document.styleSheets[0].cssRules.length > 0
        ) {
            clearInterval(pollTimerId)
            pollTimerId = undefined
            action()
        }
        // better break at some point just in case
        if (timerElapsed > 1000) clearInterval(pollTimerId)
    }, 10)
}
