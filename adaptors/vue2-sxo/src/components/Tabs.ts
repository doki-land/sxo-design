import { useTabs } from '@sxo/design';
import { getTabsClasses, type TabsOptions } from '@sxo/ui';
import { computed, defineComponent, getCurrentInstance, h, type PropType, ref, watch } from 'vue';
import { useStyle } from '../hooks';

const TabsSymbol = 'SxoTabs';

export const Tabs = defineComponent({
    name: 'SxoTabs',
    props: {
        value: String,
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
    provide() {
        return {
            [TabsSymbol]: this,
        };
    },
    setup(props, { emit, attrs }) {
        const instance = getCurrentInstance();
        const listeners = instance?.proxy.$listeners || {};
        const internalValue = ref(props.value || props.defaultValue || '');

        watch(
            () => props.value,
            (val) => {
                if (val !== undefined) internalValue.value = val;
            },
        );

        const { getTabProps, getTabPanelProps } = useTabs({
            value: internalValue.value,
            onChange: (v) => {
                internalValue.value = v;
                emit('input', v);
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

        return {
            currentValue: internalValue,
            selectTab: (v: string) => {
                internalValue.value = v;
                emit('input', v);
                emit('change', v);
            },
            styles,
            getTabProps,
            getTabPanelProps,
            listeners,
        };
    },
    render() {
        return h(
            'div',
            {
                class: this.$attrs.class,
                on: (this as any).$listeners,
            },
            this.$slots.default,
        );
    },
});

export const TabList = defineComponent({
    name: 'SxoTabList',
    inject: {
        tabsContext: { from: TabsSymbol, default: null },
    },
    render() {
        const ctx = (this as any).tabsContext;
        if (!ctx) throw new Error('TabList must be used within Tabs');

        return h(
            'div',
            {
                attrs: {
                    role: 'tablist',
                },
                class: `${ctx.styles.list} ${this.$attrs.class || ''}`.trim(),
            },
            this.$slots.default,
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
    inject: {
        tabsContext: { from: TabsSymbol, default: null },
    },
    render() {
        const ctx = (this as any).tabsContext;
        if (!ctx) throw new Error('Tab must be used within Tabs');

        const isActive = ctx.currentValue.value === (this as any).value;
        const tabProps = ctx.getTabProps((this as any).value, ctx.selectTab);

        return h(
            'div',
            {
                attrs: {
                    id: tabProps.id,
                    role: tabProps.role,
                    'aria-selected': tabProps['aria-selected'],
                    'aria-controls': tabProps['aria-controls'],
                    tabIndex: tabProps.tabIndex,
                },
                on: {
                    click: tabProps.onClick,
                },
                class: `${ctx.styles.tab(isActive)} ${this.$attrs.class || ''}`.trim(),
            },
            this.$slots.default,
        );
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
    inject: {
        tabsContext: { from: TabsSymbol, default: null },
    },
    render() {
        const ctx = (this as any).tabsContext;
        if (!ctx) throw new Error('TabPanel must be used within Tabs');

        // Access currentValue to ensure reactivity
        const isActive = ctx.currentValue.value === (this as any).value;
        const panelProps = ctx.getTabPanelProps((this as any).value);

        return h(
            'div',
            {
                attrs: {
                    id: panelProps.id,
                    role: panelProps.role,
                    'aria-labelledby': panelProps['aria-labelledby'],
                    hidden: !isActive,
                },
                class: `${ctx.styles.panel} ${this.$attrs.class || ''}`.trim(),
                style: { display: isActive ? 'block' : 'none' },
            },
            this.$slots.default,
        );
    },
});
