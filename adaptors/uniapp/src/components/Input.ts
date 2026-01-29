import { getInputClasses, type InputOptions } from '@sxo/ui';
import { computed, defineComponent, h, type PropType, mergeProps } from 'vue';
import { useStyle } from '../hooks';

export const Input = defineComponent({
    name: 'SxoInput',
    inheritAttrs: false,
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
        readonly: {
            type: Boolean,
            default: false,
        },
        modelValue: {
            type: [String, Number] as PropType<string | number>,
            default: '',
        },
        type: {
            type: String,
            default: 'text',
        },
        placeholder: String,
    },
    emits: ['update:modelValue'],
    setup(props, { emit, attrs, slots }) {
        const styles = computed(() =>
            getInputClasses({
                variant: props.variant,
                size: props.size,
                invalid: props.invalid,
                disabled: props.disabled,
                readonly: props.readonly,
            }),
        );

        useStyle(() => `${styles.value.container} ${attrs.class || ''}`.trim());

        const onInput = (event: Event) => {
            if (props.readonly || props.disabled) return;
            const value = (event.target as HTMLInputElement).value;
            emit('update:modelValue', value);
        };

        return () => {
            const { class: className, ...otherAttrs } = attrs;
            return h('div', { class: [styles.value.container, className] }, [
                slots.prefix ? h('div', { class: styles.value.prefix }, slots.prefix()) : null,
                h(
                    'input',
                    mergeProps(otherAttrs, {
                        class: styles.value.input,
                        value: props.modelValue,
                        disabled: props.disabled,
                        readonly: props.readonly,
                        onInput,
                        type: props.type,
                        placeholder: props.placeholder,
                    }),
                ),
                slots.suffix ? h('div', { class: styles.value.suffix }, slots.suffix()) : null,
            ]);
        };
    },
});
