# Card 卡片

通用的容器组件，用于展示信息。

<SxoCodeGroup>

<SxoCodeBlock framework="vue">

```vue
<template>
  <div class="flex flex-col gap-4">
    <!-- 基础用法 -->
    <SxoCard>
      <p>This is a basic card.</p>
    </SxoCard>

    <!-- 交互式卡片 -->
    <SxoCard interactive>
      <p>Hover me to see the interaction.</p>
    </SxoCard>

    <!-- 不同变体 -->
    <div class="grid grid-cols-2 gap-4">
      <SxoCard variant="default">Default</SxoCard>
      <SxoCard variant="outline">Outline</SxoCard>
      <SxoCard variant="secondary">Secondary</SxoCard>
      <SxoCard variant="ghost">Ghost</SxoCard>
    </div>
  </div>
</template>

<script setup>
import { SxoCard } from '@sxo/vue';
</script>
```

</SxoCodeBlock>

<SxoCodeBlock framework="react">

```tsx
import { Card } from '@sxo/react';

export default function CardDemo() {
  return (
    <div className="flex flex-col gap-4">
      {/* 基础用法 */}
      <Card>
        <p>This is a basic card.</p>
      </Card>

      {/* 交互式卡片 */}
      <Card interactive>
        <p>Hover me to see the interaction.</p>
      </Card>

      {/* 不同变体 */}
      <div className="grid grid-cols-2 gap-4">
        <Card variant="default">Default</Card>
        <Card variant="outline">Outline</Card>
        <Card variant="secondary">Secondary</Card>
        <Card variant="ghost">Ghost</Card>
      </div>
    </div>
  );
}
```

</SxoCodeBlock>

<SxoCodeBlock framework="vue2">

```vue
<template>
  <div class="flex flex-col gap-4">
    <SxoCard>
      <p>This is a basic card.</p>
    </SxoCard>
    <SxoCard interactive>
      <p>Interactive card.</p>
    </SxoCard>
  </div>
</template>

<script>
import { SxoCard } from '@sxo/vue2';

export default {
  components: { SxoCard }
};
</script>
```

</SxoCodeBlock>

</SxoCodeGroup>

## Card 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| variant | `'default' \| 'outline' \| 'secondary' \| 'ghost'` | `'default'` | 变体 |
| padding | `'none' \| 'sm' \| 'md' \| 'lg'` | `'md'` | 内边距 |
| interactive | `boolean` | `false` | 是否开启交互效果 (悬停阴影) |
| rounded | `boolean` | `true` | 是否圆角 |
