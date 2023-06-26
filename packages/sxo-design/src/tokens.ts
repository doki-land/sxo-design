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
  };
  spacing: Record<string, string>;
  borderRadius: {
    none: string;
    xs: string;
    sm: string;
    md: string;
    lg: string;
    full: string;
  };
  boxShadow: {
    sm: string;
    DEFAULT: string;
    md: string;
    lg: string;
    hard: string;
    'hard-accent': string;
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
}

/**
 * 所有的令牌路径类型 (例如: "color.accent.neon")
 */
export type TokenPath = Leaves<DesignTokens>;

export const defaultTokens: DesignTokens = {
  color: {
    primary: {
      DEFAULT: '#000000',
      foreground: '#FFFFFF',
    },
    secondary: {
      DEFAULT: '#1A1A1A',
      foreground: '#FFFFFF',
    },
    accent: {
      DEFAULT: '#0057FF', // 电光蓝
      neon: '#00FF94', // 霓虹绿
      vivid: '#FF003D', // 鲜红
    },
    success: {
      DEFAULT: '#00FF94',
    },
    warning: {
      DEFAULT: '#FFD600',
    },
    error: {
      DEFAULT: '#FF003D',
    },
    info: {
      DEFAULT: '#00D1FF',
    },
    neutral: {
      0: '#FFFFFF',
      50: '#FAFAFA',
      100: '#F5F5F5',
      200: '#EEEEEE',
      300: '#E0E0E0',
      400: '#BDBDBD',
      500: '#9E9E9E',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
      950: '#0A0A0A',
      1000: '#000000',
    },
    background: {
      primary: '#FFFFFF',
      secondary: '#F5F5F5',
      inverse: '#000000',
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
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
  borderRadius: {
    none: '0px',
    xs: '2px',
    sm: '4px',
    md: '8px',
    lg: '12px',
    full: '9999px',
  },
  boxShadow: {
    // 更加细腻的阴影，模拟环境光
    sm: '0 1px 2px rgba(0,0,0,0.05)',
    DEFAULT: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
    md: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)',
    lg: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)',
    // 极致对比度的硬投影，增加高级感
    hard: '4px 4px 0px #000000',
    'hard-accent': '4px 4px 0px #0057FF',
  },
  typography: {
    fontSize: {
      xs: '12px',
      sm: '14px',
      base: '16px',
      lg: '18px',
      xl: '20px',
      '2xl': '24px',
      '3xl': '30px',
      '4xl': '36px',
      '5xl': '48px',
      '6xl': '60px',
      '7xl': '72px',
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
      tight: '1.1',
      snug: '1.25',
      normal: '1.5',
      relaxed: '1.625',
      loose: '2',
    },
    fontFamily: {
      // 采用更具现代感的字体栈
      sans: '"Inter", "Inter var", system-ui, -apple-system, sans-serif',
      serif: '"Playfair Display", "Fraunces", Georgia, serif',
      mono: '"JetBrains Mono", "SF Mono", menlo, monospace',
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
    DEFAULT: '300ms cubic-bezier(0.16, 1, 0.3, 1)', // 典型的现代 Ease-Out
    fast: '150ms cubic-bezier(0.16, 1, 0.3, 1)',
    slow: '500ms cubic-bezier(0.16, 1, 0.3, 1)',
  },
};
