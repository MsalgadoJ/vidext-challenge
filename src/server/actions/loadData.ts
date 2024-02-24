import { api } from '@/app/_trpc/server';
import { mockedData } from '@/utils/mockedData';

export async function loadMockData() {
  const videos = await api.videos.getVideos.query();
  console.log('videos', videos);

  async function loadData(mockedVideos) {
    for (const video of mockedVideos) {
      await api.videos.createVideo.mutate({
        videoId: video.videoId,
        videoUrl: video.videoUrl,
        description: video.description,
        thumbnail: video.thumbnail,
      });
    }
  }

  if (!videos.length) {
    console.log('entro poblar');
    loadData(mockedData);
  }
}
