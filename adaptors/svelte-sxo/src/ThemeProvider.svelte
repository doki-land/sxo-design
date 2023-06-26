<script lang="ts">
  import { setContext } from 'svelte';
  import { defaultTheme, type ThemeContext } from '@sxo/ui';

  const THEME_KEY = Symbol('sxo-theme');
  
  export let theme: ThemeContext = defaultTheme;

  setContext(THEME_KEY, theme);
</script>

<slot />
