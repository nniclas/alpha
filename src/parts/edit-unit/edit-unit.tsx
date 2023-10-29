import Text from '../../lib/elements/text/text'
import Field from '../../lib/elements/field/field'
import Button from '../../lib/elements/button/button'
import { FiTrash2 } from 'solid-icons/fi'
import Modal from '../../lib/components/modal/modal'
import { createEffect, createSignal } from 'solid-js'
import { Unit } from '../../types/entities/unit'
import Textfield from '../../lib/elements/textfield/textfield'
import { isABtn } from '../../common/utils'
import { v4 as uuidv4 } from 'uuid'
import { Transition } from 'solid-transition-group'
import ConfirmModal from '../../components/confirm-modal/confirm-modal'
import ds from '../../core/data-store'

interface Args {
    unit?: Unit
}

const iconStyle = { size: 18, color: 'var(--color-strong)' }

export default (a: Args) => {
    const [action, setAction] = createSignal<'edit' | 'add'>(
        a.unit ? 'edit' : 'add'
    )
    const [isUnitChanged, setIsUnitChanged] = createSignal<boolean>(false)
    const [unit, setUnit] = createSignal<Unit>(
        a.unit ?? {
            name: 'New unit',
            machineId: uuidv4(),
            state: 0,
        }
    )

    createEffect(() => {
        setIsUnitChanged(JSON.stringify(a.unit) != JSON.stringify(unit()))
    })

    return (
        <Field
            rel
            res={{ s: false, w: 'auto', h: 'auto' }}
            secondary
            onClick={(e: any) => {
                if (!isABtn(e.target)) e.stopPropagation()
            }}
        >
            <Field a col pmd>
                <Transition name='fade'>
                    <Field a col gsm>
                        <Field s h={32}>
                            <Field s>
                                {isUnitChanged() ? (
                                    <Field s gsm c>
                                        <Text
                                            lg
                                            accent
                                            style='margin-top: -6px'
                                        >
                                            •
                                        </Text>
                                        {action() == 'add' && (
                                            <Field>
                                                <Text accent>NEW</Text>
                                            </Field>
                                        )}
                                    </Field>
                                ) : (
                                    <></>
                                )}
                            </Field>
                        </Field>

                        <Field s col gmd res={{ c: true }}>
                            <Field s col w={320} gxs>
                                <Text xs primary>
                                    Machine ID
                                </Text>
                                <Textfield
                                    primary
                                    md
                                    psm
                                    placeholder='36 letter unique hardware ID'
                                    value={unit().machineId}
                                    color='var(--color-middle)'
                                    style='pointer-events:none; user-select:none' // simplify demo
                                    // change={(v) => ...}
                                />
                            </Field>
                            <Field s col w={320} gxs>
                                <Text xs primary>
                                    Name
                                </Text>
                                <Textfield
                                    primary
                                    md
                                    psm
                                    placeholder='Unit name'
                                    value={unit().name}
                                    color='var(--color-middle)'
                                    change={(v) => {
                                        const u = { ...unit() }
                                        u.name = v
                                        setUnit(u)
                                    }}
                                    error={unit().name.length == 0}
                                />
                            </Field>
                        </Field>

                        <Field aie gsm jce pmd>
                            {action() == 'edit' && (
                                <Modal
                                    s
                                    c
                                    buttonContent={
                                        <Field s bg='var(--color-error)' psm>
                                            <FiTrash2 {...iconStyle} />
                                        </Field>
                                    }
                                    buttonArgs={{ primary: true }}
                                >
                                    <ConfirmModal
                                        header='Delete unit?'
                                        confirmAction={() => {
                                            ds.deleteUnit(unit()!)
                                        }}
                                    />
                                </Modal>
                            )}

                            <Button
                                tertiary
                                md
                                onClick={(e) => {
                                    if (action() == 'add') ds.addUnit(unit())
                                    if (action() == 'edit')
                                        ds.updateUnit(unit())
                                }}
                            >
                                <Text primary xs>
                                    {action() == 'edit' ? 'save' : 'add'}
                                </Text>
                            </Button>
                        </Field>
                    </Field>
                </Transition>
            </Field>
        </Field>
    )
}
