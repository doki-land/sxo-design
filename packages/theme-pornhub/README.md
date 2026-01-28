<div align="center">
  <h1>@sxo/theme-pornhub</h1>
  <p><b>Pornhub style theme for the SXO design system. A high-contrast, dark-mode-first aesthetic.</b></p>

  <p>
    <a href="https://www.npmjs.com/package/@sxo/theme-pornhub"><img src="https://img.shields.io/npm/v/@sxo/theme-pornhub.svg?style=flat-square" alt="npm version"></a>
    <img src="https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square" alt="license">
    <img src="https://img.shields.io/npm/dm/@sxo/theme-pornhub.svg?style=flat-square" alt="downloads">
  </p>
</div>

---

`@sxo/theme-pornhub` provides a striking, high-contrast dark theme based on the iconic color palette of Pornhub.

## ✨ Features

- 🌑 **Dark Mode First**: Optimized for low-light environments and high-contrast accessibility.
- 🟠 **Classic Palette**: Deep black backgrounds with the signature "Warning Orange" (#FF9900).
- 👁️ **High Readability**: Bold typography and clear state indicators.
- 🧩 **Universal**: Compatible with all SXO adaptors and the core engine.

## 🚀 Quick Start

### Installation

```bash
pnpm add @sxo/theme-pornhub
```

### Usage (Vue 3 Example)

```typescript
import { createSxo } from '@sxo/vue';
import pornhubTheme from '@sxo/theme-pornhub';

app.use(createSxo({
    tokens: pornhubTheme
}));
```

## 📄 License

MIT License.
