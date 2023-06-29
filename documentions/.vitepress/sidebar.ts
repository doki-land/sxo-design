import fs from 'node:fs';
import path from 'node:path';

const DOCS_ROOT = path.resolve(__dirname, '../../zh');

export function getSidebar() {
    return {
        '/zh/guide/': [
            {
                text: '指南',
                items: [
                    { text: '快速开始', link: '/zh/guide/getting-started' },
                    { text: '设计令牌', link: '/zh/guide/tokens' },
                    { text: '原子化 CSS', link: '/zh/guide/atomic-css' },
                    { text: '国际化 (i18n)', link: '/zh/guide/i18n' },
                    { text: '与主流库对比', link: '/zh/guide/comparison' },
                ],
            },
        ],
        '/zh/components/': [
            {
                text: '通用组件',
                items: generateItems('components', [
                    'button',
                    'input',
                    'search',
                    'badge',
                    'avatar',
                    'tag',
                    'icon',
                ]),
            },
            {
                text: '布局组件',
                items: generateItems('components', ['layout', 'divider', 'box']),
            },
            {
                text: '表单组件',
                items: generateItems('components', [
                    'form',
                    'checkbox',
                    'radio',
                    'select',
                    'cascader',
                    'datepicker',
                    'transfer',
                    'treeselect',
                    'mentions',
                    'slider',
                    'switch',
                    'upload',
                    'rate',
                ]),
            },
            {
                text: '数据展示',
                items: generateItems('components', [
                    'table',
                    'tree',
                    'calendar',
                    'card',
                    'descriptions',
                    'statistic',
                    'timeline',
                    'tabs',
                    'pagination',
                    'steps',
                    'accordion',
                    'empty',
                    'breadcrumb',
                    'virtual-list',
                ]),
            },
            {
                text: '反馈组件',
                items: generateItems('components', [
                    'toast',
                    'alert',
                    'dialog',
                    'drawer',
                    'popconfirm',
                    'popover',
                    'tooltip',
                    'feedback',
                    'skeleton',
                    'result',
                ]),
            },
            {
                text: '导航组件',
                items: generateItems('components', ['menu', 'backtop']),
            },
            {
                text: '重型组件',
                items: generateItems('components', ['admin', 'command-palette']),
            },
        ],
        '/zh/adaptors/': [
            {
                text: '框架适配',
                items: generateItems('adaptors', [
                    'vue',
                    'react',
                    'vue2',
                    'solid',
                    'svelte',
                    'alpine',
                    'spring-boot',
                    'hexo',
                    'hugo',
                    'vite-plugin',
                ]),
            },
        ],
    };
}

function generateItems(dir: string, files: string[]) {
    return files.map((file) => {
        const filePath = path.join(DOCS_ROOT, dir, `${file}.md`);
        let text = file.charAt(0).toUpperCase() + file.slice(1);

        if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, 'utf-8');
            const titleMatch = content.match(/^#\s+(.+)$/m);
            if (titleMatch) {
                text = titleMatch[1];
            }
        }

        return {
            text,
            link: `/zh/${dir}/${file}`,
        };
    });
}
