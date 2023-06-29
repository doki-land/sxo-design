import type { Rule } from '../types';

export const animationRules: Rule[] = [
    [
        (parsed) =>
            parsed.nodes[0]?.type === 'literal' &&
            parsed.nodes[0].value === 'animate' &&
            parsed.nodes.length === 2,
        (_, { tokens, parsed }) => {
            const node = parsed.nodes[1];
            if (node.type === 'arbitrary') {
                return { animation: node.value.replace(/_/g, ' ') };
            }
            if (node.type === 'literal') {
                const val = tokens.animation?.[node.value];
                if (val) return { animation: val };
                if (node.value === 'none') return { animation: 'none' };
            }
        },
    ],
];
