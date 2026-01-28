export interface SelectOptions {
    size?: 'sm' | 'md' | 'lg';
    variant?: 'outline' | 'ghost' | 'subtle';
    disabled?: boolean;
}

export function getSelectClasses(isOpen: boolean, options: SelectOptions = {}) {
    const { size = 'md', variant = 'outline', disabled = false } = options;

    const sizes = {
        sm: 'px-2 py-1 text-sm h-8',
        md: 'px-3 py-2 text-base h-10',
        lg: 'px-4 py-3 text-lg h-12',
    };

    const variants = {
        outline: 'border border-neutral-200 bg-background-primary hover:border-neutral-300',
        ghost: 'border-transparent bg-transparent hover:bg-neutral-100',
        subtle: 'border-transparent bg-neutral-50 hover:bg-neutral-100',
    };

    const base =
        'relative flex items-center justify-between w-full rounded transition-all duration-200 focus:outline-none';

    const disabledClasses = disabled
        ? 'opacity-50 cursor-not-allowed bg-neutral-50'
        : 'cursor-pointer';

    const borderClass =
        isOpen && variant === 'outline'
            ? 'border-primary ring-2 ring-primary/20'
            : variants[variant];

    const listboxBase =
        'absolute top-full left-0 min-w-full mt-1 py-1 rounded border border-neutral-200 bg-background-primary shadow-lg z-50 transition-all duration-200';
    const listboxVisibility = isOpen
        ? 'opacity-100 scale-100'
        : 'opacity-0 scale-95 pointer-events-none';

    const optionBase = 'px-3 py-2 cursor-pointer transition-colors duration-150 whitespace-nowrap';

    return {
        trigger: `${base} ${borderClass} ${sizes[size]} ${disabledClasses}`,
        listbox: `${listboxBase} ${listboxVisibility}`,
        option: (isSelected: boolean, disabled: boolean = false) =>
            `${optionBase} ${
                isSelected
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-neutral-700 hover:bg-neutral-100'
            } ${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`,
    };
}
