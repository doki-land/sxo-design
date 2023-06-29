<template>
  <div class="playground-root" :class="{ dark: isDark }" :style="containerStyle">
    <PlaygroundSidebar 
      v-model:selectedComponentId="selectedComponentId"
      :availableComponents="availableComponents"
    />

    <main class="playground-main">
      <PlaygroundHeader 
        v-model:themeName="currentThemeName"
        v-model:locale="currentLocale"
        :isDark="isDark"
        :activeFrameworkName="activeFrameworkName"
        @toggleDark="isDark = !isDark"
        @openCommandPalette="isCommandPaletteOpen = true"
      />

      <div class="playground-workspace">
        <div class="preview-container">
          <PlaygroundPreview 
            :currentComponent="currentComponent"
            :componentProps="componentProps"
            :isDark="isDark"
            @componentClick="handleComponentClick"
          />
          
          <PlaygroundCode 
            :activeFrameworkName="activeFrameworkName"
            :generatedCode="generatedCode"
            @copyCode="copyCode"
          />
        </div>

        <PlaygroundInspector 
          :currentComponent="currentComponent"
          :componentProps="componentProps"
          @resetProps="resetProps"
        />
      </div>
    </main>
  </div>

  <SxoCommandPalette 
    :is-open="isCommandPaletteOpen" 
    :commands="playgroundCommands"
    @close="isCommandPaletteOpen = false"
  />
</template>

<script setup>
import { defaultTokens } from '@sxo/design';
import { StyleEngine } from '@sxo/engine';
import { antdTheme } from '@sxo/theme-antd';
import { carbonTheme } from '@sxo/theme-carbon';
import { cupertinoTheme } from '@sxo/theme-cupertino';
import { fateTheme } from '@sxo/theme-fate';
import { fluentTheme } from '@sxo/theme-fluent';
import { githubTheme } from '@sxo/theme-github';
import { materialTheme } from '@sxo/theme-material';
import { computed, reactive, ref, watch } from 'vue';
import { useToast as useSxoToast } from 'vue-sxo';
import { availableComponents } from './state/components-metadata';
// Shared State/Metadata
import { currentFramework, frameworks } from './state/framework-state';

const currentThemeName = ref('default');
const isDark = ref(false);
const _isCommandPaletteOpen = ref(false);
const _currentLocale = defineModel('locale', { default: 'en' });
const selectedComponentId = ref('button');

const { success, info } = useSxoToast();

const currentComponent = computed(
    () =>
        availableComponents.find((c) => c.id === selectedComponentId.value) ||
        availableComponents[0],
);

const componentProps = reactive({ ...currentComponent.value.defaultProps });

watch(selectedComponentId, () => {
    Object.keys(componentProps).forEach((key) => delete componentProps[key]);
    Object.assign(componentProps, currentComponent.value.defaultProps);
});

const _activeFrameworkName = computed(
    () => frameworks.find((f) => f.id === currentFramework.value)?.name || 'Vue',
);

const generatedCode = computed(() => {
    const fw = currentFramework.value;
    const propsStr = Object.entries(componentProps)
        .filter(([key, val]) => {
            if (key === 'content') return false;
            if (val === currentComponent.value.defaultProps[key]) return false;
            return true;
        })
        .map(([key, val]) => {
            if (typeof val === 'boolean') return val ? key : '';
            return `${key}="${val}"`;
        })
        .filter(Boolean)
        .join(' ');

    const name = currentComponent.value.name;
    const content = componentProps.content || '';

    if (fw === 'react') {
        return `<${name} ${propsStr}>${content}</${name}>`;
    } else if (fw === 'vue' || fw === 'vue2') {
        return `<Sxo${name} ${propsStr}>${content}</Sxo${name}>`;
    }
    return `<${name} ${propsStr}>${content}</${name}>`;
});

const resetProps = () => {
    Object.assign(componentProps, currentComponent.value.defaultProps);
    success('Properties reset');
};

const _copyCode = () => {
    navigator.clipboard.writeText(generatedCode.value);
    success('Code copied to clipboard');
};

const _handleComponentClick = () => info(`${currentComponent.value.name} Clicked!`);

// Theme and Tokens Logic
const themes = {
    default: defaultTokens,
    github: githubTheme,
    material: materialTheme,
    fate: fateTheme,
    antd: antdTheme,
    carbon: carbonTheme,
    cupertino: cupertinoTheme,
    fluent: fluentTheme,
};

const currentTokens = computed(() => themes[currentThemeName.value] || defaultTokens);
const engine = computed(() => new StyleEngine(currentTokens.value));

const _containerStyle = computed(() => {
    return {};
});

watch(
    [currentTokens, isDark],
    () => {
        if (typeof document !== 'undefined') {
            const css = engine.value.generateTokenCssVars();
            let styleEl = document.getElementById('sxo-playground-vars');
            if (!styleEl) {
                styleEl = document.createElement('style');
                styleEl.id = 'sxo-playground-vars';
                document.head.appendChild(styleEl);
            }
            styleEl.textContent = css;
            document.documentElement.setAttribute('data-sxo-mode', isDark.value ? 'dark' : 'light');
        }
    },
    { immediate: true },
);

const _playgroundCommands = [
    {
        id: 'toggle-dark',
        title: 'Toggle Dark Mode',
        shortcut: 'D',
        action: () => {
            isDark.value = !isDark.value;
        },
    },
    {
        id: 'reset',
        title: 'Reset Properties',
        shortcut: 'R',
        action: resetProps,
    },
];
</script>

<style scoped>
.playground-root {
  display: flex;
  height: 100vh;
  background: var(--sxo-color-background-primary);
  color: var(--sxo-color-neutral-900);
  border: 1px solid var(--sxo-color-neutral-200);
  border-radius: 12px;
  overflow: hidden;
  font-family: var(--sxo-typography-fontFamily-sans);
}

.playground-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.playground-workspace {
  flex: 1;
  display: flex;
  min-height: 0;
}

.preview-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}
</style>
