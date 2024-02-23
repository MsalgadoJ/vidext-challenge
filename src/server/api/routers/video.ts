import { z } from 'zod';

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from '@/server/api/trpc';
import { videos } from '@/db/schema';
import { eq } from 'drizzle-orm';

const BASE_URL = 'https://youtube.googleapis.com/youtube/v3/';
const key = process.env.API_KEY;

export const videosRouter = createTRPCRouter({
  getVideos: publicProcedure
    // .input(z.object({ text: z.string() }))
    .query(() => {
      return 'IDDEMIVIDEO';
    }),

  getCurrentVideo: publicProcedure.query(({ ctx, id }) => {
    return ctx.db.query.videos.findFirst({
      where: eq(videos.id, id),
    });
  }),

  createVideo: protectedProcedure
    // .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, id }) => {
      await ctx.db.insert(videos).values({
        id: id,
      });
    }),
  // addPlayCounts: protectedProcedure.mutation(async ({ ctx, id }) => {
  //   const updatedVideo = await ctx.db
  //     .update(videos)
  //     .set({
  //       playCount: videos.playCount + 1,
  //     })
  //     .where(eq(videos.id, id));

  //   return updatedVideo;
  // }),
});
