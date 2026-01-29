import { defineConfig } from '@cvo/core';
import { FluentI18nProvider } from '@cvo/plugin-i18n-fluent';

export default defineConfig({
    port: 3000,
    type: 'frontend',
    mode: 'ssg',
    routes: ['/', '/zh-CN/guide/getting-started', '/zh-CN/components/button'],
    i18n: {
        provider: new FluentI18nProvider(),
        defaultLocale: 'zh-CN',
        locales: ['en-US', 'zh-CN'],
        fallbackLocale: 'en-US',
    },
    ssg: {
        generateEmptyPages: true,
    },
});
