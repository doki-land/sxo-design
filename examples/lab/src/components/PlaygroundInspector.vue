<template>
  <aside class="inspector-panel">
    <div class="panel-section">
      <h3>Properties</h3>
      <div class="prop-list">
        <div v-for="prop in currentComponent.props" :key="prop.name" class="prop-item">
          <label>{{ prop.name }}</label>
          
          <SxoSelect v-if="prop.type === 'select'" v-model="componentProps[prop.name]" size="xs">
            <SxoSelectOption v-for="opt in prop.options" :key="opt" :value="opt">{{ opt }}</SxoSelectOption>
          </SxoSelect>

          <SxoSwitch v-else-if="prop.type === 'boolean'" v-model="componentProps[prop.name]" />

          <SxoInput v-else-if="prop.type === 'number'" type="number" v-model.number="componentProps[prop.name]" size="xs" />

          <SxoInput v-else v-model="componentProps[prop.name]" size="xs" />
        </div>
      </div>
    </div>

    <div class="panel-section mt-auto">
      <SxoButton variant="outline" size="sm" block @click="$emit('resetProps')">Reset Props</SxoButton>
    </div>
  </aside>
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
});

defineEmits(['resetProps']);
</script>

<style scoped>
.inspector-panel {
  width: 300px;
  border-left: 1px solid var(--sxo-color-neutral-200);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  background: white;
}

:global(.dark) .inspector-panel {
  background: var(--sxo-color-background-primary);
}

.panel-section h3 {
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  color: var(--sxo-color-neutral-400);
  margin-bottom: 1rem;
  letter-spacing: 0.05em;
}

.prop-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.prop-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.prop-item label {
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--sxo-color-neutral-600);
}
</style>

