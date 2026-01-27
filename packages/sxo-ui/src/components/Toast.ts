export interface ToastStylesOptions {
    type?: 'info' | 'success' | 'warning' | 'error';
    position?: 'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

export function getToastClasses(options: ToastStylesOptions = {}) {
    const { type = 'info', position = 'top-right' } = options;

    const container = {
        base: 'fixed z-[9999] flex flex-col gap-2 p-4 pointer-events-none',
        positions: {
            top: 'top-0 left-1/2 -translate-x-1/2',
            bottom: 'bottom-0 left-1/2 -translate-x-1/2',
            'top-left': 'top-0 left-0',
            'top-right': 'top-0 right-0',
            'bottom-left': 'bottom-0 left-0',
            'bottom-right': 'bottom-0 right-0',
        },
    };

    const item = {
        base: 'pointer-events-auto flex items-start gap-3 p-4 rounded-lg shadow-lg border animate-zoom-in min-w-[300px] bg-background',
        types: {
            info: 'border-primary/20 text-primary',
            success: 'border-success/20 text-success',
            warning: 'border-warning/20 text-warning',
            error: 'border-error/20 text-error',
        },
    };

    const icon = {
        base: 'flex-shrink-0 w-5 h-5 mt-0.5',
    };

    const content = {
        base: 'flex-grow flex flex-col gap-1',
        title: 'text-sm font-bold',
        description: 'text-xs opacity-80',
    };

    const close = 'flex-shrink-0 opacity-50 hover:opacity-100 transition-opacity cursor-pointer';

    return {
        container: `${container.base} ${container.positions[position]}`,
        item: `${item.base} ${item.types[type]}`,
        icon: icon.base,
        content: content.base,
        title: content.title,
        description: content.description,
        close,
    };
}
