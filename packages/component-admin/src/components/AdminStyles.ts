export interface StatCardOptions {
    variant?: 'simple' | 'bordered' | 'solid';
    color?: 'primary' | 'success' | 'warning' | 'error' | 'info';
}

export function getStatCardClasses(options: StatCardOptions = {}) {
    const { variant = 'bordered', color = 'primary' } = options;

    const container = {
        base: 'p-5 rounded-sm transition-all duration-200',
        bordered: 'border border-[#f0f0f0] bg-white hover:border-[#1677ff] group',
        simple: 'bg-transparent',
        solid: 'text-white',
    };

    const solidColors = {
        primary: 'bg-[#1677ff]',
        success: 'bg-[#52c41a]',
        warning: 'bg-[#faad14]',
        error: 'bg-[#ff4d4f]',
        info: 'bg-[#1677ff]',
    };

    const title = 'text-sm text-zinc-500 mb-2 font-normal';
    const value = 'text-2xl font-semibold text-zinc-900 leading-none';
    const trend = 'text-xs mt-2 flex items-center gap-1 font-medium';

    return {
        container: [
            container.base,
            variant === 'solid' ? solidColors[color] : container[variant],
        ].join(' '),
        title,
        value,
        trend,
    };
}

export interface KanbanOptions {
    columns?: number;
}

export function getKanbanClasses(_options: KanbanOptions = {}) {
    return {
        board: 'flex gap-6 overflow-x-auto pb-4 h-full min-h-[500px]',
        column: 'flex-shrink-0 w-80 bg-neutral-50 rounded-xl flex flex-col max-h-full border border-neutral-100',
        columnHeader:
            'p-4 flex items-center justify-between sticky top-0 bg-neutral-50 rounded-t-xl',
        columnTitle: 'font-bold text-sm flex items-center gap-2',
        columnBadge: 'px-2 py-0.5 rounded-full bg-neutral-200 text-[10px] font-bold',
        itemList: 'p-3 space-y-3 overflow-y-auto flex-1',
        item: 'bg-white p-4 rounded-lg shadow-sm border border-neutral-200 hover:border-primary transition-colors cursor-grab active:cursor-grabbing',
        itemTitle: 'font-medium text-sm mb-2',
        itemDesc: 'text-xs opacity-60 line-clamp-2',
        itemFooter: 'mt-4 pt-3 border-t border-neutral-50 flex items-center justify-between',
        avatarGroup: 'flex -space-x-2',
    };
}

export function getDescriptionClasses() {
    return {
        container: 'w-full',
        header: 'mb-6 flex items-center justify-between',
        title: 'text-lg font-bold',
        grid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-12',
        item: 'flex flex-col gap-1',
        label: 'text-sm opacity-50 font-medium',
        content: 'text-sm font-semibold',
    };
}

export interface ShellOptions {
    theme?: 'dark' | 'light' | 'modern';
}

export function getShellClasses(options: ShellOptions = {}) {
    const { theme = 'dark' } = options;

    const themes = {
        dark: {
            sidebar: 'bg-neutral-900 text-white',
            sidebarHeader: 'border-white/10',
            sidebarFooter: 'border-white/10',
            navItem: 'text-white/70 hover:bg-white/5 hover:text-white cursor-pointer',
            navItemActive: 'bg-primary text-white cursor-pointer',
            main: 'bg-neutral-950',
            header: 'bg-neutral-900 border-white/10 shadow-lg',
        },
        light: {
            sidebar: 'bg-white text-neutral-900 border-r border-neutral-200',
            sidebarHeader: 'border-neutral-100',
            sidebarFooter: 'border-neutral-100',
            navItem: 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 cursor-pointer',
            navItemActive: 'bg-primary/5 text-primary border-r-2 border-primary cursor-pointer',
            main: 'bg-neutral-50',
            header: 'bg-white border-neutral-200 shadow-sm',
        },
        modern: {
            sidebar: 'bg-[#001529] text-white/65 shadow-[2px_0_8px_0_rgba(29,35,41,0.05)]',
            sidebarHeader: 'h-[64px] flex items-center px-6',
            sidebarFooter: 'p-4',
            navItem: 'text-white/65 hover:text-white transition-colors duration-200 cursor-pointer px-4 py-3 flex items-center gap-3 font-normal text-[14px]',
            navItemActive: 'bg-[#1677ff] text-white cursor-pointer px-4 py-3 flex items-center gap-3 font-medium text-[14px]',
            main: 'bg-[#f0f2f5]',
            header: 'bg-white sticky top-0 z-30 h-[64px] flex items-center px-6 shadow-[0_1px_4px_rgba(0,21,41,0.08)]',
        },
    };

    const activeTheme = themes[theme];

    return {
        layout: 'flex h-screen overflow-hidden',
        sidebar: [
            'fixed inset-y-0 left-0 z-50 w-52 transition-transform duration-300 lg:static lg:translate-x-0',
            activeTheme.sidebar,
        ].join(' '),
        sidebarCollapsed: '-translate-x-full',
        sidebarHeader: ['flex items-center h-16 px-6', activeTheme.sidebarHeader].join(
            ' ',
        ),
        sidebarContent: 'flex-1 overflow-y-auto py-2',
        sidebarFooter: ['p-4', activeTheme.sidebarFooter].join(' '),
        navItem: [
            'flex items-center gap-3 px-4 py-3 text-sm transition-all duration-200 cursor-pointer select-none',
            activeTheme.navItem,
        ].join(' '),
        navItemActive: activeTheme.navItemActive,
        main: ['flex-1 flex flex-col min-w-0 overflow-hidden', activeTheme.main].join(' '),
        header: [
            'flex items-center justify-between h-16 px-6 border-b',
            activeTheme.header,
        ].join(' '),
        content: 'flex-1 overflow-y-auto p-6',
    };
}

