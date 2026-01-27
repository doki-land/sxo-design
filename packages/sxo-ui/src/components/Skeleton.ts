export interface SkeletonOptions {
    active?: boolean;
    rounded?: boolean;
    variant?: 'text' | 'avatar' | 'rect' | 'circle' | 'button';
    animate?: boolean;
}

export function getSkeletonClasses(options: SkeletonOptions = {}) {
    const { active = true, rounded = true, variant = 'text', animate = true } = options;

    const animation = active && animate ? 'animate-pulse' : '';
    const base = `bg-neutral-200 ${animation}`;

    const variantClasses: Record<string, string> = {
        text: `${base} h-3 w-full ${rounded ? 'rounded' : ''}`,
        avatar: `${base} w-12 h-12 ${rounded ? 'rounded-full' : 'rounded-lg'} flex-shrink-0`,
        rect: `${base} w-full h-32 ${rounded ? 'rounded-xl' : ''}`,
        circle: `${base} w-12 h-12 rounded-full`,
        button: `${base} h-10 w-24 ${rounded ? 'rounded-lg' : ''}`,
    };

    return {
        root: 'w-full space-y-3',
        container: 'w-full space-y-4',
        row: 'flex items-start gap-4',
        header: 'flex items-center gap-4 mb-4',
        avatar: variantClasses.avatar,
        title: `${base} h-4 w-1/3 ${rounded ? 'rounded' : ''}`,
        paragraph: 'space-y-2',
        line: variantClasses.text,
        lineLast: `${base} h-3 w-3/4 ${rounded ? 'rounded' : ''}`,
        rect: variantClasses.rect,
        circle: variantClasses.circle,
        button: variantClasses.button,
        base: variantClasses[variant] || variantClasses.text,
    };
}
