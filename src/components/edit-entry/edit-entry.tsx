import Text from '../../lib/elements/text/text'
import Field from '../../lib/elements/field/field'
import Button from '../../lib/elements/button/button'
import { FiX } from 'solid-icons/fi'
import Modal from '../../lib/components/modal/modal'
import { For, createEffect, createSignal } from 'solid-js'
import { Unit } from '../../types/entities/unit'
import Textfield from '../../lib/elements/textfield/textfield'
import { isABtn } from '../../common/utils'
import { v4 as uuidv4 } from 'uuid'
import ConfirmModal from '../confirm-modal/confirm-modal'
import { Transition } from 'solid-transition-group'
import { Entry } from '../../types/entities/entry'
import Dropdown from '../../components/dropdown/dropdown'
import { events, measures, tags } from '../../common/constants'

interface Args {
    entry?: Entry
}

export default (a: Args) => {
    const action = a.entry ? 'edit' : 'add'

    const [done, setDone] = createSignal<boolean>(false)
    const [isEntryChanged, setIsEntryChanged] = createSignal<boolean>(false)
    const [entry, setEntry] = createSignal<Entry>(
        a.entry ?? { unitId: 0, userId: 0, event: 0, measure: 0, tag: 0 }
    )
    createEffect(() => {
        setIsEntryChanged(JSON.stringify(a.entry) != JSON.stringify(entry()))

        console.log(entry()?.tag)
    })

    return (
        <Field
            rel
            s
            w={800}
            h={800}
            secondary
            onClick={(e: any) => {
                if (!isABtn(e.target)) e.stopPropagation()
            }}
        >
            <Field a col>
                <Transition name='fade'>
                    <Field a col>
                        <Field s h={32} focus pmd c>
                            <Field s c>
                                {isEntryChanged() ? (
                                    <Text lg accent>
                                        •
                                    </Text>
                                ) : (
                                    <></>
                                )}
                            </Field>
                            <Field c>
                                <Text accent>{entry()?.id}</Text>
                            </Field>
                        </Field>

                        <Field plg col glg>
                            <Field s gmd>
                                <Field s col gsm>
                                    <Text xs primary>
                                        Event
                                    </Text>
                                    <Dropdown
                                        index={entry()?.event}
                                        items={events.map((e) => (
                                            <Field c h={48} w={200}>
                                                <Text xs secondary>
                                                    {e.title}
                                                </Text>
                                            </Field>
                                        ))}
                                        onChange={(v) => {
                                            const e = { ...entry()! }
                                            e.event = v
                                            setEntry(e)
                                        }}
                                        buttonArgs={{ primary: true }}
                                    />
                                </Field>
                                <Field s col gsm>
                                    <Text xs primary>
                                        Measure
                                    </Text>
                                    <Dropdown
                                        index={entry()?.measure}
                                        items={measures.map((m) => (
                                            <Field c h={48} w={200}>
                                                <Text xs secondary>
                                                    {m.title}
                                                </Text>
                                            </Field>
                                        ))}
                                        onChange={(v) => {
                                            const e = { ...entry()! }
                                            e.measure = v
                                            setEntry(e)
                                        }}
                                        buttonArgs={{ primary: true }}
                                    />
                                </Field>
                            </Field>
                            <Field s gmd>
                                <Field s col gsm h={48} w={300}>
                                    <Text xs primary>
                                        Tag
                                    </Text>
                                    <Dropdown
                                        index={entry()?.tag}
                                        items={tags.map((t) => (
                                            <Field c h={48} w={300}>
                                                <Text xs secondary>
                                                    {t.title}
                                                </Text>
                                            </Field>
                                        ))}
                                        onChange={(v) => {
                                            const e = { ...entry()! }
                                            e.tag = v
                                            setEntry(e)
                                        }}
                                        buttonArgs={{ primary: true }}
                                    />
                                </Field>
                            </Field>
                            <Field s col gsm w={500}>
                                <Text xs primary>
                                    Notes
                                </Text>
                                <Textfield
                                    multiline
                                    xs
                                    placeholder='Notes'
                                    value={entry()?.notes}
                                    primary
                                    psm
                                    color='hsl(200, 18%, 32%)'
                                    change={(v) => {
                                        const u = { ...entry() }
                                        // u.name = v
                                        // setUnit(u)
                                    }}
                                />
                            </Field>
                        </Field>

                        <Field s gsm jce focus pmd>
                            {action == 'edit' && (
                                <Modal
                                    jcc
                                    pxl
                                    buttonContent={
                                        <Field
                                            style='background:rgb(200,120,120)'
                                            pmd
                                        />
                                    }
                                >
                                    <ConfirmModal
                                        confirmAction={() => {
                                            console.log('ok lets go')
                                            console.log('delete here..')
                                        }}
                                    />
                                </Modal>
                            )}

                            <Field />
                            <Button
                                tertiary
                                md
                                onClick={(e) => {
                                    console.log(action)
                                    console.log('save here..')
                                }}
                            >
                                <Text secondary xs>
                                    {action == 'edit' ? 'save' : 'add'}
                                </Text>
                            </Button>
                        </Field>
                    </Field>

                    {/* {(firstOpen() || action == 'edit') && (
                        <Field a focus></Field>
                    )} */}
                </Transition>
            </Field>
            {/* <Transition name='fade'>
                {showOptions() && <Field layer>{options()}</Field>}
                {!showOptions() && <Field layer>{manage()}</Field>}
            </Transition> */}
        </Field>
    )
}
