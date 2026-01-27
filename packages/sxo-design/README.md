# @sxo/design

SXO 设计系统的核心设计规范和令牌 (Tokens)。

## 安装

```bash
pnpm add @sxo/design
```

## 核心概念

### Design Tokens (设计令牌)
Design Tokens 是设计系统的最小单元，包含颜色、间距、字体等基础变量。

```typescript
import { defaultTokens, type DesignTokens } from '@sxo/design';

// 使用默认令牌
console.log(defaultTokens.color.primary.DEFAULT); // #000000
```

### Headless Logic (无状态逻辑)
提供组件的行为逻辑抽象，不绑定具体的 UI 实现。

```typescript
import { useAccordion } from '@sxo/design';

// 在框架适配器中使用
const { expandedItems, toggleItem } = useAccordion({
    allowMultiple: true
});
```

## 功能

- **Design Tokens**: 预设了一套完整的原子化设计变量。
- **类型安全**: 提供完整的 `TokenPath` 和 `DesignTokens` 类型定义。
- **工具函数**: 包含 `tokensToCssVars` 等实用工具。
