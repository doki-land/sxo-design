<div align="center">
  <h1>@sxo/engine</h1>
  <p><b>High-performance dynamic style generation engine for the SXO design system.</b></p>

  <p>
    <a href="https://www.npmjs.com/package/@sxo/engine"><img src="https://img.shields.io/npm/v/@sxo/engine.svg?style=flat-square" alt="npm version"></a>
    <img src="https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square" alt="license">
    <img src="https://img.shields.io/bundlephobia/minzip/@sxo/engine?style=flat-square" alt="bundle size">
    <img src="https://img.shields.io/npm/dm/@sxo/engine.svg?style=flat-square" alt="downloads">
  </p>
</div>

---

`@sxo/engine` is a powerful, runtime-first CSS-in-JS engine that generates atomic utility classes on demand. It bridges the gap between static design tokens and dynamic application needs.

## ✨ Key Features

- ⚡ **On-Demand Generation**: Generate CSS only when needed, keeping your styles lean.
- 📱 **Responsive by Default**: Built-in support for customizable breakpoints.
- 🎭 **State Variants**: Easy handling of `hover`, `focus`, `active`, and other pseudo-classes.
- 🚀 **Performance Optimized**: Advanced caching prevents redundant style injections.
- 🧩 **Design Token First**: Native integration with `@sxo/design` tokens.

## 🚀 Quick Start

### Installation

```bash
pnpm add @sxo/engine @sxo/design
```

### Basic Usage

```typescript
import { StyleEngine } from '@sxo/engine';
import { defaultTokens } from '@sxo/design';

const engine = new StyleEngine(defaultTokens);

// Generate atomic class styles
const className = engine.generate('text-primary-DEFAULT bg-background-secondary');
// Automatically injects corresponding CSS into the head
```

### Responsive & States

Supports prefixes similar to Tailwind CSS for maximum familiarity.

```typescript
// Responsive breakpoints
engine.generate('md:text-lg lg:grid-cols-2');

// Interactive state variants
engine.generate('hover:bg-primary-DEFAULT focus:ring-2');
```

## 📖 Documentation

For full documentation and examples, visit the [Atomic CSS Documentation](https://sxo-engine.pages.dev/zh-CN/guide/atomic-css.html).

## 📄 License

MIT License.
