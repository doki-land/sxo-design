export interface AccordionOptions {
    variant?: 'ghost' | 'bordered' | 'splitted';
}

export function getAccordionClasses(options: AccordionOptions = {}) {
    const { variant = 'bordered' } = options;

    const variants = {
        ghost: 'bg-transparent',
        bordered: 'border border-neutral-200 rounded-lg overflow-hidden',
        splitted: 'gap-2 flex flex-col',
    };

    const itemBase = 'transition-all duration-200';
    const itemVariants = {
        ghost: 'border-b border-neutral-100 last:border-none',
        bordered: 'border-b border-neutral-200 last:border-none',
        splitted: 'border border-neutral-200 rounded-lg bg-white shadow-sm',
    };

    return {
        root: `${variants[variant]}`,
        item: (isExpanded: boolean) =>
            `${itemBase} ${itemVariants[variant]} ${isExpanded ? 'bg-neutral-50/50' : ''}`,
        trigger:
            'w-full flex items-center justify-between p-4 cursor-pointer hover:bg-neutral-100/50 transition-colors',
        triggerText: 'font-medium text-neutral-900',
        icon: (isExpanded: boolean) =>
            `transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`,
        panel: 'p-4 pt-0 text-neutral-600 animate-in slide-in-from-top-2 duration-300',
    };
}
