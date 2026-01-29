import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { createCvoRouter, CvoProvider } from '@cvo/plugin-react';
import App from './App';

// Auto-discover pages
const pages = import.meta.glob('./pages/**/*.tsx', { eager: true });

export async function render(url: string) {
    const { renderToString } = await import('react-dom/server');
    
    const router = createCvoRouter({
        pages,
        ssr: true,
        initialEntries: [url]
    });

    const html = renderToString(
        <CvoProvider>
            <RouterProvider router={router} />
        </CvoProvider>
    );

    return { html };
}

if (typeof document !== 'undefined') {
    const router = createCvoRouter({
        pages,
        ssr: false
    });

    const container = document.getElementById('app')!;
    if (container.innerHTML) {
        hydrateRoot(
            container,
            <CvoProvider>
                <RouterProvider router={router} />
            </CvoProvider>
        );
    } else {
        createRoot(container).render(
            <CvoProvider>
                <RouterProvider router={router} />
            </CvoProvider>
        );
    }
}
