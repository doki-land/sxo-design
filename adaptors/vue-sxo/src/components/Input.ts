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
        modelValue: {
            type: [String, Number] as PropType<string | number>,
            default: '',
        },
    },
    emits: ['update:modelValue'],
    setup(props, { emit, attrs }) {
        const sxoClasses = computed(() =>
            getInputClasses({
                variant: props.variant,
                size: props.size,
                invalid: props.invalid,
            }),
        );

        useStyle(() => `${sxoClasses.value} ${attrs.class || ''}`.trim());

        const onInput = (event: Event) => {
            emit('update:modelValue', (event.target as HTMLInputElement).value);
        };

        return () =>
            h('input', {
                ...attrs,
                class: [sxoClasses.value, attrs.class],
                value: props.modelValue,
                onInput,
            });
    },
});
