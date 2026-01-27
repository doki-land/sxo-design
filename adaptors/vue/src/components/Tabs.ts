import { useTabs } from '@sxo/design';
import { getTabsClasses, type TabsOptions } from '@sxo/ui';
import { computed, defineComponent, h, inject, type PropType, provide, ref, watch, mergeProps } from 'vue';
import { useStyle } from '../hooks';

const TabsSymbol = Symbol('SxoTabs');

export const Tabs = defineComponent({
    name: 'SxoTabs',
    inheritAttrs: false,
    props: {
        modelValue: String,
        defaultValue: String,
        variant: {
            type: String as PropType<TabsOptions['variant']>,
            default: 'line',
        },
        size: {
            type: String as PropType<TabsOptions['size']>,
            default: 'md',
        },
    },
    emits: ['update:modelValue', 'change'],
    setup(props, { emit, slots, attrs }) {
        const internalValue = ref(props.modelValue || props.defaultValue || '');

        watch(
            () => props.modelValue,
            (val) => {
                if (val !== undefined) internalValue.value = val;
            },
        );

        const { getTabProps, getTabPanelProps } = useTabs({
            value: internalValue.value,
            onChange: (v) => {
                internalValue.value = v;
                emit('update:modelValue', v);
                emit('change', v);
            },
        });

        // Keep useTabs internal state in sync with modelValue
        watch(internalValue, (val) => {
            const props = getTabProps(val);
            if (props.onClick) {
                // This is a bit hacky but useTabs is currently not reactive
                // We just need to trigger the side effect in useTabs
                props.onClick();
            }
        });

        const styles = computed(() =>
            getTabsClasses({
                variant: props.variant,
                size: props.size,
            }),
        );

        useStyle(() => `${styles.value.list} ${attrs.class || ''}`);

        provide(TabsSymbol, {
            currentValue: internalValue,
            selectTab: (v: string) => {
                internalValue.value = v;
                emit('update:modelValue', v);
                emit('change', v);
            },
            styles,
            getTabProps,
            getTabPanelProps,
        });

        return () => h('div', mergeProps(attrs, {}), slots.default?.());
    },
});

export const TabList = defineComponent({
    name: 'SxoTabList',
    inheritAttrs: false,
    setup(_, { slots, attrs }) {
        const ctx = inject<any>(TabsSymbol);
        return () =>
            h(
                'div',
                mergeProps(attrs, {
                    role: 'tablist',
                    class: `${ctx.styles.value.list}`,
                }),
                slots.default?.(),
            );
    },
});

export const Tab = defineComponent({
    name: 'SxoTab',
    inheritAttrs: false,
    props: {
        value: {
            type: String,
            required: true,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    setup(props, { slots, attrs }) {
        const ctx = inject<any>(TabsSymbol);

        return () => {
            const isActive = ctx.currentValue.value === props.value;
            const { onClick: _onClick, ...tabProps } = ctx.getTabProps(props.value, ctx.selectTab);

            return h(
                'div',
                mergeProps(tabProps, attrs, {
                    class: [ctx.styles.value.tab(isActive, props.disabled)],
                    onClick: (e: MouseEvent) => {
                        if (props.disabled) {
                            e.preventDefault();
                            e.stopImmediatePropagation();
                            return;
                        }
                        ctx.selectTab(props.value);
                    },
                }),
                slots.default?.(),
            );
        };
    },
});

export const TabPanel = defineComponent({
    name: 'SxoTabPanel',
    inheritAttrs: false,
    props: {
        value: {
            type: String,
            required: true,
        },
    },
    setup(props, { slots, attrs }) {
        const ctx = inject<any>(TabsSymbol);

        return () => {
            // Access currentValue to ensure reactivity
            const _ = ctx.currentValue.value;
            const panelProps = ctx.getTabPanelProps(props.value);

            return h(
                'div',
                mergeProps(panelProps, attrs, {
                    class: `${ctx.styles.value.panel}`,
                }),
                slots.default?.(),
            );
        };
    },
});
