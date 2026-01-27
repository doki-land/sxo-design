import { ValueResolver } from '../resolver';
import type { Rule } from '../types';
import { getVar } from '../utils';

export const spacingRules: Rule[] = [
    // 1. Spacing (Margin & Padding)
    [
        (parsed) => {
            const first = parsed.nodes[0];
            if (first?.type !== 'literal') return false;
            const val = first.value;
            return (
                (val.startsWith('m') || val.startsWith('p')) &&
                (val.length === 1 || (val.length === 2 && 'trblxy'.includes(val[1]))) &&
                parsed.nodes.length === 2
            );
        },
        (_, { tokens, parsed }) => {
            const first = (parsed.nodes[0] as any).value;
            const type = first[0] === 'm' ? 'margin' : 'padding';
            const side = first[1];
            const node = parsed.nodes[1];

            let value: string | undefined = ValueResolver.resolveSpacing(node, tokens);

            // 特殊处理：如果没有在 spacing tokens 中找到且是 literal，尝试直接返回值或变量
            if (!value && node.type === 'literal') {
                value = node.value;
                if (value === 'auto') return { [`${type}${suffix}`]: 'auto' };
            } else if (node.type === 'numeric' && !node.unit) {
                // Tailwind 默认数值转 4px 比例
                value = `${node.value * 4}px`;
            } else if (node.type === 'arbitrary') {
                value = node.value.replace(/_/g, ' ');
            }

            // 如果是 literal 或 numeric 且在 spacing tokens 中，包裹 getVar
            const tokenKey =
                node.type === 'literal' ? node.value : node.type === 'numeric' ? node.raw : '';
            if (tokenKey && tokens.spacing[tokenKey]) {
                value = getVar(`spacing-${tokenKey}`, value!);
            }

            const map: Record<string, string> = {
                t: 'top',
                r: 'right',
                b: 'bottom',
                l: 'left',
                x: 'inline',
                y: 'block',
            };
            const suffix = side ? `-${map[side]}` : '';
            return { [`${type}${suffix}`]: value };
        },
    ],

    // 2. Space Between
    [
        (parsed) => {
            const n0 = parsed.nodes[0];
            const n1 = parsed.nodes[1];
            return (
                n0?.type === 'literal' &&
                n0.value === 'space' &&
                n1?.type === 'literal' &&
                (n1.value === 'x' || n1.value === 'y') &&
                parsed.nodes.length >= 3
            );
        },
        (_, { tokens, parsed }) => {
            const axis = (parsed.nodes[1] as any).value;
            const node = parsed.nodes[2];

            let value: string | undefined = ValueResolver.resolveSpacing(node, tokens);
            if (!value && node.type === 'literal') {
                value = node.value;
            } else if (node.type === 'numeric' && !node.unit) {
                value = `${node.value * 4}px`;
            } else if (node.type === 'arbitrary') {
                value = node.value.replace(/_/g, ' ');
            }

            if (!value) return;

            const tokenKey =
                node.type === 'literal' ? node.value : node.type === 'numeric' ? node.raw : '';
            if (tokenKey && tokens.spacing[tokenKey]) {
                value = getVar(`spacing-${tokenKey}`, value!);
            }

            const reverseVar = `--sxo-space-${axis}-reverse`;
            const prop = axis === 'x' ? 'margin-left' : 'margin-top';
            const oppositeProp = axis === 'x' ? 'margin-right' : 'margin-bottom';

            return {
                [`& > :not([hidden]) ~ :not([hidden])`]: {
                    [reverseVar]: '0',
                    [prop]: `calc(${value} * calc(1 - var(${reverseVar})))`,
                    [oppositeProp]: `calc(${value} * var(${reverseVar}))`,
                },
            };
        },
    ],
    [
        (parsed) =>
            parsed.nodes[0]?.value === 'space' &&
            (parsed.nodes[1]?.value === 'x' || parsed.nodes[1]?.value === 'y') &&
            parsed.nodes[2]?.value === 'reverse',
        (_, { parsed }) => {
            const axis = (parsed.nodes[1] as any).value;
            return {
                [`& > :not([hidden]) ~ :not([hidden])`]: {
                    [`--sxo-space-${axis}-reverse`]: '1',
                },
            };
        },
    ],
];
