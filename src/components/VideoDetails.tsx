'use client';
import { api } from '@/app/_trpc/Provider';
import { Button } from './ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, ThumbsUpIcon } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

export default function VideoDetails({
  title,
  description,
  likesCount,
  playCount,
}) {
  const [hasLiked, setHasLiked] = useState(false);
  const session = useSession();

  const router = useRouter();
  const { id } = useParams();
  const { toast } = useToast();

  const getUserHasLiked = api.videos.getLike.useQuery({
    videoId: id as string,
    userId: session.data?.user.id || '',
  });

  useEffect(() => {
    console.log('entro al use effect');
    if (getUserHasLiked.isSuccess && getUserHasLiked.data.length) {
      setHasLiked(true);
    } else {
      setHasLiked(false);
    }
  }, [getUserHasLiked.isSuccess, getUserHasLiked.data]);

  const updateLikes = api.videos.incrementLikesCount.useMutation({
    onSuccess: (data) => {
      console.log('encontré data, por');
      if (data) {
        setHasLiked(true);
      } else {
        setHasLiked(false);
      }
      router.refresh();
    },
    onError: () => {
      toast({
        title: 'You need to be signed in',
        variant: 'destructive',
      });
    },
  });

  return (
    <div className="flex flex-col text-sm text-[#38422C] lg:text-base">
      <div className="flex justify-between items-start p-1 mb-4">
        <div>
          <p className="text-xl font-bold">{title}</p>
          <p>{`${playCount} views`}</p>
        </div>
        {session.status === 'loading' && (
          <Button disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ...
          </Button>
        )}
        {session.status !== 'loading' && (
          <Button
            onClick={() =>
              updateLikes.mutate({
                videoId: id as string,
                userId: session.data?.user.id ?? '',
              })
            }
            disabled={updateLikes.isLoading}
            size="sm"
          >
            {' '}
            <ThumbsUpIcon
              className="mr-2 h-4 w-4"
              fill={hasLiked ? '#D8DEC8' : 'none'}
            />{' '}
            {likesCount}
          </Button>
        )}
      </div>
      <div className="bg-[#D8DEC8]/20 shadow-lg rounded p-4">
        <p className="font-bold mb-1">Description</p>
        <p>{description}</p>
      </div>
    </div>
  );
}
