export interface TooltipOptions {
    variant?: 'dark' | 'light';
}

export function getTooltipClasses(options: TooltipOptions = {}) {
    const { variant = 'dark' } = options;

    const variants = {
        dark: 'bg-neutral-800 text-white',
        light: 'bg-white text-neutral-900 border border-neutral-200 shadow-md',
    };

    return {
        content: `px-2 py-1 text-xs rounded pointer-events-none transition-opacity duration-200 ${variants[variant]}`,
        arrow: 'absolute w-2 h-2 rotate-45 bg-inherit',
    };
}
