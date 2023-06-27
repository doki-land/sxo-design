export interface AlertOptions {
    type?: 'info' | 'success' | 'warning' | 'error';
    variant?: 'subtle' | 'solid' | 'outline';
}

export function getAlertClasses(options: AlertOptions = {}) {
    const { type = 'info', variant = 'subtle' } = options;

    const base = 'flex items-start gap-3 p-4 rounded-lg text-sm transition-all duration-200';

    const variants = {
        subtle: {
            info: 'bg-info/10 text-info border border-info/20',
            success: 'bg-success/10 text-success border border-success/20',
            warning: 'bg-warning/10 text-warning border border-warning/20',
            error: 'bg-error/10 text-error border border-error/20',
        },
        solid: {
            info: 'bg-info text-white shadow-md',
            success: 'bg-success text-white shadow-md',
            warning: 'bg-warning text-white shadow-md',
            error: 'bg-error text-white shadow-md',
        },
        outline: {
            info: 'bg-transparent border border-info text-info',
            success: 'bg-transparent border border-success text-success',
            warning: 'bg-transparent border border-warning text-warning',
            error: 'bg-transparent border border-error text-error',
        },
    };

    const icon = 'flex-shrink-0 w-5 h-5 mt-0.5';
    const content = 'flex-1 flex flex-col gap-1';
    const title = 'font-bold leading-tight';
    const description = 'opacity-80 leading-relaxed';
    const closeButton =
        'flex-shrink-0 cursor-pointer opacity-60 hover:opacity-100 transition-opacity p-1 -m-1';

    return {
        container: [base, variants[variant][type]].join(' '),
        icon,
        content,
        title,
        description,
        closeButton,
    };
}
