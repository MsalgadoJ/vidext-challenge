import Link from 'next/link';
import { buttonVariants } from './ui/button';
import { getServerAuthSession } from '@/server/auth';
import Image from 'next/image';

export default async function Header() {
  const session = await getServerAuthSession();
  console.log(session);
  console.log('session', session);

  return (
    <div className="flex justify-between items-center border border-blue-200 mt-4">
      <div className="flex gap-2 items-center">
        <Image src="/videx-logo.png" alt="vidext logo" width={50} height={50} />
        <p className="hidden">vidext</p>
      </div>
      <div>
        {' '}
        <Link
          href={session ? '/api/auth/signout' : '/api/auth/signin'}
          className={buttonVariants({ variant: 'outline' })}
        >
          {session ? 'Sign out' : 'Sign in'}
        </Link>
      </div>
    </div>
  );
}
