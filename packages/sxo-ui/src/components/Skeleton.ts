export interface SkeletonOptions {
    active?: boolean;
    rounded?: boolean;
}

export function getSkeletonClasses(options: SkeletonOptions = {}) {
    const { active = true, rounded = true } = options;

    const animation = active ? 'animate-pulse' : '';
    const base = `bg-neutral-200 ${animation}`;

    return {
        root: 'w-full space-y-3',
        header: 'flex items-center gap-4 mb-4',
        avatar: `${base} w-12 h-12 ${rounded ? 'rounded-full' : 'rounded-lg'} flex-shrink-0`,
        title: `${base} h-4 w-1/3 ${rounded ? 'rounded' : ''}`,
        paragraph: 'space-y-2',
        line: `${base} h-3 w-full ${rounded ? 'rounded' : ''}`,
        lineLast: `${base} h-3 w-3/4 ${rounded ? 'rounded' : ''}`,
        // 独立占位块
        rect: `${base} w-full h-32 ${rounded ? 'rounded-xl' : ''}`,
        circle: `${base} w-12 h-12 rounded-full`,
        button: `${base} h-10 w-24 ${rounded ? 'rounded-lg' : ''}`,
    };
}
