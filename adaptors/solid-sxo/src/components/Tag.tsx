/** @jsxImportSource solid-js */
import { getTagClasses, type TagOptions } from '@sxo/ui';
import { type JSX, splitProps } from 'solid-js';

export type TagProps = TagOptions & JSX.HTMLAttributes<HTMLSpanElement>;

export function Tag(props: TagProps) {
    const [local, others] = splitProps(props, ['variant', 'color', 'rounded', 'class']);

    const classes = () => {
        const sxoClasses = getTagClasses({
            variant: local.variant,
            color: local.color,
            rounded: local.rounded,
        });
        return `${sxoClasses.base} ${local.class || ''}`.trim();
    };

    return (
        <span {...others} class={classes() as any}>
            {props.children as any}
        </span>
    );
}
