import { type DesignTokens, tokensToCssVars } from '@sxo/design';
import { defaultRules, type Rule, type RuleContext } from './rules.ts';

export class StyleEngine {
    private rules: Rule[] = [...defaultRules];
    private cache: Map<string, string> = new Map();
    private generatedClasses: Set<string> = new Set();
    private variants: Record<string, { suffix?: string; parent?: string }> = {
        hover: { suffix: ':hover' },
        focus: { suffix: ':focus' },
        active: { suffix: ':active' },
        disabled: { suffix: ':disabled' },
        'focus-visible': { suffix: ':focus-visible' },
        placeholder: { suffix: '::placeholder' },
        'group-hover': { parent: '.group:hover' },
        dark: { parent: '[data-sxo-mode="dark"]' },
    };

    private tokens: DesignTokens;

    constructor(tokens: DesignTokens) {
        this.tokens = tokens;
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

        let rawClassName = className;
        let variantSuffix = '';
        let variantParent = '';
        let mediaQuery = '';

        // 1. 处理响应式变体 (e.g. md:text-lg)
        const breakpoints = this.tokens.breakpoints;
        for (const [bp, minWidth] of Object.entries(breakpoints)) {
            if (rawClassName.startsWith(`${bp}:`)) {
                mediaQuery = `@media (min-width: ${minWidth})`;
                rawClassName = rawClassName.slice(bp.length + 1);
                break;
            }
        }

        // 2. 处理状态变体 (e.g. hover:bg-primary, group-hover:bg-primary, dark:bg-primary)
        for (const [vName, config] of Object.entries(this.variants)) {
            if (rawClassName.startsWith(`${vName}:`)) {
                if (config.suffix) variantSuffix = config.suffix;
                if (config.parent) variantParent = config.parent;
                rawClassName = rawClassName.slice(vName.length + 1);
                break;
            }
        }

        const context: RuleContext = { tokens: this.tokens };

        for (const [match, handler] of this.rules) {
            const isMatch =
                typeof match === 'string' ? match === rawClassName : rawClassName.match(match);

            if (isMatch) {
                const m =
                    typeof match === 'string'
                        ? [rawClassName]
                        : (rawClassName.match(match) as string[]);
                const result = handler(m, context);
                if (result) {
                    const css = this.formatCss(
                        className,
                        result,
                        variantSuffix,
                        variantParent,
                        mediaQuery,
                    );
                    this.cache.set(className, css);
                    return css;
                }
            }
        }

        return '';
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
                css += result + '\n';
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
            css = `${mediaQuery} {\n${css
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
