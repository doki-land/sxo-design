import React, { useMemo, useEffect } from 'react';
import { DesignTokens, defaultTokens } from '@sxo/design';
import { StyleEngine } from '@sxo/engine';
import { SxoContext } from './context';

export interface SxoProviderProps {
  tokens?: DesignTokens;
  children: React.ReactNode;
}

export const SxoProvider: React.FC<SxoProviderProps> = ({ tokens = defaultTokens, children }) => {
  const engine = useMemo(() => new StyleEngine(tokens), [tokens]);

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
  }, [engine]);

  useEffect(() => {
    // 注入基础样式或重置样式 (可选)
    let styleTag = document.getElementById('sxo-engine');
    if (!styleTag) {
      styleTag = document.createElement('style');
      styleTag.id = 'sxo-engine';
      document.head.appendChild(styleTag);
    }
  }, []);

  return React.createElement(SxoContext.Provider, { value: { tokens, engine } }, children);
};
