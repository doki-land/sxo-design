<template>
  <div class="sxo-api-table my-8 overflow-x-auto">
    <table class="w-full text-left border-collapse">
      <thead>
        <tr class="border-b border-neutral-200 dark:border-neutral-800">
          <th class="py-3 px-4 text-sm font-semibold text-neutral-900 dark:text-neutral-100">Property</th>
          <th class="py-3 px-4 text-sm font-semibold text-neutral-900 dark:text-neutral-100">Type</th>
          <th class="py-3 px-4 text-sm font-semibold text-neutral-900 dark:text-neutral-100">Default</th>
          <th class="py-3 px-4 text-sm font-semibold text-neutral-900 dark:text-neutral-100">Options</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="prop in componentMetadata?.props" :key="prop.name" class="border-b border-neutral-100 dark:border-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-colors">
          <td class="py-3 px-4">
            <code class="text-primary font-bold">{{ prop.name }}</code>
          </td>
          <td class="py-3 px-4">
            <span class="text-xs px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
              {{ prop.type }}
            </span>
          </td>
          <td class="py-3 px-4">
            <code class="text-xs text-neutral-500">{{ formatDefault(prop.default) }}</code>
          </td>
          <td class="py-3 px-4">
            <div v-if="prop.options" class="flex flex-wrap gap-1">
              <code v-for="opt in prop.options" :key="opt" class="text-[10px] px-1.5 py-0.5 rounded border border-neutral-200 dark:border-neutral-800 text-neutral-500">
                {{ opt }}
              </code>
            </div>
            <span v-else class="text-xs text-neutral-400">-</span>
          </td>
        </tr>
      </tbody>
    </table>
    
    <div v-if="!componentMetadata" class="p-4 text-center text-sm text-neutral-500 italic">
      No API metadata found for component "{{ component }}".
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { availableComponents } from '../theme/components-metadata';

const props = defineProps({
    component: {
        type: String,
        required: true,
    },
});

const _componentMetadata = computed(() => {
    if (!props.component) return null;
    const id = props.component.toLowerCase().replace('sxo', '');
    return availableComponents.find((c) => c.id === id);
});

const _formatDefault = (val) => {
    if (val === undefined || val === null) return '-';
    if (typeof val === 'string') return `'${val}'`;
    return String(val);
};
</script>

<style scoped>
.sxo-api-table table {
  margin: 0;
}
</style>
