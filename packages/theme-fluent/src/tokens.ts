import { type DesignTokens, defaultTokens } from '@sxo/design';

/**
 * Microsoft Fluent 风格主题
 * 核心：Brand Blue, 现代感, 深度感 (Shadow), 细腻圆角
 */
export const fluentTheme: DesignTokens = {
    ...defaultTokens,
    color: {
        ...defaultTokens.color,
        primary: {
            DEFAULT: '#0078d4', // Microsoft Brand Blue
            foreground: '#ffffff',
        },
        secondary: {
            DEFAULT: '#edebe9',
            foreground: '#323130',
        },
        success: { DEFAULT: '#107c10' },
        warning: { DEFAULT: '#ffb900' },
        error: { DEFAULT: '#a4262c' },
        info: { DEFAULT: '#0078d4' },
        neutral: {
            ...defaultTokens.color.neutral,
            100: '#faf9f8',
            200: '#f3f2f1',
            300: '#edebe9',
            400: '#e1dfdd',
            500: '#c8c6c4',
            600: '#a19f9d',
            700: '#605e5c',
            800: '#323130',
            900: '#201f1e',
        },
        background: {
            primary: '#ffffff',
            secondary: '#faf9f8',
            inverse: '#201f1e',
        },
    },
    borderRadius: {
        ...defaultTokens.borderRadius,
        DEFAULT: '4px',
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
        sm: '0 1.6px 3.6px 0 rgba(0,0,0,0.132), 0 0.3px 0.9px 0 rgba(0,0,0,0.108)',
        DEFAULT: '0 6.4px 14.4px 0 rgba(0,0,0,0.132), 0 1.2px 3.6px 0 rgba(0,0,0,0.108)',
        md: '0 12.8px 28.8px 0 rgba(0,0,0,0.132), 0 2.4px 7.2px 0 rgba(0,0,0,0.108)',
        lg: '0 25.6px 57.6px 0 rgba(0,0,0,0.22), 0 4.8px 14.4px 0 rgba(0,0,0,0.18)',
        hard: 'none',
        'hard-accent': 'none',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    },
    typography: {
        ...defaultTokens.typography,
        fontFamily: {
            ...defaultTokens.typography.fontFamily,
            DEFAULT:
                "'Segoe UI', 'Segoe UI Web (West European)', 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', sans-serif",
        },
    },
};
