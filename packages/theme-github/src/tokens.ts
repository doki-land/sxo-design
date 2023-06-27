import { type DesignTokens, defaultTokens } from '@sxo/design';

export const githubTheme: DesignTokens = {
    ...defaultTokens,
    color: {
        ...defaultTokens.color,
        primary: {
            DEFAULT: '#0969da', // GitHub Blue
            foreground: '#ffffff',
        },
        secondary: {
            DEFAULT: '#f6f8fa', // GitHub Secondary Background (Light Gray)
            foreground: '#24292f', // Dark Text
        },
        accent: {
            DEFAULT: '#0969da',
            neon: '#3fb950', // GitHub Success Green
            vivid: '#cf222e', // GitHub Error Red
        },
        success: {
            DEFAULT: '#1a7f37',
        },
        warning: {
            DEFAULT: '#9a6700',
        },
        error: {
            DEFAULT: '#d1242f',
        },
        info: {
            DEFAULT: '#0969da',
        },
        neutral: {
            0: '#ffffff',
            50: '#f6f8fa',
            100: '#eaeef2',
            200: '#d0d7de',
            300: '#afb8c1',
            400: '#8c959f',
            500: '#6e7781',
            600: '#57606a',
            700: '#424a53',
            800: '#32383f',
            900: '#24292f',
            950: '#1b1f24',
            1000: '#010409',
        },
        background: {
            primary: '#ffffff',
            secondary: '#f6f8fa',
            inverse: '#24292f',
        },
        text: {
            primary: '#24292f',
            secondary: '#57606a',
            muted: '#8c959f',
            inverse: '#ffffff',
        },
    },
    modes: {
        dark: {
            primary: {
                DEFAULT: '#58a6ff',
                foreground: '#ffffff',
            },
            background: {
                primary: '#0d1117',
                secondary: '#161b22',
                inverse: '#ffffff',
            },
            neutral: {
                0: '#0d1117',
                50: '#161b22',
                100: '#21262d',
                200: '#30363d',
                300: '#484f58',
                400: '#6e7681',
                500: '#8b949e',
                600: '#b1bac4',
                700: '#c9d1d9',
                800: '#d0d7de',
                900: '#f0f6fb',
                950: '#ffffff',
                1000: '#ffffff',
            },
        },
    },
    borderRadius: {
        none: '0px',
        xs: '2px',
        sm: '6px', // GitHub standard
        md: '8px',
        lg: '12px',
        full: '9999px',
            xl: '12px',
    },
    boxShadow: {
        none: 'none',
        sm: '0 1px 0 rgba(27,31,36,0.04)',
        DEFAULT: '0 3px 6px rgba(140,149,159,0.15)',
        md: '0 8px 24px rgba(140,149,159,0.2)',
        lg: '0 12px 28px rgba(140,149,159,0.3)',
        hard: '0 0 0 1px rgba(27,31,36,0.15)',
        'hard-accent': '0 0 0 1px #0969da',
            xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    },
    typography: {
        ...defaultTokens.typography,
        fontFamily: {
            sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
            serif: 'Georgia, "Times New Roman", serif',
            mono: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
        },
    },
};

export default githubTheme;
