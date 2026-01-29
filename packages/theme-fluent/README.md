<div align="center">
  <h1>@sxo/theme-fluent</h1>
  <p><b>Microsoft Fluent style theme for the SXO design system. A modern, multi-layered, and accessible aesthetic.</b></p>

  <p>
    <a href="https://www.npmjs.com/package/@sxo/theme-fluent"><img src="https://img.shields.io/npm/v/@sxo/theme-fluent.svg?style=flat-square" alt="npm version"></a>
    <img src="https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square" alt="license">
    <img src="https://img.shields.io/npm/dm/@sxo/theme-fluent.svg?style=flat-square" alt="downloads">
  </p>
</div>

---

`@sxo/theme-fluent` brings the modern, accessible, and multi-layered visual language of Microsoft's Fluent Design System to the SXO ecosystem.

## ✨ Features

- 💎 **Acrylic & Mica**: Signature translucent and layered effects for depth and focus.
- 🎨 **Inclusive Design**: High-contrast support and accessibility-first color choices.
- 📐 **Adaptive Layout**: Designed to work across different screen sizes and input methods.
- 🧩 **Universal**: Fully compatible with all SXO framework adaptors.

## 🚀 Quick Start

### Installation

```bash
pnpm add @sxo/theme-fluent
```

### Usage (Vue 3 Example)

```typescript
import { createSxo } from '@sxo/plugin-vue';
import fluentTheme from '@sxo/theme-fluent';

app.use(createSxo({
    tokens: fluentTheme
}));
```

## 📄 License

MIT License.
