import Text from '../../lib/elements/text/text'
import Field from '../../lib/elements/field/field'
import Button from '../../lib/elements/button/button'
import { FiX } from 'solid-icons/fi'
import Modal from '../../lib/components/modal/modal'
import { createEffect, createSignal } from 'solid-js'
import { Unit } from '../../types/entities/unit'
import Textfield from '../../lib/elements/textfield/textfield'
import { v4 as uuidv4 } from 'uuid'

interface Args {
    header: string
    confirmAction: () => void
}

export default (a: Args) => {
    return (
        <Field s w={300} h={200} secondary>
            <Field col gsm c>
                <Text primary xs>
                    {a.header}
                </Text>
                <Button tertiary md onClick={a.confirmAction}>
                    <Text primary xs>
                        Confirm
                    </Text>
                </Button>
            </Field>
        </Field>
    )
}
