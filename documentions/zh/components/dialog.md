# Dialog 对话框

在保留当前页面状态的情况下，告知用户关键信息，或者请求用户完成特定任务。

## 基础用法

Dialog 弹出一个对话框，适合展示内容或进行简单的表单操作。

<SxoCodeGroup>
<SxoCodeBlock framework="vue">

```vue
<template>
  <div>
    <SxoButton @click="isOpen = true">打开对话框</SxoButton>
    <SxoDialog
      :is-open="isOpen"
      title="提示"
      description="这是一个对话框示例。"
      @close="isOpen = false"
    >
      <p>这是对话框的内容区域。</p>
      <template #footer>
        <div class="flex justify-end gap-2">
          <SxoButton variant="outline" @click="isOpen = false">取消</SxoButton>
          <SxoButton @click="isOpen = false">确定</SxoButton>
        </div>
      </template>
    </SxoDialog>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Dialog as SxoDialog, Button as SxoButton } from '@sxo/vue';
const isOpen = ref(false);
</script>
```

</SxoCodeBlock>
<SxoCodeBlock framework="react">

```tsx
import { Dialog, Button } from '@sxo/react';
import { useState } from 'react';

export default () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>打开对话框</Button>
      <Dialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="提示"
        description="这是一个对话框示例。"
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>取消</Button>
            <Button onClick={() => setIsOpen(false)}>确定</Button>
          </div>
        }
      >
        <p>这是对话框的内容区域。</p>
      </Dialog>
    </div>
  );
};
```

</SxoCodeBlock>
<SxoCodeBlock framework="vue2">

```vue
<template>
  <div>
    <SxoButton @click="isOpen = true">打开对话框</SxoButton>
    <SxoDialog
      :is-open="isOpen"
      title="提示"
      description="这是一个对话框示例。"
      @close="isOpen = false"
    >
      <p>这是对话框的内容区域。</p>
      <template #footer>
        <div class="flex justify-end gap-2">
          <SxoButton variant="outline" @click="isOpen = false">取消</SxoButton>
          <SxoButton @click="isOpen = false">确定</SxoButton>
        </div>
      </template>
    </SxoDialog>
  </div>
</template>

<script>
import { Dialog, Button } from '@sxo/vue2';
export default {
  components: { SxoDialog: Dialog, SxoButton: Button },
  data() {
    return { isOpen: false };
  }
}
</script>
```

</SxoCodeBlock>
</SxoCodeGroup>

## 可拖拽

设置 `isDraggable` 属性，使对话框可以拖拽。

<SxoCodeGroup>
<SxoCodeBlock framework="vue">

```vue
<template>
  <div>
    <SxoButton @click="isOpen = true">打开可拖拽对话框</SxoButton>
    <SxoDialog
      :is-open="isOpen"
      is-draggable
      title="可拖拽"
      @close="isOpen = false"
    >
      <p>你可以按住标题栏拖动这个对话框。</p>
    </SxoDialog>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Dialog as SxoDialog, Button as SxoButton } from '@sxo/vue';
const isOpen = ref(false);
</script>
```

</SxoCodeBlock>
<SxoCodeBlock framework="react">

```tsx
import { Dialog, Button } from '@sxo/react';
import { useState } from 'react';

export default () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>打开可拖拽对话框</Button>
      <Dialog
        isOpen={isOpen}
        isDraggable
        onClose={() => setIsOpen(false)}
        title="可拖拽"
      >
        <p>你可以按住标题栏拖动这个对话框。</p>
      </Dialog>
    </div>
  );
};
```

</SxoCodeBlock>
<SxoCodeBlock framework="vue2">

```vue
<template>
  <div>
    <SxoButton @click="isOpen = true">打开可拖拽对话框</SxoButton>
    <SxoDialog
      :is-open="isOpen"
      is-draggable
      title="可拖拽"
      @close="isOpen = false"
    >
      <p>你可以按住标题栏拖动这个对话框。</p>
    </SxoDialog>
  </div>
</template>

<script>
import { Dialog, Button } from '@sxo/vue2';
export default {
  components: { SxoDialog: Dialog, SxoButton: Button },
  data() {
    return { isOpen: false };
  }
}
</script>
```

</SxoCodeBlock>
</SxoCodeGroup>

## 居中显示

设置 `isCentered` 属性，使对话框在垂直方向也居中显示。

<SxoCodeGroup>
<SxoCodeBlock framework="vue">

```vue
<template>
  <div>
    <SxoButton @click="isOpen = true">打开居中对话框</SxoButton>
    <SxoDialog
      :is-open="isOpen"
      is-centered
      title="居中显示"
      @close="isOpen = false"
    >
      <p>这个对话框会在页面中央显示。</p>
    </SxoDialog>
  </div>
</template>
```

</SxoCodeBlock>
<SxoCodeBlock framework="react">

```tsx
import { Dialog, Button } from '@sxo/react';
import { useState } from 'react';

export default () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>打开居中对话框</Button>
      <Dialog
        isOpen={isOpen}
        isCentered
        onClose={() => setIsOpen(false)}
        title="居中显示"
      >
        <p>这个对话框会在页面中央显示。</p>
      </Dialog>
    </div>
  );
};
```

</SxoCodeBlock>
<SxoCodeBlock framework="vue2">

```vue
<template>
  <div>
    <SxoButton @click="isOpen = true">打开居中对话框</SxoButton>
    <SxoDialog
      :is-open="isOpen"
      is-centered
      title="居中显示"
      @close="isOpen = false"
    >
      <p>这个对话框会在页面中央显示。</p>
    </SxoDialog>
  </div>
</template>
```

</SxoCodeBlock>
</SxoCodeGroup>

## API

### Dialog Props

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| isOpen | `boolean` | `false` | 是否显示对话框 |
| title | `string` | - | 对话框标题 |
| description | `string` | - | 对话框描述 |
| size | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'` | 对话框尺寸 |
| isCentered | `boolean` | `false` | 是否居中显示 |
| isDraggable | `boolean` | `false` | 是否可拖拽 |

### Dialog Events

| 名称 | 说明 | 回调参数 |
| --- | --- | --- |
| close | 关闭对话框时触发 | - |

### Dialog Slots

| 名称 | 说明 |
| --- | --- |
| default | 对话框内容 |
| footer | 对话框底部操作区域 |


### API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| isOpen | - | `Boolean` | `-` |
| title | - | `String,` | `-` |
| description | - | `String,` | `-` |
| size | - | `String` | `"md"` |
| isCentered | - | `Boolean` | `false` |
| isDraggable | - | `Boolean` | `false` |
