# @sxo/theme-pornhub

SXO 设计系统的 Pornhub 风格主题。

## 安装

```bash
pnpm add @sxo/theme-pornhub @sxo/engine @sxo/design
```

## 用法

配合 `vue-sxo` 或 `@sxo/engine` 使用：

```typescript
import { createSxo } from 'vue-sxo';
import pornhubTheme from '@sxo/theme-pornhub';

// 在 Vue 插件中使用
app.use(createSxo({
    tokens: pornhubTheme
}));
```

或者直接在引擎中使用：

```typescript
import { StyleEngine } from '@sxo/engine';
import pornhubTheme from '@sxo/theme-pornhub';

const engine = new StyleEngine(pornhubTheme);
```

## 主题特色
- **经典配色**: 黑色背景搭配醒目的橙色 (#FF9900)。
- **高对比度**: 优化的文本可读性。
