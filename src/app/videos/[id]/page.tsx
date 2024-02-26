import { notFound } from 'next/navigation';
import { api } from '@/app/_trpc/server';
import Video from '@/components/Video';
import VideoDetails from '@/components/VideoDetails';
import { getServerAuthSession } from '@/server/auth';

interface VideoPageProps {
  params: {
    id: string;
  };
}

export default async function VideoPage({ params }: VideoPageProps) {
  const { id } = params;
  const session = await getServerAuthSession();

  let hasLikedBefore = false;
  if (session) {
    const getLike = await api.videos.getLike.query({
      videoId: id,
      userId: session.user.id,
    });

    hasLikedBefore = getLike.length > 0;
  }

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
        hasLikedBefore={hasLikedBefore}
      />
    </div>
  );
}
