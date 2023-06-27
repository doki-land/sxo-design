# 原子化 CSS

SXO 提供了一个轻量级的 JIT (Just-In-Time) 引擎，用于根据需要生成原子类样式。

## 命名规范

SXO 的原子类命名借鉴了 Tailwind CSS，但针对设计令牌进行了优化。

### 颜色
- `bg-{colorPath}`: 设置背景颜色
- `text-{colorPath}`: 设置文字颜色
- `border-{colorPath}`: 设置边框颜色

示例：`bg-primary`, `text-secondary-foreground`, `border-gray-200`

### 间距
- `p-{spacingPath}`: 设置内边距 (padding)
- `m-{spacingPath}`: 设置外边距 (margin)
- `gap-{spacingPath}`: 设置网格间距 (gap)

示例：`p-4` (通常映射到 16px), `m-2`, `gap-1`

### 布局
- `flex`, `grid`, `block`, `inline-block`
- `items-center`, `justify-between`

## 动态生成

在适配器中，你可以使用 `useStyle` Hook 动态生成这些样式：

### React
```tsx
const classes = useStyle('bg-primary text-white p-4 rounded-md');
return <div className={classes}>Hello World</div>;
```

### Vue
```vue
<script setup>
const classes = useStyle('bg-primary text-white p-4 rounded-md');
</script>
<template>
  <div :class="classes">Hello World</div>
</template>
```

## Vite 插件支持

为了更好的开发体验，建议使用 `@sxo/vite-plugin`。它会自动扫描你的源码，并在构建时生成必要的 CSS。
