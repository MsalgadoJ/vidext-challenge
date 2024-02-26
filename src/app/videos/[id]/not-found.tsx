import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';

export default function VideoNotFound() {
  return (
    <div className="h-[500px] flex flex-col gap-4 justify-center items-center text-[#38422C]">
      <img
        className="rounded-md w-[250px]"
        src="/error_404_video.jpg"
        alt="We couldn't find your video"
      />
      <h2 className="antialiased">Sorry, we couldn't find your video.</h2>
      <Link href="/" className={buttonVariants({ variant: 'outline' })}>
        Back home
      </Link>
    </div>
  );
}
