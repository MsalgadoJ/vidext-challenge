import { z } from 'zod';

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from '@/server/api/trpc';
import { videos } from '@/db/schema';
import { eq } from 'drizzle-orm';

export const videosRouter = createTRPCRouter({
  getVideos: publicProcedure.query(({ ctx }) => {
    const videos = ctx.db.query.videos.findMany();
    return videos;
  }),

  getVideo: publicProcedure
    .input(z.object({ videoId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.videos.findFirst({
        where: eq(videos.videoId, input.videoId),
      });
      // return input.videoId;
    }),

  createVideo: publicProcedure
    .input(
      z.object({
        videoId: z.string(),
        videoUrl: z.string(),
        description: z.string(),
        thumbnail: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(videos).values({
        videoId: input.videoId,
        videoUrl: input.videoUrl,
        description: input.description,
        thumbnail: input.thumbnail,
      });
    }),

  incrementPlayCount: publicProcedure
    .input(z.object({ videoId: z.string() }))
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
    .input(z.object({ videoId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const currentVideo = await ctx.db
        .select()
        .from(videos)
        .where(eq(videos.videoId, input.videoId));

      if (!currentVideo) {
        throw new Error('El video no fue encontrado.');
      }

      const currentLikesCount = currentVideo[0].likesCount + 1;

      return await ctx.db
        .update(videos)
        .set({ likesCount: currentLikesCount })
        .where(eq(videos.videoId, input.videoId))
        .returning({ updatedLikesCount: videos.likesCount });
    }),
});
