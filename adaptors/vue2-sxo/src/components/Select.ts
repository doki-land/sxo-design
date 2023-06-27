import { useSelect } from '@sxo/design';
import { getSelectClasses, type SelectOptions } from '@sxo/ui';
import { computed, defineComponent, h, inject, provide, ref, watch, getCurrentInstance } from 'vue';
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

        const { isOpen, setValue, getTriggerProps, getListboxProps } = useSelect({
            defaultValue: internalValue.value,
        });

        const classes = computed(() => getSelectClasses(isOpen.value, { size: props.size }));

        useStyle(() => `${classes.value.trigger} ${classes.value.listbox} ${attrs.class || ''}`);

        const handleSelect = (val: string) => {
            internalValue.value = val;
            setValue(val);
            emit('input', val);
            emit('change', val);
        };

        provide(SelectSymbol, {
            currentValue: internalValue,
            handleSelect,
        });

        const instance = getCurrentInstance();
        const listeners = instance?.proxy.$listeners || {};

        return () =>
            h(
                'div',
                {
                    class: `relative inline-block w-full ${attrs.class || ''}`.trim(),
                },
                [
                    h(
                        'div',
                        {
                            attrs: { ...getTriggerProps().attrs },
                            class: classes.value.trigger,
                            on: { ...getTriggerProps().on, ...listeners },
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
                    isOpen.value
                        ? h(
                              'div',
                              {
                                  attrs: { ...getListboxProps().attrs },
                                  class: classes.value.listbox,
                                  on: { ...getListboxProps().on },
                              },
                              slots.default?.(),
                          )
                        : null,
                ],
            );
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
