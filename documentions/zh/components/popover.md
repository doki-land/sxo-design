# Popover 气泡卡片

点击或移入元素，弹出气泡式的卡片浮层。

## 基础用法

最基础的用法。

```vue
<template>
  <SxoPopover title="标题" content="这是一段内容描述。">
    <SxoButton>气泡卡片</SxoButton>
  </SxoPopover>
</template>
```

## 触发方式

支持 `click` (默认) 和 `hover` 两种触发方式。

```vue
<template>
  <SxoPopover trigger="hover" title="悬停提示" content="移入时显示，移出时隐藏。">
    <SxoButton variant="outline">移入触发</SxoButton>
  </SxoPopover>
</template>
```

## 弹出位置

支持 `top` (默认)、`bottom`、`left`、`right` 四个位置。

```vue
<template>
  <div class="flex gap-4">
    <SxoPopover placement="left" title="左侧" content="内容弹出在左侧。">
      <SxoButton>左侧</SxoButton>
    </SxoPopover>
    <SxoPopover placement="right" title="右侧" content="内容弹出在右侧。">
      <SxoButton>右侧</SxoButton>
    </SxoPopover>
  </div>
</template>
```

## Popover 属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 标题 | `string` | - |
| content | 内容 | `string` | - |
| trigger | 触发方式 | `'click' \| 'hover'` | `'click'` |
| placement | 弹出位置 | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` |

## Popover 插槽

| 名称 | 说明 |
| --- | --- |
| default | 触发元素 |
| title | 自定义标题 |
| content | 自定义内容 |


### API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | - | `String` | `""` |
| content | - | `String` | `""` |
| placement | - | `String` | `"top"` |
| trigger | - | `String` | `"click"` |
