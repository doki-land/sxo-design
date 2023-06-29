import { type DesignTokens, tokensToCssVars } from '@sxo/design';
import { allRules } from './core/rules';
import type { Rule, RuleContext } from './core/types';
import { SxoParser } from './parser';

export interface EngineOptions {
    debug?: boolean;
}

export class StyleEngine {
    private rules: Rule[] = [...allRules];
    private cache: Map<string, string> = new Map();
    private generatedClasses: Set<string> = new Set();
    private parser = new SxoParser();
    private options: EngineOptions;
    private missedClasses: Set<string> = new Set();

    private variants: Record<string, { suffix?: string; parent?: string }> = {
        hover: { suffix: ':hover' },
        focus: { suffix: ':focus' },
        active: { suffix: ':active' },
        disabled: { suffix: ':disabled' },
        'focus-within': { suffix: ':focus-within' },
        'focus-visible': { suffix: ':focus-visible' },
        placeholder: { suffix: '::placeholder' },
        selection: { suffix: '::selection' },
        'group-hover': { parent: '.group:hover' },
        'group-focus': { parent: '.group:focus' },
        'group-active': { parent: '.group:active' },
        dark: { parent: '[data-sxo-mode="dark"]' },
        light: { parent: '[data-sxo-mode="light"]' },
    };

    private tokens: DesignTokens;

    constructor(tokens: DesignTokens, options: EngineOptions = {}) {
        this.tokens = tokens;
        this.options = options;
    }

    /**
     * Add custom rules to the engine
     */
    addRules(rules: Rule[]) {
        this.rules.unshift(...rules);
    }

    /**
     * Generate CSS for a single class name, supporting variants
     */
    generate(className: string): string {
        if (this.cache.has(className)) {
            return this.cache.get(className)!;
        }

        // 1. Transform: Parse class name into structured AST
        const parsed = this.parser.parse(className);

        // 2. Resolve: Match rules to get raw CSS properties
        const styles = this.resolveStyles(parsed);
        if (!styles) {
            if (this.options.debug) {
                this.missedClasses.add(className);
            }
            return '';
        }

        // 2.5 Handle negative values
        if (parsed.negative && typeof styles === 'object') {
            for (const key in styles) {
                const val = styles[key];
                if (typeof val === 'string') {
                    if (/^-?\d/.test(val)) {
                        styles[key] = val.startsWith('-') ? val.substring(1) : `-${val}`;
                    } else if (val.startsWith('var(')) {
                        styles[key] = `calc(${val} * -1)`;
                    }
                }
            }
        }

        // 3. Variant: Process variants (responsive, states)
        const variantInfo = this.resolveVariants(parsed);

        // 4. CodeGen: Format final CSS string
        const css = this.formatCss(
            className,
            styles,
            variantInfo.suffix,
            variantInfo.parent,
            variantInfo.mediaQuery,
        );

        this.cache.set(className, css);
        this.generatedClasses.add(className);
        return css;
    }

    private resolveStyles(parsed: any): string | Record<string, any> | undefined {
        const context: RuleContext = { tokens: this.tokens, parsed };
        const rawUtility = parsed.utility;

        for (const [match, handler] of this.rules) {
            let isMatch = false;
            let matchResult: string[] = [];

            if (typeof match === 'string') {
                isMatch = match === rawUtility;
                matchResult = [rawUtility];
            } else if (match instanceof RegExp) {
                const m = rawUtility.match(match);
                if (m) {
                    isMatch = true;
                    matchResult = Array.from(m);
                }
            } else if (typeof match === 'function') {
                isMatch = match(parsed);
                matchResult = [rawUtility];
            }

            if (isMatch) {
                const result = handler(matchResult, context);
                if (result) return result;
            }
        }
        return undefined;
    }

    private resolveVariants(parsed: any) {
        let suffix = '';
        let parent = '';
        const mediaQueries: string[] = [];

        for (const variant of parsed.variants) {
            const breakpoint = this.tokens.breakpoints?.[variant];
            if (breakpoint) {
                const bpStr = String(breakpoint);
                if (bpStr.startsWith('@media')) {
                    mediaQueries.push(bpStr.replace(/^@media\s+/, ''));
                } else {
                    mediaQueries.push(`(min-width: ${bpStr})`);
                }
                continue;
            }

            const config = this.variants[variant];
            if (config) {
                if (config.suffix) suffix += config.suffix;
                if (config.parent) {
                    parent = parent ? `${config.parent} ${parent}` : config.parent;
                }
                continue;
            }

            if (this.options.debug) {
                console.warn(`[SXO] Unknown variant: ${variant} in class ${parsed.raw}`);
            }
        }

        return {
            suffix,
            parent,
            mediaQuery: mediaQueries.join(' and '),
        };
    }

    /**
     * 获取未生成的类名列表 (Debug 模式)
     */
    getMissedClasses(): string[] {
        return Array.from(this.missedClasses);
    }

