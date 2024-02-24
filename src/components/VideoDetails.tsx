'use client';
import { api } from '@/app/_trpc/Provider';
import { Button } from './ui/button';
import { ThumbsUpIcon } from 'lucide-react';

export default function VideoDetails({
  videoId,
  description,
  likesCount,
  playCount,
}) {
  const updateLikes = api.videos.incrementLikesCount.useMutation({
    onSuccess: (data) => {
      console.log('data', data);
      // TODO update date after clicking
    },
  });
  console.log(updateLikes);
  return (
    <div className="flex flex-col border border-pink-600">
      <div className="flex justify-between items-center mb-2 border border-orange-600">
        <p>{`${playCount} views`}</p>
        <Button
          onClick={() => updateLikes.mutate({ videoId })}
          className="self-end"
        >
          {' '}
          <ThumbsUpIcon className="mr-2 h-4 w-4" /> {likesCount}
        </Button>
      </div>
      <div className="text-sm">
        <p className="font-bold">Description</p>
        <p>{description}</p>
      </div>
    </div>
  );
}
