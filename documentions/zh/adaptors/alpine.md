# alpine-sxo

SXO 设计系统的 Alpine.js 适配器，为轻量级项目提供声明式 UI 组件。

## 安装

```bash
pnpm add alpine-sxo @sxo/ui @sxo/engine @sxo/design
```

## ⚡ JIT 轻量集成

`alpine-sxo` 为 Alpine.js 项目带来了 JIT 引擎的强大能力：

1.  **声明式样式**: 直接在 `x-data` 作用域内使用 JIT 属性，引擎会自动识别并生成样式。
2.  **按需注入**: 只有在 Alpine 指令触发元素显示时，相关的 JIT 样式才会被注入。

## 快速开始

```html
<div x-data>
  <button class="sxo-btn sxo-btn-primary">Alpine Button</button>
</div>
```
