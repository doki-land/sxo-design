import type { ThemeContext } from '@sxo/ui';
import { SvelteComponentTyped } from 'svelte';

export declare function setTheme(theme?: ThemeContext): void;
export declare function useTheme(): ThemeContext;

export declare class ThemeProvider extends SvelteComponentTyped<{
    theme?: ThemeContext;
}, {}, {
    default: {};
}> {}
