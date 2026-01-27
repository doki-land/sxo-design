export interface BreadcrumbOptions {
    separator?: string;
    disabled?: boolean;
}

export function getBreadcrumbClasses(options: BreadcrumbOptions = {}) {
    const { disabled = false } = options;
    const disabledClass = disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : '';

    return {
        container: `flex items-center flex-wrap gap-2 text-sm ${disabledClass}`,
        item: 'flex items-center gap-2',
        link: `text-neutral-500 hover:text-primary-DEFAULT transition-colors ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`,
        current: 'text-neutral-900 font-medium',
        separator: 'text-neutral-300 select-none',
    };
}
