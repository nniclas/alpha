import { useNavigate } from '@solidjs/router'
import Field from '../../lib/elements/field/field'
import Button from '../../lib/elements/button/button'
import Text from '../../lib/elements/text/text'
import appStore from '../../core/app-store'
import ds from '../../core/data-store'
import { Unit } from '../../types/entities/unit'
import { UnitStateIcon } from '../../components/unit-state-icon/unit-state-icon'
import { FiBatteryCharging, FiLogOut, FiMenu, FiSettings } from 'solid-icons/fi'
import Modal from '../../lib/components/modal/modal'
import Responsive from '../../lib/components/responsive/responsive'
import Dropdown from '../../lib/components/dropdown/dropdown'
import { unitColors, unitColorsDarker } from '../../common/constants'
import { SvgUnitMeter } from '../../components/svg-unit-meter/svg-unit-meter'
import { randInt } from '../../common/utils'
import Settings from '../settings/settings'

const iconStyle = { size: 18, color: 'var(--color-medium)' }

export const MiniUnit = (a: { u: Unit }) => {
    return (
        <Field
            gxs
            onClick={(e) => ds.setSelectedUnitId(a.u.id)}
            res={{ aie: true }}
        >
            <Field
                a
                br
                trim
                col
                style={` cursor:pointer;cursor:hand; background: ${
                    unitColors[ds.getUnitIndex(a.u.id)]
                }`}
            >
                <Field
                    a
                    s
                    aic
                    gxs
                    style={`
                    }; background: ${
                        ds.selectedUnitId() == a.u.id
                            ? unitColorsDarker[ds.getUnitIndex(a.u.id)]
                            : unitColors[ds.getUnitIndex(a.u.id)]
                    }`}
                >
                    <Field p='0 24px'>
                        <Text sm color='var(--color-lighter)' title>
                            {a.u.name}
                        </Text>
                    </Field>
                    <Field jce psm>
                        <UnitStateIcon value={a.u.state} />
                    </Field>
                </Field>
                <Responsive compact={<></>}>
                    <Field>
                        <Field w={200} h={20} psm gxs>
                            <FiBatteryCharging
                                {...iconStyle}
                                color='var(--color-light)'
                            />
                            <SvgUnitMeter
                                value={randInt(30, 80)}
                                meterColor={
                                    unitColorsDarker[ds.getUnitIndex(a.u.id)]
                                }
                                valueColor='var(--color-light)'
                            />
                        </Field>
                    </Field>
                </Responsive>
            </Field>
        </Field>
    )
}

export const MainMenu = () => {
    const navigate = useNavigate()

    const logOut = () => {
        appStore.removeSession()
        navigate('/login', { replace: true })
    }

    const compactActions = [
        <Field pxs col s w={240}>
            <Modal
                buttonContent={
                    <Field tertiary h={60}>
                        <Field s w={60} h={60} c secondary>
                            <FiSettings color='var(--color-dim)' size={16} />
                        </Field>
                        <Field h={60} secondary aic>
                            <Text>settings</Text>
                        </Field>
                    </Field>
                }
            >
                <Settings />
            </Modal>
            <Button tertiary onClick={logOut} style='justify-content:start'>
                <Field s w={60} h={60} c>
                    <FiLogOut color='var(--accent-color)' size={16} />
                </Field>
                <Field s h={60} c col>
                    <Text xs accent>
                        {appStore.session()?.username}
                    </Text>
                </Field>
            </Button>
        </Field>,
    ]

    return (
        <Responsive
            s
            compact={
                <Field s>
                    <Dropdown
                        // style='z-index:2'
                        dock='topfix'
                        buttonContent={
                            <Field s c w={80} h={80} res={{ w: 60, h: 60 }}>
                                <FiMenu color='var(--color-medium)' size={20} />
                            </Field>
                        }
                        buttonArgs={{ focus: true }}
                        side='left'
                        items={compactActions}
                    />
                </Field>
            }
        >
            <Field s h={80} res={{ h: 60 }} c>
                <Field s col gsm aie>
                    <Field jce>
                        <Field s ais>
                            <Field s c h={80} res={{ h: 60 }} p='0 32px'>
                                <Text xs color='var(--color-medium)'>
                                    {appStore.session()?.username}
                                </Text>
                            </Field>
                            <Modal
                                jcc
                                buttonContent={
                                    <Field s h={80} w={80} c>
                                        <FiSettings {...iconStyle} />
                                    </Field>
                                }
                                buttonArgs={{ focus: true }}
                            >
                                <Field s plg>
                                    <Settings />
                                </Field>
                            </Modal>
                            <Field s>
                                <Button focus w={80} h={80} onClick={logOut}>
                                    <FiLogOut {...iconStyle} size={18} />
                                </Button>
                            </Field>
                        </Field>
                    </Field>
                </Field>
            </Field>
        </Responsive>
    )
}
