import { fetchRequestHandler } from '@trpc/server/adapters/fetch';

import { appRouter } from '@/server';
import { NextResponse } from 'next/server';

const handler = (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new NextResponse('Cors Verified', {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
  return fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: () => ({}),
  });
};

export { handler as GET, handler as POST };
