import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { SxoBox } from '@sxo/react';

const App: React.FC = () => {
    return (
        <SxoBox as="div" className="min-h-screen bg-gray-50 flex flex-col">
            <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <Link to="/" className="text-xl font-bold text-indigo-600">
                        SXO Design System
                    </Link>
                </div>
            </header>

            <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex gap-8">
                <aside className="hidden lg:block w-64 flex-shrink-0">
                    <nav className="sticky top-24 space-y-1">
                        <Link to="/zh-CN/guide/getting-started" className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100">
                            快速开始
                        </Link>
                        <Link to="/zh-CN/components/button" className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100">
                            按钮 Button
                        </Link>
                    </nav>
                </aside>

                <main className="flex-1 min-w-0 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                    <Outlet />
                </main>
            </div>
        </SxoBox>
    );
};

export default App;
