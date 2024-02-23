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

  createVideo: publicProcedure
    .input(z.object({ videoId: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const existingVideo = await ctx.db
        .select()
        .from(videos)
        .where(eq(videos.videoId, input.videoId));

      if (existingVideo) {
        return existingVideo;
      }
      const newVideo = await ctx.db.insert(videos).values({
        videoId: input.videoId,
      });
      return newVideo;
    }),

  incrementPlayCount: publicProcedure
    .input(z.object({ videoId: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const currentVideo = await ctx.db
        .select()
        .from(videos)
        .where(eq(videos.videoId, input.videoId));

      if (!currentVideo) {
        throw new Error('El video no fue encontrado.');
      }

      const currentPlayCount = currentVideo[0].playCount + 1;

      return await ctx.db
        .update(videos)
        .set({ playCount: currentPlayCount })
        .where(eq(videos.videoId, input.videoId))
        .returning({ updatedCount: videos.playCount });
    }),

  incrementLikesCount: publicProcedure
    .input(z.object({ videoId: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const currentVideo = await ctx.db
        .select()
        .from(videos)
        .where(eq(videos.videoId, input.videoId));

      if (!currentVideo) {
        throw new Error('El video no fue encontrado.');
      }

      const currentLikesCount = currentVideo[0].likes + 1;

      return await ctx.db
        .update(videos)
        .set({ likes: currentLikesCount })
        .where(eq(videos.videoId, input.videoId))
        .returning({ updatedLikesCount: videos.likes });
    }),
});
