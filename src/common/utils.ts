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
