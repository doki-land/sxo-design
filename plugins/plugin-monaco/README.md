<div align="center">
  <h1>@sxo/component-monaco</h1>
  <p><b>A headless Monaco Editor integration utility for the SXO design system.</b></p>

  <p>
    <a href="https://www.npmjs.com/package/@sxo/component-monaco"><img src="https://img.shields.io/npm/v/@sxo/component-monaco.svg?style=flat-square" alt="npm version"></a>
    <img src="https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square" alt="license">
    <img src="https://img.shields.io/npm/dm/@sxo/component-monaco.svg?style=flat-square" alt="downloads">
  </p>
</div>

---

`@sxo/component-monaco` provides a streamlined, framework-agnostic way to integrate the Monaco Editor into your application while maintaining the **Headless** philosophy of the SXO ecosystem.

## 🧩 Headless Utility

Unlike traditional Monaco wrappers that come with heavy CSS or fixed UI layouts, this package focuses purely on the editor's lifecycle and core configuration.

- **Style Freedom**: No built-in theme or layout restrictions. Fits perfectly with SXO design tokens.
- **Pure Logic**: Focuses on editor creation, content synchronization, and event management.
- **Framework Agnostic**: Can be wrapped easily in React, Vue, or used in vanilla JavaScript.

## ✨ Features

- ⚙️ **Lifecycle Management**: Handles editor initialization and disposal automatically.
- 🛡️ **Type Safety**: Full TypeScript definitions for options and instances.
- 🎨 **Configurable**: Simple API for common settings like language, theme, and read-only mode.
- 🚀 **Performance**: Optimized for minimal overhead on top of the base editor.

## 🚀 Quick Start

### Installation

```bash
pnpm add @sxo/component-monaco monaco-editor
```

### Usage

```typescript
import { createMonacoEditor } from '@sxo/component-monaco';

const container = document.getElementById('editor-container');
const editorInstance = createMonacoEditor(container, {
    value: 'console.log("Hello, SXO!");',
    language: 'javascript',
    theme: 'vs-dark',
    onChange: (newValue) => console.log('Content changed:', newValue)
});

// Access the underlying Monaco instance
console.log(editorInstance.editor);

// Cleanup
editorInstance.destroy();
```

## 📖 Documentation

For more details, visit the [Monaco Component Documentation](https://sxo-engine.pages.dev/zh-CN/guide/getting-started.html).

## 📄 License

MIT License.
