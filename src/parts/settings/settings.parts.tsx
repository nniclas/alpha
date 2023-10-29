import Text from '../../lib/elements/text/text'
import Field from '../../lib/elements/field/field'
import as from '../../core/app-store'
import { themes } from '../../common/constants'
import { For, createSignal } from 'solid-js'
import ds from '../../core/data-store'
import Button from '../../lib/elements/button/button'
import { Unit } from 'types/entities/unit'
import Shifter from '../../components/shifter/shifter'
import { FiPlus } from 'solid-icons/fi'
import Textfield from '../../lib/elements/textfield/textfield'
import { SelectButton } from '../../components/select-button/select-button'
import EditUnit from '../../parts/edit-unit/edit-unit'

const iconStyle = { size: 18, color: 'var(--color-middle)' }

export const AppSettings = () => {
    return (
        <Field pmd>
            <Field col gmd>
                <Field s col primary pmd br>
                    <Text sm>Theme</Text>
                    <Field s psm>
                        <SelectButton
                            primary
                            value={themes.indexOf(as.theme())}
                            change={(i) => as.changeTheme(themes[i])}
                            w={80}
                            h={40}
                        >
                            <Text sm res>
                                Dark
                            </Text>

                            <Text sm res>
                                Lite
                            </Text>
                        </SelectButton>
                    </Field>
                </Field>
                <Field res={{ col: true }} primary br>
                    <Field s col pmd>
                        <Text sm>Margins</Text>
                        <Field s psm>
                            <SelectButton
                                primary
                                value={as.condensed() ? 1 : 0}
                                change={(i) =>
                                    as.changeCondensed(i == 0 ? false : true)
                                }
                                w={120}
                                h={40}
                            >
                                <Text sm res>
                                    Standard
                                </Text>

                                <Text sm res>
                                    Condensed
                                </Text>
                            </SelectButton>
                        </Field>
                    </Field>
                    <Field s col primary pmd br>
                        <Text sm>Rounding</Text>
                        <Field s psm>
                            <SelectButton
                                primary
                                value={as.rounding() ? 0 : 1}
                                change={(i) =>
                                    as.changeRounding(i == 0 ? true : false)
                                }
                                w={120}
                                h={40}
                            >
                                <Text sm res>
                                    Enabled
                                </Text>

                                <Text sm res>
                                    Disabled
                                </Text>
                            </SelectButton>
                        </Field>
                    </Field>
                </Field>
            </Field>
        </Field>
    )
}

export const UnitSettings = () => {
    const [unit, setUnit] = createSignal<Unit | undefined>(ds.unitsRes()?.[0])

    const createPage = (u: Unit | undefined) => <EditUnit unit={u} />

    return (
        <Field res={{ col: true }} style='overflow: scroll'>
            <Field s secondary plg col gxs aic>
                <For each={ds.unitsRes()}>
                    {(u, i) => {
                        const sel = (u: Unit) =>
                            ds.unitsRes()?.indexOf(u!) == i()

                        return (
                            <Button
                                br
                                a
                                secondary
                                tertiary={sel(unit()!)}
                                md
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setUnit(u)
                                }}
                            >
                                <Text accent>{u.name}</Text>
                            </Button>
                        )
                    }}
                </For>
                <Field aie>
                    <Button
                        br
                        a
                        tertiary
                        md
                        onClick={(e) => {
                            e.stopPropagation()
                            setUnit(undefined)
                        }}
                    >
                        <FiPlus {...iconStyle} />
                    </Button>
                </Field>
            </Field>
            <Field res={{ s: true, h: 400 }}>
                <Shifter>{createPage(unit())}</Shifter>
            </Field>
        </Field>
    )
}

export const UserSettings = () => {
    return (
        <Field pmd res={{ jcc: true }}>
            <Field s secondary pmd col gmd>
                <Field s col w={240} gxs>
                    <Text xs primary>
                        Id
                    </Text>
                    <Textfield
                        md
                        placeholder='36 letter unique hardware ID'
                        value={as.session()?.username}
                        primary
                        psm
                        color='var(--color-middle)'
                        style='pointer-events:none; user-select:none' // simplify demo
                    />
                </Field>
                <Field s col w={240} gxs>
                    <Text xs primary>
                        Access
                    </Text>
                    <Textfield
                        md
                        placeholder='36 letter unique hardware ID'
                        value={'READ_WRITE'}
                        primary
                        psm
                        color='var(--color-middle)'
                        style='pointer-events:none; user-select:none' // simplify demo
                        // change={(v) => ...}
                    />
                </Field>
            </Field>
        </Field>
    )
}
