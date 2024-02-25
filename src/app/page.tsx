import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';

export default async function Home() {
  return (
    <main className="w-full">
      <div className="w-5/6 min-h-[300px] sm: max-w-[800px] mx-auto flex flex-col gap-6 justify-center items-center">
        <h2 className="text-3xl font-bold">
          Welcome to <span className="text-[#38422C]">Vidext</span>{' '}
        </h2>

        <Link
          className={buttonVariants({ variant: 'outline' })}
          href={'/videos/xRXiWsfUix'}
        >
          Go to video sample
        </Link>
      </div>
    </main>
  );
}
