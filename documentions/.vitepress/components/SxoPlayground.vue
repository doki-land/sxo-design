<template>
  <SxoI18nProvider :locale="currentLocale" :messages="i18nMessages">
    <SxoToastProvider>
      <div class="playground-root" :class="{ dark: isDark }" :style="containerStyle">
        <!-- Sidebar: Component List -->
        <aside class="playground-sidebar">
          <div class="sidebar-header">
            <span class="logo">SXO Lab</span>
            <SxoBadge variant="outline" size="xs">Alpha</SxoBadge>
          </div>
          <nav class="component-nav">
            <button 
              v-for="c in availableComponents" 
              :key="c.id"
              @click="selectedComponentId = c.id"
              :class="{ active: selectedComponentId === c.id }"
            >
              {{ c.name }}
            </button>
          </nav>
        </aside>

        <!-- Main Content -->
        <main class="playground-main">
          <!-- Top Bar -->
          <header class="playground-header">
            <div class="flex items-center gap-4">
              <SxoSelect v-model="currentThemeName" size="sm" class="w-40">
                <SxoSelectOption value="default">Default (BW)</SxoSelectOption>
                <SxoSelectOption value="github">GitHub</SxoSelectOption>
                <SxoSelectOption value="material">Material (M3)</SxoSelectOption>
                <SxoSelectOption value="fate">Fate (纠缠之缘)</SxoSelectOption>
                <SxoSelectOption value="antd">Ant Design</SxoSelectOption>
                <SxoSelectOption value="carbon">IBM Carbon</SxoSelectOption>
                <SxoSelectOption value="cupertino">iOS Cupertino</SxoSelectOption>
                <SxoSelectOption value="fluent">MS Fluent</SxoSelectOption>
              </SxoSelect>
              
              <SxoSelect v-model="currentLocale" size="sm" class="w-32">
                <SxoSelectOption value="en">English</SxoSelectOption>
                <SxoSelectOption value="zh">简体中文</SxoSelectOption>
              </SxoSelect>
            </div>

            <div class="flex items-center gap-2">
              <SxoButton size="sm" variant="ghost" @click="isDark = !isDark">
                {{ isDark ? '🌙' : '☀️' }}
              </SxoButton>
              <SxoButton size="sm" variant="ghost" @click="isCommandPaletteOpen = true">⌨️</SxoButton>
              <div class="h-4 w-[1px] bg-neutral-200 mx-2"></div>
              <SxoBadge variant="primary" size="sm">{{ activeFrameworkName }}</SxoBadge>
            </div>
          </header>

          <!-- Workspace -->
          <div class="playground-workspace">
            <!-- Preview Area -->
            <div class="preview-section">
              <div class="preview-canvas" :class="{ 'bg-checkered': !isDark }">
                <div class="component-wrapper">
                  <component 
                    :is="currentComponent.component" 
                    v-bind="componentProps"
                    @click="handleComponentClick"
                  >
                    <template v-if="currentComponent.hasSlot">
                      {{ componentProps.content || 'Sample Content' }}
                    </template>
                  </component>
                </div>
              </div>
              
              <!-- Code Section -->
              <div class="code-section">
                <div class="code-header">
                  <span>Usage ({{ activeFrameworkName }})</span>
                  <SxoButton size="xs" variant="ghost" @click="copyCode">Copy</SxoButton>
                </div>
                <pre class="code-display"><code>{{ generatedCode }}</code></pre>
              </div>
            </div>

            <!-- Inspector Panel -->
            <aside class="inspector-panel">
              <div class="panel-section">
                <h3>Properties</h3>
                <div class="prop-list">
                  <div v-for="prop in currentComponent.props" :key="prop.name" class="prop-item">
                    <label>{{ prop.name }}</label>
                    
                    <SxoSelect v-if="prop.type === 'select'" v-model="componentProps[prop.name]" size="xs">
                      <SxoSelectOption v-for="opt in prop.options" :key="opt" :value="opt">{{ opt }}</SxoSelectOption>
                    </SxoSelect>

                    <SxoSwitch v-else-if="prop.type === 'boolean'" v-model="componentProps[prop.name]" />

                    <SxoInput v-else v-model="componentProps[prop.name]" size="xs" />
                  </div>
                </div>
              </div>

              <div class="panel-section mt-auto">
                <SxoButton variant="outline" size="sm" block @click="resetProps">Reset Props</SxoButton>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </SxoToastProvider>

    <SxoCommandPalette 
      :is-open="isCommandPaletteOpen" 
      :commands="playgroundCommands"
      @close="isCommandPaletteOpen = false"
    />
  </SxoI18nProvider>
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
import { computed, onMounted, ref, watch, reactive, markRaw } from 'vue';
import { currentFramework, frameworks } from '../theme/framework-state';
import {
    Badge as SxoBadge,
    Button as SxoButton,
    Input as SxoInput,
    Menu as SxoMenu,
    Switch as SxoSwitch,
    Tab as SxoTab,
    TabList as SxoTabList,
    Table as SxoTable,
    TabPanel as SxoTabPanel,
    Tabs as SxoTabs,
    Tooltip as SxoTooltip,
    ToastProvider as SxoToastProvider,
    useToast as useSxoToast,
    Dialog as SxoDialog,
    Form as SxoForm,
    FormItem as SxoFormItem,
    I18nProvider as SxoI18nProvider,
    useI18n as useSxoI18n,
    Spinner as SxoSpinner,
    Progress as SxoProgress,
    Skeleton as SxoSkeleton,
    VirtualList as SxoVirtualList,
    CommandPalette as SxoCommandPalette,
    StatCard as SxoStatCard,
    Kanban as SxoKanban,
    DescriptionList as SxoDescriptionList,
    AdminShell as SxoAdminShell,
    PageHeader as SxoPageHeader,
    Result as SxoResult,
    Select as SxoSelect,
    SelectOption as SxoSelectOption,
    Avatar as SxoAvatar,
    Search as SxoSearch,
    Alert as SxoAlert,
    Drawer as SxoDrawer,
    Empty as SxoEmpty,
    Divider as SxoDivider,
    Breadcrumb as SxoBreadcrumb,
    BreadcrumbItem as SxoBreadcrumbItem,
    Popconfirm as SxoPopconfirm,
    Timeline as SxoTimeline,
    TimelineItem as SxoTimelineItem,
    Dropdown as SxoDropdown,
    DropdownItem as SxoDropdownItem,
    Popover as SxoPopover,
    Slider as SxoSlider,
    Upload as SxoUpload,
    Steps as SxoSteps,
    Step as SxoStep,
    Rate as SxoRate,
    BackTop as SxoBackTop,
    Tree as SxoTree,
    Statistic as SxoStatistic,
    Descriptions as SxoDescriptions,
    DescriptionsItem as SxoDescriptionsItem,
    Calendar as SxoCalendar,
    DatePicker as SxoDatePicker,
    Cascader as SxoCascader,
    Transfer as SxoTransfer,
    TreeSelect as SxoTreeSelect,
    Mentions as SxoMentions,
} from 'vue-sxo';

