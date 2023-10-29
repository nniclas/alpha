////////////////////////////////////////////////////////////////////
// sim functions to give some real time machine data
////////////////////////////////////////////////////////////////////

/**
 * Get signal strength from machine data of unit.
 *
 * @param {number} lastReading Last reading as base value
 * @return {number} The signal strength in percent
 */
export const getSignalStrength = (prev: number): number => {
    let min = prev == 0 ? 80 : prev - 10
    let max = prev == 0 ? 100 : prev + 10
    if (min < 0) min = 0
    if (max > 100) max = 100

    const v = Math.floor(Math.random() * (max - min + 1) + min)

    // console.log(v)
    return v
}

/**
 * Get processor usage from machine data of unit.
 *
 * @param {number} prev Last reading as base value
 * @return {number} The processor usage in percent
 */
export const getProcessorUsage = (prev: number): number => {
    //////////////////////////////////////////
    // todo: make min/max vary based on unitId
    //////////////////////////////////////////

    let min = prev == 0 ? 20 : prev - 10
    let max = prev == 0 ? 90 : prev + 10
    if (min < 0) min = 0
    if (max > 100) max = 100
    return Math.floor(Math.random() * (max - min + 1) + min)
}

/**
 * Get battery level from machine data of unit.
 *
 * @param {number} prev Last reading as base value
 * @return {number} The battery level in percent
 */
export const getBatteryLevel = (prev: number): number => {
    //////////////////////////////////////////
    // todo: make min/max vary based on unitId
    //////////////////////////////////////////

    let min = prev == 0 ? 10 : prev - 10
    let max = prev == 0 ? 90 : prev + 10
    if (min < 0) min = 0
    if (max > 100) max = 100
    return Math.floor(Math.random() * (max - min + 1) + min)
}
