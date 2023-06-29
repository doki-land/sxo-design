import { useTabs } from '@sxo/design';
import { getTabsClasses, type TabsOptions } from '@sxo/ui';
import { computed, defineComponent, h, inject, type PropType, provide, ref, watch } from 'vue';
import { useStyle } from '../hooks';

const TabsSymbol = Symbol('SxoTabs');

export const Tabs = defineComponent({
    name: 'SxoTabs',
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

        return () => h('div', { class: attrs.class }, slots.default?.());
    },
});

export const TabList = defineComponent({
    name: 'SxoTabList',
    setup(_, { slots, attrs }) {
        const ctx = inject<any>(TabsSymbol);
        return () =>
            h(
                'div',
                {
                    role: 'tablist',
                    class: `${ctx.styles.value.list} ${attrs.class || ''}`.trim(),
                },
                slots.default?.(),
            );
    },
});

export const Tab = defineComponent({
    name: 'SxoTab',
    props: {
        value: {
            type: String,
            required: true,
        },
    },
    setup(props, { slots, attrs }) {
        const ctx = inject<any>(TabsSymbol);

        return () => {
            const isActive = ctx.currentValue.value === props.value;
            const tabProps = ctx.getTabProps(props.value, ctx.selectTab);

            return h(
                'div',
                {
                    ...tabProps,
                    class: `${ctx.styles.value.tab(isActive)} ${attrs.class || ''}`.trim(),
                },
                slots.default?.(),
            );
        };
    },
});

export const TabPanel = defineComponent({
    name: 'SxoTabPanel',
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
                {
                    ...panelProps,
                    class: `${ctx.styles.value.panel} ${attrs.class || ''}`.trim(),
                },
                slots.default?.(),
            );
        };
    },
});
