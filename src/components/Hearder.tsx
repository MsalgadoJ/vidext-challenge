import Link from 'next/link';
import { Button } from './ui/button';
import { getServerAuthSession } from '@/server/auth';

export default async function Header() {
  const session = await getServerAuthSession();
  console.log(session);
  console.log('session', session);

  return (
    <div className="flex justify-between">
      <div>logo de Vidext</div>
      <div>
        {' '}
        <Link
          href={session ? '/api/auth/signout' : '/api/auth/signin'}
          className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
        >
          {session ? 'Sign out' : 'Sign in'}
        </Link>
      </div>
    </div>
  );
}
