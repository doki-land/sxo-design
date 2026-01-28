<div align="center">
  <h1>@sxo/theme-antd</h1>
  <p><b>Ant Design style theme for the SXO design system.</b></p>

  <p>
    <a href="https://www.npmjs.com/package/@sxo/theme-antd"><img src="https://img.shields.io/npm/v/@sxo/theme-antd.svg?style=flat-square" alt="npm version"></a>
    <img src="https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square" alt="license">
    <img src="https://img.shields.io/npm/dm/@sxo/theme-antd.svg?style=flat-square" alt="downloads">
  </p>
</div>

---

`@sxo/theme-antd` provides a set of design tokens that replicate the clean, professional, and technical look of Ant Design 5.0 for your SXO-powered application.

## ✨ Features

- 💼 **Professional UI**: Based on Ant Design 5.0 specifications.
- 🎨 **Balanced Palette**: Uses the classic "Technical Blue" as the primary color.
- 📐 **Precise Spacing**: Follows the 8px grid system for layout and typography.
- 🧩 **Drop-in Integration**: Works seamlessly with all SXO framework adaptors.

## 🚀 Quick Start

### Installation

```bash
pnpm add @sxo/theme-antd
```

### Usage (Vue 3 Example)

```typescript
import { createSxo } from '@sxo/vue';
import antdTheme from '@sxo/theme-antd';

app.use(createSxo({
    tokens: antdTheme
}));
```

## 📄 License

MIT License.
