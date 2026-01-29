import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface SidebarItem {
    text: string;
    link: string;
}

interface SidebarGroup {
    text: string;
    items: SidebarItem[];
}

const sidebarData: Record<string, SidebarGroup[]> = {
    '/zh-CN/guide/': [
        {
            text: '指南',
            items: [
                { text: '架构白皮书', link: '/zh-CN/guide/whitebook' },
                { text: 'CDN Bundle (即用型)', link: '/zh-CN/guide/bundle' },
                { text: '快速开始', link: '/zh-CN/guide/getting-started' },
                { text: '设计令牌', link: '/zh-CN/guide/tokens' },
                { text: '原子化 CSS', link: '/zh-CN/guide/atomic-css' },
                { text: '国际化 (i18n)', link: '/zh-CN/guide/i18n' },
                { text: '与主流库对比', link: '/zh-CN/guide/comparison' },
            ],
        },
    ],
    '/zh-CN/components/': [
        {
            text: '通用组件',
            items: [
                { text: '按钮 Button', link: '/zh-CN/components/button' },
                { text: '输入框 Input', link: '/zh-CN/components/input' },
                { text: '搜索 Search', link: '/zh-CN/components/search' },
                { text: '徽标 Badge', link: '/zh-CN/components/badge' },
                { text: '头像 Avatar', link: '/zh-CN/components/avatar' },
                { text: '标签 Tag', link: '/zh-CN/components/tag' },
                { text: '图标 Icon', link: '/zh-CN/components/icon' },
            ],
        },
        {
            text: '布局组件',
            items: [
                { text: '布局 Layout', link: '/zh-CN/components/layout' },
                { text: '分割线 Divider', link: '/zh-CN/components/divider' },
                { text: '盒子 Box', link: '/zh-CN/components/box' },
            ],
        },
        // ... more components can be added later
    ],
    '/zh-CN/adaptors/': [
        {
            text: '框架适配',
            items: [
                { text: 'Vue', link: '/zh-CN/adaptors/vue' },
                { text: 'React', link: '/zh-CN/adaptors/react' },
                { text: 'Vue2', link: '/zh-CN/adaptors/vue2' },
                { text: 'Solid', link: '/zh-CN/adaptors/solid' },
                { text: 'Svelte', link: '/zh-CN/adaptors/svelte' },
                { text: 'Alpine', link: '/zh-CN/adaptors/alpine' },
                { text: 'Spring Boot', link: '/zh-CN/adaptors/spring-boot' },
                { text: 'Hexo', link: '/zh-CN/adaptors/hexo' },
                { text: 'Hugo', link: '/zh-CN/adaptors/hugo' },
                { text: 'Vite Plugin', link: '/zh-CN/adaptors/vite-plugin' },
            ],
        },
    ],
};

const Sidebar: React.FC = () => {
    const location = useLocation();
    
    // Find the matching sidebar group based on current path
    const activeKey = Object.keys(sidebarData).find(key => location.pathname.startsWith(key));
    const groups = activeKey ? sidebarData[activeKey] : [];

    return (
        <nav className="space-y-8">
            {groups.map((group, i) => (
                <div key={i}>
                    <h5 className="mb-3 text-sm font-semibold text-gray-900 uppercase tracking-wider">
                        {group.text}
                    </h5>
                    <ul className="space-y-2">
                        {group.items.map((item, j) => (
                            <li key={j}>
                                <Link
                                    to={item.link}
                                    className={`block text-sm transition-colors duration-200 ${
                                        location.pathname === item.link
                                            ? 'text-indigo-600 font-medium'
                                            : 'text-gray-600 hover:text-gray-900'
                                    }`}
                                >
                                    {item.text}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </nav>
    );
};

export default Sidebar;
