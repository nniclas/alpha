import { Component, For, Suspense, createEffect } from 'solid-js'
import Field from '../lib/elements/field/field'
import Button from '../lib/elements/button/button'
import Text from '../lib/elements/text/text'
import testStore from '../core/test-store'

export const Dev: Component = () => {
    createEffect(() => {
        // console.log(testStore.selectedUnitId(), testStore.selectedUnitRes())
    })

    return (
        <Field rel>
            <Field s plg col gmd>
                <Field s>
                    <Text sm primary>
                        sites
                    </Text>
                </Field>
                <Suspense
                    fallback={
                        <Text md tertiary>
                            Calculating the future...
                        </Text>
                    }
                >
                    <Field s gmd>
                        <For each={testStore.unitsRes()}>
                            {(v, i) => (
                                <Button
                                    tertiary
                                    w={200}
                                    h={60}
                                    onClick={() =>
                                        testStore.setSelectedUnitId(i() + 1)
                                    }
                                >
                                    <Text xs secondary>
                                        {v.name}
                                    </Text>
                                </Button>
                            )}
                        </For>
                    </Field>
                </Suspense>
                <Field s>
                    <Text sm primary>
                        selected site
                    </Text>
                </Field>
                <Suspense
                    fallback={
                        <Text md tertiary>
                            Fabricating spacetime...
                        </Text>
                    }
                >
                    <Field s secondary w={300} h={60} c>
                        <Text xs accent>
                            {testStore.selectedUnitRes()?.name}
                        </Text>
                    </Field>
                </Suspense>
                <Field s>
                    <Text sm primary>
                        entries by site
                    </Text>
                </Field>
                <Suspense
                    fallback={
                        <Text md tertiary>
                            Entering wormholes...
                        </Text>
                    }
                >
                    <Field s gmd>
                        <For each={testStore.entriesRes()}>
                            {(v, i) => (
                                <Field s secondary w={200} h={60} c>
                                    <Text xs accent>
                                        {v.id}
                                    </Text>
                                </Field>
                            )}
                        </For>
                    </Field>
                </Suspense>
            </Field>
        </Field>
    )
}
