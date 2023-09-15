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
import { For, createEffect, createSignal, onMount } from 'solid-js'
import { Unit } from '../../types/entities/unit'
import Textfield from '../../lib/elements/textfield/textfield'
import { isABtn } from '../../common/utils'
import { v4 as uuidv4 } from 'uuid'
import ConfirmModal from '../confirm-modal/confirm-modal'
import { Transition } from 'solid-transition-group'
import { ButtonGroup } from '../button-group/button-group'

interface Page {
    condition: boolean
    content: any
}

interface Args {
    pages?: Page[] // either a fixed set of pages based on conditions
    children?: any // or just an updated new child
    tr?: string
}

export default (a: Args) => {
    const createChild = (c: any) => {
        return <Field layer>{c}</Field>
    }

    return (
        <Field rel trim>
            <Transition name={a.tr || 'slide-fade'}>
                {a.children && createChild(a.children)}
                {a.pages && (
                    <For each={a.pages}>
                        {(p) => p.condition && <Field layer>{p.content}</Field>}
                    </For>
                )}
            </Transition>
        </Field>
    )
}
