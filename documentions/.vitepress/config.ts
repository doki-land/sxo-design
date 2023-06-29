import { vitePluginSxo } from 'vite-plugin-sxo';
import { defineConfig } from 'vitepress';
import { getSidebar } from './sidebar';

export default defineConfig({
    title: 'SXO Design System',
    description: 'A Progressive, Atomic, and Theme-driven Design System',
    ignoreDeadLinks: true,
    outDir: './dist',

    vite: {
        plugins: [vitePluginSxo()],
        // @ts-expect-error - Experimental Rolldown support in Vite 6
        builder: 'rolldown',
        css: {
            transformer: 'lightningcss',
        },
        build: {
            cssMinify: 'lightningcss',
        },
    },

    locales: {
        root: {
            label: 'English',
            lang: 'en',
            link: '/en/',
        },
        zh: {
            label: '简体中文',
            lang: 'zh-CN',
            link: '/zh/',
        },
    },

    themeConfig: {
        logo: '/logo.svg',
        nav: [
            { text: '指南', link: '/zh/guide/getting-started' },
            { text: '组件', link: '/zh/components/button' },
            { text: '实验室', link: '/zh/playground' },
        ],
        sidebar: getSidebar(),
        socialLinks: [{ icon: 'github', link: 'https://github.com/sxo-design/sxo' }],
    },
});
