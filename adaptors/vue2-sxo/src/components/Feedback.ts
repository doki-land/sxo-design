import {
    getSpinnerClasses,
    getProgressClasses,
    getSkeletonClasses,
    type SpinnerOptions,
    type ProgressOptions,
    type SkeletonOptions,
} from '@sxo/ui';
import { defineComponent, h } from 'vue';
import { useStyle } from '../hooks';

export const Spinner = defineComponent({
    name: 'SxoSpinner',
    props: {
        size: {
            type: String as () => SpinnerOptions['size'],
            default: 'md',
        },
        color: {
            type: String as () => SpinnerOptions['color'],
            default: 'primary',
        },
    },
    setup(props, { attrs }) {
        const className = getSpinnerClasses({
            size: props.size,
            color: props.color,
        });
        useStyle(() => className);

        return () =>
            h('div', {
                attrs,
                class: className,
            });
    },
});

export const Progress = defineComponent({
    name: 'SxoProgress',
    props: {
        value: {
            type: Number,
            required: true,
        },
        max: {
            type: Number,
            default: 100,
        },
        color: {
            type: String as () => ProgressOptions['color'],
            default: 'primary',
        },
        size: {
            type: String as () => ProgressOptions['size'],
            default: 'md',
        },
    },
    setup(props, { attrs }) {
        const classes = getProgressClasses({
            value: props.value,
            max: props.max,
            color: props.color,
            size: props.size,
        });

        useStyle(() => `${classes.root} ${classes.bar}`);

        return () =>
            h('div', { attrs, class: classes.root }, [
                h('div', {
                    class: classes.bar,
                    style: { width: `${classes.percentage}%` },
                }),
            ]);
    },
});

export const Skeleton = defineComponent({
    name: 'SxoSkeleton',
    props: {
        variant: {
            type: String as () => SkeletonOptions['variant'],
            default: 'rect',
        },
        width: [String, Number],
        height: [String, Number],
        animate: {
            type: Boolean,
            default: true,
        },
    },
    setup(props, { attrs }) {
        const className = getSkeletonClasses({
            variant: props.variant,
            animate: props.animate,
        });

        useStyle(() => className);

        const style = {
            width: typeof props.width === 'number' ? `${props.width}px` : props.width,
            height: typeof props.height === 'number' ? `${props.height}px` : props.height,
        };

        return () =>
            h('div', {
                attrs,
                class: className,
                style,
            });
    },
});

export const Feedback = {
    Spinner,
    Progress,
    Skeleton,
};
