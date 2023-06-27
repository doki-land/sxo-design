# Divider 分割线

区隔内容的直线。

<SxoCodeGroup>
<SxoCodeBlock framework="vue">
```vue
<template>
  <div class="flex flex-col gap-4">
    <p>Text above</p>
    <!-- 基础用法 -->
    <SxoDivider />
    <p>Text below</p>

    <!-- 带内容的分割线 -->
    <SxoDivider>Center Text</SxoDivider>
    <SxoDivider contentPlacement="left">Left Text</SxoDivider>
    <SxoDivider contentPlacement="right">Right Text</SxoDivider>

    <!-- 垂直分割线 -->
    <div class="flex items-center h-5 gap-2">
      <span>Item 1</span>
      <SxoDivider direction="vertical" />
      <span>Item 2</span>
      <SxoDivider direction="vertical" />
      <span>Item 3</span>
    </div>

    <!-- 不同样式 -->
    <SxoDivider type="dashed">Dashed</SxoDivider>
    <SxoDivider type="dotted">Dotted</SxoDivider>
  </div>
</template>

<script setup>
import { SxoDivider } from '@sxo/vue';
</script>
```
</SxoCodeBlock>

<SxoCodeBlock framework="react">
```tsx
import { Divider } from '@sxo/react';

export default function DividerDemo() {
  return (
    <div className="flex flex-col gap-4">
      <p>Text above</p>
      {/* 基础用法 */}
      <Divider />
      <p>Text below</p>

      {/* 带内容的分割线 */}
      <Divider>Center Text</Divider>
      <Divider contentPlacement="left">Left Text</Divider>
      <Divider contentPlacement="right">Right Text</Divider>

      {/* 垂直分割线 */}
      <div className="flex items-center h-5 gap-2">
        <span>Item 1</span>
        <Divider direction="vertical" />
        <span>Item 2</span>
        <Divider direction="vertical" />
        <span>Item 3</span>
      </div>

      {/* 不同样式 */}
      <Divider type="dashed">Dashed</Divider>
      <Divider type="dotted">Dotted</Divider>
    </div>
  );
}
```
</SxoCodeBlock>

<SxoCodeBlock framework="vue2">
```vue
<template>
  <div class="flex flex-col gap-4">
    <p>Text above</p>
    <SxoDivider />
    <p>Text below</p>
    <SxoDivider>With Content</SxoDivider>
    <div class="flex items-center h-5 gap-2">
      <span>1</span>
      <SxoDivider direction="vertical" />
      <span>2</span>
    </div>
  </div>
</template>

<script>
import { SxoDivider } from '@sxo/vue2';

export default {
  components: { SxoDivider }
};
</script>
```
</SxoCodeBlock>
</SxoCodeGroup>

## Divider 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| direction | `'horizontal' \| 'vertical'` | `'horizontal'` | 方向 |
| type | `'solid' \| 'dashed' \| 'dotted'` | `'solid'` | 线性样式 |
| contentPlacement | `'left' \| 'center' \| 'right'` | `'center'` | 内容位置 |
