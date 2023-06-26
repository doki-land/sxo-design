import { DesignTokens } from '@sxo/design';

export type RuleContext = {
  tokens: DesignTokens;
};

export type Rule = [
  RegExp | string,
  (match: string[], context: RuleContext) => string | Record<string, string> | undefined,
];

const getVar = (path: string, fallback: string) =>
  `var(--sxo-${path.replace(/\./g, '-')}, ${fallback})`;

/**
 * 颜色解析辅助函数，支持嵌套路径
 */
function resolveColor(
  path: string,
  tokens: DesignTokens,
): { color: string; varPath: string } | undefined {
  const parts = path.split('-');
  let current: any = tokens.color;
  const varParts = ['color'];

  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = current[part];
      varParts.push(part);
    } else {
      // 尝试匹配 DEFAULT
      if (current && typeof current === 'object' && 'DEFAULT' in current) {
        current = current['DEFAULT'];
        varParts.push('DEFAULT');
      } else {
        return undefined;
      }
    }
  }

  const finalColor = typeof current === 'string' ? current : current?.DEFAULT;
  if (finalColor) {
    return { color: finalColor, varPath: varParts.join('-') };
  }
  return undefined;
}

export const defaultRules: Rule[] = [
  // 1. Spacing (Margin & Padding)
  [
    /^(m|p)([trblxy])?-(.+)$/,
    ([_, type, side, val], { tokens }) => {
      const prop = type === 'm' ? 'margin' : 'padding';
      const spacing = tokens.spacing[val];
      const value = spacing
        ? getVar(`spacing-${val}`, spacing)
        : val.match(/^\d+$/)
          ? `${parseInt(val) * 4}px`
          : val;
      const map: Record<string, string> = {
        t: 'top',
        r: 'right',
        b: 'bottom',
        l: 'left',
        x: 'inline',
        y: 'block',
      };
      const suffix = side ? `-${map[side]}` : '';
      return { [`${prop}${suffix}`]: value };
    },
  ],

  // Gap
  [
    /^gap-(.+)$/,
    ([_, val], { tokens }) => {
      const spacing = tokens.spacing[val];
      const value = spacing
        ? getVar(`spacing-${val}`, spacing)
        : val.match(/^\d+$/)
          ? `${parseInt(val) * 4}px`
          : val;
      return { gap: value };
    },
  ],

  // 2. Colors (Background, Text, Border)
  [
    /^bg-(.+)$/,
    ([_, path], { tokens }) => {
      const res = resolveColor(path, tokens);
      if (res) return { 'background-color': getVar(res.varPath, res.color) };
    },
  ],
  [
    /^text-(.+)$/,
    ([_, path], { tokens }) => {
      // 优先匹配字体大小
      if (tokens.typography.fontSize[path])
        return {
          'font-size': getVar(`typography-fontSize-${path}`, tokens.typography.fontSize[path]),
        };
      // 否则匹配颜色
      const res = resolveColor(path, tokens);
      if (res) return { color: getVar(res.varPath, res.color) };
    },
  ],
  [
    /^border-(.+)$/,
    ([_, path], { tokens }) => {
      const res = resolveColor(path, tokens);
      if (res)
        return {
          'border-color': getVar(res.varPath, res.color),
          'border-width': '1px',
          'border-style': 'solid',
        };
    },
  ],

  // 3. Typography Specific
  [
    /^font-(thin|light|normal|medium|semibold|bold|black)$/,
    ([_, weight], { tokens }) => ({ 'font-weight': tokens.typography.fontWeight[weight] }),
  ],
  [
    /^leading-(none|tight|snug|normal|relaxed|loose)$/,
    ([_, leading], { tokens }) => ({ 'line-height': tokens.typography.lineHeight[leading] }),
  ],
  [
    /^font-(sans|serif|mono)$/,
    ([_, family], { tokens }) => ({ 'font-family': tokens.typography.fontFamily[family] }),
  ],

  // 4. Borders & Shadows
  [
    /^rounded-(none|xs|sm|md|lg|full)$/,
    ([_, size], { tokens }) => ({ 'border-radius': tokens.borderRadius[size] }),
  ],
  [
    /^shadow-(sm|md|lg|hard|hard-accent)$/,
    ([_, size], { tokens }) => ({
      'box-shadow': tokens.boxShadow[size === 'md' ? 'DEFAULT' : size],
    }),
  ],
  ['shadow', (_, { tokens }) => ({ 'box-shadow': tokens.boxShadow.DEFAULT })],

  // 5. Layout & Flex
  ['flex', () => ({ display: 'flex' })],
  ['inline-flex', () => ({ display: 'inline-flex' })],
  ['grid', () => ({ display: 'grid' })],
  ['hidden', () => ({ display: 'none' })],
  [
    /^items-(start|center|end|baseline|stretch)$/,
    ([_, val]) => ({ 'align-items': val === 'start' || val === 'end' ? `flex-${val}` : val }),
  ],
  [
    /^justify-(start|center|end|between|around|evenly)$/,
    ([_, val]) => {
      const map: any = { between: 'space-between', around: 'space-around', evenly: 'space-evenly' };
      return {
        'justify-content': map[val] || (val === 'start' || val === 'end' ? `flex-${val}` : val),
      };
    },
  ],
  [/^flex-(row|col)$/, ([_, dir]) => ({ 'flex-direction': dir === 'row' ? 'row' : 'column' })],
  ['flex-1', () => ({ flex: '1 1 0%' })],

  // 6. Sizes
  [
    /^w-(.+)$/,
    ([_, val]) => ({
      width: val.includes('/')
        ? `${(eval(val) * 100).toFixed(2)}%`
        : val.match(/^\d+$/)
          ? `${parseInt(val) / 4}rem`
          : val,
    }),
  ],
  [
    /^h-(.+)$/,
    ([_, val]) => ({
      height: val.includes('/')
        ? `${(eval(val) * 100).toFixed(2)}%`
        : val.match(/^\d+$/)
          ? `${parseInt(val) / 4}rem`
          : val,
    }),
  ],
  [/^max-w-(.+)$/, ([_, val]) => ({ 'max-width': val })],
  [/^min-h-(.+)$/, ([_, val]) => ({ 'min-height': val })],

  // 7. Z-Index
  [/^z-(\d+)$/, ([_, val]) => ({ 'z-index': val })],

  // 8. Cursor & Pointer
  ['cursor-pointer', () => ({ cursor: 'pointer' })],
  ['select-none', () => ({ 'user-select': 'none' })],
  ['pointer-events-none', () => ({ 'pointer-events': 'none' })],

  // 9. Transitions
  ['transition', () => ({ transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)' })],
  [/^duration-(\d+)$/, ([_, val]) => ({ 'transition-duration': `${val}ms` })],

  // 10. Utilities
  ['uppercase', () => ({ 'text-transform': 'uppercase' })],
  ['lowercase', () => ({ 'text-transform': 'lowercase' })],
  ['capitalize', () => ({ 'text-transform': 'capitalize' })],
  ['text-left', () => ({ 'text-align': 'left' })],
  ['text-center', () => ({ 'text-align': 'center' })],
  ['text-right', () => ({ 'text-align': 'right' })],
  ['tracking-tighter', () => ({ 'letter-spacing': '-0.05em' })],
  ['tracking-tight', () => ({ 'letter-spacing': '-0.025em' })],
  ['tracking-normal', () => ({ 'letter-spacing': '0em' })],
  ['tracking-wide', () => ({ 'letter-spacing': '0.025em' })],
  ['tracking-wider', () => ({ 'letter-spacing': '0.05em' })],
  ['tracking-widest', () => ({ 'letter-spacing': '0.1em' })],
  [/^opacity-(\d+)$/, ([_, val]) => ({ opacity: `${parseInt(val) / 100}` })],
];
