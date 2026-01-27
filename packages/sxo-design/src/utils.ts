import type { DesignTokens, TokenPath } from './tokens.ts';

/**
 * 深度合并设计令牌
 */
export function mergeTokens(base: DesignTokens, custom: any): DesignTokens {
    const merged = { ...base };

    function deepMerge(target: any, source: any) {
        for (const key in source) {
            if (Object.hasOwn(source, key)) {
                if (
                    typeof source[key] === 'object' &&
                    source[key] !== null &&
                    !Array.isArray(source[key]) &&
                    typeof target[key] === 'object' &&
                    target[key] !== null
                ) {
                    target[key] = { ...target[key] };
                    deepMerge(target[key], source[key]);
                } else {
                    target[key] = source[key];
                }
            }
        }
    }

    deepMerge(merged, custom);
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
    if (!path || typeof path !== 'string') return undefined;
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
