import { getInputClasses, type InputOptions } from '@sxo/ui';
import { computed, defineComponent, h, getCurrentInstance } from 'vue';
import { useStyle } from '../hooks';

export const Input = defineComponent({
    name: 'SxoInput',
    props: {
        variant: {
            type: String as () => InputOptions['variant'],
            default: 'outline',
        },
        size: {
            type: String as () => InputOptions['size'],
            default: 'md',
        },
        invalid: {
            type: Boolean,
            default: false,
        },
        value: {
            type: [String, Number],
            default: '',
        },
    },
    setup(props, { emit, attrs }) {
        const instance = getCurrentInstance();
        const listeners = instance?.proxy.$listeners || {};

        const sxoClasses = computed(() => {
            return getInputClasses({
                variant: props.variant,
                size: props.size,
                invalid: props.invalid,
            });
        });

        useStyle(() => `${sxoClasses.value} ${attrs.class || ''}`.trim());

        const onInput = (event: Event) => {
            emit('input', (event.target as HTMLInputElement).value);
        };

        return () =>
            h('input', {
                attrs: {
                    ...attrs,
                    value: props.value,
                },
                class: [sxoClasses.value, attrs.class],
                on: {
                    ...listeners,
                    input: onInput,
                },
            });
    },
});
