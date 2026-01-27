export interface DrawerOptions {
    placement?: 'left' | 'right' | 'top' | 'bottom';
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export function getDrawerClasses(options: DrawerOptions = {}) {
    const { placement = 'right', size = 'md' } = options;

    const overlay =
        'fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[100] transition-opacity duration-300';
    const container =
        'fixed bg-white shadow-2xl z-[101] transition-transform duration-300 flex flex-col overflow-hidden';

    const placements = {
        right: 'inset-y-0 right-0',
        left: 'inset-y-0 left-0',
        top: 'inset-x-0 top-0',
        bottom: 'inset-x-0 bottom-0',
    };

    const sizes = {
        right: {
            sm: 'w-64',
            md: 'w-96',
            lg: 'w-[32rem]',
            xl: 'w-[48rem]',
            full: 'w-screen',
        },
        left: {
            sm: 'w-64',
            md: 'w-96',
            lg: 'w-[32rem]',
            xl: 'w-[48rem]',
            full: 'w-screen',
        },
        top: {
            sm: 'h-64',
            md: 'h-96',
            lg: 'h-[32rem]',
            xl: 'h-[48rem]',
            full: 'h-screen',
        },
        bottom: {
            sm: 'h-64',
            md: 'h-96',
            lg: 'h-[32rem]',
            xl: 'h-[48rem]',
            full: 'h-screen',
        },
    };

    const header = 'flex items-center justify-between p-6 border-b border-neutral-100';
    const title = 'text-lg font-bold text-neutral-900';
    const content = 'flex-1 overflow-y-auto p-6';
    const footer = 'p-6 border-t border-neutral-100 flex items-center justify-end gap-3';
    const closeButton = 'p-2 hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer';

    return {
        overlay,
        container: [container, placements[placement], sizes[placement][size]].join(' '),
        header,
        title,
        content,
        footer,
        closeButton,
    };
}
