import { useSelect } from '@sxo/design';
import { getSelectClasses, type SelectOptions } from '@sxo/ui';
import { computed, defineComponent, getCurrentInstance, h, inject, provide, ref, watch } from 'vue';
import { useStyle } from '../hooks';

const SelectSymbol = Symbol('Select');

export const Select = defineComponent({
    name: 'SxoSelect',
    props: {
        value: {
            type: String,
            default: '',
        },
        placeholder: {
            type: String,
            default: 'Select an option',
        },
        size: {
            type: String as () => SelectOptions['size'],
            default: 'md',
        },
        disabled: {
            type: Boolean,
            default: false,
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

        const { setValue, getTriggerProps, getListboxProps } = useSelect({
            defaultValue: internalValue.value,
        });

        const isOpen = ref(false);

        const classes = computed(() => getSelectClasses(isOpen.value, { size: props.size }));

        useStyle(() => `${classes.value.trigger} ${classes.value.listbox} ${attrs.class || ''}`);

        const handleSelect = (val: string) => {
            internalValue.value = val;
            setValue(val);
            emit('input', val);
            emit('change', val);
            isOpen.value = false;
        };

        provide(SelectSymbol, {
            currentValue: internalValue,
            handleSelect,
        });

        const instance = getCurrentInstance();
        const listeners = instance?.proxy.$listeners || {};

        return () => {
            const triggerProps = getTriggerProps();
            const listboxProps = getListboxProps();

            return h(
                'div',
                {
                    class: `relative inline-block w-full ${attrs.class || ''}`.trim(),
                },
                [
                    h(
                        'div',
                        {
                            attrs: {
                                id: triggerProps.id,
                                role: triggerProps.role,
                                'aria-expanded': isOpen.value,
                                'aria-haspopup': triggerProps['aria-haspopup'],
                                'aria-controls': triggerProps['aria-controls'],
                                tabIndex: triggerProps.tabIndex,
                            },
                            class: classes.value.trigger,
                            on: {
                                click: () => {
                                    if (!props.disabled) isOpen.value = !isOpen.value;
                                },
                                ...listeners,
                            },
                        },
                        [
                            h(
                                'span',
                                {
                                    class: internalValue.value
                                        ? 'text-foreground'
                                        : 'text-neutral-400',
                                },
                                internalValue.value || props.placeholder,
                            ),
                            h(
                                'svg',
                                {
                                    class: `transition-transform duration-200 ${isOpen.value ? 'rotate-180' : ''}`,
                                    attrs: {
                                        width: '16',
                                        height: '16',
                                        viewBox: '0 0 24 24',
                                        fill: 'none',
                                        stroke: 'currentColor',
                                        'stroke-width': '2',
                                    },
                                },
                                [h('polyline', { attrs: { points: '6 9 12 15 18 9' } })],
                            ),
                        ],
                    ),
                    h(
                        'ul',
                        {
                            attrs: {
                                id: listboxProps.id,
                                role: listboxProps.role,
                                tabIndex: listboxProps.tabIndex,
                                hidden: !isOpen.value,
                            },
                            class: classes.value.listbox,
                            style: { display: isOpen.value ? 'block' : 'none' },
                        },
                        slots.default?.(),
                    ),
                ],
            );
        };
    },
});

export const SelectOption = defineComponent({
    name: 'SxoSelectOption',
    props: {
        value: {
            type: String,
            required: true,
        },
    },
    setup(props, { slots, attrs }) {
        const select = inject<any>(SelectSymbol);
        if (!select) throw new Error('SelectOption must be used within Select');

        const isSelected = computed(() => select.currentValue.value === props.value);
        const classes = getSelectClasses(false); // Base option classes

        useStyle(() => `${classes.option} ${attrs.class || ''}`);

        return () =>
            h(
                'div',
                {
                    class: `${classes.option} ${
                        isSelected.value ? 'bg-primary/10 text-primary font-medium' : ''
                    } ${attrs.class || ''}`.trim(),
                    on: {
                        click: () => select.handleSelect(props.value),
                    },
                },
                slots.default?.(),
            );
    },
});
