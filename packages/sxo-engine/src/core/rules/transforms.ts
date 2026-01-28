import type { Rule } from '../types';

export const transformRules: Rule[] = [
    // Translate
    [
        (parsed) =>
            parsed.nodes[0]?.type === 'literal' &&
            parsed.nodes[0].value === 'translate' &&
            parsed.nodes.length >= 2,
        (_, { tokens, parsed }) => {
            const node1 = parsed.nodes[1];
            let axis = '';
            let valueNode = node1;

            if (node1.type === 'literal' && ['x', 'y'].includes(node1.value)) {
                axis = node1.value.toUpperCase();
                valueNode = parsed.nodes[2];
            }

            if (!valueNode) return;

            let val = '';
            if (valueNode.type === 'numeric') {
                // 如果在 spacing tokens 中找到，则使用 token 值 (可能经过 *4)
                const tokenVal = tokens.spacing[valueNode.value];
                if (tokenVal) {
                    val = tokenVal;
                } else {
                    val = `${valueNode.value}px`;
                }
            } else if (valueNode.type === 'fraction') {
                val = `${(valueNode.numerator / valueNode.denominator) * 100}%`;
            } else if (valueNode.type === 'arbitrary') {
                val = valueNode.value;
            }

            if (val) {
                // 手动处理负值，因为 StyleEngine 的通用逻辑不处理 transform: translate(...)
                const finalVal = parsed.negative
                    ? val.startsWith('-')
                        ? val.substring(1)
                        : val.startsWith('var(')
                        ? `calc(${val} * -1)`
                        : `-${val}`
                    : val;
                return { transform: `translate${axis}(${finalVal})` };
            }
        },
    ],
    // Scale
    [
        (parsed) =>
            parsed.nodes[0]?.type === 'literal' &&
            parsed.nodes[0].value === 'scale' &&
            parsed.nodes.length >= 2,
        (_, { parsed }) => {
            const node1 = parsed.nodes[1];
            let axis = '';
            let valueNode = node1;

            if (node1.type === 'literal' && ['x', 'y'].includes(node1.value)) {
                axis = node1.value.toUpperCase();
                valueNode = parsed.nodes[2];
            }

            if (!valueNode) return;

            let val = '';
            if (valueNode.type === 'numeric') val = (valueNode.value / 100).toString();
            else if (valueNode.type === 'arbitrary') val = valueNode.value;

            if (val) {
                return { transform: `scale${axis}(${val})` };
            }
        },
    ],

    // Rotate
    [
        (parsed) =>
            parsed.nodes[0]?.type === 'literal' &&
            parsed.nodes[0].value === 'rotate' &&
            parsed.nodes.length === 2,
        (_, { parsed }) => {
            const node = parsed.nodes[1];
            let val = '';
            if (node.type === 'numeric') val = `${node.value}deg`;
            else if (node.type === 'arbitrary') val = node.value;
            if (val) return { transform: `rotate(${val})` };
        },
    ],
];
