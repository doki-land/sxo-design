# Layout 布局

Layout 组件库提供了一系列用于页面布局的基础组件，包括 `Box`、`Stack` 和 `Grid`。这些组件都支持响应式属性，可以轻松构建复杂的响应式布局。

## Box

`Box` 是最基础的布局组件，它本质上是一个可以自定义标签并支持原子化 CSS 属性的容器。

<SxoCodeGroup>
<SxoCodeBlock framework="vue">

```vue
<template>
  <SxoBox
    as="section"
    padding="4"
    margin="2"
    bg="blue-500"
    rounded="lg"
    shadow="md"
    text="white"
  >
    这是一个 Box 容器
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

const App = () => (
  <Box
    as="section"
    padding="4"
    margin="2"
    bg="blue-500"
    rounded="lg"
    shadow="md"
    text="white"
  >
    这是一个 Box 容器
  </Box>
);
```

</SxoCodeBlock>
<SxoCodeBlock framework="vue2">

```vue
<template>
  <SxoBox
    as="section"
    padding="4"
    margin="2"
    bg="blue-500"
    rounded="lg"
    shadow="md"
    text="white"
  >
    这是一个 Box 容器
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

## Stack

`Stack` 用于水平或垂直排列子元素，底层基于 Flexbox。

<SxoCodeGroup>
<SxoCodeBlock framework="vue">

```vue
<template>
  <SxoStack direction="row" gap="4" align="center">
    <SxoBox bg="red-500" p="4">Item 1</SxoBox>
    <SxoBox bg="green-500" p="4">Item 2</SxoBox>
    <SxoBox bg="blue-500" p="4">Item 3</SxoBox>
  </SxoStack>
</template>

<script setup>
import { Stack as SxoStack, Box as SxoBox } from '@sxo/vue';
</script>
```

</SxoCodeBlock>
<SxoCodeBlock framework="react">

```tsx
import { Stack, Box } from '@sxo/react';

const App = () => (
  <Stack direction="row" gap={4} align="center">
    <Box bg="red-500" p="4">Item 1</Box>
    <Box bg="green-500" p="4">Item 2</Box>
    <Box bg="blue-500" p="4">Item 3</Box>
  </Stack>
);
```

</SxoCodeBlock>
<SxoCodeBlock framework="vue2">

```vue
<template>
  <SxoStack direction="row" gap="4" align="center">
    <SxoBox bg="red-500" p="4">Item 1</SxoBox>
    <SxoBox bg="green-500" p="4">Item 2</SxoBox>
    <SxoBox bg="blue-500" p="4">Item 3</SxoBox>
  </SxoStack>
</template>

<script>
import { Stack, Box } from '@sxo/vue2';

export default {
  components: { SxoStack: Stack, SxoBox: Box }
}
</script>
```

</SxoCodeBlock>
</SxoCodeGroup>

## Grid

`Grid` 用于创建网格布局，底层基于 CSS Grid。

<SxoCodeGroup>
<SxoCodeBlock framework="vue">

```vue
<template>
  <SxoGrid :cols="{ base: 1, md: 3 }" gap="4">
    <SxoBox bg="gray-200" p="8">1</SxoBox>
    <SxoBox bg="gray-200" p="8">2</SxoBox>
    <SxoBox bg="gray-200" p="8">3</SxoBox>
  </SxoGrid>
</template>

<script setup>
import { Grid as SxoGrid, Box as SxoBox } from '@sxo/vue';
</script>
```

</SxoCodeBlock>
<SxoCodeBlock framework="react">

```tsx
import { Grid, Box } from '@sxo/react';

const App = () => (
  <Grid cols={{ base: 1, md: 3 }} gap={4}>
    <Box bg="gray-200" p="8">1</Box>
    <Box bg="gray-200" p="8">2</Box>
    <Box bg="gray-200" p="8">3</Box>
  </Grid>
);
```

</SxoCodeBlock>
<SxoCodeBlock framework="vue2">

```vue
<template>
  <SxoGrid :cols="{ base: 1, md: 3 }" gap="4">
    <SxoBox bg="gray-200" p="8">1</SxoBox>
    <SxoBox bg="gray-200" p="8">2</SxoBox>
    <SxoBox bg="gray-200" p="8">3</SxoBox>
  </SxoGrid>
