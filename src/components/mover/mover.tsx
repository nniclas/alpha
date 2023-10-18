import { createSignal } from 'solid-js'
import Field from '../../lib/elements/field/field'
import Text from '../../lib/elements/text/text'
import styles from './mover.module.css'

const flexClosed = 'flex-basis:400px; min-width:400px'
const flexOpen = 'flex-basis:calc(100% - 400px)'
const flexClosedCompact = 'flex-basis:60px; min-height:60px'
const flexOpenCompact = 'flex-basis:calc(100% - 60px)'
const style = 'transition:1s cubic-bezier(0.19, 1, 0.22, 1) all'

const w = 200
const s = 16
const wu = 64

interface Args {}

// responsive collapser
export const Mover = (a: Args) => {
    const [value, setValue] = createSignal<number>(0)

    const [drag, setDrag] = createSignal<boolean>(false)
    const [offsetX, setOffsetX] = createSignal<number>(0)
    const [x, setX] = createSignal<number>(0)

    const start = (e: any) => {
        setDrag(true)
        setOffsetX(e.clientX - x())
    }

    const move = (e: any) => {
        const margin = 0 // todo?

        if (drag()) {
            // const dir = e.movementX < 0 ? -1 : 1
            // let movement = e.movementX * 40

            let ps = e.clientX - offsetX()
            if (ps < 0) ps = 0
            if (ps > w - s) ps = w - s

            setX(ps)
        }
    }

    const end = () => {
        setDrag(false)
    }

    return (
        <Field gsm s h={wu} aic class={styles.mover}>
            <Field
                s
                onPointerDown={start}
                onPointerMove={move}
                onPointerUp={end}
                onPointerLeave={end}
                primary
                style={`width:${w}px; height:${s}px; border-radius:${s}px`}
            >
                <Field s rel>
                    <Field
                        c
                        s
                        style={`background:rgba(0,0,0,0.0); width:128px; height:128px; transform:translate(${
                            x() - (wu - s / 2)
                        }px, -${wu - s / 2}px);`}
                    >
                        <Field
                            s
                            accent
                            style={`width:${s}px; height:${s}px; border-radius:${s}px; `}
                        />
                    </Field>
                </Field>
            </Field>
            <Field>
                <Text md accent noselect>
                    {Math.round(x())}
                </Text>
            </Field>
        </Field>
    )
}
