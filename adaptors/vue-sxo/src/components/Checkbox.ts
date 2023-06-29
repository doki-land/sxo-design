import { useCheckbox } from '@sxo/design';
import { type CheckboxOptions, getCheckboxClasses } from '@sxo/ui';
import { computed, defineComponent, h, inject, type PropType, provide, ref, watch } from 'vue';
import { useStyle } from '../hooks';

const CheckboxGroupSymbol = Symbol('CheckboxGroup');

export const CheckboxGroup = defineComponent({
    name: 'SxoCheckboxGroup',
    props: {
        modelValue: {
            type: Array as PropType<any[]>,
            default: () => [],
        },
        direction: {
            type: String as PropType<'row' | 'col'>,
            default: 'col',
        },
        gap: {
            type: [String, Number],
            default: 2,
        },
        size: {
            type: String as PropType<CheckboxOptions['size']>,
            default: 'md',
        },
        color: {
            type: String as PropType<CheckboxOptions['color']>,
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

        const toggleValue = (val: any) => {
            const index = internalValue.value.indexOf(val);
            if (index > -1) {
                internalValue.value.splice(index, 1);
            } else {
                internalValue.value.push(val);
            }
            emit('update:modelValue', [...internalValue.value]);
            emit('change', [...internalValue.value]);
        };

        provide(CheckboxGroupSymbol, {
            value: internalValue,
            size: props.size,
            color: props.color,
            toggleValue,
        });

        useStyle(() => `flex flex-${props.direction} gap-${props.gap} ${attrs.class || ''}`.trim());

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

export const Checkbox = defineComponent({
    name: 'SxoCheckbox',
    props: {
        modelValue: {
            type: Boolean,
            default: undefined,
        },
        value: {
            type: [String, Number, Boolean, Object],
            default: undefined,
        },
        size: {
            type: String as PropType<CheckboxOptions['size']>,
            default: undefined,
        },
        color: {
            type: String as PropType<CheckboxOptions['color']>,
            default: undefined,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    emits: ['update:modelValue', 'change'],
    setup(props, { emit, slots, attrs }) {
        const group = inject<any>(CheckboxGroupSymbol, null);

        const isChecked = computed(() => {
            if (group && props.value !== undefined) {
                return group.value.value.includes(props.value);
            }
            return props.modelValue ?? false;
        });

        const size = computed(() => props.size || group?.size || 'md');
        const color = computed(() => props.color || group?.color || 'primary');

        const { getInputProps, getLabelProps } = useCheckbox({
            defaultChecked: isChecked.value,
            disabled: props.disabled,
        });

        const classes = computed(() =>
            getCheckboxClasses(isChecked.value, {
                size: size.value,
                color: color.value,
                disabled: props.disabled,
            }),
        );

        useStyle(() => {
            const s = classes.value;
            return `${s.root} ${s.icon} ${attrs.class || ''}`.trim();
        });

        const handleToggle = () => {
            if (props.disabled) return;
            if (group && props.value !== undefined) {
                group.toggleValue(props.value);
            } else {
                emit('update:modelValue', !isChecked.value);
                emit('change', !isChecked.value);
            }
        };

        return () =>
            h(
                'label',
                {
                    ...getLabelProps(),
                    class: [
                        'inline-flex items-center gap-2 cursor-pointer',
                        props.disabled ? 'opacity-50 cursor-not-allowed' : '',
                        attrs.class,
                    ],
                },
                [
                    h(
                        'div',
                        {
                            class: classes.value.root,
                            onClick: handleToggle,
                        },
                        [
                            h('input', {
                                ...getInputProps(),
                                checked: isChecked.value,
                                class: 'sr-only',
                                readOnly: true,
                            }),
                            h(
                                'svg',
                                {
                                    class: classes.value.icon,
                                    width: '12',
                                    height: '12',
                                    viewBox: '0 0 12 12',
                                    fill: 'none',
                                    stroke: 'currentColor',
                                    'stroke-width': '2',
                                    'stroke-linecap': 'round',
                                    'stroke-linejoin': 'round',
                                },
                                [h('polyline', { points: '2 6 5 9 10 3' })],
                            ),
                        ],
                    ),
                    slots.default && h('span', { class: 'text-sm select-none' }, slots.default()),
                ],
            );
    },
});
