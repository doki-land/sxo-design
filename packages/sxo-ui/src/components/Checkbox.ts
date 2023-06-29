export interface CheckboxOptions {
    size?: 'sm' | 'md' | 'lg';
    color?: 'primary' | 'success';
    disabled?: boolean;
}

export function getCheckboxClasses(isChecked: boolean, options: CheckboxOptions = {}) {
    const { size = 'md', color = 'primary' } = options;

    const sizes = {
        sm: 'w-4 h-4',
        md: 'w-5 h-5',
        lg: 'w-6 h-6',
    };

    const base =
        'inline-flex items-center justify-center rounded border transition-all duration-200 cursor-pointer focus:outline-none';
    const colorClass = isChecked
        ? color === 'primary'
            ? 'bg-primary border-primary'
            : 'bg-success border-success'
        : 'bg-transparent border-neutral-300 hover:border-neutral-400';

    const iconBase = 'text-white transition-opacity duration-200';
    const iconOpacity = isChecked ? 'opacity-100' : 'opacity-0';

    return {
        root: `${base} ${colorClass} ${sizes[size]}`,
        icon: `${iconBase} ${iconOpacity}`,
    };
}
