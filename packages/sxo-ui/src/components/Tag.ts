export interface TagOptions {
    variant?: 'solid' | 'outline' | 'subtle' | 'ghost';
    color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'neutral';
    rounded?: 'none' | 'sm' | 'md' | 'full';
    size?: 'sm' | 'md' | 'lg';
    closable?: boolean;
    disabled?: boolean;
}

export function getTagClasses(options: TagOptions = {}) {
    const {
        variant = 'subtle',
        color = 'primary',
        rounded = 'sm',
        size = 'md',
        closable = false,
        disabled = false,
    } = options;

    const base = 'inline-flex items-center transition-all duration-300 gap-1.5 font-medium select-none';

    const roundedClasses = {
        none: 'rounded-none',
        sm: 'rounded-md',
        md: 'rounded-lg',
        full: 'rounded-full',
    };

    const sizeClasses = {
        sm: 'px-1.5 py-0.5 text-[10px]',
        md: 'px-2 py-0.5 text-[11px]',
        lg: 'px-3 py-1 text-sm',
    };

    const variants = {
        solid: {
            primary: 'bg-primary text-white shadow-sm',
            secondary: 'bg-slate-800 text-white shadow-sm',
            success: 'bg-emerald-500 text-white shadow-sm',
            warning: 'bg-amber-500 text-white shadow-sm',
            error: 'bg-rose-500 text-white shadow-sm',
            neutral: 'bg-slate-200 text-slate-800 shadow-sm',
        },
        outline: {
            primary: 'border border-primary/30 text-primary hover:bg-primary/5',
            secondary: 'border border-slate-300 text-slate-600 hover:bg-slate-50',
            success: 'border border-emerald-500/30 text-emerald-600 hover:bg-emerald-50',
            warning: 'border border-amber-500/30 text-amber-600 hover:bg-amber-50',
            error: 'border border-rose-500/30 text-rose-600 hover:bg-rose-50',
            neutral: 'border border-slate-300 text-slate-500 hover:bg-slate-50',
        },
        subtle: {
            primary: 'bg-primary/10 text-primary border border-primary/20',
            secondary: 'bg-slate-100 text-slate-600 border border-slate-200',
            success: 'bg-emerald-50 text-emerald-700 border border-emerald-100',
            warning: 'bg-amber-50 text-amber-700 border border-amber-100',
            error: 'bg-rose-50 text-rose-700 border border-rose-100',
            neutral: 'bg-slate-50 text-slate-500 border border-slate-100',
        },
        ghost: {
            primary: 'bg-primary/5 text-primary hover:bg-primary/10',
            secondary: 'bg-slate-100/50 text-slate-600 hover:bg-slate-100',
            success: 'bg-emerald-50/50 text-emerald-700 hover:bg-emerald-50',
            warning: 'bg-amber-50/50 text-amber-700 hover:bg-amber-50',
            error: 'bg-rose-50/50 text-rose-700 hover:bg-rose-50',
            neutral: 'bg-slate-50/50 text-slate-500 hover:bg-slate-50',
        },
    };

    const disabledClasses = disabled
        ? 'opacity-50 cursor-not-allowed grayscale-[0.5] pointer-events-none'
        : '';
    const closeIcon = `cursor-pointer hover:opacity-70 transition-opacity ml-0.5 ${disabled ? 'pointer-events-none' : ''}`;

    const variantData = variants[variant as keyof typeof variants] || variants.solid;
    const colorClass = variantData[color as keyof typeof variantData] || variantData.primary;

    return {
        base: `${base} ${roundedClasses[rounded]} ${sizeClasses[size]} ${colorClass} ${disabledClasses}`,
        closeIcon,
    };
}
