# Avatar 头像

头像组件用于展示用户头像，支持图片、文本和不同形状/尺寸。

<SxoCodeGroup>
<SxoCodeBlock framework="vue">
```vue
<template>
  <div class="flex items-center gap-4">
    <!-- 基础用法 -->
    <SxoAvatar src="https://github.com/shadcn.png" alt="User" />
    
    <!-- 文本占位 -->
    <SxoAvatar fallback="SX" />
    
    <!-- 不同形状 -->
    <SxoAvatar shape="square" src="https://github.com/shadcn.png" />
    
    <!-- 不同尺寸 -->
    <SxoAvatar size="sm" src="https://github.com/shadcn.png" />
    <SxoAvatar size="md" src="https://github.com/shadcn.png" />
    <SxoAvatar size="lg" src="https://github.com/shadcn.png" />
  </div>
</template>

<script setup>
import { SxoAvatar } from '@sxo/vue';
</script>
```
</SxoCodeBlock>

<SxoCodeBlock framework="react">
```tsx
import { Avatar } from '@sxo/react';

export default function AvatarDemo() {
  return (
    <div className="flex items-center gap-4">
      {/* 基础用法 */}
      <Avatar src="https://github.com/shadcn.png" alt="User" />
      
      {/* 文本占位 */}
      <Avatar fallback="SX" />
      
      {/* 不同形状 */}
      <Avatar shape="square" src="https://github.com/shadcn.png" />
      
      {/* 不同尺寸 */}
      <Avatar size="sm" src="https://github.com/shadcn.png" />
      <Avatar size="md" src="https://github.com/shadcn.png" />
      <Avatar size="lg" src="https://github.com/shadcn.png" />
    </div>
  );
}
```
</SxoCodeBlock>

<SxoCodeBlock framework="vue2">
```vue
<template>
  <div class="flex items-center gap-4">
    <SxoAvatar src="https://github.com/shadcn.png" alt="User" />
    <SxoAvatar fallback="SX" />
    <SxoAvatar shape="square" />
    <SxoAvatar size="lg" />
  </div>
</template>

<script>
import { SxoAvatar } from '@sxo/vue2';

export default {
  components: { SxoAvatar }
};
</script>
```
</SxoCodeBlock>
</SxoCodeGroup>

## Avatar 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| src | `string` | - | 图片地址 |
| alt | `string` | - | 替代文本 |
| fallback | `string` | - | 图片加载失败时的占位文本 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |
| shape | `'circle' \| 'square'` | `'circle'` | 形状 |
