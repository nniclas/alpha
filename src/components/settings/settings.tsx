import Text from '../../lib/elements/text/text'
import Field from '../../lib/elements/field/field'
import Button from '../../lib/elements/button/button'
import { FiEdit3, FiPlusCircle, FiX, FiXCircle } from 'solid-icons/fi'
import Modal from '../../lib/components/modal/modal'
import { createEffect, createSignal, onMount } from 'solid-js'
import { Unit } from '../../types/entities/unit'
import Textfield from '../../lib/elements/textfield/textfield'
import { isABtn } from '../../common/utils'
import { v4 as uuidv4 } from 'uuid'
import ConfirmModal from '../confirm-modal/confirm-modal'
import { Transition } from 'solid-transition-group'

interface Args {
    // unit?: Unit
}

const iconStyle = { size: 18, color: 'var(--color-accent)' }

export default (a: Args) => {
    const [firstOpen, setFirstOpen] = createSignal<boolean>(true)

    createEffect(() => {})

    return (
        <Field
            rel
            w={800}
            h={600}
            s
            res={{ s: false, w: 'auto', h: 'auto' }}
            secondary
            onClick={(e: any) => {
                console.log('bsshh')
                if (!isABtn(e.target)) e.stopPropagation()
            }}
        >
            <Field a col>
                <Field s h={64} focus>
                    <Button w={128} h={64}>
                        <Field gxs c>
                            <FiEdit3 {...iconStyle} />
                            <Text sm>Units</Text>
                        </Field>
                    </Button>
                    <Button w={128} h={64}>
                        <Field gxs c>
                            <FiPlusCircle {...iconStyle} />
                            <Text sm>Add new</Text>
                        </Field>
                    </Button>
                </Field>

                <Field pmd col gmd>
                    2
                </Field>
            </Field>
        </Field>
    )
}
