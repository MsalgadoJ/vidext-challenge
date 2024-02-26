import Link from 'next/link';
import { PlayCircle } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';

interface CardProps {
  thumbnail: string;
  title: string;
  videoId: string;
  i: number;
}

export default function Card({ thumbnail, title, videoId, i }: CardProps) {
  return (
    <div className="w-[200px] flex flex-col gap-2 rounded shadow-lg overflow-hidden transition-transform hover:-translate-y-1">
      <div className="h-[200px]">
        <img
          src={thumbnail}
          alt={title}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="pb-4 flex flex-col items-center gap-2 justify-end">
        <p className="text-sm">{title}</p>
        <Link
          className={buttonVariants({
            variant: i % 2 > 0 ? 'default' : 'secondary',
          })}
          href={`/videos/${videoId}`}
        >
          <PlayCircle className="mr-2" /> Go to video
        </Link>
      </div>
    </div>
  );
}
