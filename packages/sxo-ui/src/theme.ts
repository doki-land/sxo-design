import { type DesignTokens, defaultTokens } from '@sxo/design';

export interface ThemeContext {
    tokens: DesignTokens;
}

export const defaultTheme: ThemeContext = {
    tokens: defaultTokens,
};
