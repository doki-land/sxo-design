import { useAccordion } from '@sxo/design';
import { getAccordionClasses } from '@sxo/ui';
import { computed, defineComponent, getCurrentInstance, h, inject, ref, watch } from 'vue';
import { useStyle } from '../hooks';

export const Accordion = defineComponent({
    name: 'SxoAccordion',
    props: {
        value: {
            type: Array,
            default: () => [],
        },
        allowMultiple: {
            type: Boolean,
            default: false,
        },
        variant: {
            type: String,
            default: 'bordered',
        },
    },
    model: {
        prop: 'value',
        event: 'input',
    },
    setup(props, { emit, slots, attrs }) {
        const instance = getCurrentInstance();
        const expandedItems = ref<string[]>(props.value as string[]);

        watch(
            () => props.value,
            (val) => {
                expandedItems.value = val as string[];
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
            emit('input', expandedItems.value);
        };

        const { getItemProps } = useAccordion({
            allowMultiple: props.allowMultiple,
            defaultExpanded: expandedItems.value,
        });

        const styles = computed(() => getAccordionClasses({ variant: props.variant as any }));

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

        const listeners = (instance?.proxy as any)?.$listeners || {};

        // Vue 2 provide
        return {
            expandedItems,
            toggleItem,
            getItemProps,
            styles,
            renderRoot() {
                return h(
                    'div',
                    {
                        class: [styles.value.root, attrs.class],
                        on: listeners,
                    },
                    slots.default?.(),
                );
            },
        };
    },
    provide() {
        return {
            sxoAccordion: this,
        };
    },
    render() {
        return (this as any).renderRoot();
    },
});

export const AccordionItem = defineComponent({
    name: 'SxoAccordionItem',
    inject: ['sxoAccordion'],
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
        return {
            props,
            attrs,
        };
    },
    render() {
        const ctx = (this as any).sxoAccordion;
        const isExpanded = ctx.expandedItems.includes(this.value);
        const { triggerProps, panelProps } = ctx.getItemProps(this.value, ctx.toggleItem);

        return h(
            'div',
            {
                class: [ctx.styles.item(isExpanded), this.$attrs.class],
            },
            [
                h(
                    'button',
                    {
                        attrs: {
                            id: triggerProps.id,
                            role: triggerProps.role,
                            'aria-expanded': triggerProps['aria-expanded'],
                            'aria-controls': triggerProps['aria-controls'],
                        },
                        class: ctx.styles.trigger,
                        on: {
                            click: triggerProps.onClick,
                        },
                    },
                    [
                        h('span', { class: ctx.styles.triggerText }, (this as any).title),
                        h(
                            'svg',
                            {
                                class: ctx.styles.icon(isExpanded),
                                attrs: {
                                    width: '16',
                                    height: '16',
                                    viewBox: '0 0 24 24',
                                    fill: 'none',
                                    stroke: 'currentColor',
                                    'stroke-width': '2',
                                    'stroke-linecap': 'round',
                                    'stroke-linejoin': 'round',
                                },
                            },
                            [h('path', { attrs: { d: 'M6 9l6 6 6-6' } })],
                        ),
                    ],
                ),
                isExpanded
                    ? h(
                          'div',
                          {
                              attrs: {
                                  id: panelProps.id,
                                  role: panelProps.role,
                                  'aria-labelledby': panelProps['aria-labelledby'],
                              },
                              class: ctx.styles.panel,
                          },
                          this.$slots.default,
                      )
                    : null,
            ],
        );
    },
});
