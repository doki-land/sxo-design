# Upload 上传

通过点击或拖拽上传文件。

## 基础用法

点击按钮上传文件。

```vue
<template>
  <SxoUpload v-model:file-list="fileList">
    <SxoButton variant="outline">点击上传</SxoButton>
  </SxoUpload>
</template>

<script setup>
import { ref } from 'vue';
const fileList = ref([]);
</script>
```

## 拖拽上传

设置 `drag` 属性可以使用拖拽上传。

```vue
<template>
  <SxoUpload 
    v-model:file-list="fileList" 
    drag 
    hint="支持 jpg, png 格式，文件不超过 2MB"
  />
</template>

<script setup>
import { ref } from 'vue';
const fileList = ref([]);
</script>
```

## 多文件上传

设置 `multiple` 属性可以一次选择多个文件。

```vue
<template>
  <SxoUpload v-model:file-list="fileList" multiple>
    <SxoButton variant="outline">多文件上传</SxoButton>
  </SxoUpload>
</template>

<script setup>
import { ref } from 'vue';
const fileList = ref([]);
</script>
```

## Upload 属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| action | 上传的地址 | `string` | - |
| multiple | 是否支持多选文件 | `boolean` | `false` |
| disabled | 是否禁用 | `boolean` | `false` |
| drag | 是否启用拖拽上传 | `boolean` | `false` |
| accept | 接受上传的[文件类型](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept) | `string` | - |
| fileList / v-model:file-list | 默认上传列 | `SxoFile[]` | `[]` |
| hint | 提示说明文字 | `string` | - |

## Upload 插槽

| 名称 | 说明 |
| --- | --- |
| default | 触发上传的元素 |

## Upload 事件

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| update:fileList | 文件列表变化时触发 | `fileList: SxoFile[]` |
| change | 文件状态改变时触发 | `fileList: SxoFile[]` |
| remove | 文件列表移除文件时触发 | `uid: number` |


### API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| action | - | `String` | `""` |
| multiple | - | `Boolean` | `false` |
| disabled | - | `Boolean` | `false` |
| drag | - | `Boolean` | `false` |
| accept | - | `String` | `""` |
| fileList | - | `Array` | `[]` |
| hint | - | `String` | `""` |
