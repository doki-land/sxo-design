import type { DesignTokens } from '@sxo/design';
import type { ParsedClass } from '../parser';

export const getVar = (path: string, fallback: string, opacity?: string) => {
    const base = path ? `var(--sxo-${path.replace(/\./g, '-')})` : fallback;
    if (opacity) {
        return `color-mix(in srgb, ${base}, transparent calc(100% - ${opacity.match(/^\d+$/) ? `${opacity}%` : opacity}))`;
    }
    return base;
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

        // 特殊逻辑：处理 foreground 语义
        if (part === 'foreground') {
            if (current && typeof current === 'object' && 'foreground' in current) {
                current = current.foreground;
                varParts.push('foreground');
                continue;
            } else if (tokens.color?.text?.primary) {
                // 如果在当前层级没找到 foreground，且是全局查找，优先映射到 text.primary
                // 这符合 bg-foreground = 黑色的直觉 (在浅色模式下)
                return {
                    color: tokens.color.text.primary,
                    varPath: 'color-text-primary',
                    opacity: opacity,
                };
            } else if (tokens.color?.primary?.foreground) {
                // 回退到全局 primary.foreground
                return {
                    color: tokens.color.primary.foreground,
                    varPath: 'color-primary-foreground',
                    opacity: opacity,
                };
            }
        }

        // 处理 DEFAULT
        if (part === 'DEFAULT') {
            if (current && typeof current === 'object' && 'DEFAULT' in current) {
                current = current.DEFAULT;
                varParts.push('DEFAULT');
                continue;
            }
        }

        if (current && typeof current === 'object' && part in current) {
            current = (current as any)[part];
            varParts.push(part);
            continue;
        }

        // 如果是 literal 但在 tokens 中没找到，尝试 fallback 到 DEFAULT
        if (
            current &&
            typeof current === 'object' &&
            'DEFAULT' in current &&
            i === colorNodes.length - 1
        ) {
            // 只有最后一个节点才尝试匹配 DEFAULT
            // 例如 bg-primary -> tokens.color.bg.primary.DEFAULT
            const potential = (current as any)[part];
            if (potential && typeof potential === 'object' && 'DEFAULT' in potential) {
                current = potential.DEFAULT;
                varParts.push(part);
                varParts.push('DEFAULT');
                continue;
            }
        }

        return undefined;
    }

    // 如果循环结束 current 仍是对象，尝试取其 DEFAULT
    if (current && typeof current === 'object' && 'DEFAULT' in current) {
        current = (current as any).DEFAULT;
        varParts.push('DEFAULT');
    }

    if (typeof current !== 'string') return undefined;

    return { color: current, varPath: varParts.join('-'), opacity: opacity };

    return undefined;
}