export function getLoginClasses(variant: 'split' | 'centered' = 'centered') {
    const base = {
        container: 'min-h-screen flex items-center justify-center bg-neutral-50',
        card: 'w-full max-w-md p-8 bg-white rounded-2xl shadow-xl border border-neutral-100',
        title: 'text-3xl font-bold text-center mb-2',
        subtitle: 'text-center opacity-50 text-sm mb-8',
        form: 'space-y-6',
        footer: 'mt-8 text-center text-sm opacity-50',
    };

    if (variant === 'split') {
        return {
            ...base,
            container: 'min-h-screen flex',
            left: 'hidden lg:flex flex-1 bg-primary items-center justify-center p-12 text-white',
            right: 'flex-1 flex items-center justify-center p-8 bg-white',
            card: 'w-full max-w-md',
        };
    }

    return base;
}

export function getResultClasses(
    _status: 'success' | 'error' | 'info' | 'warning' | '404' | '500' = 'info',
) {
    return {
        container: 'flex flex-col items-center justify-center p-12 text-center',
        icon: {
            base: 'text-6xl mb-6',
            success: 'text-success',
            error: 'text-error',
            info: 'text-info',
            warning: 'text-warning',
            '404': 'text-neutral-400',
            '500': 'text-error',
        },
        title: 'text-2xl font-bold mb-2',
        subtitle: 'text-sm opacity-50 mb-8 max-w-md',
        extra: 'flex gap-4',
        content: 'mt-8 p-6 bg-neutral-50 rounded-lg w-full max-w-2xl text-left',
    };
}

export function getPageHeaderClasses() {
    return {
        container: 'mb-10',
        breadcrumb: 'text-[12px] font-medium text-zinc-400 mb-4 flex items-center gap-2',
        heading: 'flex items-center justify-between',
        left: 'flex flex-col gap-2',
        title: 'text-[28px] font-bold text-zinc-900 tracking-[-0.02em] leading-none',
        subtitle: 'text-[14px] font-medium text-zinc-500/80',
        extra: 'flex items-center gap-3',
        footer: 'mt-8 pt-8 border-t border-zinc-100',
    };
}

export function getQueryFilterClasses() {
    return {
        container: 'p-6 bg-white rounded-xl border border-neutral-100 shadow-sm mb-6',
        grid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6',
        actions: 'mt-6 pt-6 border-t border-neutral-50 flex items-center justify-end gap-3',
    };
}

export function getStepFormClasses() {
    return {
        container: 'max-w-3xl mx-auto py-8',
        steps: 'flex items-center justify-between mb-12 relative',
        stepLine: 'absolute top-4 left-0 right-0 h-0.5 bg-neutral-100 -z-10',
        stepItem: 'flex flex-col items-center gap-2 bg-white px-4',
        stepCircle:
            'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors',
        stepActive: 'border-primary bg-primary text-white',
        stepPending: 'border-neutral-200 bg-white text-neutral-400',
        stepCompleted: 'border-success bg-success text-white',
        stepTitle: 'text-xs font-medium',
        content: 'bg-white p-8 rounded-xl border border-neutral-100 shadow-sm',
        footer: 'mt-8 flex items-center justify-center gap-4',
    };
}
