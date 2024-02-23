import Video from '@/components/Video';
import Header from '@/components/Hearder';
import { api } from './_trpc/server';

export default async function Home() {
  const videoId = await api.videos.getVideos.query();

  return (
    <main className="w-full bg-stone-100 min-h-screen">
      <div className="w-5/6 sm: max-w-[800px] mx-auto border-2 border-green-600">
        <Header />
        <Video videoId={videoId} />
      </div>
    </main>
  );
}

/*

### Functional Requirements

1. Video player page. 

2. There must be an API endpoint that allows the app to retrieve video data.

3. After a video is played, an API call must store the play count for that video.

4. (CHECK) Utilize Next.js' built-in API routes to handle server-side operations.

5. Use TailwindCSS for styling the application with the help of Shadcn for UI interfaces consistent with design requirements.

6. Implement tRPC to facilitate type-safe API calls between the client and server.



### Technical Requirements

- (DONE) Create a Next.js application from scratch. 

- (DONE) Set up TailwindCSS with Next.js and 

- (IN PROGRESS) integrate Shadcn components where appropriate.

- Design the app with a responsive layout suitable for both desktop and mobile viewports.
- Construct tRPC API routes within the Next.js app which exposes at least two endpoints:
    - One endpoint to retrieve video data (`getVideos`).
    - Another endpoint to increment and store the video play count (`incrementPlayCount`).

- Use Next.js app routing to navigate between pages and components.
- Implement error handling and loading states for API calls.
- Write simple documentation in a [README.md](http://readme.md/) file, explaining how to set up and run the application locally.


### Bonus Points

- Implement additional features such as video descriptions, or a "like" functionality.
- Add authentication to ensure that only authorized users can increment the play count.
- Fully customizable media player controls. [https://github.com/muxinc/media-chrome]
- Good design.
*/
