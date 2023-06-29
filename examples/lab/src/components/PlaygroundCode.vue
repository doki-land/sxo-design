<template>
  <div class="code-section">
    <div class="code-header">
      <span>Usage ({{ activeFrameworkName }})</span>
      <SxoButton size="xs" variant="ghost" @click="$emit('copyCode')">Copy</SxoButton>
    </div>
    <pre class="code-display"><code>{{ generatedCode }}</code></pre>
  </div>
</template>

<script setup>
defineProps({
    activeFrameworkName: String,
    generatedCode: String,
});

defineEmits(['copyCode']);
</script>

<style scoped>
.code-section {
  height: 200px;
  border-top: 1px solid var(--sxo-color-neutral-200);
  background: var(--sxo-color-neutral-900);
  color: white;
  display: flex;
  flex-direction: column;
}

.code-header {
  padding: 0.5rem 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--sxo-color-neutral-400);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(0,0,0,0.2);
}

.code-display {
  flex: 1;
  margin: 0;
  padding: 1rem;
  font-family: var(--sxo-typography-fontFamily-mono);
  font-size: 0.85rem;
  overflow: auto;
}
</style>

