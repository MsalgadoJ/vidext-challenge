import { publicProcedure, router } from './trpc';

export const appRouter = router({
  getVideos: publicProcedure.query(async () => {
    return [1, 2, 3];
  }),

  // TODO
  //- Another endpoint to increment and store the video play count (`incrementPlayCount`).
});

export type AppRouter = typeof appRouter;
