# Hexo 集成指南

SXO 设计系统通过 `@sxo/bundle` 为 Hexo 提供完美的 UI 支持。无需复杂的构建流程，即可在您的博客中使用现代化组件。

## 📦 准备工作

在您的 Hexo 主题目录中（例如 `themes/[your-theme]/`），找到布局文件。通常是 `layout/layout.ejs` 或 `layout/_partial/head.ejs`。

## 🚀 快速开始

### 1. 引入资源

在 `<head>` 标签中引入 SXO 的样式文件：

```html
<!-- 核心样式 -->
<link rel="stylesheet" href="https://cdn.sxoui.com/sxo-core.css">
<!-- 选择一个初始主题 -->
<link rel="stylesheet" href="https://cdn.sxoui.com/sxo-theme-github.css">
```

在 `<body>` 结束标签前引入运行时 JS：

```html
<script src="https://cdn.sxoui.com/sxo.js"></script>
```

### 2. 配置主题

Hexo 用户通常希望在 `_config.yml` 中配置 UI 选项。建议添加以下配置：

```yaml
# themes/[your-theme]/_config.yml
sxo:
  enable: true
  version: latest
  default_theme: github # 可选: github, pornhub
```

然后在模板中动态引用：

```html
<% if (theme.sxo && theme.sxo.enable) { %>
  <link rel="stylesheet" href="https://cdn.sxoui.com/sxo-core.css">
  <link rel="stylesheet" href="https://cdn.sxoui.com/sxo-theme-<%= theme.sxo.default_theme %>.css">
<% } %>
```

## 📝 在 Markdown 中使用

您可以直接在 `.md` 文章中使用 SXO 的原子类和组件：

```markdown
---
title: 使用 SXO 增强我的博客
---

这是一个普通的段落。

<div class="sxo-alert sxo-alert-info">
  💡 提示：这是在 Hexo 文章中直接渲染的 SXO 警告框。
</div>

<button class="sxo-btn sxo-btn-primary">点击我</button>
```

## 🎨 主题切换器

如果您想为读者提供主题切换功能，可以在页面中添加一个按钮：

```html
<button class="sxo-btn" onclick="SXO.setTheme('pornhub')">
  切换到暗色模式 (Pornhub)
</button>
```

SXO 运行时会自动将偏好保存到 `localStorage`，下次访问时自动恢复。

## 💡 进阶：按需加载

对于追求极致性能的博客，您可以利用 SXO 的 AOT 特性，只在需要特定组件的页面引入对应的 CSS 模块（详见 [Bundle 文档](./bundle.md)）。
