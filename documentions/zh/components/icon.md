# Icon 图标

语义化的矢量图形。

## 基础用法

通过 `name` 属性指定图标名称。

<SxoCodeGroup>
<SxoCodeBlock framework="vue">

```vue
<template>
  <div class="flex gap-4 items-center">
    <SxoIcon name="Search" />
    <SxoIcon name="Plus" />
    <SxoIcon name="Close" />
    <SxoIcon name="Check" />
  </div>
</template>

<script setup>
import { Icon as SxoIcon } from '@sxo/vue';
</script>
```

</SxoCodeBlock>
<SxoCodeBlock framework="react">

```tsx
import { Icon } from '@sxo/react';

export default () => (
  <div className="flex gap-4 items-center">
    <Icon name="Search" />
    <Icon name="Plus" />
    <Icon name="Close" />
    <Icon name="Check" />
  </div>
);
```

</SxoCodeBlock>
<SxoCodeBlock framework="vue2">

```vue
<template>
  <div class="flex gap-4 items-center">
    <SxoIcon name="Search" />
    <SxoIcon name="Plus" />
    <SxoIcon name="Close" />
    <SxoIcon name="Check" />
  </div>
</template>

<script>
import { Icon } from '@sxo/vue2';
export default {
  components: { SxoIcon: Icon }
}
</script>
```

</SxoCodeBlock>
</SxoCodeGroup>

## 自定义样式

可以通过 `size` 和 `color` 属性自定义图标的大小和颜色。

<SxoCodeGroup>
<SxoCodeBlock framework="vue">

```vue
<template>
  <div class="flex gap-4 items-center">
    <SxoIcon name="Info" size="24" color="blue" />
    <SxoIcon name="Warning" size="32" color="orange" />
    <SxoIcon name="Search" size="48" color="red" />
  </div>
</template>
```

</SxoCodeBlock>
<SxoCodeBlock framework="react">

```tsx
import { Icon } from '@sxo/react';

export default () => (
  <div className="flex gap-4 items-center">
    <Icon name="Info" size={24} color="blue" />
    <Icon name="Warning" size={32} color="orange" />
    <Icon name="Search" size={48} color="red" />
  </div>
);
```

</SxoCodeBlock>
<SxoCodeBlock framework="vue2">

```vue
<template>
  <div class="flex gap-4 items-center">
    <SxoIcon name="Info" size="24" color="blue" />
    <SxoIcon name="Warning" size="32" color="orange" />
    <SxoIcon name="Search" size="48" color="red" />
  </div>
</template>
```

</SxoCodeBlock>
</SxoCodeGroup>

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name | 图标名称 | `keyof typeof Icons` | - |
| size | 图标大小 | `string \| number` | `'1em'` |
| color | 图标颜色 | `string` | `'currentColor'` |
| strokeWidth | 描边宽度 | `number` | `2` |

### 图标列表

目前支持的图标包括：`Check`, `Close`, `Search`, `Menu`, `ChevronDown`, `ChevronRight`, `Plus`, `Minus`, `Info`, `Warning`。
