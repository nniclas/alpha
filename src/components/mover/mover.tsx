import { createSignal } from 'solid-js'
import Field from '../../lib/elements/field/field'
import Text from '../../lib/elements/text/text'
import styles from './mover.module.css'

const w = 200
const size = 16
const handleSize = 64

interface Args {}

// responsive collapser
export const Mover = (a: Args) => {
    const [drag, setDrag] = createSignal<boolean>(false)
    const [offsetX, setOffsetX] = createSignal<number>(0)
    const [x, setX] = createSignal<number>(0)

    const start = (e: any) => {
        setDrag(true)
        setOffsetX(e.clientX - x())
    }

    const move = (e: any) => {
        if (drag()) {
            let ps = e.clientX - offsetX()
            if (ps < 0) ps = 0
            if (ps > w - size) ps = w - size
            setX(ps)
        }
    }

    const end = () => {
        setDrag(false)
    }

    return (
        <Field gsm s h={handleSize} aic class={styles.mover}>
            <Field
                s
                onPointerDown={start}
                onPointerMove={move}
                onPointerUp={end}
                onPointerLeave={end}
                primary
                style={`width:${w}px; height:${size}px; border-radius:${size}px`}
            >
                <Field s rel>
                    <Field
                        c
                        s
                        class={styles.handle}
                        style={`transform:translate(${
                            x() - (handleSize - size / 2)
                        }px, -${handleSize - size / 2}px);`}
                    >
                        <Field
                            s
                            accent
                            style={`width:${size}px; height:${size}px; border-radius:${size}px; `}
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
