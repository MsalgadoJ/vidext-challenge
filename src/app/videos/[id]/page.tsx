import Video from '@/components/Video';
import { api } from '@/app/_trpc/server';
import VideoDetails from '@/components/VideoDetails';

interface TopicShowPageProps {
  params: {
    id: string;
  };
}

// TODO: error when video not found
export default async function VideoDetail({ params }: TopicShowPageProps) {
  const { id } = params;
  const { videoId, videoUrl, description, thumbnail, playCount, likesCount } =
    await api.videos.getVideo.query({ videoId: id });

  return (
    <div className="pt-4 ">
      <Video videoId={videoId} url={videoUrl} thumbnail={thumbnail} />
      <VideoDetails
        videoId={videoId}
        description={description}
        likesCount={likesCount}
        playCount={playCount}
      />
    </div>
  );
}
