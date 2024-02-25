'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import React, { useState } from 'react';
import { createTRPCReact } from '@trpc/react-query';
import { type AppRouter } from '@/server/api/root';
import { transformer } from './shared';
import { SessionProvider } from 'next-auth/react';

export const api = createTRPCReact<AppRouter>();

export default function Provider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({}));

  const [trpcClient] = useState(() =>
    api.createClient({
      transformer,
      links: [
        httpBatchLink({
          url: 'http://localhost:3000/api/trpc',
        }),
      ],
    })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <api.Provider client={trpcClient} queryClient={queryClient}>
          {children}
        </api.Provider>
      </SessionProvider>
    </QueryClientProvider>
  );
}
