import { type Toast, useToastManager } from '@sxo/design';
import { getToastClasses } from '@sxo/ui';
import { defineComponent, h, inject, onUnmounted, provide, ref, Teleport } from 'vue';

const ToastSymbol = Symbol('Toast');

export const ToastProvider = defineComponent({
    name: 'SxoToastProvider',
    setup(_, { slots }) {
        const manager = useToastManager();
        const toasts = ref<Toast[]>([]);

        const unsubscribe = manager.subscribe((newToasts) => {
            toasts.value = newToasts;
        });

        onUnmounted(() => {
            unsubscribe();
        });

        provide(ToastSymbol, manager);

        return () => [
            slots.default?.(),
            h(Teleport, { to: 'body' }, [
                // 按位置分组显示 Toast
                ...renderToasts(toasts.value, manager),
            ]),
        ];
    },
});

function renderToasts(toasts: Toast[], manager: any) {
    const positions = [
        'top',
        'bottom',
        'top-left',
        'top-right',
        'bottom-left',
        'bottom-right',
    ] as const;
    return positions.map((pos) => {
        const filtered = toasts.filter((t) => (t.position || 'top-right') === pos);
        if (filtered.length === 0) return null;

        const classes = getToastClasses({ position: pos });

        return h(
            'div',
            { class: classes.container },
            filtered.map((toast) =>
                h('div', { key: toast.id, class: getToastClasses({ type: toast.type }).item }, [
                    // 图标 (简单实现)
                    h('div', { class: 'w-5 h-5 flex-shrink-0' }, [renderIcon(toast.type)]),
                    // 内容
                    h('div', { class: 'flex-grow flex flex-col' }, [
                        toast.title && h('div', { class: 'text-sm font-bold' }, toast.title),
                        toast.description &&
                            h('div', { class: 'text-xs opacity-80' }, toast.description),
                    ]),
                    // 关闭按钮
                    h(
                        'button',
                        {
                            class: 'opacity-50 hover:opacity-100',
                            onClick: () => manager.remove(toast.id),
                        },
                        '✕',
                    ),
                ]),
            ),
        );
    });
}

function renderIcon(type: string = 'info') {
    const colors = {
        info: 'currentColor',
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
    };
    return h(
        'svg',
        {
            width: '20',
            height: '20',
            viewBox: '0 0 24 24',
            fill: 'none',
            stroke: (colors as any)[type] || colors.info,
            'stroke-width': '2',
        },
        [
            h('circle', { cx: '12', cy: '12', r: '10' }),
            h('line', { x1: '12', y1: '8', x2: '12', y2: '12' }),
            h('line', { x1: '12', y1: '16', x2: '12.01', y2: '16' }),
        ],
    );
}

export function useToast() {
    const manager = inject<ReturnType<typeof useToastManager>>(ToastSymbol);
    if (!manager) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return {
        toast: manager.add,
        success: (title: string, description?: string) =>
            manager.add({ title, description, type: 'success' }),
        error: (title: string, description?: string) =>
            manager.add({ title, description, type: 'error' }),
        info: (title: string, description?: string) =>
            manager.add({ title, description, type: 'info' }),
        warning: (title: string, description?: string) =>
            manager.add({ title, description, type: 'warning' }),
    };
}
