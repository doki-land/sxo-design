/** @jsxImportSource solid-js */
import { type ButtonOptions, getButtonClasses } from '@sxo/ui';
import { type JSX, splitProps } from 'solid-js';

export type ButtonProps = ButtonOptions & JSX.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: ButtonProps) {
    const [local, others] = splitProps(props, ['variant', 'size', 'rounded', 'class']);

    const classes = () => {
        const sxoClasses = getButtonClasses({
            variant: local.variant,
            size: local.size,
            rounded: local.rounded,
        });
        return `${sxoClasses} ${local.class || ''}`.trim();
    };

    return (
        <button {...others} class={classes() as any}>
            {props.children as any}
        </button>
    );
}
