import { type DesignTokens, defaultTokens } from '@sxo/design';

/**
 * iOS Cupertino 风格主题
 * 核心：系统蓝, 大圆角, 毛玻璃效果 (通过背景色体现), 简洁
 */
export const cupertinoTheme: DesignTokens = {
    ...defaultTokens,
    color: {
        ...defaultTokens.color,
        primary: {
            DEFAULT: '#007aff', // iOS System Blue
            foreground: '#ffffff',
        },
        secondary: {
            DEFAULT: '#8e8e93', // iOS System Gray
            foreground: '#ffffff',
        },
        success: { DEFAULT: '#34c759' },
        warning: { DEFAULT: '#ffcc00' },
        error: { DEFAULT: '#ff3b30' },
        info: { DEFAULT: '#5856d6' },
        neutral: {
            ...defaultTokens.color.neutral,
            100: '#f2f2f7',
            200: '#e5e5ea',
            300: '#d1d1d6',
            400: '#c7c7cc',
            500: '#aeaeb2',
            600: '#8e8e93',
            700: '#636366',
            800: '#48484a',
            900: '#2c2c2e',
        },
        background: {
            primary: '#ffffff',
            secondary: '#f2f2f7',
            inverse: '#000000',
        },
    },
    borderRadius: {
        ...defaultTokens.borderRadius,
        DEFAULT: '12px',
        none: '0',
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '16px',
        full: '9999px',
        xl: '12px',
    },
    boxShadow: {
        ...defaultTokens.boxShadow,
        none: 'none',
        sm: '0 1px 3px rgba(0,0,0,0.1)',
        DEFAULT: '0 4px 12px rgba(0,0,0,0.08)',
        md: '0 8px 24px rgba(0,0,0,0.12)',
        lg: '0 12px 32px rgba(0,0,0,0.15)',
        hard: 'none',
        'hard-accent': 'none',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    },
    typography: {
        ...defaultTokens.typography,
        fontFamily: {
            ...defaultTokens.typography.fontFamily,
            DEFAULT:
                "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Display', sans-serif",
        },
    },
};
