<div align="center">
  <h1>@sxo/svelte</h1>
  <p><b>Svelte implementation of the SXO design system, offering a native and lightweight experience.</b></p>

  <p>
    <a href="https://www.npmjs.com/package/@sxo/svelte"><img src="https://img.shields.io/npm/v/@sxo/svelte.svg?style=flat-square" alt="npm version"></a>
    <img src="https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square" alt="license">
    <img src="https://img.shields.io/bundlephobia/minzip/@sxo/svelte?style=flat-square" alt="bundle size">
    <img src="https://img.shields.io/npm/dm/@sxo/svelte.svg?style=flat-square" alt="downloads">
  </p>
</div>

---

`@sxo/svelte` integrates the SXO design system seamlessly into Svelte projects, providing a native developer experience with zero runtime bloat.

## ✨ Key Features

- 🧩 **Headless Logic**: Leverages `@sxo/design` logic for component behavior.
- ⚡ **Svelte Native**: Designed specifically for Svelte's compiler and reactivity model.
- 🎨 **Atomic Styling**: Works perfectly with `@sxo/ui` generators.
- ♿ **Accessible**: Built-in ARIA support and keyboard interaction.
- 🛡️ **Type Safe**: First-class TypeScript support.

## 🚀 Quick Start

### Installation

```bash
pnpm add @sxo/svelte @sxo/ui @sxo/engine @sxo/design
```

### Basic Usage

```svelte
<script>
  import { Button, SxoProvider } from '@sxo/svelte';
  import antdTheme from '@sxo/theme-antd';
</script>

<SxoProvider tokens={antdTheme}>
  <Button variant="primary" on:click={() => console.log('Svelte SXO!')}>
    Click Me
  </Button>
</SxoProvider>
```

## 📖 Documentation

For full documentation and examples, visit the [Svelte Adaptor Documentation](https://sxo-engine.pages.dev/zh-CN/adaptors/svelte.html).

## 📄 License

MIT License.
