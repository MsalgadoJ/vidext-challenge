import { z } from 'zod';

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from '@/server/api/trpc';
import { videos, likes } from '@/db/schema';
import { and, eq } from 'drizzle-orm';

export const videosRouter = createTRPCRouter({
  getVideos: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.videos.findMany();
  }),

  getVideo: publicProcedure
    .input(z.object({ videoId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.videos.findFirst({
        where: eq(videos.videoId, input.videoId),
      });
    }),

  createVideo: publicProcedure
    .input(
      z.object({
        videoId: z.string(),
        title: z.string(),
        videoUrl: z.string(),
        description: z.string(),
        thumbnail: z.string(),
        playCount: z.number(),
        likesCount: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(videos).values({
        videoId: input.videoId,
        title: input.title,
        videoUrl: input.videoUrl,
        description: input.description,
        thumbnail: input.thumbnail,
        playCount: input.playCount,
        likesCount: input.likesCount,
      });
    }),

  incrementPlayCount: protectedProcedure
    .input(z.object({ videoId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const currentVideo = await ctx.db
        .select()
        .from(videos)
        .where(eq(videos.videoId, input.videoId));

      const currentPlayCount = currentVideo[0].playCount + 1;

      return await ctx.db
        .update(videos)
        .set({ playCount: currentPlayCount })
        .where(eq(videos.videoId, input.videoId))
        .returning({ updatedCount: videos.playCount });
    }),

  incrementLikesCount: protectedProcedure
    .input(z.object({ videoId: z.string(), userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const currentVideo = await ctx.db
        .select()
        .from(videos)
        .where(eq(videos.videoId, input.videoId));

      const userLike = await ctx.db
        .select()
        .from(likes)
        .where(
          and(eq(likes.userId, input.userId), eq(likes.videoId, input.videoId))
        );

      let currentLikesCount: number;
      let newLike;

      if (userLike.length) {
        await ctx.db.delete(likes).where(eq(likes.id, userLike[0].id));
        currentLikesCount = currentVideo[0].likesCount - 1;
      } else {
        newLike = await ctx.db
          .insert(likes)
          .values({
            videoId: input.videoId,
            userId: input.userId,
          })
          .returning({ newLikeId: likes.id });
        currentLikesCount = currentVideo[0].likesCount + 1;
      }

      await ctx.db
        .update(videos)
        .set({ likesCount: currentLikesCount })
        .where(eq(videos.videoId, input.videoId));

      return newLike;
    }),

  getLike: publicProcedure
    .input(z.object({ videoId: z.string(), userId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db
        .select()
        .from(likes)
        .where(
          and(eq(likes.userId, input.userId), eq(likes.videoId, input.videoId))
        );
    }),

  deleteVideo: publicProcedure
    .input(z.object({ videoId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .delete(videos)
        .where(eq(videos.videoId, input.videoId));
    }),
});
