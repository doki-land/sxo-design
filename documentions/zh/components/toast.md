# Toast 通知

全局通知系统，用于显示简短的消息反馈。

## 使用方法

### 全局配置

首先需要在应用入口包裹 `ToastProvider`：

<SxoCodeGroup>

<SxoCodeBlock framework="vue">

```vue
<script setup>
import { ToastProvider } from '@sxo/vue';
</script>

<template>
  <ToastProvider>
    <App />
  </ToastProvider>
</template>
```


</SxoCodeBlock>
<SxoCodeBlock framework="react">

```tsx
import { ToastProvider } from '@sxo/react';

export default () => (
  <ToastProvider>
    <App />
  </ToastProvider>
);
```


</SxoCodeBlock>
<SxoCodeBlock framework="vue2">

```vue
<template>
  <SxoToastProvider>
    <App />
  </SxoToastProvider>
</template>

<script>
import { ToastProvider } from '@sxo/vue2';
export default {
  components: { SxoToastProvider: ToastProvider }
}
</script>
```


</SxoCodeBlock>

</SxoCodeGroup>

### 发送通知

使用 `useToast` 钩子发送通知：

<SxoCodeGroup>

<SxoCodeBlock framework="vue">

```vue
<script setup>
import { useToast } from '@sxo/vue';

const { success, error, info, warning, toast } = useToast();

const showToast = () => {
  success('操作成功', '您的设置已保存');
};

const customToast = () => {
  toast({
    title: '自定义通知',
    description: '这是一条显示在左下角的通知',
    type: 'info',
    position: 'bottom-left',
    duration: 5000
  });
};
</script>

<template>
  <button @click="showToast">成功通知</button>
  <button @click="customToast">自定义通知</button>
</template>
```


</SxoCodeBlock>
<SxoCodeBlock framework="react">

```tsx
import { useToast } from '@sxo/react';

export default () => {
  const { success, toast } = useToast();

  const showToast = () => {
    success('操作成功', '您的设置已保存');
  };

  return (
    <>
      <button onClick={showToast}>成功通知</button>
      <button onClick={() => toast({ title: '自定义' })}>自定义通知</button>
    </>
  );
};
```


</SxoCodeBlock>
<SxoCodeBlock framework="vue2">

```vue
<template>
  <div>
    <button @click="showToast">成功通知</button>
  </div>
</template>

<script>
import { useToast } from '@sxo/vue2';
export default {
  setup() {
    const { success } = useToast();
    return {
      showToast: () => success('操作成功')
    }
  }
}
</script>
```


</SxoCodeBlock>

</SxoCodeGroup>

## 属性

### Toast Options

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| title | `string` | - | 标题 |
| description | `string` | - | 描述内容 |
| type | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'` | 通知类型 |
| duration | `number` | `3000` | 显示时长（毫秒），设为 0 则不自动关闭 |
| position | `'top' \| 'bottom' \| 'top-left' \| 'top-right' \| 'bottom-left' \| 'bottom-right'` | `'top-right'` | 显示位置 |
