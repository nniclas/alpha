import Text from '../../lib/elements/text/text'
import Field from '../../lib/elements/field/field'
import Button from '../../lib/elements/button/button'
import Modal from '../../lib/components/modal/modal'
import { createEffect, createSignal } from 'solid-js'
import Textfield from '../../lib/elements/textfield/textfield'
import { isABtn } from '../../common/utils'
import ConfirmModal from '../../components/confirm-modal/confirm-modal'
import { Transition } from 'solid-transition-group'
import { Entry } from '../../types/entities/entry'
import SelectField from '../../lib/components/select-field/select-field'
import { events, measures, tags } from '../../common/constants'
import { date } from '../../common/date-utils'

interface Args {
    entry?: Entry
}

const btnStyle = {
    tertiary: true,
}

export default (a: Args) => {
    const action = a.entry ? 'edit' : 'add'

    const [done, setDone] = createSignal<boolean>(false)
    const [isEntryChanged, setIsEntryChanged] = createSignal<boolean>(false)
    const [entry, setEntry] = createSignal<Entry>(
        a.entry ?? {
            unitId: 0,
            userId: 0,
            event: 0,
            measure: 0,
            tag: 0,
            date: date(),
        }
    )
    createEffect(() => {
        setIsEntryChanged(JSON.stringify(a.entry) != JSON.stringify(entry()))
    })

    return (
        <Field
            rel
            res={{ s: false, w: 'auto', h: 'auto' }}
            onClick={(e: any) => {
                if (!isABtn(e.target)) e.stopPropagation()
            }}
        >
            <Field a col>
                <Transition name='fade'>
                    <Field a col>
                        <Field s h={80} res={{ h: 60 }} c secondary>
                            <Field s c h={80} w={80} res={{ h: 60, w: 60 }}>
                                {isEntryChanged() ? (
                                    <Text lg accent style='margin-top:-6px'>
                                        •
                                    </Text>
                                ) : (
                                    <></>
                                )}
                            </Field>
                            <Field>
                                <Text accent>{entry()?.id ?? 'New event'}</Text>
                            </Field>
                        </Field>

                        <Field plg col gmd res={{ glg: true }} c secondary>
                            <Field s gmd col>
                                <Field s col gxs res={{ w: 200, h: 60 }}>
                                    <Text xs primary>
                                        Event
                                    </Text>
                                    <SelectField
                                        index={entry()?.event}
                                        items={events.map((e) => (
                                            <Field c h={48} w={200}>
                                                <Text xs accent>
                                                    {e.title}
                                                </Text>
                                            </Field>
                                        ))}
                                        onChange={(v) => {
                                            const e = { ...entry()! }
                                            e.event = v
                                            setEntry(e)
                                        }}
                                        buttonArgs={btnStyle}
                                    />
                                </Field>
                                <Field s col gxs res={{ w: 200, h: 60 }}>
                                    <Text xs primary>
                                        Measure
                                    </Text>
                                    <SelectField
                                        index={entry()?.measure}
                                        items={measures.map((m) => (
                                            <Field c h={48} w={200}>
                                                <Text xs accent>
                                                    {m.title}
                                                </Text>
                                            </Field>
                                        ))}
                                        onChange={(v) => {
                                            const e = { ...entry()! }
                                            e.measure = v
                                            setEntry(e)
                                        }}
                                        buttonArgs={btnStyle}
                                    />
                                </Field>
                            </Field>
                            <Field s glg col>
                                <Field
                                    s
                                    col
                                    gxs
                                    w={200}
                                    res={{ w: 200, h: 80 }}
                                >
                                    <Text xs primary>
                                        Tag
                                    </Text>
                                    <SelectField
                                        index={entry()?.tag}
                                        items={tags.map((t) => (
                                            <Field
                                                c
                                                h={48}
                                                w={200}
                                                res={{ w: 200, h: 60 }}
                                            >
                                                <Text xs accent>
                                                    {t.title}
                                                </Text>
                                            </Field>
                                        ))}
                                        onChange={(v) => {
                                            const e = { ...entry()! }
                                            e.tag = v
                                            setEntry(e)
                                        }}
                                        buttonArgs={btnStyle}
                                    />
                                </Field>
                                <Field
                                    s
                                    col
                                    gxs
                                    w={200}
                                    res={{ w: 200, h: 48 }}
                                >
                                    <Text xs primary>
                                        Date
                                    </Text>
                                    <Textfield
                                        tertiary
                                        md
                                        psm
                                        placeholder='Today'
                                        value={entry()?.notes}
                                        change={(v) => {
                                            ///,...............
                                        }}
                                        style='pointer-events:none; user-select:none'
                                    >
                                        Today
                                    </Textfield>
                                </Field>
                            </Field>
                            <Field s col gxs w={200} res={{ w: 200 }}>
                                <Text xs primary>
                                    Notes
                                </Text>
                                <Textfield
                                    tertiary
                                    md
                                    placeholder='Notes'
                                    value={entry()?.notes}
                                    psm
                                    change={(v) => {
                                        const u = { ...entry() }
                                        // u.name = v
                                        // setUnit(u)
                                    }}
                                />
                            </Field>
                        </Field>

                        <Field s gsm jce pmd secondary>
                            {action == 'edit' && (
                                <Modal
                                    c
                                    s
                                    pxl
                                    buttonContent={
                                        <Field
                                            style='background:rgb(200,120,120)'
                                            pmd
                                        />
                                    }
                                >
                                    <ConfirmModal
                                        header='Delete entry?'
                                        confirmAction={() => {
                                            console.log('ok lets go')
                                            console.log('delete here..')
                                        }}
                                    />
                                </Modal>
                            )}

                            <Button
                                tertiary
                                md
                                onClick={(e) => {
                                    console.log(action)
                                    console.log('save here..')
                                }}
                            >
                                <Text primary xs>
                                    {action == 'edit' ? 'save' : 'add'}
                                </Text>
                            </Button>
                        </Field>
                    </Field>
                </Transition>
            </Field>
        </Field>
    )
}
