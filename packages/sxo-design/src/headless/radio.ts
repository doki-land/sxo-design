export function useRadioGroup(options: { defaultValue?: string; name?: string } = {}) {
    const name = options.name || `sxo-radio-group-${Math.random().toString(36).substr(2, 9)}`;
    const value = options.defaultValue || '';

    return {
        name,
        value,
        getRadioProps: (itemValue: string) => ({
            type: 'radio',
            name,
            value: itemValue,
            checked: value === itemValue,
        }),
    };
}
