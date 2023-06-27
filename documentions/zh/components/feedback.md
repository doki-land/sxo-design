# 加载反馈

用于在数据加载或处理过程中提供视觉反馈。

## Spinner 加载图标

用于指示正在进行的后台操作。

```vue
<template>
  <SxoSpinner size="sm" />
  <SxoSpinner size="md" color="secondary" />
  <SxoSpinner size="lg" color="accent" />
</template>
```

## Progress 进度条

展示操作的完成进度。

```vue
<template>
  <SxoProgress :value="45" color="success" />
</template>
```

## Skeleton 骨架屏

在内容加载前显示的占位图。

```vue
<template>
  <div class="flex flex-col gap-4">
    <SxoSkeleton variant="circle" />
    <SxoSkeleton variant="text" />
    <SxoSkeleton variant="rect" />
  </div>
</template>
```

## API

### Spinner Props
| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |
| color | `'primary' \| 'secondary' \| 'accent'` | `'primary'` | 颜色 |

### Progress Props
| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| value | `number` | - | 当前进度值 |
| max | `number` | `100` | 最大进度值 |
| color | `'primary' \| 'success' \| 'warning' \| 'error'` | `'primary'` | 颜色 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 高度尺寸 |

### Skeleton Props
| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| variant | `'text' \| 'rect' \| 'circle'` | `'rect'` | 形状类型 |
| width | `string \| number` | - | 宽度 |
| height | `string \| number` | - | 高度 |
| animate | `boolean` | `true` | 是否显示动画 |


### API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| size | - | `String` | `"md"` |
| color | - | `String` | `"primary"` |
