import {
    getDescriptionClasses,
    getKanbanClasses,
    getLoginClasses,
    getPageHeaderClasses,
    getQueryFilterClasses,
    getShellClasses,
    getStatCardClasses,
    getStepFormClasses,
    type KanbanColumn,
    type KanbanItem,
    type StatCardOptions,
    useShell,
} from '@sxo/component-admin';
import { computed, defineComponent, h, onUnmounted, type PropType, ref, resolveComponent } from 'vue';

export const StatCard = defineComponent({
    name: 'SxoStatCard',
    props: {
        title: { type: String, required: true },
        value: { type: [String, Number], required: true },
        trend: String,
        trendDirection: {
            type: String as PropType<'up' | 'down'>,
            default: 'up',
        },
        variant: {
            type: String as PropType<StatCardOptions['variant']>,
            default: 'bordered',
        },
        color: {
            type: String as PropType<StatCardOptions['color']>,
            default: 'primary',
        },
    },
    setup(props) {
        const styles = getStatCardClasses({
            variant: props.variant,
            color: props.color,
        });

        return () =>
            h('div', { class: styles.container }, [
                h('div', { class: styles.title }, props.title),
                h('div', { class: styles.value }, props.value),
                props.trend
                    ? h(
                          'div',
                          {
                              class: [
                                  styles.trend,
                                  props.trendDirection === 'up' ? 'text-success' : 'text-error',
                              ],
                          },
                          [
                              h('span', props.trendDirection === 'up' ? '↑' : '↓'),
                              h('span', props.trend),
                          ],
                      )
                    : null,
            ]);
    },
});

export const AdminShell = defineComponent({
    name: 'SxoAdminShell',
    props: {
        logo: { type: String, default: 'SXO Admin' },
        theme: {
            type: String as PropType<'dark' | 'light' | 'modern'>,
            default: 'dark',
        },
        menuItems: {
            type: Array as PropType<
                {
                    id: string;
                    label: string;
                    icon?: string;
                    active?: boolean;
                    to?: string | object;
                }[]
            >,
            default: () => [],
        },
    },
    setup(props, { slots }) {
        const shell = useShell();
        const isCollapsed = ref(shell.isCollapsed);
        const styles = computed(() => getShellClasses({ theme: props.theme }));
        const RouterLink = resolveComponent('router-link');

        const unsubscribe = shell.subscribe((collapsed: boolean) => {
            isCollapsed.value = collapsed;
        });

        onUnmounted(unsubscribe);

        return () =>
            h('div', { 
                class: styles.value.layout,
                onMousedown: (e) => {
                    // 阻止布局层面的意外干扰
                    if (e.target === e.currentTarget) {
                        console.log('Layout mousedown');
                    }
                }
            }, [
                // Sidebar
                h(
                    'aside',
                    {
                        class: [
                            styles.value.sidebar,
                            isCollapsed.value ? styles.value.sidebarCollapsed : '',
                        ],
                        // 确保侧边栏不会因为点击被折叠或拦截
                        onClick: (e) => e.stopPropagation(),
                    },
                    [
                        h('div', { class: styles.value.sidebarHeader }, [
                            slots.logo
                                ? slots.logo()
                                : h('span', { class: 'text-lg font-bold' }, props.logo),
                        ]),
                        h('nav', { class: styles.value.sidebarContent }, [
                            props.menuItems.map((item) => {
                                const tag = item.to ? RouterLink : 'div'; // 改为 div 避免 a 标签默认行为
                                return h(
                                    tag as any,
                                    {
                                        key: item.id,
                                        to: item.to,
                                        class: [
                                            styles.value.navItem,
                                            item.active ? styles.value.navItemActive : '',
                                            'cursor-pointer select-none', // 强制手型和不可选中
                                        ],
                                        onClick: (e: MouseEvent) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            console.log('Sidebar item clicked:', item.id);
                                            (item as any).onClick?.();
                                        },
                                    },
                                    [
                                        item.icon ? h('span', { class: 'w-5' }, item.icon) : null,
                                        h('span', item.label),
                                    ],
                                );
                            }),
                        ]),
                        h('div', { class: styles.value.sidebarFooter }, slots.sidebarFooter?.()),
                    ],
                ),

                // Main Area
                h('div', { class: styles.value.main }, [
                    h('header', { class: styles.value.header }, [
                        h(
                            'button',
                            {
                                class: 'p-2 hover:bg-neutral-100 rounded-md lg:hidden',
                                onClick: (e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    shell.toggle();
                                },
                            },
                            '☰',
                        ),
                        h('div', { class: 'flex-1' }, slots.headerContent?.()),
                        h('div', { class: 'flex items-center gap-4' }, slots.headerActions?.()),
                    ]),
                    h('main', { class: styles.value.content }, slots.default?.()),
                ]),
            ]);
    },
});

