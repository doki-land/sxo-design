export function useAccordion(
    options: { allowMultiple?: boolean; defaultExpanded?: string[] } = {},
) {
    const id = `sxo-accordion-${Math.random().toString(36).substr(2, 9)}`;
    const expandedItems = options.defaultExpanded || [];

    return {
        getItemProps: (value: string, toggle: (val: string) => void) => {
            const isExpanded = expandedItems.includes(value);
            return {
                triggerProps: {
                    id: `${id}-trigger-${value}`,
                    'aria-expanded': isExpanded,
                    'aria-controls': `${id}-panel-${value}`,
                    onClick: () => toggle(value),
                },
                panelProps: {
                    id: `${id}-panel-${value}`,
                    role: 'region',
                    'aria-labelledby': `${id}-trigger-${value}`,
                    hidden: !isExpanded,
                    style: { display: isExpanded ? 'block' : 'none' },
                },
            };
        },
    };
}
