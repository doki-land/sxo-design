import { type DesignTokens, defaultTokens } from '@sxo/design';

/**
 * IBM Carbon 风格主题
 * 核心：高对比度, 无圆角, 严格的网格系统
 */
export const carbonTheme: DesignTokens = {
    ...defaultTokens,
    color: {
        ...defaultTokens.color,
        primary: {
            DEFAULT: '#0f62fe', // IBM Blue 60
            foreground: '#ffffff',
        },
        secondary: {
            DEFAULT: '#393939', // Gray 80
            foreground: '#ffffff',
        },
        success: { DEFAULT: '#24a148' },
        warning: { DEFAULT: '#f1c21b' },
        error: { DEFAULT: '#da1e28' },
        info: { DEFAULT: '#0043ce' },
        neutral: {
            ...defaultTokens.color.neutral,
            10: '#f4f4f4',
            20: '#e0e0e0',
            30: '#c6c6c6',
            40: '#a8a8a8',
            50: '#8d8d8d',
            60: '#6f6f6f',
            70: '#525252',
            80: '#393939',
            90: '#262626',
            100: '#161616',
        },
        background: {
            primary: '#ffffff',
            secondary: '#f4f4f4',
            inverse: '#161616',
        },
    },
    borderRadius: {
        none: '0',
        xs: '0',
        sm: '0',
        md: '0',
        lg: '0',
        full: '9999px', // 仅用于圆形
            xl: '12px',
    },
    boxShadow: {
        none: 'none',
        sm: '0 1px 2px 0 rgba(0,0,0,0.1)',
        DEFAULT: '0 2px 4px 0 rgba(0,0,0,0.1)',
        md: '0 4px 8px 0 rgba(0,0,0,0.1)',
        lg: '0 8px 16px 0 rgba(0,0,0,0.1)',
        hard: 'none',
        'hard-accent': 'none',
            xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    },
    typography: {
        ...defaultTokens.typography,
        fontFamily: {
            ...defaultTokens.typography.fontFamily,
            DEFAULT: "'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif",
        },
    },
};
