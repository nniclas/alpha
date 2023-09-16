import Text from '../../lib/elements/text/text'
import Field from '../../lib/elements/field/field'
import { SelectButton } from '../select-button/select-button'
import as from '../../core/app-store'
import { themes } from '../../common/constants'
import { For, createSignal } from 'solid-js'
import ds from '../../core/data-store'
import Button from '../../lib/elements/button/button'
import { Unit } from 'types/entities/unit'
import Shifter from '../../components/shifter/shifter'
import { Transition } from 'solid-transition-group'
import EditUnit from '../../components/edit-unit/edit-unit'
import { FiPlus } from 'solid-icons/fi'
import Textfield from '../../lib/elements/textfield/textfield'

const iconStyle = { size: 18, color: 'var(--color-accent)' }

export const UserSettings = () => {
    return (
        <Field pmd>
            <Field s secondary pmd col gxs>
                <Field s col w={320}>
                    <Text xs primary>
                        Id
                    </Text>
                    <Textfield
                        xs
                        placeholder='36 letter unique hardware ID'
                        value={as.session()?.username}
                        primary
                        psm
                        color='var(--color-middle)'
                        style='pointer-events:none; user-select:none' // simplify demo
                        // change={(v) => ...}
                    />
                </Field>
                <Field s col w={320}>
                    <Text xs primary>
                        Access
                    </Text>
                    <Textfield
                        xs
                        placeholder='36 letter unique hardware ID'
                        // value={as.session()?.user?.access}
                        value={'READ_WRITE'}
                        primary
                        psm
                        color='var(--color-middle)'
                        style='pointer-events:none; user-select:none' // simplify demo
                        // change={(v) => ...}
                    />
                </Field>
            </Field>
            <Field plg>
                {/* <Shifter>{createPage(unit())}</Shifter> */}
                {/* <Shifter>{createPage(unit())}</Shifter> */}
            </Field>
        </Field>
    )
}

export const AppSettings = () => {
    // console.log(as.condensed())

    return (
        <Field pmd>
            <Field col gmd>
                <Field s col focus pmd>
                    <Text sm>Theme</Text>
                    <Field s psm>
                        <SelectButton
                            value={themes.indexOf(as.theme())}
                            change={(i) => as.changeTheme(themes[i])}
                            w={80}
                            h={40}
                            res={{ w: 120 }}
                        >
                            <Field gsm c>
                                <Text sm res>
                                    Dark
                                </Text>
                            </Field>
                            <Field gsm c>
                                <Text sm res>
                                    Light
                                </Text>
                            </Field>
                        </SelectButton>
                    </Field>
                </Field>
                <Field s col focus pmd>
                    <Text sm>Margins</Text>
                    <Field s psm>
                        <SelectButton
                            value={as.condensed() ? 1 : 0}
                            change={(i) =>
                                as.changeCondensed(i == 0 ? false : true)
                            }
                            w={120}
                            h={40}
                            res={{ w: 120 }}
                        >
                            <Field gsm c>
                                <Text sm res>
                                    Standard
                                </Text>
                            </Field>
                            <Field gsm c>
                                <Text sm res>
                                    Condensed
                                </Text>
                            </Field>
                        </SelectButton>
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
        <Field>
            <Field s secondary pmd col gxs>
                <For each={ds.unitsRes()}>
                    {(u, i) => {
                        const sel = (u: Unit) =>
                            ds.unitsRes()?.indexOf(u!) == i()

                        return (
                            <Button
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
            <Field>
                {/* <Shifter>{createPage(unit())}</Shifter> */}
                <Shifter>{createPage(unit())}</Shifter>
            </Field>
        </Field>
    )
}
