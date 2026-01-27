export interface ResultOptions {
    status?: 'success' | 'error' | 'info' | 'warning' | '404' | '500' | '403';
}

export function getResultClasses(options: ResultOptions = {}) {
    const { status = 'info' } = options;

    const base = 'flex flex-col items-center justify-center text-center p-12 w-full';

    const statusColors = {
        success: 'text-success',
        error: 'text-error',
        info: 'text-info',
        warning: 'text-warning',
        '404': 'text-neutral-400',
        '500': 'text-neutral-400',
        '403': 'text-neutral-400',
    };

    return {
        container: base,
        icon: ['w-16 h-16 mb-6', statusColors[status]].join(' '),
        title: 'text-2xl font-bold text-neutral-900 mb-2',
        subTitle: 'text-base text-neutral-500 mb-8 max-w-md',
        extra: 'flex items-center gap-3',
    };
}
