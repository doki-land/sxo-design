import { DesignTokens, tokensToCssVars } from '@sxo/design';
import { defaultRules, Rule, RuleContext } from './rules';

export class StyleEngine {
  private rules: Rule[] = [...defaultRules];
  private cache: Map<string, string> = new Map();
  private generatedClasses: Set<string> = new Set();
  private variants = {
    hover: ':hover',
    focus: ':focus',
    active: ':active',
    disabled: ':disabled',
  };

  constructor(private tokens: DesignTokens) {}

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

    // 2. 处理状态变体 (e.g. hover:bg-primary)
    for (const [vName, vSelector] of Object.entries(this.variants)) {
      if (rawClassName.startsWith(`${vName}:`)) {
        variantSuffix = vSelector;
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
          typeof match === 'string' ? [rawClassName] : (rawClassName.match(match) as string[]);
        const result = handler(m, context);
        if (result) {
          const css = this.formatCss(className, result, variantSuffix, mediaQuery);
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
  generateSheet(classNames: string[] | Set<string>): string {
    let css = '';
    const sortedClasses = Array.from(classNames).sort((a, b) => {
      // 简单排序：普通类 -> 状态变体 -> 响应式变体
      const aIsVariant = a.includes(':');
      const bIsVariant = b.includes(':');
      if (aIsVariant !== bIsVariant) return aIsVariant ? 1 : -1;
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
    const vars = tokensToCssVars(this.tokens);
    const body = Object.entries(vars)
      .map(([name, value]) => `  ${name}: ${value};`)
      .join('\n');
    return `:root {\n${body}\n}`;
  }

  reset() {
    this.cache.clear();
    this.generatedClasses.clear();
  }

  private formatCss(
    className: string,
    result: string | Record<string, string>,
    variant = '',
    mediaQuery = '',
  ): string {
    const selector = `.${this.escapeClassName(className)}${variant}`;
    const body =
      typeof result === 'string'
        ? result
        : Object.entries(result)
            .map(([p, v]) => `${p}: ${v};`)
            .join(' ');

    let css = `${selector} { ${body} }`;
    if (mediaQuery) {
      css = `${mediaQuery} {\n  ${css}\n}`;
    }
    return css;
  }

  private escapeClassName(className: string): string {
    return className.replace(/[!#$%&'()*+,./:;<=>?@[\]^`{|}~]/g, '\\$&');
  }
}
