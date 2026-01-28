import { resolveToken, type TokenPath } from '@sxo/design';
import { type ComputedRef, computed, onMounted, onUnmounted, ref, watchEffect, isRef } from 'vue';
import { useSxo } from './plugin';

const injectedStyles = new Set<string>();

/**
 * Vue Composition API for SXO styles
 */
export function useStyle(
    classNames: string | (() => string) | ComputedRef<string>,
): ComputedRef<string> {
    const { engine } = useSxo();

    const classes = computed(() => {
        let raw: any = classNames;
        if (typeof classNames === 'function') {
            raw = classNames();
        } else if (isRef(classNames)) {
            raw = classNames.value;
        }

        if (!raw || typeof raw !== 'string') return [];
        return raw.split(/\s+/).filter(Boolean);
    });

    const css = computed(() => engine.generateBatch(classes.value));

    watchEffect(() => {
        if (css.value && typeof document !== 'undefined') {
            const styleTag = document.getElementById('sxo-engine');
            if (styleTag) {
                // 按行分割，检查哪些行没被注入过
                const lines = css.value.split('\n').filter((l) => l.trim());
                let needsUpdate = false;
                for (const line of lines) {
                    if (!injectedStyles.has(line)) {
                        injectedStyles.add(line);
                        needsUpdate = true;
                    }
                }

                if (needsUpdate) {
                    styleTag.innerHTML = Array.from(injectedStyles).join('\n');
                }
            } else {
                const tag = document.createElement('style');
                tag.id = 'sxo-engine';
                const lines = css.value.split('\n').filter((l) => l.trim());
                lines.forEach((l) => injectedStyles.add(l));
                tag.innerHTML = Array.from(injectedStyles).join('\n');
                document.head.appendChild(tag);
            }
        }
    });

    return isRef(classNames)
        ? (classNames as ComputedRef<string>)
        : typeof classNames === 'function'
          ? computed(classNames as any)
          : computed(() => classNames as string);
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
            (a, b) => parseInt(b[1], 10) - parseInt(a[1], 10),
        );

        for (const [name, minWidth] of sorted) {
            if (width >= parseInt(minWidth, 10)) {
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
