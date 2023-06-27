import { type DesignTokens, defaultTokens } from '@sxo/design';
import { StyleEngine } from '@sxo/engine';
import React, { useEffect, useMemo } from 'react';
import { SxoContext } from './context.ts';

export interface ThemeProviderProps {
    tokens?: DesignTokens;
    mode?: 'light' | 'dark';
    children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
    tokens = defaultTokens,
    mode = 'light',
    children,
}) => {
    const engine = useMemo(() => new StyleEngine(tokens), [tokens]);

    useEffect(() => {
        document.documentElement.setAttribute('data-sxo-mode', mode);
    }, [mode]);

    useEffect(() => {
        // 注入令牌对应的 CSS 变量
        const cssVars = engine.generateTokenCssVars();
        let styleTag = document.getElementById('sxo-tokens');
        if (!styleTag) {
            styleTag = document.createElement('style');
            styleTag.id = 'sxo-tokens';
            document.head.appendChild(styleTag);
        }
        styleTag.innerHTML = cssVars;

        // 确保引擎样式标签存在
        if (!document.getElementById('sxo-engine')) {
            const engineTag = document.createElement('style');
            engineTag.id = 'sxo-engine';
            document.head.appendChild(engineTag);
        }
    }, [engine]);

    useEffect(() => {
        // 注入基础重置样式 (Modern Reset)
        let styleTag = document.getElementById('sxo-reset');
        if (!styleTag) {
            styleTag = document.createElement('style');
            styleTag.id = 'sxo-reset';
            document.head.appendChild(styleTag);
            styleTag.innerHTML = `
				*, *::before, *::after { box-sizing: border-box; }
				body { 
					margin: 0; 
					font-family: var(--sxo-typography-fontFamily-sans); 
					-webkit-font-smoothing: antialiased;
					background-color: var(--sxo-color-background-primary);
					color: var(--sxo-color-neutral-900);
					transition: background-color 0.3s ease, color 0.3s ease;
				}
				button, input, select, textarea { font-family: inherit; }
				a { color: inherit; text-decoration: none; }
			`;
        }
    }, []);

    return React.createElement(SxoContext.Provider, { value: { tokens, engine } }, children);
};
