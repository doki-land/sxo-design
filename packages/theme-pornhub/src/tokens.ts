import { DesignTokens, defaultTokens } from '@sxo/design';

export const pornhubTheme: DesignTokens = {
  ...defaultTokens,
  color: {
    ...defaultTokens.color,
    primary: {
      DEFAULT: '#FF9900', // PornHub Brand Orange
      foreground: '#000000',
    },
    secondary: {
      DEFAULT: '#1B1B1B', // PornHub Container Background
      foreground: '#FFFFFF',
    },
    accent: {
      DEFAULT: '#FF9900',
      neon: '#FF9900',
      vivid: '#FFA31A',
    },
    neutral: {
      0: '#FFFFFF',
      50: '#F4F4F4',
      100: '#E0E0E0',
      200: '#B2B2B2',
      300: '#757575',
      400: '#424242',
      500: '#282828',
      600: '#1B1B1B',
      700: '#1A1A1A',
      800: '#111111',
      900: '#0A0A0A',
      950: '#050505',
      1000: '#000000',
    },
    background: {
      primary: '#000000', // Main Background
      secondary: '#1B1B1B', // Container Background
      inverse: '#FFFFFF',
    },
  },
  borderRadius: {
    none: '0px',
    xs: '2px',
    sm: '4px', // Standard Hub Radius
    md: '8px',
    lg: '12px',
    full: '9999px',
  },
  boxShadow: {
    ...defaultTokens.boxShadow,
    sm: 'none',
    DEFAULT: 'none',
    md: 'none',
    lg: 'none',
    hard: '0 0 0 1px #1A1A1A',
    'hard-accent': '0 0 0 1px #FF9900',
  },
  typography: {
    ...defaultTokens.typography,
    fontFamily: {
      sans: 'Arial, Helvetica, sans-serif', // Clean, professional sans-serif
      serif: 'Georgia, serif',
      mono: 'monospace',
    },
  },
};

export default pornhubTheme;
