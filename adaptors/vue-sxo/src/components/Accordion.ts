import { useAccordion } from '@sxo/design';
import { type AccordionOptions, getAccordionClasses } from '@sxo/ui';
import { computed, defineComponent, h, inject, type PropType, provide, ref, watch } from 'vue';
import { useStyle } from '../hooks';

const AccordionSymbol = Symbol('SxoAccordion');

export const Accordion = defineComponent({
    name: 'SxoAccordion',
    props: {
        modelValue: {
            type: Array as PropType<string[]>,
            default: () => [],
        },
        allowMultiple: {
            type: Boolean,
            default: false,
        },
        variant: {
            type: String as PropType<AccordionOptions['variant']>,
            default: 'bordered',
        },
    },
    emits: ['update:modelValue'],
    setup(props, { emit, slots, attrs }) {
        const expandedItems = ref<string[]>(props.modelValue);

        watch(
            () => props.modelValue,
            (val) => {
                expandedItems.value = val;
            },
        );

        const toggleItem = (itemId: string) => {
            if (expandedItems.value.includes(itemId)) {
                expandedItems.value = expandedItems.value.filter((id) => id !== itemId);
            } else {
                expandedItems.value = props.allowMultiple
                    ? [...expandedItems.value, itemId]
                    : [itemId];
            }
            emit('update:modelValue', expandedItems.value);
        };

        const { getItemProps } = useAccordion({
            allowMultiple: props.allowMultiple,
            defaultExpanded: expandedItems.value,
        });

        const styles = computed(() => getAccordionClasses({ variant: props.variant }));

        useStyle(() => {
            const s = styles.value;
            return [
                s.root,
                s.trigger,
                s.triggerText,
                s.panel,
                s.item(true),
                s.item(false),
                s.icon(true),
                s.icon(false),
                attrs.class,
            ]
                .filter(Boolean)
                .join(' ');
        });

        provide(AccordionSymbol, {
            expandedItems,
            toggleItem,
            getItemProps,
            styles,
        });

        return () => h('div', { ...attrs, class: styles.value.root }, slots.default?.());
    },
});

export const AccordionItem = defineComponent({
    name: 'SxoAccordionItem',
    props: {
        value: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
    },
    setup(props, { slots, attrs }) {
        const ctx = inject<any>(AccordionSymbol);

        return () => {
            const isExpanded = ctx.expandedItems.value.includes(props.value);
            const { triggerProps, panelProps } = ctx.getItemProps(props.value, ctx.toggleItem);

            return h(
                'div',
                {
                    ...attrs,
                    class: ctx.styles.value.item(isExpanded),
                },
                [
                    h(
                        'button',
                        {
                            ...triggerProps,
                            class: ctx.styles.value.trigger,
                        },
                        [
                            h('span', { class: ctx.styles.value.triggerText }, props.title),
                            h(
                                'svg',
                                {
                                    class: ctx.styles.value.icon(isExpanded),
                                    width: '16',
                                    height: '16',
                                    viewBox: '0 0 24 24',
                                    fill: 'none',
                                    stroke: 'currentColor',
                                    strokeWidth: '2',
                                    strokeLinecap: 'round',
                                    strokeLinejoin: 'round',
                                },
                                [h('path', { d: 'm6 9 6 6 6-6' })],
                            ),
                        ],
                    ),
                    h(
                        'div',
                        {
                            ...panelProps,
                            class: ctx.styles.value.panel,
                        },
                        slots.default?.(),
                    ),
                ],
            );
        };
    },
});
