import { resolveToken, type TokenPath } from '@sxo/design';
import { type ComputedRef, computed, onMounted, onUnmounted, ref, watchEffect, isRef } from 'vue';
import { useSxo } from './plugin';

const injectedStyles = new Set<string>();

declare const uni: any;

/**
 * Vue Composition API for SXO styles
 */
export function useStyle(
    classNames: string | (() => string) | ComputedRef<string> | any,
): ComputedRef<string> {
    const { engine } = useSxo();

    const normalize = (val: any): string[] => {
        if (!val) return [];
        if (typeof val === 'string') return val.split(/\s+/).filter(Boolean);
        if (Array.isArray(val)) return val.flatMap(normalize);
        if (typeof val === 'object') {
            return Object.entries(val)
                .filter(([_, active]) => active)
                .map(([className]) => className);
        }
        return [];
    };

    const classes = computed(() => {
        let raw: any = classNames;
        if (typeof classNames === 'function') {
            raw = classNames();
        } else if (isRef(classNames)) {
            raw = classNames.value;
        }
        return normalize(raw);
    });

    const css = computed(() => engine.generateBatch(new Set(classes.value)));

    watchEffect(() => {
        if (css.value && typeof document !== 'undefined') {
            let styleTag = document.getElementById('sxo-engine');
            if (!styleTag) {
                styleTag = document.createElement('style');
                styleTag.id = 'sxo-engine';
                document.head.appendChild(styleTag);
            }

            // 使用更健壮的注入逻辑：按规则块分割
            // 简单的规则分割逻辑，假设每个规则以 } 结尾
            const rules = css.value
                .split('}')
                .map((r) => r.trim())
                .filter(Boolean)
                .map((r) => r + '}');

            let needsUpdate = false;
            for (const rule of rules) {
                if (!injectedStyles.has(rule)) {
                    injectedStyles.add(rule);
                    needsUpdate = true;
                }
            }

            if (needsUpdate) {
                styleTag.textContent = Array.from(injectedStyles).join('\n');
            }
        }
    });

    return isRef(classNames)
        ? (classNames as ComputedRef<string>)
        : typeof classNames === 'function'
          ? computed(classNames as any)
          : computed(() => (typeof classNames === 'string' ? classNames : classes.value.join(' ')));
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
