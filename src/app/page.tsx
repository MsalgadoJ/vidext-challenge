import { loadMockData } from '@/utils/mockedData/loadData';
import { api } from './_trpc/server';
import { mockedData } from '@/utils/mockedData/mockedData';
import VideoList from '@/components/VideoList';

export default async function Home() {
  const videos = await api.videos.getVideos.query();

  if (!videos.length) {
    loadMockData(mockedData);
  }

  return (
    <main className="w-full">
      <div className="w-5/6 min-h-[300px] sm: max-w-[800px] mx-auto flex flex-col gap-6 justify-center items-center">
        <h2 className="text-3xl font-bold">
          Welcome to <span className="text-[#38422C]">Vidext</span>{' '}
        </h2>
        <VideoList videos={videos} />
      </div>
    </main>
  );
}
