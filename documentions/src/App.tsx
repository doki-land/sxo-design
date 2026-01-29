import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { SxoBox } from '@sxo/react';
import Sidebar from './components/Sidebar';

const App: React.FC = () => {
    const location = useLocation();
    const isZh = location.pathname.startsWith('/zh-CN');

    return (
        <SxoBox as="div" className="min-h-screen bg-gray-50 flex flex-col">
            <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <Link to={isZh ? "/zh-CN" : "/en-US"} className="flex items-center gap-2">
                            <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
                                SXO
                            </span>
                            <span className="text-sm font-medium text-gray-500 hidden sm:inline-block border-l border-gray-200 pl-3">
                                Design System
                            </span>
                        </Link>

                        <nav className="hidden md:flex items-center gap-6">
                            <Link to="/zh-CN/guide/getting-started" className={`text-sm font-medium ${location.pathname.includes('/guide/') ? 'text-indigo-600' : 'text-gray-600 hover:text-gray-900'}`}>
                                指南
                            </Link>
                            <Link to="/zh-CN/components/button" className={`text-sm font-medium ${location.pathname.includes('/components/') ? 'text-indigo-600' : 'text-gray-600 hover:text-gray-900'}`}>
                                组件
                            </Link>
                            <Link to="/zh-CN/adaptors/vue" className={`text-sm font-medium ${location.pathname.includes('/adaptors/') ? 'text-indigo-600' : 'text-gray-600 hover:text-gray-900'}`}>
                                框架
                            </Link>
                        </nav>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center bg-gray-100 rounded-lg p-1">
                            <Link 
                                to={location.pathname.replace(/^\/(zh-CN|en-US)/, '/zh-CN')}
                                className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${isZh ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                中
                            </Link>
                            <Link 
                                to={location.pathname.replace(/^\/(zh-CN|en-US)/, '/en-US')}
                                className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${!isZh ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                EN
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            <div className="flex-1 max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex gap-12">
                <aside className="hidden lg:block w-64 flex-shrink-0 border-r border-gray-100 py-10">
                    <div className="sticky top-28 h-[calc(100vh-7rem)] overflow-y-auto pr-6 scrollbar-thin">
                        <Sidebar />
                    </div>
                </aside>

                <main className="flex-1 min-w-0 py-10">
                    <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50 p-8 md:p-12 min-h-[600px]">
                        <Outlet />
                    </div>
                </main>
            </div>
        </SxoBox>
    );
};

export default App;
