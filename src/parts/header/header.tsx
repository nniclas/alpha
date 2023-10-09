import { Component, For, Suspense, createEffect } from 'solid-js'
import Field from '../../lib/elements/field/field'
import Text from '../../lib/elements/text/text'
import ds from '../../core/data-store'
import { FiAlertTriangle, FiMoreHorizontal } from 'solid-icons/fi'
import { Transition } from 'solid-transition-group'
import { Loader } from '../../components/loader/loader'
import Modal from '../../lib/components/modal/modal'
import Responsive from '../../lib/components/responsive/responsive'
import Dropdown from '../../lib/components/dropdown/dropdown'
import { MainMenu, MiniUnit } from './header.parts'
import { Slider } from '../../lib/components/slider/slider'
import { SectionHeader } from '../section-header/section-header'
import Button from '../../lib/elements/button/button'
import { Label } from '../../lib/components/label/label'
import Logo from '../../assets/logo.svg?component-solid'

export const Header: Component = () => {
    // const units = () => ds.unitsRes()?.map((u) => <MiniUnit u={u} />)

    const header = (auxText?: any) => (
        <SectionHeader
            bg='var(--color-light)'
            title='A L P H A'
            aux={
                <Field aic>
                    <Text xs secondary>
                        {auxText}
                    </Text>
                </Field>
            }
            icon={
                <Field s w={60} h={60}>
                    <Logo />
                </Field>
            }
            titleTheme='secondary'
            tool={<MainMenu />}
        />
    )

    createEffect(() => {})

    return (
        <Field
            s
            h={300}
            res={{ h: 200, bg: 'var(--color-light)' }}
            bg='var(--color-light)'
        >
            <Field col>
                {header()}
                {/* <Responsive s compact={header()}>
                    {header()}
                </Responsive> */}

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
                                {/* <Field gsm psm>
                                    {units()}
                                </Field> */}
                                <Responsive
                                    compact={
                                        <Field>
                                            <Slider>
                                                {ds.unitsRes()?.map((u) => (
                                                    <MiniUnit u={u} />
                                                ))}
                                            </Slider>
                                        </Field>
                                    }
                                >
                                    <Field
                                        gmd
                                        pmd
                                        res={{ gsm: true, psm: true }}
                                    >
                                        {ds.unitsRes()?.map((u) => (
                                            <MiniUnit u={u} />
                                        ))}
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
