# Tag 标签

用于标记和分类。

<SxoCodeGroup>
<SxoCodeBlock framework="vue">
```vue
<template>
  <div class="flex flex-wrap gap-2">
    <!-- 基础用法 -->
    <SxoTag>Default</SxoTag>
    <SxoTag color="primary">Primary</SxoTag>
    <SxoTag color="success">Success</SxoTag>
    <SxoTag color="warning">Warning</SxoTag>
    <SxoTag color="error">Error</SxoTag>

    <!-- 不同变体 -->
    <SxoTag variant="solid" color="primary">Solid</SxoTag>
    <SxoTag variant="outline" color="primary">Outline</SxoTag>
    <SxoTag variant="ghost" color="primary">Ghost</SxoTag>

    <!-- 可关闭 -->
    <SxoTag closable @close="handleClose">Closable</SxoTag>

    <!-- 不同尺寸 -->
    <SxoTag size="sm">Small</SxoTag>
    <SxoTag size="md">Medium</SxoTag>
    <SxoTag size="lg">Large</SxoTag>
  </div>
</template>

<script setup>
import { SxoTag } from '@sxo/vue';

const handleClose = () => {
  console.log('Tag closed');
};
</script>
```
</SxoCodeBlock>

<SxoCodeBlock framework="react">
```tsx
import { Tag } from '@sxo/react';

export default function TagDemo() {
  const handleClose = () => {
    console.log('Tag closed');
  };

  return (
    <div className="flex flex-wrap gap-2">
      {/* 基础用法 */}
      <Tag>Default</Tag>
      <Tag color="primary">Primary</Tag>
      <Tag color="success">Success</Tag>
      <Tag color="warning">Warning</Tag>
      <Tag color="error">Error</Tag>

      {/* 不同变体 */}
      <Tag variant="solid" color="primary">Solid</Tag>
      <Tag variant="outline" color="primary">Outline</Tag>
      <Tag variant="ghost" color="primary">Ghost</Tag>

      {/* 可关闭 */}
      <Tag closable onClose={handleClose}>Closable</Tag>

      {/* 不同尺寸 */}
      <Tag size="sm">Small</Tag>
      <Tag size="md">Medium</Tag>
      <Tag size="lg">Large</Tag>
    </div>
  );
}
```
</SxoCodeBlock>

<SxoCodeBlock framework="vue2">
```vue
<template>
  <div class="flex flex-wrap gap-2">
    <SxoTag color="primary">Vue2 Tag</SxoTag>
    <SxoTag variant="outline" color="success">Outline</SxoTag>
    <SxoTag closable @close="onClose">Closable</SxoTag>
  </div>
</template>

<script>
import { SxoTag } from '@sxo/vue2';

export default {
  components: { SxoTag },
  methods: {
    onClose() {
      console.log('Vue2 Tag closed');
    }
  }
};
</script>
```
</SxoCodeBlock>
</SxoCodeGroup>

## Tag 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| variant | `'solid' \| 'outline' \| 'ghost'` | `'solid'` | 变体 |
| color | `'primary' \| 'success' \| 'warning' \| 'error' \| 'default'` | `'primary'` | 颜色 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |
| rounded | `'none' \| 'sm' \| 'md' \| 'lg' \| 'full'` | `'sm'` | 圆角 |
| closable | `boolean` | `false` | 是否可关闭 |

## Tag 事件

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| close / onClose | 点击关闭图标时的回调 | `() => void` |
