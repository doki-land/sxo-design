import { type DesignTokens, defaultTokens } from '@sxo/design';

export const wechatTheme: DesignTokens = {
    ...defaultTokens,
    color: {
        ...defaultTokens.color,
        primary: {
            DEFAULT: '#07C160', // WeChat Green
            foreground: '#ffffff',
        },
        secondary: {
            DEFAULT: '#10AEFF', // WeChat Blue
            foreground: '#ffffff',
        },
        accent: {
            DEFAULT: '#07C160',
            neon: '#07C160',
            vivid: '#FA5151', // WeChat Red (Error)
        },
        success: {
            DEFAULT: '#07C160',
        },
        warning: {
            DEFAULT: '#FFBE00',
        },
        error: {
            DEFAULT: '#FA5151',
        },
        info: {
            DEFAULT: '#10AEFF',
        },
        neutral: {
            0: '#ffffff',
            50: '#F7F7F7',
            100: '#EDEDED',
            200: '#E5E5E5',
            300: '#D1D1D1',
            400: '#B2B2B2',
            500: '#888888',
            600: '#757575',
            700: '#4C4C4C',
            800: '#333333',
            900: '#191919',
            1000: '#000000',
        },
        background: {
            primary: '#ffffff',
            secondary: '#F7F7F7',
            inverse: '#191919',
        },
    },
    borderRadius: {
        none: '0px',
        xs: '2px',
        sm: '4px',
        md: '8px', // WeUI standard
        lg: '12px',
        full: '9999px',
            xl: '12px',
    },
    boxShadow: {
        none: 'none',
        sm: '0 1px 2px rgba(0,0,0,0.05)',
        DEFAULT: '0 4px 12px rgba(0,0,0,0.05)',
        md: '0 8px 24px rgba(0,0,0,0.08)',
        lg: '0 12px 32px rgba(0,0,0,0.12)',
        hard: '0 0 0 1px rgba(0,0,0,0.1)',
        'hard-accent': '0 0 0 1px #07C160',
            xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    },
    typography: {
        ...defaultTokens.typography,
        fontFamily: {
            sans: '-apple-system-font, "Helvetica Neue", Helvetica, sans-serif',
            serif: 'Georgia, "Times New Roman", serif',
            mono: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
        },
    },
};

export default wechatTheme;
