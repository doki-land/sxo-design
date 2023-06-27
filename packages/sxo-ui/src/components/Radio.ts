export interface RadioOptions {
    size?: 'sm' | 'md' | 'lg';
    color?: 'primary' | 'success';
}

export function getRadioClasses(isSelected: boolean, options: RadioOptions = {}) {
    const { size = 'md', color = 'primary' } = options;

    const sizes = {
        sm: { root: 'w-4 h-4', inner: 'w-2 h-2' },
        md: { root: 'w-5 h-5', inner: 'w-2.5 h-2.5' },
        lg: { root: 'w-6 h-6', inner: 'w-3 h-3' },
    };

    const base =
        'inline-flex items-center justify-center rounded-full border transition-all duration-200 cursor-pointer focus:outline-none';
    const colorClass = isSelected
        ? color === 'primary'
            ? 'border-primary'
            : 'border-success'
        : 'border-neutral-300 hover:border-neutral-400';

    const innerBase = 'rounded-full transition-transform duration-200';
    const innerScale = isSelected ? 'scale-100' : 'scale-0';
    const innerColor = isSelected
        ? color === 'primary'
            ? 'bg-primary'
            : 'bg-success'
        : 'bg-transparent';

    const currentSize = sizes[size];

    return {
        root: `${base} ${colorClass} ${currentSize.root}`,
        inner: `${innerBase} ${innerColor} ${currentSize.inner} ${innerScale}`,
    };
}
