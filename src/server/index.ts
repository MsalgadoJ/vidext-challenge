import { publicProcedure, router } from './trpc';

const BASE_URL = 'https://youtube.googleapis.com/youtube/v3/';
const key = process.env.API_KEY;

export const appRouter = router({
  getVideos: publicProcedure.query(async () => {
    const res = await fetch(
      `${BASE_URL}search?part=snippet
      &q=YouTube+Data+API
      &type=video&key=${key}`
    );

    const videos = await res.json();
    console.log(videos);
    return videos;
  }),

  // TODO
  //- Another endpoint to increment and store the video play count (`incrementPlayCount`).
});

export type AppRouter = typeof appRouter;
/*
{
  error: {
    code: 403,
    message: 'The request cannot be completed because you have exceeded your <a href="/youtube/v3/getting-started#quota">quota</a>.',
    errors: [ [Object] ]
  }
}
*/
