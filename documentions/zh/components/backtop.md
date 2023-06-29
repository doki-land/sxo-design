# BackTop 回到顶部

返回页面顶部的组件。

## 基础用法

通过滚动页面来查看右下角的按钮。

<SxoCodeGroup>

<SxoCodeBlock framework="vue">

```vue
<template>
  <div style="height: 1500px;">
    <p>向下滚动查看回到顶部按钮</p>
    <SxoBackTop :visibilityHeight="100" />
  </div>
</template>

<script setup>
import { BackTop as SxoBackTop } from '@sxo/vue';
</script>
```


</SxoCodeBlock>
<SxoCodeBlock framework="react">

```tsx
import { BackTop } from '@sxo/react';

export default () => (
  <div style={{ height: '1500px' }}>
    <p>向下滚动查看回到顶部按钮</p>
    <BackTop visibilityHeight={100} />
  </div>
);
```


</SxoCodeBlock>
<SxoCodeBlock framework="vue2">

```vue
<template>
  <div style="height: 1500px;">
    <p>向下滚动查看回到顶部按钮</p>
    <SxoBackTop :visibilityHeight="100" />
  </div>
</template>

<script>
import { BackTop } from '@sxo/vue2';
export default {
  components: { SxoBackTop: BackTop }
}
</script>
```


</SxoCodeBlock>

</SxoCodeGroup>

## 自定义内容

可以自定义按钮显示的内容。

<SxoCodeGroup>

<SxoCodeBlock framework="vue">

```vue
<template>
  <div style="height: 1500px;">
    <SxoBackTop :bottom="100">
      <div style="background-color: #f2f5f6; box-shadow: 0 0 6px rgba(0,0,0, .12); text-align: center; line-height: 40px; color: #1989fa;">
        UP
      </div>
    </SxoBackTop>
  </div>
</template>
```


</SxoCodeBlock>
<SxoCodeBlock framework="react">

```tsx
import { BackTop } from '@sxo/react';

export default () => (
  <div style={{ height: '1500px' }}>
    <BackTop bottom={100}>
      <div style={{ backgroundColor: '#f2f5f6', boxShadow: '0 0 6px rgba(0,0,0, .12)', textAlign: 'center', lineHeight: '40px', color: '#1989fa' }}>
        UP
      </div>
    </BackTop>
  </div>
);
```


</SxoCodeBlock>
<SxoCodeBlock framework="vue2">

```vue
<template>
  <div style="height: 1500px;">
    <SxoBackTop :bottom="100">
      <div style="background-color: #f2f5f6; box-shadow: 0 0 6px rgba(0,0,0, .12); text-align: center; line-height: 40px; color: #1989fa;">
        UP
      </div>
    </SxoBackTop>
  </div>
</template>
```


</SxoCodeBlock>

</SxoCodeGroup>

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| visibilityHeight | 滚动高度达到此参数值才出现 | number | 400 |
| right | 控制其显示位置，距离页面右边距 | number | 40 |
| bottom | 控制其显示位置，距离页面下边距 | number | 40 |

### Slots

| 名称 | 说明 |
| --- | --- |
| default | 自定义内容 |
