'use client';

import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';

export default function Error() {
  return (
    <div className="h-[500px] flex flex-col gap-4 justify-center items-center text-[#38422C]">
      <h2>Ops! Looks like something went wrong 😵‍💫</h2>
      <Link href="/" className={buttonVariants({ variant: 'outline' })}>
        Back home
      </Link>
    </div>
  );
}
