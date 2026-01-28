<div align="center">
  <h1>@sxo/vite-plugin</h1>
  <p><b>A powerful Vite plugin to optimize your SXO development experience.</b></p>

  <p>
    <a href="https://www.npmjs.com/package/@sxo/vite-plugin"><img src="https://img.shields.io/npm/v/@sxo/vite-plugin.svg?style=flat-square" alt="npm version"></a>
    <img src="https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square" alt="license">
    <img src="https://img.shields.io/npm/dm/@sxo/vite-plugin.svg?style=flat-square" alt="downloads">
  </p>
</div>

---

`@sxo/vite-plugin` streamlines the integration of the SXO design system into your Vite-powered projects. It handles on-demand importing, style optimization, and development-time enhancements.

## ✨ Features

- ⚡ **Auto-import**: Automatically injects component imports and their corresponding atomic styles.
- 🎨 **Theme HMR**: Supports hot module replacement for themes, allowing real-time visual updates.
- 📦 **Bundle Optimization**: Tree-shakes unused component logic and styles for minimal production builds.
- 🛠️ **Seamless Integration**: Works out of the box with React, Vue, Solid, and Svelte adaptors.

## 🚀 Quick Start

### Installation

```bash
pnpm add -D @sxo/vite-plugin
```

### Usage (vite.config.ts)

```typescript
import { defineConfig } from 'vite';
import sxo from '@sxo/vite-plugin';

export default defineConfig({
  plugins: [
    sxo({
      // Configuration options
      autoImport: true,
      theme: 'antd'
    })
  ]
});
```

## 📖 Documentation

For full configuration options, visit the [Vite Plugin Documentation](https://sxo-engine.pages.dev/zh/adaptors/vite-plugin.html).

## 📄 License

MIT License.
