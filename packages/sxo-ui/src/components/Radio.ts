export interface RadioOptions {
    size?: 'sm' | 'md' | 'lg';
    color?: 'primary' | 'success';
    disabled?: boolean;
}

export function getRadioClasses(isSelected: boolean, options: RadioOptions = {}) {
    const { size = 'md', color = 'primary', disabled = false } = options;

    const sizes = {
        sm: { root: 'w-4 h-4', inner: 'w-2 h-2' },
        md: { root: 'w-5 h-5', inner: 'w-2.5 h-2.5' },
        lg: { root: 'w-6 h-6', inner: 'w-3 h-3' },
    };

    const base = [
        'inline-flex items-center justify-center rounded-full border transition-all duration-200 focus:outline-none',
    ].join(' ');

    const disabledClasses = disabled
        ? 'cursor-not-allowed opacity-50 bg-neutral-100 border-neutral-200'
        : 'cursor-pointer';

    const colorClass = isSelected
        ? disabled
            ? 'border-neutral-300'
            : color === 'primary'
              ? 'border-primary'
              : 'border-success'
        : disabled
          ? 'border-neutral-200'
          : 'border-neutral-300 hover:border-neutral-400';

    const innerBase = 'rounded-full transition-transform duration-200';
    const innerScale = isSelected ? 'scale-100' : 'scale-0';
    const innerColor = isSelected
        ? disabled
            ? 'bg-neutral-300'
            : color === 'primary'
              ? 'bg-primary'
              : 'bg-success'
        : 'bg-transparent';

    const currentSize = sizes[size];

    return {
        root: `${base} ${colorClass} ${currentSize.root} ${disabledClasses}`,
        inner: `${innerBase} ${innerColor} ${currentSize.inner} ${innerScale}`,
        label: `inline-flex items-center gap-2 ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`,
        text: `text-sm select-none ${disabled ? 'text-neutral-400' : 'text-neutral-700'}`,
    };
}
