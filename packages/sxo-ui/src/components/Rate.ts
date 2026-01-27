export interface RateOptions {
    disabled?: boolean;
}

export function getRateClasses(options: RateOptions = {}) {
    const { disabled = false } = options;

    const container = 'flex items-center gap-1 inline-flex';
    const item = [
        'w-6 h-6 transition-all duration-200 cursor-pointer select-none',
        disabled ? 'cursor-not-allowed' : 'hover:scale-110 active:scale-95',
    ].join(' ');

    return {
        container,
        item,
        icon: 'w-full h-full',
        iconActive: 'text-warning',
        iconInactive: 'text-neutral-200',
        text: 'ml-2 text-sm text-neutral-500',
    };
}
