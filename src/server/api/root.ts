import { createTRPCRouter } from '@/server/api/trpc';
import { videosRouter } from './routers/video';

export const appRouter = createTRPCRouter({
  videos: videosRouter,
});

export type AppRouter = typeof appRouter;
