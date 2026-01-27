/** @jsxImportSource solid-js */
import { getInputClasses, type InputOptions } from '@sxo/ui';
import { type JSX, splitProps } from 'solid-js';

export type InputProps = InputOptions & Omit<JSX.InputHTMLAttributes<HTMLInputElement>, 'size'>;

export function Input(props: InputProps) {
    const [local, others] = splitProps(props, ['variant', 'size', 'class']);

    const classes = () => {
        const sxoClasses = getInputClasses({
            variant: local.variant,
            size: local.size,
        });
        return `${sxoClasses} ${local.class || ''}`.trim();
    };

    return <input {...others} class={classes() as any} />;
}
