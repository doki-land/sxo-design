import type { Rule } from '../types';
import { getVar, resolveColor } from '../utils';

export const borderRules: Rule[] = [
    [
        (parsed) =>
            parsed.nodes[0]?.type === 'literal' &&
            parsed.nodes[0].value === 'border' &&
            parsed.nodes.length >= 2,
        (_, { tokens, parsed }) => {
            const node1 = parsed.nodes[1];
            // 1. 尝试匹配边框宽度
            if (node1.type === 'literal') {
                const width = (tokens as any).borderWidth?.[node1.value];
                if (width) return { 'border-width': width };
            } else if (node1.type === 'numeric') {
                return { 'border-width': node1.raw.match(/^\d+$/) ? `${node1.raw}px` : node1.raw };
            } else if (node1.type === 'arbitrary') {
                const val = node1.value;
                const width = val.match(/^\d+$/) ? `${val}px` : val;
                // 简单的启发式：如果包含长度单位或纯数字，则认为是宽度
                if (
                    val.match(/^\d+/) ||
                    val.includes('px') ||
                    val.includes('rem') ||
                    val.includes('em') ||
                    val.includes('vh') ||
                    val.includes('vw')
                ) {
                    return { 'border-width': width };
                }
            }

            // 2. 匹配颜色
            const res =
                resolveColor(parsed, tokens, { subGroup: 'border' }) ||
                resolveColor(parsed, tokens);
            if (res) {
                const color = getVar(res.varPath, res.color, res.opacity);
                return {
                    '--sxo-border-opacity': '100%',
                    '--sxo-border-color': color,
                    'border-color': `color-mix(in srgb, var(--sxo-border-color), transparent calc(100% - var(--sxo-border-opacity)))`,
                };
            }
        },
    ],
    ['border', () => ({ 'border-width': '1px', 'border-style': 'solid' })],
    ['border-t', () => ({ 'border-top-width': '1px', 'border-style': 'solid' })],
    ['border-b', () => ({ 'border-bottom-width': '1px', 'border-style': 'solid' })],
    ['border-l', () => ({ 'border-left-width': '1px', 'border-style': 'solid' })],
    ['border-r', () => ({ 'border-right-width': '1px', 'border-style': 'solid' })],

    // Border side with width
    [
        (parsed) =>
            parsed.nodes[0]?.type === 'literal' &&
            ['border-t', 'border-b', 'border-l', 'border-r'].includes(parsed.nodes[0].value) &&
            parsed.nodes.length === 2,
        (_, { parsed }) => {
            const node0 = parsed.nodes[0];
            if (node0.type !== 'literal') return;
            const side = node0.value;
            const node = parsed.nodes[1];
            const propMap: Record<string, string> = {
                'border-t': 'border-top-width',
                'border-b': 'border-bottom-width',
                'border-l': 'border-left-width',
                'border-r': 'border-right-width',
            };
            const prop = propMap[side];
            if (node.type === 'numeric')
                return { [prop]: `${node.value}px`, 'border-style': 'solid' };
            if (node.type === 'arbitrary') return { [prop]: node.value, 'border-style': 'solid' };
        },
    ],

    // Rounded
    [
        (parsed) =>
            parsed.nodes[0]?.type === 'literal' &&
            parsed.nodes[0].value === 'rounded' &&
            parsed.nodes.length <= 2,
        (_, { tokens, parsed }) => {
            const node = parsed.nodes[1];
            if (!node)
                return {
                    'border-radius': getVar('borderRadius-DEFAULT', tokens.borderRadius.DEFAULT),
                };

            if (node.type === 'literal') {
                const val = tokens.borderRadius[node.value];
                if (val) return { 'border-radius': getVar(`borderRadius-${node.value}`, val) };
                if (node.value === 'full')
                    return { 'border-radius': getVar('borderRadius-full', '9999px') };
                if (node.value === 'none')
                    return { 'border-radius': getVar('borderRadius-none', '0px') };
            } else if (node.type === 'numeric') {
                return { 'border-radius': node.raw };
            } else if (node.type === 'arbitrary') {
                return { 'border-radius': node.value };
            }
        },
    ],

    // Ring
    [
        (parsed) =>
            parsed.nodes[0]?.type === 'literal' &&
            parsed.nodes[0].value === 'ring' &&
            parsed.nodes.length >= 2,
        (_, { tokens, parsed }) => {
            const node1 = parsed.nodes[1];
            if (node1.type === 'numeric' && !node1.unit) {
                return {
                    '--sxo-ring-width': `${node1.value}px`,
                    'box-shadow': '0 0 0 var(--sxo-ring-width) var(--sxo-ring-color)',
                };
            } else if (node1.type === 'arbitrary') {
                return {
                    '--sxo-ring-width': node1.value,
                    'box-shadow': '0 0 0 var(--sxo-ring-width) var(--sxo-ring-color)',
                };
            }

            const res = resolveColor(parsed, tokens);
            if (res) {
                const color = getVar(res.varPath, res.color, res.opacity);
                return {
                    '--sxo-ring-color': color,
                    'box-shadow': '0 0 0 var(--sxo-ring-width, 3px) var(--sxo-ring-color)',
                };
            }
        },
    ],
];
