# CommandPalette 命令面板

`CommandPalette` 提供了一个全局的指令中心，支持搜索、快捷键绑定以及指令分类。它是提升系统交互体验的重要工具。

## 基础用法

通过 `isOpen` 控制显示，并提供 `commands` 列表。

<SxoCodeGroup>
<SxoCodeBlock framework="vue">

```vue
<template>
  <SxoCommandPalette 
    :is-open="isOpen" 
    :commands="commands"
    @close="isOpen = false"
  />
</template>

<script setup>
import { ref } from 'vue';
const isOpen = ref(false);
const commands = [
  {
    id: 'save',
    title: '保存项目',
    description: '将当前更改保存到服务器',
    shortcut: 'S',
    action: () => console.log('Saving...'),
    category: '文件'
  }
];
</script>
```

</SxoCodeBlock>

<SxoCodeBlock framework="react">

```tsx
import { useState } from 'react';
import { CommandPalette, Button } from '@sxo/react-sxo';

export default () => {
  const [isOpen, setIsOpen] = useState(false);
  const commands = [
    {
      id: 'save',
      title: '保存项目',
      description: '将当前更改保存到服务器',
      shortcut: 'S',
      action: () => console.log('Saving...'),
      category: '文件'
    }
  ];

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Palette</Button>
      <CommandPalette 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        commands={commands} 
      />
    </>
  );
};
```

</SxoCodeBlock>
</SxoCodeGroup>

## 快捷键

组件内置了全局键盘监听逻辑。如果指令配置了 `shortcut`，在页面上按下 `Ctrl + [Shortcut]` 或 `Cmd + [Shortcut]` 将直接触发对应的 `action`。

## 属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| isOpen | 是否显示面板 | `boolean` | `false` |
| commands | 指令列表 | `Command[]` | `[]` |

## Command 接口定义

| 属性 | 说明 | 类型 |
| --- | --- | --- |
| id | 唯一标识符 | `string` |
| title | 指令标题 | `string` |
| description | 指令描述（可选） | `string` |
| shortcut | 快捷键字符（可选，如 'S'） | `string` |
| action | 触发时的回调函数 | `() => void` |
| category | 指令分类（用于搜索过滤） | `string` |
