# Descriptions 描述列表

成组展示多个只读字段。

## 基础用法

简单的展示。

```vue
<template>
  <SxoDescriptions title="用户信息" extra="编辑">
    <SxoDescriptionsItem label="用户名">SXO User</SxoDescriptionsItem>
    <SxoDescriptionsItem label="手机号">18888888888</SxoDescriptionsItem>
    <SxoDescriptionsItem label="居住地">杭州市</SxoDescriptionsItem>
    <SxoDescriptionsItem label="备注">无</SxoDescriptionsItem>
    <SxoDescriptionsItem label="联系地址">浙江省杭州市西湖区</SxoDescriptionsItem>
  </SxoDescriptions>
</template>
```

## 自定义列数

通过 `column` 属性设置每行显示的列数。

```vue
<template>
  <SxoDescriptions title="详情信息" :column="2">
    <SxoDescriptionsItem label="项目名称">SXO Design System</SxoDescriptionsItem>
    <SxoDescriptionsItem label="版本号">v1.0.0</SxoDescriptionsItem>
    <SxoDescriptionsItem label="状态">运行中</SxoDescriptionsItem>
    <SxoDescriptionsItem label="负责人">Admin</SxoDescriptionsItem>
  </SxoDescriptions>
</template>
```

## Descriptions 属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 列表标题 | `string` | - |
| extra | 操作区域内容 | `string` | - |
| column | 列表的列数 | `number` | `3` |

## DescriptionsItem 属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| label | 内容的描述 | `string` | - |

## Descriptions 插槽

| 名称 | 说明 |
| --- | --- |
| default | 包含 `SxoDescriptionsItem` 的列表 |
| title | 自定义标题 |
| extra | 自定义操作区域 |


### API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| label | - | `String` | `""` |
