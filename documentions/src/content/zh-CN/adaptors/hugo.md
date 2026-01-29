# Hugo 集成指南

SXO 通过 AOT 模式为 Hugo 静态站点提供高性能的 UI 支持。

## 📦 集成步骤

### 1. 配置 Params

在 Hugo 的 `hugo.toml` (或 `config.toml`) 中定义 SXO 版本和默认主题：

```toml
[params.sxo]
    enable = true
    version = "latest"
    theme = "github"
```

### 2. 修改局部模板

在 `layouts/partials/head.html` 中引入样式：

```html
{{ if .Site.Params.sxo.enable }}
    <link rel="stylesheet" href="https://cdn.sxoui.com/{{ .Site.Params.sxo.version }}/sxo-core.css">
    <link rel="stylesheet" href="https://cdn.sxoui.com/{{ .Site.Params.sxo.version }}/sxo-theme-{{ .Site.Params.sxo.theme }}.css">
{{ end }}
```

在 `layouts/partials/footer.html` 或 `layouts/_default/baseof.html` 中引入运行时：

```html
{{ if .Site.Params.sxo.enable }}
    <script src="https://cdn.sxoui.com/{{ .Site.Params.sxo.version }}/sxo.js"></script>
{{ end }}
```

### 3. 在 Markdown 中使用

Hugo 支持直接在 Markdown 中编写 HTML，您可以轻松调用 SXO 组件：

```markdown
---
title: "Hugo + SXO"
date: 2024-01-13
---

{{< sxo-alert type="info" >}}
这是通过 Hugo Shortcode 或直接 HTML 渲染的警告框。
{{< /sxo-alert >}}

<button class="sxo-btn sxo-btn-primary">Hugo 按钮</button>
```

## 🎨 自定义样式

如果您使用的是 Hugo Pipes，可以将 SXO 的 CSS 变量集成到您的 SCSS 流程中，实现更深度的定制。
