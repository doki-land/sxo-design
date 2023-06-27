# Button 按钮

基础的交互按钮。

## 基础用法

最基础的按钮用法。

<SxoCodeGroup>
<SxoCodeBlock framework="vue">

```vue
<template>
  <div class="flex gap-4">
    <SxoButton variant="primary">Primary</SxoButton>
    <SxoButton variant="secondary">Secondary</SxoButton>
    <SxoButton variant="outline">Outline</SxoButton>
    <SxoButton variant="ghost">Ghost</SxoButton>
    <SxoButton variant="link">Link</SxoButton>
  </div>
</template>

<script setup>
import { Button as SxoButton } from '@sxo/vue';
</script>
```

</SxoCodeBlock>
<SxoCodeBlock framework="react">

```tsx
import { Button } from '@sxo/react';

export default () => (
  <div className="flex gap-4">
    <Button variant="primary">Primary</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="outline">Outline</Button>
    <Button variant="ghost">Ghost</Button>
    <Button variant="link">Link</Button>
  </div>
);
```

</SxoCodeBlock>
<SxoCodeBlock framework="vue2">

```vue
<template>
  <div class="flex gap-4">
    <SxoButton variant="primary">Primary</SxoButton>
    <SxoButton variant="secondary">Secondary</SxoButton>
    <SxoButton variant="outline">Outline</SxoButton>
    <SxoButton variant="ghost">Ghost</SxoButton>
    <SxoButton variant="link">Link</SxoButton>
  </div>
</template>

<script>
import { Button } from '@sxo/vue2';
export default {
  components: { SxoButton: Button }
}
</script>
```

</SxoCodeBlock>
</SxoCodeGroup>

## 尺寸

通过 `size` 属性设置按钮大小。

<SxoCodeGroup>
<SxoCodeBlock framework="vue">

```vue
<template>
  <div class="flex items-center gap-4">
    <SxoButton size="sm">Small</SxoButton>
    <SxoButton size="md">Medium</SxoButton>
    <SxoButton size="lg">Large</SxoButton>
  </div>
</template>
```

</SxoCodeBlock>
<SxoCodeBlock framework="react">

```tsx
import { Button } from '@sxo/react';

export default () => (
  <div className="flex items-center gap-4">
    <Button size="sm">Small</Button>
    <Button size="md">Medium</Button>
    <Button size="lg">Large</Button>
  </div>
);
```

</SxoCodeBlock>
<SxoCodeBlock framework="vue2">

```vue
<template>
  <div class="flex items-center gap-4">
    <SxoButton size="sm">Small</SxoButton>
    <SxoButton size="md">Medium</SxoButton>
    <SxoButton size="lg">Large</SxoButton>
  </div>
</template>
```

</SxoCodeBlock>
</SxoCodeGroup>

## 禁用状态

通过 `disabled` 属性禁用按钮。

<SxoCodeGroup>
<SxoCodeBlock framework="vue">

```vue
<template>
  <SxoButton disabled>Disabled Button</SxoButton>
</template>
```

</SxoCodeBlock>
<SxoCodeBlock framework="react">

```tsx
import { Button } from '@sxo/react';

export default () => <Button disabled>Disabled Button</Button>;
```

</SxoCodeBlock>
<SxoCodeBlock framework="vue2">

```vue
<template>
  <SxoButton disabled>Disabled Button</SxoButton>
</template>
```

</SxoCodeBlock>
</SxoCodeGroup>

## API

### Button 属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| variant | 按钮变体 | `'primary' \| 'secondary' \| 'outline' \| 'ghost' \| 'link'` | `'primary'` |
| size | 按钮大小 | `'sm' \| 'md' \| 'lg'` | `'md'` |
| disabled | 是否禁用 | `boolean` | `false` |
