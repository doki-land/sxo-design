<div align="center">
  <h1>@sxo/component-admin</h1>
  <p><b>A set of high-level layout and navigation components for building modern admin interfaces.</b></p>

  <p>
    <a href="https://www.npmjs.com/package/@sxo/component-admin"><img src="https://img.shields.io/npm/v/@sxo/component-admin.svg?style=flat-square" alt="npm version"></a>
    <img src="https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square" alt="license">
    <img src="https://img.shields.io/npm/dm/@sxo/component-admin.svg?style=flat-square" alt="downloads">
  </p>
</div>

---

`@sxo/component-admin` provides the structural building blocks for professional administration panels. It follows the SXO design philosophy, offering flexible, headless-inspired layouts that adapt to any visual style.

## ✨ Key Features

- 🏗️ **Modular Layouts**: Pre-configured yet flexible sidebar, top bar, and multi-tab navigation.
- 🧩 **Headless Navigation**: Logical state management for active routes and tab history.
- 🎨 **Themeable**: Seamlessly inherits styles from any SXO theme (AntD, GitHub, etc.).
- 🛡️ **Type Safe**: Full TypeScript support for layout configurations.

## 🚀 Quick Start

### Installation

```bash
pnpm add @sxo/component-admin
```

### Usage

```typescript
import { createAdminLayout } from '@sxo/component-admin';

const layout = createAdminLayout({
  sidebar: { collapsed: false },
  tabs: { enabled: true }
});

// Access layout state in your components
console.log(layout.sidebarClasses);
```

## 📖 Documentation

For full documentation and layout examples, visit the [Admin Component Documentation](https://sxo-engine.pages.dev/zh/components/admin.html).

## 📄 License

MIT License.
