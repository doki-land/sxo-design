# @sxo/engine

SXO 设计系统的样式引擎。

## 安装

```bash
pnpm add @sxo/engine @sxo/design
```

## 用法

### 基础用法

```typescript
import { StyleEngine } from '@sxo/engine';
import { defaultTokens } from '@sxo/design';

const engine = new StyleEngine(defaultTokens);

// 生成原子类样式
const className = engine.generate('text-primary-DEFAULT bg-background-secondary');
// 自动在 head 中注入对应的 CSS
```

### 响应式与变体

支持类似于 Tailwind 的响应式前缀和状态变体：

```typescript
// 响应式
engine.generate('md:text-lg lg:grid-cols-2');

// 状态变体
engine.generate('hover:bg-primary-DEFAULT focus:ring-2');
```

## 功能

- **动态样式生成**: 运行时按需生成 CSS，无需预编译。
- **响应式支持**: 自动处理断点。
- **状态支持**: hover, focus, active 等伪类支持。
- **高性能**: 内置缓存机制，避免重复生成样式。
