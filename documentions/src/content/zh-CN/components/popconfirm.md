# Popconfirm 气泡确认框

点击元素，弹出气泡确认框。

## 基础用法

最简单的用法。

```vue
<template>
  <SxoPopconfirm title="确定要删除这条记录吗？">
    <SxoButton variant="error">删除</SxoButton>
  </SxoPopconfirm>
</template>
```

## 不同类型

支持 `info`、`warning` (默认)、`error` 三种类型。

```vue
<template>
  <div class="flex gap-4">
    <SxoPopconfirm type="info" title="确定要提交吗？">
      <SxoButton variant="outline">提交</SxoButton>
    </SxoPopconfirm>
    
    <SxoPopconfirm type="error" title="删除后无法恢复，确定吗？">
      <SxoButton variant="error">危险操作</SxoButton>
    </SxoPopconfirm>
  </div>
</template>
```

## 自定义文字

通过 `confirmText` 和 `cancelText` 属性自定义按钮文字。

```vue
<template>
  <SxoPopconfirm 
    title="确定执行此操作？"
    confirm-text="好的"
    cancel-text="不，谢谢"
  >
    <SxoButton>自定义按钮</SxoButton>
  </SxoPopconfirm>
</template>
```

## Popconfirm 属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 确认框标题 | `string` | - |
| type | 提示类型 | `'info' \| 'warning' \| 'error'` | `'warning'` |
| confirmText | 确认按钮文字 | `string` | `'Confirm'` |
| cancelText | 取消按钮文字 | `string` | `'Cancel'` |

## Popconfirm 插槽

| 名称 | 说明 |
| --- | --- |
| default | 触发元素 |
| title | 标题内容 |

## Popconfirm 事件

| 名称 | 说明 | 回调参数 |
| --- | --- | --- |
| confirm | 点击确认按钮时触发 | - |
| cancel | 点击取消按钮时触发 | - |


### API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | - | `String` | `""` |
| type | - | `String` | `"warning"` |
| confirmText | - | `String` | `"Confirm"` |
| cancelText | - | `String` | `"Cancel"` |
