<div align="center">
  <h1>@sxo/vue</h1>
  <p><b>Vue 3 implementation of the SXO design system, built on a Headless UI architecture.</b></p>

  <p>
    <a href="https://www.npmjs.com/package/@sxo/vue"><img src="https://img.shields.io/npm/v/@sxo/vue.svg?style=flat-square" alt="npm version"></a>
    <img src="https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square" alt="license">
    <img src="https://img.shields.io/bundlephobia/minzip/@sxo/vue?style=flat-square" alt="bundle size">
    <img src="https://img.shields.io/npm/dm/@sxo/vue.svg?style=flat-square" alt="downloads">
  </p>
</div>

---

`@sxo/vue` provides a set of robust, accessible, and highly customizable Vue 3 components powered by the Composition API and SXO's headless core.

## ✨ Key Features

- 🧩 **Headless Core**: Powered by `@sxo/design` Composition API hooks for state and behavior.
- 🎨 **Atomic Styling**: Seamlessly integrates with `@sxo/ui` for consistent visual language.
- ⚡ **Vue Optimized**: Leverages Vue 3's reactivity system and `script setup` ergonomics.
- ♿ **Accessible**: Built-in ARIA support and keyboard interaction out of the box.
- 🛡️ **Type Safe**: First-class TypeScript support for all components and hooks.

## 🚀 Quick Start

### Installation

```bash
pnpm add @sxo/vue @sxo/ui @sxo/engine @sxo/design
```

### 1. Register the Plugin

```typescript
import { createApp } from 'vue';
import { createSxo } from '@sxo/vue';
import antdTheme from '@sxo/theme-antd';
import App from './App.vue';

const app = createApp(App);
app.use(createSxo({ tokens: antdTheme }));
app.mount('#app');
```

### 2. Basic Usage

```vue
<template>
  <SxoButton variant="primary" @click="handleClick">
    Click Me
  </SxoButton>
</template>

<script setup>
import { Button as SxoButton } from '@sxo/vue';

const handleClick = () => console.log('Hello SXO!');
</script>
```

### 3. The Headless Way

Build custom components using our underlying Composition API hooks.

```vue
<template>
  <div class="custom-accordion">
    <button v-for="id in ['item-1', 'item-2']" :key="id" @click="toggleItem(id)">
      Toggle {{ id }}
    </button>
    <div v-if="expandedItems.includes('item-1')">Content 1</div>
  </div>
</template>

<script setup>
import { useAccordion } from '@sxo/vue';

const { expandedItems, toggleItem } = useAccordion({ allowMultiple: false });
</script>
```

## 📖 Documentation

For full documentation and examples, visit the [Vue Adaptor Documentation](https://sxo-engine.pages.dev/zh/adaptors/vue.html).

## 📄 License

MIT License.
