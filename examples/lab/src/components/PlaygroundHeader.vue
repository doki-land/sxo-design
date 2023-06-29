<template>
  <header class="playground-header">
    <div class="flex items-center gap-4">
      <SxoSelect :modelValue="themeName" @update:modelValue="$emit('update:themeName', $event)" size="sm" class="w-40">
        <SxoSelectOption value="default">Default (BW)</SxoSelectOption>
        <SxoSelectOption value="github">GitHub</SxoSelectOption>
        <SxoSelectOption value="material">Material (M3)</SxoSelectOption>
        <SxoSelectOption value="fate">Fate (纠缠之缘)</SxoSelectOption>
        <SxoSelectOption value="antd">Ant Design</SxoSelectOption>
        <SxoSelectOption value="carbon">IBM Carbon</SxoSelectOption>
        <SxoSelectOption value="cupertino">iOS Cupertino</SxoSelectOption>
        <SxoSelectOption value="fluent">MS Fluent</SxoSelectOption>
      </SxoSelect>
      
      <SxoSelect :modelValue="locale" @update:modelValue="$emit('update:locale', $event)" size="sm" class="w-32">
        <SxoSelectOption value="en">English</SxoSelectOption>
        <SxoSelectOption value="zh">简体中文</SxoSelectOption>
      </SxoSelect>
    </div>

    <div class="flex items-center gap-2">
      <SxoButton size="sm" variant="ghost" @click="$emit('toggleDark')">
        {{ isDark ? '🌙' : '☀️' }}
      </SxoButton>
      <SxoButton size="sm" variant="ghost" @click="$emit('openCommandPalette')">⌨️</SxoButton>
      <div class="h-4 w-[1px] bg-neutral-200 mx-2"></div>
      <SxoBadge variant="primary" size="sm">{{ activeFrameworkName }}</SxoBadge>
    </div>
  </header>
</template>

<script setup>
defineProps({
    themeName: String,
    locale: String,
    isDark: Boolean,
    activeFrameworkName: String,
});

defineEmits(['update:themeName', 'update:locale', 'toggleDark', 'openCommandPalette']);
</script>

<style scoped>
.playground-header {
  height: 64px;
  border-bottom: 1px solid var(--sxo-color-neutral-200);
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: white;
}

:global(.dark) .playground-header {
  background: var(--sxo-color-background-primary);
}
</style>

