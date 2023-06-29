import { type DesignTokens, defaultTokens, tokensToCssVars } from '@sxo/design';
import { StyleEngine } from '@sxo/engine';
import type Vue from 'vue';
import { defineComponent, h, inject, provide, reactive, watch } from 'vue';

export const SXO_KEY = 'sxo'; // In Vue 2, symbols as keys in provide/inject can sometimes be tricky depending on build setup, using string is safer but Symbol is supported in 2.7. Let's use string for compatibility.

export interface SxoState {
    tokens: DesignTokens;
    engine: StyleEngine;
    mode: 'light' | 'dark';
}

export function useSxo() {
    const state = inject<SxoState>(SXO_KEY);
    if (!state) {
        throw new Error('SXO plugin not installed');
    }
    return state;
}

/**
 * Vue 2 Plugin for SXO
 */
export const SxoPlugin = {
    install(
        VueInstance: typeof Vue,
        options: { tokens?: DesignTokens; mode?: 'light' | 'dark' } = {},
    ) {
        const tokens = options.tokens || defaultTokens;
        const mode = options.mode || 'light';
        const engine = new StyleEngine(tokens);

        const state = reactive<SxoState>({
            tokens,
            engine,
            mode,
        });

        // Global CSS Variables Injection
        const injectVars = () => {
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
        };

        injectVars();

        // In Vue 2, we can use a global mixin to provide the state to all components
        // or use the Vue prototype. CVO preference is provide/inject.
        VueInstance.mixin({
            provide() {
                return {
                    [SXO_KEY]: state,
                };
            },
        });

        // Watch for token changes if they happen reactively
        watch(() => state.tokens, injectVars, { deep: true });
    },
};

/**
 * ThemeProvider Component for Vue 2
 */
export const ThemeProvider = defineComponent({
    name: 'SxoThemeProvider',
    props: {
        tokens: {
            type: Object as () => Partial<DesignTokens>,
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
            engine: new StyleEngine({
                ...(parentSxo?.tokens || defaultTokens),
                ...props.tokens,
            } as DesignTokens),
            mode: parentSxo?.mode || 'light',
        });

        provide(SXO_KEY, state);

        const updateVars = () => {
            if (props.injectVars && typeof document !== 'undefined') {
                const vars = tokensToCssVars(state.tokens);
                // Simplified: updating :root for now as in Vue 3 version
                const styleId = 'sxo-theme-vars-nested';
                let styleEl = document.getElementById(styleId) as HTMLStyleElement;

                if (!styleEl) {
                    styleEl = document.createElement('style');
                    styleEl.id = styleId;
                    document.head.appendChild(styleEl);
                }

                const css = `:root {\n${Object.entries(vars)
                    .map(([key, val]) => `  ${key}: ${val};`)
                    .join('\n')}\n}`;
                styleEl.textContent = css;
            }
        };

        watch(() => state.tokens, updateVars, { deep: true, immediate: true });

        return () =>
            h('div', { class: 'sxo-theme-provider' }, slots.default ? slots.default() : []);
    },
});