</template>

<script>
import { Grid, Box } from '@sxo/vue2';

export default {
  components: { SxoGrid: Grid, SxoBox: Box }
}
</script>
```

</SxoCodeBlock>
</SxoCodeGroup>

## Container

`Container` 用于限制内容的最大宽度，并使其在页面中居中。

<SxoCodeGroup>
<SxoCodeBlock framework="vue">

```vue
<template>
  <SxoContainer :center="true">
    <SxoBox bg="gray-100" p="4">
      容器内容
    </SxoBox>
  </SxoContainer>
</template>

<script setup>
import { Container as SxoContainer, Box as SxoBox } from '@sxo/vue';
</script>
```

</SxoCodeBlock>
<SxoCodeBlock framework="react">

```tsx
import { Container, Box } from '@sxo/react';

const App = () => (
  <Container center>
    <Box bg="gray-100" p="4">
      容器内容
    </Box>
  </Container>
);
```

</SxoCodeBlock>
<SxoCodeBlock framework="vue2">

```vue
<template>
  <SxoContainer :center="true">
    <SxoBox bg="gray-100" p="4">
      容器内容
    </SxoBox>
  </SxoContainer>
</template>

<script>
import { Container, Box } from '@sxo/vue2';

export default {
  components: { SxoContainer: Container, SxoBox: Box }
}
</script>
```

</SxoCodeBlock>
</SxoCodeGroup>

## 响应式支持

所有布局组件的属性都支持响应式对象写法。

| 断点 | 描述 |
| --- | --- |
| `base` | 默认样式 (mobile first) |
| `sm` | `>= 640px` |
| `md` | `>= 768px` |
| `lg` | `>= 1024px` |
| `xl` | `>= 1280px` |
| `2xl` | `>= 1536px` |

## API

### Box Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `as` | `string` | `'div'` | 渲染的 HTML 标签 |
| `padding` | `Responsive<string \| number>` | - | 内边距 |
| `margin` | `Responsive<string \| number>` | - | 外边距 |
| `bg` | `Responsive<string>` | - | 背景色 |
| `rounded` | `Responsive<string>` | - | 圆角 |
| `shadow` | `Responsive<string>` | - | 阴影 |
| `width` | `Responsive<string \| number>` | - | 宽度 |
| `height` | `Responsive<string \| number>` | - | 高度 |
| ... | ... | ... | 支持更多原子化 CSS 属性 |

### Stack Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `direction` | `Responsive<'row' \| 'col'>` | `'col'` | 排列方向 |
| `gap` | `Responsive<string \| number>` | `4` | 间距 |
| `align` | `Responsive<'start' \| 'center' \| 'end' \| 'baseline' \| 'stretch'>` | `'stretch'` | 侧轴对齐方式 |
| `justify` | `Responsive<'start' \| 'center' \| 'end' \| 'between' \| 'around' \| 'evenly'>` | `'start'` | 主轴对齐方式 |
| `wrap` | `Responsive<boolean>` | `false` | 是否换行 |

### Grid Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `cols` | `Responsive<number>` | - | 列数 |
| `rows` | `Responsive<number>` | - | 行数 |
| `gap` | `Responsive<string \| number>` | `4` | 间距 |
| `flow` | `Responsive<'row' \| 'col' \| 'dense' \| 'row-dense' \| 'col-dense'>` | `'row'` | 网格流向 |


### API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| direction | - | `[String` | `'col'` |
| gap | - | `[String` | `4` |
| align | - | `[String` | `'stretch'` |
| justify | - | `[String` | `'start'` |
| wrap | - | `[Boolean` | `false` |
