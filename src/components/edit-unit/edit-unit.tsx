import Text from '../../lib/elements/text/text'
import Field from '../../lib/elements/field/field'
import Button from '../../lib/elements/button/button'
import { FiTrash, FiTrash2, FiX, FiXCircle } from 'solid-icons/fi'
import Modal from '../../lib/components/modal/modal'
import { createEffect, createSignal, onMount } from 'solid-js'
import { Unit } from '../../types/entities/unit'
import Textfield from '../../lib/elements/textfield/textfield'
import { isABtn } from '../../common/utils'
import { v4 as uuidv4 } from 'uuid'
import ConfirmModal from '../confirm-modal/confirm-modal'
import { Transition } from 'solid-transition-group'

interface Args {
    unit?: Unit
}

const iconStyle = { size: 18, color: 'var(--color-strong)' }

export default (a: Args) => {
    // const action = a.unit ? 'edit' : 'add'

    // const [firstOpen, setFirstOpen] = createSignal<boolean>(true)
    const [action, setAction] = createSignal<'edit' | 'add'>(
        a.unit ? 'edit' : 'add'
    )
    const [done, setDone] = createSignal<boolean>(false)
    const [isUnitChanged, setIsUnitChanged] = createSignal<boolean>(false)
    const [unit, setUnit] = createSignal<Unit>(
        a.unit ?? {
            name: 'New unit',
            machineId: uuidv4(),
            state: 0,
        } // uuidv4 simplify demo
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
            <Field a col>
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
                                        <Text accent>New unit</Text>
                                    </Field>
                                ) : (
                                    <></>
                                )}
                            </Field>
                        </Field>

                        <Field s col gmd>
                            <Field s col w={320}>
                                <Text xs primary>
                                    Machine ID
                                </Text>
                                <Textfield
                                    xs
                                    placeholder='36 letter unique hardware ID'
                                    value={unit().machineId}
                                    primary
                                    psm
                                    color='var(--color-middle)'
                                    style='pointer-events:none; user-select:none' // simplify demo
                                    // change={(v) => ...}
                                />
                            </Field>
                            <Field s col w={300}>
                                <Text xs primary>
                                    Name
                                </Text>
                                <Textfield
                                    xs
                                    placeholder='Unit name'
                                    value={unit().name}
                                    primary
                                    psm
                                    color='var(--color-middle)'
                                    change={(v) => {
                                        const u = { ...unit() }
                                        u.name = v
                                        setUnit(u)
                                    }}
                                />
                            </Field>
                        </Field>

                        <Field s gsm jce pmd>
                            {action() == 'edit' && (
                                <Modal
                                    jcc
                                    pxl
                                    buttonContent={
                                        <Field
                                            style='background:rgb(200,120,120)'
                                            psm
                                        >
                                            <FiTrash2 {...iconStyle} />
                                        </Field>
                                    }
                                >
                                    <ConfirmModal
                                        confirmAction={() => {
                                            console.log('ok lets go')
                                            console.log('delete here..')
                                        }}
                                    />
                                </Modal>
                            )}

                            <Button
                                tertiary
                                md
                                onClick={(e) => {
                                    console.log(action)
                                    console.log('save here..')
                                }}
                            >
                                <Text secondary xs>
                                    {action() == 'edit' ? 'save' : 'add'}
                                </Text>
                            </Button>
                        </Field>
                    </Field>

                    {/* {action() == 'edit' && <Field a focus></Field>} */}
                </Transition>
            </Field>
            {/* <Transition name='fade'>
                {showOptions() && <Field layer>{options()}</Field>}
                {!showOptions() && <Field layer>{manage()}</Field>}
            </Transition> */}
        </Field>
    )
}
