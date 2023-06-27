# Empty 空状态

用于在没有内容、没有数据或没有搜索结果时展示。

<SxoCodeGroup>
<SxoCodeBlock framework="vue">
```vue
<template>
  <div class="flex flex-col gap-8">
    <!-- 基础用法 -->
    <SxoEmpty description="暂无数据" />

    <!-- 自定义图片 -->
    <SxoEmpty 
      image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
      description="自定义图片"
    />

    <!-- 自定义内容与额外操作 -->
    <SxoEmpty>
      <template #default>
        <span class="text-gray-400">没有找到相关结果</span>
      </template>
      <template #extra>
        <SxoButton size="sm">重新搜索</SxoButton>
      </template>
    </SxoEmpty>

    <!-- 不同尺寸 -->
    <SxoEmpty size="sm" description="小尺寸" />
    <SxoEmpty size="lg" description="大尺寸" />
  </div>
</template>

<script setup>
import { SxoEmpty, SxoButton } from '@sxo/vue';
</script>
```
</SxoCodeBlock>

<SxoCodeBlock framework="react">
```tsx
import { Empty, Button } from '@sxo/react';

export default function EmptyDemo() {
  return (
    <div className="flex flex-col gap-8">
      {/* 基础用法 */}
      <Empty description="暂无数据" />

      {/* 自定义图片 */}
      <Empty 
        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
        description="自定义图片"
      />

      {/* 自定义内容与额外操作 */}
      <Empty
        extra={<Button size="sm">重新搜索</Button>}
      >
        <span className="text-gray-400">没有找到相关结果</span>
      </Empty>

      {/* 不同尺寸 */}
      <Empty size="sm" description="小尺寸" />
      <Empty size="lg" description="大尺寸" />
    </div>
  );
}
```
</SxoCodeBlock>

<SxoCodeBlock framework="vue2">
```vue
<template>
  <div class="flex flex-col gap-8">
    <SxoEmpty description="暂无数据" />
    <SxoEmpty size="sm" description="小尺寸" />
    <SxoEmpty>
      <template slot="extra">
        <SxoButton size="sm">返回首页</SxoButton>
      </template>
    </SxoEmpty>
  </div>
</template>

<script>
import { SxoEmpty, SxoButton } from '@sxo/vue2';

export default {
  components: { SxoEmpty, SxoButton }
};
</script>
```
</SxoCodeBlock>
</SxoCodeGroup>

## Empty 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| description | `string` | `'No Data'` | 描述文字 |
| image | `string` | - | 自定义图片地址 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |

## Empty 插槽 / Props

| 名称 | 类型 | 说明 |
| --- | --- | --- |
| default | `slot \| ReactNode` | 自定义描述内容 |
| image | `slot \| ReactNode` | 自定义图片内容 |
| extra | `slot \| ReactNode` | 额外的操作区域 |
