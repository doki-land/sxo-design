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
<template>
  <div :class="classes">Hello World</div>
</template>

<script setup>
const classes = useStyle('bg-primary text-white p-4 rounded-md');
</script>
```

## Vite 插件支持

为了更好的开发体验，建议使用 `@sxo/vite-plugin`。它会自动扫描你的源码，并在构建时生成必要的 CSS。

## 拥抱 Web 标准

SXO 的设计哲学之一是**拥抱 Web 标准**。因此，SXO 引擎**不支持**类似 Tailwind CSS 中的 `@apply` 指令或其他非标准的 CSS 私有语法。

### 为什么不支持 `@apply`？

1. **非标准语法**：`@apply` 曾是一个 CSS 草案，但由于性能和复杂性问题已被 W3C 废弃。它永远不会在浏览器中原生运行。
2. **调试困难**：`@apply` 会在编译阶段将原子类展开，导致在浏览器开发者工具中看到的样式与源码不一致。
3. **维护成本**：过度使用 `@apply` 会导致样式的隐式依赖，违背了原子化 CSS “所见即所得”的初衷。

### 替代方案

如果你需要复用样式，我们推荐以下符合 Web 标准的方式：

#### 1. 使用设计令牌 (Design Tokens)

SXO 会自动将设计令牌转换为 CSS 变量。你可以在标准的 CSS/SCSS 文件中直接使用它们：

```css
.my-custom-card {
  background-color: var(--sxo-color-surface);
  padding: var(--sxo-spacing-4);
  border-radius: var(--sxo-radius-md);
  border: 1px solid var(--sxo-color-border);
}
```

#### 2. 组件化抽象

在现代前端框架（Vue, React, Solid）中，解决样式复用的最佳方案是**组件化**。

```tsx
// 推荐：将常用的原子类组合封装为组件
const PrimaryButton = ({ children }) => (
  <button className="bg-primary text-white p-2 rounded hover:bg-primary-600">
    {children}
  </button>
);
```

通过组件化，你可以获得更好的类型检查、逻辑复用以及清晰的结构，而无需引入复杂的 CSS 预处理步骤。
