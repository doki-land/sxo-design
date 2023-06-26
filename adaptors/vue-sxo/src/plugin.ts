import {
  App,
  inject,
  reactive,
  watchEffect,
  markRaw,
  defineComponent,
  h,
  PropType,
  Fragment,
} from 'vue';
import { DesignTokens, defaultTokens, tokensToCssVars } from '@sxo/design';
import { StyleEngine } from '@sxo/engine';

export const SXO_KEY = Symbol('sxo');

export interface SxoState {
  tokens: DesignTokens;
  engine: StyleEngine;
}

/**
 * Vue Plugin for SXO
 */
export function createSxo(options: { tokens?: DesignTokens } = {}) {
  const tokens = options.tokens || defaultTokens;
  const engine = new StyleEngine(tokens);

  return {
    install(app: App) {
      const state = reactive<SxoState>({
        tokens,
        engine: markRaw(engine),
      });

      app.provide(SXO_KEY, state);

      // Global CSS Variables Injection
      watchEffect(() => {
        if (typeof document !== 'undefined') {
          const vars = tokensToCssVars(state.tokens);
          const styleId = 'sxo-theme-vars';
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
      tokens: { ...(parentSxo?.tokens || defaultTokens), ...props.tokens } as DesignTokens,
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
