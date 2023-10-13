export const setVars = (theme: string) => {
    const vars = getAllVars()

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

const getAllVars = () =>
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
