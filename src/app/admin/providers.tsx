'use client';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { AppProgressBar } from 'next-nprogress-bar';

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <MantineProvider defaultColorScheme='auto'>
        <Notifications />
        <ModalsProvider>
          <QueryClientProvider client={queryClient}>
            <NuqsAdapter>
              {children}
              <AppProgressBar
                height='3px'
                color='#2196F3'
                options={{ showSpinner: false }}
                shallowRouting
              />
            </NuqsAdapter>
          </QueryClientProvider>
        </ModalsProvider>
      </MantineProvider>
    </SessionProvider>
  );
}
