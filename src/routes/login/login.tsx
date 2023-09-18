import { Component, For, createEffect, createSignal, lazy } from 'solid-js'
import { Outlet, useNavigate } from '@solidjs/router'
import Logo from '../../assets/logo.svg?component-solid'
import Field from '../../lib/elements/field/field'
import Text from '../../lib/elements/text/text'
import styles from './login.module.css'
import Button from '../../lib/elements/button/button'
import Textfield from '../../lib/elements/textfield/textfield'
import { signIn } from '../../core/auth'
import Shifter from '../../components/shifter/shifter'
import Responsive from '../../lib/components/responsive/responsive'

// const Layout = (a: {
//     bg: string
//     color: string
//     lslot: any
//     rslot: any
//     dslot: any
// }) => {
//     return (
//         <Field col rel id='fjongen'>
//             <Field></Field>
//             <Field s>
//                 <Field rel h={600} bg={a.color}>
//                     <Field h={150} bg={a.bg}></Field>
//                     <Field layer>{a.lslot}</Field>
//                 </Field>
//                 <Field s rel w={600} h={600}>
//                     <Field class={styles.bg}></Field>
//                 </Field>
//                 <Field rel h={600} bg={a.color}>
//                     <Field h={450} bg={a.bg}></Field>
//                     <Field layer>{a.rslot}</Field>
//                 </Field>
//             </Field>
//             <Field s bg={a.color} rel>
//                 {a.dslot}
//             </Field>
//         </Field>
//     )
// }

