import { type DesignTokens, defaultTokens } from '@sxo/design';

export const halloweenTheme: DesignTokens = {
    ...defaultTokens,
    color: {
        ...defaultTokens.color,
        primary: {
            DEFAULT: '#ED6A43', // Pumpkin Orange (Light)
            foreground: '#FFFFFF',
        },
        secondary: {
            DEFAULT: '#8250DF', // Ghostly Purple (Light)
            foreground: '#FFFFFF',
        },
        accent: {
            DEFAULT: '#ED6A43',
            neon: '#FF9668',
            vivid: '#ED6A43',
        },
        background: {
            primary: '#F6F8FA', // Abyss Black (Light)
            secondary: '#FFFFFF',
            inverse: '#0D1117',
        },
        text: {
            primary: '#1F2328',
            secondary: '#656D76',
            muted: '#6E7781',
            inverse: '#FFFFFF',
        },
    },
    modes: {
        dark: {
            primary: {
                DEFAULT: '#FF9668', // Pumpkin Orange (Dark)
                foreground: '#000000',
            },
            secondary: {
                DEFAULT: '#A371F7', // Ghostly Purple (Dark)
                foreground: '#FFFFFF',
            },
            background: {
                primary: '#0D1117', // Abyss Black (Dark)
                secondary: '#161B22',
                inverse: '#F6F8FA',
            },
            text: {
                primary: '#F0F6FC',
                secondary: '#8B949E',
                muted: '#484F58',
                inverse: '#0D1117',
            },
        },
    },
    borderRadius: {
        ...defaultTokens.borderRadius,
        DEFAULT: '6px', // GitHub standard
    },
};

export default halloweenTheme;
