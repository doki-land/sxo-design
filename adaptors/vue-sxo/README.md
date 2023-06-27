# vue-sxo

SXO 设计系统的 Vue 3 适配器。

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

// 可以传入自定义 tokens
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

## 功能

- **Vue 3 原生支持**: 基于 Composition API 构建。
- **自动样式注入**: 组件渲染时自动通过样式引擎注入所需 CSS。
- **类型安全**: 完善的 TypeScript 支持。
