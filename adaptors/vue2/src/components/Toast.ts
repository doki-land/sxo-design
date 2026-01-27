import { type Toast, useToastManager } from '@sxo/design';
import { getToastClasses } from '@sxo/ui';
import { defineComponent, h, inject, onUnmounted, provide, ref } from 'vue';

const ToastKey = 'SxoToast';

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

        provide(ToastKey, manager);

        return () =>
            h('div', { class: 'sxo-toast-provider' }, [
                slots.default ? slots.default() : [],
                // In Vue 2, we don't have Teleport built-in.
                // For a production app, we would use portal-vue or manual DOM manipulation.
                h('div', { class: 'sxo-toasts-container' }, renderToasts(toasts.value, manager)),
            ]);
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
            { class: classes.container, key: pos },
            filtered.map((toast) =>
                h('div', { key: toast.id, class: getToastClasses({ type: toast.type }).item }, [
                    // Content
                    h('div', { class: 'flex-grow flex flex-col' }, [
                        toast.title && h('div', { class: 'text-sm font-bold' }, toast.title),
                        toast.description &&
                            h('div', { class: 'text-xs opacity-80' }, toast.description),
                    ]),
                    // Close Button
                    h(
                        'button',
                        {
                            class: 'opacity-50 hover:opacity-100',
                            on: {
                                click: () => manager.remove(toast.id),
                            },
                        },
                        '✕',
                    ),
                ]),
            ),
        );
    });
}

export function useToast() {
    const manager = inject<any>(ToastKey);
    if (!manager) {
        return {
            show: () => console.warn('ToastProvider not found'),
            success: () => console.warn('ToastProvider not found'),
            error: () => console.warn('ToastProvider not found'),
        };
    }
    return manager;
}
