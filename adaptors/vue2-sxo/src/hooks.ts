import { resolveToken, type TokenPath } from '@sxo/design';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { useSxo } from './plugin';

/**
 * Vue Composition API for SXO styles
 */
export function useStyle(classNames: string | (() => string)) {
    const { engine } = useSxo();

    const classes = computed(() => {
        const raw = typeof classNames === 'function' ? classNames() : classNames;
        if (!raw || typeof raw !== 'string') return [];
        return raw.split(/\s+/).filter(Boolean);
    });

    const css = computed(() => engine.generateBatch(classes.value));

    watch(
        css,
        (newCss) => {
            if (newCss && typeof document !== 'undefined') {
                const styleTag = document.getElementById('sxo-engine');
                if (styleTag) {
                    if (!styleTag.innerHTML.includes(newCss)) {
                        styleTag.innerHTML += newCss;
                    }
                } else {
                    const tag = document.createElement('style');
                    tag.id = 'sxo-engine';
                    tag.innerHTML = newCss;
                    document.head.appendChild(tag);
                }
            }
        },
        { immediate: true },
    );

    return typeof classNames === 'function' ? computed(classNames) : classNames;
}

/**
 * 获取当前主题下的令牌值
 */
export function useToken(path: TokenPath) {
    const { tokens } = useSxo();
    return computed(() => resolveToken(tokens, path));
}

/**
 * 响应式断点 Hook
 */
export function useBreakpoint() {
    const { tokens } = useSxo();
    const breakpoint = ref('xs');

    const updateBreakpoint = () => {
        const width = window.innerWidth;
        const sorted = Object.entries(tokens.breakpoints).sort(
            (a, b) => Number.parseInt(b[1], 10) - Number.parseInt(a[1], 10),
        );

        for (const [name, minWidth] of sorted) {
            if (width >= Number.parseInt(minWidth, 10)) {
                breakpoint.value = name;
                return;
            }
        }
        breakpoint.value = 'xs';
    };

    onMounted(() => {
        updateBreakpoint();
        window.addEventListener('resize', updateBreakpoint);
    });

    onUnmounted(() => {
        window.removeEventListener('resize', updateBreakpoint);
    });

    return breakpoint;
}
