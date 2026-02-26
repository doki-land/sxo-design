# Steps 步骤条

引导用户按照流程完成任务。

## 基础用法

展示简单的步骤条。

```vue
<template>
  <SxoSteps :current="1">
    <SxoStep title="第一步" description="填写个人信息" />
    <SxoStep title="第二步" description="验证手机号码" />
    <SxoStep title="第三步" description="完成注册" />
  </SxoSteps>
</template>
```

## 垂直方向

设置 `direction="vertical"` 可以切换为垂直展示。

```vue
<template>
  <SxoSteps :current="1" direction="vertical">
    <SxoStep title="已完成" description="这是已完成的步骤描述" />
    <SxoStep title="进行中" description="这是正在进行的步骤描述" />
    <SxoStep title="待运行" description="这是待运行的步骤描述" />
  </SxoSteps>
</template>
```

## Steps 属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| current | 当前步骤（从 0 开始） | `number` | `0` |
| direction | 步骤条方向 | `'horizontal' \| 'vertical'` | `'horizontal'` |

## Step 属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 步骤标题 | `string` | - |
| description | 步骤描述 | `string` | - |
| status | 指定当前步骤的状态，不指定则根据 `current` 自动计算 | `'pending' \| 'process' \| 'completed' \| 'error'` | - |

## Steps 插槽

| 名称 | 说明 |
| --- | --- |
| default | 包含 `SxoStep` 组件的列表 |


### API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | - | `String` | `""` |
| description | - | `String` | `""` |
| status | - | `String` | `-` |
| index | - | `Number` | `-` |
| current | - | `Number` | `-` |
| isLast | - | `Boolean` | `false` |
| direction | - | `String` | `"horizontal"` |
