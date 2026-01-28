<div align="center">
  <h1>@sxo/theme-github</h1>
  <p><b>GitHub style theme for the SXO design system. A clean, collaborative, and familiar aesthetic.</b></p>

  <p>
    <a href="https://www.npmjs.com/package/@sxo/theme-github"><img src="https://img.shields.io/npm/v/@sxo/theme-github.svg?style=flat-square" alt="npm version"></a>
    <img src="https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square" alt="license">
    <img src="https://img.shields.io/npm/dm/@sxo/theme-github.svg?style=flat-square" alt="downloads">
  </p>
</div>

---

`@sxo/theme-github` brings the familiar look and feel of the GitHub interface to your SXO application, focusing on clarity, simplicity, and great typography.

## ✨ Features

- 🐙 **familiar UI**: Replicates the clean visual language of GitHub.
- 🌫️ **Precise Grayscale**: Carefully picked neutral tones for borders and secondary backgrounds.
- 📈 **Productivity Focused**: Minimalist design that puts content first.
- 🧩 **Universal**: Seamlessly works with all SXO framework adaptors.

## 🚀 Quick Start

### Installation

```bash
pnpm add @sxo/theme-github
```

### Usage (Vue 3 Example)

```typescript
import { createSxo } from '@sxo/vue';
import githubTheme from '@sxo/theme-github';

app.use(createSxo({
    tokens: githubTheme
}));
```

## 📄 License

MIT License.
