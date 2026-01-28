<div align="center">
  <img src="https://raw.githubusercontent.com/sxo-ui/sxo/main/logo.png" width="120" height="120" alt="SXO Logo">
  <h1>SXO</h1>
  <p><b>A modern, modular, cross-framework design system engine.</b></p>

  <p>
    <a href="https://www.npmjs.com/package/@sxo/engine"><img src="https://img.shields.io/npm/v/@sxo/engine.svg?style=flat-square" alt="npm version"></a>
    <a href="https://github.com/sxo-ui/sxo/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square" alt="license"></a>
    <a href="https://github.com/sxo-ui/sxo/pulls"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square" alt="PRs Welcome"></a>
    <img src="https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square" alt="All Contributors">
    <img src="https://img.shields.io/github/workflow/status/sxo-ui/sxo/CI?style=flat-square" alt="Build Status">
  </p>

  <p>
    <a href="https://sxo-engine.pages.dev">Documentation</a> •
    <a href="https://sxo-lab.pages.dev">Interactive Lab</a> •
    <a href="https://sxo-preview.pages.dev">Component Preview</a>
  </p>
</div>

---

SXO is not just another component library. It is a powerful **Design System Engine** designed to provide a unified design language and component logic while seamlessly supporting all major frontend frameworks.

## ✨ Highlights

- 🎨 **Universal Tokens**: Single source of truth for your design language across all platforms.
- 🧩 **Pure Headless**: Complex component logic decoupled from rendering and styling.
- ⚡ **Framework Agnostic**: Native support for **Vue 3, Vue 2, React, Solid, Svelte, and Alpine.js**.
- 🛠️ **Modular & Tiny**: Tree-shakable by design. Only pay for what you use.
- ♿ **Accessibility First**: Built-in ARIA support and keyboard interaction logic.
- 🚀 **AOT Compilation**: Optimized bundle generation for maximum performance.

## 📦 Ecosystem

| Package | Description |
| :--- | :--- |
| [`@sxo/design`](./packages/sxo-design) | Core logic engine and Design Tokens foundation. |
| [`@sxo/engine`](./packages/sxo-engine) | High-performance dynamic style generation engine. |
| [`@sxo/ui`](./packages/sxo-ui) | Framework-independent UI layout and style generators. |
| [`@sxo/cli`](./packages/sxo-cli) | Command-line tools for theme generation and development. |
| **Adaptors** | [Vue](./adaptors/vue) • [React](./adaptors/react) • [Solid](./adaptors/solid) • [Svelte](./adaptors/svelte) • [Alpine](./adaptors/alpine) |

## 🚀 Quick Start

### Installation

```bash
# Using pnpm (recommended)
pnpm add @sxo/engine @sxo/design @sxo/vue
```

### Usage (Vue 3 Example)

```typescript
import { createApp } from 'vue'
import { createSxo } from '@sxo/vue'
import antdTheme from '@sxo/theme-antd'
import App from './App.vue'

const app = createApp(App)
app.use(createSxo({ tokens: antdTheme }))
app.mount('#app')
```

## 🛠️ Development

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run documentation locally
pnpm --filter documentions dev

# Run all tests
pnpm test
```

## 📄 License

SXO is open-source software licensed under the [MIT License](LICENSE.md).

---

<div align="center">
  <sub>Built with ❤️ by the SXO Community.</sub>
</div>
