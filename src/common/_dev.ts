import { subDays, subMinutes } from 'date-fns'
import { randInt } from './utils'
import { date } from './date-utils'

export const generateSomeEntries = (
    unitIds: number[],
    userIds: number[],
    count: number
) => {
    const someNotes = [
        'Lorem ipsum',
        'dolor sit amet',
        'consectetur adipiscing elit, sed do eiusmod tempor incididunt',
        'ut labore et dolore magna aliqua',
        'Ut enim ad minim',
        'veniam',
        'quis nostrud exercitation ullamco laboris',
        'nisi ut aliquip ex ea commodo consequat',
    ]

    let result = `
        INSERT INTO 
            entries(unitid, userid, event, measure, tag, notes, date) 
        VALUES 
            `

    let someDates = []
    const today = new Date()
    for (let i = 0; i < 30; i++)
        someDates.push(
            date(subMinutes(subDays(today, randInt(0, 60)), randInt(0, 1440)))
        )

    for (let i = 0; i < count; i++) {
        const unitid = unitIds[randInt(0, unitIds.length - 1)]

        const useridIndex = randInt(0, userIds.length * 4)
        const userid =
            useridIndex <= userIds.length - 1 ? userIds[useridIndex] : 'NULL'

        const event = randInt(1, 5)

        const measureNr = randInt(1, 12)
        const measure = measureNr <= 3 ? measureNr : 'NULL'

        const tag = randInt(1, 4)

        const notesIndex = randInt(0, someNotes.length * 6)
        const notes =
            notesIndex <= someNotes.length - 1 ? someNotes[notesIndex] : 'NULL'

        const date = someDates[randInt(0, unitIds.length - 1)]

        result += `
        (${unitid}, ${userid}, ${event}, ${measure}, ${tag}, "${notes}", "${date}")${
            i < count - 1 ? ',' : ';'
        } `
    }

    return result
}

//////////////////////////////////////////////////////
/////////////// CONSOLE LOG SQL SCRIPTS (comment/uncomment to run/disable)
//////////////////////////////////////////////////////

// console.log(generateSomeEntries([1, 2, 3, 4], [1, 2, 3], 30))
