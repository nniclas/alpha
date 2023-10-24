import './_imports' // load all base imports
import { themeVars } from './_imports'

export const setVars = (theme: string) => {
    const vars = getAllVarsFromDocumentStylesheets()

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

// wip - experimental
const getRootVars = (inlines: string[]) => {
    const list: string[] = []
    inlines.forEach((il: string) => {
        //const regex = /--(.*):/g
        // var result = il.match(/(?<=--\s+).*?(?=\s+:)/gs)
        // const vars = il.match(regex)
        // list.push(...vars!.map((v) => v.toString().replace(':', '')))
        const matches = il.matchAll(/--(.*?):/g)
        list.push(...Array.from(matches, (x) => `--${x[1]}`))
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
