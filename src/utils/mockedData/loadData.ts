import { api } from '@/app/_trpc/server';
import { Video } from '../types/types';

export async function loadMockData(mockedVideos: Video[]) {
  for (const video of mockedVideos) {
    await api.videos.createVideo.mutate({
      videoId: video.videoId,
      title: video.title,
      videoUrl: video.videoUrl,
      description: video.description,
      playCount: video.playCount,
      likesCount: video.likesCount,
      thumbnail: video.thumbnail,
    });
  }
}
