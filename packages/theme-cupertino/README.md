<div align="center">
  <h1>@sxo/theme-cupertino</h1>
  <p><b>iOS Cupertino style theme for the SXO design system. A sleek, translucent, and premium mobile-first aesthetic.</b></p>

  <p>
    <a href="https://www.npmjs.com/package/@sxo/theme-cupertino"><img src="https://img.shields.io/npm/v/@sxo/theme-cupertino.svg?style=flat-square" alt="npm version"></a>
    <img src="https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square" alt="license">
    <img src="https://img.shields.io/npm/dm/@sxo/theme-cupertino.svg?style=flat-square" alt="downloads">
  </p>
</div>

---

`@sxo/theme-cupertino` captures the elegance and fluidity of Apple's iOS design language, providing a premium mobile-first experience for your SXO applications.

## ✨ Features

- 🍎 **iOS Aesthetic**: Translucent effects, soft shadows, and rounded corners.
- 📱 **Mobile First**: Optimized for touch interactions and high-density displays.
- 🎨 **Vibrant Palette**: Uses the iconic iOS system colors for clarity and depth.
- 🧩 **Universal**: Works seamlessly with all SXO framework adaptors.

## 🚀 Quick Start

### Installation

```bash
pnpm add @sxo/theme-cupertino
```

### Usage (Vue 3 Example)

```typescript
import { createSxo } from '@sxo/vue';
import cupertinoTheme from '@sxo/theme-cupertino';

app.use(createSxo({
    tokens: cupertinoTheme
}));
```

## 📖 Documentation

For full documentation and theme customization, visit the [Theme Documentation](https://sxo-engine.pages.dev/zh-CN/guide/tokens.html).

## 📄 License

MIT License.
