# @sxo/theme-github

SXO 设计系统的 GitHub 风格主题。

## 安装

```bash
pnpm add @sxo/theme-github @sxo/engine @sxo/design
```

## 用法

```typescript
import { createSxo } from 'vue-sxo';
import githubTheme from '@sxo/theme-github';

app.use(createSxo({
    tokens: githubTheme
}));
```

## 主题特色
- **简洁**: 还原 GitHub 网页端的视觉感受。
- **灰度控制**: 精确的边框和背景中性色。
