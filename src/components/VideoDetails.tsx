'use client';
import { api } from '@/app/_trpc/Provider';
import { Button } from './ui/button';
import { useToast } from '@/components/ui/use-toast';
import { ThumbsUpIcon } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import { useState } from 'react';
import { useSession } from 'next-auth/react';

export default function VideoDetails({ description, likesCount, playCount }) {
  const [loadingCount, setLoadingCount] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);
  const session = useSession();

  const router = useRouter();
  const { id } = useParams();
  const { toast } = useToast();

  const updateLikes = api.videos.incrementLikesCount.useMutation({
    onMutate: () => {
      setLoadingCount(true);
    },
    onSuccess: (data) => {
      if (data) {
        setHasLiked(true);
      }
      router.refresh();
      setLoadingCount(false);
    },
    onError: () => {
      setLoadingCount(false);
      toast({
        title: 'You need to be signed in',
        variant: 'destructive',
      });
    },
  });

  // TODO: update initial state of thumbup

  return (
    <div className="flex flex-col text-sm text-[#38422C] lg:text-base">
      <div className="flex justify-between items-center p-1 mb-4">
        <p>{`${playCount} views`}</p>
        <Button
          onClick={() =>
            updateLikes.mutate({
              videoId: id as string,
              userId: session.data?.user.id ?? '',
            })
          }
          className={'self-end'}
          disabled={loadingCount}
          size="sm"
        >
          {' '}
          <ThumbsUpIcon
            className="mr-2 h-4 w-4"
            fill={hasLiked ? '#D8DEC8' : 'none'}
          />{' '}
          {likesCount}
        </Button>
      </div>
      <div className="bg-[#D8DEC8]/20 shadow-lg rounded p-4">
        <p className="font-bold mb-1">Description</p>
        <p>{description}</p>
      </div>
    </div>
  );
}
