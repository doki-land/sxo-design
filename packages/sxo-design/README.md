<div align="center">
  <h1>@sxo/design</h1>
  <p><b>The core logic engine and design token foundation for the SXO design system.</b></p>

  <p>
    <a href="https://www.npmjs.com/package/@sxo/design"><img src="https://img.shields.io/npm/v/@sxo/design.svg?style=flat-square" alt="npm version"></a>
    <img src="https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square" alt="license">
    <img src="https://img.shields.io/bundlephobia/minzip/@sxo/design?style=flat-square" alt="bundle size">
    <img src="https://img.shields.io/npm/dm/@sxo/design.svg?style=flat-square" alt="downloads">
  </p>
</div>

---

`@sxo/design` is the heart of the SXO ecosystem. It provides the complex state management, accessibility (A11y), and behavioral logic of UI components without being tied to any specific markup or styling implementation.

## 🧩 The Headless Philosophy

- **Zero Style Coupling**: Logic is completely separated from CSS. Use our atomic engine or your own CSS-in-JS/Sass solutions.
- **Framework Agnostic**: Core logic is written in vanilla TypeScript, making it portable across any framework adaptor.
- **Full Creative Control**: You have 100% control over the rendered HTML structure while we handle the "heavy lifting".
- **Maximum Reusability**: Share complex component behaviors across different projects with entirely different visual identities.

## ✨ Features

- ♿ **A11y First**: Built-in ARIA support and keyboard interaction logic.
- 🛡️ **Type Safe**: First-class TypeScript support for all tokens and logic.
- 📦 **Modular**: Only import the logic you need. Tree-shakable by design.
- 🎨 **Token Driven**: Centralized design tokens for colors, spacing, typography, and more.

## 🚀 Quick Start

### Installation

```bash
pnpm add @sxo/design
```

### 1. Using Headless Logic Hooks

Stateful logic for complex components like Menus, Dialogs, and Comboboxes.

```typescript
import { useAccordion } from '@sxo/design';

// The hook returns state and event handlers, but NO UI components.
const { expandedItems, toggleItem, getHeaderProps, getPanelProps } = useAccordion({
    allowMultiple: true
});
```

### 2. Using Design Tokens

The atomic design language of the system.

```typescript
import { defaultTokens } from '@sxo/design';

// Use as a single source of truth for colors, spacing, etc.
const primaryColor = defaultTokens.color.primary.DEFAULT;
```

## 📖 Documentation

For full documentation and examples, visit the [Design Tokens Documentation](https://sxo-engine.pages.dev/zh/guide/tokens.html).

## 📄 License

MIT License.
