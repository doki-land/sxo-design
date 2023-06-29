export const availableComponents = [
    {
        id: 'button',
        name: 'Button',
        props: [
            {
                name: 'variant',
                type: 'string',
                options: [
                    'primary',
                    'secondary',
                    'outline',
                    'ghost',
                    'error',
                    'success',
                    'warning',
                ],
                default: 'primary',
            },
            {
                name: 'size',
                type: 'string',
                options: ['xs', 'sm', 'md', 'lg', 'xl'],
                default: 'md',
            },
            { name: 'disabled', type: 'boolean', default: false },
        ],
    },
    {
        id: 'badge',
        name: 'Badge',
        props: [
            {
                name: 'variant',
                type: 'string',
                options: ['primary', 'secondary', 'outline', 'ghost', 'error', 'success'],
                default: 'primary',
            },
            { name: 'size', type: 'string', options: ['xs', 'sm', 'md'], default: 'sm' },
        ],
    },
    {
        id: 'input',
        name: 'Input',
        props: [
            { name: 'placeholder', type: 'string', default: '' },
            { name: 'size', type: 'string', options: ['sm', 'md', 'lg'], default: 'md' },
            { name: 'disabled', type: 'boolean', default: false },
            {
                name: 'type',
                type: 'string',
                options: ['text', 'password', 'email', 'number'],
                default: 'text',
            },
        ],
    },
    {
        id: 'alert',
        name: 'Alert',
        props: [
            {
                name: 'type',
                type: 'string',
                options: ['info', 'success', 'warning', 'error'],
                default: 'info',
            },
            {
                name: 'variant',
                type: 'string',
                options: ['subtle', 'solid', 'outline'],
                default: 'subtle',
            },
            { name: 'title', type: 'string', default: '' },
            { name: 'description', type: 'string', default: '' },
            { name: 'closable', type: 'boolean', default: false },
            { name: 'showIcon', type: 'boolean', default: true },
        ],
    },
    {
        id: 'drawer',
        name: 'Drawer',
        props: [
            { name: 'modelValue', type: 'boolean', default: false },
            { name: 'title', type: 'string', default: '' },
            {
                name: 'placement',
                type: 'string',
                options: ['left', 'right', 'top', 'bottom'],
                default: 'right',
            },
            {
                name: 'size',
                type: 'string',
                options: ['sm', 'md', 'lg', 'xl', 'full'],
                default: 'md',
            },
            { name: 'closable', type: 'boolean', default: true },
        ],
    },
    {
        id: 'empty',
        name: 'Empty',
        props: [
            { name: 'description', type: 'string', default: '' },
            { name: 'size', type: 'string', options: ['sm', 'md', 'lg'], default: 'md' },
        ],
    },
    {
        id: 'divider',
        name: 'Divider',
        props: [
            {
                name: 'direction',
                type: 'string',
                options: ['horizontal', 'vertical'],
                default: 'horizontal',
            },
            {
                name: 'type',
                type: 'string',
                options: ['solid', 'dashed', 'dotted'],
                default: 'solid',
            },
            {
                name: 'contentPlacement',
                type: 'string',
                options: ['left', 'center', 'right'],
                default: 'center',
            },
        ],
    },
    {
        id: 'tag',
        name: 'Tag',
        props: [
            {
                name: 'variant',
                type: 'string',
                options: ['solid', 'outline', 'subtle'],
                default: 'subtle',
            },
            {
                name: 'color',
                type: 'string',
                options: ['primary', 'secondary', 'success', 'warning', 'error', 'neutral'],
                default: 'primary',
            },
            { name: 'size', type: 'string', options: ['sm', 'md', 'lg'], default: 'md' },
            {
                name: 'rounded',
                type: 'string',
                options: ['none', 'sm', 'md', 'full'],
                default: 'sm',
            },
            { name: 'closable', type: 'boolean', default: false },
        ],
    },
    {
        id: 'avatar',
        name: 'Avatar',
        props: [
            { name: 'src', type: 'string', default: '' },
            { name: 'name', type: 'string', default: '' },
            {
                name: 'size',
                type: 'string',
                options: ['xs', 'sm', 'md', 'lg', 'xl'],
                default: 'md',
            },
            { name: 'shape', type: 'string', options: ['circle', 'square'], default: 'circle' },
        ],
    },
    {
        id: 'switch',
        name: 'Switch',
        props: [
            { name: 'modelValue', type: 'boolean', default: false },
            { name: 'disabled', type: 'boolean', default: false },
            { name: 'size', type: 'string', options: ['sm', 'md', 'lg'], default: 'md' },
        ],
    },
    {
        id: 'progress',
        name: 'Progress',
        props: [
            { name: 'percent', type: 'number', default: 0 },
            { name: 'variant', type: 'string', options: ['line', 'circle'], default: 'line' },
            {
                name: 'status',
                type: 'string',
                options: ['normal', 'success', 'error', 'warning'],
                default: 'normal',
            },
            { name: 'showInfo', type: 'boolean', default: true },
        ],
    },
];
