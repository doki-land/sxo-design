import { getInputClasses, type InputOptions } from '@sxo/ui';
import { computed, defineComponent, h, type PropType } from 'vue';
import { useStyle } from '../hooks';

export const Input = defineComponent({
    name: 'SxoInput',
    props: {
        variant: {
            type: String as PropType<InputOptions['variant']>,
            default: 'outline',
        },
        size: {
            type: String as PropType<InputOptions['size']>,
            default: 'md',
        },
        invalid: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        modelValue: {
            type: [String, Number] as PropType<string | number>,
            default: '',
        },
    },
    emits: ['update:modelValue'],
    setup(props, { emit, attrs, slots }) {
        const styles = computed(() =>
            getInputClasses({
                variant: props.variant,
                size: props.size,
                invalid: props.invalid,
                disabled: props.disabled,
            }),
        );

        useStyle(() => `${styles.value.container} ${attrs.class || ''}`.trim());

        const onInput = (event: Event) => {
            emit('update:modelValue', (event.target as HTMLInputElement).value);
        };

        return () =>
            h('div', { class: [styles.value.container, attrs.class] }, [
                slots.prefix ? h('div', { class: styles.value.prefix }, slots.prefix()) : null,
                h('input', {
                    ...attrs,
                    class: styles.value.input,
                    value: props.modelValue,
                    disabled: props.disabled,
                    onInput,
                }),
                slots.suffix ? h('div', { class: styles.value.suffix }, slots.suffix()) : null,
            ]);
    },
});
