import { ValueResolver } from '../resolver';
import type { Rule } from '../types';
import { getVar } from '../utils';

export const layoutRules: Rule[] = [
    ['flex', () => ({ display: 'flex' })],
    ['inline-flex', () => ({ display: 'inline-flex' })],
    ['grid', () => ({ display: 'grid' })],
    ['inline-grid', () => ({ display: 'inline-grid' })],
    ['block', () => ({ display: 'block' })],
    ['inline-block', () => ({ display: 'inline-block' })],
    ['inline', () => ({ display: 'inline' })],
    ['hidden', () => ({ display: 'none' })],

    // Flex/Grid Align & Justify
    [
        (parsed) => {
            const first = parsed.nodes[0];
            return (
                first?.type === 'literal' &&
                ['items', 'justify', 'content', 'self'].includes((first as any).value) &&
                parsed.nodes.length === 2
            );
        },
        (_, { parsed }) => {
            const first = (parsed.nodes[0] as any).value;
            const node = parsed.nodes[1];
            if (node.type !== 'literal') return;

            const val = node.value;
            const map: Record<string, string> = {
                start: 'flex-start',
                end: 'flex-end',
                center: 'center',
                between: 'space-between',
                around: 'space-around',
                evenly: 'space-evenly',
                stretch: 'stretch',
                baseline: 'baseline',
            };
            const mappedVal = map[val] || val;

            if (first === 'items') return { 'align-items': mappedVal };
            if (first === 'justify') return { 'justify-content': mappedVal };
            if (first === 'content') return { 'align-content': mappedVal };
            if (first === 'self') return { 'align-self': mappedVal };
        },
    ],

    // Flex Direction & Wrap
    ['flex-row', () => ({ 'flex-direction': 'row' })],
    ['flex-row-reverse', () => ({ 'flex-direction': 'row-reverse' })],
    ['flex-col', () => ({ 'flex-direction': 'column' })],
    ['flex-col-reverse', () => ({ 'flex-direction': 'column-reverse' })],
    ['flex-wrap', () => ({ 'flex-wrap': 'wrap' })],
    ['flex-nowrap', () => ({ 'flex-wrap': 'nowrap' })],
    ['flex-wrap-reverse', () => ({ 'flex-wrap': 'wrap-reverse' })],

    ['grow', () => ({ 'flex-grow': '1' })],
    ['shrink', () => ({ 'flex-shrink': '1' })],

    // Flex Grow / Shrink / Basis
    [
        (parsed) => {
            const first = parsed.nodes[0];
            return (
                first?.type === 'literal' &&
                ['flex', 'grow', 'shrink'].includes(first.value) &&
                parsed.nodes.length >= 2
            );
        },
        (_, { parsed }) => {
            const first = (parsed.nodes[0] as any).value;
            const node = parsed.nodes[1];
            let value = '';
            if (node.type === 'literal') value = node.value;
            else if (node.type === 'numeric') value = node.raw;
            else if (node.type === 'arbitrary') value = node.value;

            if (first === 'grow') return { 'flex-grow': value === 'grow' ? '1' : value };
            if (first === 'shrink') return { 'flex-shrink': value === 'shrink' ? '1' : value };
            if (first === 'flex') {
                if (value === '1') return { flex: '1 1 0%' };
                if (value === 'auto') return { flex: '1 1 auto' };
                if (value === 'initial') return { flex: '0 1 auto' };
                if (value === 'none') return { flex: 'none' };
                return { flex: value };
            }
        },
    ],

    // Grid Columns / Span
    [
        (parsed) =>
            parsed.nodes[0]?.type === 'literal' &&
            parsed.nodes[0].value === 'col' &&
            parsed.nodes[1]?.type === 'literal' &&
            parsed.nodes[1].value === 'span' &&
            parsed.nodes.length === 3,
        (_, { parsed }) => {
            const node = parsed.nodes[2];
            if (node.type === 'numeric')
                return { 'grid-column': `span ${node.value} / span ${node.value}` };
            if (node.type === 'literal' && node.value === 'full')
                return { 'grid-column': '1 / -1' };
        },
    ],
    [
        (parsed) =>
            parsed.nodes[0]?.type === 'literal' &&
            parsed.nodes[0].value === 'grid' &&
            parsed.nodes[1]?.type === 'literal' &&
            parsed.nodes[1].value === 'cols' &&
            parsed.nodes.length === 3,
        (_, { parsed }) => {
            const node = parsed.nodes[2];
            if (node.type === 'numeric')
                return { 'grid-template-columns': `repeat(${node.value}, minmax(0, 1fr))` };
            if (node.type === 'arbitrary')
                return { 'grid-template-columns': node.value.replace(/_/g, ' ') };
        },
    ],

    // Z-Index
    [
        (parsed) =>
            parsed.nodes[0]?.type === 'literal' &&
            parsed.nodes[0].value === 'z' &&
            parsed.nodes.length === 2,
        (_, { parsed }) => {
            const node = parsed.nodes[1];
            if (node.type === 'numeric') return { 'z-index': node.value };
            if (node.type === 'arbitrary') return { 'z-index': node.value };
        },
    ],

    // Overflow
    [
        (parsed) =>
            parsed.nodes[0]?.type === 'literal' &&
            parsed.nodes[0].value === 'overflow' &&
            parsed.nodes.length >= 2,
        (_, { parsed }) => {
            const val = (parsed.nodes[1] as any).value;
            if (['auto', 'hidden', 'clip', 'visible', 'scroll'].includes(val)) {
                if (parsed.nodes.length === 2) return { overflow: val };
                const axis = val;
                const mode = (parsed.nodes[2] as any).value;
                if (axis === 'x') return { 'overflow-x': mode };
                if (axis === 'y') return { 'overflow-y': mode };
            }
        },
    ],

    // Pointer Events & User Select & Cursor
    [
        (parsed) =>
            parsed.nodes[0]?.type === 'literal' &&
            parsed.nodes[0].value === 'pointer' &&
            parsed.nodes[1]?.type === 'literal' &&
            parsed.nodes[1].value === 'events' &&
            parsed.nodes.length === 3,
        (_, { parsed }) => {
            const val = (parsed.nodes[2] as any).value;
            if (['none', 'auto'].includes(val)) return { 'pointer-events': val };
        },
    ],
    [
        (parsed) =>
            parsed.nodes[0]?.type === 'literal' &&
            parsed.nodes[0].value === 'select' &&
            parsed.nodes.length === 2,
        (_, { parsed }) => {
            const val = (parsed.nodes[1] as any).value;
            if (['none', 'text', 'all', 'auto'].includes(val)) return { 'user-select': val };
        },
    ],
    [
        (parsed) =>
            parsed.nodes[0]?.type === 'literal' &&
            parsed.nodes[0].value === 'cursor' &&
            parsed.nodes.length === 2,
        (_, { parsed }) => {
            const val = (parsed.nodes[1] as any).value;
            if (
                [
                    'auto',
                    'default',
                    'pointer',
                    'wait',
                    'text',
                    'move',
                    'help',
                    'not-allowed',
                    'none',
                    'context-menu',
                    'progress',
                    'cell',
                    'crosshair',
                    'vertical-text',
                    'alias',
                    'copy',
                    'no-drop',
                    'grab',
                    'grabbing',
                    'all-scroll',
                    'col-resize',
                    'row-resize',
                    'n-resize',
                    'e-resize',
                    's-resize',
                    'w-resize',
                    'ne-resize',
                    'nw-resize',
                    'se-resize',
                    'sw-resize',
                    'ew-resize',
                    'ns-resize',
                    'nesw-resize',
                    'nwse-resize',
                    'zoom-in',
                    'zoom-out',
                ].includes(val)
            ) {
                return { cursor: val };
            }
        },
    ],

    // Position
    ['static', () => ({ position: 'static' })],
    ['fixed', () => ({ position: 'fixed' })],
    ['absolute', () => ({ position: 'absolute' })],
    ['relative', () => ({ position: 'relative' })],
    ['sticky', () => ({ position: 'sticky' })],

    // Inset / Top / Right / Bottom / Left
    [
        (parsed) => {
            const first = parsed.nodes[0];
            return (
                first?.type === 'literal' &&
                ['inset', 'top', 'right', 'bottom', 'left'].includes(first.value) &&
                parsed.nodes.length >= 2
            );
        },
        (_, { tokens, parsed }) => {
            let prefix = (parsed.nodes[0] as any).value;
            let valueNode = parsed.nodes[1];
            let _startIdx = 1;

            // 处理 inset-x, inset-y 分离节点的情况
            if (
                prefix === 'inset' &&
                valueNode.type === 'literal' &&
                (valueNode.value === 'x' || valueNode.value === 'y')
            ) {
                prefix = `inset-${valueNode.value}`;
                valueNode = parsed.nodes[2];
                _startIdx = 2;
            }

            if (!valueNode) return;

            let value: string | undefined = ValueResolver.resolveSpacing(valueNode, tokens);
            if (!value && valueNode.type === 'literal') {
                value = valueNode.value;
            } else if (valueNode.type === 'numeric' && !valueNode.unit) {
                value = `${valueNode.value * 4}px`;
            } else if (valueNode.type === 'arbitrary') {
                value = valueNode.value.replace(/_/g, ' ');
            }

            if (!value) return;

            // 如果是 literal 或 numeric 且在 spacing tokens 中，包裹 getVar
            const tokenKey =
                valueNode.type === 'literal'
                    ? valueNode.value
                    : valueNode.type === 'numeric'
                      ? valueNode.raw
                      : '';
            if (tokenKey && tokens.spacing[tokenKey]) {
                value = getVar(`spacing-${tokenKey}`, value!);
            }

            if (prefix === 'inset') return { top: value, right: value, bottom: value, left: value };
            if (prefix === 'inset-x') return { left: value, right: value };
            if (prefix === 'inset-y') return { top: value, bottom: value };
            return { [prefix]: value };
        },
    ],

    // Gap
    [
        (parsed) => {
            const first = parsed.nodes[0];
            return (
                first?.type === 'literal' &&
                (first.value === 'gap' || first.value === 'gap-x' || first.value === 'gap-y') &&
                parsed.nodes.length >= 2
            );
        },
        (_, { tokens, parsed }) => {
            let prefix = (parsed.nodes[0] as any).value;
            let valueNode = parsed.nodes[1];

            // 处理 gap-x, gap-y 分离节点的情况
            if (
                prefix === 'gap' &&
                valueNode.type === 'literal' &&
                (valueNode.value === 'x' || valueNode.value === 'y')
            ) {
                prefix = `gap-${valueNode.value}`;
                valueNode = parsed.nodes[2];
            }

            if (!valueNode) return;

            let value: string | undefined = ValueResolver.resolveSpacing(valueNode, tokens);
            if (!value && valueNode.type === 'literal') {
                value = valueNode.value;
            } else if (valueNode.type === 'numeric' && !valueNode.unit) {
                value = `${valueNode.value * 4}px`;
            } else if (valueNode.type === 'arbitrary') {
                value = valueNode.value.replace(/_/g, ' ');
            }

            // 如果是 literal 或 numeric 且在 spacing tokens 中，包裹 getVar
            const tokenKey =
                valueNode.type === 'literal'
                    ? valueNode.value
                    : valueNode.type === 'numeric'
                      ? valueNode.raw
                      : '';
            if (tokenKey && tokens.spacing[tokenKey]) {
                value = getVar(`spacing-${tokenKey}`, value!);
            }

            if (prefix === 'gap-x') return { 'column-gap': value };
            if (prefix === 'gap-y') return { 'row-gap': value };
            return { gap: value };
        },
    ],

    // Overflow
    [
        (parsed) => parsed.nodes[0]?.type === 'literal' && parsed.nodes[0].value === 'overflow',
        (_, { parsed }) => {
            const val = parsed.utility;
            const match = val.match(/^overflow-(?:([xy])-)?(hidden|auto|scroll|visible)$/);
            if (match) {
                const axis = match[1];
                const type = match[2];
                return axis ? { [`overflow-${axis}`]: type } : { overflow: type };
            }
        },
    ],

    // Z-Index
    [
        (parsed) =>
            parsed.nodes[0]?.type === 'literal' &&
            parsed.nodes[0].value === 'z' &&
            parsed.nodes.length === 2,
        (_, { parsed }) => {
            const node = parsed.nodes[1];
            if (node.type === 'numeric') return { 'z-index': node.value };
            if (node.type === 'arbitrary') return { 'z-index': node.value };
            if (node.type === 'literal' && node.value === 'auto') return { 'z-index': 'auto' };
        },
    ],

    // Pointer Events
    ['pointer-events-none', () => ({ 'pointer-events': 'none' })],
    ['pointer-events-auto', () => ({ 'pointer-events': 'auto' })],

    // Flex/Grid specific
    [
        (parsed) => {
            const first = parsed.nodes[0];
            if (!first || first.type !== 'literal') return false;

            // Case 1: w-10, h-10
            if (['w', 'h'].includes(first.value)) return parsed.nodes.length >= 2;

            // Case 2: min-w-10, max-h-10 -> ['min', 'w', '10']
            if (['min', 'max'].includes(first.value)) {
                const second = parsed.nodes[1];
                return (
                    second?.type === 'literal' &&
                    ['w', 'h'].includes(second.value) &&
                    parsed.nodes.length >= 3
                );
            }

            return false;
        },
        (_, { tokens, parsed }) => {
            let propPrefix = (parsed.nodes[0] as any).value;
            let valueNode = parsed.nodes[1];

            // Handle min/max split
            if (['min', 'max'].includes(propPrefix)) {
                const dim = (parsed.nodes[1] as any).value; // w or h
                propPrefix = `${propPrefix}-${dim}`;
                valueNode = parsed.nodes[2];
            }

            const propMap: Record<string, string> = {
                w: 'width',
                h: 'height',
                'min-w': 'min-width',
                'max-w': 'max-width',
                'min-h': 'min-height',
                'max-h': 'max-height',
            };
            const prop = propMap[propPrefix];

            let value =
                ValueResolver.resolveSize(valueNode, tokens, prop) ||
                (valueNode as any).value ||
                (valueNode as any).raw;

            const tokenKey =
                valueNode.type === 'literal'
                    ? valueNode.value
                    : valueNode.type === 'numeric'
                      ? valueNode.raw
                      : '';
            if (tokenKey) {
                if (prop === 'max-width' && tokens.maxWidth?.[tokenKey]) {
                    value = getVar(`maxWidth-${tokenKey}`, value);
                } else if (tokens.spacing[tokenKey]) {
                    value = getVar(`spacing-${tokenKey}`, value);
                }
            }

            return { [prop]: value };
        },
    ],

    // Grid Columns
    [
        (parsed) => {
            const n0 = parsed.nodes[0];
            const n1 = parsed.nodes[1];
            if (n0?.type !== 'literal') return false;
            if (n0.value === 'grid-cols' && parsed.nodes.length === 2) return true;
            if (
                n0.value === 'grid' &&
                n1?.type === 'literal' &&
                n1.value === 'cols' &&
                parsed.nodes.length === 3
            )
                return true;
            return false;
        },
        (_, { parsed }) => {
            const n0 = parsed.nodes[0];
            const node =
                n0.type === 'literal' && n0.value === 'grid-cols'
                    ? parsed.nodes[1]
                    : parsed.nodes[2];
            if (node.type === 'numeric') {
                return { 'grid-template-columns': `repeat(${node.value}, minmax(0, 1fr))` };
            } else if (node.type === 'arbitrary') {
                return { 'grid-template-columns': node.value.replace(/_/g, ' ') };
            }
        },
    ],

    // Grid Rows
    [
        (parsed) => {
            const n0 = parsed.nodes[0];
            const n1 = parsed.nodes[1];
            if (n0?.type !== 'literal') return false;
            if (n0.value === 'grid-rows' && parsed.nodes.length === 2) return true;
            if (
                n0.value === 'grid' &&
                n1?.type === 'literal' &&
                n1.value === 'rows' &&
                parsed.nodes.length === 3
            )
                return true;
            return false;
        },
        (_, { parsed }) => {
            const n0 = parsed.nodes[0];
            const node =
                n0.type === 'literal' && n0.value === 'grid-rows'
                    ? parsed.nodes[1]
                    : parsed.nodes[2];
            if (node.type === 'numeric') {
                return { 'grid-template-rows': `repeat(${node.value}, minmax(0, 1fr))` };
            } else if (node.type === 'arbitrary') {
                return { 'grid-template-rows': node.value.replace(/_/g, ' ') };
            }
        },
    ],
];
