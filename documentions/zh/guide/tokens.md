# 设计令牌 (Design Tokens)

设计令牌是 SXO 设计系统的核心。它们定义了系统的视觉属性，如颜色、间距、排版等。

## 令牌结构

SXO 的令牌遵循嵌套结构，可以轻松通过路径引用。

```typescript
export const defaultTokens = {
  color: {
    primary: {
      DEFAULT: '#3b82f6',
      foreground: '#ffffff',
    },
    // ...
  },
  spacing: {
    1: '4px',
    2: '8px',
    // ...
  },
  // ...
};
```

## 使用令牌

### 在 CSS 中使用

引擎会自动将令牌转换为 CSS 变量：

```css
.my-element {
  color: var(--color-primary);
  padding: var(--spacing-4);
}
```

### 在适配器中使用

使用 `useToken` Hook 获取令牌值：

#### React
```tsx
const primaryColor = useToken('color.primary.DEFAULT');
```

#### Vue
```tsx
const primaryColor = useToken('color.primary.DEFAULT');
```

## 切换主题

SXO 支持动态切换主题。你只需要为 `SxoProvider` (React) 或 `createSxo` (Vue) 提供不同的令牌对象。

## 深色模式 (Dark Mode)

SXO 原生支持深色模式。你可以在令牌配置中添加 `dark` 字段来覆盖默认令牌：

```typescript
export const myTheme = {
  ...defaultTokens,
  dark: {
    color: {
      primary: {
        DEFAULT: '#60a5fa', // 深色模式下的蓝色
      },
      secondary: {
        DEFAULT: '#1f2937',
      }
    }
  }
};
```

引擎会自动生成 `.dark` 类名下的变量覆盖。