export const LoginScreen = defineComponent({
    name: 'SxoLoginScreen',
    props: {
        title: { type: String, default: 'Welcome Back' },
        subtitle: { type: String, default: 'Please enter your details to sign in.' },
        variant: {
            type: String as PropType<'centered' | 'split'>,
            default: 'centered',
        },
    },
    emits: ['submit'],
    setup(props, { slots }) {
        const styles = getLoginClasses(props.variant);

        const renderCard = () =>
            h('div', { class: styles.card }, [
                h('h1', { class: styles.title }, props.title),
                h('p', { class: styles.subtitle }, props.subtitle),
                h('div', { class: styles.form }, slots.default?.()),
                h('div', { class: styles.footer }, slots.footer?.()),
            ]);

        return () => {
            if (props.variant === 'split') {
                return h('div', { class: styles.container }, [
                    h('div', { class: (styles as any).left }, [
                        (slots.visual ? slots.visual() : h('h2', 'SXO Admin')) as any,
                    ]),
                    h('div', { class: (styles as any).right }, [renderCard()]),
                ]);
            }
            return h('div', { class: styles.container }, [renderCard()]);
        };
    },
});

export const PageHeader = defineComponent({
    name: 'SxoPageHeader',
    props: {
        title: String,
        subtitle: String,
        breadcrumb: {
            type: Array as PropType<{ label: string; link?: string }[]>,
            default: () => [],
        },
    },
    setup(props, { slots }) {
        const styles = getPageHeaderClasses();

        return () =>
            h('header', { class: styles.container }, [
                props.breadcrumb.length > 0
                    ? h(
                          'nav',
                          { class: styles.breadcrumb },
                          props.breadcrumb.map((item, i) => [
                              i > 0 ? h('span', '/') : null,
                              h('span', item.label),
                          ]),
                      )
                    : null,
                h('div', { class: styles.heading }, [
                    h('div', { class: styles.left }, [
                        h('h1', { class: styles.title }, (props.title || slots.title?.()) as any),
                        (props.subtitle || slots.subtitle) &&
                            h(
                                'span',
                                { class: styles.subtitle },
                                (props.subtitle || slots.subtitle?.()) as any,
                            ),
                    ]),
                    h('div', { class: styles.extra }, slots.extra?.() as any),
                ]),
                slots.footer ? h('div', { class: styles.footer }, slots.footer() as any) : null,
            ]);
    },
});

export const QueryFilter = defineComponent({
    name: 'SxoQueryFilter',
    emits: ['search', 'reset'],
    setup(_props, { slots, emit }) {
        const styles = getQueryFilterClasses();

        return () =>
            h('div', { class: styles.container }, [
                h('div', { class: styles.grid }, slots.default?.()),
                h('div', { class: styles.actions }, [
                    h(
                        'button',
                        {
                            class: 'px-4 py-2 border rounded-md hover:bg-neutral-50',
                            onClick: () => emit('reset'),
                        },
                        'Reset',
                    ),
                    h(
                        'button',
                        {
                            class: 'px-4 py-2 bg-primary text-white rounded-md hover:opacity-90',
                            onClick: () => emit('search'),
                        },
                        'Search',
                    ),
                ]),
            ]);
    },
});

