# vue2-sxo

SXO 设计系统的 Vue 2 适配器。

## 安装

```bash
pnpm add vue2-sxo @sxo/ui @sxo/engine @sxo/design
```

## 快速开始

### 1. 注册插件

```javascript
import Vue from 'vue';
import { SxoPlugin } from 'vue2-sxo';

Vue.use(SxoPlugin, {
  theme: 'github'
});
```

### 2. 使用组件

```vue
<template>
  <sxo-button variant="primary">Vue 2 Button</sxo-button>
</template>
```
