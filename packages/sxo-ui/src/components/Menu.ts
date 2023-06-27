export interface MenuOptions {
    variant?: 'default' | 'compact';
}

export function getMenuClasses(options: MenuOptions = {}) {
    const { variant = 'default' } = options;

    return {
        container: 'relative inline-block text-left',
        button: 'inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75',
        items: 'absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-neutral-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50',
        item: 'group flex items-center w-full px-2 py-2 text-sm text-neutral-900 rounded-md hover:bg-primary hover:text-white transition-colors',
        itemActive: 'bg-primary text-white',
        section: 'px-1 py-1',
    };
}
