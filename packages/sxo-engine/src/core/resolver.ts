import type { DesignTokens } from '@sxo/design';
import type { SxoNode } from '../parser';

export class ValueResolver {
    static resolveSpacing(node: SxoNode, tokens: DesignTokens): string | undefined {
        if (node.type === 'literal') {
            return tokens.spacing[node.value];
        }
        if (node.type === 'numeric') {
            // 优先匹配 spacing tokens 中的数值键 (如 '4' -> '16px')
            if (tokens.spacing[node.raw]) {
                return tokens.spacing[node.raw];
            }
            return node.raw;
        }
        if (node.type === 'fraction') {
            const val = (node.numerator / node.denominator) * 100;
            return `${Number.isInteger(val) ? val : val.toFixed(6).replace(/\.?0+$/, '')}%`;
        }
        if (node.type === 'arbitrary') {
            return node.value;
        }
        return undefined;
    }

    static resolveSize(node: SxoNode, tokens: DesignTokens, property: string): string | undefined {
        // 优先检查 max-width 专用 tokens
        if (property === 'max-width' && tokens.maxWidth) {
            if (node.type === 'literal' && tokens.maxWidth[node.value]) {
                return tokens.maxWidth[node.value];
            }
            if (node.type === 'numeric' && node.raw && tokens.maxWidth[node.raw]) {
                return tokens.maxWidth[node.raw];
            }
        }

        const val = ValueResolver.resolveSpacing(node, tokens);
        if (val) return val;

        if (node.type === 'literal') {
            const v = node.value;
            if (v === 'full') return '100%';
            if (v === 'screen') return property.includes('width') ? '100vw' : '100vh';
            if (v === 'min') return 'min-content';
            if (v === 'max') return 'max-content';
            if (v === 'fit') return 'fit-content';
            if (v === 'auto') return 'auto';
        }
        return undefined;
    }

    static resolveNumeric(node: SxoNode, tokens: any, tokenGroup?: string): string | undefined {
        if (node.type === 'literal' && tokenGroup && tokens[tokenGroup]) {
            return tokens[tokenGroup][node.value];
        }
        if (node.type === 'numeric') {
            return node.raw;
        }
        if (node.type === 'arbitrary') {
            return node.value;
        }
        return undefined;
    }
}
