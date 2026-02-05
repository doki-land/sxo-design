import { type DesignTokens, defaultTokens } from '@sxo/design';

/**
 * 纠缠之缘 (Intertwined Fate) - 官方主题
 * 支持双模式切换，模拟原神纠缠之缘配色
 */
export const fateTheme: DesignTokens = {
    ...defaultTokens,
    color: {
        ...defaultTokens.color,
        primary: {
            DEFAULT: '#D4AF37', // 金色 (修仙主题)
            foreground: '#1A1A1A',
        },
        secondary: {
            DEFAULT: '#8B4513', // 古木色
            foreground: '#FFFFFF',
        },
        accent: {
            DEFAULT: '#2E8B57', // 灵气绿
            neon: '#00FF7F',
            vivid: '#FFD700',
        },
        success: {
            DEFAULT: '#52C41A',
        },
        warning: {
            DEFAULT: '#FAAD14',
        },
        error: {
            DEFAULT: '#FF4D4F',
        },
        info: {
            DEFAULT: '#D4AF37',
        },
        neutral: {
            0: '#FFFFFF',
            50: '#FAF9F6', // 宣纸色
            100: '#F0EEE9',
            200: '#E6E1D6',
            300: '#D9D1C0',
            400: '#BFB59B',
            500: '#A69B7C',
            600: '#8C8161',
            700: '#736A4D',
            800: '#59523B',
            900: '#403B2A',
            950: '#262319',
            1000: '#0D0C09',
        },
        background: {
            primary: '#FDFCF8',
            secondary: 'rgba(253, 252, 248, 0.9)',
            inverse: '#1A1A1A',
        },
    },
    borderRadius: {
        DEFAULT: '4px', // 更硬朗的边框，符合古风
        none: '0px',
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '12px',
        full: '9999px',
        xl: '16px',
    },
    boxShadow: {
        none: 'none',
        sm: '0 2px 10px rgba(74, 144, 226, 0.1)',
        DEFAULT: '0 4px 20px rgba(74, 144, 226, 0.15)',
        md: '0 8px 30px rgba(74, 144, 226, 0.2)',
        lg: '0 12px 40px rgba(74, 144, 226, 0.25)',
        hard: '0 0 15px rgba(240, 98, 146, 0.3)',
        'hard-accent': '0 0 20px rgba(240, 98, 146, 0.5)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    },
    transition: {
        DEFAULT: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        fast: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        slow: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
    },
    modes: {
        dark: {
            primary: {
                DEFAULT: '#1B3B5F',
                foreground: '#E0E6ED',
            },
            secondary: {
                DEFAULT: '#880E4F',
                foreground: '#E0E6ED',
            },
            accent: {
                DEFAULT: '#4A235A',
                neon: '#0E6251',
                vivid: '#935116',
            },
            neutral: {
                0: '#0B0E14',
                50: '#1B293B',
                100: '#2C3E50',
                200: '#334155',
                300: '#475569',
                400: '#64748B',
                500: '#7F8C8D',
                600: '#94A3B8',
                700: '#B0BCCB',
                800: '#D1D9E6',
                900: '#E0E6ED',
                950: '#F5F7FA',
                1000: '#FFFFFF',
            },
            background: {
                primary: '#0B0E14',
                secondary: 'rgba(11, 14, 20, 0.8)',
                inverse: '#F5F7FA',
            },
        },
    },
};

export default fateTheme;
