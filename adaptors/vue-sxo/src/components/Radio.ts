import { useRadioGroup } from '@sxo/design';
import { getRadioClasses, type RadioOptions } from '@sxo/ui';
import { computed, defineComponent, h, inject, type PropType, provide, ref, watch } from 'vue';
import { useStyle } from '../hooks';

const RadioGroupSymbol = Symbol('RadioGroup');

export const RadioGroup = defineComponent({
    name: 'SxoRadioGroup',
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
            internalValue.value = val;
            emit('update:modelValue', val);
            emit('change', val);
        };

        provide(RadioGroupSymbol, {
            value: internalValue,
            name: props.name,
            size: props.size,
            color: props.color,
            updateValue,
        });

        return () =>
            h(
                'div',
                {
                    class: `flex flex-col gap-2 ${attrs.class || ''}`.trim(),
                },
                slots.default?.(),
            );
    },
});

export const Radio = defineComponent({
    name: 'SxoRadio',
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
    },
    setup(props, { slots, attrs }) {
        const group = inject<any>(RadioGroupSymbol);
        if (!group) throw new Error('Radio must be used within RadioGroup');

        const isSelected = computed(() => group.value.value === props.value);
        const size = computed(() => props.size || group.size);
        const color = computed(() => props.color || group.color);

        const classes = computed(() =>
            getRadioClasses(isSelected.value, {
                size: size.value,
                color: color.value,
            }),
        );

        useStyle(() => {
            const s = classes.value;
            return [s.root, s.inner, attrs.class].filter(Boolean).join(' ');
        });

        return () =>
            h(
                'label',
                {
                    class: ['inline-flex items-center gap-2 cursor-pointer', attrs.class],
                },
                [
                    h(
                        'div',
                        {
                            class: classes.value.root,
                            onClick: () => group.updateValue(props.value),
                        },
                        [
                            h('input', {
                                type: 'radio',
                                name: group.name,
                                value: props.value,
                                checked: isSelected.value,
                                class: 'sr-only',
                                readOnly: true,
                            }),
                            h('div', { class: classes.value.inner }),
                        ],
                    ),
                    slots.default?.(),
                ],
            );
    },
});
