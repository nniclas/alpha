import { subDays, subMinutes } from 'date-fns'
import { randInt } from './utils'
import { date } from './date-utils'

const backToThePast = new Date('2023-08-14')

export const generateSomeStats = (units: number[], count: number) => {
    const elements = ['Battery', 'Signal strength', 'Processor']

    let result = `
    use alpha;
        INSERT INTO 
            stats(unitid, element, value, date) 
        VALUES 
            `

    let someDates = []
    for (let i = 0; i < count; i++)
        someDates.push(
            date(subMinutes(subDays(backToThePast, i), randInt(0, 1440)))
        )

    for (let u of units) {
        for (let e of elements) {
            for (let i = 0; i < count; i++) {
                const value = randInt(30, 90) // completely random here....
                result += `
            (${u}, "${e}", ${value}, "${someDates[i]}")${
                    u != units.length - 1 && i < count - 1 ? ',' : ';'
                } `
            }
        }
    }

    return result
}

export const generateSomeEntries = (
    units: number[],
    users: number[],
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
        use alpha;
        INSERT INTO 
            entries(unitid, userid, event, measure, tag, notes, date) 
        VALUES 
            `

    let someDates = []
    for (let i = 0; i < 30; i++)
        someDates.push(
            date(
                subMinutes(
                    subDays(backToThePast, randInt(0, 60)),
                    randInt(0, 1440)
                )
            )
        )

    for (let i = 0; i < count; i++) {
        const unitid = units[randInt(0, units.length - 1)]

        const useridIndex = randInt(0, users.length * 4)
        const userid =
            useridIndex <= users.length - 1 ? users[useridIndex] : 'NULL'

        const event = randInt(1, 5)

        const measureNr = randInt(1, 12)
        const measure = measureNr <= 3 ? measureNr : 'NULL'

        const tag = randInt(1, 4)

        const notesIndex = randInt(0, someNotes.length * 6)
        const notes =
            notesIndex <= someNotes.length - 1
                ? `"${someNotes[notesIndex]}"`
                : 'NULL'

        const date = someDates[randInt(0, users.length - 1)]

        result += `
            (${unitid}, ${userid}, ${event}, ${measure}, ${tag}, ${notes}, "${date}")${
            i < count - 1 ? ',' : ';'
        } `
    }

    return result
}

//////////////////////////////////////////////////////
/////////////// CONSOLE LOG SQL SCRIPTS (comment/uncomment to run/disable)
//////////////////////////////////////////////////////

console.log(generateSomeStats([1, 2, 3, 4], 30))
//console.log(generateSomeEntries([1, 2, 3, 4], [1, 2, 3], 30))
