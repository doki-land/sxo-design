<script lang="ts">
import { defaultTheme, type ThemeContext } from '@sxo/ui';
import { setContext } from 'svelte';

const THEME_KEY = Symbol('sxo-theme');

export const theme: ThemeContext = defaultTheme;

setContext(THEME_KEY, theme);
</script>

<slot />
