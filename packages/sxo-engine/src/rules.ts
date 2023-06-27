import type { DesignTokens } from '@sxo/design';

export type RuleContext = {
    tokens: DesignTokens;
};

export type Rule = [
    RegExp | string,
    (match: string[], context: RuleContext) => string | Record<string, any> | undefined,
];

const getVar = (path: string, fallback: string, opacity?: string) => {
    const base = path ? `var(--sxo-${path.replace(/\./g, '-')})` : fallback;
    if (opacity) {
        const alpha = opacity.match(/^\d+$/) ? `${parseInt(opacity) / 100}` : opacity;
        return `color-mix(in srgb, ${base}, transparent calc(100% - ${opacity.match(/^\d+$/) ? opacity + '%' : opacity}))`;
    }
    return base;
};

/**
 * 颜色解析辅助函数，支持嵌套路径
 */
function resolveColor(
    path: string,
    tokens: DesignTokens,
): { color: string; varPath: string; opacity?: string } | undefined {
    const [mainPath, opacity] = path.split('/');
    const parts = mainPath.split('-');
    let current: any = tokens.color;
    const varParts = ['color'];

    for (const part of parts) {
        if (part === 'transparent' || part === 'inherit' || part === 'currentColor') {
            return { color: part, varPath: '', opacity };
        }
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
    if (typeof current === 'object' && current?.DEFAULT && !varParts.includes('DEFAULT')) {
        varParts.push('DEFAULT');
    }

    if (finalColor) {
        return { color: finalColor, varPath: varParts.join('-'), opacity };
    }
    return undefined;
}

export const defaultRules: Rule[] = [
    // 0. Ignore semantic marker classes
    [/^sxo-(.+)$/, () => ({})],
    ['group', () => ({})], // Marker class

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
        /^(gap|gap-x|gap-y)-(.+)$/,
        ([_, type, val], { tokens }) => {
            const prop = type === 'gap-x' ? 'column-gap' : type === 'gap-y' ? 'row-gap' : 'gap';
            const spacing = tokens.spacing[val];
            const value = spacing
                ? getVar(`spacing-${val}`, spacing)
                : val.match(/^\d+$/)
                  ? `${parseInt(val) * 4}px`
                  : val;
            return { [prop]: value };
        },
    ],
    [
        /^space-(x|y)-(.+)$/,
        ([_, axis, val], { tokens }) => {
            const spacing = tokens.spacing[val];
            const value = spacing
                ? getVar(`spacing-${val}`, spacing)
                : val.match(/^\d+$/)
                  ? `${parseInt(val) * 4}px`
                  : val;
            const selector =
                axis === 'x'
                    ? '& > :not([hidden]) ~ :not([hidden])'
                    : '& > :not([hidden]) ~ :not([hidden])';
            const prop = axis === 'x' ? 'margin-left' : 'margin-top';
            return { [selector]: { [prop]: value } };
        },
    ],

    // 2. Colors (Background, Text, Border)
    ['bg-foreground', (_, { tokens }) => ({ 'background-color': getVar('color-text-primary', tokens.color.text.primary) })],
    ['text-foreground', (_, { tokens }) => ({ color: getVar('color-text-primary', tokens.color.text.primary) })],
    ['bg-background', (_, { tokens }) => ({ 'background-color': getVar('color-background-primary', tokens.color.background.primary) })],
    ['text-background', (_, { tokens }) => ({ color: getVar('color-background-primary', tokens.color.background.primary) })],
    [
        /^(bg|text)-(primary|secondary|accent|success|warning|error|info|background)-(foreground|DEFAULT|primary|secondary|inverse|neon|vivid)$/,
        ([_, type, group, sub], { tokens }) => {
            const prop = type === 'bg' ? 'background-color' : 'color';
            const varPath = `color-${group}-${sub}`;
            const color = (tokens.color as any)[group]?.[sub];
            if (color) return { [prop]: getVar(varPath, color) };
        },
    ],
    [
        /^bg-(.+)$/,
        ([_, path], { tokens }) => {
            const res = resolveColor(path, tokens);
            if (res) {
                const color = getVar(res.varPath, res.color, res.opacity);
                return {
                    '--sxo-bg-opacity': '100%',
                    '--sxo-bg-color': color,
                    'background-color':
                        'color-mix(in srgb, var(--sxo-bg-color), transparent calc(100% - var(--sxo-bg-opacity)))',
                };
            }
        },
    ],
    [
        /^text-(.+)$/,
        ([_, path], { tokens }) => {
            // 1. 处理任意值语法 [11px]
            const arbitraryMatch = path.match(/^\[(.+)\]$/);
            if (arbitraryMatch) {
                const val = arbitraryMatch[1];
                if (val.match(/^((\d+)?\.?\d+)(px|rem|em|vh|vw|%)?$/)) {
                    return { 'font-size': val.match(/^\d+$/) ? `${val}px` : val };
                }
                const res = resolveColor(val, tokens);
                if (res) {
                    const color = getVar(res.varPath, res.color, res.opacity);
                    return {
                        '--sxo-text-opacity': '100%',
                        '--sxo-text-color': color,
                        color: 'color-mix(in srgb, var(--sxo-text-color), transparent calc(100% - var(--sxo-text-opacity)))',
                    };
                }
                return {
                    '--sxo-text-opacity': '100%',
                    '--sxo-text-color': val,
                    color: 'color-mix(in srgb, var(--sxo-text-color), transparent calc(100% - var(--sxo-text-opacity)))',
                };
            }

            // 2. 优先匹配字体大小 tokens
            if (tokens.typography.fontSize[path])
                return {
                    'font-size': getVar(
                        `typography-fontSize-${path}`,
                        tokens.typography.fontSize[path],
                    ),
                };

            // 3. 优先匹配 tokens.color.text 下的语义色
            const [colorPath, opacity] = path.split('/');
            if (tokens.color.text && (tokens.color.text as any)[colorPath]) {
                const color = getVar(
                    `color-text-${colorPath}`,
                    (tokens.color.text as any)[colorPath],
                    opacity,
                );
                return {
                    '--sxo-text-opacity': '100%',
                    '--sxo-text-color': color,
                    color: 'color-mix(in srgb, var(--sxo-text-color), transparent calc(100% - var(--sxo-text-opacity)))',
                };
            }

            // 4. 否则匹配颜色
            const res = resolveColor(path, tokens);
            if (res) {
                const color = getVar(res.varPath, res.color, res.opacity);
                return {
                    '--sxo-text-opacity': '100%',
                    '--sxo-text-color': color,
                    color: 'color-mix(in srgb, var(--sxo-text-color), transparent calc(100% - var(--sxo-text-opacity)))',
                };
            }
        },
    ],
    [
        /^border-(.+)$/,
        ([_, path], { tokens }) => {
            // 任意值
            if (path.startsWith('[') && path.endsWith(']')) {
                const val = path.slice(1, -1);
                if (val.match(/^((\d+)?\.?\d+)(px|rem|em)?$/)) {
                    return { 'border-width': val.match(/^\d+$/) ? `${val}px` : val };
                }
                const res = resolveColor(val, tokens);
                if (res) return { 'border-color': getVar(res.varPath, res.color, res.opacity) };
                return { 'border-color': val };
            }

            // 边框宽度 border-2, border-4
            if (path.match(/^\d+$/)) {
                return { 'border-width': `${path}px` };
            }

            // 边框侧边 border-b, border-t, border-x, border-y
            const sideMap: Record<string, string[]> = {
                t: ['top'],
                r: ['right'],
                b: ['bottom'],
                l: ['left'],
                x: ['left', 'right'],
                y: ['top', 'bottom'],
            };
            if (sideMap[path]) {
                const props: Record<string, string> = { 'border-style': 'solid' };
                sideMap[path].forEach((side) => {
                    props[`border-${side}-width`] = '1px';
                });
                return props;
            }

            // 颜色 - 不再强制设置 border-width，除非没有设置过
            const res = resolveColor(path, tokens);
            if (res)
                return {
                    '--sxo-border-opacity': '100%',
                    '--sxo-border-color': getVar(res.varPath, res.color, res.opacity),
                    'border-color':
                        'color-mix(in srgb, var(--sxo-border-color), transparent calc(100% - var(--sxo-border-opacity)))',
                };
        },
    ],
    ['border', () => ({ 'border-width': '1px', 'border-style': 'solid' })],

    // Ring
    [
        /^ring-(\d+)$/,
        ([_, val]) => ({
            '--sxo-ring-offset-shadow':
                'var(--sxo-ring-inset, ) 0 0 0 var(--sxo-ring-offset-width, 0px) var(--sxo-ring-offset-color, #fff)',
            '--sxo-ring-shadow': `var(--sxo-ring-inset, ) 0 0 0 calc(${val}px + var(--sxo-ring-offset-width, 0px)) color-mix(in srgb, var(--sxo-ring-color, currentColor), transparent calc(100% - var(--sxo-ring-opacity, 100%)))`,
            'box-shadow':
                'var(--sxo-ring-offset-shadow), var(--sxo-ring-shadow), var(--sxo-shadow, 0 0 #0000)',
        }),
    ],
    [
        /^ring-(.+)$/,
        ([_, path], { tokens }) => {
            if (path.match(/^\d+$/)) return;
            const res = resolveColor(path, tokens);
            if (res) return { '--sxo-ring-color': getVar(res.varPath, res.color, res.opacity) };
            return { '--sxo-ring-color': path };
        },
    ],
    [/^ring-opacity-(\d+)$/, ([_, val]) => ({ '--sxo-ring-opacity': `${val}%` })],
    [/^ring-offset-(\d+)$/, ([_, val]) => ({ '--sxo-ring-offset-width': `${val}px` })],
    [
        /^ring-offset-(.+)$/,
        ([_, path], { tokens }) => {
            const res = resolveColor(path, tokens);
            if (res)
                return { '--sxo-ring-offset-color': getVar(res.varPath, res.color, res.opacity) };
            return { '--sxo-ring-offset-color': path };
        },
    ],
    ['ring-inset', () => ({ '--sxo-ring-inset': 'inset' })],
    [/^bg-opacity-(\d+)$/, ([_, val]) => ({ '--sxo-bg-opacity': `${val}%` })],
    [/^text-opacity-(\d+)$/, ([_, val]) => ({ '--sxo-text-opacity': `${val}%` })],
    [/^border-opacity-(\d+)$/, ([_, val]) => ({ '--sxo-border-opacity': `${val}%` })],
    [/^divide-opacity-(\d+)$/, ([_, val]) => ({ '--sxo-divide-opacity': `${val}%` })],
    [/^opacity-(\d+)$/, ([_, val]) => ({ opacity: `${parseInt(val) / 100}` })],

    // 2.1 Gradients
    [
        /^bg-gradient-to-(t|tr|r|br|b|bl|l|tl)$/,
        ([_, dir]) => {
            const map: Record<string, string> = {
                t: 'to top',
                tr: 'to top right',
                r: 'to right',
                br: 'to bottom right',
                b: 'to bottom',
                bl: 'to bottom left',
                l: 'to left',
                tl: 'to top left',
            };
            return {
                'background-image': `linear-gradient(${map[dir]}, var(--sxo-gradient-stops))`,
            };
        },
    ],
    [
        'bg-gradient-radial',
        () => ({
            'background-image':
                'radial-gradient(var(--sxo-gradient-shape, circle) at center, var(--sxo-gradient-stops))',
        }),
    ],
    [
        /^from-(.+)$/,
        ([_, path], { tokens }) => {
            const res = resolveColor(path, tokens);
            if (res) {
                const color = getVar(res.varPath, res.color, res.opacity);
                return {
                    '--sxo-gradient-from': color,
                    '--sxo-gradient-to': 'rgb(255 255 255 / 0)',
                    '--sxo-gradient-stops': 'var(--sxo-gradient-from), var(--sxo-gradient-to)',
                };
            }
            if (path.startsWith('[') && path.endsWith(']')) {
                const val = path.slice(1, -1);
                return {
                    '--sxo-gradient-from': val,
                    '--sxo-gradient-to': 'rgb(255 255 255 / 0)',
                    '--sxo-gradient-stops': 'var(--sxo-gradient-from), var(--sxo-gradient-to)',
                };
            }
        },
    ],
    [
        /^via-(.+)$/,
        ([_, path], { tokens }) => {
            const res = resolveColor(path, tokens);
            if (res) {
                const color = getVar(res.varPath, res.color, res.opacity);
                return {
                    '--sxo-gradient-to': 'rgb(255 255 255 / 0)',
                    '--sxo-gradient-stops':
                        'var(--sxo-gradient-from), ' + color + ', var(--sxo-gradient-to)',
                };
            }
            if (path.startsWith('[') && path.endsWith(']')) {
                const val = path.slice(1, -1);
                return {
                    '--sxo-gradient-to': 'rgb(255 255 255 / 0)',
                    '--sxo-gradient-stops':
                        'var(--sxo-gradient-from), ' + val + ', var(--sxo-gradient-to)',
                };
            }
        },
    ],
    [
        /^to-(.+)$/,
        ([_, path], { tokens }) => {
            const res = resolveColor(path, tokens);
            if (res) {
                const color = getVar(res.varPath, res.color, res.opacity);
                return {
                    '--sxo-gradient-to': color,
                };
            }
            if (path.startsWith('[') && path.endsWith(']')) {
                const val = path.slice(1, -1);
                return {
                    '--sxo-gradient-to': val,
                };
            }
        },
    ],

    // 2.2 Background Clip & Text Transparent
    ['bg-clip-text', () => ({ '-webkit-background-clip': 'text', 'background-clip': 'text' })],
    ['bg-clip-border', () => ({ 'background-clip': 'border-box' })],
    ['bg-clip-padding', () => ({ 'background-clip': 'padding-box' })],
    ['bg-clip-content', () => ({ 'background-clip': 'content-box' })],
    ['text-transparent', () => ({ color: 'transparent' })],

    // Background Size & Position
    ['bg-cover', () => ({ 'background-size': 'cover' })],
    ['bg-contain', () => ({ 'background-size': 'contain' })],
    [
        /^bg-size-(.+)$/,
        ([_, val]) => {
            if (val.startsWith('[') && val.endsWith(']')) {
                return { 'background-size': val.slice(1, -1).replace(/_/g, ' ') };
            }
        },
    ],
    [
        /^bg-(left|center|right|top|bottom)(-(left|center|right|top|bottom))?$/,
        ([_, p1, __, p2]) => ({ 'background-position': `${p1}${p2 ? ' ' + p2 : ''}` }),
    ],

    // 3. Typography Specific
    [
        /^font-(thin|light|normal|medium|semibold|bold|black)$/,
        ([_, weight], { tokens }) => ({
            'font-weight': getVar(
                `typography-fontWeight-${weight}`,
                tokens.typography.fontWeight[weight],
            ),
        }),
    ],
    [
        /^leading-(none|tight|snug|normal|relaxed|loose)$/,
        ([_, leading], { tokens }) => ({
            'line-height': getVar(
                `typography-lineHeight-${leading}`,
                tokens.typography.lineHeight[leading],
            ),
        }),
    ],
    [
        /^leading-\[(.+)\]$/,
        ([_, val]) => ({ 'line-height': val.replace(/_/g, ' ') }),
    ],
    ['antialiased', () => ({ '-webkit-font-smoothing': 'antialiased', '-moz-osx-font-smoothing': 'grayscale' })],
    ['text-balance', () => ({ 'text-wrap': 'balance' })],
    [
        /^font-(sans|serif|mono)$/,
        ([_, family], { tokens }) => ({
            'font-family': getVar(
                `typography-fontFamily-${family}`,
                tokens.typography.fontFamily[family],
            ),
        }),
    ],

    // 4. Borders & Shadows
    [
        /^rounded-(none|xs|sm|md|lg|xl|2xl|3xl|full)$/,
        ([_, size], { tokens }) => ({
            'border-radius': getVar(`borderRadius-${size}`, (tokens.borderRadius as any)[size]),
        }),
    ],
    [
        /^shadow-(sm|md|lg|xl|2xl|hard|hard-accent)$/,
        ([_, size], { tokens }) => ({
            'box-shadow': getVar(
                `boxShadow-${size === 'md' ? 'DEFAULT' : size}`,
                (tokens.boxShadow as any)[size === 'md' ? 'DEFAULT' : size],
            ),
        }),
    ],
    [
        /^shadow-(.+)$/,
        ([_, path], { tokens }) => {
            // Skip if it matches size tokens (already handled above, but just in case)
            if (['sm', 'md', 'lg', 'xl', '2xl', 'hard', 'hard-accent'].includes(path)) return;

            const res = resolveColor(path, tokens);
            if (res) {
                const color = getVar(res.varPath, res.color, res.opacity);
                // Apply a colored shadow (Vercel-like glow)
                return {
                    'box-shadow': `0 4px 14px 0 ${color}`,
                };
            }
        },
    ],
    [
        'shadow',
        (_, { tokens }) => ({
            'box-shadow': getVar('boxShadow-DEFAULT', tokens.boxShadow.DEFAULT),
        }),
    ],

    // 4.5 Positioning
    ['absolute', () => ({ position: 'absolute' })],
    ['relative', () => ({ position: 'relative' })],
    ['fixed', () => ({ position: 'fixed' })],
    ['sticky', () => ({ position: 'sticky' })],
    ['static', () => ({ position: 'static' })],
    [
        /^(top|right|bottom|left|inset)-(.+)$/,
        ([_, side, val], { tokens }) => {
            if (val.startsWith('[') && val.endsWith(']')) {
                const raw = val.slice(1, -1).replace(/_/g, ' ');
                if (side === 'inset') {
                    return { top: raw, right: raw, bottom: raw, left: raw };
                }
                return { [side]: raw };
            }
            const spacing = tokens.spacing[val];
            const value = spacing
                ? getVar(`spacing-${val}`, spacing)
                : val.match(/^\d+$/)
                  ? `${parseInt(val) * 4}px`
                  : val;
            if (side === 'inset') {
                return { top: value, right: value, bottom: value, left: value };
            }
            return { [side]: value };
        },
    ],

    // 5. Layout & Flex
    ['block', () => ({ display: 'block' })],
    ['inline-block', () => ({ display: 'inline-block' })],
    ['inline', () => ({ display: 'inline' })],
    ['flex', () => ({ display: 'flex' })],
    ['inline-flex', () => ({ display: 'inline-flex' })],
    ['grid', () => ({ display: 'grid' })],
    ['hidden', () => ({ display: 'none' })],
    [
        /^items-(start|center|end|baseline|stretch)$/,
        ([_, val]) => ({
            'align-items': val === 'start' || val === 'end' ? `flex-${val}` : val,
        }),
    ],
    [
        /^justify-(start|center|end|between|around|evenly)$/,
        ([_, val]) => {
            const map: any = {
                between: 'space-between',
                around: 'space-around',
                evenly: 'space-evenly',
            };
            return {
                'justify-content':
                    map[val] || (val === 'start' || val === 'end' ? `flex-${val}` : val),
            };
        },
    ],
    [/^flex-(row|col)$/, ([_, dir]) => ({ 'flex-direction': dir === 'row' ? 'row' : 'column' })],
    ['flex-wrap', () => ({ 'flex-wrap': 'wrap' })],
    ['flex-nowrap', () => ({ 'flex-wrap': 'nowrap' })],
    ['flex-1', () => ({ flex: '1 1 0%' })],
    ['flex-auto', () => ({ flex: '1 1 auto' })],
    ['flex-initial', () => ({ flex: '0 1 auto' })],
    ['flex-none', () => ({ flex: 'none' })],

    // 5.1 Grid
    [
        /^grid-cols-(\d+)$/,
        ([_, val]) => ({ 'grid-template-columns': `repeat(${val}, minmax(0, 1fr))` }),
    ],
    [
        /^grid-rows-(\d+)$/,
        ([_, val]) => ({ 'grid-template-rows': `repeat(${val}, minmax(0, 1fr))` }),
    ],
    [/^col-span-(\d+)$/, ([_, val]) => ({ 'grid-column': `span ${val} / span ${val}` })],
    [/^row-span-(\d+)$/, ([_, val]) => ({ 'grid-row': `span ${val} / span ${val}` })],

    // 5.2 Divide
    [
        /^divide-(x|y)$/,
        ([_, axis]) => {
            const selector = '& > :not([hidden]) ~ :not([hidden])';
            const prop = axis === 'x' ? 'border-left-width' : 'border-top-width';
            return {
                [selector]: {
                    [prop]: '1px',
                    'border-style': 'solid',
                    '--sxo-divide-opacity': '100%',
                    'border-color':
                        'color-mix(in srgb, var(--sxo-divide-color, currentColor), transparent calc(100% - var(--sxo-divide-opacity)))',
                },
            };
        },
    ],
    [
        /^divide-(.+)$/,
        ([_, path], { tokens }) => {
            if (path === 'x' || path === 'y') return;
            const res = resolveColor(path, tokens);
            if (res) {
                return {
                    '& > :not([hidden]) ~ :not([hidden])': {
                        '--sxo-divide-color': getVar(res.varPath, res.color, res.opacity),
                    },
                };
            }
            // 兜底处理
            if (path.match(/^[a-zA-Z]+$/) || path.startsWith('#') || path.startsWith('rgb')) {
                return {
                    '& > :not([hidden]) ~ :not([hidden])': {
                        '--sxo-divide-color': path,
                    },
                };
            }
        },
    ],

    // 6. Aspect Ratio
    ['aspect-square', () => ({ 'aspect-ratio': '1 / 1' })],
    ['aspect-video', () => ({ 'aspect-ratio': '16 / 9' })],

    // 7. Sizes
    [
        /^w-(.+)$/,
        ([_, val], { tokens }) => {
            if (val === 'full') return { width: '100%' };
            if (val === 'screen') return { width: '100vw' };
            if (val === 'min') return { width: 'min-content' };
            if (val === 'max') return { width: 'max-content' };
            if (val === 'fit') return { width: 'fit-content' };
            if (val === 'auto') return { width: 'auto' };
            if (val.startsWith('[') && val.endsWith(']')) {
                return { width: val.slice(1, -1).replace(/_/g, ' ') };
            }
            if (tokens.spacing[val])
                return { width: getVar(`spacing-${val}`, tokens.spacing[val]) };

            return {
                width: val.includes('/')
                    ? `${(eval(val) * 100).toFixed(6)}%`
                    : val.match(/^\d+$/)
                      ? `${parseInt(val) * 4}px` // Standardize on 4px grid for raw numbers if not in spacing
                      : val,
            };
        },
    ],
    [
        /^h-(.+)$/,
        ([_, val], { tokens }) => {
            if (val === 'full') return { height: '100%' };
            if (val === 'screen') return { height: '100vh' };
            if (val === 'min') return { height: 'min-content' };
            if (val === 'max') return { height: 'max-content' };
            if (val === 'fit') return { height: 'fit-content' };
            if (val === 'auto') return { height: 'auto' };
            if (val.startsWith('[') && val.endsWith(']')) {
                return { height: val.slice(1, -1).replace(/_/g, ' ') };
            }
            if (tokens.spacing[val])
                return { height: getVar(`spacing-${val}`, tokens.spacing[val]) };

            return {
                height: val.includes('/')
                    ? `${(eval(val) * 100).toFixed(6)}%`
                    : val.match(/^\d+$/)
                      ? `${parseInt(val) * 4}px`
                      : val,
            };
        },
    ],
    [
        /^max-w-(.+)$/,
        ([_, val], { tokens }) => {
            if (val === 'full') return { 'max-width': '100%' };
            if (val === 'screen') return { 'max-width': '100vw' };
            if (val === 'none') return { 'max-width': 'none' };
            if (val.startsWith('screen-')) {
                const bp = val.slice('screen-'.length);
                if (tokens.breakpoints[bp]) {
                    return { 'max-width': getVar(`breakpoints-${bp}`, tokens.breakpoints[bp]) };
                }
            }

            const maxWidthMap: Record<string, string> = {
                xs: '20rem',
                sm: '24rem',
                md: '28rem',
                lg: '32rem',
                xl: '36rem',
                '2xl': '42rem',
                '3xl': '48rem',
                '4xl': '56rem',
                '5xl': '64rem',
                '6xl': '72rem',
                '7xl': '80rem',
            };
            if (maxWidthMap[val]) return { 'max-width': maxWidthMap[val] };

            if (val.startsWith('[') && val.endsWith(']')) {
                return { 'max-width': val.slice(1, -1).replace(/_/g, ' ') };
            }

            if (tokens.spacing[val]) return { 'max-width': getVar(`spacing-${val}`, tokens.spacing[val]) };
            return { 'max-width': val };
        },
    ],
    [
        /^min-h-(.+)$/,
        ([_, val], { tokens }) => {
            if (val === 'full') return { 'min-height': '100%' };
            if (val === 'screen') return { 'min-height': '100vh' };
            if (tokens.spacing[val])
                return { 'min-height': getVar(`spacing-${val}`, tokens.spacing[val]) };
            return { 'min-height': val };
        },
    ],

    // 7. Z-Index
    [/^-?z-(\d+)$/, ([fullMatch, val]) => ({ 'z-index': fullMatch.startsWith('-') ? `-${val}` : val })],

    ['overflow-hidden', () => ({ overflow: 'hidden' })],
    ['overflow-auto', () => ({ overflow: 'auto' })],
    ['overflow-scroll', () => ({ overflow: 'scroll' })],
    ['overflow-visible', () => ({ overflow: 'visible' })],
    ['overflow-x-hidden', () => ({ 'overflow-x': 'hidden' })],
    ['overflow-y-hidden', () => ({ 'overflow-y': 'hidden' })],
    ['overflow-x-auto', () => ({ 'overflow-x': 'auto' })],
    ['overflow-y-auto', () => ({ 'overflow-y': 'auto' })],

    ['whitespace-nowrap', () => ({ 'white-space': 'nowrap' })],
    ['whitespace-pre', () => ({ 'white-space': 'pre' })],
    ['whitespace-pre-line', () => ({ 'white-space': 'pre-line' })],
    ['whitespace-pre-wrap', () => ({ 'white-space': 'pre-wrap' })],

    [
        'truncate',
        () => ({
            overflow: 'hidden',
            'text-overflow': 'ellipsis',
            'white-space': 'nowrap',
        }),
    ],

    // 8. Cursor & Pointer
    ['cursor-pointer', () => ({ cursor: 'pointer' })],
    ['cursor-not-allowed', () => ({ cursor: 'not-allowed' })],
    ['select-none', () => ({ 'user-select': 'none' })],
    ['pointer-events-none', () => ({ 'pointer-events': 'none' })],

    // 9. Transitions
    [
        /^(transition|transition-all)$/,
        () => ({ transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)' }),
    ],
    [
        'transition-colors',
        () => ({
            'transition-property':
                'color, background-color, border-color, text-decoration-color, fill, stroke',
            'transition-timing-function': 'cubic-bezier(0.4, 0, 0.2, 1)',
            'transition-duration': '150ms',
        }),
    ],
    [
        'transition-opacity',
        () => ({
            'transition-property': 'opacity',
            'transition-timing-function': 'cubic-bezier(0.4, 0, 0.2, 1)',
            'transition-duration': '150ms',
        }),
    ],
    [/^duration-(\d+)$/, ([_, val]) => ({ 'transition-duration': `${val}ms` })],

    // 9.5 Filters
    [
        /^blur-(.+)$/,
        ([_, val]) => {
            if (val.startsWith('[') && val.endsWith(']')) {
                return { filter: `blur(${val.slice(1, -1)})` };
            }
            const map: Record<string, string> = {
                none: '0',
                sm: '4px',
                md: '8px',
                lg: '12px',
                xl: '16px',
                '2xl': '40px',
                '3xl': '64px',
            };
            if (map[val]) return { filter: `blur(${map[val]})` };
            if (val.match(/^\d+$/)) return { filter: `blur(${val}px)` };
        },
    ],
    [
        /^drop-shadow-(.+)$/,
        ([_, val]) => {
            const map: Record<string, string> = {
                sm: 'drop-shadow(0 1px 1px rgb(0 0 0 / 0.05))',
                DEFAULT:
                    'drop-shadow(0 1px 2px rgb(0 0 0 / 0.1)) drop-shadow(0 1px 1px rgb(0 0 0 / 0.06))',
                md: 'drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06))',
                lg: 'drop-shadow(0 10px 8px rgb(0 0 0 / 0.04)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1))',
                xl: 'drop-shadow(0 20px 13px rgb(0 0 0 / 0.03)) drop-shadow(0 8px 5px rgb(0 0 0 / 0.08))',
                '2xl': 'drop-shadow(0 25px 25px rgb(0 0 0 / 0.15))',
                none: 'drop-shadow(0 0 #0000)',
            };
            return { filter: map[val] || map.DEFAULT };
        },
    ],

    // 10. Utilities
    [
        /^backdrop-blur-(none|sm|md|lg|xl|2xl|3xl|\[.+\])$/,
        ([_, val]) => {
            const map: Record<string, string> = {
                none: '0',
                sm: '4px',
                md: '8px',
                lg: '16px',
                xl: '24px',
                '2xl': '40px',
                '3xl': '64px',
            };
            const blur = val.startsWith('[') && val.endsWith(']') ? val.slice(1, -1).replace(/_/g, ' ') : map[val];
            return { 'backdrop-filter': `blur(${blur})`, '-webkit-backdrop-filter': `blur(${blur})` };
        },
    ],
    ['uppercase', () => ({ 'text-transform': 'uppercase' })],
    ['lowercase', () => ({ 'text-transform': 'lowercase' })],
    ['capitalize', () => ({ 'text-transform': 'capitalize' })],
    ['text-left', () => ({ 'text-align': 'left' })],
    ['text-center', () => ({ 'text-align': 'center' })],
    ['text-right', () => ({ 'text-align': 'right' })],
    [
        /^tracking-(tighter|tight|normal|wide|wider|widest|\[.+\])$/,
        ([_, val]) => {
            if (val.startsWith('[') && val.endsWith(']')) {
                return { 'letter-spacing': val.slice(1, -1) };
            }
            const map: Record<string, string> = {
                tighter: '-0.05em',
                tight: '-0.025em',
                normal: '0em',
                wide: '0.025em',
                wider: '0.05em',
                widest: '0.1em',
            };
            return { 'letter-spacing': map[val] };
        },
    ],
    [/^opacity-(\d+)$/, ([_, val]) => ({ opacity: `${parseInt(val) / 100}` })],
    ['grayscale', () => ({ filter: 'grayscale(100%)' })],

    // 10.1 Layout Helpers
    ['overflow-hidden', () => ({ overflow: 'hidden' })],
    ['overflow-auto', () => ({ overflow: 'auto' })],
    ['overflow-scroll', () => ({ overflow: 'scroll' })],
    ['outline-none', () => ({ outline: '2px solid transparent', 'outline-offset': '2px' })],
    ['border-collapse', () => ({ 'border-collapse': 'collapse' })],
    [
        'container',
        () => ({
            width: '100%',
            'margin-left': 'auto',
            'margin-right': 'auto',
            'padding-left': '1rem',
            'padding-right': '1rem',
            'max-width': '1280px',
        }),
    ],
    ['mx-auto', () => ({ 'margin-left': 'auto', 'margin-right': 'auto' })],
    ['my-auto', () => ({ 'margin-top': 'auto', 'margin-bottom': 'auto' })],

    // 11. Animations
    [
        /^-?translate-(x|y)-(.+)$/,
        ([fullMatch, axis, val], { tokens }) => {
            const isNegative = fullMatch.startsWith('-');
            const sign = isNegative ? '-' : '';

            const compositeTransform =
                'translate(var(--sxo-translate-x, 0), var(--sxo-translate-y, 0)) scale(var(--sxo-scale-x, 1), var(--sxo-scale-y, 1)) rotate(var(--sxo-rotate, 0deg))';

            const setAxisVar = (v: string) =>
                axis === 'x'
                    ? { '--sxo-translate-x': v, transform: compositeTransform }
                    : { '--sxo-translate-y': v, transform: compositeTransform };

            // Handle percentage fractions like 1/2
            if (val.includes('/')) {
                const percentage = (eval(val) * 100).toFixed(6) + '%';
                return setAxisVar(`${sign}${percentage}`);
            }

            // Handle keywords
            if (val === 'full') return setAxisVar(`${sign}100%`);

            // Handle spacing tokens or raw numbers
            const spacing = tokens.spacing[val];
            if (spacing) {
                return setAxisVar(`${sign}${getVar(`spacing-${val}`, spacing)}`);
            }

            if (val.match(/^\d+$/)) {
                return setAxisVar(`${sign}${parseInt(val) * 4}px`);
            }

            // Handle arbitrary values
            if (val.startsWith('[') && val.endsWith(']')) {
                return setAxisVar(`${sign}${val.slice(1, -1).replace(/_/g, ' ')}`);
            }
        },
    ],
    [
        /^scale-(\d+)$/,
        ([_, val]) => {
            const v = `${parseInt(val) / 100}`;
            return {
                '--sxo-scale-x': v,
                '--sxo-scale-y': v,
                transform:
                    'translate(var(--sxo-translate-x, 0), var(--sxo-translate-y, 0)) scale(var(--sxo-scale-x, 1), var(--sxo-scale-y, 1)) rotate(var(--sxo-rotate, 0deg))',
            };
        },
    ],
    [/^origin-(.+)$/, ([_, val]) => ({ 'transform-origin': val.replace(/-/g, ' ') })],
    [
        /^animate-(.+)$/,
        ([_, val], { tokens }) => {
            if (val.startsWith('[') && val.endsWith(']')) {
                return { animation: val.slice(1, -1).replace(/_/g, ' ') };
            }
            const anim = tokens.animation[val];
            if (anim) return { animation: getVar(`animation-${val}`, anim) };
        },
    ],
];
