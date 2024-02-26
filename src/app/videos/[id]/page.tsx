import Video from '@/components/Video';
import { api } from '@/app/_trpc/server';
import VideoDetails from '@/components/VideoDetails';
import { notFound } from 'next/navigation';

interface TopicShowPageProps {
  params: {
    id: string;
  };
}

export default async function VideoDetail({ params }: TopicShowPageProps) {
  const { id } = params;

  const getVideo = await api.videos.getVideo.query({ videoId: id });

  if (!getVideo) {
    return notFound();
  }
  const { videoUrl, title, description, thumbnail, playCount, likesCount } =
    getVideo;

  return (
    <div className="pt-4">
      <Video url={videoUrl} thumbnail={thumbnail} />

      <VideoDetails
        title={title}
        description={description}
        likesCount={likesCount}
        playCount={playCount}
      />
    </div>
  );
}
