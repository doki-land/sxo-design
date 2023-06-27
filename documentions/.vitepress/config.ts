import { vitePluginSxo } from 'vite-plugin-sxo';
import { defineConfig } from 'vitepress';

export default defineConfig({
    title: 'SXO Design System',
    description: 'A Progressive, Atomic, and Theme-driven Design System',

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
            { text: 'Guide', link: '/zh/guide/getting-started' },
            { text: 'Components', link: '/zh/components/button' },
            { text: 'Playground', link: '/zh/playground' },
        ],
        sidebar: {
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
                    items: [
                        { text: 'Button 按钮', link: '/zh/components/button' },
                        { text: 'Input 输入框', link: '/zh/components/input' },
                        { text: 'Search 搜索框', link: '/zh/components/search' },
                        { text: 'Badge 徽章', link: '/zh/components/badge' },
                        { text: 'Avatar 头像', link: '/zh/components/avatar' },
                        { text: 'Tag 标签', link: '/zh/components/tag' },
                    ],
                },
                {
                    text: '布局组件',
                    items: [
                        { text: 'Layout 布局', link: '/zh/components/layout' },
                        { text: 'Divider 分割线', link: '/zh/components/divider' },
                    ],
                },
                {
                    text: '表单组件',
                    items: [
                        { text: 'Form 表单', link: '/zh/components/form' },
                        { text: 'Checkbox 复选框', link: '/zh/components/checkbox' },
                        { text: 'Radio 单选框', link: '/zh/components/radio' },
                        { text: 'Select 选择器', link: '/zh/components/select' },
                        { text: 'Cascader 级联选择', link: '/zh/components/cascader' },
                        { text: 'DatePicker 日期选择', link: '/zh/components/datepicker' },
                        { text: 'Transfer 穿梭框', link: '/zh/components/transfer' },
                        { text: 'TreeSelect 树选择', link: '/zh/components/treeselect' },
                        { text: 'Mentions 提及', link: '/zh/components/mentions' },
                        { text: 'Slider 滑块', link: '/zh/components/slider' },
                        { text: 'Switch 开关', link: '/zh/components/switch' },
                        { text: 'Upload 上传', link: '/zh/components/upload' },
                        { text: 'Rate 评分', link: '/zh/components/rate' },
                    ],
                },
                {
                    text: '数据展示',
                    items: [
                        { text: 'Table 表格', link: '/zh/components/table' },
                        { text: 'Tree 树形控件', link: '/zh/components/tree' },
                        { text: 'Calendar 日历', link: '/zh/components/calendar' },
                        { text: 'Card 卡片', link: '/zh/components/card' },
                        { text: 'Descriptions 描述列表', link: '/zh/components/descriptions' },
                        { text: 'Statistic 统计数值', link: '/zh/components/statistic' },
                        { text: 'Timeline 时间轴', link: '/zh/components/timeline' },
                        { text: 'Tabs 选项卡', link: '/zh/components/tabs' },
                        { text: 'Pagination 分页', link: '/zh/components/pagination' },
                        { text: 'Steps 步骤条', link: '/zh/components/steps' },
                        { text: 'Accordion 手风琴', link: '/zh/components/accordion' },
                        { text: 'Empty 空状态', link: '/zh/components/empty' },
                        { text: 'Breadcrumb 面包屑', link: '/zh/components/breadcrumb' },
                        { text: 'VirtualList 虚拟列表', link: '/zh/components/virtual-list' },
                    ],
                },
                {
                    text: '反馈组件',
                    items: [
                        { text: 'Toast 通知', link: '/zh/components/toast' },
                        { text: 'Alert 警告', link: '/zh/components/alert' },
                        { text: 'Dialog 对话框', link: '/zh/components/dialog' },
                        { text: 'Drawer 抽屉', link: '/zh/components/drawer' },
                        { text: 'Popconfirm 气泡确认', link: '/zh/components/popconfirm' },
                        { text: 'Popover 气泡卡片', link: '/zh/components/popover' },
                        { text: 'Tooltip 文字提示', link: '/zh/components/tooltip' },
                        { text: 'Feedback 加载反馈', link: '/zh/components/feedback' },
                        { text: 'Skeleton 骨架屏', link: '/zh/components/skeleton' },
                        { text: 'Result 结果', link: '/zh/components/result' },
                    ],
                },
                {
                    text: '导航组件',
                    items: [
                        { text: 'Menu 菜单', link: '/zh/components/menu' },
                        { text: 'BackTop 回到顶部', link: '/zh/components/backtop' },
                    ],
                },
                {
                    text: '重型组件',
                    items: [
                        { text: 'Admin 后台架构', link: '/zh/components/admin' },
                        { text: 'CommandPalette 命令面板', link: '/zh/components/command-palette' },
                        { text: 'VirtualList 虚拟列表', link: '/zh/components/virtual-list' },
                    ],
                },
            ],
        },
        socialLinks: [{ icon: 'github', link: 'https://github.com/sxo-design/sxo' }],
    },

    vite: {
        plugins: [vitePluginSxo()],
    },
});
