import { useTabs } from '@sxo/design';
import { getTabsClasses, type TabsOptions as UIProps } from '@sxo/ui';
import type React from 'react';
import { createContext, useContext, useState } from 'react';
import { useStyle } from '../hooks.ts';

interface TabsContextValue {
    currentValue: string;
    selectTab: (v: string) => void;
    getTabProps: ReturnType<typeof useTabs>['getTabProps'];
    getTabPanelProps: ReturnType<typeof useTabs>['getTabPanelProps'];
    styles: ReturnType<typeof getTabsClasses>;
}

const TabsContext = createContext<TabsContextValue | null>(null);

export interface TabsProps extends UIProps {
    defaultValue?: string;
    value?: string;
    onChange?: (value: string) => void;
    children: React.ReactNode;
    className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
    children,
    defaultValue,
    value,
    onChange,
    variant = 'line',
    size = 'md',
    className = '',
}) => {
    const [internalValue, setInternalValue] = useState(defaultValue || '');
    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : internalValue;

    const { getTabProps, getTabPanelProps } = useTabs({
        value: currentValue,
        onChange: (v) => {
            if (!isControlled) setInternalValue(v);
            onChange?.(v);
        },
    });

    const styles = getTabsClasses({ variant, size });

    // 注册样式
    useStyle(`${styles.list} ${className}`);

    return (
        <TabsContext.Provider
            value={{
                currentValue,
                selectTab: (v) => {
                    if (!isControlled) setInternalValue(v);
                    onChange?.(v);
                },
                getTabProps,
                getTabPanelProps,
                styles,
            }}
        >
            <div className={className}>{children}</div>
        </TabsContext.Provider>
    );
};

export const TabList: React.FC<{
    children: React.ReactNode;
    className?: string;
}> = ({ children, className = '' }) => {
    const ctx = useContext(TabsContext);
    if (!ctx) throw new Error('TabList must be used within Tabs');

    return (
        <div role="tablist" className={`${ctx.styles.list} ${className}`.trim()}>
            {children}
        </div>
    );
};

export const Tab: React.FC<{
    value: string;
    children: React.ReactNode;
    className?: string;
}> = ({ value, children, className = '' }) => {
    const ctx = useContext(TabsContext);
    if (!ctx) throw new Error('Tab must be used within Tabs');

    const isActive = ctx.currentValue === value;
    const tabProps = ctx.getTabProps(value, ctx.selectTab);

    return (
        <div {...tabProps} className={`${ctx.styles.tab(isActive)} ${className}`.trim()}>
            {children}
        </div>
    );
};

export const TabPanel: React.FC<{
    value: string;
    children: React.ReactNode;
    className?: string;
}> = ({ value, children, className = '' }) => {
    const ctx = useContext(TabsContext);
    if (!ctx) throw new Error('TabPanel must be used within Tabs');

    const panelProps = ctx.getTabPanelProps(value);

    return (
        <div {...panelProps} className={`${ctx.styles.panel} ${className}`.trim()}>
            {children}
        </div>
    );
};
