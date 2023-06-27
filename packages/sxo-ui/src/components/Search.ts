export interface SearchOptions {
    variant?: 'outline' | 'ghost' | 'bottom-line';
    size?: 'sm' | 'md' | 'lg';
    rounded?: boolean;
}

export function getSearchClasses(options: SearchOptions = {}) {
    const { variant = 'outline', size = 'md', rounded = true } = options;

    const container = [
        'relative flex items-center w-full transition-all duration-200',
        rounded ? 'rounded-full' : 'rounded-md',
    ].join(' ');

    const input = [
        'w-full bg-white pl-10 pr-10 text-sm placeholder:text-neutral-400 focus:outline-none transition-all duration-200',
        size === 'sm' ? 'h-8 text-xs' : size === 'lg' ? 'h-12 text-base' : 'h-10 text-sm',
        rounded ? 'rounded-full' : 'rounded-md',
        variant === 'outline'
            ? 'border border-neutral-200 focus:border-black focus:ring-1 focus:ring-black/5 shadow-sm'
            : '',
        variant === 'ghost'
            ? 'border-transparent bg-neutral-100 focus:bg-white focus:border-neutral-200'
            : '',
        variant === 'bottom-line'
            ? 'border-b border-neutral-200 rounded-none px-10 focus:border-black'
            : '',
    ].join(' ');

    const icon = 'absolute left-3.5 text-neutral-400 pointer-events-none w-4 h-4';
    const clearButton =
        'absolute right-3 text-neutral-400 hover:text-black transition-colors cursor-pointer w-4 h-4';

    return {
        container,
        input,
        icon,
        clearButton,
    };
}
