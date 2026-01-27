import { defaultTheme, type ThemeContext } from '@sxo/ui';
import { getContext, setContext } from 'svelte';

const THEME_KEY = Symbol('sxo-theme');

export function setTheme(theme: ThemeContext = defaultTheme) {
    setContext(THEME_KEY, theme);
}

export function useTheme(): ThemeContext {
    return getContext(THEME_KEY) || defaultTheme;
}

export { default as ThemeProvider } from './ThemeProvider.svelte';
