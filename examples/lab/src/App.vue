<template>
  <SxoI18nProvider :locale="currentLocale" :messages="i18nMessages">
    <SxoToastProvider>
      <Playground v-model:locale="currentLocale" />
    </SxoToastProvider>
  </SxoI18nProvider>
</template>

<script setup>
import { ref } from 'vue';

const _currentLocale = ref('en');

const _i18nMessages = {
    en: { submit: 'Submit', cancel: 'Cancel' },
    zh: { submit: '提交', cancel: '取消' },
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
</style>
