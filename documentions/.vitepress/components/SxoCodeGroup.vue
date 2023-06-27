<template>
  <div class="sxo-code-group border rounded-xl overflow-hidden my-6 bg-neutral-50 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800">
    <!-- Tab Header -->
    <div class="flex items-center justify-between px-4 py-2 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
      <div class="flex gap-2">
        <button 
          v-for="f in frameworks" 
          :key="f.id"
          @click="currentFramework = f.id"
          class="px-3 py-1 text-xs font-medium rounded-md transition-all flex items-center gap-1.5"
          :class="currentFramework === f.id 
            ? 'bg-primary text-white shadow-sm' 
            : 'text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800'"
        >
          <span>{{ f.icon }}</span>
          {{ f.name }}
        </button>
      </div>
      <div class="text-[10px] uppercase tracking-widest text-neutral-400 font-bold">
        SXO Framework Switcher
      </div>
    </div>

    <!-- Content Area -->
    <div class="relative group">
      <slot></slot>
      
      <!-- Placeholder if no content for selected framework -->
      <div v-if="!hasActiveContent" class="p-8 text-center">
        <div class="text-4xl mb-2">🚧</div>
        <div class="text-sm text-neutral-500">
          This example is not yet available for <b>{{ activeFrameworkName }}</b>.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, useSlots } from 'vue';
import { frameworks, currentFramework } from '../theme/framework-state';

const slots = useSlots();

const activeFrameworkName = computed(
    () => frameworks.find((f) => f.id === currentFramework.value)?.name || currentFramework.value,
);

const hasActiveContent = computed(() => {
    const content = slots.default?.();
    if (!content) return false;
    return content.some((vnode) => vnode.props?.framework === currentFramework.value);
});
</script>

<style scoped>
.sxo-code-group :deep(pre) {
  margin: 0 !important;
  border-radius: 0 !important;
  background: transparent !important;
}
</style>
