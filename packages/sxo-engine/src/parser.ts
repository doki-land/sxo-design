export type SxoNode =
    | { type: 'literal'; value: string }
    | { type: 'arbitrary'; value: string; nodes: SxoNode[] }
    | { type: 'fraction'; numerator: number; denominator: number; value: string }
    | { type: 'numeric'; value: number; unit?: string; raw: string }
    | { type: 'expression'; name: string; arguments: SxoNode[] }
    | { type: 'list'; items: SxoNode[]; separator: ',' | ' ' };

/**
 * 将字符串解析为高度语义化的 AST 节点
 */
function parseToNode(val: string, isArbitrary: boolean = false): SxoNode {
    if (isArbitrary) {
        // 尝试递归解析任意值内容 (处理类似 [minmax(0,1fr)] 或 [1px_solid_red])
        return {
            type: 'arbitrary',
            value: val,
            nodes: parseArbitraryContent(val),
        };
    }

    // 尝试解析分数 (如 1/2)
    const fractionMatch = val.match(/^(\d+)\/(\d+)$/);
    if (fractionMatch) {
        return {
            type: 'fraction',
            numerator: parseInt(fractionMatch[1], 10),
            denominator: parseInt(fractionMatch[2], 10),
            value: val,
        };
    }

    // 尝试解析数值 (如 100, 20px, 1.5rem)
    const numericMatch = val.match(/^([+-]?\d*\.?\d+)([a-zA-Z%]*)$/);
    if (numericMatch) {
        return {
            type: 'numeric',
            value: parseFloat(numericMatch[1]),
            unit: numericMatch[2] || undefined,
            raw: val,
        };
    }

    return { type: 'literal', value: val };
}

/**
 * 递归解析任意值内部的语义结构
 * 支持下划线转空格、函数调用 (expression)、逗号列表等
 */
