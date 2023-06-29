import type { Rule } from '../types';
import { getVar, resolveColor } from '../utils';

export const backgroundRules: Rule[] = [
    // Background Color Handling
    [
        (parsed) =>
            parsed.nodes[0]?.type === 'literal' &&
            parsed.nodes[0].value === 'bg' &&
            parsed.nodes.length >= 2,
        (_, { tokens, parsed }) => {
            const node1 = parsed.nodes[1];
            if (node1.type === 'literal') {
                const val = node1.value;
                if (['auto', 'cover', 'contain'].includes(val)) return { 'background-size': val };
                if (['left', 'center', 'right', 'top', 'bottom'].includes(val)) {
                    const pos = parsed.nodes
                        .slice(1)
                        .map((n) => {
                            if (n.type === 'literal') return n.value;
                            if (n.type === 'arbitrary') return n.value.replace(/_/g, ' ');
                            return '';
                        })
                        .filter(Boolean)
                        .join(' ');
                    return { 'background-position': pos };
                }
            }

            const res =
                resolveColor(parsed, tokens) ||
                resolveColor(parsed, tokens, { subGroup: 'background' });
            if (res) {
                const isImage = res.color.startsWith('url(') || res.color.includes('gradient');
                if (isImage) {
                    return { 'background-image': res.color.replace(/_/g, ' ') };
                }

                const color = getVar(res.varPath, res.color, res.opacity);
                // 如果 color 已经是 color-mix (即带有透明度)，直接返回 background-color
                if (color.startsWith('color-mix')) {
                    return { 'background-color': color };
                }

                return {
                    '--sxo-bg-opacity': '100%',
                    '--sxo-bg-color': color,
                    'background-color': `color-mix(in srgb, var(--sxo-bg-color), transparent calc(100% - var(--sxo-bg-opacity)))`,
                };
            }
        },
    ],

    // Background Opacity
    [
        (parsed) =>
            parsed.nodes[0]?.type === 'literal' &&
            parsed.nodes[0].value === 'bg' &&
            parsed.nodes[1]?.type === 'literal' &&
            parsed.nodes[1].value === 'opacity' &&
            parsed.nodes.length === 3,
        (_, { parsed }) => {
            const node = parsed.nodes[2];
            let val = '';
            if (node.type === 'numeric') val = `${node.value}%`;
            else if (node.type === 'arbitrary') val = node.value;
            if (val) return { '--sxo-bg-opacity': val };
        },
    ],

    // Background Clip
    [
        (parsed) =>
            parsed.nodes[0]?.type === 'literal' &&
            parsed.nodes[0].value === 'bg' &&
            parsed.nodes[1]?.type === 'literal' &&
            parsed.nodes[1].value === 'clip' &&
            parsed.nodes.length >= 3,
        (_, { parsed }) => {
            const val = (parsed.nodes[2] as any)?.value;
            if (val === 'text')
                return { '-webkit-background-clip': 'text', 'background-clip': 'text' };
            if (['border', 'padding', 'content'].includes(val))
                return { 'background-clip': `${val}-box` };
        },
    ],

    // Background Size
    [
        (parsed) =>
            parsed.nodes[0]?.type === 'literal' &&
            parsed.nodes[0].value === 'bg' &&
            parsed.nodes[1]?.type === 'literal' &&
            parsed.nodes[1].value === 'size' &&
            parsed.nodes.length >= 3,
        (_, { parsed }) => {
            const node = parsed.nodes[2];
            if (node.type === 'arbitrary') {
                return { 'background-size': node.value.replace(/_/g, ' ') };
            }
            if (node.type === 'numeric') {
                return { 'background-size': node.unit ? node.raw : `${node.value}px` };
            }
            if (node.type === 'literal') {
                // 防止 malformed arbitrary values (e.g. "[200%") 被当做 literal 处理
                if (node.value.startsWith('[')) return;
                return { 'background-size': node.value };
            }
        },
    ],

    // Gradient
    [
        (parsed) =>
            parsed.nodes[0]?.type === 'literal' &&
            parsed.nodes[0].value === 'bg' &&
            parsed.nodes[1]?.type === 'literal' &&
            parsed.nodes[1].value === 'gradient',
        (_, { parsed }) => {
            const type = (parsed.nodes[2] as any)?.value;

            if (type === 'to') {
                const dir = (parsed.nodes[3] as any)?.value;
                const dirMap: Record<string, string> = {
                    t: 'to top',
                    tr: 'to top right',
                    r: 'to right',
                    br: 'to bottom right',
                    b: 'to bottom',
                    bl: 'to bottom left',
                    l: 'to left',
                    tl: 'to top left',
                };
                const value = dirMap[dir] || dir;
                if (value) {
                    return {
                        'background-image': `linear-gradient(${value}, var(--sxo-gradient-stops, var(--sxo-gradient-from, transparent), var(--sxo-gradient-to, transparent)))`,
                    };
                }
            } else if (
                (parsed.nodes[1] as any).value === 'gradient' &&
                parsed.nodes[2]?.type === 'literal'
            ) {
                const gradientType = parsed.nodes[2].value;
                if (gradientType === 'radial') {
                    return {
                        'background-image': `radial-gradient(circle, var(--sxo-gradient-stops, var(--sxo-gradient-from, transparent), var(--sxo-gradient-to, transparent)))`,
                    };
                }
                if (gradientType === 'conic') {
                    return {
                        'background-image': `conic-gradient(var(--sxo-gradient-stops, var(--sxo-gradient-from, transparent), var(--sxo-gradient-to, transparent)))`,
                    };
                }
            }
        },
    ],

    // Gradient Colors: from-*, to-*, via-*
    [
        (parsed) =>
            parsed.nodes[0]?.type === 'literal' &&
            ['from', 'to', 'via'].includes(parsed.nodes[0].value) &&
            parsed.nodes.length >= 2,
        (_, { tokens, parsed }) => {
            const type = (parsed.nodes[0] as any).value;
            const res = resolveColor(parsed, tokens);
            if (res) {
                const color = getVar(res.varPath, res.color, res.opacity);
                if (type === 'from') {
                    return {
                        '--sxo-gradient-from': color,
                        '--sxo-gradient-stops': `var(--sxo-gradient-from), var(--sxo-gradient-to, transparent)`,
                    };
                }
                if (type === 'to') {
                    return { '--sxo-gradient-to': color };
                }
                if (type === 'via') {
                    return {
                        '--sxo-gradient-stops': `var(--sxo-gradient-from, transparent), ${color}, var(--sxo-gradient-to, transparent)`,
                    };
                }
            }
        },
    ],
];