export const StepForm = defineComponent({
    name: 'SxoStepForm',
    props: {
        steps: {
            type: Array as PropType<{ title: string; description?: string }[]>,
            required: true,
        },
        current: {
            type: Number,
            default: 0,
        },
    },
    emits: ['update:current', 'submit'],
    setup(props, { slots, emit }) {
        const styles = getStepFormClasses();

        const renderSteps = () =>
            h('div', { class: styles.steps }, [
                h('div', { class: styles.stepLine }),
                props.steps.map((step, i) => {
                    const isCompleted = i < props.current;
                    const isActive = i === props.current;
                    return h('div', { class: styles.stepItem, key: i }, [
                        h(
                            'div',
                            {
                                class: [
                                    styles.stepCircle,
                                    isCompleted
                                        ? styles.stepCompleted
                                        : isActive
                                          ? styles.stepActive
                                          : styles.stepPending,
                                ],
                            },
                            isCompleted ? '✓' : i + 1,
                        ),
                        h('span', { class: styles.stepTitle }, step.title),
                    ]);
                }),
            ]);

        return () =>
            h('div', { class: styles.container }, [
                renderSteps(),
                h('div', { class: styles.content }, slots.default?.()),
                h('div', { class: styles.footer }, [
                    props.current > 0 &&
                        h(
                            'button',
                            {
                                class: 'px-6 py-2 border rounded-md hover:bg-neutral-50',
                                onClick: () => emit('update:current', props.current - 1),
                            },
                            'Previous',
                        ),
                    props.current < props.steps.length - 1 &&
                        h(
                            'button',
                            {
                                class: 'px-6 py-2 bg-primary text-white rounded-md hover:opacity-90',
                                onClick: () => emit('update:current', props.current + 1),
                            },
                            'Next Step',
                        ),
                    props.current === props.steps.length - 1 &&
                        h(
                            'button',
                            {
                                class: 'px-6 py-2 bg-success text-white rounded-md hover:opacity-90',
                                onClick: () => emit('submit'),
                            },
                            'Submit',
                        ),
                ]),
            ]);
    },
});

export const Kanban = defineComponent({
    name: 'SxoKanban',
    props: {
        columns: {
            type: Array as PropType<KanbanColumn[]>,
            required: true,
        },
    },
    emits: ['item-click', 'column-action'],
    setup(props, { slots, emit }) {
        const styles = getKanbanClasses();

        return () =>
            h('div', { class: styles.board }, [
                props.columns.map((col) =>
                    h('div', { class: styles.column, key: col.id }, [
                        h('div', { class: styles.columnHeader }, [
                            h('div', { class: styles.columnTitle }, [
                                col.title,
                                h('span', { class: styles.columnBadge }, col.items.length),
                            ]),
                            slots.columnAction?.({ column: col }),
                        ]),
                        h('div', { class: styles.itemList }, [
                            col.items.map((item: KanbanItem) =>
                                h(
                                    'div',
                                    {
                                        class: styles.item,
                                        key: item.id,
                                        onClick: () => emit('item-click', { item, column: col }),
                                    },
                                    [
                                        h('div', { class: styles.itemTitle }, item.title),
                                        item.description &&
                                            h('div', { class: styles.itemDesc }, item.description),
                                        h('div', { class: styles.itemFooter }, [
                                            h('div', { class: styles.avatarGroup }, [
                                                // Mock avatar
                                                h('div', {
                                                    class: 'w-6 h-6 rounded-full bg-neutral-200 border-2 border-white',
                                                }),
                                            ]),
                                            item.tags &&
                                                h(
                                                    'div',
                                                    { class: 'flex gap-1' },
                                                    item.tags.map((t: string) =>
                                                        h(
                                                            'span',
                                                            {
                                                                class: 'text-[10px] px-1.5 py-0.5 rounded bg-neutral-100',
                                                            },
                                                            t,
                                                        ),
                                                    ),
                                                ),
                                        ]),
                                    ],
                                ),
                            ),
                        ]),
                    ]),
                ),
            ]);
    },
});

export const DescriptionList = defineComponent({
    name: 'SxoDescriptionList',
    props: {
        title: String,
        items: {
            type: Array as PropType<{ label: string; content: any }[]>,
            required: true,
        },
    },
    setup(props, { slots }) {
        const styles = getDescriptionClasses();

        return () =>
            h('div', { class: styles.container }, [
                props.title || slots.title
                    ? h('div', { class: styles.header }, [
                          h('h3', { class: styles.title }, props.title || slots.title?.()),
                          slots.action?.(),
                      ])
                    : null,
                h(
                    'div',
                    { class: styles.grid },
                    props.items.map((item) =>
                        h('div', { class: styles.item }, [
                            h('span', { class: styles.label }, item.label),
                            h('span', { class: styles.content }, item.content),
                        ]),
                    ),
                ),
            ]);
    },
});
