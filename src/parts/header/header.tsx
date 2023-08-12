import { Component, For, Suspense } from 'solid-js'
import Field from '../../lib/elements/field/field'
import Text from '../../lib/elements/text/text'
import ds from '../../core/data-store'
import { FiAlertTriangle } from 'solid-icons/fi'
import { Transition } from 'solid-transition-group'
import { Loader } from '../../components/loader/loader'
import EditUnit from '../../components/edit-unit/edit-unit'
import Modal from '../../lib/components/modal/modal'
import Responsive from '../../lib/components/responsive/responsive'
import Dropdown from '../../lib/components/dropdown/dropdown'
import { MainMenu, MiniUnit } from './header.parts'
import { Slider } from '../../lib/components/slider/slider'
import { SectionHeader } from '../../parts/section-header'

export const Header: Component = () => {
    const units = () => ds.unitsRes()?.map((u) => <MiniUnit u={u} />)
    return (
        <Field
            s
            h={260}
            res={{ h: 200, bg: 'var(--color-light)' }}
            bg='var(--color-light)'
        >
            <Field col>
                <Responsive
                    s
                    compact={
                        <SectionHeader
                            title='Some'
                            // titleTheme='accent'
                            iconTheme='secondary'
                            tool={<MainMenu />}
                            icon={<FiAlertTriangle />}
                        />
                    }
                >
                    <SectionHeader
                        title='Some'
                        aux={
                            <Text xs secondary>
                                Some units are offline, check status.
                            </Text>
                        }
                        iconTheme='secondary'
                        tool={<MainMenu />}
                        icon={<FiAlertTriangle />}
                    />
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
