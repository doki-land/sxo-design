/** @jsxImportSource solid-js */
import { defaultTheme, type ThemeContext } from '@sxo/ui';
import { createContext, type JSX, useContext } from 'solid-js';

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

export * from './components/Button';
export * from './components/Input';
export * from './components/Tag';
