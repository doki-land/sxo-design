export interface InputOptions {
    variant?: 'outline' | 'bottom-line' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    invalid?: boolean;
    disabled?: boolean;
    readonly?: boolean;
}

export function getInputClasses(options: InputOptions = {}) {
    const { 
        size = 'md', 
        variant = 'outline', 
        invalid = false, 
        disabled = false,
        readonly = false 
    } = options;

    const containerBase =
        'flex items-center w-full transition-all duration-200 outline-none font-normal relative';

    const inputBase =
        'w-full bg-transparent border-none outline-none focus:outline-none focus:ring-0 placeholder:text-text-muted transition-colors appearance-none shadow-none';

    const variants = {
        outline:
            'bg-background-primary border border-border rounded-md focus-within:border-primary',
        'bottom-line':
            'bg-transparent border-t-0 border-x-0 border-b border-border rounded-none focus-within:border-primary',
        ghost: 'bg-secondary border border-transparent rounded-md focus-within:bg-background-primary focus-within:border-border',
    };

    const sizes = {
        sm: { container: 'h-8 px-2', input: 'text-xs', addon: 'text-xs' },
        md: { container: 'h-10 px-3', input: 'text-sm', addon: 'text-sm' },
        lg: { container: 'h-12 px-4', input: 'text-base', addon: 'text-base' },
    };

    const stateClass = invalid
        ? 'border-error text-error focus-within:border-error placeholder:text-error/50'
        : 'text-text-primary';

    const disabledClass = disabled ? 'opacity-50 cursor-not-allowed bg-neutral-50' : '';
    const readonlyClass = readonly ? 'bg-neutral-50/50' : '';

    const currentSize = sizes[size];

    return {
        container: [containerBase, variants[variant], currentSize.container, stateClass, disabledClass, readonlyClass].join(
            ' ',
        ),
        input: [inputBase, currentSize.input, (disabled || readonly) ? 'cursor-default' : ''].join(' '),
        prefix: `flex items-center mr-2 text-text-muted ${currentSize.addon}`,
        suffix: `flex items-center ml-2 text-text-muted ${currentSize.addon}`,
    };
}
