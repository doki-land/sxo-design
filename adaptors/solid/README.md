<div align="center">
  <h1>@sxo/solid</h1>
  <p><b>SolidJS implementation of the SXO design system, built for speed and fine-grained reactivity.</b></p>

  <p>
    <a href="https://www.npmjs.com/package/@sxo/solid"><img src="https://img.shields.io/npm/v/@sxo/solid.svg?style=flat-square" alt="npm version"></a>
    <img src="https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square" alt="license">
    <img src="https://img.shields.io/bundlephobia/minzip/@sxo/solid?style=flat-square" alt="bundle size">
    <img src="https://img.shields.io/npm/dm/@sxo/solid.svg?style=flat-square" alt="downloads">
  </p>
</div>

---

`@sxo/solid` brings the power of the SXO design system to SolidJS, combining high-performance fine-grained reactivity with robust headless logic.

## ✨ Key Features

- 🧩 **Headless Logic**: Integrated with `@sxo/design` logic for state management.
- ⚡ **High Performance**: Optimized for SolidJS's fine-grained reactivity system.
- 🎨 **Atomic Styling**: Seamlessly integrates with `@sxo/ui` generators.
- ♿ **Accessible**: Built-in ARIA support and keyboard interaction.
- 🛡️ **Type Safe**: Full TypeScript support.

## 🚀 Quick Start

### Installation

```bash
pnpm add @sxo/solid @sxo/ui @sxo/engine @sxo/design
```

### Basic Usage

```tsx
import { Button, SxoProvider } from '@sxo/solid';
import antdTheme from '@sxo/theme-antd';

function App() {
  return (
    <SxoProvider tokens={antdTheme}>
      <Button variant="primary" onClick={() => console.log('Solid SXO!')}>
        Click Me
      </Button>
    </SxoProvider>
  );
}
```

## 📖 Documentation

For full documentation and examples, visit the [SolidJS Adaptor Documentation](https://sxo-engine.pages.dev/zh-CN/adaptors/solid.html).

## 📄 License

MIT License.
