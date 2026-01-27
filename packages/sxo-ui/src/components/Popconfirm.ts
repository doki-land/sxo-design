export interface PopconfirmOptions {
    type?: 'info' | 'warning' | 'error';
}

export function getPopconfirmClasses(options: PopconfirmOptions = {}) {
    const { type = 'warning' } = options;

    const colors = {
        info: 'text-info',
        warning: 'text-warning',
        error: 'text-error',
    };

    return {
        container: 'bg-white border border-neutral-200 shadow-xl rounded-xl p-4 w-64 z-[200]',
        header: 'flex items-start gap-3 mb-4',
        icon: ['flex-shrink-0 w-5 h-5 mt-0.5', colors[type]].join(' '),
        title: 'text-sm font-bold text-neutral-900 leading-tight',
        footer: 'flex justify-end gap-2',
    };
}
