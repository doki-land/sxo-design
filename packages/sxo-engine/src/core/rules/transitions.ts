import type { Rule } from '../types';

export const transitionRules: Rule[] = [
    // Transition Property
    [
        (parsed) =>
            parsed.nodes[0]?.type === 'literal' &&
            parsed.nodes[0].value === 'transition' &&
            parsed.nodes.length <= 2,
        (_, { parsed }) => {
            const node = parsed.nodes[1];
            const val = node?.type === 'literal' ? node.value : 'all';
            const map: Record<string, string> = {
                none: 'none',
                all: 'all',
                DEFAULT:
                    'color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter',
                colors: 'color, background-color, border-color, text-decoration-color, fill, stroke',
                opacity: 'opacity',
                shadow: 'box-shadow',
                transform: 'transform',
            };
            const prop = map[val] || val;
            return {
                'transition-property': prop,
                'transition-timing-function': 'cubic-bezier(0.4, 0, 0.2, 1)',
                'transition-duration': '150ms',
            };
        },
    ],

    // Duration
    [
        (parsed) =>
            parsed.nodes[0]?.type === 'literal' &&
            parsed.nodes[0].value === 'duration' &&
            parsed.nodes.length === 2,
        (_, { parsed }) => {
            const node = parsed.nodes[1];
            if (node.type === 'numeric') return { 'transition-duration': `${node.value}ms` };
            if (node.type === 'arbitrary') return { 'transition-duration': node.value };
        },
    ],

    // Delay
    [
        (parsed) =>
            parsed.nodes[0]?.type === 'literal' &&
            parsed.nodes[0].value === 'delay' &&
            parsed.nodes.length === 2,
        (_, { parsed }) => {
            const node = parsed.nodes[1];
            if (node.type === 'numeric') return { 'transition-delay': `${node.value}ms` };
            if (node.type === 'arbitrary') return { 'transition-delay': node.value };
        },
    ],

    // Ease
    [
        (parsed) =>
            parsed.nodes[0]?.type === 'literal' &&
            parsed.nodes[0].value === 'ease' &&
            parsed.nodes.length === 2,
        (_, { parsed }) => {
            const node = parsed.nodes[1];
            if (node.type === 'literal') {
                const map: Record<string, string> = {
                    linear: 'linear',
                    in: 'cubic-bezier(0.4, 0, 1, 1)',
                    out: 'cubic-bezier(0, 0, 0.2, 1)',
                    'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
                };
                return { 'transition-timing-function': map[node.value] || node.value };
            }
            if (node.type === 'arbitrary') return { 'transition-timing-function': node.value };
        },
    ],
];
