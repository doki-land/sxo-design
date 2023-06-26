import React, { createContext, useContext, useMemo, ReactNode } from 'react';
import { DesignTokens, defaultTokens } from '@sxo/design';
import {
  getButtonClasses,
  ButtonOptions,
  getInputClasses,
  InputOptions,
  getBadgeClasses,
  BadgeOptions,
  getTagClasses,
  TagOptions,
} from '@sxo/ui';

// --- Theme Context ---

export interface ThemeContextValue {
  tokens: DesignTokens;
}

const ThemeContext = createContext<ThemeContextValue>({
  tokens: defaultTokens,
});

export interface ThemeProviderProps {
  tokens?: Partial<DesignTokens>;
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ tokens, children }) => {
  const value = useMemo(
    () => ({
      tokens: { ...defaultTokens, ...tokens } as DesignTokens,
    }),
    [tokens],
  );

  return React.createElement(ThemeContext.Provider, { value }, children);
};

export const useTheme = () => useContext(ThemeContext);

// --- Components ---

// Button
export interface ButtonProps extends ButtonOptions, React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant,
  size,
  disabled,
  className,
  children,
  ...props
}) => {
  const classes = useMemo(() => {
    const sxoClasses = getButtonClasses({ variant, size, disabled });
    return `${sxoClasses} ${className || ''}`.trim();
  }, [variant, size, disabled, className]);

  return React.createElement(
    'button',
    {
      ...props,
      disabled,
      className: classes,
    },
    children,
  );
};

// Input
export interface InputProps extends InputOptions, React.InputHTMLAttributes<HTMLInputElement> {}

export const Input: React.FC<InputProps> = ({ variant, size, invalid, className, ...props }) => {
  const classes = useMemo(() => {
    const sxoClasses = getInputClasses({ variant, size, invalid });
    return `${sxoClasses} ${className || ''}`.trim();
  }, [variant, size, invalid, className]);

  return React.createElement('input', {
    ...props,
    className: classes,
  });
};

// Badge
export interface BadgeProps extends BadgeOptions, React.HTMLAttributes<HTMLSpanElement> {
  children?: ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({ variant, className, children, ...props }) => {
  const classes = useMemo(() => {
    const sxoClasses = getBadgeClasses({ variant });
    return `${sxoClasses} ${className || ''}`.trim();
  }, [variant, className]);

  return React.createElement(
    'span',
    {
      ...props,
      className: classes,
    },
    children,
  );
};

// Tag
export interface TagProps extends TagOptions, React.HTMLAttributes<HTMLSpanElement> {
  children?: ReactNode;
}

export const Tag: React.FC<TagProps> = ({
  variant,
  color,
  rounded,
  className,
  children,
  ...props
}) => {
  const classes = useMemo(() => {
    const sxoClasses = getTagClasses({ variant, color, rounded });
    return `${sxoClasses} ${className || ''}`.trim();
  }, [variant, color, rounded, className]);

  return React.createElement(
    'span',
    {
      ...props,
      className: classes,
    },
    children,
  );
};
