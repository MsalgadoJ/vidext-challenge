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
    <div className="flex flex-col text-sm text-[#38422C] lg:text-base">
      <div className="flex justify-between items-center p-1 mb-4">
        <p>{`${playCount} views`}</p>
        <Button
          onClick={() => updateLikes.mutate({ videoId })}
          className="self-end"
          size="sm"
        >
          {' '}
          <ThumbsUpIcon className="mr-2 h-4 w-4" /> {likesCount}
        </Button>
      </div>
      <div className="bg-[#D8DEC8]/20 shadow-lg rounded p-4">
        <p className="font-bold mb-1">Description</p>
        <p>{description}</p>
      </div>
    </div>
  );
}
