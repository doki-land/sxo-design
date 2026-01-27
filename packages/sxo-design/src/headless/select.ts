export function useSelect(options: { defaultValue?: any; disabled?: boolean } = {}) {
    const id = `sxo-select-${Math.random().toString(36).substr(2, 9)}`;
    let isOpen = false;
    let value = options.defaultValue || '';

    return {
        get isOpen() {
            return isOpen;
        },
        get value() {
            return value;
        },
        setValue: (newVal: string) => {
            value = newVal;
            isOpen = false;
        },
        getTriggerProps: () => ({
            id: `${id}-trigger`,
            role: 'combobox',
            'aria-expanded': isOpen,
            'aria-haspopup': 'listbox' as const,
            'aria-controls': `${id}-listbox`,
            tabIndex: options.disabled ? -1 : 0,
            onClick: () => {
                if (!options.disabled) isOpen = !isOpen;
            },
        }),
        getListboxProps: () => ({
            id: `${id}-listbox`,
            role: 'listbox',
            tabIndex: -1,
            hidden: !isOpen,
            style: { display: isOpen ? 'block' : 'none' },
        }),
    };
}
