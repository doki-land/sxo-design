export interface FormOptions {
    layout?: 'vertical' | 'horizontal' | 'inline';
    size?: 'sm' | 'md' | 'lg';
}

export function getFormClasses(options: FormOptions = {}) {
    const { layout = 'vertical' } = options;

    const layouts = {
        vertical: 'flex flex-col gap-4',
        horizontal: 'space-y-4',
        inline: 'flex flex-row flex-wrap items-center gap-4',
    };

    return {
        root: layouts[layout],
    };
}

export interface FormItemOptions {
    layout?: 'vertical' | 'horizontal';
    required?: boolean;
    hasError?: boolean;
}

export function getFormItemClasses(options: FormItemOptions = {}) {
    const { layout = 'vertical', required = false, hasError = false } = options;

    const layouts = {
        vertical: 'flex flex-col gap-1.5',
        horizontal: 'grid grid-cols-[120px_1fr] gap-4 items-start',
    };

    return {
        root: `mb-4 ${layouts[layout]}`,
        label: `text-sm font-medium text-neutral-700 ${
            required ? "after:content-['*'] after:ml-0.5 after:text-error-500" : ''
        }`,
        control: 'flex-1 min-w-0',
        error: 'text-xs text-error-500 mt-1 animate-in fade-in slide-in-from-top-1 duration-200',
        extra: 'text-xs text-neutral-400 mt-1',
    };
}
