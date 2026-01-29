# Dropdown 下拉菜单

将动作或菜单折叠到下拉菜单中。

## 基础用法

点击或移入触发元素，弹出下拉菜单。

<SxoCodeGroup>

<SxoCodeBlock framework="vue">

```vue
<template>
  <SxoDropdown>
    <SxoButton>下拉菜单</SxoButton>
    <template #overlay>
      <SxoDropdownItem>菜单项目 1</SxoDropdownItem>
      <SxoDropdownItem>菜单项目 2</SxoDropdownItem>
      <SxoDropdownItem divider />
      <SxoDropdownItem disabled>禁用项目</SxoDropdownItem>
    </template>
  </SxoDropdown>
</template>

<script setup>
import { Dropdown as SxoDropdown, DropdownItem as SxoDropdownItem, Button as SxoButton } from '@sxo/vue';
</script>
```


</SxoCodeBlock>
<SxoCodeBlock framework="react">

```tsx
import { Dropdown, DropdownItem, Button } from '@sxo/react';

export default () => (
  <Dropdown 
    overlay={
      <>
        <DropdownItem>菜单项目 1</DropdownItem>
        <DropdownItem>菜单项目 2</DropdownItem>
        <DropdownItem divider />
        <DropdownItem disabled>禁用项目</DropdownItem>
      </>
    }
  >
    <Button>下拉菜单</Button>
  </Dropdown>
);
```


</SxoCodeBlock>
<SxoCodeBlock framework="vue2">

```vue
<template>
  <SxoDropdown>
    <SxoButton>下拉菜单</SxoButton>
    <template #overlay>
      <SxoDropdownItem>菜单项目 1</SxoDropdownItem>
      <SxoDropdownItem>菜单项目 2</SxoDropdownItem>
      <SxoDropdownItem divider />
      <SxoDropdownItem disabled>禁用项目</SxoDropdownItem>
    </template>
  </SxoDropdown>
</template>

<script>
import { Dropdown, DropdownItem, Button } from '@sxo/vue2';
export default {
  components: { 
    SxoDropdown: Dropdown, 
    SxoDropdownItem: DropdownItem,
    SxoButton: Button
  }
}
</script>
```


</SxoCodeBlock>

</SxoCodeGroup>

## 触发方式

支持 `click` (默认) 和 `hover` 两种触发方式。

<SxoCodeGroup>

<SxoCodeBlock framework="vue">

```vue
<template>
  <div class="flex gap-4">
    <SxoDropdown trigger="hover">
      <SxoButton variant="outline">移入触发</SxoButton>
      <template #overlay>
        <SxoDropdownItem>项目 A</SxoDropdownItem>
        <SxoDropdownItem>项目 B</SxoDropdownItem>
      </template>
    </SxoDropdown>
  </div>
</template>
```


</SxoCodeBlock>
<SxoCodeBlock framework="react">

```tsx
import { Dropdown, DropdownItem, Button } from '@sxo/react';

export default () => (
  <div className="flex gap-4">
    <Dropdown 
      trigger="hover"
      overlay={
        <>
          <DropdownItem>项目 A</DropdownItem>
          <DropdownItem>项目 B</DropdownItem>
        </>
      }
    >
      <Button variant="outline">移入触发</Button>
    </Dropdown>
  </div>
);
```


</SxoCodeBlock>
<SxoCodeBlock framework="vue2">

```vue
<template>
  <div class="flex gap-4">
    <SxoDropdown trigger="hover">
      <SxoButton variant="outline">移入触发</SxoButton>
      <template #overlay>
        <SxoDropdownItem>项目 A</SxoDropdownItem>
        <SxoDropdownItem>项目 B</SxoDropdownItem>
      </template>
    </SxoDropdown>
  </div>
</template>
```


</SxoCodeBlock>

</SxoCodeGroup>

## 弹出位置

支持 `bottom-left` (默认)、`bottom-right`、`top-left`、`top-right` 四个位置。

<SxoCodeGroup>

<SxoCodeBlock framework="vue">

```vue
<template>
  <SxoDropdown placement="bottom-right">
    <SxoButton>右侧弹出</SxoButton>
    <template #overlay>
      <SxoDropdownItem header="用户操作" />
      <SxoDropdownItem>个人中心</SxoDropdownItem>
      <SxoDropdownItem>设置</SxoDropdownItem>
      <SxoDropdownItem divider />
      <SxoDropdownItem class="text-error">退出登录</SxoDropdownItem>
    </template>
  </SxoDropdown>
</template>
```


</SxoCodeBlock>
<SxoCodeBlock framework="react">

```tsx
import { Dropdown, DropdownItem, Button } from '@sxo/react';

export default () => (
  <Dropdown 
    placement="bottom-right"
    overlay={
      <>
        <DropdownItem header="用户操作" />
        <DropdownItem>个人中心</DropdownItem>
        <DropdownItem>设置</DropdownItem>
        <DropdownItem divider />
        <DropdownItem className="text-error">退出登录</DropdownItem>
      </>
    }
  >
    <Button>右侧弹出</Button>
  </Dropdown>
);
```


</SxoCodeBlock>
<SxoCodeBlock framework="vue2">

```vue
<template>
  <SxoDropdown placement="bottom-right">
    <SxoButton>右侧弹出</SxoButton>
    <template #overlay>
      <SxoDropdownItem header="用户操作" />
      <SxoDropdownItem>个人中心</SxoDropdownItem>
      <SxoDropdownItem>设置</SxoDropdownItem>
      <SxoDropdownItem divider />
      <SxoDropdownItem class="text-error">退出登录</SxoDropdownItem>
    </template>
  </SxoDropdown>
</template>
```


</SxoCodeBlock>

</SxoCodeGroup>

## API

### Dropdown 属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| trigger | 触发方式 | `'click' \| 'hover'` | `'click'` |
| placement | 菜单弹出位置 | `'bottom-left' \| 'bottom-right' \| 'top-left' \| 'top-right'` | `'bottom-left'` |
| overlay | 下拉菜单内容 (仅 React) | `ReactNode` | - |

### Dropdown 插槽 (Vue)

| 名称 | 说明 |
| --- | --- |
| default | 触发元素 |
| overlay | 下拉菜单内容，通常由 `SxoDropdownItem` 组成 |

### DropdownItem 属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| disabled | 是否禁用 | `boolean` | `false` |
| active | 是否激活 | `boolean` | `false` |
| divider | 是否为分割线 | `boolean` | `false` |
| header | 标题文本 | `string` | - |
