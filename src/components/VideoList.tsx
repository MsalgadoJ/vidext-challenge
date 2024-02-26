'use client';

import { useSession } from 'next-auth/react';
import { Video } from '@/utils/types/types';
import Card from './Card';
import { Skeleton } from './ui/skeleton';

interface VideoListProps {
  videos: Video[];
}

export default function VideoList({ videos }: VideoListProps) {
  const session = useSession();

  return (
    <div className="flex flex-col gap-6 sm:flex-row">
      {videos.map((video, i) => {
        return session.status === 'loading' ? (
          <Skeleton
            className="h-[292px] w-[200px] rounded-xl sm:h-[300px]"
            key={video.videoId}
          />
        ) : (
          <Card
            thumbnail={video.thumbnail}
            title={video.title}
            videoId={video.videoId}
            i={i}
            key={video.videoId}
          />
        );
      })}
    </div>
  );
}
