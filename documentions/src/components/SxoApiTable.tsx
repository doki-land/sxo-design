import React from 'react';

interface ApiProp {
    name: string;
    description: string;
    type: string;
    default: string;
}

const componentMetadata: Record<string, ApiProp[]> = {
    Button: [
        { name: 'variant', description: '按钮变体', type: "'primary' | 'secondary' | 'outline' | 'ghost' | 'link'", default: "'primary'" },
        { name: 'size', description: '按钮尺寸', type: "'sm' | 'md' | 'lg' | 'xl'", default: "'md'" },
        { name: 'disabled', description: '是否禁用', type: 'boolean', default: 'false' },
        { name: 'loading', description: '是否加载中', type: 'boolean', default: 'false' },
        { name: 'block', description: '是否为块级按钮', type: 'boolean', default: 'false' },
    ],
    Input: [
        { name: 'value', description: '输入框值', type: 'string', default: "''" },
        { name: 'placeholder', description: '占位提示符', type: 'string', default: "''" },
        { name: 'disabled', description: '是否禁用', type: 'boolean', default: 'false' },
        { name: 'type', description: '输入框类型', type: 'string', default: "'text'" },
    ],
    Badge: [
        { name: 'variant', description: '徽标变体', type: "'solid' | 'outline' | 'subtle'", default: "'solid'" },
        { name: 'color', description: '颜色', type: 'string', default: "'primary'" },
        { name: 'dot', description: '是否为圆点模式', type: 'boolean', default: 'false' },
    ],
    Avatar: [
        { name: 'src', description: '图片地址', type: 'string', default: "''" },
        { name: 'name', description: '姓名', type: 'string', default: "''" },
        { name: 'size', description: '尺寸', type: "'sm' | 'md' | 'lg'", default: "'md'" },
        { name: 'fallback', description: '回退显示', type: 'string', default: "''" },
    ],
    Tag: [
        { name: 'variant', description: '标签变体', type: "'solid' | 'outline' | 'light'", default: "'solid'" },
        { name: 'color', description: '颜色', type: 'string', default: "'primary'" },
        { name: 'closable', description: '是否可关闭', type: 'boolean', default: 'false' },
    ],
    Search: [
        { name: 'value', description: '搜索关键词', type: 'string', default: "''" },
        { name: 'placeholder', description: '占位提示符', type: 'string', default: "'搜索...'" },
        { name: 'loading', description: '是否搜索中', type: 'boolean', default: 'false' },
    ],
    Icon: [
        { name: 'name', description: '图标名称', type: 'string', default: "''" },
        { name: 'size', description: '图标大小', type: 'number | string', default: '20' },
        { name: 'color', description: '图标颜色', type: 'string', default: "'currentColor'" },
    ],
};

interface SxoApiTableProps {
    component: string;
}

export const SxoApiTable: React.FC<SxoApiTableProps> = ({ component }) => {
    const data = componentMetadata[component] || [];

    if (data.length === 0) {
        return (
            <div className="my-8 p-4 bg-yellow-50 text-yellow-700 border border-yellow-200 rounded-lg">
                暂无组件 {component} 的 API 信息。
            </div>
        );
    }

    return (
        <div className="my-8 overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">参数</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">说明</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">类型</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">默认值</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {data.map((item, i) => (
                        <tr key={i} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-mono font-medium text-indigo-600">{item.name}</td>
                            <td className="px-6 py-4 text-sm text-gray-600">{item.description}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-pink-600 bg-pink-50 rounded px-1">{item.type}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-500">{item.default}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
