import { themeVars } from './_imports'

export const setVars = (theme: string) => {
    // const vars = getAllVarsFromDocumentStylesheets()

    // console.log(vars)

    const vars = getRootVars(themeVars)

    // console.log(vars)
    // console.log(vars2)
    // console.log(document.styleSheets[0])

    // ;(document.styleSheets[0] as any).onload = function () {
    //     console.log('hejs')
    //     // Do something interesting; the sheet has been loaded
    // }

    vars.forEach((v: string) => {
        if (v.includes(theme)) {
            const current = v.replace(`${theme}-`, '')
            if (current) {
                var style = getComputedStyle(document.body)
                document.documentElement.style.setProperty(
                    current,
                    style.getPropertyValue(v)
                )
            }
        }
    })
}

const getRootVars = (inlines: string[]) => {
    const list: string[] = []
    inlines.forEach((il: string) => {
        const regex = /--(.*):/g
        const vars = il.match(regex)

        list.push(...vars!.map((v) => v.toString().replace(':', '')))
    })

    return list
}

const getAllVarsFromDocumentStylesheets = () =>
    Array.from(document.styleSheets)
        .filter(
            (sheet) =>
                sheet.href === null ||
                sheet.href.startsWith(window.location.origin)
        )
        .reduce(
            (acc: any, sheet) =>
                (acc = [
                    ...acc,
                    ...Array.from(sheet.cssRules).reduce(
                        (def: any, rule: any) =>
                            (def =
                                rule.selectorText === ':root'
                                    ? [
                                          ...def,
                                          ...Array.from(rule.style).filter(
                                              (name: any) =>
                                                  name.startsWith('--')
                                          ),
                                      ]
                                    : def),
                        []
                    ),
                ]),
            []
        )
