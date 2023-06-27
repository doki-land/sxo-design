import { type DesignTokens, defaultTokens } from '@sxo/design';

export const materialTheme: DesignTokens = {
    ...defaultTokens,
    color: {
        ...defaultTokens.color,
        primary: {
            DEFAULT: '#6750A4', // M3 Primary
            foreground: '#FFFFFF',
        },
        secondary: {
            DEFAULT: '#625B71', // M3 Secondary
            foreground: '#FFFFFF',
        },
        accent: {
            DEFAULT: '#7D5260', // M3 Tertiary
            neon: '#B3261E', // M3 Error
            vivid: '#6750A4',
        },
        success: {
            DEFAULT: '#4CAF50',
        },
        warning: {
            DEFAULT: '#FFC107',
        },
        error: {
            DEFAULT: '#B3261E',
        },
        info: {
            DEFAULT: '#2196F3',
        },
        neutral: {
            0: '#FFFFFF',
            50: '#F7F2FA',
            100: '#F3EDF7',
            200: '#E6E1E5',
            300: '#CAC4D0',
            400: '#938F99',
            500: '#79747E',
            600: '#49454F',
            700: '#1D1B20',
            800: '#1C1B1F',
            900: '#19171A',
            950: '#000000',
            1000: '#000000',
        },
        background: {
            primary: '#FFFBFE',
            secondary: '#F3EDF7',
            inverse: '#313033',
        },
        text: {
            primary: '#1C1B1F',
            secondary: '#49454F',
            muted: '#79747E',
            inverse: '#F4EFF4',
        },
    },
    borderRadius: {
        none: '0px',
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '16px',
        full: '9999px',
            xl: '12px',
    },
    boxShadow: {
        none: 'none',
        sm: '0px 1px 2px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)',
        DEFAULT: '0px 1px 2px rgba(0, 0, 0, 0.3), 0px 2px 6px 2px rgba(0, 0, 0, 0.15)',
        md: '0px 4px 8px 3px rgba(0, 0, 0, 0.15), 0px 1px 3px rgba(0, 0, 0, 0.3)',
        lg: '0px 6px 10px 4px rgba(0, 0, 0, 0.15), 0px 2px 3px rgba(0, 0, 0, 0.3)',
        hard: '0px 8px 12px 6px rgba(0, 0, 0, 0.15), 0px 4px 4px rgba(0, 0, 0, 0.3)',
        'hard-accent':
            '0px 8px 12px 6px rgba(103, 80, 164, 0.15), 0px 4px 4px rgba(103, 80, 164, 0.3)',
            xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    },
    typography: {
        ...defaultTokens.typography,
        fontFamily: {
            sans: '"Roboto", "Segoe UI", Tahoma, sans-serif',
            serif: '"Roboto Serif", Georgia, serif',
            mono: '"Roboto Mono", monospace',
        },
    },
    modes: {
        dark: {
            primary: {
                DEFAULT: '#D0BCFF', // M3 Dark Primary
                foreground: '#381E72',
            },
            secondary: {
                DEFAULT: '#CCC2DC', // M3 Dark Secondary
                foreground: '#332D41',
            },
            accent: {
                DEFAULT: '#EFB8C8', // M3 Dark Tertiary
                neon: '#F2B8B5', // M3 Dark Error
                vivid: '#D0BCFF',
            },
            neutral: {
                0: '#1C1B1F',
                50: '#1C1B1F',
                100: '#1D1B20',
                200: '#313033',
                300: '#49454F',
                400: '#79747E',
                500: '#938F99',
                600: '#CAC4D0',
                700: '#E6E1E5',
                800: '#F3EDF7',
                900: '#F7F2FA',
                1000: '#FFFFFF',
            },
            background: {
                primary: '#1C1B1F',
                secondary: '#1D1B20',
                inverse: '#E6E1E5',
            },
        },
    },
};

export default materialTheme;
