import { DesignTokens, TokenPath } from './tokens';

/**
 * 深度合并设计令牌
 */
export function mergeTokens(base: DesignTokens, custom: Partial<DesignTokens>): DesignTokens {
  const merged = { ...base };
  for (const key in custom) {
    if (Object.prototype.hasOwnProperty.call(custom, key)) {
      const k = key as keyof DesignTokens;
      if (typeof custom[k] === 'object' && custom[k] !== null && !Array.isArray(custom[k])) {
        // @ts-ignore
        merged[k] = { ...merged[k], ...custom[k] };
      } else {
        // @ts-ignore
        merged[k] = custom[k];
      }
    }
  }
  return merged;
}

/**
 * 将令牌转换为 CSS 变量
 */
export function tokensToCssVars(tokens: any, prefix = 'sxo'): Record<string, string> {
  const vars: Record<string, string> = {};

  function flatten(obj: any, path: string[] = []) {
    for (const key in obj) {
      const currentPath = [...path, key];
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        flatten(obj[key], currentPath);
      } else {
        const varName = `--${prefix}-${currentPath.join('-')}`;
        vars[varName] = obj[key];
      }
    }
  }

  flatten(tokens);
  return vars;
}

/**
 * 解析令牌路径 (例如: "color.accent.neon")
 * 具有强类型提示
 */
export function resolveToken(tokens: DesignTokens, path: TokenPath): string | undefined {
  const parts = (path as string).split('.');
  let current: any = tokens;
  for (const part of parts) {
    if (current && typeof current === 'object') {
      current = current[part];
    } else {
      return undefined;
    }
  }
  return typeof current === 'string' ? current : undefined;
}
