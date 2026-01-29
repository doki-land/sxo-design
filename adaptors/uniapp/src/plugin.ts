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
    const engine = new StyleEngine(tokens);

    return {
        install(app: App) {
            const state = reactive<SxoState>({
                tokens,
                engine: markRaw(engine),
                mode,
            });

            app.provide(SXO_KEY, state);

            // UniApp 小程序环境不支持运行时 DOM 扫描与样式注入
            // 样式应由 vite-plugin-sxo 在编译时生成并包含在 virtual:sxo.css 中
            console.log('[Sxo] UniApp Adapter Initialized');
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
