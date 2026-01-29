<div align="center">
  <h1>@sxo/react</h1>
  <p><b>React implementation of the SXO design system, powered by Headless UI principles.</b></p>

  <p>
    <a href="https://www.npmjs.com/package/@sxo/react"><img src="https://img.shields.io/npm/v/@sxo/react.svg?style=flat-square" alt="npm version"></a>
    <img src="https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square" alt="license">
    <img src="https://img.shields.io/bundlephobia/minzip/@sxo/react?style=flat-square" alt="bundle size">
    <img src="https://img.shields.io/npm/dm/@sxo/react.svg?style=flat-square" alt="downloads">
  </p>
</div>

---

`@sxo/react` provides a set of robust, accessible, and highly customizable React components built on the foundation of the SXO design system.

## ✨ Key Features

- 🧩 **Headless Power**: Leverages `@sxo/design` logic hooks for complex behaviors.
- 🎨 **Atomic Styling**: Consumes `@sxo/ui` generators for consistent visual language.
- ⚡ **Framework Native**: Optimized for React's reconciliation and hook system.
- ♿ **Accessible**: Built-in ARIA support and keyboard interaction.
- 🛡️ **Type Safe**: First-class TypeScript support for props and state.

## 🚀 Quick Start

### Installation

```bash
pnpm add @sxo/react @sxo/ui @sxo/engine @sxo/design
```

### Basic Usage

Use our pre-built components for rapid development.

```tsx
import { Button, SxoProvider } from '@sxo/react';
import antdTheme from '@sxo/theme-antd';

function App() {
  return (
    <SxoProvider tokens={antdTheme}>
      <Button variant="primary" onClick={() => console.log('Clicked!')}>
        Click Me
      </Button>
    </SxoProvider>
  );
}
```

### The Headless Way

Build your own components using our underlying logic hooks.

```tsx
import { useAccordion } from '@sxo/react';

function CustomAccordion() {
  const { expandedItems, toggleItem } = useAccordion({ allowMultiple: false });

  return (
    <div className="custom-accordion">
      <button onClick={() => toggleItem('item-1')}>Toggle Item 1</button>
      {expandedItems.includes('item-1') && <div>Content 1</div>}
    </div>
  );
}
```

## 📖 Documentation

For full documentation and examples, visit the [React Adaptor Documentation](https://sxo-engine.pages.dev/zh-CN/adaptors/react.html).

## 📄 License

MIT License.
