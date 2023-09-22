////////////////////////////////////////////////////////////////////////////////////////////////////
// Simulation demo functions to provide real time ready machine data
////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Get signal strength from machine data of unit.
 *
 * @param {number} lastReading Last reading as base value
 * @return {number} The signal strength in percent
 */
export const getSignalStrength = (lastReading: number) => {
    let min = lastReading == 0 ? 80 : lastReading - 10
    let max = lastReading == 0 ? 100 : lastReading + 10
    if (min < 0) min = 0
    if (max > 100) max = 100

    const v = Math.floor(Math.random() * (max - min + 1) + min)

    // console.log(v)
    return v
}

/**
 * Get processor usage from machine data of unit.
 *
 * @param {number} lastReading Last reading as base value
 * @return {number} The processor usage in percent
 */
export const getProcessorUsage = (lastReading: number) => {
    //////////////////////////////////////////
    // todo: make min/max vary based on unitId
    //////////////////////////////////////////

    let min = lastReading == 0 ? 20 : lastReading - 10
    let max = lastReading == 0 ? 90 : lastReading + 10
    if (min < 0) min = 0
    if (max > 100) max = 100
    return Math.floor(Math.random() * (max - min + 1) + min)
}

/**
 * Get battery level from machine data of unit.
 *
 * @param {number} lastReading Last reading as base value
 * @return {number} The battery level in percent
 */
export const getBatteryLevel = (lastReading: number) => {
    //////////////////////////////////////////
    // todo: make min/max vary based on unitId
    //////////////////////////////////////////

    let min = lastReading == 0 ? 10 : lastReading - 10
    let max = lastReading == 0 ? 90 : lastReading + 10
    if (min < 0) min = 0
    if (max > 100) max = 100
    return Math.floor(Math.random() * (max - min + 1) + min)
}
