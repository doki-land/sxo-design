import { computed, watchEffect, ref, onMounted, onUnmounted } from 'vue';
import { useSxo } from './plugin';
import { TokenPath, resolveToken } from '@sxo/design';

/**
 * Vue Composition API for SXO styles
 */
export function useStyle(classNames: string | (() => string)) {
  const { engine } = useSxo();

  const classes = computed(() => {
    const raw = typeof classNames === 'function' ? classNames() : classNames;
    return raw.split(/\s+/).filter(Boolean);
  });

  const css = computed(() => engine.generateBatch(classes.value));

  watchEffect(() => {
    if (css.value && typeof document !== 'undefined') {
      const styleTag = document.getElementById('sxo-engine');
      if (styleTag) {
        if (!styleTag.innerHTML.includes(css.value)) {
          styleTag.innerHTML += css.value;
        }
      } else {
        const tag = document.createElement('style');
        tag.id = 'sxo-engine';
        tag.innerHTML = css.value;
        document.head.appendChild(tag);
      }
    }
  });

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
      (a, b) => parseInt(b[1]) - parseInt(a[1]),
    );

    for (const [name, minWidth] of sorted) {
      if (width >= parseInt(minWidth)) {
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
