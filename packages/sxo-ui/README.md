<div align="center">
  <h1>@sxo/ui</h1>
  <p><b>The style contract and layout layer for the SXO design system.</b></p>

  <p>
    <a href="https://www.npmjs.com/package/@sxo/ui"><img src="https://img.shields.io/npm/v/@sxo/ui.svg?style=flat-square" alt="npm version"></a>
    <img src="https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square" alt="license">
    <img src="https://img.shields.io/bundlephobia/minzip/@sxo/ui?style=flat-square" alt="bundle size">
    <img src="https://img.shields.io/npm/dm/@sxo/ui.svg?style=flat-square" alt="downloads">
  </p>
</div>

---

`@sxo/ui` bridges the gap between **Headless Logic** and **Visual Design**. It provides the "Style Contract" that defines how components should look by translating design tokens and states into atomic CSS classes.

## 🌉 Bridging the Gap

While `@sxo/design` handles behavior, `@sxo/ui` handles the visual identity:

1.  **Contract Definition**: Defines standard Props and interfaces for all framework adaptors.
2.  **Style Generation**: Provides pure functions that map component states (e.g., `variant`, `size`, `isOpen`) to atomic CSS classes.
3.  **Unopinionated Layout**: It doesn't render HTML directly, allowing adaptors to maintain their own rendering optimizations.

## ✨ Key Features

- 🎨 **Atomic Generators**: High-performance functions to generate utility-first classes.
- 📐 **Strict Typing**: Full TypeScript interfaces for every component prop and state.
- 🧩 **Framework Independent**: Use the same style logic in React, Vue, Solid, or even vanilla JS.
- 🚀 **AOT Ready**: Designed for both runtime generation and ahead-of-time compilation.

## 🚀 Quick Start

### Installation

```bash
pnpm add @sxo/ui @sxo/engine
```

### Using Class Generators

Generate atomic styles based on component state. This is how we keep the UI consistent while remaining headless at the logic level.

```typescript
import { getButtonClasses } from '@sxo/ui';

// Map component state to atomic classes
const classes = getButtonClasses({
    variant: 'primary',
    size: 'md',
    loading: true
});
// Result: "inline-flex bg-primary-DEFAULT px-4 py-2 opacity-50 cursor-wait ..."
```

### Component Contracts

Ensures that every framework implementation (React, Vue, etc.) adheres to the same API.

```typescript
import type { ButtonProps } from '@sxo/ui';
```

## 📖 Documentation

For full documentation and examples, visit the [Components Index](https://sxo-engine.pages.dev/zh/components/button.html).

## 📄 License

MIT License.
