export function useCheckbox(options: { defaultChecked?: boolean; disabled?: boolean } = {}) {
    const id = `sxo-checkbox-${Math.random().toString(36).substr(2, 9)}`;

    return {
        getInputProps: () => ({
            id,
            type: 'checkbox',
            checked: options.defaultChecked,
            disabled: options.disabled,
            'aria-checked': options.defaultChecked,
        }),
        getLabelProps: () => ({
            for: id,
        }),
    };
}
