'use client';
import Link from 'next/link';
import { Button, buttonVariants } from '@/components/ui/button';
import { getServerAuthSession } from '@/server/auth';
import { Loader2 } from 'lucide-react';
import { useSession } from 'next-auth/react';

export default function VideoList({ videos }) {
  const session = useSession();
  const LoadingButton = (id) => (
    <Button disabled key={id}>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Please wait
    </Button>
  );

  const LinkButton = (id, i) => (
    <Link
      className={buttonVariants({
        variant: i % 2 > 0 ? 'default' : 'secondary',
      })}
      href={`/videos/${id}`}
      key={id}
    >
      Go to video sample #{i + 1}
    </Link>
  );

  return videos.map((video, i) => {
    return session.status === 'loading'
      ? LoadingButton(video.videoId)
      : LinkButton(video.videoId, i);
  });
}
