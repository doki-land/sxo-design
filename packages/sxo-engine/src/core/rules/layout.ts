import { ValueResolver } from '../resolver';
import type { Rule } from '../types';
import { getVar } from '../utils';

export const layoutRules: Rule[] = [
    // Display
    ['flex', () => ({ display: 'flex' })],
    ['inline-flex', () => ({ display: 'inline-flex' })],
    ['grid', () => ({ display: 'grid' })],
    ['inline-grid', () => ({ display: 'inline-grid' })],
    ['block', () => ({ display: 'block' })],
    ['inline-block', () => ({ display: 'inline-block' })],
    ['inline', () => ({ display: 'inline' })],
    ['hidden', () => ({ display: 'none' })],
    [
        'sr-only',
        () => ({
            position: 'absolute',
            width: '1px',
            height: '1px',
            padding: '0',
            margin: '-1px',
            overflow: 'hidden',
            clip: 'rect(0, 0, 0, 0)',
            'white-space': 'nowrap',
            'border-width': '0',
        }),
    ],
    ['appearance-none', () => ({ appearance: 'none' })],

    // Container
    [
        'container',
        (_, { tokens }) => {
            const styles: any = {
                width: '100%',
                'margin-left': 'auto',
                'margin-right': 'auto',
            };
            if (tokens.breakpoints) {
                // Generate responsive max-widths for container
                // Note: The engine's variant system will handle the media queries
                // if we were generating sm:container, but the base 'container' class
                // in Tailwind intrinsically changes max-width.
                // In SXO, we can return a nested object with media queries.
                Object.entries(tokens.breakpoints).forEach(([name, width]) => {
                    styles[`@media (min-width: ${width})`] = {
                        'max-width': width,
                    };
                });
            }
            return styles;
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

            // 处理 inset-x, inset-y 分离节点的情况
            if (
                prefix === 'inset' &&
                valueNode.type === 'literal' &&
                (valueNode.value === 'x' || valueNode.value === 'y')
            ) {
                prefix = `inset-${valueNode.value}`;
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

    // Width & Height
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

            let value = '';
            if (valueNode.type === 'numeric' && !valueNode.unit) {
                value = `${valueNode.value * 4}px`;
            } else if (valueNode.type === 'fraction') {
                value = `${(valueNode.numerator / valueNode.denominator) * 100}%`;
            } else if (valueNode.type === 'literal' && valueNode.value === 'full') {
                value = '100%';
            } else if (valueNode.type === 'literal' && valueNode.value === 'screen') {
                value = prop === 'width' ? '100vw' : '100vh';
            } else {
                value =
                    ValueResolver.resolveSize(valueNode, tokens, prop) ||
                    (valueNode as any).value ||
                    (valueNode as any).raw;
            }

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

    // Flex Grow / Shrink / Basis
    ['grow', () => ({ 'flex-grow': '1' })],
    ['shrink', () => ({ 'flex-shrink': '1' })],
    [
        (parsed) => {
            const first = parsed.nodes[0];
            const second = parsed.nodes[1];
            // Match: flex-*, grow-*, shrink-* OR flex-grow-*, flex-shrink-*
            return (
                first?.type === 'literal' &&
                (['flex', 'grow', 'shrink'].includes(first.value) ||
                    (first.value === 'flex' &&
                        second?.type === 'literal' &&
                        ['grow', 'shrink'].includes(second.value))) &&
                parsed.nodes.length >= 2
            );
        },
        (_, { parsed }) => {
            let first = (parsed.nodes[0] as any).value;
            let node = parsed.nodes[1];
            let value = '';

            // Handle flex-grow-* and flex-shrink-*
            if (
                first === 'flex' &&
                node.type === 'literal' &&
                (node.value === 'grow' || node.value === 'shrink')
            ) {
                first = node.value;
                node = parsed.nodes[2];
                if (!node) value = '1'; // flex-grow -> flex-grow: 1
            }

            if (node) {
                if (node.type === 'literal') value = node.value;
                else if (node.type === 'numeric') value = node.raw;
                else if (node.type === 'arbitrary') value = node.value;
            }

            if (first === 'grow') return { 'flex-grow': value || '1' };
            if (first === 'shrink') return { 'flex-shrink': value || '1' };
            if (first === 'flex') {
                if (value === '1') return { flex: '1 1 0%' };
                if (value === 'auto') return { flex: '1 1 auto' };
                if (value === 'initial') return { flex: '0 1 auto' };
                if (value === 'none') return { flex: 'none' };
                return { flex: value };
            }
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
        (parsed) => {
            const n0 = parsed.nodes[0];
            const n1 = parsed.nodes[1];
            if (n0?.type !== 'literal') return false;

            // Match grid-cols-2 or grid-rows-2
            if ((n0.value === 'grid-cols' || n0.value === 'grid-rows') && parsed.nodes.length === 2)
                return true;

            // Match grid cols 2 or grid rows 2
            if (
                n0.value === 'grid' &&
                n1?.type === 'literal' &&
                (n1.value === 'cols' || n1.value === 'rows') &&
                parsed.nodes.length === 3
            )
                return true;

            return false;
        },
        (_, { parsed }) => {
            const n0 = parsed.nodes[0] as { type: 'literal'; value: string };
            const isCols =
                n0.value === 'grid-cols' ||
                (n0.value === 'grid' && (parsed.nodes[1] as any).value === 'cols');
            const valueNode =
                n0.value === 'grid-cols' || n0.value === 'grid-rows'
                    ? parsed.nodes[1]
                    : parsed.nodes[2];

            const prop = isCols ? 'grid-template-columns' : 'grid-template-rows';

            if (valueNode.type === 'numeric')
                return { [prop]: `repeat(${valueNode.value}, minmax(0, 1fr))` };
            if (valueNode.type === 'arbitrary')
                return { [prop]: valueNode.value.replace(/_/g, ' ') };
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

    // Overflow
    [
        (parsed) => {
            const n0 = parsed.nodes[0];
            return n0?.type === 'literal' && n0.value === 'overflow';
        },
        (_, { parsed }) => {
            const n0 = parsed.nodes[0] as { type: 'literal'; value: string };
            const n1 = parsed.nodes[1];
            const n2 = parsed.nodes[2];

            let axis: string | undefined;
            let type: string | undefined;

            if (n1?.type === 'literal' && ['x', 'y'].includes(n1.value)) {
                axis = n1.value;
                type = n2?.type === 'literal' ? n2.value : undefined;
            } else {
                type = n1?.type === 'literal' ? n1.value : undefined;
            }

            if (!type || !['hidden', 'auto', 'scroll', 'visible'].includes(type)) return;

            return axis ? { [`overflow-${axis}`]: type } : { overflow: type };
        },
    ],

    // Pointer Events
    ['pointer-events-none', () => ({ 'pointer-events': 'none' })],
    ['pointer-events-auto', () => ({ 'pointer-events': 'auto' })],

    // User Select
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

    // Cursor
    [
        (parsed) =>
            parsed.nodes[0]?.type === 'literal' &&
            parsed.nodes[0].value === 'cursor' &&
            parsed.nodes.length === 2,
        (_, { parsed }) => {
            const val = (parsed.nodes[1] as any).value;
            return { cursor: val };
        },
    ],
];
