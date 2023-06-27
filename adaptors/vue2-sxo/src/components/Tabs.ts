import { useTabs } from '@sxo/design';
import { getTabsClasses, type TabsOptions } from '@sxo/ui';
import { computed, defineComponent, h, getCurrentInstance, type PropType, ref, watch } from 'vue';
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
                on: this.listeners,
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
                role: 'tablist',
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

        const isActive = ctx.currentValue === this.value;
        const tabProps = ctx.getTabProps(this.value, ctx.selectTab);

        return h(
            'div',
            {
                attrs: tabProps.attrs,
                on: tabProps.on,
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

        const panelProps = ctx.getTabPanelProps(this.value);

        return h(
            'div',
            {
                attrs: panelProps.attrs,
                class: `${ctx.styles.panel} ${this.$attrs.class || ''}`.trim(),
            },
            this.$slots.default,
        );
    },
});
