import { z } from 'zod';

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from '@/server/api/trpc';
import { videos } from '@/db/schema';

const BASE_URL = 'https://youtube.googleapis.com/youtube/v3/';
const key = process.env.API_KEY;

export const videosRouter = createTRPCRouter({
  getVideos: publicProcedure
    // .input(z.object({ text: z.string() }))
    .query(() => {
      return 'IDDEMIVIDEO';
    }),
});
