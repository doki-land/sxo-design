import { setContext, getContext } from 'svelte';
import { defaultTheme, ThemeContext } from '@sxo/ui';

const THEME_KEY = Symbol('sxo-theme');

export function setTheme(theme: ThemeContext = defaultTheme) {
  setContext(THEME_KEY, theme);
}

export function useTheme(): ThemeContext {
  return getContext(THEME_KEY) || defaultTheme;
}

export { default as ThemeProvider } from './ThemeProvider.svelte';
