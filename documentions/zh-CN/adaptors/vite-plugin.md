# vite-plugin-sxo

SXO 设计系统的官方 Vite 插件，用于优化开发体验和产物构建。

## 安装

```bash
pnpm add -D vite-plugin-sxo @sxo/engine @sxo/design
```

## 配置

在 `vite.config.ts` 中引入：

```typescript
import { defineConfig } from 'vite';
import sxo from 'vite-plugin-sxo';

export default defineConfig({
  plugins: [
    sxo({
      theme: 'github',
      // 自动按需导入配置
      autoImport: true
    })
  ]
});
```

## ⚡ JIT (Just-in-Time) 引擎集成

`vite-plugin-sxo` 是连接开发环境与 SXO JIT 引擎的桥梁。它将原本在浏览器中进行的样式计算工作**提前到了构建阶段**。

### 核心机制：编辑期收集 (Build-time Collection)

1.  **静态扫描**: 在您保存代码时，插件会自动扫描 `.tsx`, `.vue`, `.svelte` 等文件中的类名（如 `sxo="m-4 color-primary"`）。
2.  **预生成 CSS**: 插件将收集到的类名交给 `@sxo/engine`，在 Node.js 环境中直接生成对应的 CSS 规则。
3.  **零运行时开销**: 最终生成的样式通过标准的 `<style>` 标签或外部 `.css` 文件注入，**浏览器端不再需要运行样式计算 JS**。

## 功能特性

- **零运行时负担**: 样式在编辑/构建期已确定，用户访问时无任何样式计算开销，性能等同于原生 CSS。
- **自动按需导入**: 自动识别代码中的 SXO 组件并注入对应的运行时逻辑，无需手动 import。
- **极致 Tree Shaking**: 只有被真正使用的组件和样式属性会被包含在最终产物中。
- **主题热更新**: 修改主题配置或自定义 Token 时，插件会触发 HMR 立即更新浏览器中的静态样式。
