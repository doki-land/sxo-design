import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { createCvoRouter, CvoProvider, generateRoutesFromPages } from '@cvo/plugin-react';
import { SxoProvider } from '@sxo/react';
import { pages as _cvo_pages } from 'virtual:cvo-pages';
import App from './App';
import 'virtual:sxo.css';
import './index.css';

export async function render(url: string) {
    const { renderToString } = await import('react-dom/server');
    
    const router = createCvoRouter({
        ssr: true,
        initialEntries: [url],
        pages: {},
        routes: [
            {
                path: '/',
                element: <App />,
                children: generateRoutesFromPages(_cvo_pages)
            }
        ]
    });

    const html = renderToString(
        <CvoProvider>
            <SxoProvider>
                <RouterProvider router={router} />
            </SxoProvider>
        </CvoProvider>
    );

    return { html };
}

if (typeof document !== 'undefined') {
    const router = createCvoRouter({
        pages: {},
        routes: [
            {
                path: '/',
                element: <App />,
                children: generateRoutesFromPages(_cvo_pages)
            }
        ]
    });

    const container = document.getElementById('app');
    if (container) {
        if (container.hasChildNodes()) {
            hydrateRoot(
                container,
                <CvoProvider>
                    <SxoProvider>
                        <RouterProvider router={router} />
                    </SxoProvider>
                </CvoProvider>
            );
        } else {
            createRoot(container).render(
                <CvoProvider>
                    <SxoProvider>
                        <RouterProvider router={router} />
                    </SxoProvider>
                </CvoProvider>
            );
        }
    }
}
