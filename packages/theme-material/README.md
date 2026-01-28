<div align="center">
  <h1>@sxo/theme-material</h1>
  <p><b>Material Design (M3) style theme for the SXO design system. A modern, tactile, and expressive aesthetic.</b></p>

  <p>
    <a href="https://www.npmjs.com/package/@sxo/theme-material"><img src="https://img.shields.io/npm/v/@sxo/theme-material.svg?style=flat-square" alt="npm version"></a>
    <img src="https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square" alt="license">
    <img src="https://img.shields.io/npm/dm/@sxo/theme-material.svg?style=flat-square" alt="downloads">
  </p>
</div>

---

`@sxo/theme-material` brings Google's Material You (M3) design philosophy to the SXO ecosystem, featuring dynamic color capabilities and a focus on tactile surfaces.

## ✨ Features

- 📐 **M3 Specifications**: Follows the latest Material Design 3 guidelines.
- 🎨 **Expressive Color**: Optimized for dynamic color schemes and high legibility.
- 🏔️ **Elevation & Depth**: Signature use of shadows and surfaces to indicate hierarchy.
- 🧩 **Universal**: Fully compatible with all SXO framework adaptors.

## 🚀 Quick Start

### Installation

```bash
pnpm add @sxo/theme-material
```

### Usage (Vue 3 Example)

```typescript
import { createSxo } from '@sxo/vue';
import materialTheme from '@sxo/theme-material';

app.use(createSxo({
    tokens: materialTheme
}));
```

## 📄 License

MIT License.
