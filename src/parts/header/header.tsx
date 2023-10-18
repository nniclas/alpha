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
import { SliderNew } from '../../lib/components/slider-new/slider-new'

const TopBar = () => (
    <Field s bg='hsl(var(--th-hue), var(--th-saturation), 80%);'>
        <Responsive
            compact={
                <Field p='0 0 0 16px  ' gxs>
                    <Field s h={35} p='6px 0'>
                        <Logo />
                    </Field>
                    <Field c s>
                        <Text sm secondary>
                            A L P H A
                        </Text>
                    </Field>
                </Field>
            }
        >
            <Field s p='0 0 0 24px  ' h={80} gxs>
                <Field s h={55} p='3px 0'>
                    <Logo />
                </Field>
                <Field c s>
                    <Text md secondary>
                        A L P H A
                    </Text>
                </Field>
            </Field>
        </Responsive>

        <Field jce>
            <MainMenu />
        </Field>
    </Field>
)

export const Header: Component = () => {
    return (
        <Field s h={300} res={{ h: 146, bg: 'var(--color-light)' }}>
            <Field col>
                <TopBar />

                <Field rel bg='hsl(var(--th-hue), var(--th-saturation), 80%);'>
                    <Transition name='fade'>
                        <Suspense
                            fallback={
                                <Field a layer c style='pointer-events:none'>
                                    <Loader />
                                </Field>
                            }
                        >
                            <Field layer col s res={{ h: 70 }}>
                                {/* <Field gsm psm>
                                    {units()}
                                </Field> */}
                                <Responsive
                                    compact={
                                        <Field>
                                            <SliderNew>
                                                {ds.unitsRes()?.map((u) => (
                                                    <MiniUnit u={u} />
                                                ))}
                                            </SliderNew>
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
