import Text from '../../lib/elements/text/text'
import Field from '../../lib/elements/field/field'
import Button from '../../lib/elements/button/button'
import { FiList, FiSettings, FiUser, FiX } from 'solid-icons/fi'
import { createEffect, createSignal, onMount } from 'solid-js'
import { isABtn } from '../../common/utils'
import { AppSettings, UnitSettings, UserSettings } from './settings.parts'
import { ButtonGroup } from '../../components/button-group/button-group'
import Shifter from '../../components/shifter/shifter'

const iconStyle = { size: 18, color: 'var(--color-middle)' }

export default () => {
    const [page, setPage] = createSignal<number>(0)

    return (
        <Field
            br
            trim
            rel
            w={800}
            h={600}
            s
            res={{ br: false, s: false, w: 'auto', h: 'auto' }}
            secondary
            onClick={(e: any) => {
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
