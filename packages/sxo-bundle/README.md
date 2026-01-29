<div align="center">
  <h1>@sxo/bundle</h1>
  <p><b>AOT (Ahead-of-Time) compiled CSS and runtime bundle for the SXO design system. Zero-runtime styling for any environment.</b></p>

  <p>
    <a href="https://www.npmjs.com/package/@sxo/bundle"><img src="https://img.shields.io/npm/v/@sxo/bundle.svg?style=flat-square" alt="npm version"></a>
    <img src="https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square" alt="license">
    <img src="https://img.shields.io/npm/dm/@sxo/bundle.svg?style=flat-square" alt="downloads">
  </p>
</div>

---

`@sxo/bundle` provides a pre-generated, static version of the SXO styling system. It's designed for CDN usage, static site generators, or any environment where you want the power of SXO without the overhead of a runtime style engine.

## ✨ Features

- 🚀 **Zero Runtime**: Instant style rendering without JavaScript execution.
- 🎨 **Multi-theme Support**: Pre-compiled CSS for all official SXO themes (AntD, GitHub, etc.).
- 📦 **CDN Ready**: Optimized for fast delivery via unpkg, jsDelivr, or your own CDN.
- ⚡ **Tiny Footprint**: Only contains the atomic classes used by the SXO component library.
- 🛠️ **Easy Integration**: Perfect for WordPress, Hexo, Hugo, or legacy projects.

## 🚀 Quick Start

### CDN Usage

Include the core and your chosen theme CSS in your HTML header:

```html
<!-- 1. Core CSS (Utility classes) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@sxo/bundle/dist/sxo-core.css">

<!-- 2. Theme CSS (e.g., GitHub theme) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@sxo/bundle/dist/sxo-theme-github.css">

<!-- 3. Optional Runtime (Theme switching) -->
<script src="https://cdn.jsdelivr.net/npm/@sxo/bundle/dist/sxo.js"></script>
```

### Theme Management

```javascript
// Switch theme at runtime using the optional helper
SXO.setTheme('github');
```

## 📖 Documentation

For integration guides with static site generators, visit the [AOT Integration Guide](https://sxo-engine.pages.dev/zh-CN/guide/getting-started.html).

## 📄 License

MIT License.
