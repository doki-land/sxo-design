export interface CheckboxOptions {
    size?: 'sm' | 'md' | 'lg';
    color?: 'primary' | 'success';
    disabled?: boolean;
}

export function getCheckboxClasses(isChecked: boolean, options: CheckboxOptions = {}) {
    const { size = 'md', color = 'primary', disabled = false } = options;

    const sizes = {
        sm: 'w-4 h-4',
        md: 'w-5 h-5',
        lg: 'w-6 h-6',
    };

    const base =
        'inline-flex items-center justify-center rounded border transition-all duration-200 focus:outline-none';

    const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed bg-neutral-100 border-neutral-200' : 'cursor-pointer';

    const colorClass = isChecked
        ? disabled
            ? 'bg-neutral-300 border-neutral-300'
            : color === 'primary'
              ? 'bg-primary border-primary'
              : 'bg-success border-success'
        : disabled
          ? 'bg-neutral-50 border-neutral-200'
          : 'bg-transparent border-neutral-300 hover:border-neutral-400';

    const iconBase = 'text-white transition-opacity duration-200';
    const iconOpacity = isChecked ? 'opacity-100' : 'opacity-0';

    return {
        root: `${base} ${colorClass} ${sizes[size]} ${disabledClasses}`,
        icon: `${iconBase} ${iconOpacity}`,
        label: `inline-flex items-center gap-2 ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`,
        text: `text-sm select-none ${disabled ? 'text-neutral-400' : 'text-neutral-700'}`,
    };
}
