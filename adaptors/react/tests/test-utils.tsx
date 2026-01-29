import { type RenderOptions, type RenderResult, render } from '@testing-library/react';
import type React from 'react';
import type { ReactElement } from 'react';
import { SxoProvider } from '../src/provider';

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
    return <SxoProvider>{children}</SxoProvider>;
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>): RenderResult =>
    render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
