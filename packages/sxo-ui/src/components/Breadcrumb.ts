export interface BreadcrumbOptions {
    separator?: string;
}

export function getBreadcrumbClasses(options: BreadcrumbOptions = {}) {
    return {
        container: 'flex items-center flex-wrap gap-2 text-sm',
        item: 'flex items-center gap-2',
        link: 'text-neutral-500 hover:text-primary-DEFAULT transition-colors cursor-pointer',
        current: 'text-neutral-900 font-medium',
        separator: 'text-neutral-300 select-none',
    };
}
