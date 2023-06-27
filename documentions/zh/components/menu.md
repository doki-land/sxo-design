# Menu 菜单

菜单组件用于展示一系列可点击的选项，通常用于下拉菜单或上下文菜单。

## 基础用法

点击按钮即可展开菜单项。

<SxoCodeGroup>
<SxoCodeBlock framework="vue">

```vue
<template>
  <SxoMenu
    label="操作菜单"
    :items="menuItems"
    @select="handleSelect"
  />
</template>

<script setup>
import { Menu as SxoMenu } from '@sxo/vue';

const menuItems = [
  { id: 'edit', label: '编辑' },
  { id: 'copy', label: '复制' },
  { id: 'delete', label: '删除' },
];

const handleSelect = (item) => {
  console.log('Selected:', item.label);
};
</script>
```

</SxoCodeBlock>
<SxoCodeBlock framework="react">

```tsx
import { Menu } from '@sxo/react';

const App = () => {
  const menuItems = [
    { id: 'edit', label: '编辑', onClick: () => console.log('Edit clicked') },
    { id: 'copy', label: '复制', onClick: () => console.log('Copy clicked') },
    { id: 'delete', label: '删除', onClick: () => console.log('Delete clicked') },
  ];

  return (
    <Menu
      label="操作菜单"
      items={menuItems}
    />
  );
};
```

</SxoCodeBlock>
<SxoCodeBlock framework="vue2">

```vue
<template>
  <SxoMenu
    label="操作菜单"
    :items="menuItems"
    @select="handleSelect"
  />
</template>

<script>
import { Menu } from '@sxo/vue2';

export default {
  components: { SxoMenu: Menu },
  data() {
    return {
      menuItems: [
        { id: 'edit', label: '编辑' },
        { id: 'copy', label: '复制' },
        { id: 'delete', label: '删除' },
      ],
    };
  },
  methods: {
    handleSelect(item) {
      console.log('Selected:', item.label);
    },
  },
};
</script>
```

</SxoCodeBlock>
</SxoCodeGroup>

## 变体

支持 `default`, `bordered`, `flat` 等变体样式。

<SxoCodeGroup>
<SxoCodeBlock framework="vue">

```vue
<template>
  <div class="flex gap-4">
    <SxoMenu label="Default" :items="items" variant="default" />
    <SxoMenu label="Bordered" :items="items" variant="bordered" />
    <SxoMenu label="Flat" :items="items" variant="flat" />
  </div>
</template>

<script setup>
import { Menu as SxoMenu } from '@sxo/vue';
const items = [{ id: '1', label: 'Option 1' }];
</script>
```

</SxoCodeBlock>
</SxoCodeGroup>

## API

### Menu Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `label` | `string \| ReactNode` | - | 菜单触发按钮的标签 |
| `items` | `MenuItem[]` | `[]` | 菜单项列表 |
| `variant` | `'default' \| 'bordered' \| 'flat'` | `'default'` | 菜单样式变体 |

### MenuItem

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| `id` | `string` | 唯一标识符 |
| `label` | `string` | 显示文本 |
| `onClick` | `() => void` | 点击回调 (仅 React) |

### Menu Events (Vue/Vue2)

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `select` | 点击菜单项时触发 | `(item: MenuItem)` |


### API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| label | - | `[String` | `-` |
| items | - | `Array` | `-` |
| variant | - | `String` | `"default"` |
