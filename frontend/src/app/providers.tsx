"use client";

import { Provider } from 'react-redux';
import { ReactNode } from 'react';
import {  store } from '../store';
import { injectStore } from '../lib/axios';
import AuthInit from '../components/AuthInit';

injectStore(store);

export function Providers({ children }: { children: ReactNode }) {

  return <Provider store={store}>
    <AuthInit />
    {children}
    </Provider>;
}
