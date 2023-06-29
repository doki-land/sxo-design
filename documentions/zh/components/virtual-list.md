# VirtualList 虚拟列表

虚拟列表用于优化大数据量场景下的渲染性能，只渲染可视区域内的元素。

## 基础用法

<SxoDemo component="VirtualList">
<template>
  <div class="space-y-4">
    <div class="p-4 bg-white border rounded-xl">
      <h3 class="text-lg font-bold mb-4">10,000 条数据演示</h3>
      <SxoVirtualList 
        :items="list" 
        :item-height="50" 
        :container-height="300"
      >
        <template #default="{ item, index }">
          <div class="px-4 h-[50px] flex items-center border-b border-neutral-100 hover:bg-neutral-50 transition-colors">
            <span class="w-16 text-neutral-400">#{{ index + 1 }}</span>
            <span class="font-medium">{{ item.name }}</span>
            <span class="ml-auto text-sm text-neutral-500">{{ item.email }}</span>
          </div>
        </template>
      </SxoVirtualList>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const list = Array.from({ length: 10000 }).map((_, i) => ({
  name: `Item ${i + 1}`,
  email: `user${i + 1}@example.com`
}))
</script>
</SxoDemo>

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| items | 数据源 | `Array` | `[]` |
| itemHeight | 每一项的高度 (px) | `Number` | - |
| containerHeight | 容器高度 (px) | `Number` | `400` |
| overscan | 额外渲染的数量（上下各增加的数量） | `Number` | `5` |
