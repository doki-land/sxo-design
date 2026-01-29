<div align="center">
  <h1>@sxo/alpine</h1>
  <p><b>Alpine.js implementation of the SXO design system, bringing powerful headless logic to the simple and declarative world of Alpine.</b></p>

  <p>
    <a href="https://www.npmjs.com/package/@sxo/alpine"><img src="https://img.shields.io/npm/v/@sxo/alpine.svg?style=flat-square" alt="npm version"></a>
    <img src="https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square" alt="license">
    <img src="https://img.shields.io/bundlephobia/minzip/@sxo/alpine?style=flat-square" alt="bundle size">
    <img src="https://img.shields.io/npm/dm/@sxo/alpine.svg?style=flat-square" alt="downloads">
  </p>
</div>

---

`@sxo/alpine` allows you to use SXO's design tokens and component logic within your Alpine.js projects with ease.

## ✨ Key Features

- 🧩 **Headless Integration**: Use SXO's state management directly in your `x-data`.
- ⚡ **Lightweight**: Minimal overhead, fitting perfectly with Alpine's philosophy.
- 🎨 **Atomic Styling**: Consumes `@sxo/ui` generators for class-based styling.
- 🛡️ **Type Safe**: TypeScript support for better IDE integration.

## 🚀 Quick Start

### Installation

```bash
pnpm add @sxo/alpine @sxo/ui @sxo/engine @sxo/design
```

### Basic Usage

```html
<div x-data="sxoButton({ variant: 'primary' })">
  <button :class="classes" @click="handleClick">
    Click Me
  </button>
</div>

<script>
  import Alpine from 'alpinejs';
  import { sxoButton } from '@sxo/alpine';

  Alpine.data('sxoButton', sxoButton);
  Alpine.start();
</script>
```

## 📖 Documentation

For full documentation and examples, visit the [Alpine.js Adaptor Documentation](https://sxo-engine.pages.dev/zh-CN/adaptors/alpine.html).

## 📄 License

MIT License.
