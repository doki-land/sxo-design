<div align="center">
  <h1>@sxo/component-table</h1>
  <p><b>Advanced, high-performance data table engine for the SXO design system.</b></p>

  <p>
    <a href="https://www.npmjs.com/package/@sxo/component-table"><img src="https://img.shields.io/npm/v/@sxo/component-table.svg?style=flat-square" alt="npm version"></a>
    <img src="https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square" alt="license">
    <img src="https://img.shields.io/npm/dm/@sxo/component-table.svg?style=flat-square" alt="downloads">
  </p>
</div>

---

`@sxo/component-table` provides a robust foundation for building complex data tables. It handles massive datasets with ease while remaining completely unopinionated about rendering.

## ✨ Key Features

- ⚡ **Virtual Scrolling**: Native support for massive data display with smooth scrolling.
- 🧩 **Headless Logic**: Decouples data management (sorting, filtering, selection) from the UI.
- 🎨 **SXO Integrated**: Designed to work seamlessly with `@sxo/engine` and `@sxo/ui`.
- 🛡️ **Type Safe**: First-class TypeScript support for columns and data schemas.

## 🚀 Quick Start

### Installation

```bash
pnpm add @sxo/component-table
```

### Usage

```typescript
import { DataTable } from '@sxo/component-table';

const table = new DataTable({
  data: myMassiveData,
  columns: [
    { key: 'name', title: 'Name' },
    { key: 'email', title: 'Email' }
  ]
});

// Use the table logic in your framework component
console.log(table.rows);
```

## 📖 Documentation

For full documentation and advanced examples, visit the [Table Component Documentation](https://sxo-engine.pages.dev/zh-CN/components/table.html).

## 📄 License

MIT License.
