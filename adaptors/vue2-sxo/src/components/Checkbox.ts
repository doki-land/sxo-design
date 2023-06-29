import { type CheckboxOptions, getCheckboxClasses } from '@sxo/ui';
import { computed, defineComponent, h, inject, provide, ref, watch } from 'vue';
import { useStyle } from '../hooks';

const CheckboxGroupSymbol = Symbol('CheckboxGroup');

export const CheckboxGroup = defineComponent({
    name: 'SxoCheckboxGroup',
    props: {
        value: {
            type: Array,
            default: () => [],
        },
        direction: {
            type: String as () => 'row' | 'col',
            default: 'col',
        },
        gap: {
            type: [String, Number],
            default: 2,
        },
        size: {
            type: String as () => CheckboxOptions['size'],
            default: 'md',
        },
        color: {
            type: String as () => CheckboxOptions['color'],
            default: 'primary',
        },
    },
    setup(props, { emit, slots, attrs }) {
        const internalValue = ref([...props.value]);

        watch(
            () => props.value,
            (val) => {
                internalValue.value = [...val];
            },
        );

        const toggleValue = (val: any) => {
            const index = internalValue.value.indexOf(val);
            if (index > -1) {
                internalValue.value.splice(index, 1);
            } else {
                internalValue.value.push(val);
            }
            const newValue = [...internalValue.value];
            emit('input', newValue);
            emit('change', newValue);
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
                    attrs: { ...attrs },
                },
                slots.default?.(),
            );
    },
});

export const Checkbox = defineComponent({
    name: 'SxoCheckbox',
    model: {
        prop: 'checked',
        event: 'input',
    },
    props: {
        checked: {
            type: [Boolean, String, Number, Object],
            default: undefined,
        },
        label: {
            type: String,
            default: '',
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        value: {
            type: [String, Number, Boolean, Object],
            default: undefined,
        },
        size: {
            type: String as () => CheckboxOptions['size'],
            default: undefined,
        },
        color: {
            type: String as () => CheckboxOptions['color'],
            default: undefined,
        },
    },
    setup(props, { emit, attrs, slots }) {
        const group = inject<any>(CheckboxGroupSymbol, null);

        const isChecked = computed(() => {
            if (group && props.value !== undefined) {
                return group.value.value.includes(props.value);
            }
            return props.checked === true;
        });

        const size = computed(() => props.size || group?.size || 'md');
        const color = computed(() => props.color || group?.color || 'primary');

        const classes = computed(() => {
            return getCheckboxClasses(isChecked.value, {
                size: size.value,
                color: color.value,
                disabled: props.disabled,
            });
        });

        useStyle(() => {
            const s = classes.value;
            return `${s.root} ${s.icon} ${attrs.class || ''}`.trim();
        });

        const handleChange = (e: any) => {
            if (props.disabled) return;

            const checked = e.target.checked;
            if (group && props.value !== undefined) {
                group.toggleValue(props.value);
            } else {
                emit('input', checked);
                emit('change', checked);
            }
        };

        return () =>
            h(
                'label',
                {
                    class: [
                        'inline-flex items-center cursor-pointer select-none',
                        props.disabled ? 'opacity-50 cursor-not-allowed' : '',
                        attrs.class,
                    ],
                },
                [
                    h('input', {
                        attrs: {
                            type: 'checkbox',
                            checked: isChecked.value,
                            disabled: props.disabled,
                            ...attrs,
                        },
                        class: 'hidden',
                        on: {
                            change: handleChange,
                        },
                    }),
                    h(
                        'div',
                        {
                            class: classes.value.root,
                        },
                        [
                            h(
                                'svg',
                                {
                                    class: classes.value.icon,
                                    attrs: {
                                        width: '12',
                                        height: '12',
                                        viewBox: '0 0 12 12',
                                        fill: 'none',
                                        stroke: 'currentColor',
                                        'stroke-width': '2',
                                        'stroke-linecap': 'round',
                                        'stroke-linejoin': 'round',
                                    },
                                },
                                [h('polyline', { attrs: { points: '2 6 5 9 10 3' } })],
                            ),
                        ],
                    ),
                    props.label || slots.default
                        ? h(
                              'span',
                              { class: 'ml-2 text-sm' },
                              slots.default ? slots.default() : props.label,
                          )
                        : null,
                ],
            );
    },
});
