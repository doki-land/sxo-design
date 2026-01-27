import type { Rule } from '../types';
import { getVar, resolveColor } from '../utils';

export const effectRules: Rule[] = [
    // Shadow
    [
        (parsed) =>
            parsed.nodes[0]?.type === 'literal' &&
            parsed.nodes[0].value === 'shadow' &&
            parsed.nodes.length >= 1,
        (_, { tokens, parsed }) => {
            const node = parsed.nodes[1];
            if (!node)
                return { 'box-shadow': getVar('boxShadow-DEFAULT', tokens.boxShadow.DEFAULT) };

            if (node.type === 'literal' || node.type === 'numeric') {
                // 尝试查找预设投影
                const path = parsed.nodes
                    .slice(1)
                    .map((n) => (n as any).raw || (n as any).value)
                    .join('-');
                const val = (tokens.boxShadow as any)[path];
                if (val) return { 'box-shadow': getVar(`boxShadow-${path}`, val) };

                // 尝试查找颜色作为投影颜色 (如 shadow-primary/20)
                const colorRes = resolveColor(parsed, tokens);
                if (colorRes) {
                    const color = getVar(colorRes.varPath, colorRes.color, colorRes.opacity);
                    // 默认使用 md 投影大小，但替换颜色
                    const baseShadow =
                        tokens.boxShadow.DEFAULT ||
                        '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)';
                    // 这里简单的正则替换颜色，更复杂的可能需要解析 shadow 字符串
                    // 假设 tokens 中的 shadow 颜色是 rgba(0,0,0,...) 或 #000
                    return {
                        'box-shadow': baseShadow.replace(/rgba?\([^)]+\)|#[0-9a-fA-F]+/g, color),
                    };
                }
            } else if (node.type === 'arbitrary') {
                return { 'box-shadow': node.value.replace(/_/g, ' ') };
            }
        },
    ],

    // Opacity
    [
        (parsed) =>
            parsed.nodes[0]?.type === 'literal' &&
            parsed.nodes[0].value === 'opacity' &&
            parsed.nodes.length === 2,
        (_, { tokens, parsed }) => {
            const node = parsed.nodes[1];
            if (node.type === 'literal') {
                const val = (tokens as any).opacity?.[node.value];
                if (val) return { opacity: val };
            } else if (node.type === 'numeric') {
                return { opacity: node.unit ? node.raw : `${node.value / 100}` };
            } else if (node.type === 'arbitrary') {
                return { opacity: node.value };
            }
        },
    ],

    // Blur & Backdrop Blur
    [
        (parsed) => {
            const first = parsed.nodes[0];
            if (first?.type !== 'literal') return false;
            if (first.value === 'blur') return true;
            return (
                first.value === 'backdrop' &&
                parsed.nodes[1]?.type === 'literal' &&
                parsed.nodes[1].value === 'blur'
            );
        },
        (_, { parsed }) => {
            const isBackdrop = (parsed.nodes[0] as any).value === 'backdrop';
            const prop = isBackdrop ? 'backdrop-filter' : 'filter';
            const node = isBackdrop ? parsed.nodes[2] : parsed.nodes[1];

            let value = '';
            if (!node) {
                value = '8px';
            } else if (node.type === 'literal') {
                const map: Record<string, string> = {
                    none: '0',
                    sm: '4px',
                    md: '12px',
                    lg: '16px',
                    xl: '24px',
                    '2xl': '40px',
                    '3xl': '64px',
                };
                value = map[node.value] || node.value;
            } else if (node.type === 'numeric') {
                value = node.unit ? node.raw : `${node.value}px`;
            } else if (node.type === 'arbitrary') {
                value = node.value;
            }

            if (value) {
                const res: any = { [prop]: `blur(${value})` };
                if (isBackdrop) {
                    res['-webkit-backdrop-filter'] = `blur(${value})`;
                }
                return res;
            }
        },
    ],
];
