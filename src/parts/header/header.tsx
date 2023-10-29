import { Component, Suspense } from 'solid-js'
import Field from '../../lib/elements/field/field'
import Text from '../../lib/elements/text/text'
import ds from '../../core/data-store'
import { Transition } from 'solid-transition-group'
import { Loader } from '../../components/loader/loader'
import Responsive from '../../lib/components/responsive/responsive'
import { MainMenu, MiniUnit } from './header.parts'
import Logo from '../../assets/logo.svg?component-solid'
import { SliderNew } from '../../lib/components/slider-new/slider-new'

const TopBar = () => (
    <Field s>
        <Responsive
            compact={
                <Field p='0 0 0 16px  ' gxs>
                    <Field s h={35} p='6px 0'>
                        <Logo />
                    </Field>
                    <Field c s>
                        <Text sm color='var(--color-medium)'>
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
                    <Text md color='var(--color-medium)'>
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
        <Field
            s
            h={300}
            res={{ h: 146, accent: true, bg: 'var(--color-dim)' }}
            bg='var(--color-dim)'
        >
            <Field col>
                <TopBar />

                <Field rel>
                    <Transition name='fade'>
                        <Suspense
                            fallback={
                                <Field a layer c style='pointer-events:none'>
                                    <Loader />
                                </Field>
                            }
                        >
                            <Field layer col s res={{ h: 70 }}>
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
