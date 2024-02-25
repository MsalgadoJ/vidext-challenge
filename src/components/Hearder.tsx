'use client';

import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { Button } from './ui/button';
import { signIn, signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';

export default function Header() {
  const session = useSession();
  const { id } = useParams();

  function handleAuth() {
    if (!session.data) {
      signIn('google', { callbackUrl: `/videos/${id}` });
    } else {
      signOut();
    }
  }

  return (
    <div className="flex justify-between items-center border-b border-zinc-400 mt-4 pb-2">
      <div className="flex gap-2 items-center">
        <Image
          src="/videx-logo.webp"
          alt="vidext logo"
          width={50}
          height={50}
        />
        <p className="hidden text-[#38422C] font-bold sm:flex lg:text-lg">
          vidext
        </p>
      </div>
      <div>
        {session.status === 'loading' ? (
          <Button disabled className="min-w-[79px]">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          </Button>
        ) : (
          <Button onClick={() => handleAuth()} variant="outline">
            {session.data ? 'Sign out' : 'Sign in'}
          </Button>
        )}
      </div>
    </div>
  );
}
