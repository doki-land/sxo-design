import { useMemo, useEffect, useState, useCallback } from 'react';
import { useSxo } from './context';
import { TokenPath, resolveToken } from '@sxo/design';

/**
 * 核心 Hook：解析类名并生成样式
 */
export function useStyle(classNames: string) {
  const { engine } = useSxo();

  const css = useMemo(() => {
    const classes = classNames.split(/\s+/).filter(Boolean);
    return engine.generateBatch(classes);
  }, [classNames, engine]);

  useEffect(() => {
    if (css) {
      const styleTag = document.getElementById('sxo-engine');
      if (styleTag) {
        if (!styleTag.innerHTML.includes(css)) {
          styleTag.innerHTML += css;
        }
      }
    }
  }, [css]);

  return classNames;
}

/**
 * 获取当前主题下的令牌值
 */
export function useToken(path: TokenPath): string | undefined {
  const { tokens } = useSxo();
  return useMemo(() => resolveToken(tokens, path), [tokens, path]);
}

/**
 * 响应式断点 Hook
 */
export function useBreakpoint() {
  const { tokens } = useSxo();
  const [breakpoint, setBreakpoint] = useState<string>('xs');

  const updateBreakpoint = useCallback(() => {
    const width = window.innerWidth;
    const sorted = Object.entries(tokens.breakpoints).sort(
      (a, b) => parseInt(b[1]) - parseInt(a[1]),
    );

    for (const [name, minWidth] of sorted) {
      if (width >= parseInt(minWidth)) {
        setBreakpoint(name);
        return;
      }
    }
    setBreakpoint('xs');
  }, [tokens.breakpoints]);

  useEffect(() => {
    updateBreakpoint();
    window.addEventListener('resize', updateBreakpoint);
    return () => window.removeEventListener('resize', updateBreakpoint);
  }, [updateBreakpoint]);

  return breakpoint;
}
