# Calendar 日历

按照日历形式展示数据的容器。

## 基础用法

展示简单的日历。

```vue
<template>
  <SxoCalendar v-model="date" />
</template>

<script setup>
import { ref } from 'vue';
const date = ref(new Date());
</script>
```

## Calendar 属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue / v-model | 绑定值 | `Date` | `new Date()` |

## Calendar 事件

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| update:modelValue | 日期变化时触发 | `value: Date` |
| change | 日期变化时触发 | `value: Date` |


### API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | - | `Date` | `new Date()` |
