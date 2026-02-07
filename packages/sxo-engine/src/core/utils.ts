import type { DesignTokens } from '@sxo/design';
import type { ParsedClass } from '../parser';

export const getVar = (path: string, fallback: string, opacity?: string) => {
    const base = path ? `var(--sxo-${path.replace(/\./g, '-')})` : fallback;
    if (opacity) {
        return `color-mix(in srgb, ${base}, transparent calc(100% - ${opacity.match(/^\d+$/) ? `${opacity}%` : opacity}))`;
    }
    return base;
};

export const withUnit = (value: number | string, unit?: 'px' | 'rpx' | 'rem') => {
    if (typeof value === 'string') {
        if (!unit || unit === 'px') return value;
        // 如果已经有单位了，就不处理
        if (/[a-z%]$/.test(value)) return value;
        // 如果是纯数字字符串
        if (/^\d+(\.\d+)?$/.test(value)) {
            return `${value}${unit}`;
        }
        return value;
    }
    const targetUnit = unit || 'px';
    return `${value}${targetUnit}`;
};

export function resolveColor(
    parsed: ParsedClass,
    tokens: DesignTokens,
    options: { subGroup?: string; skipNodes?: number } = {},
): { color: string; varPath: string; opacity?: string } | undefined {
    const { subGroup, skipNodes = 1 } = options;
    const colorNodes = parsed.nodes.slice(skipNodes);
    if (colorNodes.length === 0) return undefined;

    let current: any = tokens.color || {};
    let varParts = ['color'];

    // 如果指定了 subGroup (如 'bg', 'text', 'border')，尝试先进入该子组
    if (subGroup && subGroup in current) {
        current = current[subGroup];
        varParts.push(subGroup);
    } else if (subGroup === 'background' && 'bg' in current) {
        current = current['bg'];
        varParts.push('bg');
    } else if (subGroup === 'bg' && 'background' in current) {
        current = current['background'];
        varParts.push('background');
    }

    let startIdx = 0;
    let opacity = parsed.opacity;

    // 如果第一个节点匹配 subGroup 名称且我们已经进去了，跳过它
    if (subGroup && colorNodes[0].type === 'literal' && colorNodes[0].value === subGroup) {
        startIdx = 1;
    }

    for (let i = startIdx; i < colorNodes.length; i++) {
        const node = colorNodes[i];
        let part = node.type === 'numeric' ? node.raw : (node as any).value;

        // 处理带透明度的节点 (如 primary/50)
        if (node.type === 'literal' && part.includes('/') && !part.startsWith('[')) {
            const [colorPart, opacityPart] = part.split('/');
            part = colorPart;
            opacity = opacityPart;
        }

        if (node.type === 'arbitrary') {
            const val = node.value;
            // 简单的启发式：如果看起来不像颜色（包含 : 且不是 url），则不认为是颜色
            if (val.includes(':') && !val.startsWith('url(')) return undefined;
            return { color: val, varPath: '', opacity: opacity };
        }

        if (node.type !== 'literal' && node.type !== 'numeric') return undefined;

        if (part === 'transparent' || part === 'inherit' || part === 'currentColor') {
            return { color: part, varPath: '', opacity: opacity };
        }

        // 特殊处理：如果 part 是数值且我们在根部，尝试进入 neutral (Tailwind 习惯)
        if (node.type === 'numeric' && i === 0 && tokens.color?.neutral?.[part]) {
            current = tokens.color.neutral[part];
            varParts = ['color', 'neutral', part];
            continue;
        }

        if (current && typeof current === 'object' && part in current) {
            current = current[part];
            varParts.push(part);
        } else if (current && typeof current === 'object' && part === 'foreground' && 'foreground' in current) {
            // 支持显式的 foreground 节点
            current = current.foreground;
            varParts.push('foreground');
        } else {
            return undefined;
        }
    }

    // 处理对象类型的颜色（通常带有 DEFAULT）
    let colorValue = current;
    if (typeof current === 'object' && current !== null) {
        if ('DEFAULT' in current) {
            colorValue = current.DEFAULT;
            varParts.push('DEFAULT');
        } else if ('foreground' in current) {
            // 如果只有 foreground，则使用 it (常用于某些语义组)
            colorValue = current.foreground;
            varParts.push('foreground');
        } else {
            // 如果没有 DEFAULT，尝试取第一个值
            const firstKey = Object.keys(current)[0];
            if (firstKey) {
                colorValue = current[firstKey];
                varParts.push(firstKey);
            } else {
                return undefined;
            }
        }
    }

    if (typeof colorValue !== 'string') return undefined;

    return {
        color: colorValue,
        varPath: varParts.join('-'),
        opacity: opacity,
    };
}

/**
 * Escapes class names for UniApp / Mini Program environments.
 * Replaces problematic characters with safe alternatives.
 */
export function escapeClassName(className: string): string {
    return className
        .replace(/\:/g, '_')
        .replace(/\[/g, '_')
        .replace(/\]/g, '_')
        .replace(/\./g, '_d_')
        .replace(/\//g, '_s_')
        .replace(/\%/g, '_p_')
        .replace(/\#/g, '_h_')
        .replace(/\!/g, '_i_');
}