export const Login: Component = () => {
    const navigate = useNavigate()

    const [email, setEmail] = createSignal<string>('john@doe.com') /////////////////////// remove default
    const [password, setPassword] = createSignal<string>('eple') ///////////////////////// remove default

    const logIn = async () => {
        if (await signIn(email(), password())) {
            navigate('/dashboard', { replace: true })
        }
    }

    return (
        <Field fixed secondary>
            {/* <Field layer jcs ais pevn>
                <img
                    src='src/assets/splash.jpg'
                    style='width:50%; margin-left:-48px; filter: grayscale(100%); mix-blend-mode:multiply'
                />
            </Field> */}

            <Field layer s class={styles.abstract} pevn />

            {/* <Field layer s class={styles.bg} pevn /> */}

            <Field layer jcs ais pevn>
                <Field s pmd col gxs>
                    <Text
                        md
                        color='var(--color-accent)'
                        style='letter-spacing:12px'
                    >
                        ALPHA
                    </Text>
                    <Text sm res color='var(--color-middle)'>
                        Remote operating technical tool.
                    </Text>
                </Field>
            </Field>

            <Field layer jcc aie pevn>
                <Responsive>
                    <Field layer jcc aie pevn>
                        <Field s pmd>
                            <Text res color='var(--color-middle)' sm>
                                nniclas © Copyright 2023
                            </Text>
                        </Field>
                    </Field>
                </Responsive>
            </Field>

            <Field layer jcc aie>
                <Field plg jce aic res={{ ais: true, jcc: true }}>
                    <Field
                        plg
                        s
                        // style='margin-top:64px; margin-right:256px'
                        res={{ style: 'margin-right:0px' }}
                    >
                        <Field s col gsm res={{ psm: true, w: 240 }} a w={360}>
                            {/* <Field s c>
                                <Field s w={200} res={{ w: 140 }}>
                                    <Logo />
                                </Field>
                            </Field> */}

                            <Field s pwsm>
                                <Text color='var(--color-medium)'>Account</Text>
                            </Field>
                            <Field s>
                                <Textfield
                                    placeholder='Email'
                                    value={email()}
                                    primary
                                    psm
                                    bg='hsl(190, 8%, 60%); '
                                    color='var(--color-medium)'
                                    change={(v) => setEmail(v)}
                                />
                            </Field>
                            <Field s>
                                <Textfield
                                    password
                                    placeholder='Password'
                                    value={password()}
                                    bg='hsl(190, 8%, 60%); '
                                    color='var(--color-medium)'
                                    psm
                                    change={(v) => setPassword(v)}
                                />
                            </Field>
                            <Field s jce>
                                <Field s>
                                    <Button
                                        style='background:hsl(190, 8%, 60%); '
                                        md
                                        onClick={logIn}
                                    >
                                        <Text color='var(--color-medium)'>
                                            Sign in
                                        </Text>
                                    </Button>
                                </Field>
                            </Field>
                        </Field>
                    </Field>
                </Field>
            </Field>
        </Field>
    )

    // login page covers the full window
    // return (
    // <Field class={styles.cover}>
    //     <Field layer jcs ais>
    //         <Field s pmd h={400} aic res={{ ais: true }}>
    //             <Field s col gsm ais>
    //                 <Field s w={180} jce res={{ jcs: true }}>
    //                     <img
    //                         src='src/assets/icons/cogs.png'
    //                         style='width:180px; margin-left:-48px'
    //                     />
    //                 </Field>
    //                 <Field p='16px 48px' gxs col res={{ w: 300 }}>
    //                     <Text
    //                         md
    //                         color='var(--color-accent)'
    //                         style='letter-spacing:12px'
    //                     >
    //                         ALPHA
    //                     </Text>
    //                     <Text
    //                         sm
    //                         color='var(--color-middle)'
    //                         style='letter-spacing:1px'
    //                     >
    //                         Remote configuration and operating technical
    //                         tool.
    //                     </Text>
    //                 </Field>
    //             </Field>
    //         </Field>
    //     </Field>
    //     <Layout
    //         bg='var(--color-stronger)'
    //         color='var(--color-light)'
    //         lslot={
    //             <></>
    //             // <Field aic jce gmd style='z-index:1; margin-right:-100px'>
    //             //     <Field
    //             //         s
    //             //         w={300}
    //             //         h={300}
    //             //         res={{ pmd: true, w: 200, h: 200 }}
    //             //     >
    //             //         <Logo />
    //             //     </Field>
    //             // </Field>
    //         }
    //         rslot={
    //             // <Shifter tr='foo'>
    //             <Field
    //                 s
    //                 col
    //                 ais
    //                 // style='position:fixed; left:0; bottom:0; width:100%;'
    //             >
    //                 {/* <Field s col psm>
    //                     <Text sm color='var(--color-middle)'>
    //                         Account
    //                     </Text>
    //                 </Field> */}
    //             </Field>
    //             // </Shifter>
    //         }
    //         dslot={
    //             <Field jce res={{ jcs: true }}>
    //                 <Field s>
    //                     <Field
    //                         col
    //                         gsm
    //                         plg
    //                         w={400}
    //                         res={{ pmd: true }}
    //                         a
    //                         // bg='var(--color-strongest)'
    //                     >
    //                         <Field psm>
    //                             <Text color='var(--color-strong)'>
    //                                 Sign in
    //                             </Text>
    //                         </Field>
    //                         <Field s>
    //                             <Textfield
    //                                 placeholder='Email'
    //                                 value={email()}
    //                                 primary
    //                                 psm
    //                                 color='var(--color-middle)'
    //                                 change={(v) => setEmail(v)}
    //                             />
    //                         </Field>
    //                         <Field>
    //                             <Textfield
    //                                 password
    //                                 placeholder='Password'
    //                                 value={password()}
    //                                 primary
    //                                 psm
    //                                 color='var(--color-middle)'
    //                                 change={(v) => setPassword(v)}
    //                             />
    //                         </Field>
    //                         <Field jce>
    //                             <Field s>
    //                                 <Button tertiary md onClick={logIn}>
    //                                     <Text>Sign in</Text>
    //                                 </Button>
    //                             </Field>
    //                         </Field>
    //                     </Field>
    //                 </Field>
    //             </Field>
    //         }
    //     />
    //     <Field layer jcc aie pevn>
    //         <Responsive compact={<></>}>
    //             <Field layer jcc aie pevn>
    //                 <Field s pmd>
    //                     <Text color='var(--color-lightest)' sm>
    //                         nniclas © Copyright 2023
    //                     </Text>
    //                 </Field>
    //             </Field>
    //         </Responsive>
    //     </Field>
    // </Field>
    // )
}
