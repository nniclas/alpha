import { Component, For, Suspense } from 'solid-js'
import Field from '../../lib/elements/field/field'
import Text from '../../lib/elements/text/text'
import ds from '../../core/data-store'
import { FiAlertTriangle, FiMoreHorizontal } from 'solid-icons/fi'
import { Transition } from 'solid-transition-group'
import { Loader } from '../../components/loader/loader'
import EditUnit from '../../components/edit-unit/edit-unit'
import Modal from '../../lib/components/modal/modal'
import Responsive from '../../lib/components/responsive/responsive'
import Dropdown from '../../lib/components/dropdown/dropdown'
import { MainMenu, MiniUnit } from './header.parts'
import { Slider } from '../../lib/components/slider/slider'
import { SectionHeader } from '../../parts/section-header'
import Button from '../../lib/elements/button/button'
import { Label } from '../../lib/components/label/label'

export const Header: Component = () => {
    const units = () => ds.unitsRes()?.map((u) => <MiniUnit u={u} />)

    const header = (auxText?: any) => (
        <SectionHeader
            title='Some'
            aux={
                <Field s>
                    <Modal
                        jcc
                        buttonContent={
                            <Field s w={80} res={{ w: 60 }} c>
                                <Label
                                    size='md'
                                    icon={<FiMoreHorizontal />}
                                    iconTheme='secondary'
                                />
                            </Field>
                        }
                    >
                        <EditUnit />
                    </Modal>
                    <Field aic>
                        <Text xs secondary>
                            {auxText}
                        </Text>
                    </Field>
                </Field>
            }
            // titleTheme='accent'
            iconTheme='secondary'
            tool={<MainMenu />}
            icon={<FiAlertTriangle />}
        />
    )

    return (
        <Field
            s
            h={260}
            res={{ h: 200, bg: 'var(--color-light)' }}
            bg='var(--color-light)'
        >
            <Field col>
                <Responsive s compact={header()}>
                    {header('Some units are offline, check status.')}
                </Responsive>

                <Field rel>
                    <Transition name='fade'>
                        <Suspense
                            fallback={
                                <Field a layer c style='pointer-events:none'>
                                    <Loader />
                                </Field>
                            }
                        >
                            <Field layer col>
                                <Responsive
                                    compact={
                                        <Field psm>
                                            <Slider>{units()}</Slider>
                                        </Field>
                                    }
                                >
                                    <Field p='32px 64px' s gxs>
                                        {units()}
                                    </Field>
                                </Responsive>
                            </Field>
                        </Suspense>
                    </Transition>
                </Field>
            </Field>
        </Field>
    )
}
