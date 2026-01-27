import type { Rule } from '../types';
import { getVar, resolveColor } from '../utils';

export const typographyRules: Rule[] = [
    [
        (parsed) =>
            parsed.nodes[0]?.type === 'literal' &&
            parsed.nodes[0].value === 'text' &&
            parsed.nodes.length >= 2,
        (_, { tokens, parsed }) => {
            const node1 = parsed.nodes[1];
            // 1. 尝试匹配字体大小 (tokens.typography.fontSize)
            if (node1.type === 'literal') {
                const size = tokens.typography.fontSize[node1.value];
                if (size)
                    return { 'font-size': getVar(`typography-fontSize-${node1.value}`, size) };
            } else if (node1.type === 'numeric') {
                return { 'font-size': node1.raw.match(/^\d+$/) ? `${node1.raw}px` : node1.raw };
            } else if (
                node1.type === 'arbitrary' &&
                (node1.value.endsWith('px') ||
                    node1.value.endsWith('rem') ||
                    node1.value.endsWith('em') ||
                    !node1.value.startsWith('#'))
            ) {
                // 如果是 arbitrary 且看起来像长度，或者是非颜色值
                return { 'font-size': node1.value };
            }

            // 2. 匹配颜色，优先从 tokens.color.text 中寻找
            const res =
                resolveColor(parsed, tokens, { subGroup: 'text' }) || resolveColor(parsed, tokens);
            if (res) {
                const color = getVar(res.varPath, res.color, res.opacity);
                // 如果 color 已经是 color-mix (即带有透明度)，直接返回 color
                if (color.startsWith('color-mix')) {
                    return { color };
                }
                return {
                    '--sxo-text-opacity': '100%',
                    '--sxo-text-color': color,
                    color: `color-mix(in srgb, var(--sxo-text-color), transparent calc(100% - var(--sxo-text-opacity)))`,
                };
            }
        },
    ],
    // Text Opacity
    [
        (parsed) =>
            parsed.nodes[0]?.type === 'literal' &&
            parsed.nodes[0].value === 'text' &&
            parsed.nodes[1]?.type === 'literal' &&
            parsed.nodes[1].value === 'opacity' &&
            parsed.nodes.length === 3,
        (_, { parsed }) => {
            const node = parsed.nodes[2];
            let val = '';
            if (node.type === 'numeric') val = `${node.value}%`;
            else if (node.type === 'arbitrary') val = node.value;
            if (val) return { '--sxo-text-opacity': val };
        },
    ],
    // Text Alignment, Balance, Antialiasing
    [
        (parsed) =>
            parsed.nodes[0]?.type === 'literal' &&
            parsed.nodes[0].value === 'text' &&
            parsed.nodes.length === 2,
        (_, { parsed }) => {
            const val = (parsed.nodes[1] as any).value;
            if (['left', 'center', 'right', 'justify', 'start', 'end'].includes(val))
                return { 'text-align': val };
            if (val === 'balance') return { 'text-wrap': 'balance' };
            if (val === 'nowrap') return { 'white-space': 'nowrap' };
        },
    ],
    [
        (parsed) => parsed.nodes[0]?.type === 'literal' && parsed.nodes[0].value === 'antialiased',
        () => ({
            '-webkit-font-smoothing': 'antialiased',
            '-moz-osx-font-smoothing': 'grayscale',
        }),
    ],
    // Font Weight & Family
    [
        (parsed) =>
            parsed.nodes[0]?.type === 'literal' &&
            parsed.nodes[0].value === 'font' &&
            parsed.nodes.length >= 2,
        (_, { tokens, parsed }) => {
            const node = parsed.nodes[1];
            if (node.type === 'literal') {
                const weight = (tokens.typography as any).fontWeight?.[node.value];
                if (weight)
                    return { 'font-weight': getVar(`typography-fontWeight-${node.value}`, weight) };

                const family = (tokens.typography as any).fontFamily?.[node.value];
                if (family)
                    return { 'font-family': getVar(`typography-fontFamily-${node.value}`, family) };
            } else if (node.type === 'numeric') {
                return { 'font-weight': node.value };
            } else if (node.type === 'arbitrary') {
                return { 'font-weight': node.value };
            }
        },
    ],
];
