import { randInt } from './utils'

let timer: NodeJS.Timer | undefined = undefined
let slowTimer: NodeJS.Timer | undefined = undefined

export const tick = (actions: (() => void)[], shuffle = true, slow = false) => {
    // first clear
    if (slow) clearInterval(slowTimer)
    else clearInterval(timer)

    // then start new
    const t = setInterval(
        () => {
            actions.forEach((a, i) => {
                setTimeout(() => a(), shuffle ? randInt(0, 500) : 0)
            })
        },
        slow ? 2000 : 1000
    )

    if (slow) slowTimer = t
    else timer = t
}

export const clear = () => {
    clearInterval(timer)
    clearInterval(slowTimer)
    timer = undefined
    slowTimer = undefined
}
