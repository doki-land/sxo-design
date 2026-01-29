<div align="center">
  <h1>@sxo/plugin-vue2</h1>
  <p><b>Vue 2 implementation of the SXO design system. Legacy support with modern headless logic.</b></p>

  <p>
    <a href="https://www.npmjs.com/package/@sxo/plugin-vue2"><img src="https://img.shields.io/npm/v/@sxo/plugin-vue2.svg?style=flat-square" alt="npm version"></a>
    <img src="https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square" alt="license">
    <img src="https://img.shields.io/npm/dm/@sxo/plugin-vue2.svg?style=flat-square" alt="downloads">
  </p>
</div>

---

`@sxo/plugin-vue2` provides the headless component logic and atomic styling of the SXO design system to Vue 2.x projects, ensuring consistent UI across your entire tech stack.

## ✨ Features

- 🧩 **Headless Logic**: Powered by the same core logic as other adaptors.
- 🎨 **Atomic Styling**: Seamlessly integrates with `@sxo/ui` generators.
- 🏛️ **Legacy Support**: Full compatibility with Vue 2.x projects.
- 🛡️ **Type Safe**: TypeScript support for components and options.

## 🚀 Quick Start

### Installation

```bash
pnpm add @sxo/plugin-vue2 @sxo/ui @sxo/engine @sxo/design
```

### Usage

```javascript
import Vue from 'vue';
import { createSxo } from '@sxo/plugin-vue2';
import antdTheme from '@sxo/theme-antd';

Vue.use(createSxo({ tokens: antdTheme }));
```

## 📖 Documentation

For full documentation and examples, visit the [Vue 2 Adaptor Documentation](https://sxo-engine.pages.dev/zh-CN/adaptors/vue2.html).

## 📄 License

MIT License.
