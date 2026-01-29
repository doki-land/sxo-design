<div align="center">
  <h1>@sxo/theme-carbon</h1>
  <p><b>IBM Carbon style theme for the SXO design system. A modern, industrial, and high-precision aesthetic.</b></p>

  <p>
    <a href="https://www.npmjs.com/package/@sxo/theme-carbon"><img src="https://img.shields.io/npm/v/@sxo/theme-carbon.svg?style=flat-square" alt="npm version"></a>
    <img src="https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square" alt="license">
    <img src="https://img.shields.io/npm/dm/@sxo/theme-carbon.svg?style=flat-square" alt="downloads">
  </p>
</div>

---

`@sxo/theme-carbon` brings the high-precision, data-driven visual language of IBM Carbon to the SXO ecosystem.

## ✨ Features

- 🏗️ **Enterprise Ready**: Based on IBM's Carbon Design System specifications.
- 🎨 **Industrial Palette**: Focused on clarity with a neutral-heavy color system.
- 📐 **Grid Optimized**: Follows the 2x grid for precise alignment and spacing.
- 🧩 **Universal**: Compatible with all SXO framework adaptors.

## 🚀 Quick Start

### Installation

```bash
pnpm add @sxo/theme-carbon
```

### Usage (Vue 3 Example)

```typescript
import { createSxo } from '@sxo/plugin-vue';
import carbonTheme from '@sxo/theme-carbon';

app.use(createSxo({
    tokens: carbonTheme
}));
```

## 📖 Documentation

For full documentation and theme customization, visit the [Theme Documentation](https://sxo-engine.pages.dev/zh-CN/guide/tokens.html).

## 📄 License

MIT License.
