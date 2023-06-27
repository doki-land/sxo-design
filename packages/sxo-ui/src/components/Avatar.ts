export interface AvatarOptions {
    size?: 'sm' | 'md' | 'lg' | 'xl';
    shape?: 'circle' | 'square';
}

export function getAvatarClasses(options: AvatarOptions = {}) {
    const { size = 'md', shape = 'circle' } = options;

    const sizes = {
        sm: 'w-8 h-8 text-xs',
        md: 'w-10 h-10 text-sm',
        lg: 'w-12 h-12 text-base',
        xl: 'w-16 h-16 text-lg',
    };

    const shapes = {
        circle: 'rounded-full',
        square: 'rounded-lg',
    };

    return {
        root: `inline-flex items-center justify-center bg-neutral-200 text-neutral-600 font-medium overflow-hidden select-none shrink-0 ${sizes[size]} ${shapes[shape]}`,
        image: 'w-full h-full object-cover',
        fallback: 'uppercase',
    };
}
