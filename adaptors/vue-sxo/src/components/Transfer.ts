import { getTransferClasses, type TransferOptions } from '@sxo/ui';
import { computed, defineComponent, h, type PropType, ref } from 'vue';
import { Checkbox } from './Checkbox';

export interface TransferItem {
    key: string | number;
    label: string;
    disabled?: boolean;
    [key: string]: any;
}

export const Transfer = defineComponent({
    name: 'SxoTransfer',
    props: {
        /** 选中的 key 数组 */
        modelValue: { type: Array as PropType<(string | number)[]>, default: () => [] },
        /** 数据源 */
        dataSource: { type: Array as PropType<TransferItem[]>, default: () => [] },
        /** 左右面板标题 */
        titles: { type: Array as PropType<string[]>, default: () => ['Source', 'Target'] },
        /** 尺寸 */
        size: { type: String as PropType<TransferOptions['size']>, default: 'md' },
        /** 是否可搜索 */
        searchable: { type: Boolean, default: false },
    },
    emits: ['update:modelValue', 'change'],
    setup(props, { emit }) {
        const leftSelection = ref<(string | number)[]>([]);
        const rightSelection = ref<(string | number)[]>([]);
        const leftSearch = ref('');
        const rightSearch = ref('');

        const classes = computed(() => getTransferClasses({ size: props.size }));

        const leftData = computed(() =>
            props.dataSource.filter((item) => !props.modelValue.includes(item.key)),
        );

        const rightData = computed(() =>
            props.dataSource.filter((item) => props.modelValue.includes(item.key)),
        );

        const filteredLeftData = computed(() =>
            leftData.value.filter((item) =>
                item.label.toLowerCase().includes(leftSearch.value.toLowerCase()),
            ),
        );

        const filteredRightData = computed(() =>
            rightData.value.filter((item) =>
                item.label.toLowerCase().includes(rightSearch.value.toLowerCase()),
            ),
        );

        const moveToRight = () => {
            const newValue = [...props.modelValue, ...leftSelection.value];
            emit('update:modelValue', newValue);
            emit('change', newValue);
            leftSelection.value = [];
        };

        const moveToLeft = () => {
            const newValue = props.modelValue.filter((key) => !rightSelection.value.includes(key));
            emit('update:modelValue', newValue);
            emit('change', newValue);
            rightSelection.value = [];
        };

        const renderList = (
            _type: 'left' | 'right',
            title: string,
            data: TransferItem[],
            selection: (string | number)[],
            search: string,
            onSearchUpdate: (val: string) => void,
            onSelectionUpdate: (keys: (string | number)[]) => void,
        ) => {
            return h('div', { class: classes.value.list }, [
                // Header
                h('div', { class: classes.value.header }, [
                    h('span', { class: classes.value.headerTitle }, title),
                    h(
                        'span',
                        { class: classes.value.headerCount },
                        `${selection.length}/${data.length}`,
                    ),
                ]),
                // Search
                props.searchable &&
                    h('div', { class: classes.value.search }, [
                        h('input', {
                            class: 'w-full px-3 py-1.5 text-xs border border-neutral-100 rounded-md focus:border-primary-500 outline-none',
                            placeholder: 'Search...',
                            value: search,
                            onInput: (e: any) => onSearchUpdate(e.target.value),
                        }),
                    ]),
                // Body
                h('div', { class: classes.value.body }, [
                    data.length === 0
                        ? h('div', { class: classes.value.empty }, [
                              h(
                                  'svg',
                                  {
                                      width: '32',
                                      height: '32',
                                      viewBox: '0 0 24 24',
                                      fill: 'none',
                                      stroke: 'currentColor',
                                      strokeWidth: '1.5',
                                  },
                                  [
                                      h('circle', { cx: '12', cy: '12', r: '10' }),
                                      h('path', { d: 'M8 12h8' }),
                                  ],
                              ),
                              h('span', 'No Data'),
                          ])
                        : data.map((item) =>
                              h(
                                  'div',
                                  {
                                      class: [
                                          classes.value.item,
                                          selection.includes(item.key) &&
                                              classes.value.itemSelected,
                                          item.disabled && classes.value.itemDisabled,
                                      ],
                                      onClick: () => {
                                          if (item.disabled) return;
                                          const newSelection = selection.includes(item.key)
                                              ? selection.filter((k) => k !== item.key)
                                              : [...selection, item.key];
                                          onSelectionUpdate(newSelection);
                                      },
                                  },
                                  [
                                      h(Checkbox, {
                                          modelValue: selection.includes(item.key),
                                          disabled: item.disabled,
                                      }),
                                      h('span', { class: classes.value.itemLabel }, item.label),
                                  ],
                              ),
                          ),
                ]),
            ]);
        };

        return () =>
            h('div', { class: classes.value.container }, [
                renderList(
                    'left',
                    props.titles[0],
                    filteredLeftData.value,
                    leftSelection.value,
                    leftSearch.value,
                    (val) => (leftSearch.value = val),
                    (keys) => (leftSelection.value = keys),
                ),
                h('div', { class: classes.value.actions }, [
                    h(
                        'button',
                        {
                            class: classes.value.actionButton,
                            disabled: leftSelection.value.length === 0,
                            onClick: moveToRight,
                        },
                        '>',
                    ),
                    h(
                        'button',
                        {
                            class: classes.value.actionButton,
                            disabled: rightSelection.value.length === 0,
                            onClick: moveToLeft,
                        },
                        '<',
                    ),
                ]),
                renderList(
                    'right',
                    props.titles[1],
                    filteredRightData.value,
                    rightSelection.value,
                    rightSearch.value,
                    (val) => (rightSearch.value = val),
                    (keys) => (rightSelection.value = keys),
                ),
            ]);
    },
});
