import Text from '../../lib/elements/text/text'
import Field from '../../lib/elements/field/field'
import Button from '../../lib/elements/button/button'
import { FiX } from 'solid-icons/fi'
import Modal from '../../lib/components/modal/modal'
import { createSignal } from 'solid-js'
import { Unit } from 'types/entities/unit'

interface Args {
    unit?: Unit
}

export default (a: Args) => {
    // const [open, setOpen] = createSignal<boolean>(a.open)

    const action = a.unit ? 'edit' : 'add'

    return (
        <Field
            s
            w={800}
            h={400}
            primary
            pmd
            onClick={(e: any) => {
                if (e.target.tagName == 'DIV') e.stopPropagation()
            }}
        >
            <Field s col gsm>
                <Field s>
                    <Text primary>{a.unit?.name}</Text>
                </Field>
                <Field>
                    <Text secondary>Mr foo is present!</Text>
                </Field>

                {/* <Text secondary xs>
                    Confirm
                </Text>
                <Button
                    lg
                    onClick={(e) => {
                        console.log('hej')
                    }}
                >
                    asfsaf
                </Button> */}
            </Field>
        </Field>
    )
}
