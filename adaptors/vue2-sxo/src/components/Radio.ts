import { getRadioClasses, type RadioOptions } from '@sxo/ui';
import { computed, defineComponent, getCurrentInstance, h, inject, provide, ref, watch } from 'vue';
import { useStyle } from '../hooks';

const RadioGroupSymbol = Symbol('RadioGroup');

export const RadioGroup = defineComponent({
    name: 'SxoRadioGroup',
    props: {
        value: {
            type: String,
            default: '',
        },
        name: {
            type: String,
            default: () => `sxo-radio-group-${Math.random().toString(36).substr(2, 9)}`,
        },
        size: {
            type: String as () => RadioOptions['size'],
            default: 'md',
        },
        color: {
            type: String as () => RadioOptions['color'],
            default: 'primary',
        },
        direction: {
            type: String as () => 'row' | 'col',
            default: 'row',
        },
        gap: {
            type: [String, Number],
            default: 2,
        },
    },
    setup(props, { emit, slots, attrs }) {
        const internalValue = ref(props.value);

        watch(
            () => props.value,
            (val) => {
                internalValue.value = val;
            },
        );

        const updateValue = (val: string) => {
            internalValue.value = val;
            emit('input', val);
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
                    class: `flex flex-${props.direction} gap-${props.gap} ${attrs.class || ''}`.trim(),
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
        label: {
            type: String,
            default: '',
        },
        size: {
            type: String as () => RadioOptions['size'],
            default: undefined,
        },
        color: {
            type: String as () => RadioOptions['color'],
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

        const instance = getCurrentInstance();
        const listeners = instance?.proxy.$listeners || {};

        const isSelected = computed(() => group.value.value === props.value);
        const size = computed(() => props.size || group.size);
        const color = computed(() => props.color || group.color);

        const classes = computed(() =>
            getRadioClasses(isSelected.value, {
                size: size.value,
                color: color.value,
            } as any),
        );

        useStyle(() => {
            const s = classes.value;
            return [s.root, s.inner, attrs.class].filter(Boolean).join(' ');
        });

        const handleClick = () => {
            if (props.disabled) return;
            group.updateValue(props.value);
        };

        return () =>
            h(
                'label',
                {
                    class: [
                        'inline-flex items-center gap-2 cursor-pointer',
                        props.disabled ? 'opacity-50 cursor-not-allowed' : '',
                        attrs.class,
                    ],
                    on: {
                        click: handleClick,
                    },
                },
                [
                    h('div', { class: classes.value.root }, [
                        h('input', {
                            attrs: {
                                type: 'radio',
                                name: group.name,
                                value: props.value,
                                checked: isSelected.value,
                                disabled: props.disabled,
                            },
                            class: 'sr-only',
                            on: {
                                change: handleClick,
                                ...listeners,
                            },
                        }),
                        h('div', { class: classes.value.inner }),
                    ]),
                    (slots.default?.() || props.label) &&
                        h(
                            'span',
                            { class: 'text-sm font-medium' },
                            slots.default?.() || props.label,
                        ),
                ],
            );
    },
});
