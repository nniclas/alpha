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
import { Transition } from 'solid-transition-group'
import { AppSettings, UnitSettings, UserSettings } from './settings.parts'
import { ButtonGroup } from '../../components/button-group/button-group'
import Shifter from '../../components/shifter/shifter'

interface Args {
    // unit?: Unit
}

const iconStyle = { size: 18, color: 'var(--color-dim)' }

export default (a: Args) => {
    const [page, setPage] = createSignal<number>(0)

    createEffect(() => {
        // console.log(page())
    })

    return (
        <Field
            br
            trim
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
                <Field s h={60} tertiary>
                    <ButtonGroup
                        tertiary
                        w={160}
                        res={{ w: 'auto', span: true }}
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
                        <Field gsm c>
                            <FiUser {...iconStyle} />
                            <Text sm res>
                                User
                            </Text>
                        </Field>
                    </ButtonGroup>

                    <Field
                        res={{ tertiary: true, s: true, jce: true, aie: true }}
                    >
                        <Field w={60} h={60} jce>
                            <Button h={60} w={60} style={'z-index:1'}>
                                <FiX {...iconStyle} />
                            </Button>
                        </Field>
                    </Field>
                </Field>

                <Field col gmd>
                    <Shifter
                        pages={[
                            {
                                condition: page() == 0,
                                content: <AppSettings />,
                            },
                            {
                                condition: page() == 1,
                                content: <UnitSettings />,
                            },
                            {
                                condition: page() == 2,
                                content: <UserSettings />,
                            },
                        ]}
                    />
                </Field>
            </Field>
        </Field>
    )
}
