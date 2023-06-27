# Tooltip 文字提示

简单的文字提示气泡框。

<SxoCodeGroup>
<SxoCodeBlock framework="vue">
```vue
<template>
  <div class="flex items-center gap-8">
    <!-- 基础用法 -->
    <SxoTooltip content="This is a tooltip">
      <SxoButton>Hover me</SxoButton>
    </SxoTooltip>

    <!-- 不同变体 -->
    <SxoTooltip content="Dark theme" variant="dark">
      <SxoButton>Dark</SxoButton>
    </SxoTooltip>
    <SxoTooltip content="Light theme" variant="light">
      <SxoButton>Light</SxoButton>
    </SxoTooltip>

    <!-- 自定义延迟 -->
    <SxoTooltip content="Delayed tooltip" :delay="500">
      <SxoButton>Delayed (500ms)</SxoButton>
    </SxoTooltip>

    <!-- 自定义内容 -->
    <SxoTooltip>
      <template #content>
        <div class="flex items-center gap-2">
          <SxoIcon name="info" />
          <span>Custom Content</span>
        </div>
      </template>
      <SxoButton>Custom Slot</SxoButton>
    </SxoTooltip>
  </div>
</template>

<script setup>
import { SxoTooltip, SxoButton, SxoIcon } from '@sxo/vue';
</script>
```
</SxoCodeBlock>

<SxoCodeBlock framework="react">
```tsx
import { Tooltip, Button, Icon } from '@sxo/react';

export default function TooltipDemo() {
  return (
    <div className="flex items-center gap-8">
      {/* 基础用法 */}
      <Tooltip content="This is a tooltip">
        <Button>Hover me</Button>
      </Tooltip>

      {/* 不同变体 */}
      <Tooltip content="Dark theme" variant="dark">
        <Button>Dark</Button>
      </Tooltip>
      <Tooltip content="Light theme" variant="light">
        <Button>Light</Button>
      </Tooltip>

      {/* 自定义延迟 */}
      <Tooltip content="Delayed tooltip" delay={500}>
        <Button>Delayed (500ms)</Button>
      </Tooltip>

      {/* 自定义内容 */}
      <Tooltip 
        content={
          <div className="flex items-center gap-2">
            <Icon name="info" />
            <span>Custom Content</span>
          </div>
        }
      >
        <Button>Custom Content</Button>
      </Tooltip>
    </div>
  );
}
```
</SxoCodeBlock>

<SxoCodeBlock framework="vue2">
```vue
<template>
  <div class="flex items-center gap-8">
    <SxoTooltip content="Vue2 Tooltip">
      <SxoButton>Hover me</SxoButton>
    </SxoTooltip>
    <SxoTooltip variant="light" content="Light Tooltip">
      <SxoButton>Light</SxoButton>
    </SxoTooltip>
  </div>
</template>

<script>
import { SxoTooltip, SxoButton } from '@sxo/vue2';

export default {
  components: { SxoTooltip, SxoButton }
};
</script>
```
</SxoCodeBlock>
</SxoCodeGroup>

## Tooltip 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| content | `string \| slot \| ReactNode` | - | 提示内容 |
| delay | `number` | `200` | 延迟显示时间 (ms) |
| variant | `'dark' \| 'light'` | `'dark'` | 变体主题 |

## Tooltip 插槽 / Props

| 名称 | 类型 | 说明 |
| --- | --- | --- |
| default | `slot \| ReactNode` | 触发 Tooltip 的元素 |
| content | `slot \| ReactNode` | 自定义提示内容 |
