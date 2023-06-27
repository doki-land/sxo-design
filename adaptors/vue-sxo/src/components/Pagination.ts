import { defineComponent, h, computed, type PropType } from 'vue';
import { getPaginationClasses, type PaginationOptions } from '@sxo/ui';
import { useStyle } from '../hooks';

export const Pagination = defineComponent({
    name: 'SxoPagination',
    props: {
        total: { type: Number, default: 0 },
        pageSize: { type: Number, default: 10 },
        modelValue: { type: Number, default: 1 },
        current: { type: Number },
        size: { type: String as PropType<PaginationOptions['size']>, default: 'md' },
        variant: { type: String as PropType<PaginationOptions['variant']>, default: 'outline' },
        rounded: { type: Boolean, default: true },
        showTotal: { type: Boolean, default: false },
        showJumper: { type: Boolean, default: false },
    },
    emits: ['update:modelValue', 'update:current', 'change'],
    setup(props, { emit, attrs }) {
        const activePage = computed(() => props.current ?? props.modelValue);
        const totalPages = computed(() => Math.ceil(props.total / props.pageSize));

        const classes = computed(() =>
            getPaginationClasses({
                size: props.size,
                variant: props.variant,
                rounded: props.rounded,
            }),
        );

        useStyle(() => {
            const c = classes.value;
            return `${c.container} ${c.item} ${c.active} ${c.disabled} ${c.ellipsis} ${
                attrs.class || ''
            }`;
        });

        const changePage = (page: number) => {
            if (page < 1 || page > totalPages.value || page === activePage.value) return;
            emit('update:modelValue', page);
            emit('update:current', page);
            emit('change', page);
        };

        const renderItems = () => {
            const items = [];
            const current = activePage.value;
            const total = totalPages.value;

            // Previous button
            items.push(
                h(
                    'li',
                    {
                        class: [classes.value.item, current === 1 && classes.value.disabled],
                        onClick: () => changePage(current - 1),
                    },
                    '<',
                ),
            );

            // Page numbers with ellipsis logic
            if (total <= 7) {
                for (let i = 1; i <= total; i++) {
                    items.push(renderPageItem(i));
                }
            } else {
                items.push(renderPageItem(1));
                if (current > 4) items.push(h('li', { class: classes.value.ellipsis }, '...'));

                const start = Math.max(2, current - 2);
                const end = Math.min(total - 1, current + 2);

                for (let i = start; i <= end; i++) {
                    items.push(renderPageItem(i));
                }

                if (current < total - 3)
                    items.push(h('li', { class: classes.value.ellipsis }, '...'));
                items.push(renderPageItem(total));
            }

            // Next button
            items.push(
                h(
                    'li',
                    {
                        class: [classes.value.item, current === total && classes.value.disabled],
                        onClick: () => changePage(current + 1),
                    },
                    '>',
                ),
            );

            return items;
        };

        const renderPageItem = (page: number) => {
            return h(
                'li',
                {
                    key: page,
                    class: [classes.value.item, activePage.value === page && classes.value.active],
                    onClick: () => changePage(page),
                },
                page,
            );
        };

        return () =>
            h('nav', { class: [classes.value.container, attrs.class] }, [
                props.showTotal &&
                    h('span', { class: classes.value.total }, `Total ${props.total}`),
                h('ul', { class: 'flex items-center gap-1 list-none p-0 m-0' }, renderItems()),
                props.showJumper &&
                    h('div', { class: classes.value.jumper }, [
                        'Go to',
                        h('input', {
                            class: 'w-12 h-8 px-2 border rounded text-center outline-none focus:border-primary-500',
                            type: 'number',
                            onKeyup: (e: KeyboardEvent) => {
                                if (e.key === 'Enter') {
                                    const val = parseInt((e.target as HTMLInputElement).value);
                                    if (!isNaN(val)) changePage(val);
                                }
                            },
                        }),
                    ]),
            ]);
    },
});
