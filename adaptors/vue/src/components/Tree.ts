import { getTreeClasses } from '@sxo/ui';
import { computed, defineComponent, h, type PropType, ref, type VNode } from 'vue';

export interface TreeData {
    id: string | number;
    label: string;
    children?: TreeData[];
    expanded?: boolean;
}

const TreeNode = defineComponent({
    name: 'SxoTreeNode',
    props: {
        node: { type: Object as PropType<TreeData>, required: true },
        selectedId: { type: [String, Number] },
    },
    emits: ['select'],
    setup(props, { emit }) {
        const isExpanded = ref(props.node.expanded ?? false);
        const styles = computed(() => getTreeClasses());

        const toggleExpand = (e: MouseEvent) => {
            e.stopPropagation();
            isExpanded.value = !isExpanded.value;
        };

        const handleSelect = () => {
            emit('select', props.node);
        };

        return (): VNode =>
            h('div', { class: styles.value.node }, [
                h(
                    'div',
                    {
                        class: [
                            styles.value.content,
                            props.selectedId === props.node.id && styles.value.contentActive,
                        ],
                        onClick: handleSelect,
                    },
                    [
                        props.node.children && props.node.children.length > 0
                            ? h(
                                  'svg',
                                  {
                                      class: [
                                          styles.value.expandIcon,
                                          isExpanded.value && styles.value.expandIconOpen,
                                      ],
                                      viewBox: '0 0 24 24',
                                      fill: 'none',
                                      stroke: 'currentColor',
                                      'stroke-width': '2',
                                      onClick: toggleExpand,
                                  },
                                  [h('polyline', { points: '9 18 15 12 9 6' })],
                              )
                            : h('div', { class: 'w-4 h-4 mr-1' }),
                        h('span', { class: styles.value.label }, props.node.label),
                    ],
                ),
                isExpanded.value &&
                    props.node.children &&
                    h(
                        'div',
                        { class: styles.value.children },
                        props.node.children.map((child) =>
                            h(TreeNode, {
                                node: child,
                                selectedId: props.selectedId,
                                onSelect: (node: TreeData) => emit('select', node),
                            }),
                        ),
                    ),
            ]);
    },
});

export const Tree = defineComponent({
    name: 'SxoTree',
    props: {
        data: { type: Array as PropType<TreeData[]>, default: () => [] },
        modelValue: { type: [String, Number] },
    },
    emits: ['update:modelValue', 'node-click'],
    setup(props, { emit, attrs }) {
        const styles = computed(() => getTreeClasses());

        const handleSelect = (node: TreeData) => {
            emit('update:modelValue', node.id);
            emit('node-click', node);
        };

        return () =>
            h(
                'div',
                { class: [styles.value.container, attrs.class] },
                props.data.length > 0
                    ? props.data.map((node) =>
                          h(TreeNode, {
                              node,
                              selectedId: props.modelValue,
                              onSelect: handleSelect,
                          }),
                      )
                    : h('div', { class: styles.value.empty }, '暂无数据'),
            );
    },
});
