import { createContext, useContext, JSX } from 'solid-js';
import { defaultTheme, ThemeContext } from '@sxo/ui';

const SxoThemeContext = createContext<ThemeContext>(defaultTheme);

export function ThemeProvider(props: { theme?: ThemeContext; children: JSX.Element }) {
  return (
    <SxoThemeContext.Provider value={props.theme || defaultTheme}>
      {props.children}
    </SxoThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(SxoThemeContext);
}
