export function useTabs(
    options: { defaultIndex?: number; value?: string; onChange?: (val: any) => void } = {},
) {
    let selectedValue = options.value ?? options.defaultIndex ?? 0;
    const id = `sxo-tabs-${Math.random().toString(36).substr(2, 9)}`;

    return {
        selectedValue,
        setSelectedValue: (val: any) => {
            selectedValue = val;
            options.onChange?.(val);
        },
        getTabListProps: () => ({
            role: 'tablist',
            'aria-orientation': 'horizontal' as const,
        }),
        getTabProps: (value: any, onClick?: (val: any) => void) => ({
            id: `${id}-tab-${value}`,
            role: 'tab',
            'aria-selected': selectedValue === value,
            'aria-controls': `${id}-panel-${value}`,
            tabIndex: selectedValue === value ? 0 : -1,
            onClick: () => {
                selectedValue = value;
                options.onChange?.(value);
                onClick?.(value);
            },
        }),
        getTabPanelProps: (value: any) => ({
            id: `${id}-panel-${value}`,
            role: 'tabpanel',
            'aria-labelledby': `${id}-tab-${value}`,
            hidden: selectedValue !== value,
        }),
    };
}
