import { type DesignTokens, defaultTokens, tokensToCssVars } from '@sxo/design';
import { StyleEngine } from '@sxo/engine';
import {
    type App,
    defineComponent,
    Fragment,
    h,
    inject,
    markRaw,
    type PropType,
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
export function createSxo(options: { tokens?: DesignTokens; mode?: 'light' | 'dark' } = {}) {
    const tokens = options.tokens || defaultTokens;
    const mode = options.mode || 'light';
    const engine = new StyleEngine(tokens);

    return {
        install(app: App) {
            const state = reactive<SxoState>({
                tokens,
                engine: markRaw(engine),
                mode,
            });

            app.provide(SXO_KEY, state);

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
        injectVars: {
            type: Boolean,
            default: true,
        },
    },
    setup(props, { slots }) {
        const parentSxo = inject<SxoState>(SXO_KEY);

        const state = reactive<SxoState>({
            tokens: {
                ...(parentSxo?.tokens || defaultTokens),
                ...props.tokens,
            } as DesignTokens,
            engine: markRaw(
                new StyleEngine({
                    ...(parentSxo?.tokens || defaultTokens),
                    ...props.tokens,
                } as DesignTokens),
            ),
        });

        provide(SXO_KEY, state);

        watchEffect(() => {
            if (props.injectVars && typeof document !== 'undefined') {
                const vars = tokensToCssVars(state.tokens);
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
    const context = inject<SxoState>(SXO_KEY);
    if (!context) {
        // Return default state if not provided
        return {
            tokens: defaultTokens,
            engine: new StyleEngine(defaultTokens),
        };
    }
    return context;
}
