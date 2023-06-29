import { defineComponent, h, markRaw, ref } from 'vue';
import {
    Alert as SxoAlert,
    Avatar as SxoAvatar,
    BackTop as SxoBackTop,
    Badge as SxoBadge,
    Breadcrumb as SxoBreadcrumb,
    BreadcrumbItem as SxoBreadcrumbItem,
    Button as SxoButton,
    Calendar as SxoCalendar,
    Cascader as SxoCascader,
    DatePicker as SxoDatePicker,
    Descriptions as SxoDescriptions,
    DescriptionsItem as SxoDescriptionsItem,
    Divider as SxoDivider,
    Drawer as SxoDrawer,
    Dropdown as SxoDropdown,
    DropdownItem as SxoDropdownItem,
    Empty as SxoEmpty,
    Input as SxoInput,
    Mentions as SxoMentions,
    Pagination as SxoPagination,
    Popconfirm as SxoPopconfirm,
    Popover as SxoPopover,
    Progress as SxoProgress,
    Rate as SxoRate,
    Result as SxoResult,
    Skeleton as SxoSkeleton,
    Slider as SxoSlider,
    Statistic as SxoStatistic,
    Step as SxoStep,
    Steps as SxoSteps,
    Switch as SxoSwitch,
    Tag as SxoTag,
    Timeline as SxoTimeline,
    TimelineItem as SxoTimelineItem,
    Transfer as SxoTransfer,
    Tree as SxoTree,
    TreeSelect as SxoTreeSelect,
    Upload as SxoUpload,
} from 'vue-sxo';

