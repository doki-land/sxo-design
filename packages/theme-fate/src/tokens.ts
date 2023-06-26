import { DesignTokens, defaultTokens } from '@sxo/design';

/**
 * 纠缠之缘 (Intertwined Fate) - 官方主题
 * 支持双模式切换，模拟原神纠缠之缘配色
 */
export const fateTheme: DesignTokens = {
  ...defaultTokens,
  color: {
    ...defaultTokens.color,
    primary: {
      DEFAULT: '#4A90E2', // 蓝色
      foreground: '#FFFFFF',
    },
    secondary: {
      DEFAULT: '#F06292', // 粉色
      foreground: '#FFFFFF',
    },
    accent: {
      DEFAULT: '#9B59B6', // 紫色
      neon: '#48C9B0', // 绿色
      vivid: '#F39C12', // 橙色
    },
    success: {
      DEFAULT: '#48C9B0',
    },
    warning: {
      DEFAULT: '#F39C12',
    },
    error: {
      DEFAULT: '#E74C3C',
    },
    info: {
      DEFAULT: '#4A90E2',
    },
    neutral: {
      0: '#FFFFFF',
      50: '#F5F7FA',
      100: '#E0E6ED',
      200: '#D1D9E6',
      300: '#B0BCCB',
      400: '#94A3B8',
      500: '#7F8C8D',
      600: '#64748B',
      700: '#475569',
      800: '#334155',
      900: '#2C3E50',
      950: '#1E293B',
      1000: '#0F172A',
    },
    background: {
      primary: '#F5F7FA',
      secondary: 'rgba(255, 255, 255, 0.8)', // 模拟毛玻璃
      inverse: '#0B0E14',
    },
  },
  borderRadius: {
    none: '0px',
    xs: '4px',
    sm: '12px',
    md: '16px',
    lg: '24px',
    full: '9999px',
  },
  boxShadow: {
    sm: '0 2px 10px rgba(74, 144, 226, 0.1)',
    DEFAULT: '0 4px 20px rgba(74, 144, 226, 0.15)',
    md: '0 8px 30px rgba(74, 144, 226, 0.2)',
    lg: '0 12px 40px rgba(74, 144, 226, 0.25)',
    hard: '0 0 15px rgba(240, 98, 146, 0.3)',
    'hard-accent': '0 0 20px rgba(240, 98, 146, 0.5)',
  },
  transition: {
    DEFAULT: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    fast: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    slow: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  dark: {
    color: {
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
    boxShadow: {
      sm: '0 2px 10px rgba(0, 0, 0, 0.5)',
      DEFAULT: '0 4px 20px rgba(0, 0, 0, 0.6)',
      md: '0 8px 30px rgba(0, 0, 0, 0.7)',
      lg: '0 12px 40px rgba(0, 0, 0, 0.8)',
      hard: '0 0 15px rgba(240, 98, 146, 0.2)',
      'hard-accent': '0 0 20px rgba(240, 98, 146, 0.4)',
    },
  },
};

export default fateTheme;
