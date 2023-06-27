# Tree 树形控件

用清晰的层级结构展示信息。

## 基础用法

展示简单的树形结构。

```vue
<template>
  <SxoTree :data="treeData" v-model="selectedId" />
</template>

<script setup>
import { ref } from 'vue';

const selectedId = ref('1-1');
const treeData = [
  {
    id: '1',
    label: '层级 1',
    children: [
      { id: '1-1', label: '层级 1-1' },
      { id: '1-2', label: '层级 1-2' }
    ]
  },
  {
    id: '2',
    label: '层级 2',
    expanded: true,
    children: [
      { id: '2-1', label: '层级 2-1' }
    ]
  }
];
</script>
```

## Tree 属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| data | 展示数据 | `TreeData[]` | `[]` |
| modelValue / v-model | 当前选中节点的 ID | `string \| number` | - |

## Tree 事件

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| update:modelValue | 选中节点变化时触发 | `id: string \| number` |
| node-click | 节点被点击时触发 | `node: TreeData` |

## TreeData 数据结构

| 参数 | 说明 | 类型 |
| --- | --- | --- |
| id | 节点唯一标识 | `string \| number` |
| label | 节点显示名称 | `string` |
| children | 子节点数组 | `TreeData[]` |
| expanded | 是否默认展开 | `boolean` |


### API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| node | - | `Object` | `-` |
| selectedId | - | `[String` | `-` |
