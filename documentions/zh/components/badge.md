# Badge 徽标

出现在按钮、图标旁边的数字或状态标记。

## 基础用法

<SxoCodeGroup>
<SxoCodeBlock framework="vue">

```vue
<template>
  <div class="flex gap-4">
    <SxoBadge>Primary</SxoBadge>
    <SxoBadge variant="success">Success</SxoBadge>
    <SxoBadge variant="warning">Warning</SxoBadge>
    <SxoBadge variant="error">Error</SxoBadge>
    <SxoBadge variant="secondary">Secondary</SxoBadge>
  </div>
</template>

<script setup>
import { Badge as SxoBadge } from '@sxo/vue';
</script>
```

</SxoCodeBlock>
<SxoCodeBlock framework="react">

```tsx
import { Badge } from '@sxo/react';

export default () => (
  <div className="flex gap-4">
    <Badge>Primary</Badge>
    <Badge variant="success">Success</Badge>
    <Badge variant="warning">Warning</Badge>
    <Badge variant="error">Error</Badge>
    <Badge variant="secondary">Secondary</Badge>
  </div>
);
```

</SxoCodeBlock>
<SxoCodeBlock framework="vue2">

```vue
<template>
  <div class="flex gap-4">
    <SxoBadge>Primary</SxoBadge>
    <SxoBadge variant="success">Success</SxoBadge>
    <SxoBadge variant="warning">Warning</SxoBadge>
    <SxoBadge variant="error">Error</SxoBadge>
    <SxoBadge variant="secondary">Secondary</SxoBadge>
  </div>
</template>

<script>
import { Badge } from '@sxo/vue2';
export default {
  components: { SxoBadge: Badge }
}
</script>
```

</SxoCodeBlock>
</SxoCodeGroup>

## 变体

支持 `primary`, `success`, `warning`, `error`, `secondary` 变体。

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| variant | 变体 | `'primary' \| 'success' \| 'warning' \| 'error' \| 'secondary'` | `'primary'` |