export const availableComponents = [
    {
        id: 'button',
        name: 'Button',
        component: markRaw(SxoButton),
        hasSlot: true,
        props: [
            {
                name: 'variant',
                type: 'select',
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
                type: 'select',
                options: ['xs', 'sm', 'md', 'lg', 'xl'],
                default: 'md',
            },
            { name: 'disabled', type: 'boolean', default: false },
        ],
        defaultProps: { variant: 'primary', size: 'md', disabled: false, content: 'Click Me' },
    },
    {
        id: 'badge',
        name: 'Badge',
        component: markRaw(SxoBadge),
        hasSlot: true,
        props: [
            {
                name: 'variant',
                type: 'select',
                options: ['primary', 'secondary', 'outline', 'ghost', 'error', 'success'],
                default: 'primary',
            },
            { name: 'size', type: 'select', options: ['xs', 'sm', 'md'], default: 'sm' },
        ],
        defaultProps: { variant: 'primary', size: 'sm', content: 'New' },
    },
    {
        id: 'input',
        name: 'Input',
        component: markRaw(SxoInput),
        hasSlot: false,
        props: [
            { name: 'placeholder', type: 'text', default: '' },
            { name: 'size', type: 'select', options: ['sm', 'md', 'lg'], default: 'md' },
            { name: 'disabled', type: 'boolean', default: false },
            {
                name: 'type',
                type: 'select',
                options: ['text', 'password', 'email', 'number'],
                default: 'text',
            },
        ],
        defaultProps: { placeholder: 'Type here...', size: 'md', disabled: false, type: 'text' },
    },
    {
        id: 'alert',
        name: 'Alert',
        component: markRaw(SxoAlert),
        hasSlot: true,
        props: [
            {
                name: 'type',
                type: 'select',
                options: ['info', 'success', 'warning', 'error'],
                default: 'info',
            },
            {
                name: 'variant',
                type: 'select',
                options: ['subtle', 'solid', 'outline'],
                default: 'subtle',
            },
            { name: 'title', type: 'text', default: '' },
            { name: 'description', type: 'text', default: '' },
            { name: 'closable', type: 'boolean', default: false },
            { name: 'showIcon', type: 'boolean', default: true },
        ],
        defaultProps: {
            type: 'info',
            variant: 'subtle',
            title: 'Attention',
            description: 'This is an alert message.',
            closable: false,
            showIcon: true,
        },
    },
    {
        id: 'drawer',
        name: 'Drawer',
        component: markRaw(SxoDrawer),
        hasSlot: true,
        props: [
            { name: 'modelValue', type: 'boolean' },
            { name: 'title', type: 'text' },
            { name: 'placement', type: 'select', options: ['left', 'right', 'top', 'bottom'] },
            { name: 'size', type: 'select', options: ['sm', 'md', 'lg', 'xl', 'full'] },
            { name: 'closable', type: 'boolean' },
        ],
        defaultProps: {
            modelValue: false,
            title: 'Drawer Title',
            placement: 'right',
            size: 'md',
            closable: true,
            content: 'Drawer Content',
        },
    },
    {
        id: 'empty',
        name: 'Empty',
        component: markRaw(SxoEmpty),
        hasSlot: true,
        props: [
            { name: 'description', type: 'text' },
            { name: 'size', type: 'select', options: ['sm', 'md', 'lg'] },
        ],
        defaultProps: { description: 'No items found', size: 'md', content: 'Check back later' },
    },
    {
        id: 'divider',
        name: 'Divider',
        component: markRaw(SxoDivider),
        hasSlot: true,
        props: [
            { name: 'direction', type: 'select', options: ['horizontal', 'vertical'] },
            { name: 'type', type: 'select', options: ['solid', 'dashed', 'dotted'] },
            { name: 'contentPlacement', type: 'select', options: ['left', 'center', 'right'] },
        ],
        defaultProps: {
            direction: 'horizontal',
            type: 'solid',
            contentPlacement: 'center',
            content: 'Divider Text',
        },
    },
    {
        id: 'breadcrumb',
        name: 'Breadcrumb',
        component: defineComponent({
            props: ['separator'],
            setup(props) {
                return () =>
                    h(SxoBreadcrumb, { separator: props.separator }, () => [
                        h(SxoBreadcrumbItem, { href: '#' }, () => 'Home'),
                        h(SxoBreadcrumbItem, { href: '#' }, () => 'Components'),
                        h(SxoBreadcrumbItem, { current: true }, () => 'Breadcrumb'),
                    ]);
            },
        }),
        hasSlot: false,
        props: [{ name: 'separator', type: 'text' }],
        defaultProps: { separator: '/' },
    },
    {
        id: 'popconfirm',
        name: 'Popconfirm',
        component: defineComponent({
            props: ['title', 'type', 'confirmText', 'cancelText'],
            setup(props) {
                return () =>
                    h(SxoPopconfirm, { ...props }, () =>
                        h(SxoButton, { variant: 'outline' }, () => 'Click to Confirm'),
                    );
            },
        }),
        hasSlot: false,
        props: [
            { name: 'title', type: 'text' },
            { name: 'type', type: 'select', options: ['info', 'warning', 'error'] },
            { name: 'confirmText', type: 'text' },
            { name: 'cancelText', type: 'text' },
        ],
        defaultProps: {
            title: 'Are you sure?',
            type: 'warning',
            confirmText: 'Yes',
            cancelText: 'No',
        },
    },
    {
        id: 'tag',
        name: 'Tag',
        component: markRaw(SxoTag),
        hasSlot: true,
        props: [
            { name: 'variant', type: 'select', options: ['solid', 'outline', 'subtle'] },
            {
                name: 'color',
                type: 'select',
                options: ['primary', 'secondary', 'success', 'warning', 'error', 'neutral'],
            },
            { name: 'size', type: 'select', options: ['sm', 'md', 'lg'] },
            { name: 'rounded', type: 'select', options: ['none', 'sm', 'md', 'full'] },
            { name: 'closable', type: 'boolean' },
        ],
        defaultProps: {
            variant: 'subtle',
            color: 'primary',
            size: 'md',
            rounded: 'sm',
            closable: false,
            content: 'Tag Content',
        },
    },
    {
        id: 'avatar',
        name: 'Avatar',
        component: markRaw(SxoAvatar),
        hasSlot: false,
        props: [
            { name: 'src', type: 'text', default: '' },
            { name: 'name', type: 'text', default: '' },
            {
                name: 'size',
                type: 'select',
                options: ['xs', 'sm', 'md', 'lg', 'xl'],
                default: 'md',
            },
            { name: 'shape', type: 'select', options: ['circle', 'square'], default: 'circle' },
        ],
        defaultProps: {
            src: 'https://i.pravatar.cc/150?u=sxo',
            name: 'SXO',
            size: 'md',
            shape: 'circle',
        },
    },
    {
        id: 'switch',
        name: 'Switch',
        component: markRaw(SxoSwitch),
        hasSlot: false,
        props: [
            { name: 'modelValue', type: 'boolean', default: false },
            { name: 'disabled', type: 'boolean', default: false },
            { name: 'size', type: 'select', options: ['sm', 'md', 'lg'], default: 'md' },
        ],
        defaultProps: { modelValue: true, disabled: false, size: 'md' },
    },
    {
        id: 'progress',
        name: 'Progress',
        component: markRaw(SxoProgress),
        hasSlot: false,
        props: [
            { name: 'percent', type: 'number', default: 0 },
            { name: 'variant', type: 'select', options: ['line', 'circle'], default: 'line' },
            {
                name: 'status',
                type: 'select',
                options: ['normal', 'success', 'error', 'warning'],
                default: 'normal',
            },
            { name: 'showInfo', type: 'boolean', default: true },
        ],
        defaultProps: { percent: 70, variant: 'line', status: 'normal', showInfo: true },
    },
    {
        id: 'slider',
        name: 'Slider',
        component: markRaw(SxoSlider),
        hasSlot: false,
        props: [
            { name: 'min', type: 'number', default: 0 },
            { name: 'max', type: 'number', default: 100 },
            { name: 'step', type: 'number', default: 1 },
            { name: 'disabled', type: 'boolean', default: false },
        ],
        defaultProps: { modelValue: 30, min: 0, max: 100, step: 1, disabled: false },
    },
    {
        id: 'rate',
        name: 'Rate',
        component: markRaw(SxoRate),
        hasSlot: false,
        props: [
            { name: 'count', type: 'number', default: 5 },
            { name: 'disabled', type: 'boolean', default: false },
            { name: 'showText', type: 'boolean', default: false },
        ],
        defaultProps: { modelValue: 3, count: 5, disabled: false, showText: true },
    },
    {
        id: 'timeline',
        name: 'Timeline',
        component: defineComponent({
            setup() {
                return () =>
                    h(SxoTimeline, {}, () => [
                        h(SxoTimelineItem, { title: 'Step 1', description: 'Created at 10:00' }),
                        h(SxoTimelineItem, {
                            title: 'Step 2',
                            description: 'In progress',
                            color: '#f59e0b',
                        }),
                        h(SxoTimelineItem, { title: 'Step 3', description: 'Pending' }),
                    ]);
            },
        }),
        hasSlot: false,
        props: [],
        defaultProps: {},
    },
    {
        id: 'result',
        name: 'Result',
        component: markRaw(SxoResult),
        hasSlot: true,
        props: [
            {
                name: 'status',
                type: 'select',
                options: ['success', 'error', 'info', 'warning', '404', '500', '403'],
            },
            { name: 'title', type: 'text' },
            { name: 'subTitle', type: 'text' },
        ],
        defaultProps: {
            status: 'success',
            title: 'Success!',
            subTitle: 'Your action was completed.',
            content: 'Extra content',
        },
    },
    {
        id: 'dropdown',
        name: 'Dropdown',
        component: defineComponent({
            props: ['placement', 'trigger'],
            setup(props) {
                return () =>
                    h(
                        SxoDropdown,
                        { ...props },
                        {
                            default: () => h(SxoButton, { variant: 'outline' }, () => 'Actions'),
                            overlay: () => [
                                h(SxoDropdownItem, { header: 'Options' }),
                                h(SxoDropdownItem, {}, () => 'Profile'),
                                h(SxoDropdownItem, {}, () => 'Settings'),
                                h(SxoDropdownItem, { divider: true }),
                                h(SxoDropdownItem, { class: 'text-error' }, () => 'Logout'),
                            ],
                        },
                    );
            },
        }),
        hasSlot: false,
        props: [
            {
                name: 'placement',
                type: 'select',
                options: ['bottom-left', 'bottom-right', 'top-left', 'top-right'],
            },
            { name: 'trigger', type: 'select', options: ['click', 'hover'] },
        ],
        defaultProps: { placement: 'bottom-left', trigger: 'click' },
    },
    {
        id: 'popover',
        name: 'Popover',
        component: markRaw(SxoPopover),
        hasSlot: false,
        props: [
            { name: 'title', type: 'text' },
            { name: 'content', type: 'text' },
            { name: 'placement', type: 'select', options: ['top', 'bottom', 'left', 'right'] },
            { name: 'trigger', type: 'select', options: ['click', 'hover'] },
        ],
        defaultProps: {
            title: 'Popover Title',
            content: 'This is some information inside the popover.',
            placement: 'top',
            trigger: 'click',
        },
    },
    {
        id: 'upload',
        name: 'Upload',
        component: defineComponent({
            props: ['drag', 'multiple', 'disabled', 'hint'],
            setup(props) {
                const fileList = ref([]);
                return () =>
                    h(
                        SxoUpload,
                        {
                            ...props,
                            fileList: fileList.value,
                            'onUpdate:fileList': (val) => (fileList.value = val),
                        },
                        {
                            default: () =>
                                !props.drag &&
                                h(SxoButton, { variant: 'outline' }, () => 'Click to Upload'),
                        },
                    );
            },
        }),
        hasSlot: false,
        props: [
            { name: 'drag', type: 'boolean' },
            { name: 'multiple', type: 'boolean' },
            { name: 'disabled', type: 'boolean' },
            { name: 'hint', type: 'text' },
        ],
        defaultProps: {
            drag: false,
            multiple: false,
            disabled: false,
            hint: 'Support for a single or bulk upload.',
        },
    },
    {
        id: 'steps',
        name: 'Steps',
        component: defineComponent({
            props: ['current', 'direction'],
            setup(props) {
                return () =>
                    h(SxoSteps, { ...props }, () => [
                        h(SxoStep, { title: 'Step 1', description: 'Details here' }),
                        h(SxoStep, { title: 'Step 2', description: 'Details here' }),
                        h(SxoStep, { title: 'Step 3', description: 'Details here' }),
                    ]);
            },
        }),
        hasSlot: false,
        props: [
            { name: 'current', type: 'number' },
            { name: 'direction', type: 'select', options: ['horizontal', 'vertical'] },
        ],
        defaultProps: { current: 1, direction: 'horizontal' },
    },
    {
        id: 'backtop',
        name: 'BackTop',
        component: defineComponent({
            props: ['visibilityHeight'],
            setup(_props) {
                return () =>
                    h(
                        'div',
                        {
                            class: 'p-4 border border-dashed border-neutral-200 rounded text-center',
                        },
                        [
                            h(
                                'p',
                                'Scroll down in the actual documentation to see BackTop in action.',
                            ),
                            h(
                                'p',
                                { class: 'text-xs text-neutral-400 mt-2' },
                                '(Visibility Height is set to 10 for demo)',
                            ),
                            h(SxoBackTop, { visibilityHeight: 10 }),
                        ],
                    );
            },
        }),
        hasSlot: false,
        props: [{ name: 'visibilityHeight', type: 'number' }],
        defaultProps: { visibilityHeight: 10 },
    },
    {
        id: 'tree',
        name: 'Tree',
        component: defineComponent({
            props: ['modelValue'],
            setup(props) {
                const data = [
                    {
                        id: 1,
                        label: 'Root 1',
                        expanded: true,
                        children: [
                            { id: 2, label: 'Child 1-1' },
                            { id: 3, label: 'Child 1-2' },
                        ],
                    },
                    { id: 4, label: 'Root 2', children: [{ id: 5, label: 'Child 2-1' }] },
                ];
                const selected = ref(props.modelValue);
                return () =>
                    h(SxoTree, {
                        data,
                        modelValue: selected.value,
                        'onUpdate:modelValue': (val) => (selected.value = val),
                    });
            },
        }),
        hasSlot: false,
        props: [],
        defaultProps: { modelValue: 2 },
    },
    {
        id: 'pagination',
        name: 'Pagination',
        component: markRaw(SxoPagination),
        hasSlot: false,
        props: [
            { name: 'total', type: 'number' },
            { name: 'pageSize', type: 'number' },
            { name: 'modelValue', type: 'number' },
            { name: 'size', type: 'select', options: ['sm', 'md', 'lg'] },
            { name: 'variant', type: 'select', options: ['outline', 'ghost', 'solid'] },
            { name: 'showTotal', type: 'boolean' },
            { name: 'showJumper', type: 'boolean' },
        ],
        defaultProps: {
            total: 50,
            pageSize: 10,
            modelValue: 1,
            size: 'md',
            variant: 'outline',
            showTotal: true,
            showJumper: true,
        },
    },
    {
        id: 'skeleton',
        name: 'Skeleton',
        component: markRaw(SxoSkeleton),
        hasSlot: true,
        props: [
            {
                name: 'variant',
                type: 'select',
                options: ['text', 'rect', 'circle', 'avatar', 'image', 'button'],
            },
            { name: 'rows', type: 'number' },
            { name: 'avatar', type: 'boolean' },
            { name: 'animate', type: 'boolean' },
            { name: 'loading', type: 'boolean' },
        ],
        defaultProps: {
            variant: 'rect',
            rows: 0,
            avatar: false,
            animate: true,
            loading: true,
            content: 'Content Loaded!',
        },
    },
    {
        id: 'statistic',
        name: 'Statistic',
        component: markRaw(SxoStatistic),
        hasSlot: false,
        props: [
            { name: 'title', type: 'text' },
            { name: 'value', type: 'text' },
            { name: 'prefix', type: 'text' },
            { name: 'suffix', type: 'text' },
            { name: 'precision', type: 'number' },
        ],
        defaultProps: { title: 'Active Users', value: '112893', precision: 0 },
    },
    {
        id: 'descriptions',
        name: 'Descriptions',
        component: defineComponent({
            props: ['title', 'extra', 'column'],
            setup(props) {
                return () =>
                    h(
                        SxoDescriptions,
                        { title: props.title, extra: props.extra, column: props.column },
                        () => [
                            h(SxoDescriptionsItem, { label: 'User' }, () => 'SXO'),
                            h(SxoDescriptionsItem, { label: 'Telephone' }, () => '18888888888'),
                            h(SxoDescriptionsItem, { label: 'Live' }, () => 'Hangzhou'),
                            h(
                                SxoDescriptionsItem,
                                { label: 'Address' },
                                () => 'No. 88, West Lake Road',
                            ),
                            h(SxoDescriptionsItem, { label: 'Remark' }, () => 'None'),
                        ],
                    );
            },
        }),
        hasSlot: false,
        props: [
            { name: 'title', type: 'text' },
            { name: 'extra', type: 'text' },
            { name: 'column', type: 'number' },
        ],
        defaultProps: { title: 'User Info', extra: 'Edit', column: 3 },
    },
    {
        id: 'calendar',
        name: 'Calendar',
        component: markRaw(SxoCalendar),
        hasSlot: false,
        props: [],
        defaultProps: { modelValue: new Date() },
    },
    {
        id: 'datepicker',
        name: 'DatePicker',
        component: markRaw(SxoDatePicker),
        hasSlot: false,
        props: [
            { name: 'placeholder', type: 'text' },
            { name: 'size', type: 'select', options: ['sm', 'md', 'lg'] },
            { name: 'variant', type: 'select', options: ['outline', 'ghost', 'bottom-line'] },
            { name: 'rounded', type: 'boolean' },
        ],
        defaultProps: { placeholder: 'Select date', size: 'md', variant: 'outline', rounded: true },
    },
    {
        id: 'cascader',
        name: 'Cascader',
        component: markRaw(SxoCascader),
        hasSlot: false,
        props: [
            { name: 'placeholder', type: 'text' },
            { name: 'size', type: 'select', options: ['sm', 'md', 'lg'] },
            { name: 'rounded', type: 'boolean' },
        ],
        defaultProps: {
            placeholder: 'Select area',
            size: 'md',
            rounded: true,
            options: [
                {
                    value: 'zhejiang',
                    label: 'Zhejiang',
                    children: [
                        { value: 'hangzhou', label: 'Hangzhou' },
                        { value: 'ningbo', label: 'Ningbo' },
                    ],
                },
                {
                    value: 'jiangsu',
                    label: 'Jiangsu',
                    children: [{ value: 'nanjing', label: 'Nanjing' }],
                },
            ],
        },
    },
    {
        id: 'transfer',
        name: 'Transfer',
        component: markRaw(SxoTransfer),
        hasSlot: false,
        props: [
            { name: 'searchable', type: 'boolean' },
            { name: 'size', type: 'select', options: ['sm', 'md', 'lg'] },
        ],
        defaultProps: {
            searchable: true,
            size: 'md',
            dataSource: Array.from({ length: 20 }).map((_, i) => ({
                key: i,
                label: `Option ${i + 1}`,
                disabled: i % 6 === 0,
            })),
            modelValue: [1, 3, 5],
        },
    },
    {
        id: 'treeselect',
        name: 'TreeSelect',
        component: markRaw(SxoTreeSelect),
        hasSlot: false,
        props: [
            { name: 'placeholder', type: 'text' },
            { name: 'size', type: 'select', options: ['sm', 'md', 'lg'] },
            { name: 'rounded', type: 'boolean' },
            { name: 'searchable', type: 'boolean' },
        ],
        defaultProps: {
            placeholder: 'Select node',
            size: 'md',
            rounded: true,
            searchable: true,
            options: [
                {
                    key: 'root',
                    label: 'Root Node',
                    children: [
                        {
                            key: 'child1',
                            label: 'Child Node 1',
                            children: [
                                { key: 'grandchild1', label: 'Grandchild 1' },
                                { key: 'grandchild2', label: 'Grandchild 2' },
                            ],
                        },
                        { key: 'child2', label: 'Child Node 2' },
                    ],
                },
            ],
        },
    },
    {
        id: 'mentions',
        name: 'Mentions',
        component: markRaw(SxoMentions),
        hasSlot: false,
        props: [
            { name: 'placeholder', type: 'text' },
            { name: 'prefix', type: 'text' },
            { name: 'size', type: 'select', options: ['sm', 'md', 'lg'] },
        ],
        defaultProps: {
            placeholder: 'Type @ to mention users',
            prefix: '@',
            size: 'md',
            options: [
                { value: 'afc163', label: 'afc163' },
                { value: 'zombieJ', label: 'zombieJ' },
                { value: 'yesmeck', label: 'yesmeck' },
            ],
        },
    },
];
