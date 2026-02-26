# solid-sxo

SXO 设计系统的 SolidJS 适配器，利用 SolidJS 的细粒度响应式特性实现极速渲染。

## 安装

```bash
pnpm add solid-sxo @sxo/ui @sxo/engine @sxo/design
```

## ⚡ JIT 极致性能

`solid-sxo` 充分发挥了 SolidJS 细粒度更新的优势，与 JIT 引擎配合达到极致性能：

1.  **零虚拟 DOM 消耗**: JIT 引擎生成的 CSS 直接绑定到真实 DOM 节点。
2.  **极速响应**: 属性变化时，JIT 引擎秒级重算，SolidJS 直接更新对应节点，无全局 Diff 开销。

## 功能特性

- **高性能渲染**: 无虚拟 DOM 开销，结合 JIT 引擎实现极速 UI 展现。
- **轻量级**: 适配器本身极小，大部分逻辑由 JIT 引擎按需处理。
