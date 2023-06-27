export interface EmptyOptions {
    size?: 'sm' | 'md' | 'lg';
}

export function getEmptyClasses(options: EmptyOptions = {}) {
    const { size = 'md' } = options;

    const base = 'flex flex-col items-center justify-center text-center p-8 w-full';

    const sizes = {
        sm: {
            container: 'gap-2',
            image: 'w-24 h-24',
            description: 'text-xs',
        },
        md: {
            container: 'gap-4',
            image: 'w-40 h-40',
            description: 'text-sm',
        },
        lg: {
            container: 'gap-6',
            image: 'w-64 h-64',
            description: 'text-base',
        },
    };

    return {
        container: [base, sizes[size].container].join(' '),
        image: [sizes[size].image, 'opacity-40'].join(' '),
        description: [sizes[size].description, 'text-neutral-500'].join(' '),
        extra: 'mt-4',
    };
}
