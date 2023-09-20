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
import Dropdown from '../../lib/components/dropdown/dropdown'

//...
const demoUsers = [
    { email: 'demo@user.com', pwd: 'bananer', access: 'READ' },
    { email: 'john@doe.com', pwd: 'eple', access: 'ADMIN' },
    { email: 'jane@doe.com', pwd: 'saft', access: 'READ_WRITE' },
]

export const Login: Component = () => {
    const navigate = useNavigate()

    const [user, setUser] = createSignal<{ email: string; pwd: string }>(
        demoUsers[0]
    )

    const logIn = async () => {
        if (await signIn(user().email, user().pwd)) {
            navigate('/dashboard', { replace: true })
        }
    }

    const demoUsersDropdown = () => {
        return (
            <Field s col c gsm>
                <Field s>
                    <Dropdown
                        jce
                        dock='left'
                        buttonContent={
                            <Button w={180} h={80}>
                                <Text xs color='var(--color-dim)'>
                                    {user().email}
                                </Text>
                            </Button>
                        }
                        items={demoUsers.map((u) => (
                            <Button secondary onClick={() => setUser(u)}>
                                <Field s col gxs w={180} h={80} c>
                                    <Text xs primary>
                                        {u.email}
                                    </Text>
                                    <Text xs accent>
                                        {u.access}
                                    </Text>
                                </Field>
                            </Button>
                        ))}
                    />
                </Field>
            </Field>
        )
    }

    const form = (bg: string, color: string) => {
        return (
            <Field s a plg w={360} res={{ w: 240 }} col gsm>
                <Field s pwsm>
                    <Text color={color}>Account</Text>
                </Field>
                <Field s>
                    <Textfield
                        md
                        placeholder='Email'
                        value={user().email}
                        primary
                        psm
                        bg={bg}
                        color={color}
                        change={(v) => setUser({ ...user(), email: v })}
                    />
                </Field>
                <Field s>
                    <Textfield
                        md
                        password
                        placeholder='Password'
                        value={user().pwd}
                        bg={bg}
                        color={color}
                        psm
                        change={(v) => setUser({ ...user(), pwd: v })}
                    />
                </Field>
                <Field s jce>
                    <Field s>
                        <Button bg={bg} md onClick={logIn}>
                            <Text color={color}>Sign in</Text>
                        </Button>
                    </Field>
                </Field>
            </Field>
        )
    }

    return (
        <Field fixed secondary>
            <Field layer s class={styles.abstract} pevn />

            <Field layer s class={styles.bg} pevn />

            <Field layer ais pevn>
                <Field s plg col gxs>
                    <Text
                        lg
                        res
                        color='var(--color-accent)'
                        style='letter-spacing:12px'
                    >
                        ALPHA
                    </Text>
                    <Text md res color='var(--color-middle)'>
                        Remote operating technical tool.
                    </Text>
                </Field>
            </Field>

            <Field layer s c res={{ aie: true }}>
                {/* <Field plg>
                    <Button
                        secondary
                        lg
                        w={160}
                        res={{ lg: true, secondary: true, span: true }}
                    >
                        <Text accent>hello there</Text>
                    </Button>
                </Field> */}
                <Responsive
                    compact={
                        <Field c plg>
                            {form(
                                'var(--color-lighter)',
                                'var(--color-medium)'
                            )}
                        </Field>
                    }
                >
                    <Field jce plg c>
                        <Field s col gxs>
                            <Text xs color='var(--color-dim)'>
                                Demo users
                            </Text>
                            <Field
                                s
                                style='border:2px solid var(--color-middle)'
                            >
                                {demoUsersDropdown()}
                            </Field>
                        </Field>

                        {form('var(--color-stronger)', 'var(--color-dim)')}
                    </Field>
                </Responsive>
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
        </Field>
    )
}
