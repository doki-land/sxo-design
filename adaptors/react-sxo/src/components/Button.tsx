import React from 'react';
import { getButtonClasses, ButtonOptions } from '@sxo/ui';
import { useStyle } from '../hooks';

export interface ButtonProps extends ButtonOptions, React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant,
  size,
  disabled,
  rounded,
  className,
  children,
  ...props
}) => {
  const sxoClasses = getButtonClasses({ variant, size, disabled, rounded });
  const finalClasses = useStyle(`${sxoClasses} ${className || ''}`);

  return React.createElement(
    'button',
    {
      className: finalClasses,
      disabled,
      ...props,
    },
    children,
  );
};
