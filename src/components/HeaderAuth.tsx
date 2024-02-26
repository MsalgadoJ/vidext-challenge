'use client';

import { Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { signIn, signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export default function HeaderAuth() {
  const session = useSession();
  const { id } = useParams();

  let authContent: React.ReactNode;

  if (session.status === 'loading') {
    authContent = (
      <Button disabled className="min-w-[79px]">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      </Button>
    );
  } else if (session.data?.user) {
    const { name, image } = session.data?.user;
    const shortName = name?.split(' ')[0];
    authContent = (
      <div className="flex items-center gap-2 text-[#38422C] text-sm">
        <p>Hello, {shortName}</p>
        <Popover>
          <PopoverTrigger asChild>
            <Avatar className="avatar border-2 border-violet-950">
              <AvatarImage src={image ?? ''} />
              <AvatarFallback>NP</AvatarFallback>
            </Avatar>
          </PopoverTrigger>
          <PopoverContent className="w-50">
            <Button onClick={() => signOut()} variant="secondary">
              {'Sign out'}
            </Button>
          </PopoverContent>
        </Popover>
      </div>
    );
  } else {
    authContent = (
      <Button
        onClick={() =>
          signIn('google', { callbackUrl: id ? `/videos/${id}` : '/' })
        }
        variant="outline"
      >
        {'Sign in'}
      </Button>
    );
  }
  return authContent;
}
