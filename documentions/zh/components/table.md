# Table 表格

用于展示多条结构化数据。

## 基础用法

<SxoCodeGroup>
<SxoCodeBlock framework="vue">

```vue
<template>
  <SxoTable :data="data" :columns="columns" />
</template>

<script setup>
const data = [
  { id: 1, name: 'SXO', status: 'Active' },
  { id: 2, name: 'Vite', status: 'Beta' }
];

const columns = [
  { key: 'id', header: 'ID' },
  { key: 'name', header: 'Name' },
  { key: 'status', header: 'Status' }
];
</script>
```

</SxoCodeBlock>

<SxoCodeBlock framework="react">

```tsx
import { Table } from '@sxo/react-sxo';

const data = [
  { id: 1, name: 'SXO', status: 'Active' },
  { id: 2, name: 'Vite', status: 'Beta' }
];

const columns = [
  { key: 'id', header: 'ID' },
  { key: 'name', header: 'Name' },
  { key: 'status', header: 'Status' }
];

export default () => (
  <Table data={data} columns={columns} />
);
```

</SxoCodeBlock>
</SxoCodeGroup>

## 排序与分页

通过设置 `sortable` 和 `page-size` 开启增强功能。

```vue
<SxoTable 
  :data="largeData" 
  :columns="columns" 
  :page-size="10" 
  sortable 
/>
```

## 虚拟滚动

当数据量巨大时，开启 `virtual` 属性以获得极致性能。

<SxoPlayground>
<template>
  <SxoTable 
    :data="data" 
    :columns="columns" 
    virtual 
    :height="400"
    :item-height="48"
    selectable
  />
</template>

<script setup>
const data = Array.from({ length: 1000 }).map((_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  role: i % 2 === 0 ? 'Admin' : 'User',
  status: i % 3 === 0 ? 'Active' : 'Idle'
}));

const columns = [
  { key: 'id', header: 'ID', width: 80 },
  { key: 'name', header: '姓名' },
  { key: 'role', header: '角色' },
  { key: 'status', header: '状态' }
];
</script>
</SxoPlayground>

## 属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| data | 数据源 | `any[]` | `[]` |
| columns | 列定义 | `Column[]` | `[]` |
| pageSize | 每页条数，设置后开启分页 | `number` | - |
| sortable | 是否开启全局排序 | `boolean` | `false` |

## Column 定义

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| key | 对应数据的键名 | `string` | - |
| header | 表头文字 | `string` | - |
| sortable | 该列是否支持排序 | `boolean` | `true` |
| render | 自定义渲染函数 | `(row: any) => VNode` | - |


### API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| data | 数据源 | `Array` | `-` |
| columns | 列定义 | `Array []>` | `-` |
| pageSize | 每页数量 | `Number` | `10` |
| sortable | 是否可排序 | `Boolean` | `false` |
| selectable | 是否可选择 | `Boolean` | `false` |
| loading | 是否加载中 | `Boolean` | `false` |
| size | 尺寸 | `String` | `"md"` |
| border | 是否展示边框 | `Boolean` | `true` |
| striped | 是否显示斑马纹 | `Boolean` | `false` |
| virtual | 是否开启虚拟滚动 | `Boolean` | `false` |
| itemHeight | 虚拟滚动行高 | `Number` | `48` |
| height | 虚拟滚动容器高度 | `Number` | `400` |
