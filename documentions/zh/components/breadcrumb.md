# Breadcrumb 面包屑

显示当前页面在系统层级结构中的位置，并允许用户返回之前的层级。

<SxoCodeGroup>
<SxoCodeBlock framework="vue">
```vue
<template>
  <div class="flex flex-col gap-4">
    <!-- 基础用法 -->
    <SxoBreadcrumb>
      <SxoBreadcrumbItem href="/">Home</SxoBreadcrumbItem>
      <SxoBreadcrumbItem href="/components">Components</SxoBreadcrumbItem>
      <SxoBreadcrumbItem current>Breadcrumb</SxoBreadcrumbItem>
    </SxoBreadcrumb>

    <!-- 自定义分隔符 -->
    <SxoBreadcrumb separator=">">
      <SxoBreadcrumbItem href="/">Home</SxoBreadcrumbItem>
      <SxoBreadcrumbItem current>Settings</SxoBreadcrumbItem>
    </SxoBreadcrumb>
  </div>
</template>

<script setup>
import { SxoBreadcrumb, SxoBreadcrumbItem } from '@sxo/vue';
</script>
```
</SxoCodeBlock>

<SxoCodeBlock framework="react">
```tsx
import { Breadcrumb, BreadcrumbItem } from '@sxo/react';

export default function BreadcrumbDemo() {
  return (
    <div className="flex flex-col gap-4">
      {/* 基础用法 */}
      <Breadcrumb>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/components">Components</BreadcrumbItem>
        <BreadcrumbItem current>Breadcrumb</BreadcrumbItem>
      </Breadcrumb>

      {/* 自定义分隔符 */}
      <Breadcrumb separator=">">
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem current>Settings</BreadcrumbItem>
      </Breadcrumb>
    </div>
  );
}
```
</SxoCodeBlock>

<SxoCodeBlock framework="vue2">
```vue
<template>
  <div class="flex flex-col gap-4">
    <SxoBreadcrumb>
      <SxoBreadcrumbItem href="/">Home</SxoBreadcrumbItem>
      <SxoBreadcrumbItem href="/components">Components</SxoBreadcrumbItem>
      <SxoBreadcrumbItem current>Breadcrumb</SxoBreadcrumbItem>
    </SxoBreadcrumb>
  </div>
</template>

<script>
import { SxoBreadcrumb, SxoBreadcrumbItem } from '@sxo/vue2';

export default {
  components: { SxoBreadcrumb, SxoBreadcrumbItem }
};
</script>
```
</SxoCodeBlock>
</SxoCodeGroup>

## Breadcrumb 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| separator | `string` | `'/'` | 分隔符 |

## BreadcrumbItem 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| href | `string` | - | 链接地址 |
| current | `boolean` | `false` | 是否为当前页 |
