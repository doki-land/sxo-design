import { getSkeletonClasses } from '@sxo/ui';
import { computed, defineComponent, h } from 'vue';

export const Skeleton = defineComponent({
    name: 'SxoSkeleton',
    props: {
        /** 是否展示动画效果 */
        active: { type: Boolean, default: true },
        /** 是否圆角 */
        rounded: { type: Boolean, default: true },
        /** 是否展示头像占位 */
        avatar: { type: Boolean, default: false },
        /** 是否展示标题占位 */
        title: { type: Boolean, default: true },
        /** 段落行数 */
        rows: { type: Number, default: 3 },
        /** 是否正在加载。如果为 false，则展示子组件内容 */
        loading: { type: Boolean, default: true },
    },
    setup(props, { slots }) {
        const classes = computed(() =>
            getSkeletonClasses({
                active: props.active,
                rounded: props.rounded,
            }),
        );

        const renderSkeleton = () => {
            return h('div', { class: classes.value.root }, [
                (props.avatar || props.title) &&
                    h('div', { class: classes.value.header }, [
                        props.avatar && h('div', { class: classes.value.avatar }),
                        props.title && h('div', { class: classes.value.title }),
                    ]),
                h(
                    'div',
                    { class: classes.value.paragraph },
                    Array.from({ length: props.rows }).map((_, i) =>
                        h('div', {
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
