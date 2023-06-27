# svelte-sxo

SXO 设计系统的 Svelte 适配器。

## 安装

```bash
pnpm add svelte-sxo @sxo/ui @sxo/engine @sxo/design
```

## ⚡ JIT 编译时增强

`svelte-sxo` 结合了 Svelte 的编译时特性与 SXO 的 JIT 引擎：

1.  **按需样式生成**: Svelte 组件渲染时，JIT 引擎会根据组件状态动态生成并注入 CSS。
2.  **样式范围管理**: 自动处理 JIT 生成样式的范围，确保组件间的样式互不干扰。

## 快速开始

在 `App.svelte` 中使用 `ThemeProvider`：

```svelte
<script>
  import { ThemeProvider, Button } from 'svelte-sxo';
</script>

<ThemeProvider theme="github">
  <Button variant="primary">Svelte Button</Button>
</ThemeProvider>
```
