<div align="center">
  <h1>@sxo/component-wysiwyg</h1>
  <p><b>A headless WYSIWYG Markdown editor component for the SXO design system, powered by Milkdown.</b></p>

  <p>
    <a href="https://www.npmjs.com/package/@sxo/component-wysiwyg"><img src="https://img.shields.io/npm/v/@sxo/component-wysiwyg.svg?style=flat-square" alt="npm version"></a>
    <img src="https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square" alt="license">
    <img src="https://img.shields.io/npm/dm/@sxo/component-wysiwyg.svg?style=flat-square" alt="downloads">
  </p>
</div>

---

`@sxo/component-wysiwyg` embraces the headless philosophy by providing a robust Markdown editing engine without imposing a rigid UI. It acts as a thin, logic-heavy wrapper around [Milkdown](https://milkdown.dev/), allowing you to build your own editor UI using SXO design tokens.

## 🧩 Headless Architecture

- **UI Decoupling**: Build your own custom toolbar and editor chrome while we handle the complex Prosemirror-based editing logic.
- **Customizable Rendering**: Easily extend the editor with Milkdown plugins without breaking the UI.
- **Consistent Design**: Seamlessly integrates with `@sxo/engine` for atomic styling of the editor container.

## ✨ Features

- 📝 **Markdown-first**: Built on a modern foundation for a seamless Markdown experience.
- 🐙 **GFM Ready**: Native support for GitHub Flavored Markdown (tables, task lists, etc.).
- ⚙️ **Command API**: Easily trigger formatting and structure changes via a simple API.
- 🛡️ **Type Safe**: Full TypeScript support for editor instances and options.

## 🚀 Quick Start

### Installation

```bash
pnpm add @sxo/component-wysiwyg @milkdown/core @milkdown/preset-gfm
```

### Usage

```typescript
import { createWysiwygEditor } from '@sxo/component-wysiwyg';

const container = document.getElementById('wysiwyg-container');
const editorInstance = await createWysiwygEditor(container, {
    defaultValue: '# Hello World',
    onChange: (markdown) => console.log('Markdown updated:', markdown)
});

// Run commands from your custom UI
editorInstance.runCommand('toggleBold');

// Cleanup
editorInstance.destroy();
```

## 📖 Documentation

For more details, visit the [WYSIWYG Component Documentation](https://sxo-engine.pages.dev/zh-CN/guide/getting-started.html).

## 📄 License

MIT License.
