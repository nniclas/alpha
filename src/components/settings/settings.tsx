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

interface Args {
    // unit?: Unit
}

const iconStyle = { size: 18, color: 'var(--color-accent)' }

const AppSettings = () => {
    return (
        <Field tertiary pmd>
            <Text sm>app settings</Text>
        </Field>
    )
}

const UnitSettings = () => {
    return (
        <Field tertiary pmd>
            <Text sm>unit settings</Text>
        </Field>
    )
}

export default (a: Args) => {
    const [page, setPage] = createSignal<number>(0)
    const [firstOpen, setFirstOpen] = createSignal<boolean>(true)

    createEffect(() => {
        // console.log(page())
    })

    return (
        <Field
            rel
            w={800}
            h={600}
            s
            res={{ s: false, w: 'auto', h: 'auto' }}
            secondary
            onClick={(e: any) => {
                // console.log('bsshh')
                if (!isABtn(e.target)) e.stopPropagation()
            }}
        >
            <Field a col>
                <Field s h={64} focus>
                    <ButtonGroup
                        secondary
                        w={160}
                        res={{ w: 120 }}
                        change={(i) => setPage(i)}
                    >
                        <Field gsm c>
                            <FiSettings {...iconStyle} />
                            <Text sm res>
                                App
                            </Text>
                        </Field>
                        <Field gsm c>
                            <FiList {...iconStyle} />
                            <Text sm res>
                                Units
                            </Text>
                        </Field>
                    </ButtonGroup>
                    {/* <Button w={128} h={64}>
                        <Field gsm c>
                            <FiAnchor {...iconStyle} />
                            <Text sm>App</Text>
                        </Field>
                    </Button>
                    <Button w={128} h={64}>
                        <Field gsm c>
                            <FiEdit3 {...iconStyle} />
                            <Text sm>Units</Text>
                        </Field>
                    </Button>
                    <Button w={128} h={64}>
                        <Field gsm c>
                            <FiPlusCircle {...iconStyle} />
                            <Text sm>Add new</Text>
                        </Field>
                    </Button> */}
                </Field>

                <Field pmd col gmd>
                    <Transition name='fade'>
                        {page() == 0 && <AppSettings />}
                        {page() == 1 && <UnitSettings />}
                    </Transition>
                </Field>
            </Field>
        </Field>
    )
}
