import { type SkeletonOptions, getSkeletonClasses } from '@sxo/ui';
import { computed, defineComponent, h, type PropType } from 'vue';

export const Skeleton = defineComponent({
    name: 'SxoSkeleton',
    props: {
        /** 是否展示动画效果 */
        active: { type: Boolean, default: true },
        /** 是否圆角 */
        rounded: { type: Boolean, default: true },
        /** 骨架屏变体 */
        variant: {
            type: String as PropType<SkeletonOptions['variant']>,
            default: 'text',
        },
        /** 是否展示头像占位 */
        avatar: { type: Boolean, default: false },
        /** 是否展示标题占位 */
        title: { type: Boolean, default: true },
        /** 段落行数 */
        rows: { type: Number, default: 3 },
        /** 是否正在加载。如果为 false，则展示子组件内容 */
        loading: { type: Boolean, default: true },
    },
    setup(props, { slots, attrs }) {
        const classes = computed(() =>
            getSkeletonClasses({
                active: props.active,
                rounded: props.rounded,
                variant: props.variant,
            }),
        );

        const renderSkeleton = () => {
            // 如果指定了除 text 以外的特定变体，则渲染单体骨架
            if (props.variant && props.variant !== 'text') {
                return h('view', {
                    ...attrs,
                    class: [classes.value.base, attrs.class].filter(Boolean).join(' '),
                });
            }

            // 默认渲染组合型骨架
            return h('view', { ...attrs, class: [classes.value.root, attrs.class].filter(Boolean).join(' ') }, [
                (props.avatar || props.title) &&
                    h('view', { class: classes.value.header }, [
                        props.avatar && h('view', { class: classes.value.avatar }),
                        props.title && h('view', { class: classes.value.title }),
                    ]),
                h(
                    'view',
                    { class: classes.value.paragraph },
                    Array.from({ length: props.rows }).map((_, i) =>
                        h('view', {
                            class:
                                i === props.rows - 1 ? classes.value.lineLast : classes.value.line,
                        }),
                    ),
                ),
            ]);
        };

        return () => (props.loading ? renderSkeleton() : slots.default?.());
    },
});
