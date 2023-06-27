import { defaultTokens } from '@sxo/design';
import { githubTheme } from '@sxo/theme-github';
import { materialTheme } from '@sxo/theme-material';
import { pornhubTheme } from '@sxo/theme-pornhub';
import { antdTheme } from '@sxo/theme-antd';
import { carbonTheme } from '@sxo/theme-carbon';
import { cupertinoTheme } from '@sxo/theme-cupertino';
import { fateTheme } from '@sxo/theme-fate';
import { fluentTheme } from '@sxo/theme-fluent';
import { wechatTheme } from '@sxo/theme-wechat';
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import 'virtual:sxo.css';
import './reset.css'; // Import Global Reset
import {
    Badge,
    Button,
    Card,
    Dialog,
    Icon,
    Input,
    Menu,
    Switch,
    Tab,
    TabList,
    Table,
    TabPanel,
    Tabs,
    Tag,
    ThemeProvider,
    Tooltip,
} from 'react-sxo';

const extendedTokens = {
    ...defaultTokens,
    animation: {
        ...defaultTokens.animation,
        gradient: 'gradient 8s linear infinite',
    },
};

const App = () => {
    const [theme, setTheme] = useState(extendedTokens);
    const [mode, setMode] = useState<'light' | 'dark'>('light');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isSwitchOn, setIsSwitchOn] = useState(false);

    const handleThemeChange = (t: any) => {
        setTheme(t);
    };

    const toggleMode = () => {
        setMode((m) => (m === 'light' ? 'dark' : 'light'));
    };

    const tableColumns = [
        { key: 'name', header: 'Name' },
        { key: 'role', header: 'Role' },
        {
            key: 'status',
            header: 'Status',
            render: (row: any) => (
                <Badge variant={row.status === 'Active' ? 'success' : 'secondary'}>
                    {row.status}
                </Badge>
            ),
        },
    ];

    const tableData = [
        { name: 'John Doe', role: 'Admin', status: 'Active' },
        { name: 'Jane Smith', role: 'User', status: 'Inactive' },
        { name: 'Bob Johnson', role: 'Editor', status: 'Active' },
    ];

    return (
        <ThemeProvider tokens={theme} mode={mode}>
            <div className="min-h-screen bg-neutral-50/50 transition-colors duration-300 font-sans text-text-primary antialiased selection:bg-primary/20 selection:text-primary relative overflow-hidden">
                {/* Ambient Background Effects */}
                <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                    <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-b from-primary/5 to-transparent blur-[120px]" />
                    <div className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-gradient-to-b from-accent/5 to-transparent blur-[120px]" />
                </div>

                {/* Fixed Header */}
                <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-neutral-200/50 bg-background-primary/70 backdrop-blur-xl">
                    <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
                        <div className="flex items-center gap-2.5 font-black text-xl tracking-tighter hover:opacity-80 transition-opacity cursor-pointer">
                            <div className="w-8 h-8 bg-foreground text-background rounded-xl flex items-center justify-center shadow-lg shadow-black/5">
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="text-white"
                                >
                                    <path
                                        d="M12 2L2 7L12 12L22 7L12 2Z"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M2 17L12 22L22 17"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M2 12L12 17L22 12"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                            <span>SXO</span>
                        </div>

                        <div className="flex items-center gap-4">
                            <Menu
                                label="Theme"
                                items={[
                                    {
                                        id: 'default',
                                        label: 'SXO Design',
                                        onClick: () => handleThemeChange(defaultTokens),
                                    },
                                    {
                                        id: 'github',
                                        label: 'GitHub',
                                        onClick: () => handleThemeChange(githubTheme),
                                    },
                                    {
                                        id: 'material',
                                        label: 'Material Design',
                                        onClick: () => handleThemeChange(materialTheme),
                                    },
                                    {
                                        id: 'pornhub',
                                        label: 'PornHub',
                                        onClick: () => handleThemeChange(pornhubTheme),
                                    },
                                    {
                                        id: 'antd',
                                        label: 'Ant Design',
                                        onClick: () => handleThemeChange(antdTheme),
                                    },
                                    {
                                        id: 'carbon',
                                        label: 'Carbon (IBM)',
                                        onClick: () => handleThemeChange(carbonTheme),
                                    },
                                    {
                                        id: 'cupertino',
                                        label: 'Cupertino (Apple)',
                                        onClick: () => handleThemeChange(cupertinoTheme),
                                    },
                                    {
                                        id: 'fate',
                                        label: 'Fate',
                                        onClick: () => handleThemeChange(fateTheme),
                                    },
                                    {
                                        id: 'fluent',
                                        label: 'Fluent Design',
                                        onClick: () => handleThemeChange(fluentTheme),
                                    },
                                    {
                                        id: 'wechat',
                                        label: 'WeChat',
                                        onClick: () => handleThemeChange(wechatTheme),
                                    },
                                ]}
                            />
                            <div className="h-6 w-px bg-neutral-200" />
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={toggleMode}
                                rounded="full"
                                className="w-9 h-9 p-0 flex items-center justify-center hover:bg-neutral-100 transition-colors"
                            >
                                {mode === 'dark' ? '☀️' : '🌙'}
                            </Button>
                        </div>
                    </div>
                </header>

                <main className="relative z-10 pt-40 pb-32 px-6">
                    <div className="max-w-7xl mx-auto space-y-32">
                        {/* Hero Section */}
                        <section className="text-center max-w-4xl mx-auto relative">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-gradient-radial from-primary/5 to-transparent blur-3xl -z-10" />

                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-neutral-200/60 shadow-sm shadow-neutral-100 text-text-secondary text-[11px] font-bold uppercase tracking-widest mb-10 hover:scale-105 transition-transform cursor-default select-none backdrop-blur-sm">
                                <span className="w-2 h-2 rounded-full bg-success shadow-[0_0_12px_rgba(var(--sxo-success),0.6)] animate-pulse" />
                                Production Ready 2.0
                            </div>

                            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8 text-text-primary drop-shadow-sm">
                                Design at the <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary via-primary to-accent animate-gradient bg-size-[200%_auto]">
                                    speed of thought.
                                </span>
                            </h1>

                            <p className="text-xl md:text-2xl text-text-muted font-medium leading-relaxed mb-12 max-w-2xl mx-auto text-balance">
                                The atomic design system for elite interfaces.{' '}
                                <br className="hidden md:block" />
                                <span className="text-text-primary">Zero runtime. Type-safe.</span>{' '}
                                Optimized for the modern web.
                            </p>

                            <div className="flex flex-col sm:flex-row justify-center gap-4 items-center">
                                <Button
                                    size="lg"
                                    rounded="full"
                                    className="h-14 px-8 text-lg shadow-xl shadow-primary/20 hover:shadow-primary/30 hover:-translate-y-1 transition-all duration-300"
                                >
                                    Start Building
                                </Button>
                                <Button
                                    variant="outline"
                                    size="lg"
                                    rounded="full"
                                    className="h-14 px-8 text-lg bg-white/50 backdrop-blur-sm hover:bg-white hover:border-neutral-300 transition-all duration-300"
                                >
                                    Documentation
                                </Button>
                            </div>
                        </section>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                            {[
                                { value: '1.2k+', label: 'Design Tokens', delay: '0' },
                                { value: '0kb', label: 'Runtime CSS', delay: '100' },
                                { value: '100%', label: 'Type Safe', delay: '200' },
                            ].map((stat, i) => (
                                <div key={i} className="group relative">
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <Card
                                        padding="xl"
                                        rounded="3xl"
                                        className="relative h-full text-center border-neutral-200/60 bg-white/60 backdrop-blur-md hover:border-primary/20 hover:shadow-2xl hover:shadow-neutral-200/50 hover:-translate-y-1 transition-all duration-300"
                                    >
                                        <div className="text-5xl font-black mb-3 tracking-tighter bg-gradient-to-br from-text-primary to-text-muted bg-clip-text text-transparent group-hover:from-primary group-hover:to-accent transition-all duration-300">
                                            {stat.value}
                                        </div>
                                        <div className="text-xs font-bold text-text-muted uppercase tracking-widest group-hover:text-text-primary transition-colors">
                                            {stat.label}
                                        </div>
                                    </Card>
                                </div>
                            ))}
                        </div>

                        {/* Component Showcase */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                            {/* Core Interaction */}
                            <Card
                                padding="none"
                                className="lg:col-span-7 overflow-hidden border-neutral-200/60 bg-white shadow-xl shadow-neutral-100/50 rounded-3xl"
                            >
                                <div className="p-8 border-b border-neutral-100 bg-neutral-50/30 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-white border border-neutral-100 flex items-center justify-center shadow-sm text-lg">
                                            👆
                                        </div>
                                        <div>
                                            <h2 className="text-base font-bold text-text-primary">
                                                Interaction
                                            </h2>
                                            <p className="text-xs text-text-muted font-medium">
                                                Core interactive elements
                                            </p>
                                        </div>
                                    </div>
                                    <Badge
                                        variant="secondary"
                                        className="bg-white shadow-sm border-neutral-100"
                                    >
                                        Core
                                    </Badge>
                                </div>

                                <div className="p-8 space-y-10">
                                    <div className="space-y-4">
                                        <div className="text-xs font-bold text-text-muted uppercase tracking-wider pl-1">
                                            Buttons
                                        </div>
                                        <div className="flex flex-wrap items-center gap-4">
                                            <Button
                                                variant="primary"
                                                className="shadow-lg shadow-primary/20"
                                            >
                                                Primary
                                            </Button>
                                            <Button variant="secondary">Secondary</Button>
                                            <Button variant="outline">Outline</Button>
                                            <Button variant="ghost">Ghost</Button>
                                            <Button
                                                variant="accent"
                                                className="shadow-lg shadow-accent/20"
                                            >
                                                Accent
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="text-xs font-bold text-text-muted uppercase tracking-wider pl-1">
                                            Inputs
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <Input
                                                placeholder="email@company.com"
                                                className="bg-neutral-50 border-transparent focus:bg-white focus:border-primary/20 focus:shadow-lg focus:shadow-primary/5 transition-all duration-300"
                                            />
                                            <Input
                                                variant="ghost"
                                                placeholder="Search documentation..."
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            {/* System Status */}
                            <Card
                                padding="none"
                                className="lg:col-span-5 flex flex-col border-neutral-200/60 bg-white shadow-xl shadow-neutral-100/50 rounded-3xl overflow-hidden"
                            >
                                <div className="p-8 border-b border-neutral-100 bg-neutral-50/30 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-white border border-neutral-100 flex items-center justify-center shadow-sm text-lg">
                                            ⚡
                                        </div>
                                        <div>
                                            <h2 className="text-base font-bold text-text-primary">
                                                System Status
                                            </h2>
                                            <p className="text-xs text-text-muted font-medium">
                                                Real-time metrics
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <div className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.4)]" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
                                    </div>
                                </div>

                                <div className="p-8 space-y-8 flex-1">
                                    <div className="flex justify-between items-center group cursor-pointer">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-500">
                                                <svg
                                                    width="14"
                                                    height="14"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                >
                                                    <path d="M12 2v20M2 12h20" />
                                                </svg>
                                            </div>
                                            <span className="text-sm font-medium text-text-muted group-hover:text-text-primary transition-colors">
                                                API Latency
                                            </span>
                                        </div>
                                        <Badge
                                            variant="success"
                                            className="bg-success/10 text-success border-0"
                                        >
                                            24ms
                                        </Badge>
                                    </div>

                                    <div className="flex justify-between items-center group cursor-pointer">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-500">
                                                <svg
                                                    width="14"
                                                    height="14"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                >
                                                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01" />
                                                </svg>
                                            </div>
                                            <span className="text-sm font-medium text-text-muted group-hover:text-text-primary transition-colors">
                                                Error Rate
                                            </span>
                                        </div>
                                        <Badge
                                            variant="secondary"
                                            className="bg-neutral-100 text-neutral-600 border-0"
                                        >
                                            0.01%
                                        </Badge>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-medium text-text-muted">
                                                System Load
                                            </span>
                                            <span className="text-xs font-bold text-primary">
                                                34%
                                            </span>
                                        </div>
                                        <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-primary w-1/3 rounded-full shadow-[0_0_10px_rgba(var(--sxo-color-primary-DEFAULT),0.4)] relative overflow-hidden">
                                                <div className="absolute inset-0 bg-white/20 animate-[pulse_2s_infinite]" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 bg-neutral-50/50 border-t border-neutral-100">
                                    <Button
                                        variant="outline"
                                        className="w-full justify-between group bg-white hover:border-primary/30 hover:text-primary transition-all shadow-sm"
                                    >
                                        View Status Page
                                        <Icon
                                            name="ChevronRight"
                                            size={16}
                                            className="text-text-muted group-hover:text-primary transition-colors"
                                        />
                                    </Button>
                                </div>
                            </Card>

                            {/* Data Grid */}
                            <Card
                                padding="none"
                                rounded="3xl"
                                className="lg:col-span-12 overflow-hidden border-neutral-200/60 bg-white shadow-xl shadow-neutral-100/50"
                            >
                                <div className="p-8 border-b border-neutral-100 bg-neutral-50/30 flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-white border border-neutral-100 flex items-center justify-center shadow-sm text-lg">
                                            🚀
                                        </div>
                                        <div>
                                            <h2 className="text-base font-bold text-text-primary">
                                                Recent Deployments
                                            </h2>
                                            <p className="text-xs text-text-muted font-medium">
                                                Activity log
                                            </p>
                                        </div>
                                    </div>
                                    <Button size="sm" variant="outline" className="bg-white">
                                        View All
                                    </Button>
                                </div>
                                <div className="p-2">
                                    <Table columns={tableColumns} data={tableData} />
                                </div>
                            </Card>
                        </div>
                    </div>
                </main>

                <Dialog
                    isOpen={isDialogOpen}
                    onClose={() => setIsDialogOpen(false)}
                    title="Confirmation"
                    description="Are you sure you want to proceed with this action?"
                    footer={
                        <div className="flex justify-end gap-3 mt-6">
                            <Button variant="ghost" onClick={() => setIsDialogOpen(false)}>
                                Cancel
                            </Button>
                            <Button variant="primary" onClick={() => setIsDialogOpen(false)}>
                                Confirm
                            </Button>
                        </div>
                    }
                >
                    <div className="py-2 text-text-muted text-sm">
                        This action cannot be undone. Please ensure you have backed up your data.
                    </div>
                </Dialog>
            </div>
        </ThemeProvider>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);
