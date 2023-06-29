<template>
  <div class="sxo-demo-container border rounded-xl overflow-hidden my-8 bg-white dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800">
    <!-- Preview Area -->
    <div class="sxo-demo-preview p-6 flex flex-wrap gap-4 items-center justify-center bg-checkered">
      <template v-if="$slots.default">
        <slot></slot>
      </template>
      <template v-else-if="resolvedComponent">
        <component :is="resolvedComponent" v-bind="props">
          <slot name="content">{{ content }}</slot>
        </component>
      </template>
    </div>

    <!-- Code Group -->
    <SxoCodeGroup>
      <SxoCodeBlock v-for="f in frameworks" :key="f.id" :framework="f.id">
        <div class="relative">
          <pre :class="`language-${f.lang}`"><code v-html="highlightedCode(f.id)"></code></pre>
          <button 
            @click="copyCode(f.id)"
            class="absolute top-2 right-2 p-1.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-500 hover:text-primary transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
          </button>
        </div>
      </SxoCodeBlock>
    </SxoCodeGroup>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import * as SxoVue from 'vue-sxo';

const props = defineProps({
    component: {
        type: String,
        required: true,
    },
    props: {
        type: Object,
        default: () => ({}),
    },
    content: {
        type: String,
        default: '',
    },
});

const _resolvedComponent = computed(() => {
    if (!props.component) return null;
    return SxoVue[props.component] || SxoVue[props.component.replace('Sxo', '')];
});

// Simple code generator for different frameworks
const generateCode = (frameworkId) => {
    if (!props.component) return '';
    const compName = props.component.startsWith('Sxo') ? props.component : `Sxo${props.component}`;
    const reactCompName = props.component.replace('Sxo', '');
    const propEntries = Object.entries(props.props || {});
    const propStr = propEntries
        .map(([k, v]) => {
            if (typeof v === 'string') return `${k}="${v}"`;
            if (typeof v === 'boolean') return v ? k : `:${k}="false"`;
            return `:${k}="${JSON.stringify(v)}"`;
        })
        .join(' ');

    const reactPropStr = propEntries
        .map(([k, v]) => {
            if (typeof v === 'string') return `${k}="${v}"`;
            if (typeof v === 'boolean') return v ? k : `${k}={false}`;
            return `${k}={${JSON.stringify(v)}}`;
        })
        .join(' ');

    switch (frameworkId) {
        case 'vue':
            return (
                `<template>\n  <${compName} ${propStr}>\n    ${props.content || 'Content'}\n  </${compName}>\n</template>\n\n<script setup>\nimport { ${reactCompName} as ${compName} } from '@sxo/vue';\n</` +
                `script>`
            );

        case 'react':
            return `import { ${reactCompName} } from '@sxo/react';\n\nexport default () => (\n  <${reactCompName} ${reactPropStr}>\n    ${props.content || 'Content'}\n  </${reactCompName}>\n);`;

        case 'solid':
            return `import { ${reactCompName} } from '@sxo/solid';\n\nexport default () => (\n  <${reactCompName} ${reactPropStr}>\n    ${props.content || 'Content'}\n  </${reactCompName}>\n);`;

        case 'vue2':
            return (
                `<template>\n  <${compName} ${propStr}>\n    ${props.content || 'Content'}\n  </${compName}>\n</template>\n\n<script>\nimport { ${reactCompName} } from '@sxo/vue2';\nexport default {\n  components: { ${compName}: ${reactCompName} }\n}\n</` +
                `script>`
            );

        default:
            return `// Code for ${frameworkId} coming soon...`;
    }
};

// In a real VitePress app, we would use Prism or Shiki to highlight
// For now, we'll just return the plain text.
// VitePress usually handles highlighting in markdown.
const _highlightedCode = (frameworkId) => {
    const code = generateCode(frameworkId);
    // Escaping for HTML display
    return code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
};

const _copyCode = (frameworkId) => {
    const code = generateCode(frameworkId);
    navigator.clipboard.writeText(code);
};
</script>

<style scoped>
.bg-checkered {
  background-image: radial-gradient(#e5e7eb 1px, transparent 1px);
  background-size: 20px 20px;
  background-color: #f9fafb;
}
:global(.dark) .bg-checkered {
  background-image: radial-gradient(#374151 1px, transparent 1px);
  background-color: #030712;
}

.sxo-demo-preview {
  min-height: 120px;
}

pre {
  margin: 0;
  padding: 1rem;
  font-size: 0.85rem;
  line-height: 1.5;
  overflow: auto;
}
</style>
