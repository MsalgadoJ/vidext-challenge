import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="h-[500px] flex flex-col justify-center gap-6 items-center text-[#38422C]">
      <img
        className="rounded-md w-[200px]"
        src="/error_404.jpg"
        alt="Something went wrong"
      />
      <h2 className="antialiased">
        Sorry, we couldn't find the page you are looking for.
      </h2>
      <Link href="/" className={buttonVariants({ variant: 'outline' })}>
        Back home
      </Link>
    </div>
  );
}
