# Skeleton 骨架屏

在需要等待加载内容的位置提供一个占位图形组合。

## 何时使用

- 网络较慢，需要长时间等待加载处理时。
- 图文信息展示时，先通过骨架屏占位，减少页面的视觉抖动。

## 代码演示

<SxoDemo component="Skeleton" />

## API


### API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| active | 是否展示动画效果 | `Boolean` | `true` |
| rounded | 是否圆角 | `Boolean` | `true` |
| avatar | 是否展示头像占位 | `Boolean` | `false` |
| title | 是否展示标题占位 | `Boolean` | `true` |
| rows | 段落行数 | `Number` | `3` |
| loading | 是否正在加载。如果为 false，则展示子组件内容 | `Boolean` | `true` |