    /**
     * Generate CSS for a set of class names
     */
    generateBatch(classNames: string[] | Set<string>): string {
        return this.generateSheet(classNames);
    }

    /**
     * Generate CSS for a set of class names
     */
    generateSheet(classNames: string[] | Set<string>): string {
        let css = '';
        const breakpoints = this.tokens.breakpoints;
        const bpNames = Object.keys(breakpoints);

        const sortedClasses = Array.from(classNames).sort((a, b) => {
            const aBp = bpNames.find((bp) => a.startsWith(`${bp}:`));
            const bBp = bpNames.find((bp) => b.startsWith(`${bp}:`));

            // 1. Both are responsive
            if (aBp && bBp) {
                const aIdx = bpNames.indexOf(aBp);
                const bIdx = bpNames.indexOf(bBp);
                if (aIdx !== bIdx) return aIdx - bIdx;
            }

            // 2. One is responsive, one is not
            if (aBp && !bBp) return 1;
            if (!aBp && bBp) return -1;

            // 3. Neither is responsive, check for status variants
            const aIsVariant = a.includes(':');
            const bIsVariant = b.includes(':');
            if (aIsVariant !== bIsVariant) return aIsVariant ? 1 : -1;

            // 4. Fallback to alphabetical
            return a.localeCompare(b);
        });

        for (const className of sortedClasses) {
            const result = this.generate(className);
            if (result) {
                css += `${result}\n`;
            }
        }
        return css;
    }

    /**
     * 生成所有设计令牌对应的 CSS 变量
     */
    generateTokenCssVars(): string {
        const { modes, ...baseTokens } = this.tokens;
        const vars = tokensToCssVars(baseTokens);
        const body = Object.entries(vars)
            .map(([name, value]) => `  ${name}: ${value};`)
            .join('\n');

        let darkVars = '';
        if (modes?.dark) {
            const darkVarsObj = tokensToCssVars({ color: modes.dark });
            darkVars = Object.entries(darkVarsObj)
                .map(([name, value]) => `  ${name}: ${value};`)
                .join('\n');
        }

        const animations = `
@keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
@keyframes slide-in-top { from { transform: translateY(-10px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
@keyframes slide-in-bottom { from { transform: translateY(10px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
@keyframes scale-in { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: .5; } }
@keyframes bounce { 0%, 100% { transform: translateY(-25%); animation-timing-function: cubic-bezier(0.8,0,1,1); } 50% { transform: none; animation-timing-function: cubic-bezier(0,0,0.2,1); } }
@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
@keyframes ping { 75%, 100% { transform: scale(2); opacity: 0; } }
@keyframes shake { 10%, 90% { transform: translate3d(-1px, 0, 0); } 20%, 80% { transform: translate3d(2px, 0, 0); } 30%, 50%, 70% { transform: translate3d(-4px, 0, 0); } 40%, 60% { transform: translate3d(4px, 0, 0); } }
@keyframes zoom-in { from { transform: scale(0); opacity: 0; } to { transform: scale(1); opacity: 1; } }
@keyframes zoom-out { from { transform: scale(1); opacity: 1; } to { transform: scale(0); opacity: 0; } }
    `;

        const modeStyles = darkVars ? `\n\n[data-sxo-mode="dark"] {\n${darkVars}\n}` : '';
        return `:root {\n${body}\n}${modeStyles}\n${animations}`;
    }

    reset() {
        this.cache.clear();
        this.generatedClasses.clear();
    }

    private formatCss(
        className: string,
        result: string | Record<string, any>,
        variantSuffix = '',
        parentPrefix = '',
        mediaQuery = '',
    ): string {
        const baseSelector = `.${this.escapeClassName(className)}${variantSuffix}`;
        const selector = parentPrefix ? `${parentPrefix} ${baseSelector}` : baseSelector;

        const processResult = (sel: string, res: string | Record<string, any>): string => {
            if (typeof res === 'string') return `${sel} { ${res} }`;

            let css = '';
            const rules: string[] = [];
            const nested: string[] = [];

            for (const [p, v] of Object.entries(res)) {
                if (typeof v === 'object') {
                    const nestedSelector = p.replace(/&/g, sel);
                    nested.push(processResult(nestedSelector, v));
                } else {
                    rules.push(`${p}: ${v};`);
                }
            }

            if (rules.length > 0) {
                css += `${sel} { ${rules.join(' ')} }`;
            }

            if (nested.length > 0) {
                css += (css ? '\n' : '') + nested.join('\n');
            }

            return css;
        };

        let css = processResult(selector, result);

        if (mediaQuery) {
            const mq = mediaQuery.startsWith('@media') ? mediaQuery : `@media ${mediaQuery}`;
            css = `${mq} {\n${css
                .split('\n')
                .map((line) => `  ${line}`)
                .join('\n')}\n}`;
        }
        return css;
    }

    private escapeClassName(className: string): string {
        return className.replace(/[!#$%&'()*+,./:;<=>?@[\]^`{|}~]/g, '\\$&');
    }
}
