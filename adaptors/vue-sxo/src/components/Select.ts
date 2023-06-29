import { useSelect } from '@sxo/design';
import { getSelectClasses, type SelectOptions } from '@sxo/ui';
import { computed, defineComponent, h, inject, type PropType, provide, ref, watch } from 'vue';
import { useStyle } from '../hooks';
import { VirtualList as SxoVirtualList } from './VirtualList';

const SelectSymbol = Symbol('Select');

export const Select = defineComponent({
    name: 'SxoSelect',
    props: {
        /** 选中的值 */
        modelValue: {
            type: String,
            default: '',
        },
        /** 占位提示语 */
        placeholder: {
            type: String,
            default: 'Select an option',
        },
        /** 尺寸 */
        size: {
            type: String as PropType<SelectOptions['size']>,
            default: 'md',
        },
        /** 选项列表（数据驱动模式） */
        options: {
            type: Array as PropType<{ label: string; value: string; disabled?: boolean }[]>,
            default: () => [],
        },
        /** 是否开启虚拟滚动 */
        virtual: {
            type: Boolean,
            default: false,
        },
        /** 虚拟滚动行高 */
        itemHeight: {
            type: Number,
            default: 36,
        },
        /** 虚拟滚动容器高度 */
        height: {
            type: Number,
            default: 200,
        },
        /** 是否禁用 */
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

        const select = useSelect({
            defaultValue: internalValue.value,
            disabled: props.disabled,
        });

        const classes = computed(() =>
            getSelectClasses(select.isOpen, {
                size: props.size,
                disabled: props.disabled,
            }),
        );

        useStyle(() => `${classes.value.trigger} ${classes.value.listbox} ${attrs.class || ''}`);

        const handleSelect = (val: string) => {
            if (props.disabled) return;
            internalValue.value = val;
            select.setValue(val);
            emit('update:modelValue', val);
            emit('change', val);
        };

        provide(SelectSymbol, {
            currentValue: internalValue,
            handleSelect,
        });

        const getSelectedLabel = () => {
            if (props.options.length > 0) {
                const selected = props.options.find((opt) => opt.value === internalValue.value);
                return selected ? selected.label : props.placeholder;
            }
            return internalValue.value || props.placeholder;
        };

        return () =>
            h(
                'div',
                {
                    class: `relative inline-block w-full ${attrs.class || ''}`.trim(),
                },
                [
                    h('div', { ...select.getTriggerProps(), class: classes.value.trigger }, [
                        h(
                            'span',
                            {
                                class: internalValue.value ? 'text-foreground' : 'text-neutral-400',
                            },
                            getSelectedLabel(),
                        ),
                        h(
                            'svg',
                            {
                                class: `transition-transform duration-200 ${select.isOpen ? 'rotate-180' : ''}`,
                                width: '16',
                                height: '16',
                                viewBox: '0 0 24 24',
                                fill: 'none',
                                stroke: 'currentColor',
                                'stroke-width': '2',
                            },
                            [h('polyline', { points: '6 9 12 15 18 9' })],
                        ),
                    ]),
                    h(
                        'div',
                        { ...select.getListboxProps(), class: classes.value.listbox },
                        props.virtual && props.options.length > 0
                            ? h(
                                  SxoVirtualList,
                                  {
                                      items: props.options,
                                      itemHeight: props.itemHeight,
                                      containerHeight: props.height,
                                  },
                                  {
                                      default: ({ item }: any) =>
                                          h(
                                              SelectOption,
                                              {
                                                  value: item.value,
                                                  key: item.value,
                                              },
                                              () => item.label,
                                          ),
                                  },
                              )
                            : props.options.length > 0
                              ? props.options.map((opt) =>
                                    h(
                                        SelectOption,
                                        { value: opt.value, key: opt.value },
                                        () => opt.label,
                                    ),
                                )
                              : slots.default?.(),
                    ),
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
                    class: `${classes.option} ${isSelected.value ? 'bg-primary/10 text-primary font-medium' : ''} ${attrs.class || ''}`.trim(),
                    onClick: () => select.handleSelect(props.value),
                },
                slots.default?.() as any,
            );
    },
});
