import { useSelection, useTable } from '@sxo/design';
import { getTableClasses, type TableOptions } from '@sxo/ui';
import { computed, defineComponent, h, type PropType, ref } from 'vue';
import { Checkbox as SxoCheckbox } from './Checkbox';
import { Pagination as SxoPagination } from './Pagination';
import { VirtualList as SxoVirtualList } from './VirtualList';

export interface Column<T> {
    key: string;
    header: string;
    sortable?: boolean;
    width?: string | number;
    render?: (row: T) => any;
}

export const Table = defineComponent({
    name: 'SxoTable',
    props: {
        /** 数据源 */
        data: {
            type: Array as PropType<any[]>,
            required: true,
        },
        /** 列定义 */
        columns: {
            type: Array as PropType<Column<any>[]>,
            required: true,
        },
        /** 每页数量 */
        pageSize: {
            type: Number,
            default: 10,
        },
        /** 是否可排序 */
        sortable: {
            type: Boolean,
            default: false,
        },
        /** 是否可选择 */
        selectable: {
            type: Boolean,
            default: false,
        },
        /** 是否加载中 */
        loading: {
            type: Boolean,
            default: false,
        },
        /** 尺寸 */
        size: {
            type: String as PropType<TableOptions['size']>,
            default: 'md',
        },
        /** 是否展示边框 */
        border: {
            type: Boolean,
            default: true,
        },
        /** 是否显示斑马纹 */
        striped: {
            type: Boolean,
            default: false,
        },
        /** 是否开启虚拟滚动 */
        virtual: {
            type: Boolean,
            default: false,
        },
        /** 虚拟滚动行高 */
        itemHeight: {
            type: Number,
            default: 48,
        },
        /** 虚拟滚动容器高度 */
        height: {
            type: Number,
            default: 400,
        },
    },
    emits: ['selection-change', 'page-change'],
    setup(props, { emit }) {
        const table = useTable({
            data: props.data,
            pagination: props.virtual
                ? { pageSize: props.data.length }
                : { pageSize: props.pageSize },
            sortable: props.sortable,
        });

        const selection = useSelection({
            items: props.data,
            multiSelect: true,
            onSelectionChange: (selected) => emit('selection-change', selected),
        });

        const state = ref(table.getProcessedData());
        const selectedKeys = ref(selection.getSelectedKeys());

        table.subscribe(() => {
            state.value = table.getProcessedData();
        });

        selection.subscribe(() => {
            selectedKeys.value = selection.getSelectedKeys();
        });

        const classes = computed(() =>
            getTableClasses({
                size: props.size,
                border: props.border,
                striped: props.striped,
            }),
        );

        const renderRow = (row: any, i: number) => {
            return h(
                'tr',
                {
                    key: i,
                    class: [
                        classes.value.tr,
                        classes.value.trStriped,
                        selection.isSelected(row) && classes.value.trSelected,
                        'w-full flex', // For virtual scroll layout consistency
                    ],
                    style: props.virtual ? { height: `${props.itemHeight}px` } : {},
                },
                [
                    props.selectable &&
                        h(
                            'td',
                            { class: classes.value.td, style: 'width: 48px; flex-shrink: 0;' },
                            [
                                h(SxoCheckbox, {
                                    modelValue: selection.isSelected(row),
                                    'onUpdate:modelValue': () => selection.toggle(row),
                                }),
                            ],
                        ),
                    ...props.columns.map((col) =>
                        h(
                            'td',
                            {
                                class: classes.value.td,
                                style: col.width
                                    ? {
                                          width:
                                              typeof col.width === 'number'
                                                  ? `${col.width}px`
                                                  : col.width,
                                          flexShrink: 0,
                                      }
                                    : { flex: 1 },
                            },
                            col.render ? col.render(row) : row[col.key],
                        ),
                    ),
                ],
            );
        };

        return () =>
            h('div', { class: 'relative' }, [
                props.loading &&
                    h('div', { class: classes.value.loading }, [
                        h('div', {
                            class: 'animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500',
                        }),
                    ]),
                h('div', { class: classes.value.container }, [
                    h('table', { class: [classes.value.table, props.virtual && 'flex flex-col'] }, [
                        h('thead', { class: [classes.value.thead, props.virtual && 'block'] }, [
                            h('tr', { class: props.virtual ? 'flex w-full' : '' }, [
                                props.selectable &&
                                    h(
                                        'th',
                                        {
                                            class: classes.value.th,
                                            style: 'width: 48px; flex-shrink: 0;',
                                        },
                                        [
                                            h(SxoCheckbox, {
                                                modelValue: selection.isAllSelected(),
                                                'onUpdate:modelValue': (val: boolean) =>
                                                    val
                                                        ? selection.selectAll()
                                                        : selection.deselectAll(),
                                            }),
                                        ],
                                    ),
                                ...props.columns.map((col) =>
                                    h(
                                        'th',
                                        {
                                            class: classes.value.th,
                                            style: col.width
                                                ? {
                                                      width:
                                                          typeof col.width === 'number'
                                                              ? `${col.width}px`
                                                              : col.width,
                                                      flexShrink: 0,
                                                  }
                                                : props.virtual
                                                  ? { flex: 1 }
                                                  : {},
                                            onClick: () =>
                                                col.sortable !== false && table.setSort(col.key),
                                        },
                                        [
                                            h(
                                                'div',
                                                {
                                                    class: 'flex items-center gap-2 cursor-pointer group',
                                                },
                                                [
                                                    col.header,
                                                    col.sortable !== false &&
                                                        h(
                                                            'span',
                                                            {
                                                                class: 'text-neutral-300 group-hover:text-primary-500 transition-colors',
                                                            },
                                                            table.getSortDirection(col.key) ===
                                                                'asc'
                                                                ? '↑'
                                                                : table.getSortDirection(
                                                                        col.key,
                                                                    ) === 'desc'
                                                                  ? '↓'
                                                                  : '↕',
                                                        ),
                                                ],
                                            ),
                                        ],
                                    ),
                                ),
                            ]),
                        ]),
                        props.virtual
                            ? h('div', { style: { height: `${props.height}px` } }, [
                                  h(
                                      SxoVirtualList,
                                      {
                                          items: state.value.data,
                                          itemHeight: props.itemHeight,
                                          containerHeight: props.height,
                                      },
                                      {
                                          default: ({ item, index }: any) => renderRow(item, index),
                                      },
                                  ),
                              ])
                            : h('tbody', [
                                  state.value.data.length === 0
                                      ? h('tr', [
                                            h(
                                                'td',
                                                {
                                                    colspan:
                                                        props.columns.length +
                                                        (props.selectable ? 1 : 0),
                                                    class: classes.value.td,
                                                },
                                                [
                                                    h('div', { class: classes.value.empty }, [
                                                        h(
                                                            'svg',
                                                            {
                                                                width: '48',
                                                                height: '48',
                                                                viewBox: '0 0 24 24',
                                                                fill: 'none',
                                                                stroke: 'currentColor',
                                                                strokeWidth: '1',
                                                            },
                                                            [
                                                                h('path', {
                                                                    d: 'M20 20L4 4m16 0L4 20',
                                                                }),
                                                            ],
                                                        ),
                                                        h('span', '暂无数据'),
                                                    ]),
                                                ],
                                            ),
                                        ])
                                      : state.value.data.map((row, i) => renderRow(row, i)),
                              ]),
                    ]),
                    !props.virtual &&
                        h('div', { class: classes.value.pagination }, [
                            h('span', { class: 'text-neutral-500' }, `共 ${props.data.length} 条`),
                            h(SxoPagination, {
                                total: props.data.length,
                                pageSize: props.pageSize,
                                currentPage: table.getCurrentPage(),
                                'onUpdate:currentPage': (page: number) => {
                                    table.setPage(page);
                                    emit('page-change', page);
                                },
                            }),
                        ]),
                ]),
            ]);
    },
});
