# @sxo/theme-fate

SXO 设计系统的纠缠之缘 (Fate) 风格主题。

## 安装

```bash
pnpm add @sxo/theme-fate @sxo/engine @sxo/design
```

## 用法

```typescript
import { createSxo } from 'vue-sxo';
import fateTheme from '@sxo/theme-fate';

app.use(createSxo({
    tokens: fateTheme
}));
```

## 主题特色
- **梦幻配色**: 提取自《原神》纠缠之缘的粉紫色调。
- **独特动效**: 预设了契合主题的过渡效果。
