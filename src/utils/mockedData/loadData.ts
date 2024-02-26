import { api } from '@/app/_trpc/server';

export async function loadMockData(mockedVideos) {
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
