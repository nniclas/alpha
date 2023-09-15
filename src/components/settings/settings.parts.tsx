import Text from '../../lib/elements/text/text'
import Field from '../../lib/elements/field/field'
import Button from '../../lib/elements/button/button'
import {
    FiAnchor,
    FiEdit3,
    FiList,
    FiPlusCircle,
    FiSettings,
    FiUser,
    FiUsers,
    FiX,
    FiXCircle,
} from 'solid-icons/fi'
import Modal from '../../lib/components/modal/modal'
import { createEffect, createSignal, onMount } from 'solid-js'
import { Unit } from '../../types/entities/unit'
import Textfield from '../../lib/elements/textfield/textfield'
import { isABtn } from '../../common/utils'
import { v4 as uuidv4 } from 'uuid'
import ConfirmModal from '../confirm-modal/confirm-modal'
import { Transition } from 'solid-transition-group'
import { ButtonGroup } from '../button-group/button-group'
import Shifter from '../shifter/shifter'
import { SelectButton } from '../select-button/select-button'
import as from '../../core/app-store'
import { themes } from '../../common/constants'

const iconStyle = { size: 18, color: 'var(--color-accent)' }

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
    return (
        <Field pmd>
            <Text sm>unit settings</Text>
        </Field>
    )
}