const currentThemeName = ref('default');
const isDark = ref(false);
const isCommandPaletteOpen = ref(false);
const currentLocale = ref('en');
const selectedComponentId = ref('button');

const { success, info } = useSxoToast();

// Component Definitions for the Lab
const availableComponents = [
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
            },
            { name: 'size', type: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
            { name: 'disabled', type: 'boolean' },
            { name: 'content', type: 'text' },
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
            },
            { name: 'size', type: 'select', options: ['xs', 'sm', 'md'] },
            { name: 'content', type: 'text' },
        ],
        defaultProps: { variant: 'primary', size: 'sm', content: 'New' },
    },
    {
        id: 'input',
        name: 'Input',
        component: markRaw(SxoInput),
        hasSlot: false,
        props: [
            { name: 'placeholder', type: 'text' },
            { name: 'size', type: 'select', options: ['sm', 'md', 'lg'] },
            { name: 'disabled', type: 'boolean' },
            { name: 'type', type: 'select', options: ['text', 'password', 'email', 'number'] },
        ],
        defaultProps: { placeholder: 'Type here...', size: 'md', disabled: false, type: 'text' },
    },
    {
        id: 'avatar',
        name: 'Avatar',
        component: markRaw(SxoAvatar),
        hasSlot: false,
        props: [
            { name: 'src', type: 'text' },
            { name: 'alt', type: 'text' },
            { name: 'size', type: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
            { name: 'fallback', type: 'text' },
        ],
        defaultProps: {
            src: 'https://avatars.githubusercontent.com/u/1?v=4',
            size: 'lg',
            fallback: 'U',
        },
    },
    {
        id: 'switch',
        name: 'Switch',
        component: markRaw(SxoSwitch),
        hasSlot: false,
        props: [
            { name: 'modelValue', type: 'boolean' },
            { name: 'disabled', type: 'boolean' },
            { name: 'size', type: 'select', options: ['sm', 'md'] },
        ],
        defaultProps: { modelValue: true, disabled: false, size: 'md' },
    },
    {
        id: 'stat-card',
        name: 'StatCard',
        component: markRaw(SxoStatCard),
        hasSlot: false,
        props: [
            { name: 'title', type: 'text' },
            { name: 'value', type: 'text' },
            { name: 'trend', type: 'text' },
            { name: 'trendDirection', type: 'select', options: ['up', 'down', 'neutral'] },
            { name: 'variant', type: 'select', options: ['outline', 'solid', 'ghost'] },
            {
                name: 'color',
                type: 'select',
                options: ['primary', 'secondary', 'success', 'warning', 'error'],
            },
        ],
        defaultProps: {
            title: 'Total Users',
            value: '12,450',
            trend: '+12%',
            trendDirection: 'up',
            variant: 'outline',
            color: 'primary',
        },
    },
    {
        id: 'search',
        name: 'Search',
        component: markRaw(SxoSearch),
        hasSlot: false,
        props: [
            { name: 'placeholder', type: 'text' },
            { name: 'variant', type: 'select', options: ['outline', 'ghost', 'bottom-line'] },
            { name: 'size', type: 'select', options: ['sm', 'md', 'lg'] },
            { name: 'rounded', type: 'boolean' },
        ],
        defaultProps: { placeholder: 'Search...', variant: 'outline', size: 'md', rounded: true },
    },
    {
        id: 'alert',
        name: 'Alert',
        component: markRaw(SxoAlert),
        hasSlot: true,
        props: [
            { name: 'type', type: 'select', options: ['info', 'success', 'warning', 'error'] },
            { name: 'variant', type: 'select', options: ['subtle', 'solid', 'outline'] },
            { name: 'title', type: 'text' },
            { name: 'description', type: 'text' },
            { name: 'closable', type: 'boolean' },
            { name: 'showIcon', type: 'boolean' },
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
        id: 'slider',
        name: 'Slider',
        component: markRaw(SxoSlider),
        hasSlot: false,
        props: [
            { name: 'min', type: 'number' },
            { name: 'max', type: 'number' },
            { name: 'step', type: 'number' },
            { name: 'disabled', type: 'boolean' },
        ],
        defaultProps: { modelValue: 30, min: 0, max: 100, step: 1, disabled: false },
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
        id: 'rate',
        name: 'Rate',
        component: markRaw(SxoRate),
        hasSlot: false,
        props: [
            { name: 'count', type: 'number' },
            { name: 'disabled', type: 'boolean' },
            { name: 'showText', type: 'boolean' },
        ],
        defaultProps: {
            modelValue: 3,
            count: 5,
            disabled: false,
            showText: true,
            texts: ['Bad', 'Disappointed', 'Normal', 'Satisfied', 'Great'],
        },
    },
    {
        id: 'backtop',
        name: 'BackTop',
        component: defineComponent({
            props: ['visibilityHeight'],
            setup(props) {
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
            setup(props, { emit }) {
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
    {
        id: 'skeleton',
        name: 'Skeleton',
        component: markRaw(SxoSkeleton),
        hasSlot: false,
        props: [
            { name: 'loading', type: 'boolean' },
            { name: 'active', type: 'boolean' },
            { name: 'avatar', type: 'boolean' },
            { name: 'title', type: 'boolean' },
            { name: 'rows', type: 'number' },
        ],
        defaultProps: {
            loading: true,
            active: true,
            avatar: true,
            title: true,
            rows: 4,
        },
    },
];

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

const activeFrameworkName = computed(
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

const copyCode = () => {
    navigator.clipboard.writeText(generatedCode.value);
    success('Code copied to clipboard');
};

const handleComponentClick = () => info(`${currentComponent.value.name} Clicked!`);

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

const containerStyle = computed(() => {
    const vars = engine.value.generateTokenCssVars();
    // This is a bit of a hack for VitePress component preview,
    // normally this is handled by the ThemeProvider/Plugin
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

const i18nMessages = {
    en: { submit: 'Submit', cancel: 'Cancel' },
    zh: { submit: '提交', cancel: '取消' },
};

const playgroundCommands = [
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
  height: 800px;
  background: var(--sxo-color-background-primary);
  color: var(--sxo-color-neutral-900);
  border: 1px solid var(--sxo-color-neutral-200);
  border-radius: 12px;
  overflow: hidden;
  font-family: var(--sxo-typography-fontFamily-sans);
}

.playground-sidebar {
  width: 240px;
  border-right: 1px solid var(--sxo-color-neutral-200);
  display: flex;
  flex-direction: column;
  background: var(--sxo-color-background-secondary);
}

.sidebar-header {
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-bottom: 1px solid var(--sxo-color-neutral-200);
}

.logo {
  font-weight: 800;
  font-size: 1.1rem;
  letter-spacing: -0.02em;
}

.component-nav {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.component-nav button {
  text-align: left;
  padding: 0.6rem 1rem;
  border-radius: 6px;
  font-size: 0.9rem;
  transition: all 0.2s;
  color: var(--sxo-color-neutral-600);
}

.component-nav button:hover {
  background: var(--sxo-color-neutral-100);
  color: var(--sxo-color-neutral-900);
}

.component-nav button.active {
  background: var(--sxo-color-primary-DEFAULT);
  color: white;
  font-weight: 600;
}

.playground-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.playground-header {
  height: 64px;
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--sxo-color-neutral-200);
  background: white;
}

.dark .playground-header {
  background: var(--sxo-color-background-primary);
}

.playground-workspace {
  flex: 1;
  display: flex;
  min-height: 0;
}

.preview-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: var(--sxo-color-neutral-50);
}

.preview-canvas {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem;
  overflow: auto;
}

.bg-checkered {
  background-image: radial-gradient(var(--sxo-color-neutral-200) 1px, transparent 0);
  background-size: 24px 24px;
}

.component-wrapper {
  background: white;
  padding: 3rem;
  border-radius: 16px;
  box-shadow: var(--sxo-boxShadow-lg);
  min-width: 200px;
  display: flex;
  justify-content: center;
}

.dark .component-wrapper {
  background: var(--sxo-color-background-secondary);
}

.code-section {
  height: 200px;
  border-top: 1px solid var(--sxo-color-neutral-200);
  background: var(--sxo-color-neutral-900);
  color: white;
  display: flex;
  flex-direction: column;
}

.code-header {
  padding: 0.5rem 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--sxo-color-neutral-400);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(0,0,0,0.2);
}

.code-display {
  flex: 1;
  margin: 0;
  padding: 1rem;
  font-family: var(--sxo-typography-fontFamily-mono);
  font-size: 0.85rem;
  overflow: auto;
}

.inspector-panel {
  width: 300px;
  border-left: 1px solid var(--sxo-color-neutral-200);
  background: white;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
}

.dark .inspector-panel {
  background: var(--sxo-color-background-primary);
}

.panel-section h3 {
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  color: var(--sxo-color-neutral-400);
  margin-bottom: 1rem;
  letter-spacing: 0.05em;
}

.prop-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.prop-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.prop-item label {
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--sxo-color-neutral-600);
}
</style>

