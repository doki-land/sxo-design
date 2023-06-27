export interface SpinnerOptions {
    size?: 'sm' | 'md' | 'lg';
    color?: 'primary' | 'secondary' | 'accent';
}

export function getSpinnerClasses(options: SpinnerOptions = {}) {
    const { size = 'md', color = 'primary' } = options;

    const sizes = {
        sm: 'w-4 h-4 border-2',
        md: 'w-8 h-8 border-3',
        lg: 'w-12 h-12 border-4',
    };

    const colors = {
        primary: 'border-primary/20 border-t-primary',
        secondary: 'border-secondary/20 border-t-secondary',
        accent: 'border-accent-vivid/20 border-t-accent-vivid',
    };

    return `inline-block rounded-full animate-spin ${sizes[size]} ${colors[color]}`;
}

export interface ProgressOptions {
    value: number;
    max?: number;
    color?: 'primary' | 'success' | 'warning' | 'error';
    size?: 'sm' | 'md' | 'lg';
}

export function getProgressClasses(options: ProgressOptions) {
    const { value, max = 100, color = 'primary', size = 'md' } = options;
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    const heights = {
        sm: 'h-1',
        md: 'h-2',
        lg: 'h-4',
    };

    const colors = {
        primary: 'bg-primary',
        success: 'bg-success',
        warning: 'bg-warning',
        error: 'bg-error',
    };

    return {
        root: `w-full bg-neutral-100 rounded-full overflow-hidden ${heights[size]}`,
        bar: `h-full transition-all duration-300 ${colors[color]}`,
        percentage,
    };
}

/*
export interface SkeletonOptions {
    variant?: 'text' | 'rect' | 'circle' | 'avatar' | 'image' | 'button';
    width?: string | number;
    height?: string | number;
    animate?: boolean;
    loading?: boolean;
}

export function getSkeletonClasses(options: SkeletonOptions = {}) {
    const { variant = 'rect', animate = true } = options;

    const variants = {
        text: 'h-4 w-full rounded',
        rect: 'w-full h-24 rounded-lg',
        circle: 'w-12 h-12 rounded-full',
        avatar: 'w-12 h-12 rounded-full',
        image: 'w-full h-48 rounded-xl',
        button: 'w-24 h-10 rounded-lg',
    };

    return {
        base: `bg-neutral-100 ${variants[variant]} ${animate ? 'animate-pulse' : ''} overflow-hidden`,
        container: 'space-y-4',
        row: 'flex items-center space-x-4',
    };
}
*/
