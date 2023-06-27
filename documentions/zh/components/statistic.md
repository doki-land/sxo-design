# Statistic 统计数值

用于突出展示统计数值。

## 基础用法

展示数值标题和数值。

```vue
<template>
  <div class="grid grid-cols-2 gap-8">
    <SxoStatistic title="活跃用户" :value="112893" />
    <SxoStatistic title="账户余额 (CNY)" :value="112893" :precision="2" />
  </div>
</template>
```

## 单位和图标

支持通过 `prefix` 和 `suffix` 属性设置前缀和后缀。

```vue
<template>
  <div class="grid grid-cols-2 gap-8">
    <SxoStatistic title="下载量" :value="12567" suffix="次" />
    <SxoStatistic title="增长率" :value="11.28" suffix="%" />
  </div>
</template>
```

## Statistic 属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 数值标题 | `string` | - |
| value | 数值内容 | `string \| number` | - |
| precision | 数值精度 | `number` | `0` |
| prefix | 设置数值的前缀 | `string` | - |
| suffix | 设置数值的后缀 | `string` | - |

## Statistic 插槽

| 名称 | 说明 |
| --- | --- |
| title | 自定义标题 |
| prefix | 自定义前缀 |
| suffix | 自定义后缀 |


### API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | - | `String` | `""` |
| value | - | `[String` | `""` |
| prefix | - | `String` | `""` |
| suffix | - | `String` | `""` |
| precision | - | `Number` | `0` |
