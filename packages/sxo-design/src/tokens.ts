/**
 * 递归获取令牌路径类型
 */
export type Join<K, P> = K extends string | number
    ? P extends string | number
        ? `${K}${'' extends P ? '' : '.'}${P}`
        : never
    : never;

export type Leaves<T> = T extends object
    ? { [K in keyof T]-?: Join<K, Leaves<T[K]>> }[keyof T]
    : '';

export interface DesignTokens {
    color: {
        white: string;
        black: string;
        primary: {
            DEFAULT: string;
            foreground: string;
        };
        secondary: {
            DEFAULT: string;
            foreground: string;
        };
        accent: {
            DEFAULT: string;
            neon: string;
            vivid: string;
        };
        success: { DEFAULT: string };
        warning: { DEFAULT: string };
        error: { DEFAULT: string };
        info: { DEFAULT: string };
        neutral: Record<number | string, string>;
        background: {
            primary: string;
            secondary: string;
            inverse: string;
        };
        text: {
            primary: string;
            secondary: string;
            muted: string;
            inverse: string;
        };
    };
    spacing: Record<string, string>;
    maxWidth?: Record<string, string>;
    borderRadius: {
        DEFAULT: string;
        none: string;
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
        full: string;
        [key: string]: string;
    };
    boxShadow: {
        none: string;
        sm: string;
        DEFAULT: string;
        md: string;
        lg: string;
        xl: string;
        hard: string;
        'hard-accent': string;
        [key: string]: string;
    };
    typography: {
        fontSize: Record<string, string>;
        fontWeight: Record<string, string>;
        lineHeight: Record<string, string>;
        fontFamily: Record<string, string>;
    };
    breakpoints: Record<string, string>;
    transition: {
        DEFAULT: string;
        fast: string;
        slow: string;
    };
    animation: Record<string, string>;
    modes?: {
        dark?: Partial<DesignTokens['color']>;
    };
}

/**
 * 所有的令牌路径类型 (例如: "color.accent.neon")
 */
export type TokenPath = Leaves<DesignTokens>;

export const defaultTokens: DesignTokens = {
    color: {
        white: '#ffffff',
        black: '#0f172a',
        primary: {
            DEFAULT: '#6366f1', // Indigo 500
            foreground: '#ffffff',
        },
        secondary: {
            DEFAULT: '#f8fafc', // Slate 50
            foreground: '#0f172a',
        },
        accent: {
            DEFAULT: '#0ea5e9', // Sky 500
            neon: '#8b5cf6', // Violet 500
            vivid: '#ec4899', // Pink 500
        },
        success: {
            DEFAULT: '#10b981', // Emerald 500
        },
        warning: {
            DEFAULT: '#f59e0b', // Amber 500
        },
        error: {
            DEFAULT: '#ef4444', // Red 500
        },
        info: {
            DEFAULT: '#3b82f6', // Blue 500
        },
        neutral: {
            0: '#ffffff',
            50: '#f8fafc',
            100: '#f1f5f9',
            200: '#e2e8f0',
            300: '#cbd5e1',
            400: '#94a3b8',
            500: '#64748b',
            600: '#475569',
            700: '#334155',
            800: '#1e293b',
            900: '#0f172a',
            950: '#020617',
        },
        background: {
            primary: '#FFFFFF',
            secondary: '#fafafa',
            inverse: '#000000',
        },
        text: {
            primary: '#000000',
            secondary: '#444444',
            muted: '#666666',
            inverse: '#FFFFFF',
        },
    },
    spacing: {
        '0': '0px',
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '5': '20px',
        '6': '24px',
        '8': '32px',
        '10': '40px',
        '12': '48px',
        '16': '64px',
        '20': '80px',
        '24': '96px',
        '32': '128px',
        '40': '160px',
        '48': '192px',
        '56': '224px',
        '64': '256px',
    },
    maxWidth: {
        none: 'none',
        xs: '20rem',
        sm: '24rem',
        md: '28rem',
        lg: '32rem',
        xl: '36rem',
        '2xl': '42rem',
        '3xl': '48rem',
        '4xl': '56rem',
        '5xl': '64rem',
        '6xl': '72rem',
        '7xl': '80rem',
        full: '100%',
        min: 'min-content',
        max: 'max-content',
        fit: 'fit-content',
        prose: '65ch',
    },
    borderRadius: {
        DEFAULT: '0.25rem',
        none: '0',
        xs: '0.125rem',
        sm: '0.25rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
        full: '9999px',
    },
    boxShadow: {
        none: 'none',
        sm: '0 2px 4px rgba(0,0,0,0.1)',
        DEFAULT: '0 5px 10px rgba(0,0,0,0.12)',
        md: '0 8px 30px rgba(0,0,0,0.12)',
        lg: '0 30px 60px rgba(0,0,0,0.12)',
        xl: '0 30px 60px rgba(0,0,0,0.12)',
        '2xl': '0 60px 120px rgba(0,0,0,0.15)',
        inner: 'inset 0 2px 4px 0 rgba(0,0,0,0.06)',
        hard: '0 0 0 1px rgba(0,0,0,0.1)',
        'hard-accent': '0 0 0 2px var(--sxo-accent-primary)',
    },
    typography: {
        fontSize: {
            xs: '12px',
            sm: '14px',
            base: '16px',
            lg: '18px',
            xl: '20px',
            '2xl': '24px',
            '3xl': '32px',
            '4xl': '48px',
            '5xl': '64px',
            '6xl': '96px',
            '7xl': '128px',
        },
        fontWeight: {
            thin: '100',
            light: '300',
            normal: '400',
            medium: '500',
            semibold: '600',
            bold: '700',
            black: '900',
        },
        lineHeight: {
            none: '1',
            tight: '1.2',
            snug: '1.3',
            normal: '1.5',
            relaxed: '1.625',
            loose: '2',
        },
        fontFamily: {
            sans: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
            serif: '"Playfair Display", Georgia, serif',
            mono: 'Menlo, Monaco, Lucida Console, "Liberation Mono", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Courier New", monospace',
        },
    },
    breakpoints: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
    },
    transition: {
        DEFAULT: '150ms ease',
        fast: '100ms ease',
        slow: '300ms ease',
    },
    animation: {
        'fade-in': 'fade-in 0.2s ease-out',
        'slide-in-top': 'slide-in-top 0.2s ease-out',
        'slide-in-bottom': 'slide-in-bottom 0.2s ease-out',
        'scale-in': 'scale-in 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        bounce: 'bounce 1s infinite',
        spin: 'spin 1s linear infinite',
        ping: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
        shake: 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both',
        'zoom-in': 'zoom-in 0.2s ease-out',
        'zoom-out': 'zoom-out 0.2s ease-out',
        gradient: 'gradient 8s linear infinite',
    },
    modes: {
        dark: {
            background: {
                primary: '#000000',
                secondary: '#111111',
                inverse: '#FFFFFF',
            },
            text: {
                primary: '#FFFFFF',
                secondary: '#a1a1aa',
                muted: '#71717a',
                inverse: '#000000',
            },
            neutral: {
                0: '#000000',
                50: '#111111',
                100: '#333333',
                200: '#444444',
                300: '#666666',
                400: '#888888',
                500: '#999999',
                600: '#aaaaaa',
                700: '#cccccc',
                800: '#eaeaea',
                900: '#fafafa',
                950: '#ffffff',
                1000: '#ffffff',
            },
        },
    },
};