function parseArbitraryContent(content: string): SxoNode[] {
    const nodes: SxoNode[] = [];
    let current = 0;

    while (current < content.length) {
        let char = content[current];

        // 1. 处理空格/下划线/逗号分隔的列表
        if (char === '_' || char === ' ' || char === ',') {
            current++;
            continue;
        }

        // 2. 尝试解析函数调用 (Expression) e.g. minmax(0, 1fr)
        const funcMatch = content.slice(current).match(/^([a-zA-Z0-9-]+)\(/);
        if (funcMatch) {
            const name = funcMatch[1];
            current += name.length + 1; // skip name and '('

            let bracketDepth = 1;
            const start = current;
            while (current < content.length && bracketDepth > 0) {
                if (content[current] === '(') bracketDepth++;
                else if (content[current] === ')') bracketDepth--;
                current++;
            }

            const argContent = content.substring(start, current - 1);
            nodes.push({
                type: 'expression',
                name,
                arguments: parseArgumentList(argContent),
            });
            continue;
        }

        // 3. 提取基本 Token (literal/numeric/etc)
        const start = current;
        let bracketDepth = 0;
        while (current < content.length) {
            char = content[current];
            if (char === '(') bracketDepth++;
            else if (char === ')') bracketDepth--;

            if (bracketDepth === 0 && (char === '_' || char === ' ' || char === ',')) {
                break;
            }
            current++;
        }

        const token = content.substring(start, current);
        if (token) {
            nodes.push(parseToNode(token));
        }

        // 处理逗号分隔符 (列表语义)
        if (content[current] === ',') {
            // 这里简单处理，如果后续有更多 token，可以考虑封装成 list 节点
            // 目前先保持扁平化 nodes，但在规则层可以通过 type 判断
            current++;
        }
    }

    return nodes;
}

/**
 * 解析函数参数列表 (逗号分隔)
 */
function parseArgumentList(content: string): SxoNode[] {
    const args: SxoNode[] = [];
    let current = 0;
    let start = 0;
    let bracketDepth = 0;

    while (current <= content.length) {
        const char = content[current];
        if (char === '(') bracketDepth++;
        else if (char === ')') bracketDepth--;

        if (current === content.length || (char === ',' && bracketDepth === 0)) {
            const part = content.substring(start, current).trim();
            if (part) {
                // 递归解析每个参数，可能是表达式或基础值
                const subNodes = parseArbitraryContent(part);
                if (subNodes.length === 1) {
                    args.push(subNodes[0]);
                } else if (subNodes.length > 1) {
                    args.push({ type: 'list', items: subNodes, separator: ' ' });
                }
            }
            start = current + 1;
        }
        current++;
    }
    return args;
}

export interface ParsedClass {
    variants: string[];
    nodes: SxoNode[];
    utility: string;
    raw: string;
    opacity?: string;
    negative?: boolean;
    // For backward compatibility and easy matching
    parts: string[];
}

/**
 * SXO Parser
 *
 * Responsible for breaking down a class name into its constituent parts:
 * - Variants (e.g., hover:, md:, dark:)
 * - Utility (e.g., bg-primary, text-[20px])
 *
 * It handles nested brackets in arbitrary values and chainable variants.
 */
export class SxoParser {
    /**
     * Parse a class name into structured data.
     */
    parse(className: string): ParsedClass {
        const variants: string[] = [];
        let currentPos = 0;
        let lastSplitPos = 0;
        let bracketDepth = 0;

        // 1. Extract variants
        while (currentPos < className.length) {
            const char = className[currentPos];

            if (char === '[') {
                bracketDepth++;
            } else if (char === ']') {
                bracketDepth--;
            } else if (char === ':' && bracketDepth === 0) {
                const variant = className.substring(lastSplitPos, currentPos);
                variants.push(variant);
                lastSplitPos = currentPos + 1;
            }

            currentPos++;
        }

        let utility = className.substring(lastSplitPos);
        let negative = false;
        if (utility.startsWith('-')) {
            negative = true;
            utility = utility.substring(1);
        }
        let opacity: string | undefined;

        // 2. Extract opacity if present (e.g., bg-red-500/20 or text-primary/[0.5])
        // We need to be careful not to mistake fractions like w-1/2 for opacity
        let slashPos = -1;
        let bDepth = 0;
        for (let i = 0; i < utility.length; i++) {
            if (utility[i] === '[') bDepth++;
            else if (utility[i] === ']') bDepth--;
            else if (utility[i] === '/' && bDepth === 0) {
                slashPos = i;
            }
        }

        let utilityWithoutOpacity = utility;

        if (slashPos !== -1) {
            const beforeSlash = utility.substring(0, slashPos);
            const afterSlash = utility.substring(slashPos + 1);

            // Check if it's a fraction: numeric before and after slash
            // e.g., w-1/2, right-1/4
            // We should avoid mistaking color opacities like bg-neutral-50/50 for fractions.
            // Colors usually have more complex names or multiple dashes (e.g. bg-neutral-50).
            // Fractions typically look like utility-number/number (e.g. w-1/2, lg:w-1/2).
            const isFraction =
                /^[a-z0-9-]+-\d+$/.test(beforeSlash) &&
                /^\d+$/.test(afterSlash) &&
                !beforeSlash.startsWith('bg-') &&
                !beforeSlash.startsWith('text-') &&
                !beforeSlash.startsWith('border-') &&
                !beforeSlash.startsWith('fill-') &&
                !beforeSlash.startsWith('stroke-') &&
                !beforeSlash.startsWith('shadow-');

            if (!isFraction) {
                const opacityPart = utility.substring(slashPos + 1);
                if (opacityPart.startsWith('[') && opacityPart.endsWith(']')) {
                    opacity = opacityPart.substring(1, opacityPart.length - 1);
                } else {
                    opacity = opacityPart;
                }
                utilityWithoutOpacity = utility.substring(0, slashPos);
            }
        }

        // 3. Break utility (without opacity) into nodes and parts
        const nodes: SxoNode[] = [];
        const parts: string[] = [];
        currentPos = 0;
        lastSplitPos = 0;
        bracketDepth = 0;

        while (currentPos < utilityWithoutOpacity.length) {
            const char = utilityWithoutOpacity[currentPos];

            if (char === '[') {
                if (bracketDepth === 0 && currentPos > lastSplitPos) {
                    const literalVal = utilityWithoutOpacity.slice(lastSplitPos, currentPos);
                    if (literalVal) {
                        nodes.push(parseToNode(literalVal, false));
                        parts.push(literalVal);
                    }
                    lastSplitPos = currentPos;
                }
                bracketDepth++;
            } else if (char === ']') {
                bracketDepth--;
                if (bracketDepth === 0) {
                    const val = utilityWithoutOpacity.slice(lastSplitPos + 1, currentPos);
                    nodes.push(parseToNode(val, true));
                    parts.push(`[${val}]`);
                    lastSplitPos = currentPos + 1;
                    // Skip next '-' if it exists
                    if (utilityWithoutOpacity[lastSplitPos] === '-') {
                        lastSplitPos++;
                    }
                }
            } else if (char === '-' && bracketDepth === 0) {
                const val = utilityWithoutOpacity.slice(lastSplitPos, currentPos);
                if (val) {
                    nodes.push(parseToNode(val, false));
                    parts.push(val);
                }
                lastSplitPos = currentPos + 1;
            }
            currentPos++;
        }

        if (lastSplitPos < utilityWithoutOpacity.length) {
            const val = utilityWithoutOpacity.slice(lastSplitPos);
            nodes.push(parseToNode(val, false));
            parts.push(val);
        }

        return {
            variants,
            nodes,
            utility,
            raw: className,
            parts,
            opacity,
            negative,
        };
    }
}
