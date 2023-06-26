import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import {
  ThemeProvider,
  Button,
  Input,
  Badge,
  Tag,
  Card,
  Dialog,
  Switch,
  Menu,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  Tooltip,
  Table,
} from 'react-sxo';
import { defaultTokens } from '@sxo/design';
import { githubTheme } from '@sxo/theme-github';
import { materialTheme } from '@sxo/theme-material';
import { pornhubTheme } from '@sxo/theme-pornhub';

const App = () => {
  const [theme, setTheme] = useState(defaultTokens);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const tableColumns = [
    { key: 'name', header: 'Name' },
    { key: 'role', header: 'Role' },
    {
      key: 'status',
      header: 'Status',
      render: (row: any) => (
        <Badge variant={row.status === 'Active' ? 'success' : 'secondary'}>{row.status}</Badge>
      ),
    },
  ];

  const tableData = [
    { name: 'John Doe', role: 'Admin', status: 'Active' },
    { name: 'Jane Smith', role: 'User', status: 'Inactive' },
    { name: 'Bob Johnson', role: 'Editor', status: 'Active' },
  ];

  return (
    <ThemeProvider tokens={theme}>
      <div className="p-8 min-h-screen bg-background-primary transition-colors duration-300">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-black tracking-tighter uppercase mb-2">
              SXO Design System
            </h1>
            <p className="text-neutral-500 font-medium">
              High-end black-white atomic design system.
            </p>
          </div>

          <div className="flex gap-2 bg-neutral-100 p-1 rounded-lg">
            <Button
              size="sm"
              variant={theme === defaultTokens ? 'primary' : 'ghost'}
              onClick={() => setTheme(defaultTokens)}
            >
              BW
            </Button>
            <Button
              size="sm"
              variant={theme === githubTheme ? 'primary' : 'ghost'}
              onClick={() => setTheme(githubTheme)}
            >
              GitHub
            </Button>
            <Button
              size="sm"
              variant={theme === materialTheme ? 'primary' : 'ghost'}
              onClick={() => setTheme(materialTheme)}
            >
              Material
            </Button>
            <Button
              size="sm"
              variant={theme === pornhubTheme ? 'primary' : 'ghost'}
              onClick={() => setTheme(pornhubTheme)}
            >
              PornHub
            </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Component Section: Buttons & Inputs */}
          <Card padding="lg" className="space-y-8">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest text-neutral-400 mb-4">
                Buttons
              </h2>
              <div className="flex flex-wrap gap-4">
                <Button>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="accent">Accent</Button>
              </div>
            </div>

            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest text-neutral-400 mb-4">
                Inputs
              </h2>
              <div className="grid gap-4">
                <Input placeholder="Enter something..." />
                <Input variant="filled" placeholder="Search..." />
                <Input invalid placeholder="Invalid state" />
              </div>
            </div>

            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest text-neutral-400 mb-4">
                Switch & Menu
              </h2>
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-3">
                  <Switch checked={isSwitchOn} onChange={setIsSwitchOn} />
                  <span className="text-sm font-medium">{isSwitchOn ? 'On' : 'Off'}</span>
                </div>
                <Menu
                  label="Options"
                  items={[
                    { id: '1', label: 'Profile', onClick: () => console.log('Profile') },
                    { id: '2', label: 'Settings', onClick: () => console.log('Settings') },
                    { id: '3', label: 'Logout', onClick: () => console.log('Logout') },
                  ]}
                />
              </div>
            </div>
          </Card>

          {/* Component Section: Feedback & Overlays */}
          <Card padding="lg" className="space-y-8">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest text-neutral-400 mb-4">
                Badges & Tags
              </h2>
              <div className="flex flex-wrap gap-3 mb-4">
                <Badge>Default</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="error">Error</Badge>
                <Badge variant="warning">Warning</Badge>
              </div>
              <div className="flex flex-wrap gap-2">
                <Tag>Design</Tag>
                <Tag color="accent">Development</Tag>
                <Tag variant="outline">Marketing</Tag>
              </div>
            </div>

            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest text-neutral-400 mb-4">
                Dialog & Tooltip
              </h2>
              <div className="flex gap-4">
                <Button onClick={() => setIsDialogOpen(true)}>Open Dialog</Button>
                <Tooltip content="This is a helpful tooltip">
                  <Button variant="outline">Hover me</Button>
                </Tooltip>
              </div>
              <Dialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                title="SXO Dialog"
                description="This dialog is powered by headless logic and atomic CSS."
                footer={
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" onClick={() => setIsDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setIsDialogOpen(false)}>Confirm</Button>
                  </div>
                }
              >
                <p className="text-neutral-600">
                  The content of the dialog can be anything. It supports multiple themes and
                  transitions.
                </p>
              </Dialog>
            </div>
          </Card>

          {/* Data Display Section */}
          <Card padding="lg" className="md:col-span-2 space-y-8">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest text-neutral-400 mb-4">
                Tabs
              </h2>
              <Tabs defaultValue="tab1">
                <TabList>
                  <Tab value="tab1">User Data</Tab>
                  <Tab value="tab2">Settings</Tab>
                  <Tab value="tab3">Activity</Tab>
                </TabList>
                <div className="mt-6">
                  <TabPanel value="tab1">
                    <Table columns={tableColumns} data={tableData} />
                  </TabPanel>
                  <TabPanel value="tab2">
                    <div className="p-4 text-neutral-500 border border-dashed border-neutral-200 rounded">
                      Settings configuration would go here.
                    </div>
                  </TabPanel>
                  <TabPanel value="tab3">
                    <div className="p-4 text-neutral-500 border border-dashed border-neutral-200 rounded">
                      Recent activity logs.
                    </div>
                  </TabPanel>
                </div>
              </Tabs>
            </div>
          </Card>
        </div>

        <footer className="mt-12 pt-8 border-t border-neutral-100 flex justify-between items-center text-neutral-400 text-xs uppercase tracking-widest">
          <span>&copy; 2026 SXO Framework</span>
          <span>Experimental Build v0.0.1</span>
        </footer>
      </div>
    </ThemeProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
