import { type DesignTokens, defaultTokens } from '@sxo/design';
import type { StyleEngine } from '@sxo/engine';
import React, { createContext, useContext } from 'react';

export interface SxoContextValue {
    tokens: DesignTokens;
    engine: StyleEngine;
}

export const SxoContext = createContext<SxoContextValue | undefined>(undefined);

export function useSxo() {
    const context = useContext(SxoContext);
    if (!context) {
        throw new Error('useSxo must be used within a SxoProvider');
    }
    return context;
}
