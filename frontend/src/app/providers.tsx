"use client";

import { Provider } from 'react-redux';
import { ReactNode } from 'react';
import { store } from '../store';
import AppInitializer from './appInitializer';

export function Providers({ children }: { children: ReactNode }) {
  return <Provider store={store}>
    <AppInitializer />
    {children}
    </Provider>;
}
