import { type DesignTokens, defaultTokens, mergeTokens, tokensToCssVars } from '@sxo/design';
import { StyleEngine } from '@sxo/engine';
import {
    type App,
    defineComponent,
    Fragment,
    h,
    inject,
    markRaw,
    type PropType,
    provide,
    reactive,
    watchEffect,
} from 'vue';

export const SXO_KEY = Symbol('sxo');

export interface SxoState {
    tokens: DesignTokens;
    engine: StyleEngine;
    mode: 'light' | 'dark';
}

/**
 * Vue Plugin for SXO
 */
export function createSxo(
    options: {
        tokens?: Partial<DesignTokens>;
        theme?: Partial<DesignTokens>;
        mode?: 'light' | 'dark';
    } = {},
) {
    // Deep merge user tokens with default tokens
    const userTokens = options.tokens || options.theme;
    const tokens = userTokens ? mergeTokens(defaultTokens, userTokens) : defaultTokens;
    const mode = options.mode || 'light';
    const engine = new StyleEngine(tokens, { debug: true });

    return {
        install(app: App) {
            const state = reactive<SxoState>({
                tokens,
                engine: markRaw(engine),
                mode,
            });

            app.provide(SXO_KEY, state);

            // 注入 CSS 变量
            if (typeof document !== 'undefined') {
                watchEffect(() => {
                    const vars = tokensToCssVars(state.tokens);
                    const css = `:root {\n${Object.entries(vars)
                        .map(([k, v]) => `  ${k}: ${v};`)
                        .join('\n')}\n}`;
                    
                    const styleId = 'sxo-tokens';
                    let styleEl = document.getElementById(styleId) as HTMLStyleElement;
                    if (!styleEl) {
                        styleEl = document.createElement('style');
                        styleEl.id = styleId;
                        document.head.prepend(styleEl);
                    }
                    styleEl.textContent = css;
                });
            }

            // Expose for devtools
            if (typeof window !== 'undefined') {
                (window as any).__sxo = state;
                (window as any).__cvo = state;
            }

            // 全局样式扫描 (Runtime Scanner)
            if (typeof document !== 'undefined') {
                const scan = () => {
                    const elements = document.querySelectorAll('[class*=" "], [class]');
                    const classes = new Set<string>();
                    elements.forEach((el) => {
                        const className = el.getAttribute('class') || '';
                        className.split(/\s+/).forEach((c) => {
                            if (c && !c.startsWith('v-') && !c.startsWith('router-')) {
                                classes.add(c);
                            }
                        });
                    });
                    if (classes.size > 0) {
                        const css = state.engine.generateBatch(classes);
                        const styleId = 'sxo-engine-global';
                        let styleEl = document.getElementById(styleId) as HTMLStyleElement;
                        if (!styleEl) {
                            styleEl = document.createElement('style');
                            styleEl.id = styleId;
                            document.head.appendChild(styleEl);
                        }
                        if (styleEl.textContent !== css) {
                            styleEl.textContent = css;
                        }
                    }
                };

                // 初始扫描
                setTimeout(scan, 0);

                // 监听 DOM 变化
                const observer = new MutationObserver((mutations) => {
                    let shouldScan = false;
                    for (const mutation of mutations) {
                        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                            shouldScan = true;
                            break;
                        }
                        if (mutation.addedNodes.length > 0) {
                            shouldScan = true;
                            break;
                        }
                    }
                    if (shouldScan) scan();
                });

                observer.observe(document.body, {
                    attributes: true,
                    childList: true,
                    subtree: true,
                    attributeFilter: ['class'],
                });
            }

            // Global CSS Variables Injection
            watchEffect(() => {
                if (typeof document !== 'undefined') {
                    const css = state.engine.generateTokenCssVars();
                    const styleId = 'sxo-theme-vars';
                    let styleEl = document.getElementById(styleId) as HTMLStyleElement;

                    if (!styleEl) {
                        styleEl = document.createElement('style');
                        styleEl.id = styleId;
                        document.head.appendChild(styleEl);
                    }

                    styleEl.textContent = css;
                    document.documentElement.setAttribute('data-sxo-mode', state.mode);
                }
            });
        },
    };
}

/**
 * ThemeProvider Component for Vue
 */
export const ThemeProvider = defineComponent({
    name: 'SxoThemeProvider',
    props: {
        tokens: {
            type: Object as PropType<Partial<DesignTokens>>,
            default: () => ({}),
        },
        theme: {
            type: Object as PropType<Partial<DesignTokens>>,
            default: () => ({}),
        },
        injectVars: {
            type: Boolean,
            default: true,
        },
    },
    setup(props, { slots }) {
        const parentSxo = inject<SxoState>(SXO_KEY, null as any);
        const userTokens = Object.keys(props.tokens).length > 0 ? props.tokens : props.theme;

        const state = reactive<SxoState>({
            tokens: {
                ...(parentSxo?.tokens || defaultTokens),
                ...userTokens,
            } as DesignTokens,
            engine: markRaw(
                new StyleEngine({
                    ...(parentSxo?.tokens || defaultTokens),
                    ...userTokens,
                } as DesignTokens),
            ),
            mode: parentSxo?.mode || 'light',
        });

        provide(SXO_KEY, state);

        watchEffect(() => {
            if (props.injectVars && typeof document !== 'undefined') {
                const _vars = tokensToCssVars(state.tokens);
                // Note: For nested providers, we might want to scope these vars,
                // but for now we'll stick to :root or a scoped class if needed.
                // For simplicity, we update :root or the nearest scoped element.
                // Here we'll just update the global one or handle it via a div wrapper.
            }
        });

        return () => h(Fragment, null, slots.default?.());
    },
});

export function useSxo() {
    const context = inject<SxoState>(SXO_KEY, null as any);
    if (!context) {
        // Return default state if not provided
        return {
            tokens: defaultTokens,
            engine: new StyleEngine(defaultTokens),
            mode: 'light',
        };
    }
    return context;
}
