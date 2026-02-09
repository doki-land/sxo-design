import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { SxoProvider } from '@sxo/react';
import App from './App';
import Home from './pages/index';
import DocPage from './pages/[...slug]';
import 'virtual:sxo.css';
import './index.css';

if (typeof document !== 'undefined') {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <App />,
            children: [
                {
                    index: true,
                    element: <Home />
                },
                {
                    path: '*',
                    element: <DocPage />
                }
            ]
        }
    ]);

    const container = document.getElementById('app');
    if (container) {
        createRoot(container).render(
            <SxoProvider>
                <RouterProvider router={router} />
            </SxoProvider>
        );
    }
}
