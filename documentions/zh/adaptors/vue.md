# vue-sxo

SXO 设计系统的 Vue 3 适配器，基于 Composition API 构建，提供流畅的 Vue 开发体验。

## 安装

```bash
pnpm add vue-sxo @sxo/ui @sxo/engine @sxo/design
```

## 快速开始

### 1. 注册插件

在 `main.ts` 中引入并使用 `createSxo` 插件：

```typescript
import { createApp } from 'vue';
import { createSxo } from 'vue-sxo';
import App from './App.vue';

const app = createApp(App);

app.use(createSxo({
    mode: 'light'
}));

app.mount('#app');
```

### 2. 使用组件

```vue
<template>
  <SxoButton variant="primary" @click="handleClick">
    Click Me
  </SxoButton>
</template>

<script setup>
import { Button as SxoButton } from 'vue-sxo';

const handleClick = () => console.log('Hello SXO!');
</script>
```

## ⚡ JIT 自动注入机制

`vue-sxo` 利用 Vue 3 的插件系统和指令系统，实现了与 JIT 引擎的无缝对接：

1.  **按需计算**: 仅在组件被渲染时，JIT 引擎才会计算该组件所需的 CSS。
2.  **指令增强**: 支持 `v-sxo` 指令，允许在普通 HTML 元素上直接使用 JIT 样式属性。
3.  **HMR 支持**: 开发模式下，修改组件的样式相关属性会立即触发 JIT 引擎重绘，无需刷新页面。

## 功能特性

- **Vue 3 原生支持**: 深度集成 Composition API，提供响应式的样式管理。
- **自动样式注入**: 组件渲染时自动通过 JIT 引擎注入所需 CSS，实现真正的“零 CSS 引入”。
- **类型安全**: 完善的 TypeScript 支持，配合 Volar 提供极佳的模板开发体验。
