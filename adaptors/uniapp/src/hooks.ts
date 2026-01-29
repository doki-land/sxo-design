import { resolveToken, type TokenPath } from '@sxo/design';
import { type ComputedRef, computed, onMounted, onUnmounted, ref, watchEffect, isRef } from 'vue';
import { useSxo } from './plugin';

const injectedStyles = new Set<string>();

declare const uni: any;

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

    // UniApp 应该依赖于静态 CSS (vite-plugin-sxo 生成的 virtual:sxo.css)
    // 这里禁用运行时注入以避免 document 访问冲突
    /*
    watchEffect(() => {
        if (css.value && typeof document !== 'undefined') {
            let styleTag = document.getElementById('sxo-engine');
            if (!styleTag) {
                styleTag = document.createElement('style');
                styleTag.id = 'sxo-engine';
                document.head.appendChild(styleTag);
            }

            const lines = css.value.split('\n').filter((l) => l.trim());
            let needsUpdate = false;
            for (const line of lines) {
                if (!injectedStyles.has(line)) {
                    injectedStyles.add(line);
                    needsUpdate = true;
                }
            }

            if (needsUpdate) {
                styleTag.textContent = Array.from(injectedStyles).join('\n');
            }
        }
    });
    */

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
        let width = 0;
        if (typeof window !== 'undefined') {
            width = window.innerWidth;
        } else if (typeof uni !== 'undefined' && uni.getSystemInfoSync) {
            width = uni.getSystemInfoSync().windowWidth;
        }

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
        if (typeof window !== 'undefined') {
            window.addEventListener('resize', updateBreakpoint);
        }
    });

    onUnmounted(() => {
        if (typeof window !== 'undefined') {
            window.removeEventListener('resize', updateBreakpoint);
        }
    });

    return breakpoint;
}
