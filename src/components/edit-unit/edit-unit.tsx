import Text from '../../lib/elements/text/text'
import Field from '../../lib/elements/field/field'
import Button from '../../lib/elements/button/button'
import { FiX } from 'solid-icons/fi'
import Modal from '../../lib/components/modal/modal'
import { createEffect, createSignal } from 'solid-js'
import { Unit } from '../../types/entities/unit'
import Textfield from '../../lib/elements/textfield/textfield'
import { isABtn } from '../../common/utils'
import { v4 as uuidv4 } from 'uuid'
import ConfirmModal from '../confirm-modal/confirm-modal'
import { Transition } from 'solid-transition-group'

interface Args {
    unit?: Unit
}

export default (a: Args) => {
    const action = a.unit ? 'edit' : 'add'

    const [firstOpen, setFirstOpen] = createSignal<boolean>(true)
    const [done, setDone] = createSignal<boolean>(false)
    const [isUnitChanged, setIsUnitChanged] = createSignal<boolean>(false)
    const [unit, setUnit] = createSignal<Unit>(
        a.unit ?? { name: 'New unit', machineId: uuidv4(), state: 0 } // uuidv4 simplify demo
    )

    createEffect(() => {
        setIsUnitChanged(JSON.stringify(a.unit) != JSON.stringify(unit()))
    })

    return (
        <Field
            rel
            s
            w={600}
            h={500}
            secondary
            onClick={(e: any) => {
                if (!isABtn(e.target)) e.stopPropagation()
            }}
        >
            <Field a col>
                {action == 'add' && (
                    <Field s h={32} pmd c>
                        <Field gmd>
                            <Button
                                w={160}
                                h={48}
                                onClick={(e) => {
                                    setFirstOpen(false)
                                    e.stopPropagation()
                                }}
                            >
                                <Text tertiary xs>
                                    Register new unit
                                </Text>
                            </Button>
                        </Field>
                    </Field>
                )}

                <Transition name='fade'>
                    {(!firstOpen() || action == 'edit') && (
                        <Field a col>
                            <Field s h={32} focus pmd c>
                                <Field s c>
                                    {isUnitChanged() ? (
                                        <Text lg accent>
                                            •
                                        </Text>
                                    ) : (
                                        <></>
                                    )}
                                </Field>
                                <Field c>
                                    <Text accent>{unit().name}</Text>
                                </Field>
                            </Field>

                            <Field pmd col gmd>
                                <Field s col gsm w={320}>
                                    <Text xs primary>
                                        Machine ID
                                    </Text>
                                    <Textfield
                                        xs
                                        placeholder='36 letter unique hardware ID'
                                        value={unit().machineId}
                                        primary
                                        psm
                                        color='var(--color-medium)'
                                        style='pointer-events:none; user-select:none' // simplify demo
                                        // change={(v) => ...}
                                    />
                                </Field>
                                <Field s col gsm w={300}>
                                    <Text xs primary>
                                        Name
                                    </Text>
                                    <Textfield
                                        xs
                                        placeholder='Email'
                                        value={unit().name}
                                        primary
                                        psm
                                        color='var(--color-medium)'
                                        change={(v) => {
                                            const u = { ...unit() }
                                            u.name = v
                                            setUnit(u)
                                        }}
                                    />
                                </Field>
                            </Field>

                            <Field s gsm jce focus pmd>
                                {action == 'edit' && (
                                    <Modal
                                        jcc
                                        pxl
                                        buttonContent={
                                            <Field
                                                style='background:rgb(200,120,120)'
                                                pmd
                                            />
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

                                <Field />
                                <Button
                                    tertiary
                                    md
                                    onClick={(e) => {
                                        console.log(action)
                                        console.log('save here..')
                                    }}
                                >
                                    <Text secondary xs>
                                        {action == 'edit' ? 'save' : 'add'}
                                    </Text>
                                </Button>
                            </Field>
                        </Field>
                    )}
                    {(firstOpen() || action == 'edit') && (
                        <Field a focus></Field>
                    )}
                </Transition>
            </Field>
            {/* <Transition name='fade'>
                {showOptions() && <Field layer>{options()}</Field>}
                {!showOptions() && <Field layer>{manage()}</Field>}
            </Transition> */}
        </Field>
    )
}
