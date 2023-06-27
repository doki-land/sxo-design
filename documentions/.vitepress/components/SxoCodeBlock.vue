<template>
  <div v-if="currentFramework === framework" class="sxo-code-block animate-fade-in">
    <slot></slot>
  </div>
</template>

<script setup>
import { currentFramework } from '../theme/framework-state';

defineProps({
    framework: {
        type: String,
        required: true,
    },
});
</script>

<style scoped>
.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}
@keyframes fade-in {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
