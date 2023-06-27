# Box 盒子

Box 组件是 SXO 的基础原子组件，它允许你通过属性直接控制布局和样式。

## 基础用法

最基础的用法，默认为 `div` 标签。

<SxoCodeGroup>
<SxoCodeBlock framework="vue">

```vue
<template>
  <SxoBox p="4" bg="blue-500" text="white" rounded="lg">
    这是一个 Box 组件
  </SxoBox>
</template>

<script setup>
import { Box as SxoBox } from '@sxo/vue';
</script>
```

</SxoCodeBlock>
<SxoCodeBlock framework="react">

```tsx
import { Box } from '@sxo/react';

export default () => (
  <Box p="4" bg="blue-500" text="white" rounded="lg">
    这是一个 Box 组件
  </Box>
);
```

</SxoCodeBlock>
<SxoCodeBlock framework="vue2">

```vue
<template>
  <SxoBox p="4" bg="blue-500" text="white" rounded="lg">
    这是一个 Box 组件
  </SxoBox>
</template>

<script>
import { Box } from '@sxo/vue2';
export default {
  components: { SxoBox: Box }
}
</script>
```

</SxoCodeBlock>
</SxoCodeGroup>

## 渲染为其他标签

通过 `as` 属性，你可以将 Box 渲染为任何 HTML 标签。

<SxoCodeGroup>
<SxoCodeBlock framework="vue">

```vue
<template>
  <SxoBox as="button" p="2" bg="green-500" text="white" rounded="md">
    点击我
  </SxoBox>
</template>
```

</SxoCodeBlock>
<SxoCodeBlock framework="react">

```tsx
import { Box } from '@sxo/react';

export default () => (
  <Box as="button" p="2" bg="green-500" text="white" rounded="md">
    点击我
  </Box>
);
```

</SxoCodeBlock>
<SxoCodeBlock framework="vue2">

```vue
<template>
  <SxoBox as="button" p="2" bg="green-500" text="white" rounded="md">
    点击我
  </SxoBox>
</template>
```

</SxoCodeBlock>
</SxoCodeGroup>

## 常用属性映射

Box 组件支持以下常用的原子化属性：

| 属性 | 对应 CSS / 前缀 | 示例 |
| --- | --- | --- |
| `p` / `padding` | `p-` | `p="4"` -> `padding: 1rem` |
| `m` / `margin` | `m-` | `m="2"` -> `margin: 0.5rem` |
| `bg` | `bg-` | `bg="red-500"` |
| `text` | `text-` | `text="sm"` / `text="white"` |
| `rounded` | `rounded-` | `rounded="full"` |
| `shadow` | `shadow-` | `shadow="md"` |
| `w` | `w-` | `w="full"` / `w="64"` |
| `h` | `h-` | `h="screen"` |
| `display` | 直接作为类名 | `display="flex"` |
| `flex` | `flex-` | `flex="1"` / `flex="row"` |
| `grid` | `grid-` | `grid="cols-3"` |

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| as | 渲染的 HTML 标签 | `string` | `'div'` |
| ...attrs | 支持所有原生的 HTML 属性以及上述的原子化简写属性 | - | - |
