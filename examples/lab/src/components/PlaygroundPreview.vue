<template>
  <div class="preview-section">
    <div class="preview-canvas" :class="{ 'bg-checkered': !isDark }">
      <div class="component-wrapper">
        <component 
          :is="currentComponent.component" 
          v-bind="componentProps"
          @click="$emit('componentClick', $event)"
        >
          <template v-if="currentComponent.hasSlot">
            {{ componentProps.content || 'Sample Content' }}
          </template>
        </component>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
    currentComponent: {
        type: Object,
        required: true,
    },
    componentProps: {
        type: Object,
        required: true,
    },
    isDark: Boolean,
});

defineEmits(['componentClick']);
</script>

<style scoped>
.preview-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: var(--sxo-color-neutral-50);
}

.preview-canvas {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem;
  overflow: auto;
  position: relative;
}

.bg-checkered {
  background-image: radial-gradient(var(--sxo-color-neutral-200) 1px, transparent 0);
  background-size: 24px 24px;
}

.component-wrapper {
  background: white;
  padding: 3rem;
  border-radius: 16px;
  box-shadow: var(--sxo-boxShadow-lg);
  min-width: 200px;
  display: flex;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

:global(.dark) .component-wrapper {
  background: var(--sxo-color-background-secondary);
}
</style>

