import { getRadioClasses, type RadioOptions } from '@sxo/ui';
import {
    computed,
    defineComponent,
    h,
    inject,
    type PropType,
    provide,
    ref,
    watch,
    mergeProps,
} from 'vue';
import { useStyle } from '../hooks';

const RadioGroupSymbol = Symbol('RadioGroup');

export const RadioGroup = defineComponent({
    name: 'SxoRadioGroup',
    inheritAttrs: false,
    props: {
        modelValue: {
            type: String,
            default: '',
        },
        name: {
            type: String,
            default: () => `sxo-radio-group-${Math.random().toString(36).substr(2, 9)}`,
        },
        size: {
            type: String as PropType<RadioOptions['size']>,
            default: 'md',
        },
        color: {
            type: String as PropType<RadioOptions['color']>,
            default: 'primary',
        },
        /** 是否禁用整个组 */
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    emits: ['update:modelValue', 'change'],
    setup(props, { emit, slots, attrs }) {
        const internalValue = ref(props.modelValue);

        watch(
            () => props.modelValue,
            (val) => {
                internalValue.value = val;
            },
        );

        const updateValue = (val: string) => {
            if (props.disabled) return;
            internalValue.value = val;
            emit('update:modelValue', val);
            emit('change', val);
        };

        provide(RadioGroupSymbol, {
            value: internalValue,
            name: props.name,
            size: props.size,
            color: props.color,
            disabled: computed(() => props.disabled),
            updateValue,
        });

        return () =>
            h(
                'div',
                mergeProps(attrs, {
                    class: 'flex flex-col gap-2',
                }),
                slots.default?.(),
            );
    },
});

export const Radio = defineComponent({
    name: 'SxoRadio',
    inheritAttrs: false,
    props: {
        value: {
            type: String,
            required: true,
        },
        size: {
            type: String as PropType<RadioOptions['size']>,
            default: undefined,
        },
        color: {
            type: String as PropType<RadioOptions['color']>,
            default: undefined,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    setup(props, { slots, attrs }) {
        const group = inject<any>(RadioGroupSymbol);
        if (!group) throw new Error('Radio must be used within RadioGroup');

        const isSelected = computed(() => group.value.value === props.value);
        const size = computed(() => props.size || group.size);
        const color = computed(() => props.color || group.color);
        const disabled = computed(() => props.disabled || group.disabled?.value || false);

        const classes = computed(() =>
            getRadioClasses(isSelected.value, {
                size: size.value,
                color: color.value,
                disabled: disabled.value,
            }),
        );

        useStyle(() => {
            const s = classes.value;
            return [s.root, s.inner, s.label, s.text, attrs.class].filter(Boolean).join(' ');
        });

        return () =>
            h(
                'label',
                mergeProps(attrs, {
                    class: classes.value.label,
                }),
                [
                    h(
                        'div',
                        {
                            class: classes.value.root,
                            onClick: () => {
                                if (disabled.value) return;
                                group.updateValue(props.value);
                            },
                        },
                        [
                            h('input', {
                                type: 'radio',
                                name: group.name,
                                value: props.value,
                                checked: isSelected.value,
                                disabled: props.disabled,
                                class: 'sr-only',
                                readOnly: true,
                            }),
                            h('div', { class: classes.value.inner }),
                        ],
                    ),
                    slots.default && h('span', { class: classes.value.text }, slots.default()),
                ],
            );
    },
});
