# Drawer 抽屉

抽屉组件，从屏幕边缘滑出的浮层面板。

## 基础用法

```vue
<template>
  <SxoButton @click="visible = true">打开抽屉</SxoButton>
  
  <SxoDrawer v-model="visible" title="基础抽屉">
    <p>这是抽屉的内容区域...</p>
    <p>你可以在这里放置任何表单、列表或详细信息。</p>
  </SxoDrawer>
</template>

<script setup>
import { ref } from 'vue';
const visible = ref(false);
</script>
```

## 出现位置

支持 `right` (默认)、`left`、`top`、`bottom` 四个方向。

```vue
<template>
  <div class="flex gap-2">
    <SxoButton @click="open('left')">左侧</SxoButton>
    <SxoButton @click="open('right')">右侧</SxoButton>
    <SxoButton @click="open('top')">顶部</SxoButton>
    <SxoButton @click="open('bottom')">底部</SxoButton>
  </div>
  
  <SxoDrawer v-model="visible" :placement="placement" :title="`从 ${placement} 弹出`" />
</template>

<script setup>
import { ref } from 'vue';
const visible = ref(false);
const placement = ref('right');
const open = (p) => {
  placement.value = p;
  visible.value = true;
};
</script>
```

## 自定义尺寸

支持 `sm`、`md` (默认)、`lg`、`xl`、`full` 五种尺寸。

```vue
<template>
  <SxoButton @click="visible = true">全屏抽屉</SxoButton>
  
  <SxoDrawer v-model="visible" size="full" title="全屏面板">
    <div class="p-4">全屏内容...</div>
  </SxoDrawer>
</template>

<script setup>
import { ref } from 'vue';
const visible = ref(false);
</script>
```

## 底部操作栏

可以使用 `footer` 插槽添加操作按钮。

```vue
<template>
  <SxoDrawer v-model="visible" title="带操作的抽屉">
    <p>内容区域...</p>
    <template #footer>
      <SxoButton variant="ghost" @click="visible = false">取消</SxoButton>
      <SxoButton @click="handleConfirm">确定</SxoButton>
    </template>
  </SxoDrawer>
</template>
```

## Drawer 属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 是否显示 | `boolean` | `false` |
| title | 标题 | `string` | - |
| placement | 抽屉弹出位置 | `'left' \| 'right' \| 'top' \| 'bottom'` | `'right'` |
| size | 抽屉尺寸 | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'` |
| closable | 是否显示右上角关闭按钮 | `boolean` | `true` |
| maskClosable | 点击遮罩层是否允许关闭 | `boolean` | `true` |

## Drawer 插槽

| 名称 | 说明 |
| --- | --- |
| default | 抽屉主体内容 |
| title | 标题内容 |
| footer | 底部内容 |

## Drawer 事件

| 名称 | 说明 | 回调参数 |
| --- | --- | --- |
| close | 关闭时触发 | - |
| after-leave | 动画结束退出时触发 | - |
| update:modelValue | v-model 绑定事件 | `(val: boolean) => void` |


### API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | - | `Boolean` | `false` |
| title | - | `String` | `""` |
| placement | - | `String` | `"right"` |
| size | - | `String` | `"md"` |
| closable | - | `Boolean` | `true` |
| maskClosable | - | `Boolean` | `true` |
| destroyOnClose | - | `Boolean` | `false` |
