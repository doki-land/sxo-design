import type { DesignTokens } from '@sxo/design';
import type { ParsedClass, SxoNode } from '../parser';

export type RuleContext = {
    tokens: DesignTokens;
    parsed: ParsedClass;
};

export type RuleResult = string | Record<string, any> | undefined;

export type RuleMatcher = RegExp | string | ((parsed: ParsedClass) => boolean);

export type RuleHandler = (match: string[], context: RuleContext) => RuleResult;

export type Rule = [RuleMatcher, RuleHandler];

export interface ValueResolver {
    resolve(node: SxoNode, tokens: DesignTokens, options?: any): string | undefined;
}
