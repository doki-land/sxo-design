<div align="center">
  <h1>@sxo/theme-wechat</h1>
  <p><b>WeChat style theme for the SXO design system. A familiar, clean, and reliable aesthetic for web and mini-programs.</b></p>

  <p>
    <a href="https://www.npmjs.com/package/@sxo/theme-wechat"><img src="https://img.shields.io/npm/v/@sxo/theme-wechat.svg?style=flat-square" alt="npm version"></a>
    <img src="https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square" alt="license">
    <img src="https://img.shields.io/npm/dm/@sxo/theme-wechat.svg?style=flat-square" alt="downloads">
  </p>
</div>

---

`@sxo/theme-wechat` provides the iconic, clean, and highly reliable visual style of WeChat (WeUI) for the SXO ecosystem. Perfect for building applications that need a familiar look and feel.

## ✨ Features

- 🟢 **WeChat Aesthetic**: Uses the signature WeChat green and neutral palette.
- 📱 **Mini-Program Ready**: Optimized for both web and WeChat Mini-Program environments.
- 🎨 **Clean & Reliable**: Focuses on content clarity and standard interface patterns.
- 🧩 **Universal**: Fully compatible with all SXO framework adaptors.

## 🚀 Quick Start

### Installation

```bash
pnpm add @sxo/theme-wechat
```

### Usage (Vue 3 Example)

```typescript
import { createSxo } from '@sxo/vue';
import wechatTheme from '@sxo/theme-wechat';

app.use(createSxo({
    tokens: wechatTheme
}));
```

## 📖 Documentation

For full documentation and theme customization, visit the [Theme Documentation](https://sxo-engine.pages.dev/zh/guide/tokens.html).

## 📄 License

MIT License.
