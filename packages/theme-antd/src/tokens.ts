import { type DesignTokens, defaultTokens } from '@sxo/design';

/**
 * Ant Design 风格主题
 * 核心：拂晓蓝 (Daybreak Blue), 较小的圆角, 细腻的投影
 */
export const antdTheme: DesignTokens = {
    ...defaultTokens,
    color: {
        ...defaultTokens.color,
        primary: {
            DEFAULT: '#1677ff', // Ant Design Blue
            foreground: '#ffffff',
        },
        secondary: {
            DEFAULT: '#f5f5f5',
            foreground: 'rgba(0, 0, 0, 0.88)',
        },
        success: { DEFAULT: '#52c41a' },
        warning: { DEFAULT: '#faad14' },
        error: { DEFAULT: '#ff4d4f' },
        info: { DEFAULT: '#1677ff' },
        neutral: {
            ...defaultTokens.color.neutral,
            100: '#f5f5f5',
            200: '#f0f0f0',
            300: '#d9d9d9',
            400: '#bfbfbf',
            500: '#8c8c8c',
            600: '#595959',
            700: '#434343',
            800: '#262626',
            900: '#1f1f1f',
        },
        background: {
            primary: '#ffffff',
            secondary: '#fafafa',
            inverse: '#000000',
        },
    },
    modes: {
        dark: {
            primary: {
                DEFAULT: '#1668dc',
                foreground: '#ffffff',
            },
            background: {
                primary: '#141414',
                secondary: '#1f1f1f',
                inverse: '#ffffff',
            },
            neutral: {
                100: '#1f1f1f',
                200: '#262626',
                300: '#434343',
                400: '#595959',
                500: '#8c8c8c',
                600: '#bfbfbf',
                700: '#d9d9d9',
                800: '#f0f0f0',
                900: '#f5f5f5',
            },
        },
    },
    borderRadius: {
        ...defaultTokens.borderRadius,
        none: '0',
        xs: '2px',
        sm: '4px',
        md: '6px',
        lg: '8px',
        full: '9999px',
            xl: '12px',
    },
    boxShadow: {
        ...defaultTokens.boxShadow,
        none: 'none',
        sm: '0 2px 0 rgba(0, 0, 0, 0.02)',
        DEFAULT:
            '0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)',
        md: '0 6px 16px 0 rgba(0, 0, 0, 0.08)',
        lg: '0 9px 28px 8px rgba(0, 0, 0, 0.05)',
        hard: 'none', // Ant Design 不常用硬投影
        'hard-accent': 'none',
            xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    },
    typography: {
        ...defaultTokens.typography,
        fontFamily: {
            ...defaultTokens.typography.fontFamily,
            DEFAULT:
                "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
        },
    },
};
