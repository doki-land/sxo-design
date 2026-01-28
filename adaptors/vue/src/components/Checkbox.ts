import { useCheckbox } from '@sxo/design';
import { type CheckboxOptions, getCheckboxClasses } from '@sxo/ui';
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

const CheckboxGroupSymbol = Symbol('CheckboxGroup');

export const CheckboxGroup = defineComponent({
    name: 'SxoCheckboxGroup',
    inheritAttrs: false,
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

        const toggleValue = (val: any) => {
            if (props.disabled) return;
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
            disabled: computed(() => props.disabled),
            toggleValue,
        });

        useStyle(() => `flex flex-${props.direction} gap-${props.gap} ${attrs.class || ''}`.trim());

        return () =>
            h(
                'div',
                mergeProps(attrs, {
                    class: `flex flex-${props.direction} gap-${props.gap}`,
                }),
                slots.default?.(),
            );
    },
});

export const Checkbox = defineComponent({
    name: 'SxoCheckbox',
    inheritAttrs: false,
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
        const disabled = computed(() => props.disabled || group?.disabled?.value || false);

        const { getInputProps, getLabelProps } = useCheckbox({
            defaultChecked: isChecked.value,
            disabled: disabled.value,
        });

        const classes = computed(() =>
            getCheckboxClasses(isChecked.value, {
                size: size.value,
                color: color.value,
                disabled: disabled.value,
            }),
        );

        useStyle(() => {
            const s = classes.value;
            return `${s.root} ${s.icon} ${s.label} ${s.text} ${attrs.class || ''}`.trim();
        });

        const handleToggle = (e: MouseEvent) => {
            if (disabled.value) return;
            // 如果点击的是 input 或者是 label 触发的默认点击，我们已经在 handleToggle 中处理了状态
            // 为了防止两次触发，我们可以阻止默认行为或者只在一个地方监听
            e.preventDefault();
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
                mergeProps(getLabelProps(), attrs, {
                    class: classes.value.label,
                    onClick: handleToggle,
                }),
                [
                    h(
                        'div',
                        {
                            class: classes.value.root,
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
                    slots.default && h('span', { class: classes.value.text }, slots.default()),
                ],
            );
    },
});
