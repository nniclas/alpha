import Text from '../../lib/elements/text/text'
import Field from '../../lib/elements/field/field'
import Button from '../../lib/elements/button/button'
import { FiX } from 'solid-icons/fi'
import Modal from '../../lib/components/modal/modal'
import { createEffect, createSignal } from 'solid-js'
import { Unit } from '../../types/entities/unit'
import Textfield from '../../lib/elements/textfield/textfield'
import { isABtn } from '../../common/utils'

interface Args {
    unit?: Unit
}

export default (a: Args) => {
    const [isChanged, setIsChanged] = createSignal<boolean>(false)
    const [done, setDone] = createSignal<boolean>(false)
    const [unit, setUnit] = createSignal<Unit>(
        a.unit ?? { name: 'New unit', state: 0 }
    )

    createEffect(() => {
        setIsChanged(JSON.stringify(a.unit) != JSON.stringify(unit()))
    })

    const action = a.unit ? 'edit' : 'add'

    return (
        <Field
            s
            w={800}
            h={600}
            secondary
            onClick={(e: any) => {
                if (!isABtn(e.target)) e.stopPropagation()
            }}
        >
            <Field col gsm>
                <Field s h={32} focus pmd c>
                    <Field s c>
                        {isChanged() ? (
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
                            placeholder='Machine Id'
                            value={'5bb37d7b-6542-4f7c-a3bc-4cbf27486d91'}
                            primary
                            psm
                            color='hsl(200, 18%, 32%)'
                            // change={(v) => setEmail(v)}
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
                            color='hsl(200, 18%, 32%)'
                            change={(v) => {
                                const u = { ...unit() }
                                u.name = v
                                setUnit(u)
                            }}
                        />
                    </Field>
                </Field>

                <Field s gsm jce focus pmd>
                    <Button
                        tertiary
                        md
                        onClick={(e) => {
                            console.log('save here..')
                        }}
                    >
                        <Text secondary xs>
                            Save
                        </Text>
                    </Button>
                </Field>
            </Field>
        </Field>
    )
}
