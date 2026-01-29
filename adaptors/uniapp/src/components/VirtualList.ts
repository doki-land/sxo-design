import { useVirtualList } from '@sxo/design';
import { getVirtualListClasses } from '@sxo/ui';
import { computed, defineComponent, h, type PropType, ref } from 'vue';

export const VirtualList = defineComponent({
    name: 'SxoVirtualList',
    props: {
        /** 数据源 */
        items: {
            type: Array as PropType<any[]>,
            required: true,
        },
        /** 每一项的高度 */
        itemHeight: {
            type: Number,
            required: true,
        },
        /** 容器高度 */
        containerHeight: {
            type: Number,
            default: 400,
        },
        /** 额外渲染的数量 */
        overscan: {
            type: Number,
            default: 5,
        },
    },
    setup(props, { slots }) {
        const scrollTop = ref(0);
        const containerRef = ref<HTMLElement | null>(null);

        const virtual = computed(() =>
            useVirtualList({
                itemHeight: props.itemHeight,
                totalItems: props.items.length,
                containerHeight: props.containerHeight,
                overscan: props.overscan,
            }),
        );

        const classes = computed(() => getVirtualListClasses());

        const handleScroll = (e: Event) => {
            scrollTop.value = (e.target as HTMLElement).scrollTop;
        };

        return () => {
            const { start, end } = virtual.value.getVisibleRange(scrollTop.value);
            const visibleItems = props.items.slice(start, end);

            return h(
                'div',
                {
                    ...virtual.value.getContainerProps(),
                    ref: containerRef,
                    onScroll: handleScroll,
                    class: classes.value.container,
                },
                [
                    h(
                        'div',
                        {
                            ...virtual.value.getWrapperProps(),
                            class: classes.value.wrapper,
                        },
                        visibleItems.map((item, index) => {
                            const actualIndex = start + index;
                            return h(
                                'div',
                                {
                                    ...virtual.value.getItemProps(actualIndex),
                                    key: actualIndex,
                                    class: classes.value.item,
                                },
                                slots.default
                                    ? slots.default({ item: item || {}, index: actualIndex })
                                    : undefined,
                            );
                        }),
                    ),
                ],
            );
        };
    },
});
