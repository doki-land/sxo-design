import {
    getSpinnerClasses,
    getProgressClasses,
    getSkeletonClasses,
    type SpinnerOptions,
    type ProgressOptions,
    type SkeletonOptions,
} from '@sxo/ui';
import { defineComponent, h, type PropType, computed } from 'vue';
import { useStyle } from '../hooks';

export const Spinner = defineComponent({
    name: 'SxoSpinner',
    props: {
        size: {
            type: String as PropType<SpinnerOptions['size']>,
            default: 'md',
        },
        color: {
            type: String as PropType<SpinnerOptions['color']>,
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
                class: `${className} ${attrs.class || ''}`.trim(),
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
            type: String as PropType<ProgressOptions['color']>,
            default: 'primary',
        },
        size: {
            type: String as PropType<ProgressOptions['size']>,
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
            h('div', { class: `${classes.root} ${attrs.class || ''}`.trim() }, [
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
            type: String as PropType<SkeletonOptions['variant']>,
            default: 'rect',
        },
        width: [String, Number],
        height: [String, Number],
        animate: {
            type: Boolean,
            default: true,
        },
        loading: {
            type: Boolean,
            default: true,
        },
        rows: {
            type: Number,
            default: 0,
        },
        avatar: {
            type: Boolean,
            default: false,
        },
    },
    setup(props, { attrs, slots }) {
        const styles = computed(() =>
            getSkeletonClasses({
                variant: props.variant,
                animate: props.animate,
            }),
        );

        useStyle(() => styles.value.base);

        const getStyle = (w?: string | number, h?: string | number) => {
            const style: any = {};
            if (w) style.width = typeof w === 'number' ? `${w}px` : w;
            if (h) style.height = typeof h === 'number' ? `${h}px` : h;
            return style;
        };

        const renderSkeleton = () => {
            if (props.rows > 0 || props.avatar) {
                return h('div', { class: styles.value.container }, [
                    h('div', { class: styles.value.row }, [
                        props.avatar &&
                            h('div', {
                                class: getSkeletonClasses({
                                    variant: 'avatar',
                                    animate: props.animate,
                                }).base,
                            }),
                        h('div', { class: 'flex-1 space-y-2' }, [
                            h('div', {
                                class: getSkeletonClasses({
                                    variant: 'text',
                                    animate: props.animate,
                                }).base,
                                style: { width: '40%' },
                            }),
                            h('div', {
                                class: getSkeletonClasses({
                                    variant: 'text',
                                    animate: props.animate,
                                }).base,
                            }),
                        ]),
                    ]),
                    ...Array.from({ length: Math.max(0, props.rows - 1) }).map(() =>
                        h('div', {
                            class: getSkeletonClasses({ variant: 'text', animate: props.animate })
                                .base,
                        }),
                    ),
                ]);
            }

            return h('div', {
                class: [styles.value.base, attrs.class],
                style: getStyle(props.width, props.height),
            });
        };

        return () => (props.loading ? renderSkeleton() : slots.default?.());
    },
});
