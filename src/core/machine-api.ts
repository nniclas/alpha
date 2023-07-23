////////////////////////////////////////////////////////////////////////////////////////////////////
// This is (to no surprise) simulated functions to return and represent real time ready machine data
////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Get signal strength from machine data of unit.
 *
 * @param {number} unitId The id of a unit
 * @return {number} The signal strength in percent
 */
export const getSignalStrength = (unitId: number, lastReading: number) => {
    //////////////////////////////////////////
    // todo: make min/max vary based on unitId
    //////////////////////////////////////////

    const min = lastReading == 0 ? 80 : lastReading - 3
    const max = lastReading == 0 ? 100 : lastReading + 3
    return Math.floor(Math.random() * (max - min + 1) + min)
}

/**
 * Get processor usage from machine data of unit.
 *
 * @param {number} unitId The id of a unit
 * @return {number} The processor usage in percent
 */
export const getProcessorUsage = (unitId: number, lastReading: number) => {
    //////////////////////////////////////////
    // todo: make min/max vary based on unitId
    //////////////////////////////////////////

    const min = lastReading == 0 ? 20 : lastReading - 3
    const max = lastReading == 0 ? 90 : lastReading + 3
    return Math.floor(Math.random() * (max - min + 1) + min)
}

/**
 * Get battery level from machine data of unit.
 *
 * @param {number} unitId The id of a unit
 * @return {number} The battery level in percent
 */
export const getBatteryLevel = (unitId: number, lastReading: number) => {
    //////////////////////////////////////////
    // todo: make min/max vary based on unitId
    //////////////////////////////////////////

    const min = lastReading == 0 ? 40 : lastReading - 3
    const max = lastReading == 0 ? 80 : lastReading + 3
    return Math.floor(Math.random() * (max - min + 1) + min)
}
