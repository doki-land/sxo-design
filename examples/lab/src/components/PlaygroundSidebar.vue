<template>
  <aside class="playground-sidebar">
    <div class="sidebar-header">
      <span class="logo">SXO Lab</span>
      <SxoBadge variant="outline" size="xs">Alpha</SxoBadge>
    </div>
    <nav class="component-nav">
      <button 
        v-for="c in availableComponents" 
        :key="c.id"
        @click="$emit('update:selectedComponentId', c.id)"
        :class="{ active: selectedComponentId === c.id }"
      >
        {{ c.name }}
      </button>
    </nav>
  </aside>
</template>

<script setup>
defineProps({
    availableComponents: {
        type: Array,
        required: true,
    },
    selectedComponentId: {
        type: String,
        required: true,
    },
});

defineEmits(['update:selectedComponentId']);
</script>

<style scoped>
.playground-sidebar {
  width: 240px;
  border-right: 1px solid var(--sxo-color-neutral-200);
  display: flex;
  flex-direction: column;
  background: var(--sxo-color-background-secondary);
}

.sidebar-header {
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-bottom: 1px solid var(--sxo-color-neutral-200);
}

.logo {
  font-weight: 800;
  font-size: 1.1rem;
  letter-spacing: -0.02em;
  color: var(--sxo-color-neutral-900);
}

.component-nav {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.component-nav button {
  text-align: left;
  padding: 0.6rem 1rem;
  border-radius: 6px;
  font-size: 0.9rem;
  color: var(--sxo-color-neutral-600);
  transition: all 0.2s;
}

.component-nav button:hover {
  background: var(--sxo-color-neutral-100);
  color: var(--sxo-color-neutral-900);
}

.component-nav button.active {
  background: var(--sxo-color-primary-DEFAULT);
  color: white;
  font-weight: 600;
}
</style>

